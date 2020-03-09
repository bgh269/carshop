// importoinnit, jotta voi käyttää material-ui kirjaston muotoituja
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Editcar(props) { // Addcar funktiolla oltava props(argumenttina) tiedon välitystä varten vanhempikomponentilta(CArlist)
   
    const [open, setOpen] = React.useState(false); // koska tämä state on false dialogi ei näy alkuun
    const [car, setCar] = React.useState({      // tässä luodaan tyhjä car olio, johon lomakkeelle syötetyt tiedot tullaan tallentamaan
        brand: '', model: '', color: '', fuel: '', year: '', price: ''  // asetetaan alkuarvot tyhjiksi
    })

    // tässä laitetaan/muutetaan car taulukkoon tiedot
    // setCat asettaa attribuutit tulemaan props.car:ista, joka on car siltä riviltä, josta painettiin edit painiketta
    // eli vain sen yhden rivin auton tietoja muutetaan
    // koska dialog textfieldissä value={car.bränd}jne sieltä saadaan jo taulukossa olevan auton tiedot, joita lähdetään muuttamaan
    const handleClickOpen = () => {
      //console.log(props.car); tällä voi tsekata console logista mitä tapahtuu muutoksia tehdessä
      setCar({brand: props.car.brand, model: props.car.model, color: props.car.color, 
        fuel: props.car.fuel, year: props.car.year, price: props.car.price})
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    // tässä tallentaan lomakkeelta saadut tiedot auto olioina jo olemassa olevaan autotaulukkoon(...car)
    // event.target.name ottaa nimen ja event.target.value antaa arvot syöttökentistä
    const handleInputChange = (event) =>{
        setCar({...car, [event.target.name]: event.target.value})
    }

    const updateCar = () => {
        props.updateCar(car, props.car._links.car.href); //updateCar funktion tieto välitetään propsina updateCar funktiolle 
        handleClose();      //props.saveCar() saa sulkuihin argumenttina car useStaten ja linkin parsitusta JSON taulukosta seur. polulla props.car._links.car.href
    }   //handleClose() sulkee dialogin
   
    // eka Button(Add car) default asetuksena näkyy
    // kun painetaan Add car Buttonia(onClick) tapahtuu handleClickOpen funktio, jossa dialogi asetetaan näkyväksi setOpen(true)
    // kun dialogi(lomake) suljetaan(onClose) tapahtuu handleClose funtio, jossa dialogi asetetaan näkymättömäksi setOpen(false)
    // lomakkeen sisällä on DialogContent, jonka sisällä TextField kentät, missä kerrotaan mitä tietoja tulee kirjata ylös
    
    return (
    <div>
    <Button color="primary" onClick={handleClickOpen}>
        Edit
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="brand"
                    value={car.brand}
                    onChange={event => handleInputChange(event)}
                    label="Brand"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="model"
                    value={car.model}
                    onChange={event => handleInputChange(event)}
                    label="Model"
                    fullWidth
                />
                  <TextField
                    margin="dense"
                    name="color"
                    value={car.color}
                    onChange={event => handleInputChange(event)}
                    label="Color"
                    fullWidth
                />
                  <TextField
                    margin="dense"
                    name="year"
                    value={car.year}
                    onChange={event => handleInputChange(event)}
                    label="Year"
                    fullWidth
                />
                   <TextField
                    margin="dense"
                    name="fuel"
                    value={car.fuel}
                    onChange={event => handleInputChange(event)}
                    label="Fuel"
                    fullWidth
                />
                   <TextField
                    margin="dense"
                    name="price"
                    value={car.price}
                    onChange={event => handleInputChange(event)}
                    label="Price"
                    fullWidth
                />
            </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={updateCar} color="primary">   
                Save
            </Button>
        </DialogActions>
    </Dialog> 
    </div>
   );
  }
  // Button onClick kutsuu updateCar funktiota