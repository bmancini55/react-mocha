let React = require('react');

module.exports = React.createClass({
  getInitialState() {
    return {
      message: 'Hello World'
    };
  },
  render() {
    let message = this.state.message;
    return (
      <div>
        <h2 className='sub-banner'>{message}</h2>
        <button onClick={this.changeMessage}>Click</button>
      </div>
    );
  },

  changeMessage() {
    this.setState({ message: 'Changed Message' });
  }

});
