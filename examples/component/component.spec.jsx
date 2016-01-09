let chai = require('chai')
let expect = chai.expect;

let React = require('react');
let ReactDOM = require('react-dom');
let ReactDOMServer = require('react-dom/server');
let TestUtils = require('react-addons-test-utils');
let Simulate = TestUtils.Simulate;

let Component = require('./component.jsx');

describe('Component Testing', () => {

  // component "rendering"
  //    static markup
  //    renderIntoDocument
  //    shallowRenderer

  // sub-component fetching
  //    TestUtils methods (renderIntoDocument only)
  //    refs (renderIntoDocument only)
  //    props.children

  // assertions
  //    structure
  //    state


  describe('with Static Markup', () => {
    it('can assert structure', () => {
      let markup = ReactDOMServer.renderToStaticMarkup(<Component />);
      expect(markup).to.contain('<h2 class="sub-banner">Hello World</h2>');
    });
    it('cannot assert state', () => {
      let markup = ReactDOMServer.renderToStaticMarkup(<Component />);
      expect(markup.state).to.be.undefined;
    })
  });

  describe('with TestUtils via findRenderedDOMComponentWithTag', () => {
    it('can assert structure', () => {
      let component = TestUtils.renderIntoDocument(<Component />);
      let banner = TestUtils.findRenderedDOMComponentWithTag(component, 'h2');

      // structure
      expect(banner.nodeName).to.equal('H2');
      expect(banner.className).to.equal('sub-banner');
      expect(banner.textContent).to.equal('Hello World');
    });

    it('can assert state', () => {
      let component = TestUtils.renderIntoDocument(<Component />);
      let banner = TestUtils.findRenderedDOMComponentWithTag(component, 'h2');

      // state
      expect(component.state.message).to.equal('Hello World');
    });

    // simulate invoke
    it('can assert behavior with Simulate', () => {
      let component = TestUtils.renderIntoDocument(<Component />);
      let banner = TestUtils.findRenderedDOMComponentWithTag(component, 'h2');
      let button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');

      // assert structure
      expect(banner.textContent).to.equal('Hello World');
      // assert state
      expect(component.state.message).to.equal('Hello World');

      // simualte click
      Simulate.click(button);

      // assert structure
      expect(banner.textContent).to.equal('Changed Message');
      // assert state
      expect(component.state.message).to.equal('Changed Message');
    });

    // directly invoke
    it('can assert behavior with direct invocation', () => {
      let component = TestUtils.renderIntoDocument(<Component />);
      let banner = TestUtils.findRenderedDOMComponentWithTag(component, 'h2');

      // assert structure
      expect(banner.textContent).to.equal('Hello World');
      // assert state
      expect(component.state.message).to.equal('Hello World');

      // directly invoke
      component.changeMessage();

      // assert structure
      expect(banner.textContent).to.equal('Changed Message');
      // assert state
      expect(component.state.message).to.equal('Changed Message');
    });
  });

  describe('with TestUtils via ref', () => {
    it('can assert structure', () => {
      let component = TestUtils.renderIntoDocument(<Component />);
      let banner = component.refs.subBanner;

      // assert structure
      expect(banner.nodeName).to.equal('H2');
      expect(banner.className).to.equal('sub-banner');
      expect(banner.textContent).to.equal('Hello World');
    });

    it('can assert state', () => {
      let component = TestUtils.renderIntoDocument(<Component />);
      let banner = component.refs.subBanner;

      // assert state
      expect(component.state.message).to.equal('Hello World');
    });

    it('can assert behavior with Simulate', () => {
      let component = TestUtils.renderIntoDocument(<Component />);
      let banner = component.refs.subBanner;
      let button = component.refs.messageButton;

      // assert structure
      expect(banner.textContent).to.equal('Hello World');

      // assert state
      expect(component.state.message).to.equal('Hello World');

      // simulate click
      Simulate.click(button);

      // assert structure
      expect(banner.textContent).to.equal('Changed Message');

      // assert state
      expect(component.state.message).to.equal('Changed Message');
    });

    it('can assert behavior with direct invocation', () => {
      let component = TestUtils.renderIntoDocument(<Component />);
      let banner = component.refs.subBanner;

      // assert structure
      expect(banner.textContent).to.equal('Hello World');
      // assert state
      expect(component.state.message).to.equal('Hello World');

      // directly invoke
      component.changeMessage();

      // assert structure
      expect(banner.textContent).to.equal('Changed Message');
      // assert state
      expect(component.state.message).to.equal('Changed Message');
    });
  });

  describe('with ShallowRender', () => {

    it('can assert structure', () => {
      let renderer = TestUtils.createRenderer();
      renderer.render(<Component />);
      let result = renderer.getRenderOutput();

      expect(result.props.children[0]).to.deep.equal(
        <h2 ref='subBanner' className='sub-banner'>Hello World</h2>
      );
    });

    it('cannot assert state', () => {
      let renderer = TestUtils.createRenderer();
      renderer.render(<Component />);
      let result = renderer.getRenderOutput();

      expect(result.state).to.be.undefined;
    });

    it('cannot assert behavior with Simulate', () => {
      let renderer = TestUtils.createRenderer();
      renderer.render(<Component />);
      let result = renderer.getRenderOutput();

      expect(result.props.children[0]).to.deep.equal(
        <h2 ref='subBanner' className='sub-banner'>Hello World</h2>
      );

      // simulate does not have an effect
      Simulate.click(result.props.children[1]);
      result = renderer.getRenderOutput();

      expect(result.props.children[0]).to.deep.equal(
        <h2 ref='subBanner' className='sub-banner'>Hello World</h2>
      );

    });

    it('can assert behavior with direct invocation', () => {
      let renderer = TestUtils.createRenderer();
      renderer.render(<Component />);
      let result = renderer.getRenderOutput();

      expect(result.props.children[0]).to.deep.equal(
        <h2 ref='subBanner' className='sub-banner'>Hello World</h2>
      );

      result.props.children[1].props.onClick();
      result = renderer.getRenderOutput();

      expect(result.props.children[0]).to.deep.equal(
        <h2 ref='subBanner' className='sub-banner'>Changed Message</h2>
      );
    });

  });

});