import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import AvAirplay from 'material-ui/svg-icons/av/airplay';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import ActionDone from 'material-ui/svg-icons/action/done';
import ContentFlag from 'material-ui/svg-icons/content/flag';
import NotificationPriorityHigh from 'material-ui/svg-icons/notification/priority-high';
import inlineStyles from '../../shared/styles/MaterialUI/index';
import styles from './employeeListItemStyles';

const propTypes = {
  id: PropTypes.number.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string,
  status: PropTypes.number.isRequired,
  accepted: PropTypes.bool.isRequired,
  sortRank: PropTypes.number.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

class Item extends Component {

  constructor(props) {
    super(props);
console.log('in item');
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.props.handleToggle(this.props.sortRank, this.props.id);
  }

  render() {
    let publishActionIcon;
    if (this.props.accepted) {
      publishActionIcon = <ActionVisibilityOff name="in-visible-icon" />;
    } else {
      publishActionIcon = <ActionVisibility name="visible-icon" />;
    }

    // 0: not accepted, 1: will publish, 2: publishing
    let statusIcon;
    switch (this.props.status) {
      case 0:
        statusIcon = <NotificationPriorityHigh name="unaccepted-icon" />;
        break;
      case 1:
        statusIcon = <ActionDone name="accepted-icon" />;
        break;
      case 2:
        statusIcon = <ContentFlag name="publishing-icon" />;
        break;
      default:
        break;
    }
    /*
    <TableRowColumn colSpan="1" style={inlineStyles.rowColumn} >
      {statusIcon}
    </TableRowColumn>
    */
    return (
      <TableRow style={inlineStyles.row}>
        <TableRowColumn colSpan="3" style={inlineStyles.rowColumn} >
        <List>
            <ListItem
                leftAvatar={<Avatar src={this.props.pic}  size={50} />}
                primaryText={<span>{this.props.first_name} {this.props.last_name}</span>}
                secondaryText={
                <p>
                  {this.props.title}
                </p>
                }
                secondaryTextLines={1}
            />
        </List>

        </TableRowColumn>
        <TableRowColumn colSpan="1" style={inlineStyles.rowColumn} >
           {this.props.department}
        </TableRowColumn>
        <TableRowColumn colSpan="2" style={inlineStyles.rowColumn} >
           {this.props.phone}
        </TableRowColumn>
        <TableRowColumn colSpan="2" style={inlineStyles.rowColumn} >
           {this.props.mobile_phone}
        </TableRowColumn>
        <TableRowColumn colSpan="2" style={inlineStyles.rowColumn} >
          <Link to={`/personnel/${this.props.id}/preview`}>
            <IconButton className={styles.button} disableTouchRipple >
              <AvAirplay />
            </IconButton>
          </Link>
          <Link to={`/personnel/${this.props.id}/edit`}>
            <IconButton className={styles.button} disableTouchRipple >
              <EditorModeEdit />
            </IconButton>
          </Link>
        </TableRowColumn>
      </TableRow>
    );
  }
}

Item.propTypes = propTypes;

export default Item;
