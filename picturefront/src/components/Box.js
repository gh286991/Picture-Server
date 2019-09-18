import React from 'react';
import '../css/main.sass'
import Card from './Card'
import UploadDialog from './UploadDialog'


class Box extends React.Component {
    componentDidMount() {
    }
    
  
    render() { 
        let Cards = [];
        for (let i = 0; i < this.props.rsobj.fls.length; i++) {
            if(this.props.rsobj.fls[i].startsWith('.')) continue;
            let pic = this.props.ServerUrl+this.props.rsobj.url+this.props.rsobj.fls[i]
            Cards.push(<Card pic={pic} file = {this.props.rsobj.fls[i]} ServerUrl = {this.props.ServerUrl}/>);
        }
        return(
            <div className = "Box">
                <UploadDialog  ServerUrl = {this.props.ServerUrl}/>
                {Cards}
            </div>
        )
    }

}


export default Box;