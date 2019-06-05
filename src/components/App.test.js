import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';
import { categories } from '../data/fixtures';

const props = {
  categories,
};

describe('App component', () => {
  const app = shallow(<App {...props} />);

  it('should render the title', () => {
    expect(app.find('h2').text()).toEqual('Jeopardy!');
  });
  
  it('should create the correct number of links', () => {
    expect(app.find('Link').length).toEqual(categories.length);
  });

  it('should title links correctly', () => {
    app.find('Link h4').forEach(
      (link, i) => expect(link.text()).toEqual(categories[i].title),
    );
  });
});
