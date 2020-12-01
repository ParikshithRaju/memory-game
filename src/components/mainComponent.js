import React,{useState} from 'react';


import Header from './headerComponent';
import Game from './gameComponent';
import HighScores from './highScoresComponent';

import {db} from '../firebase';
let setHighScores;

db.ref("/timesTaken").orderByChild("timeTaken").limitToFirst(10).on("value",(snapshot)=>{
    let arr = [];
    snapshot.forEach((childSnapshot)=>{
       arr.push(childSnapshot.val());
    });
    if(setHighScores!==undefined)
    {
        setHighScores(arr);
    }
});


export default function Main(props) {

    const highScoresHook = useState([]);
    const highScores = highScoresHook[0];
    setHighScores = highScoresHook[1];

    return(
        <>
            <Header/>
            <Game />
            <HighScores highScores = {highScores} />
        </>
    );
}