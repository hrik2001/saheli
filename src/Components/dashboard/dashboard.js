import React, {Component,useState} from 'react';
import { MapContainer, TileLayer, Tooltip,Marker, Popup , Circle} from 'react-leaflet';
import  './dashboard.css';
import AddMarker from './AddMarker';
import Navbar from '../Navigation/Navbar';
import  NativeSelects from './filters';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Content from './toolContent';

class Dashboard extends Component {
    
  
    render() {
        const place = [{
            title:"gijore",
            name:"rik",
            position:[41.505,-0.09],
            age:"20"
        },{
            title:"sec 53",
            name:"Ayush",
            position:[41.501249547569905,-0.10213851928710939],
            age:"21"
        }]
       
      return (
         <> 
            <Navbar/>
            <div className="dashboard">
                <MapContainer
                center={{ lat: 41.505, lng: -0.09 }}
                zoom={13}
                scrollWheelZoom={false}
                className="map"
                >

                {place.map((x,index)=>{
                    console.log(x);
                    return(
                    <Marker position={x.position}
                    key={x.name}>
                        <Tooltip
                            direction="bottom" 
                            offset={[-10, 20]} 
                            opacity={1}>

                            <Content 
                                name={x.name} 
                                age={x.age} 
                                location={x.title}/>

                        </Tooltip>   
                        <Circle
                            center={x.position}
                           
                            pathOptions={{ fillColor: 'blue' }}
                            radius={400}>
                            <Tooltip>{x.name}</Tooltip>
                        </Circle>
                    </Marker>   
                    )
                }) }
                <AddMarker/>
                
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            
                </MapContainer>
                <NativeSelects/>
            </div>
        </>
     );
    }
  }

export default Dashboard;