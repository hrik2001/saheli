import React from "react";
import Navbar from '../Navigation/Navbar';
import TextField from '@material-ui/core/TextField';
import styles from './form.module.css';
import Button from '@material-ui/core/Button';

 function TravellingForm()  {

    const [location,locationHandler]=React.useState({from:null, to:null,mode:null});
    
    const editHandler= (e,form)=>{
        locationHandler({...location,[form]:e.target.value});
        console.log(location);
    }

    return (
        <>
            <Navbar/>
              <h3 className={styles.heading}>Please fill up these details real quick!</h3>
                <form  autoComplete="off">

                  <div className={styles.form}> 
                    <TextField type="text" onChange={(e)=>editHandler(e,"from")} id="standard-basic" label="Travelling from" required/>
                    <TextField type="text" onChange={(e)=>editHandler(e,"to")} id="standard-basic" label="Travelling to" required />
                    <TextField type="text" onChange={(e)=>editHandler(e,"mode")} id="standard-basic" label="Mode of transport" required/>
                  </div>
                <div  className={styles.sumbitButton}>
                  <Button type="sumbit" variant="contained" color="primary">Sumbit</Button>
                </div>

                </form>

                
        </>
      );
}

export default TravellingForm;