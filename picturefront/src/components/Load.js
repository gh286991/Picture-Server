import React from 'react';
import '../css/load.css'

class Load extends React.Component {

  render() {
    if( this.props.type === 'upload'){
      return (
        <div className = 'Load'>
          <div className="load-4">
              <div className="ring-1"></div>
              圖片上傳中......
          </div>
        </div>
      );
    }else{
      return (
      <div className = 'refresh'>
        <div className = 'Load'>
          <div className="load-4">
              <div className="ring-1">
              </div>
              
          </div>
          網頁重新載入中..
        </div>
      </div>
      )
    }
    
  }
}

export default Load;