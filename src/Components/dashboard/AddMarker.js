import React, {Component,useState} from 'react';
import { MapContainer, TileLayer, Tooltip,Marker, Popup , useMapEvents} from 'react-leaflet';

const AddMarker = ()=>{
  

        const [position, setPosition] = useState(null)
        const map = useMapEvents({
            click(e) {
               setPosition(e.latlng)
               console.log(e.latlng);
             
            },
           
          })
       
      return position === null ? null : (
            <Marker position={position}>
              <Popup>You are here</Popup>
            </Marker>
          
      
      );
    
  }

export default AddMarker;