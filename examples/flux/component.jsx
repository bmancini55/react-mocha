let React = require('react');
let store = require('message-store');
let actions = require('actions');

module.exports = React.createClass({

  componentDidMount() {
    store.addChangeListener(this.onStoreChange);
  },

  componentWillUnmount() {
    store.removeChangeListener(this.onStoreChange);
  },

  onStoreChange() {
    this.setState({
      message: store.getMessage()
    });
  },

  getInitialState() {
    return {
      message: store.getMessage()
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
    actions.changeMessage('Changed message');
  }

});
