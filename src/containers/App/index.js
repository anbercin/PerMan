import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import NavigationBar from '../../shared/components/NavigationBar/index';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyRawTheme from '../../shared/theme';
import Config from '../../shared/config';
import styles from './styles';

const propTypes = {
  children: PropTypes.object,
};

class App extends Component {

  getChildContext() {
    return {
      muiTheme: getMuiTheme(MyRawTheme),
    };
  }

  render() {
    return (
      <div className={styles.root}>
        <Helmet
          title={Config.siteName}
          titleTemplate={`%s | ${Config.siteName}`}
        />
        <NavigationBar />
        <div className={styles.container}>
          {this.props.children}
        </div>

      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

App.propTypes = propTypes;

export default App;
