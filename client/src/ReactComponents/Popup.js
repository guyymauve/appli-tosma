import React from 'react';
import '../App.css';


class Popup extends React.Component {

    render() {
        let vis = this.props.visible ? "visible" : "hidden";
        return(
            <div className="popup" id="pasDeNom" style={{"visibility": vis}}>
                Rentrez un nom !
                <button onClick={() => this.props.onClick()}>Compris</button>
            </div>
        );
    }
}

export default Popup;