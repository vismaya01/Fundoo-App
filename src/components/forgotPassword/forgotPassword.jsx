import React from 'react'
import './forgotPassword.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Service from '../../sevices/userService';
import SnackBar from '../snackBar/snackBar';

const service = new Service();

const validEmailRegex = RegExp(
  /[a-zA-Z]{1,}([.\-+]?[a-zA-Z0-9]+)?@[a-z0-9]{1,}\.([a-z]{2,4})(\.[a-z]{2,4})?$/i
);

export default class forgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailFlag: false,
      errorEmail: '',
      snackBarOpen: false,
      snackBarMsg: '',
    };
  }

  snackBarClose = () => {
    this.setState({
      snackBarOpen: false
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    if (this.validate()) {
      this.emptyField();
    }
  }

  emptyField = () => {
    this.setState({
      emailFlag: false,
      errorEmail: '',
    })
  }

  validate() {
    let isValid = false;
    this.setState({
      emailFlag: false,
      errorEmail: '',
    })
    if (this.state.email === '') {
      this.setState({
        errorEmail: 'email is requied',
        emailFlag: true
      })
      isValid = true;
    }
    else {
      if (!validEmailRegex.test(this.state.email)) {
        this.setState({
          errorEmail: 'email is invalid',
          emailFlag: true
        })
        isValid = true;
      }
    }
    return isValid;
  }

  emptyTextField = () => {
    this.setState({
      email: '',
      emailFlag: false,
      errorEmail: '',
    })
  }

  handleSubmit = () => {
    if (this.validate()) {
      this.setState({
        snackBarOpen: true, snackBarMsg: 'Rest password failed',
        submitted: false
      });
    }
    else {
      let userData = {
        'email': this.state.email,
      }
      console.log(userData)
      this.emptyTextField();
      service.forgetPassword(userData).then(data => {
        console.log(data);
        this.setState({
          snackBarOpen: true, snackBarMsg: "Set password link sent to you registered email, please check.",
        });
        setTimeout(() => {
          this.props.history.push("/")
        }, 1000);
      }).catch(error => {
        console.log(error);
        this.setState({
          snackBarOpen: true, snackBarMsg: 'Rest password failed',
          submitted: false
        });
      })
    }
  }

  render() {
    return (
      <div className="sign-content">
        <div className='form-header'>
          <span className='c1'>F</span>
          <span className='c2'>u</span>
          <span className='c3'>n</span>
          <span className='c4'>d</span>
          <span className='c5'>o</span>
          <span className='c6'>o</span>
          <div className="signin">Find your password</div>
          <div className='head'>Enter your email</div>
        </div>
        <div className="form-main">
          <div className='mail' >
            <TextField
              size='medium'
              label="Mail Id"
              fullWidth
              margin="normal"
              name='email'
              onChange={this.handleChange}
              error={this.state.emailFlag}
              helperText={this.state.errorEmail}
              value={this.state.email}
              variant="outlined"
            />
          </div>
          <div className='button'>
            <Button variant="contained"
              onClick={this.handleSubmit}
              color="primary">Next</Button>
            <SnackBar open={this.state.snackBarOpen} close={this.snackBarClose} message={this.state.snackBarMsg} />
          </div>
        </div>
      </div>
    );
  }
}