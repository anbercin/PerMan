import React, { Component, PropTypes } from 'react';
import NavigationBar from '../../shared/components/NavigationBar/index';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyRawTheme from '../../shared/theme';
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
