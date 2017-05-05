import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
  };
}

class Profile extends Component {
  render() {
    return (
      <div>
        <h2>email: { this.props.profile.email }</h2>
        <h3>Name: { this.props.profile.nickname }</h3>
        <h3>User Id: { this.props.profile.user_id }</h3>
      </div>
    );
  }
};

export default connect(mapStateToProps)(Profile);
