import React, {useState, useEffect} from 'react'; // importoidaan react ja 
import ReactTable from 'react-table';   // importoi react-table componentti, sitä ennen asenna react-table powershellissä yarn add react-table
import 'react-table/react-table.css';   // importoi myös react-tablen css (muotoilut)
import Button from '@material-ui/core/Button'; // hox! muista muuttaa (deletepainike)button kirjoitetuksi isolla B:llä 
import Addcar from './Addcar';  // importoi Addcar.js
import Editcar from './Editcar'; // importoi Editcar.js

// luodaan Carlist() functio
export default function Carlist() {     
   const [cars, setCars] = useState([]); // useStaten sisään tyhjä taulukko, jonka sisään haettu tieto(lista) tallennetaan

// useEffectillä haetaan tieto fetchData funktiosta ensimmäisen renderöinnin jälkeen 
   useEffect(() => fetchData(), []);

// fechtData hakee tiedot url:ista
   const fetchData = () => {
       fetch('https://carstockrest.herokuapp.com/cars') 
       .then(response => response.json())   // parsittu JSONtieto bodysta
       .then(data => setCars(data._embedded.cars))  // halutaan hakea vain auto taulukko(array), joka tallennetaan useState metodilla setCars cars keywordiin
   }

    // luodaan delete toiminto luomalla deleteCar functio
   const deleteCar =(link) => { //tässä saa linkin(url parametrina) buttonilta
    //console.log(link); 
    if(window.confirm('Are you sure?')) { //standardi javascript confirm, if lauseella luodaan ponnahdusikkuna, jossa varmistetaan halutaanko poisto tehdä, jos painaa kyllä(true) poisto tapahtuu. Muista laittaa aaltosulut fecthin ympärille
    fetch(link, {method:'DELETE'})      // kutsutaan url(link) käyttämällä delete metodia
    .then(res => fetchData())           // kun delete on tapahtunut haetaan uusi data
    .catch(err => console.error(err))   // errorin 
    } 
   }
   
   // luodaan tallennus toiminto luomalla saveCar functio
   const saveCar = (car) =>{
       fetch('https://carstockrest.herokuapp.com/cars', {   // haetaan tiedot tästä URL:sta
            method: 'POST', // täytyy olla POST metodi, jotta lähettäää tiedon backendiin tietokantaan
            headers: {      // headers on olio, koska voi sisältää useita keyvalue tietoja
            'Content-Type' : 'application/json' // määritellää otsikko
            },
            body: JSON.stringify(car)  // tämä tietty auto täytyy lähettään bodyyn JSON oliona
       })
       .then(res => fetchData()) // kutsutaan fecthiä uudestaan, jotta saadaan päivitetty taulukko
       .catch(err => console.error(err))    // tällä nähdään errorit
       }

    const updateCar = (car, link) => {
        fetch(link,  {   // haetaan tiedot tästä URL:sta
            method: 'PUT', // täytyy olla PUT metodi, jotta lähettäää tiedon backendiin tietokantaan
            headers: {      // headers on olio, koska voi sisältää useita keyvalue tietoja
                'Content-Type' : 'application/json' // määritellää otsikko
            },
            body: JSON.stringify(car)  // tämä tietty auto täytyy lähettään bodyyn JSON oliona
           })
        .then(res => fetchData()) // kutsutaan fecthiä uudestaan, jotta saadaan päivitetty taulukko
        .catch(err => console.error(err))    // tällä nähdään errorit
        
    }
 
   // react-tablen luonti
   // react-tablessa pakollisena 2 propsia columns ja data
   // columns on taulukko, jonka sisälle tulee minkä nimisiä sarakkeita halutaan näkyviin (header, accessor)
   // jokainen sarake on oma olio, siksi {} sisään tieto: heder on otsikko, accessor on arvo
   const columns = [
       {
        Header: 'Brand',
        accessor: 'brand'   
       },
       {
        Header: 'Model',
        accessor: 'model'
       },
       {
        Header: 'Color',
        accessor: 'color'
       },
       {
        Header: 'Fuel',
        accessor: 'fuel'
       },    
       {
        Header: 'Year',
        accessor: 'year'
       },
       {
        Header: 'Price',
        accessor: 'price'
       },
       {
        // edit sarakkeen luonti
        // Cell kohdassa luodaan jokaiselle riville omat edit buttonit
        sortable: false,
        filterable: false,
        width: 100,
        Cell: row => <Editcar updateCar={updateCar} car={row.original}/> // Editcar componentti täytyy renderöidä ja sille antaa propsi car, joka saa arvokseen row.original, koska tarvitsemme vain sen tiedon
       },   //Editcar:ille täytyy antaa props updateCar, jolle arvoksi updateCar funktio, jotta sitä voidaan kutsua Editcar componentista
       {
        // delete button sarakkeen luonti
        sortable: false, // poistaa delete columnista sorttauksen (järjestyksen muutos)
        filterable: false, // poistaa delete columnista filteröinnin 
        width: 100, // muutetaan sarakkeen leveys
        accessor:'_links.self.href',    //luodaan linkki(arvo), joka poistetaan
        // luodaan delete buttonit, jokaiselle riville, Cell on nuolifunctio, jonka props row
        // onClickin sisälle deleteCar funtio, jolle parametri row.value, jolloin accessor linkki lähetetään deleteCar funtiolle
        Cell: row => <Button size="small" color="secondary" onClick={() => deleteCar(row.value)}>Delete</Button>
       }    // react-tablen material-ui Buttonin muotoituja löytyy material-ui.com
    
    ]
    // renderöidäään react-table
    // data={cars} saadaan 
    // renderöidään react-tablen columnit
    // filterable:lla saa hakukentän näkyviin jokaisen sarakkeen ylle, joissa voi hakea esim.tietyllä kirjaimella/sanalla taulukosta tietoa
    // lisätään filteröinti renderöimällä filterable props olemaan true
    // renderöidään Addcar (on lapsikomponentti), jotta Carlist tieto välitetään lapsikomponentille
    // Addcar tarvitsee propsin saveCar, jonka arvo on{saveCar} funktio, jotta Addcar componentti voi kutsua saveCar funktiota
    return (
        <div>
            <Addcar saveCar={saveCar}/>
            <ReactTable filterable={true} data={cars} columns={columns} />
        </div>
    );
    } 
    