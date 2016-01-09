
let dispatcher = require('dispatcher');

module.exports = {
  changeMessage(message) {
    dispatcher.dispatch({
      type: 'change_message',
      payload: {
        message: message
      }
    });
  }
};
