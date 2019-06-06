import React from 'react';
import { mount, shallow } from 'enzyme';
import { createFakeServer, fakeServer } from 'sinon';

import { Category, LinkedCategory } from './Category';
import { categories, clues } from '../data/fixtures'

const props = { category: categories[0] };

describe('Category component', () => {
  let server;
  beforeEach(() => {
    server = fakeServer.create();
    server.autoRespond = true;
    server.respondImmediately = true;

    server.respondWith(
      'GET',
      `http://jservice.io/api/clues?category=${props.category.id}`,
      [
        200,
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify(clues),
      ],
    );
  });

  describe('when creating a new category', () => {
    let category;
    beforeEach(done => {
      category = mount(<Category {...props} />);
      server.respond();

      setTimeout(() => { category.update(); done() }, 100);
    });

    // it('should log the category', () => {
    //   console.log(category.update().debug());
    // });

    it('should initialize clues in state', () => {
      expect(category.state().clues).toEqual(clues);
    });

    it('should render category title', () => {
      expect(category.find('h2').text()).toEqual(props.category.title);
    });
    
    it('should render the correct number of clues', () => {
      expect(category.find('Clue').length).toEqual(clues.length);
    });
  });
});

describe('LinkedCategory component', () => {
  const linkedCategory = shallow(<LinkedCategory {...props} />);

  it('should create a link to navigate home', () => {
    expect(linkedCategory.find('Link h4').text()).toEqual('Home');
  });
  
  it('should create a Category component', () => {
    expect(linkedCategory.find('Category').exists()).toBe(true);
  });

  describe('when category id is missing', () => {
    const emptyLinkedCategory = shallow(<LinkedCategory category={{}} />);

    it('should redirect to home', () => {
      expect(emptyLinkedCategory.find('Redirect').exists()).toBe(true);
    })
    
  });
});
