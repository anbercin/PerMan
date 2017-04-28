import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ErrorMessage from '../../shared/components/ErrorMessage/index';
import TextField from 'material-ui/TextField';
import inlineStyles from '../../shared/styles/MaterialUI/index';
import { signIn } from '../../actions/auths';
import styles from './styles';


const propTypes = {
  fields: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  return {
    initialValues: {
      email: "",
      password: ""
    },
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.errorMessage
  }
}

const fields = [
  "email", "password"
];

function validate(values) {
  const errors = {};
  if(!values.email) {
    errors.name = 'Enter Your Email'
  }

  if (!values.password || values.password.length < 6) {
    errors.password = 'Enter Password with more than 6 characters'
  }

  return errors;
}

class AuthorSignIn extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.authenticated) {
      this.context.router.push("/")
    }
  }

  handleSubmit(author) {
    this.props.signIn({ author });
  }

  renderErrorMessage() {
    if(this.props.errorMessage) {
      return <ErrorMessage message={this.props.errorMessage} />
    }
  }

  render() {
    const { handleSubmit, submitting, fields: { email, password } }  = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleSubmit)} className={styles.root}>
        <h2 className={styles.heading}>Sign In</h2>
        <TextField
          {...email}
          type="email"
          hintText="Enter Your Email"
          fullWidth={true}
          errorText={email.touched && email.error ? email.error : ''}
          style={inlineStyles.textField}
        />
        <TextField
          {...password}
          type="password"
          hintText="Enter password"
          fullWidth={true}
          errorText={password.touched && password.error ? password.error : ''}
          style={inlineStyles.textField}
        />
        {this.renderErrorMessage()}
        <button type="submit"
                disabled={submitting}
                className={styles.button}
        >
          SignIn
        </button>
      </form>)
  }
};


AuthorSignIn.propTypes = propTypes;

export default reduxForm({
  form: 'SignIn',
  fields,
  validate
}, mapStateToProps, {
  signIn
})(AuthorSignIn);