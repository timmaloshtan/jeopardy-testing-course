import React from 'react';
import { mount } from 'enzyme';
import { fakeServer } from 'sinon';

import { Category } from './Category';
import { categories, clues } from '../data/fixtures';

const [category] = categories;
const props = { category };

describe('Category component', () => {
  let server;
  beforeEach(() => {
    server = fakeServer.create();

    server.respondWith(
      'GET',
      `http://jservice.io/api/clues?category=${category.id}`,
      [
        200,
        { ContentType: 'application/json' },
        JSON.stringify(clues),
      ],
    );
  });

  describe('when creating a new category', () => {
    let categoryWrapper;
    beforeEach(done => {
      categoryWrapper =mount(<Category {...props} />);

      server.respond();

      setTimeout(done);
    });

    it('should log the category', () => {
      console.log(categoryWrapper.debug())
    });
  });
});
