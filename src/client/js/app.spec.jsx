let React = require('react');
let ReactDOM = require('react-dom');
let ReactDOMServer = require('react-dom/server');
let chai = require('chai')
let expect = chai.expect;
let TestUtils = require('react-addons-test-utils');

let App = require('./app.jsx');

describe('app', () => {
  let component;

  describe('when first loaded', () => {
    before(() => {
      component = TestUtils.renderIntoDocument(<App />);
    })

    it('should render', () => {
      expect(component).to.not.be.null;
    });

    it('should initialize to Hello World', () => {
      expect(component.state.message).to.equal('Hello World');
    });
  });

  // this looks like it replaces jsdom
  describe('to validate in memory DOM', () => {
    let shallowRenderer;
    before(() => {
      shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(<App />);
    });
    it('should render Hello', () => {
      let dom = shallowRenderer.getRenderOutput();
      expect(dom.props.children[0]).to.deep.equal(
        <h2 className='sub-banner'>Hello World</h2>
      );
    });
  });

  describe('to validate rendered HTML', () => {
    let markup;
    before(() => {
      markup = ReactDOMServer.renderToStaticMarkup(<App />);
    });
    it('should render Hello', () => {
      expect(markup).to.contain('Hello World');
    });
  });



  describe('on button click', () => {
    let input;

    before(() => {
      component = TestUtils.renderIntoDocument(<App />);
      input = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
    });

    it('should change message', () => {
      expect(component.state.message).to.not.equal('Changed Message');
      TestUtils.Simulate.click(input);
      expect(component.state.message).to.equal('Changed Message');
    });

  });


});