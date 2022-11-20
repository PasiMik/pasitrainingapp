import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

function AddTraining(props){    
    console.log(props.data)
    const [training, setTraining] = useState({
        date:"",
        activity:"",
        duration:"",
        customer: props.data.links[0].href 

    });

    const[open, setOpen]=useState(false);
    
    

    const handleClickOpen = () =>{
        setOpen(true);
     }
    
     const handleClose = () => {
        setOpen(false);
     }

     const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
        setTraining({
            date:"",
            activity:"",
            duration:"",
            customer:"",
         });      
     }

     const changeDate = (newValue) => {
        setTraining({...training, date: newValue})
      }  
    
     return(
        <div>
      <Button variant="contained" color='success' startIcon={<DirectionsRunIcon/>} onClick={handleClickOpen}>
        Add new training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker         
            label="Date and time"
            value={training.date}
            onChange={(newValue) => {
                changeDate(newValue);
                               
            }}
            renderInput ={(params) => <TextField {...params}/>}
          />
          </LocalizationProvider>
           <TextField
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
            value={training.activity}
            onChange={e => setTraining({...training, activity: e.target.value})}
          />
           <TextField
            margin="dense"
            label="Duration"
            fullWidth
            variant="standard"
            value={training.duration}
            onChange={e => setTraining({...training, duration: e.target.value})}
          />      
         </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
     )

}

export default AddTraining;