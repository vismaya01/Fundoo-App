import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
 
export default class snackBar extends React.Component {
  render () {
    return <Snackbar 
      open = {this.props.open}
      autoHideDuration={3000} 
      onClose={this.props.close}  
      message= {<span> {this.props.message} </span>}/>
  }
}
