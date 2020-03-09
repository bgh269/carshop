// importoinnit, jotta voi käyttää material-ui kirjaston muotoituja
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Addcar(props) { // Addcar funktiolla oltava props(argumenttina) tiedon välitystä varten vanhempikomponentilta(CArlist)
   
    const [open, setOpen] = React.useState(false); // koska tämä state on false dialogi ei näy alkuun
    const [car, setCar] = React.useState({      // tässä luodaan tyhjä car olio, johon lomakkeelle syötetyt tiedot tullaan tallentamaan
        brand: '', model: '', color: '', fuel: '', year: '', price: ''  // asetetaan alkuarvot tyhjiksi
    })

    const handleClickOpen = () => {
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

    const addCar = () => {
        props.saveCar(car); //saveCar funktion tieto välitetään propsina addCar funktiolle
        handleClose();      //props.saveCar() saa sulkuihin argumenttina car useStaten 
    }   //handleClose() sulkee dialogin
   
    // eka Button(Add car) default asetuksena näkyy
    // kun painetaan Add car Buttonia(onClick) tapahtuu handleClickOpen funktio, jossa dialogi asetetaan näkyväksi setOpen(true)
    // kun dialogi(lomake) suljetaan(onClose) tapahtuu handleClose funtio, jossa dialogi asetetaan näkymättömäksi setOpen(false)
    // lomakkeen sisällä on DialogContent, jonka sisällä TextField kentät, missä kerrotaan mitä tietoja tulee kirjata ylös
    
    return (
    <div>
    <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Car
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Car</DialogTitle>
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
            <Button onClick={addCar} color="primary">   
                Save
            </Button>
        </DialogActions>
    </Dialog> 
    </div>
   );
  }
  // Button onClick kutsuu addCar funktiota