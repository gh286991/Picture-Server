import React from 'react';
import Box from './Box';
import Load from './Load'




class Getpic extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rsobj: {},
        isLoaded: false,
        error: null,
      };
    }
  
    componentDidMount() {
      fetch( this.props.ServerUrl+"/api/get_pic")
        .then(res => res.json())
        .then((result) => {
            this.setState({
                rsobj: result,
                isLoaded: true,
            });
          },(error) => {
            this.setState({
              error: error,
            });
          })
     
    }
    
  
    render() { 
      const { isLoaded ,error} = this.state;
  
      if (error) {
        return <div>
                  Error: {error.message} <br/>
                  無法獲取伺服器資料 <br/>
                  請確認伺服器設定
              </div>;
      } else if (!isLoaded) {
        return <div>
                 <Load />
              </div>;
      } else {
        return(
            <Box rsobj = {this.state.rsobj} ServerUrl = {this.props.ServerUrl}/>
        )
            
      }
    } 
}


export default Getpic;
