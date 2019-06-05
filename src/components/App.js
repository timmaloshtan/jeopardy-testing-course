import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setCategories, pickCategory } from '../actions';

const mapStateToProps = ({ categories }) => ({
  categories,
});

const mapDispatchToProps = {
  setCategories,
  pickCategory,
};

export class App extends Component {
  componentDidMount() {
    const { categories } = this.props;
    if (!categories.length) {
      fetch('http://jservice.io/api/categories?count=20')
      .then(res => res.json())
      .then(this.props.setCategories);
    }
  }
  
  render() {
    const { categories, pickCategory } = this.props;
    return (
      <div className="app">
        <h2>Jeopardy!</h2>
        {
          categories.map(category => (
            <Link
              key={category.id}
              to="/category"
              onClick={() => pickCategory(category)}
            >
              <h4>{category.title}</h4>
            </Link>
          ))
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
