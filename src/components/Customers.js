import React, {useState, useEffect} from 'react';
import { API_URL } from '../constants';
import { AgGridReact } from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';


function Customers() {
    const[customers, setCustomers] = useState([]);
    const[columnDefs] = useState([
      {field: 'firstname', headerName:'FIRSTNAME', sortable: true, filter: true, floatingFilter: true},
      {field: 'lastname', headerName:'LASTNAME', sortable: true, filter: true, floatingFilter: true},
      {field: 'streetaddress', headerName:'STREETADDRESS', sortable: true, filter: true, floatingFilter: true},
      {field: 'postcode', headerName:'POSTCODE', sortable: true, filter: true, floatingFilter: true},
      {field: 'city', headerName:'CITY', sortable: true, filter: true, floatingFilter: true},
      {field: 'email', headerName:'EMAIL', sortable: true, filter: true, floatingFilter: true},
      {field: 'phone', headerName:'PHONE', sortable: true, filter: true, floatingFilter: true},
      {
        width: 200,
        cellRenderer: params => <EditCustomer data={params.data} updateCustomer ={updateCustomer}/>
      },
      {
        width: 150,
        cellRenderer: params => <Button variant="contained" color="error" size="small" startIcon={<DeleteIcon/>} onClick={()=> deleteCustomer(params.data)}>Delete</Button>
      }

    ]);


    const getCustomers = () =>{ 
        fetch(API_URL + "/customers")
        .then(response =>{
            if(response.ok)
                return response.json()
            else
                alert("Something went wrong in the fetch")
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    };

    useEffect(() =>{
        getCustomers();
    },[]);

    const addCustomer = (customer) =>{
        fetch(API_URL + "/customers",{
            method: 'POST',
            headers: { 'Content-type':'application/json' },
            body: JSON.stringify(customer)
        })
        .then(response =>{
            if(response.ok)
                getCustomers();
            else
                alert("Something went wrong in addition")
        })
        .catch(err => console(err))
    }

    const updateCustomer=(customer, url)=>{
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type':'application/json' },
            body: JSON.stringify(customer) 
        })
        .then(response => {
            if(response.ok)
                getCustomers();
            else
                alert('Something went wrong in edition')
        })
        .catch(err=> console(err))
    }

    const deleteCustomer = (data) => {
        if(window.confirm('Do you want to delete this customer?')){
            fetch(data.links[1].href, {method:'DELETE'})
            .then(response =>{
                if(response.ok){
                    getCustomers();                    
                }
                else{
                    alert('Something went wrong in deletion')
                }    
       });
    }
    }

    return(
        <>
        <AddCustomer addCustomer={addCustomer}/>
        <div className='ag-theme-material' style={{height:600, width: '100%', margin: 'auto'}}>
            <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}>
            </AgGridReact>
        </div>          
        </>
    )
}
export default Customers;