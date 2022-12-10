import React, {useState, useEffect} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import { API_URL1 } from '../constants';

import "react-big-calendar/lib/css/react-big-calendar.css";


  

function TrainingCalendar(){  
    const[trainings, setTrainings] = useState([])
    const localizer = momentLocalizer(moment);

    useEffect(() => {
        getTrainings()
    }, []);

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
    
    const events = trainings.map((training) => 
        training = {  
        start: moment(training.date).toDate(),
        end: moment(training.date).add(training.duration, 'minutes').toDate(),
        title:training.activity + "/" + training.customer.firstname + " " + training.customer.lastname,
        }
    );

    return(
        <div>
        <Calendar
        localizer={localizer}
        events={events}       
        startAccessor="start"
        endAccessor="end"
        titleAccessor='title'
        style={{ height: 500, margin: "50px" }}
        />
    </div>
        
    )

}
export default TrainingCalendar;