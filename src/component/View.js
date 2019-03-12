import React, { Component } from 'react';
import ReactBnbGallery from 'react-bnb-gallery'


var str;
var path="http://localhost:8000/";
var images=[]

export default class View extends Component {
    constructor(props) {
        super(props)
        this.state = { galleryOpened: false };
        this.toggleGallery = this.toggleGallery.bind(this);        
    }

    toggleGallery() {
        this.setState(prevState => ({
          galleryOpened: !prevState.galleryOpened
        }));
      }

    componentDidMount(){
        this.props.images.map(data=>{
            var temp={
                photo: path+data,
                caption: "Road Safety",
                subcaption: "IDEMIA",
                thumbanil: path+data
            }
            images.push(temp)
        })
       console.log(images)
    }
    render(){
        return(
            <div>
            <button onClick={this.toggleGallery}>Open photo gallery</button>
            <ReactBnbGallery
                show={this.state.galleryOpened}
                photos={images}
                onClose={this.toggleGallery} />
            </div>
        )
    }
}