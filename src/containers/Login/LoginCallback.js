import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { parseHash } from '../../actions/auths';

class LoginCallback extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    parseHash();
    browserHistory.push('/login');
  }

  render() {
    return null;
  }
}

export default LoginCallback;
