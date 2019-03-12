import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';

var row = [];
var tempRows = [];

const columns = [{
    key: 'equipId',
    name: 'EquipmentID'
},
{
    key: 'timeStamp',
    name: 'TimeStamp'
},
{
    key: 'vechId',
    name: 'VechicleID'
}
]

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rows: [],
            equipValue: "",
            vechId: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {

    }

    rowGetter = (rowNumber) => {
        if (this.state.rows[rowNumber] !== undefined) {
            return this.state.rows[rowNumber]
        }
    }

    clickedRow = (rowNumber) => {
        alert("Clicked on row " + this.state.rows[rowNumber].equipId)
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.refs.vehicle.value)
        console.log(this.refs.equipment)
        //Example for calling API
        //API call goes here
        // Where we're fetching data from
        // if(condition)
        //    const url = ""
        // fetch("url")
        //     // We get the API response and receive data in JSON format...
        //     .then(response => response.json())
        //     // ...then we update the users state
        //     .then(data =>
        //         this.setState({
        //            same as below
        //         })
        //     )

        var responseText = require('../data/response.json');
        
        //This map function goes into api response mapping
        tempRows = []
        responseText.map((data) => {
            row = []
            row = {
                equipId: data.equipment,
                timeStamp: data.time,
                vechId: data.vehicle
            }
            tempRows.push(row)
        })
        //--Till here

        this.setState({ rows: tempRows })
    }

    render() {
        return (
            <div>
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