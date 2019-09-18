import React from 'react';
import '../css/main.sass'
import DeletDialog  from './DeletDialog';
class Card extends React.Component {
    componentDidMount() {
    }
  
    render() { 

        let data = this.props.pic
        let type = data.substr(data.length-3,data.length)
        var con

        if (type === 'mp4' || type === 'MOV') {
            con = <video src={this.props.pic} controls/>
        }else{
            con = <a href={this.props.pic} target="_blank" rel="noopener noreferrer"><img src= {this.props.pic} alt=""/></a>
        }
    
        return(
            <div className = "Card">
                <div>
                    {/* <Del_pic pic = {this.props.file}/> */}
                    <DeletDialog pic = {this.props.file}  picPath = {this.props.pic} ServerUrl = {this.props.ServerUrl}/>
                    {con}
                    <div className ="filename">檔名: {this.props.file}</div>
                   
                </div>
            </div>
        )
    }

}


export default Card;