import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Explore } from 'components';
import {
  navigate,
  updateRouterState,
  resetErrorMessage
} from 'modules/common/actions';

import styles from './App.scss'; // eslint-disable-line

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.updateRouterState({
      pathname: this.props.location.pathname,
      params: this.props.params
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorMessage) {
      // handle error here
    }
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.updateRouterState({
        pathname: nextProps.location.pathname,
        params: nextProps.params
      });
    }
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleChange(nextValue) {
    this.props.navigate(`/${nextValue}`);
  }

  render() {
    const { children, inputValue } = this.props;
    return (
      <div className={styles.app}>
        <Helmet
          title="React Universal Saga Modular"
          meta={[{ property: 'og:site_name', content: 'React Universal Saga Modular' }]}
        />
        <Explore value={inputValue} onChange={this.handleChange} />
        <div className={styles.content}>
          {children}
        </div>
      </div>
      );
  }
}

App.propTypes = {
  errorMessage: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  updateRouterState: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  params: PropTypes.object
};

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    inputValue: state.router.pathname.substring(1)
  };
}

export default connect(mapStateToProps, {
  navigate,
  updateRouterState,
  resetErrorMessage
})(App);
