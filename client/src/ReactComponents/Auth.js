import React from 'react';
import '../App.css';


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.value);
    }

    render() {
        let vis = this.props.visible ? "visible" : "hidden";    
        return(
            <div className="popup" style={{"visibility": vis}}>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="mdp">Mot de Passe</label>
                    <input name="mdp" type="text" value={this.state.value} onChange={this.handleChange}></input>
                    <input type="submit" value="Envoyer"></input>
                </form>
            </div>
        );
    }
}

export default Auth;