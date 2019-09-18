import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Load from './Load';


const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          {/* <CloseIcon /> */}
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    isLoaded: false,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);



class UploadDialog extends React.Component {
  state = {
    open: false,
    maxWidth: 'md',
    upload: false,
    type: 'upload',
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

   //選擇文件
changePath = (e) => {

    const files = e.target.files;
    if (!files) {
      return;
  }
    let preview = []
    Array.from(files).forEach(file => { 

      let src,type=file.type;

       //匹配檔案類型
        if (/^image\/\S+$/.test(type)) { 
          src = URL.createObjectURL(file)
          preview.push(<div className='preview' > 檔案: {file.name} <br/> <img src={src} alt='' /> </div>)
      }
      
      this.setState({ path: file.name, data: files, preview: preview })
    });


}

  upload = () => {
        
    const datas = this.state.data;

    if (!datas) {
      console.log('未選擇文件');
      return;
   }

   const url = this.props.ServerUrl+'/api/upload_pic';
   const form = new FormData();

    Array.from(datas).forEach((data) => {
      form.append('file', data);
    });

    this.setState({ upload: true });
    

    fetch(url, {
        method: 'POST',
        body: form
    })
    .then(res => res.json())
    .then(res => {
            window.location.reload()
    })
}



  render() {
    const { preview  } = this.state;

    if (this.state.upload === false) {
      return(
        <div className = "upload">
          <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
            上傳圖片
          </Button>
          <Dialog 
              fullWidth= "fullWidth"
              maxWidth = {this.state.maxWidth}
              onClose={this.handleClose}
              aria-labelledby="customized-dialog-title"
              open={this.state.open}
           
          >
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
              上傳圖片
            </DialogTitle>
            <DialogContent className = "UploadDialog">
              <Typography gutterBottom>
                  選擇上傳的圖片
              </Typography>
              <div className='uploadinside'>
                  <input type='file' accept='video/*,image/* ' multiple="multiple" onChange={this.changePath} />
                  {preview}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.upload} color="primary">
                Upload
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        )
      }
        else{
          return(
            <div>
              <Dialog open={this.state.open} >
                <Load type = {this.state.type}/>
              </Dialog>
          </div>
          )
        }
    
     
    }
}

export default UploadDialog;
