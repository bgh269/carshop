import React from 'react';
import './App.css';
import Carlist from './components/Carlist';   // importoi carlist.js components kansiosta renderöintiä varten
// lisätään material-ui componentti kirjasto, asenna se powershellissä pystäytä terminaali => sen jälkeen kirjoita yarn add @material-ui/core Nämä ohjeet löytyy sivulta material-ui.com
import AppBar from '@material-ui/core/AppBar';  // importoi, jotta voi käyttää
import Toolbar from '@material-ui/core/Toolbar';  // importoi, jotta voi käyttää
import Typography from '@material-ui/core/Typography';  // importoi, jotta voi käyttää


// renderöidään Carlist <Carlist/>
// lisätään app bar(sovelluspalkki) componentti tarvitaan myös toolbar(työkalurivi) ja typography(otsikkolle)
// lisätään app bar componentti, jossa toolbar ja 
function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            Carshop
          </Typography>
        </Toolbar>
      </AppBar>
      <Carlist /> 
    </div>
  );
}

export default App;
