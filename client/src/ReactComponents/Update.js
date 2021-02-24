import React from 'react';
import '../App.css';


class Update extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.nouveauMatos = this.nouveauMatos.bind(this);
        this.updateMatos = this.updateMatos.bind(this);
        this.supprMatos = this.supprMatos.bind(this);
        this.state = {value: {newCat: "RE", newNom: "", updateCat: "RE", updateNom: "", updateNum: 1, supprCat: "RE", supprNum: 1}};
    }

    handleChange(event, key) {
        this.state.value[key] = event.target.value;
        this.forceUpdate();
    }

    nouveauMatos(event) {
        event.preventDefault();
        let newNom = String(this.state.value.newNom).trim();
        if (newNom) {
            var myInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({cat: this.state.value.newCat, nom: newNom}),
                mode: 'cors',
                cache: 'default'
                };
        
                fetch("http://localhost:8000/update/new", myInit)
                .then(() => this.props.refresh());
        }
        else {
            alert("Rentrez un nom valide");
        }
    }

    updateMatos(event){
        event.preventDefault();
        let updateNom = String(this.state.value.updateNom).trim();
        if (updateNom) {

            var myInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({cat: this.state.value.updateCat, num: this.state.value.updateNum, nom: updateNom}),
                mode: 'cors',
                cache: 'default'
                };

            fetch("http://localhost:8000/update/change", myInit)
            .then(() => this.props.refresh());

        } else {
            alert("Rentrez un nom valide");
        }
    }

    supprMatos(event) {
        event.preventDefault();
        var myInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cat: this.state.value.supprCat, num: this.state.value.supprNum}),
            mode: 'cors',
            cache: 'default'
            };
            
        fetch("http://localhost:8000/update/suppr", myInit)
        .then(() => this.props.refresh());
    }

    render() {
        let vis = this.props.visible ? "visible" : "hidden";
        let opt = [];
        if (this.props.cats) {
            for (let cat of this.props.cats) {
                opt.push(<option value={cat.acronyme}>{cat.acronyme}</option>);
            }
        }

        let numsUpdate = [];
        let numsSuppr = [];
        if (this.props.mats) {
            for (let mat of this.props.mats) {
                if (mat.categorie.acronyme == this.state.value.updateCat) {
                    numsUpdate.push(<option value={String(mat.id)}>{mat.id}</option>)
                }
                if (mat.categorie.acronyme == this.state.value.supprCat) {
                    numsSuppr.push(<option value={String(mat.id)}>{mat.id}</option>)
                }
            }
        }

        return(
            <div className="popup" style={{"visibility": vis}}>

                <div className="newMatos">
                Nouveau matos :
                    <form onSubmit={this.nouveauMatos}>
                    <label htmlFor="cat">Catégorie :</label>
                        <select name="cat" value={this.state.value.newCat} onChange={(e) => this.handleChange(e, "newCat")}>
                            {opt}
                        </select>
                        <label htmlFor="nom">Nom :</label>
                        <input name="nom" type="text" value={this.state.value.newNom} onChange={(e) => this.handleChange(e, "newNom")}></input>
                        <input type="submit" value="Créer"></input>
                    </form>
                </div>

                <div className="updateMatos">
                Modifier matos :
                    <form onSubmit={this.updateMatos}>
                        <label htmlFor="cat">Catégorie :</label>
                        <select name="cat" value={this.state.value.updateCat} onChange={(e) => this.handleChange(e, "updateCat")}>
                            {opt}
                        </select>
                        <select name="num" value={this.state.value.updateNum} onChange={(e) => this.handleChange(e, "updateNum")}>
                            {numsUpdate}
                        </select>
                        <label htmlFor="nom">Nom :</label>
                        <input name="nom" type="text" value={this.state.value.updateNom} onChange={(e) => this.handleChange(e, "updateNom")}></input>
                        <input type="submit" value="Modifier"></input>
                    </form>
                </div>

                <div className="supprMatos">
                    Supprimer matos :
                    <form onSubmit={this.supprMatos}>
                        <label htmlFor="cat">Catégorie :</label>
                        <select name="cat" value={this.state.value.supprCat} onChange={(e) => this.handleChange(e, "supprCat")}>
                            {opt}
                        </select>
                        <select name="num" value={this.state.value.supprNum} onChange={(e) => this.handleChange(e, "supprNum")}>
                            {numsSuppr}
                        </select>
                        <input type="submit" value="Supprimer"></input>
                    </form>
                </div>

                <button onClick={() => this.props.onClick()}>Quitter</button>
            </div>          
        );
    }
}

export default Update;