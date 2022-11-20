
import './App.css';
import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';



function App() {
const [page, setPage] = useState("customer")

const changePage = (event, page) =>{
  setPage(page)
}

  return (
    <div className="App">
      <AppBar position ='static' color="secondary">
        <Toolbar>
            <Typography variant='h6'>Pasi's training centre</Typography>
            <Tabs textColor = "inherit" value={page} onChange = {changePage}>
              <Tab value = "customer" label ="Customers"/>
              <Tab value = "training" label = "Trainings"/>
            </Tabs>
        </Toolbar>
      </AppBar>
      {page === "customer" && <Customers/>}
      {page === "training" && <Trainings/>}
    </div>
  );
}

export default App;
