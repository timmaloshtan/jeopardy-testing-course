import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Clue from './Clue';

const mapStateToProps = ({ category }) => ({
  category,
});

export class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clues: []
    };
  }
  componentDidMount() {
    const { category } = this.props;
    if (category.id !== undefined) {
      fetch(`http://jservice.io/api/clues?category=${category.id}`)
        .then(response => response.json())
        .then(json => this.setState({ clues: json }));
    }
  }
  
  render() {
    const { category } = this.props;
    const { clues } = this.state;

    if (category.id === undefined) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Link to="/" className="link-home"><h4>Home</h4></Link>
        <h2>{category.title}</h2>
        {
          clues.map(clue => (
            <Clue key={clue.id} clue={clue} />
          ))
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Category);
