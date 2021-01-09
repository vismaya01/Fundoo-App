import React from 'react'
import './resetPassword.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Service from '../../sevices/userService';
import SnackBar from '../snackBar/snackBar';

const service = new Service();

const validPasswordRegex = RegExp(
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!(?:.*[!@#$%^&*]){2})[a-zA-Z0-9!@#$%^&*]{8,}$/i
);

export default class resetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      password: '',
      confirm: '',
      passwordFlag: false,
      confirmFlag: false,
      errorPassword: '',
      errorConfirm: '',
      snackBarOpen: false,
      snackBarMsg: ''
    };
    this.toggleShow = this.toggleShow.bind(this);
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
      passwordFlag: false,
      errorPassword: '',
      errorConfirm: '',
      confirmFlag: false,
    })
  }

  validate() {
    let isValid = false;
    this.setState({
      passwordFlag: false,
      errorPassword: '',
      confirmFlag: false,
      errorConfirm: '',
    })

    if (this.state.password === '') {
      this.setState({
        errorPassword: 'password is requied',
        passwordFlag: true
      })
      isValid = true;
    }
    else {
      if (!validPasswordRegex.test(this.state.password)) {
        this.setState({
          errorPassword: 'password is invalid',
          passwordFlag: true
        })
        isValid = true;
      }
    }

    if (this.state.confirm === '') {
      this.setState({
        errorConfirm: 'confirm is requied',
        confirmFlag: true
      })
      isValid = true;
    }
    else {
      if (this.state.password !== this.state.confirm) {
        this.setState({
          errorConfirm: "password didn't match",
          confirmFlag: true
        })
        isValid = true;
      }
    }

    return isValid;
  }

  emptyTextField = () => {
    this.setState({
      hidden: true,
      password: '',
      confirm: '',
      passwordFlag: false,
      confirmFlag: false,
      errorPassword: '',
      errorConfirm: '',
    })
  }

  handleSubmit = () => {
    if (this.validate()) {
      this.setState({
        snackBarOpen: true, snackBarMsg: 'Rest password failed'
      })
    }
    else {
      let userData = {
        'newPassword': this.state.password,
      }
      this.emptyTextField();
      const token = this.props.match.params.token
      service.restPassword(userData, token).then(data => {
        console.log(data);
        this.setState({
          snackBarOpen: true, snackBarMsg: 'Rest password successfull',
        })
        setTimeout(() => {
          this.props.history.push("/")
        }, 1000);

      }).catch(error => {
        console.log(error);
        this.setState({
          snackBarOpen: true, snackBarMsg: 'Rest password failed'
        })
      })
    }
  }

  snackBarClose = () => {
    this.setState({
      snackBarOpen: false
    })
  }

  toggleShow = () => {
    this.setState({ hidden: !this.state.hidden });
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
          <div className='head'>Reset your password</div>
        </div>
        <div className="form-main">
          <div className='mail' >
            <TextField size='medium'
              fullWidth
              type={this.state.hidden ? 'password' : 'text'}
              label="Password"
              name='password'
              onChange={this.handleChange}
              error={this.state.passwordFlag}
              helperText={this.state.errorPassword}
              value={this.state.password}
              margin="normal"
              variant="outlined"
            />
            <TextField
              type={this.state.hidden ? 'password' : 'text'}
              name='confirm'
              onChange={this.handleChange}
              noValidate
              fullWidth
              size='medium'
              label="Confirm"
              margin="normal"
              error={this.state.confirmFlag}
              helperText={this.state.errorConfirm}
              value={this.state.confirm}
              variant="outlined"
            />
            <Checkbox color="primary" onClick={this.toggleShow} />
            <span>show password</span>
          </div>
          <div className='button'>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>Next</Button>
            <SnackBar open={this.state.snackBarOpen} close={this.snackBarClose} message={this.state.snackBarMsg} />
          </div>
        </div>
      </div>
    );
  }
}