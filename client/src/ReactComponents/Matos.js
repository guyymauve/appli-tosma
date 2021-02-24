import React from 'react';
import '../App.css';


class Matos extends React.Component {

    render() {
        let color = this.props.mat.dispo ? "green" : "red";
        return(
            <div className="matos" style={{"backgroundColor": color}} onClick={() => this.props.onClick(this.props.mat)}>
                <div className="code">{this.props.mat.code}</div>
                <div className="nomMatos">{this.props.mat.nom}</div>
                <div className="emprunt">{this.props.mat.emprunt}</div>
            </div>
        );
    }
}

export default Matos;