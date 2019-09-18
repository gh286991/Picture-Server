import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeletDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAgree = () => {
    this.setState({ open: false });
    fetch(this.props.ServerUrl+'/api/del_pic', {
      method: 'POST',
      body: JSON.stringify({
       pic: this.props.pic
     })
     }).then(res => {
         console.log(res)
           window.location.reload()
     });
  };

  render() {
    return (
      <div>
        <div className = "Delet" onClick={this.handleClickOpen}></div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Warring"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              確定是否刪除此張圖片
            </DialogContentText>
            <div className = "DeletPic">
              <img src = {this.props.picPath} alt=""/>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button onClick={this.handleAgree} color="primary" autoFocus>
              確定
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeletDialog;
