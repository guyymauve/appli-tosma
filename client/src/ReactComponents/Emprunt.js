import React from 'react';
import Matos from './Matos';
import '../App.css';


class Emprunt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value : event.target.value});
    }

    render() {
        return(
            <input type="text" value={this.state.value} onChange={this.handleChange} id="nom"/>
        );
    }
}

export default Emprunt;
