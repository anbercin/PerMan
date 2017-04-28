import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AppBar  from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AvWeb from 'material-ui/svg-icons/av/web';
import AvSnooze from 'material-ui/svg-icons/av/snooze';
import ActionDescription from 'material-ui/svg-icons/action/description';
import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import IconButton from 'material-ui/IconButton';
import config from '../../config';
import { signOut } from '../../../actions/auths';
import inlineStyles from '../../../shared/styles/MaterialUI/index';


class NavigationBar extends Component {

  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
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
                      <a href={config.gitHubUrl} >
                        <IconButton
                          iconStyle={inlineStyles.appBar.gitHubButton}
                          name="git-hub-button"
                          disableTouchRipple={true}
                          >
                            <AvSnooze color={inlineStyles.iconColor}/>
                        </IconButton>
                      </a>
                      <IconButton
                        name="sign-out-button"
                        disableTouchRipple={true}
                        onClick={() => this.props.signOut()}
                      >
                        <ActionExitToApp color={inlineStyles.iconColor} />
                      </IconButton>
                    </div>
                    }
      />

    );
  }
}

export default connect(null, { signOut })(NavigationBar);
