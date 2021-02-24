import logo from './logo.svg';
import './App.css';
import React from 'react';
import Categorie from './Categorie';
import Emprunt from './Emprunt';
import Popup from './Popup';
import Auth from './Auth';
import Update from './Update';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      popupMode: false,
      auth: false,
      authMode: false,
    };
    this.modifierMatos = this.modifierMatos.bind(this);
  }

  init() {
    var myHeaders = new Headers();
    var myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    };

    var myRequest = new Request("http://localhost:8000/init/", myInit);
    fetch(myRequest, myInit)
    .then(res => res.json())
    .then(res => this.setState({apiResponse: res, popupMode: this.state.popupMode, auth: this.state.auth, authMode: this.state.authMode}))
    .then(res => this.forceUpdate())
    .then(res => console.log(this.state.apiResponse.matos));
  }

  componentWillMount() {
    this.init();
  }

  handleClick(mat) {
    if (!document.getElementById("nom").value.trim()) {
        this.state.popupMode = true;
        this.forceUpdate();
    } else {
        if (mat.dispo) {
            mat.dispo = false;
            mat.emprunt = document.getElementById("nom").value.toUpperCase();
        } else {
            mat.dispo = true;
            mat.emprunt = "DISPO";
        }

        var myInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(mat),
        mode: 'cors',
        cache: 'default'
        };

        fetch("http://localhost:8000/update/", myInit)
        .then(res => this.init());
    }
  }

  quitterPopup() {
    this.state.popupMode = false;
    this.forceUpdate();
  }

  auth(mdp) {
    var myInit = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({mdp: mdp}),
      mode: 'cors',
      cache: 'default'
      };

      fetch("http://localhost:8000/auth/", myInit)
      .then(res => res.json())
      .then(res => this.state.auth = res.auth)
      .then(res => this.state.authMode = false)
      .then(res => this.forceUpdate());
  }

  modifierMatos(event){
    this.state.authMode = true;
    this.forceUpdate();
  }

  quitterUpdate() {
    this.state.auth = false;
    this.forceUpdate();
  }

  render() {
    let cats = [];
    if (this.state.apiResponse) {
      for (let cat of this.state.apiResponse.categories){
        let mats = [];
        for (let mat of this.state.apiResponse.matos) {
          if (mat.categorie.nom === cat.nom) {
            mats.push(mat);
          }
        }
        cats.push(<Categorie cat={cat} mats={mats} onClick={(mat) => this.handleClick(mat)}/>);
      }
    }
    return (
      <div className="App">
        <Update visible={this.state.auth} onClick={() => this.quitterUpdate()} cats={this.state.apiResponse.categories} mats={this.state.apiResponse.matos} refresh={() => this.init()}/>
        <Auth visible={this.state.authMode} onSubmit={(mdp) => this.auth(mdp)}/>
        <Popup visible={this.state.popupMode} onClick={() => this.quitterPopup()}/>
        <Emprunt />
        <button onClick={this.modifierMatos}>Modifier Matos</button>
        <div className="categories">{cats}</div>
      </div>
    );
    }
}

export default App;
