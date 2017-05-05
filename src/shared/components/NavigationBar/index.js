import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AppBar  from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AvWeb from 'material-ui/svg-icons/av/web';
import SocialPeople from 'material-ui/svg-icons/social/people';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import config from '../../config';
import { signOut } from '../../../actions/auths';
import inlineStyles from '../../../shared/styles/MaterialUI/index';

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    profile: state.auth.profile
  }
}

class NavigationBar extends Component {

  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  renderAuthenticatedAppBar() {
    return (
      <AppBar
        showMenuIconButton={false}
        title={config.authorName}
        style={inlineStyles.appBar.root}
        titleStyle={inlineStyles.appBar.title}
        onTitleTouchTap={()=> this.context.router.push('/')}
        zDepth={0}
        iconStyleRight={inlineStyles.appBar.elementRight}
        iconElementRight={
                    <div>
                      <Link to="/personnel" >
                          <IconButton name="about-button" disableTouchRipple={true} >
                              <SocialPeople color={inlineStyles.iconColor} />
                          </IconButton>
                      </Link>
                      <Avatar
                        src={this.props.profile ? this.props.profile.picture : " "}
                        size={30}
                      />
                      <IconMenu
                        iconButtonElement={
                          <IconButton name="profile-button" disableTouchRipple={true} >
                            <MoreVertIcon color={inlineStyles.iconColor}/>
                          </IconButton>
                        }
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                      >
                        <Link to="/profile" >
                          <MenuItem primaryText="Profile" />
                        </Link>
                        <MenuItem primaryText="Sign out" onClick={() => this.props.signOut()}/>
                      </IconMenu>
                    </div>
                    }
      />

    );
  }

  renderGuestAppBar() {
    return (
      <AppBar
        showMenuIconButton={false}
        title={config.authorName}
        style={inlineStyles.appBar.root}
        titleStyle={inlineStyles.appBar.title}
        onTitleTouchTap={()=> this.context.router.push('/')}
        zDepth={0}
        iconStyleRight={inlineStyles.appBar.elementRight}
        iconElementRight={
                    <div>
                      <Link to="/personnel" >
                          <IconButton name="about-button" disableTouchRipple={true} >
                              <SocialPeople color={inlineStyles.iconColor} />
                          </IconButton>
                      </Link>
                      <IconMenu
                        iconButtonElement={
                          <IconButton name="project-button" disableTouchRipple={true} >
                            <AvWeb color={inlineStyles.iconColor}/>
                          </IconButton>
                        }
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                      >
                        <Link to="/cms/projects" >
                          <MenuItem primaryText="Edit" />
                        </Link>
                        <Link to="/cms/projects/preview" >
                          <MenuItem primaryText="Preview" />
                        </Link>
                      </IconMenu>
                      <Link to="/login" >
                          <IconButton name="lock-open" disableTouchRipple={true} >
                              <LockOpen color={inlineStyles.iconColor} />
                          </IconButton>
                      </Link>
                    </div>
                    }
      />

    );
  }

  render() {
    if (this.props.authenticated)
    {
      console.log('in app bar: ' + JSON.stringify(this.props.profile));
      return this.renderAuthenticatedAppBar();
    } else {
      return this.renderGuestAppBar();
    }
  }
}

export default connect(mapStateToProps, { signOut })(NavigationBar);
