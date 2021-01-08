import React from 'react'
import logo from '../assets/account.svg';
import './registration.css';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Snackbar from '../snackBar/snackBar';
import Service from '../../sevices/userService';

const service = new Service();

const validNameRegex = RegExp(/^[A-Z]{1}[a-zA-z\s]{2,}$/i);
const validEmailRegex = RegExp(
  /[a-zA-Z]{1,}([.\-+]?[a-zA-Z0-9]+)?@[a-z0-9]{1,}\.([a-z]{2,4})(\.[a-z]{2,4})?$/i
);
const validPasswordRegex = RegExp(
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!(?:.*[!@#$%^&*]){2})[a-zA-Z0-9!@#$%^&*]{8,}$/i
);

export default class registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm: '',
      hidden: true,
      firstNameFlag: false,
      lastNameFlag: false,
      emailFlag: false,
      passwordFlag: false,
      confirmFlag: false,
      errorFirstName: '',
      errorLastName: '',
      errorEmail: '',
      errorPassword: '',
      errorConfirm: '',
      snackBarOpen: false,
      snackBarMsg: '',
    };
    this.toggleShow = this.toggleShow.bind(this);
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
      firstNameFlag: false,
      lastNameFlag: false,
      emailFlag: false,
      passwordFlag: false,
      confirmFlag: false,
      errorFirstName: '',
      errorLastName: '',
      errorEmail: '',
      errorPassword: '',
      errorConfirm: '',
    })
  }

  validate = () => {
    let isValid = false
    if (this.state.firstName === '') {
      this.setState({
        errorFirstName: 'First Name is requied',
        firstNameFlag: true
      })
      isValid = true;
    }
    else {
      if (!validNameRegex.test(this.state.firstName)) {
        this.setState({
          errorFirstName: 'First Name is invalid',
          firstNameFlag: true
        })
        isValid = true;
      }
    }

    if (this.state.lastName === '') {
      this.setState({
        errorLastName: 'Last Name is requied',
        lastNameFlag: true
      })
      isValid = true;
    }
    else {
      if (!validNameRegex.test(this.state.lastName)) {
        this.setState({
          errorLastName: 'Last Name is invalid',
          lastNameFlag: true
        })
        isValid = true;
      }
    }

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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm: '',
      hidden: true,
      firstNameFlag: false,
      lastNameFlag: false,
      emailFlag: false,
      passwordFlag: false,
      confirmFlag: false,
      errorFirstName: '',
      errorLastName: '',
      errorEmail: '',
      errorPassword: '',
      errorConfirm: '',
    })
  }

  handleSubmit = () => {
    if (this.validate()) {
      this.setState({
        snackBarOpen: true, snackBarMsg: 'Registration is failed'
      })
    }
    else {
      let userData = {
        'firstName': this.state.firstName,
        'lastName': this.state.lastName,
        'service': 'advance',
        'email': this.state.email,
        'password': this.state.password,
      }
      this.emptyTextField();
      service.registration(userData).then(data => {
        console.log(data);
        this.setState({
          snackBarOpen: true, snackBarMsg: 'Registration is successfull',
        });
        {
          setTimeout(() => {
            this.props.history.push("/")
          }, 1000);
        }
      }).catch(error => {
        console.log(error);
        this.setState({
          snackBarOpen: true, snackBarMsg: 'Registration is failed'
        })
      })
    }
  }

  toggleShow = () => {
    this.setState({ hidden: !this.state.hidden });
  }

  render() {
    return <div className="content">
      <form className='form'  >
        <div className='form-head'>
          <div>
            <span className='c1'>F</span>
            <span className='c2'>u</span>
            <span className='c3'>n</span>
            <span className='c4'>d</span>
            <span className='c5'>o</span>
            <span className='c6'>o</span>
          </div>
          <div>Create your Fundoo Account</div>
        </div>
        <div className="form-main">
          <div className="row-content">
            <TextField className='mr'
              size='small'
              fullWidth
              name='firstName'
              label="First name"
              margin="normal"
              variant="outlined"
              error={this.state.firstNameFlag}
              helperText={this.state.errorFirstName}
              value={this.state.firstName}
              onChange={this.handleChange} noValidate
            />
            <TextField name='lastName'
              fullWidth
              label="Last name"
              onChange={this.handleChange}
              noValidate
              size='small'
              error={this.state.lastNameFlag}
              helperText={this.state.errorLastName}
              value={this.state.lastName}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div className='mail' >
            <TextField name='email'
              onChange={this.handleChange}
              noValidate
              size='small'
              label="Mail Id"
              fullWidth
              margin="normal"
              error={this.state.emailFlag}
              helperText={this.state.errorEmail}
              value={this.state.email}
              variant="outlined"
            />
          </div>
          <div className='Text'>You can use letters, numbers & periods</div>
          <div className="row-content">
            <TextField className='mr'
              type={this.state.hidden ? 'password' : 'text'}
              name='password'
              onChange={this.handleChange}
              noValidate
              size='small'
              fullWidth
              label="Password"
              margin="normal"
              error={this.state.passwordFlag}
              helperText={this.state.errorPassword}
              value={this.state.password}
              variant="outlined"
            />
            <TextField
              type={this.state.hidden ? 'password' : 'text'}
              name='confirm'
              onChange={this.handleChange}
              noValidate
              fullWidth
              size='small'
              label="Confirm"
              margin="normal"
              error={this.state.confirmFlag}
              helperText={this.state.errorConfirm}
              value={this.state.confirm}
              variant="outlined"
            />
          </div>
          <div className='Text'>Use 8 or more characters with a mix of letters, numbers & symbolss</div>
          <div>
            <Checkbox color="primary" onClick={this.toggleShow} />
            <span>show password</span>
          </div>
          <div className='button-Content'>
            <Button component={Link} to="/" color="primary">sign in instead</Button>
            <div>
              <Button variant="contained" color="primary" onClick={this.handleSubmit} >Sign Up</Button>
              <Snackbar open={this.state.snackBarOpen} close={this.snackBarClose} message={this.state.snackBarMsg} />
            </div>
          </div>
        </div>
      </form>
      <div className="logo-content">
        <img src={logo} alt='fundoo' />
      </div>
    </div>
  }
}