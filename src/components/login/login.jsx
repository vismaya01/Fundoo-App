import React from 'react'
import './login.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox'
import { Link } from 'react-router-dom'
import Service from '../../sevices/userService';
import Snackbar from '../snackBar/snackBar';

const service = new Service();

const validEmailRegex = RegExp(
  /[a-zA-Z]{1,}([.\-+]?[a-zA-Z0-9]+)?@[a-z0-9]{1,}\.([a-z]{2,4})(\.[a-z]{2,4})?$/i
);
const validPasswordRegex = RegExp(
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!(?:.*[!@#$%^&*]){2})[a-zA-Z0-9!@#$%^&*]{8,}$/i
);

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      email: '',
      password: '',
      emailFlag: false,
      passwordFlag: false,
      errorEmail: '',
      errorPassword: '',
      snackBarOpen: false,
      snackBarMsg: '',
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

  validate() {
    let isValid = false;
    this.setState({
      emailFlag: false,
      passwordFlag: false,
      errorEmail: '',
      errorPassword: '',
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
    return isValid;
  }

  emptyField = () => {
    this.setState({
      emailFlag: false,
      passwordFlag: false,
      errorEmail: '',
      errorPassword: '',
    })
  }

  emptyTextField = () => {
    this.setState({
      hidden: true,
      email: '',
      password: '',
      emailFlag: false,
      passwordFlag: false,
      errorEmail: '',
      errorPassword: '',
      snackBarOpen: false,
      snackBarMsg: '',
    })
  }

  handleSubmit = () => {
    if (this.validate()) {
      this.setState({
        snackBarOpen: true, snackBarMsg: 'Login is failed'
      })
    }
    else {
      let userData = {
        'email': this.state.email,
        'password': this.state.password,
      }
      this.emptyTextField();
      service.login(userData).then(res => {
        console.log(res);
        let Data = []
        Data[0] = res.data
        localStorage.setItem("userToken", res.data.id);
        localStorage.setItem("userData", JSON.stringify(Data))
        this.setState({
          snackBarOpen: true, snackBarMsg: 'Login is successfull'
        });
        setTimeout(() => {
          this.props.history.push("/dashBoard/notes")
        }, 1000);
      }).catch(error => {
        console.log(error);
        this.setState({
          snackBarOpen: true, snackBarMsg: 'Login is failed'
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
          <div className="signin">Sign in</div>
          <div className='head'>Create your Fundoo Account</div>
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
            <TextField
              size='medium'
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
            <div className="row-content1">
              <div>
                <Checkbox color="primary" onClick={this.toggleShow} />
                <span>show password</span>
              </div>
              <Button component={Link} to="/forgotpassword" color="primary">forgot password</Button>
            </div>
          </div>
          <div className='button-Content1'>
            <Button component={Link} to="/registration" color="primary">create account</Button>
            <div>
              <Button variant="contained" color="primary" onClick={() => {
                this.handleSubmit()
              }}>Sign In</Button>
              <Snackbar open={this.state.snackBarOpen} close={this.snackBarClose} message={this.state.snackBarMsg} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}