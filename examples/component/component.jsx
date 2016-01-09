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
        <h2 ref='subBanner' className='sub-banner'>{message}</h2>
        <button ref='messageButton' onClick={this.changeMessage}>Click</button>
      </div>
    );
  },

  changeMessage() {
    this.setState({ message: 'Changed Message' });
  }

});
