import React, {useState, useEffect} from 'react';
import { API_URL } from '../constants';
import { API_URL1 } from '../constants';
import { AgGridReact } from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import { ModeComment } from '@mui/icons-material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Trainings() {
    const[trainings, setTrainings] = useState([])
    const[columnDefs] = useState([
        {field: 'date', headerName:'DATE AND TIME', sortable: true, filter: true, floatingFilter: true, cellRenderer:(data) => {return (new Date(data.value)).toLocaleDateString("fi-FI") 
                                                                                                                        +" klo. " + (new Date(data.value)).toLocaleTimeString("fi-FI", {timeStyle: "short"})}},
        {field: 'duration', headerName:'DURATION IN MIN', sortable: true, filter: true, floatingFilter: true},
        {field: 'activity', headerName:'ACTIVITY', sortable: true, filter: true, floatingFilter: true},
        {field: 'customer.firstname', headerName:'FIRSTNAME', sortable: true, filter: true, floatingFilter: true}, 
        {field: 'customer.lastname', headerName:'LASTNAME', sortable: true, filter: true, floatingFilter: true},
        {
            width: 215,
            cellRenderer: params => <Button variant="contained" color="error" size="small" startIcon={<DeleteIcon/>} onClick={()=> deleteTraining(params.data)}>Delete training</Button>
          }       
      ]);

      

      const getTrainings = () =>{ 
        fetch(API_URL1 + "/gettrainings")
        .then(response =>{
            if(response.ok)
                return response.json()
            else
                alert("Something went wrong in the fetch")
        })
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    };

    useEffect(() =>{
        getTrainings();
    },[]);

    const deleteTraining= (data) => {
        if(window.confirm('Do you want to delete this training?')){
            fetch(API_URL + "/trainings/" + data.id, {method:'DELETE'})
            .then(response =>{
                if(response.ok){
                    getTrainings();                    
                }
                else{
                    alert('Something went wrong in deletion')
                }    
       });
    }
    }


    return(        
        <div className='ag-theme-material' style={{height:800, width: '100%', margin: 'auto'}}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}>
            </AgGridReact>
        </div>       
    )
}
export default Trainings;