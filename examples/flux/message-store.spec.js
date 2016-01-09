
let dispatcher = require('dispatcher');
let sinon = require('sinon');
let chai = require('chai');
let expect = chai.expect;

describe('Message Store', () => {
  let store;
  let listener;

  beforeEach(() => {
    store = require('message-store');
    listener = sinon.stub();
    store.addChangeListener(listener);
  });

  afterEach(() => {
    delete require.cache[require.resolve('message-store')];
  });

  describe('initially', () => {
    it('should have Hello World as message', () => {
      expect(store.getMessage()).to.equal('Hello World');
    });
  });

  describe('on change_message event', () => {

    it('should change the message', () => {
      dispatcher.dispatch({ type: 'change_message', payload: { message: 'New message' }});
      expect(store.getMessage()).to.equal('New message');
    });

    it('should emit change', () => {
      dispatcher.dispatch({ type: 'change_message', payload: { message: 'New message' }});
      expect(listener.called).to.be.true;
    });

  });

});