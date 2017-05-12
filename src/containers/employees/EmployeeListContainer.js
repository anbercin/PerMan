import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchPosts, fetchPersonByName, togglePost } from '../../actions/employees';
import { Link } from 'react-router';
import Item from './EmployeeListItem';
import NoContent from '../../shared/components/NoContent/index';
import SearchBar from '../../shared/components/SearchBar/index';

import {
  Table,
  TableHeaderColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Pagination from '../../shared/components/Pagination/index';
import inlineStyles from '../../shared/styles/MaterialUI/index';
import styles from './styles';

const propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      publishedAt: PropTypes.string,
      status: PropTypes.number.isRequired,
      accepted: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  fetchPersonByName: PropTypes.func.isRequired,
  togglePost: PropTypes.func.isRequired,
  finishLoading: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
    page: state.posts.page,
    limit: state.posts.limit,
    total: state.posts.total,
  };
}

class EmployeeListContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleMovePage = this.handleMovePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts()
      .then(() => {
        this.props.finishLoading();
        this.setState({ loading: false });
      });
  }

  handleToggle(sortRank, postId) {
    this.props.togglePost(sortRank, postId);
  }

  handleMovePage(page) {
    this.props.fetchPosts(page);
  }

  handleSearch(name) {
    console.log('in handle search');
    this.setState({ loading: true });
    this.props.fetchPersonByName(name)
      .then(() => {
        this.props.finishLoading();
        this.setState({ loading: false });
      });
    console.log(name);
  }

  render() {
    if (this.state.loading) {
      return (
        <section>
          <Helmet title="Personel" />
        </section>
      );
    }

    const newButton = (
      <Link to="/cms/posts/new">
        <FloatingActionButton style={inlineStyles.floatButton} disableTouchRipple primary>
          <ContentAdd />
        </FloatingActionButton>
      </Link>
    );
    console.log('in container');
    console.log(this.props.posts.length);
    if (!this.props.posts.length) {
      return (
        <section>
          {newButton}
          <Helmet title="Personel" />  
          <NoContent pageName="posts" />
        </section>
      );
    }

    return (

      <section>
       {newButton}
       <Helmet title="Personel" />
       <SearchBar  onSearch={this.props.fetchPersonByName}/>
        <h1 className={styles.title}>Personel</h1>
        <Table fixedHeader fixedFooter>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow selectable={false}>
              <TableHeaderColumn colSpan="3" style={inlineStyles.headerColumn}>
                Adı Soyadı
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>
                Müdürlük
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="2" style={inlineStyles.headerColumn}>
                Telefon
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="2" style={inlineStyles.headerColumn}>
                Cep
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="2" style={inlineStyles.headerColumn}>

              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>

            {this.props.posts.map((post, index) => (
              <Item
                {...post}
                key={post.id}
                sortRank={index}
                handleToggle={this.handleToggle}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn>
                <Pagination
                  page={this.props.page}
                  total={this.props.total}
                  limit={this.props.limit}
                  handlePageClick={this.handleMovePage}
                />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    );
  }
}

EmployeeListContainer.propTypes = propTypes;

export default connect(mapStateToProps, { fetchPosts, fetchPersonByName, togglePost })(EmployeeListContainer);
