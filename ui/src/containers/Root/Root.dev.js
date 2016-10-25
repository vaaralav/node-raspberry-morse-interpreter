import { has } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, RouterContext } from 'react-router';
import DevTools from '../DevTools/DevTools';
import GoogleAnalytics from 'react-ga';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate() {
    const { store, type } = this.props;
    if (type !== 'server') {
      const state = store.getState();
      if (has(state, 'router.pathname')) {
        GoogleAnalytics.pageview(state.router.pathname);
      }
    }
  }
  render() {
    const { store, history, routes, type, renderProps } = this.props;
    return (
      <Provider store={store}>
        <div>
          {type === 'server'
            ? <RouterContext {...renderProps} />
            : <Router history={history} routes={routes} onUpdate={this.onUpdate} />}
          <DevTools />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.node.isRequired,
  type: PropTypes.string,
  renderProps: PropTypes.object
};
