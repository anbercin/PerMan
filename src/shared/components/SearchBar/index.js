import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const propTypes = {
  onSearch: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};

class SearchBar extends Component {

  onInputChange = (term) => {
    //this.props.onSearch(term);
  };

  handleKeyDown = (event) => {

    const ENTER_KEY=13;
    if (event.keyCode === ENTER_KEY) {
      event.preventDefault();

      this.props.onSearch(event.target.value);
    }
  };

  render() {
    console.log('in render SearchBar');
    return (
      <TextField
        id="searh-field"
        fullWidth={true}
        floatingLabelText="Ara..."
        onChange={event => this.onInputChange(event.target.value)}
        onKeyDown={this.handleKeyDown} />
    );
  }

}


SearchBar.propTypes = propTypes;
export default SearchBar;
