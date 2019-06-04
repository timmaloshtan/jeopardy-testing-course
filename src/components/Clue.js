import React, { Component } from 'react'

class Clue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reveal: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ reveal: true });
  }

  render() {
    const { clue: { answer, question, value } } = this.props;
    const { reveal } = this.state;

    return (
      <div className="clue" onClick={this.handleClick}>
        <h4>{value || 'Unknown'}</h4>
        <hr />
        <h5>{question}</h5>
        <hr />
        <h5 className={reveal ? 'text-reveal' : 'text-hidden'}>{answer}</h5>
      </div>
    )
  }
}

export default Clue;
