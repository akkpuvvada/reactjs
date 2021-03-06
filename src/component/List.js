import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import ReactBnbGallery from 'react-bnb-gallery'

var path="http://localhost:8000/";
var galleryImages=[]

var row = [];
var tempRows = [];
var images = [];

const columns = [{
    key: 'equipId',
    name: 'EquipmentID'
},
{
    key: 'vechId',
    name: 'VechicleID'
},
{
    key: 'timeStamp',
    name: 'TimeStamp'
}
]

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rows: [],
            equipValue: "",
            vechId: "",
            changeView: -1,
            imageList: [],
            galleryOpened: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.clickedRow = this.clickedRow.bind(this)
        this.toggleGallery = this.toggleGallery.bind(this);        
    }

    componentDidMount() {

    }

    rowGetter = (rowNumber) => {
        if (this.state.rows[rowNumber] !== undefined) {
            return this.state.rows[rowNumber]
        }
    }

    clickedRow = (rowNumber) => {
        galleryImages=[]
        images[rowNumber].map(data=>{
            var temp={
                photo: path+data,
                caption: "Road Safety",
                subcaption: "IDEMIA",
                thumbanil: path+data
            }
            galleryImages.push(temp)
        })
       this.toggleGallery()
    }
    
    toggleGallery() {
        this.setState(prevState => ({
          galleryOpened: !prevState.galleryOpened
        }));
      }

    handleSubmit(event) {
        event.preventDefault();
        var url =""
        images=[] //Empties the images everytime
        if ((this.refs.equipment.value==="") && (this.refs.vehicle.value=="")) 
            {
                url = "http://localhost:5000/incidents"
            }
        else if ((this.refs.equipment.value!=="") && (this.refs.vehicle.value==="")) 
            {
                url = "http://localhost:5000/incidents?equipment_id=" + this.refs.equipment.value
            }
        else if ((this.refs.equipment.value==="") && (this.refs.vehicle.value!=="")) 
            {
               url = "http://localhost:5000/incidents?vehicle_id=" + this.refs.vehicle.value
            }
        else if ((this.refs.equipment.value!=="") && (this.refs.vehicle.value!=="")) 
            {
                url = "http://localhost:5000/incidents?equipment_id=" + this.refs.equipment.value + "&vehicle_id=" + this.refs.vehicle.value
            }
        fetch(url)
             .then(response => response.json())
                // ...then we update the users state
                .then((findresponse) =>{
                    //This map function goes into api response mapping
                    tempRows = []
                    findresponse.map((data) => {
                        row = []
                        row = {
                            equipId: data.equipment,
                            timeStamp: data.time,
                            vechId: data.vehicle
                        }
                        tempRows.push(row)
                        images.push(data.images)
                    })
                    //--Till here
                }
                
            )
            this.setState({ rows: tempRows })


        // var responseText = require('../data/response.json');
        
        // //This map function goes into api response mapping
        // tempRows = []
        // responseText.map((data) => {
        //     row = []
        //     row = {
        //         equipId: data.equipment,
        //         timeStamp: data.time,
        //         vechId: data.vehicle
        //     }
        //     tempRows.push(row)
        //     images.push(data.images)
        // })
        // //--Till here
    }

    render() {
        return (
            <div>
                <ReactBnbGallery
                    show={this.state.galleryOpened}
                    photos={galleryImages}
                    onClose={this.toggleGallery} />
                
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Equipment:
                    <input type="text" ref="equipment" />
                    </label>

                    <label>
                        Vechicle:
                    <input type="text" ref="vehicle" />
                    </label>

                    <input type="submit" value="Submit" />
                </form>
                <br />
                <ReactDataGrid
                    columns={columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.state.rows.length}
                    minHeight={500}
                    onRowClick={(e) => this.clickedRow(e)}
                />
            </div>
        );
    }
}

export default List;