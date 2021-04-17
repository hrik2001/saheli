import React from 'react';
import './dashboard.css'
import RoomIcon from '@material-ui/icons/Room';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';


export default function Key() {
  
  return (

  <div className="key_text">
      <p>KEY</p>
     <div className="key">

        <div className="label">
            <RoomIcon/>
            <p>Individual</p>
           
        </div>

        <div className="label">
            <ChangeHistoryIcon/>
            <p>Group</p>
        </div>

       </div>
    </div>
  );
}