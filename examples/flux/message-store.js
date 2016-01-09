
let EventEmitter = require('events').EventEmitter;
let dispatcher   = require('dispatcher');

let store = Object.assign({}, EventEmitter.prototype, {

  _message: 'Hello World',

  _created: Date.now(),

  initialize() {
    dispatcher.register((action) => {
      switch(action.type) {
        case 'change_message':
          this.onChangeMessage(action.payload);
          break;
      }
    });
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

  getMessage() {
    return this._message;
  },

  onChangeMessage({ message }) {
    this._message = message;
    this.emit('change');
  }

});

store.initialize();
module.exports = store;
