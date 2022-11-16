import React, {useState, useEffect} from 'react';
import { API_URL } from '../constants';
import { AgGridReact } from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';


function Customers() {
    const[customers, setCustomers] = useState([]);
    const[columnDefs] = useState([
      {field: 'firstname', headerName:'FIRSTNAME', sortable: true, filter: true, floatingFilter: true},
      {field: 'lastname', headerName:'LASTNAME', sortable: true, filter: true, floatingFilter: true},
      {field: 'streetaddress', headerName:'STREETADDRESS', sortable: true, filter: true, floatingFilter: true},
      {field: 'postcode', headerName:'POSTCODE', sortable: true, filter: true, floatingFilter: true},
      {field: 'city', headerName:'CITY', sortable: true, filter: true, floatingFilter: true},
      {field: 'email', headerName:'EMAIL', sortable: true, filter: true, floatingFilter: true},
      {field: 'phone', headerName:'PHONE', sortable: true, filter: true, floatingFilter: true}
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

    return(
        <div className='ag-theme-material' style={{height:600, width: '100%', margin: 'auto'}}>
            <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}>
            </AgGridReact>
        </div>
    )
}
export default Customers;