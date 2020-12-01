import React, { useState } from 'react';

import {db} from '../firebase';

//props has the time taken by the player

function enterValueToDB(name,timeTaken) {
    db.ref("/timesTaken").push({
        name: name,
        timeTaken: timeTaken
    });
}

export default function TopTenForm(props) {
    let centiseconds = ("0" + (Math.floor(props.timeTaken / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(props.timeTaken / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(props.timeTaken / 60000) % 60)).slice(-2);
    const [name,setName] = useState('');
    return(
        <div className="input-form">
            Congrats you cracked the top ten <br/>You have taken {minutes} : {seconds} : {centiseconds}<br/><br/>
            <form onSubmit={()=>{enterValueToDB(name,props.timeTaken)}}>
                <label htmlFor="name">
                    Name:
                </label>
                <input  id="name" type="text" onChange={e=>{setName(e.target.value)}} value={name}></input>
                <input type="submit" value="submit" />
            </form>
        </div>
    );
}