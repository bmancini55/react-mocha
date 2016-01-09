
let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');
let Simulate = TestUtils.Simulate;

let sinon = require('sinon');
let chai = require('chai');
let expect = chai.expect;



describe('Component', () => {
  let Component;
  let component;
  let store;
  let actions;

  beforeEach(() => {
    // stub store before loading component
    store = require('message-store');
    sinon.stub(store);
    store.getMessage.returns('Hello World');

    // stub actions before loading component
    actions = require('actions');
    sinon.stub(actions);

    // load the component that references the store
    Component = require('component');
    component = TestUtils.renderIntoDocument(<Component />);
  });

  afterEach(() => {
    delete require.cache[require.resolve('message-store')];
    delete require.cache[require.resolve('actions')];
    delete require.cache[require.resolve('component')];
  })

  describe('when mounted', () => {
    it('listens to Message Store', () => {
      expect(store.addChangeListener.called).to.be.true;
    });

    it('renders Hello World', () => {
      let banner = component.refs.subBanner;
      expect(banner.textContent).to.equal('Hello World');
    });
  });

  describe('when unmounted', () => {
    it('removes Message Store', () => {
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
      expect(store.removeChangeListener.called).to.be.true;
    });
  });

  describe('when button clicked', () => {
    it('triggers the update action', () => {
      let button = component.refs.messageButton;
      Simulate.click(button);
      expect(actions.changeMessage.called).to.be.true;
      expect(actions.changeMessage.getCall(0).args[0]).to.equal('Changed message');
    });
  });

  describe('when message store changes', () => {
    it('updates the message', () => {
      store.getMessage.returns('New message');
      component.onStoreChange();
      let banner = component.refs.subBanner;
      expect(banner.textContent).to.equal('New message');
    });
  });

});