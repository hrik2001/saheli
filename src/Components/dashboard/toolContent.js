import React from "react";

export default function content(props){
    
    return (
        <div>
            <p>{props.name}</p>
            <p>{props.age}</p>
            <p>{props.location}</p>
        </div>
    );
}