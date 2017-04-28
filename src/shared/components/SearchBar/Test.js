import React from 'react';
import TextField from 'material-ui/TextField';

class TestBar extends React.Component {

  onInputChange = (term) => {
    //this.props.onTermChange(term);
  }

  handleKeyDown = (event) => {

    const ENTER_KEY=13;
    if (event.keyCode === ENTER_KEY) {
      event.preventDefault();

      this.props.onTermChange(event.target.value);
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

export default TestBar;
