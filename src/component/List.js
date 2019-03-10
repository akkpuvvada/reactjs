import React, { Component } from 'react';
import { clearInterval } from 'timers';

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: []
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            //API call goes here
            // Where we're fetching data from
            // fetch("url")
            //     // We get the API response and receive data in JSON format...
            //     .then(response => response.json())
            //     // ...then we update the users state
            //     .then(data =>
            //         this.setState({
            //            same as below
            //         })
            //     )

            this.setState({ time: [...this.state.time, Date.now()] })
        }, (10000));
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    render() {
        return (
            <div>
                {this.state.time.map((data) => {
                    return (
                        <div>
                            <div className="card">
                                {data}
                            </div>
                            <br />
                        </div>
                    )
                })}
            </div>
        );


    }
}

export default List;