import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';

var row = [];

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
            rows: []
        };
    }

    componentDidMount() {
        var responseText = require('../data/response.json');
        responseText.map((data)=>{
            row = []
            row = [{equipId:data.equipment,
                    timeStamp: data.time,
                    vechId: data.vehicle}]
            //this.setState({rows:[...this.state.rows,row]})
            var joined = this.state.rows.concat(row);
            this.setState({ rows: joined })
        })
    }

    rowGetter=(rowNumber)=>{
        if(this.state.rows[rowNumber]!==undefined)
        {
        return this.state.rows[rowNumber]
        }
    }

    clickedRow = (rowNumber) =>{
        console.log(rowNumber)
    }

    render() {
        console.log(this.state.rows)
        return (
            <div>
                <ReactDataGrid
                    columns = {columns}
                    rowGetter = {this.rowGetter}
                    rowsCount = {this.state.rows.length}
                    minHeight = {500}
                    onRowClick = {(e)=>this.clickedRow(e)}
                />
            </div>
        );


    }
}

export default List;