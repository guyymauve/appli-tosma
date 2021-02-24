import React from 'react';
import Matos from './Matos';
import '../App.css';


class Categorie extends React.Component {

    render() {
        let rendu = [];
        for (let mat of this.props.mats) {
            rendu.push(<Matos mat={mat} onClick={(param) => this.props.onClick(param)} />);
        }
        return(
            <div className="categorie">
                <div className="nomCat">{this.props.cat.nom}</div>{rendu}
            </div>
        );
    }
}

export default Categorie;
