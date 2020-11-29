import React,{useState,useEffect} from 'react';


import {myUtils} from '../my_utils';
import SquareDisplay from './squareDisplayComponent';


const utils = new myUtils();

const initalGameState = utils.arrayOfColors(12).map(
    (color) => {
        return(
            {
                color: color,
                clicked: false,
                matched: false
            }
        );
    }
);



export default function Game(props) {
    const [squares,setSquares] = useState(initalGameState);
    const [gameStatus,setGameStatus] = useState("not-started");
    const [timeElapsed,setTimeElapsed] = useState(0);
    const [timeStart,setTimeStart] = useState(0);
    const [timerId,setTimerId] = useState(0);

    useEffect(()=>{

        const clickedSquares = []
        for(let i=0;i<squares.length;i++)
        {
            if(squares[i].clicked)
            {
                clickedSquares.push({...squares[i],index: i});
            }
        }
        if(clickedSquares.length === 2)
        {
            if(clickedSquares[0].color === clickedSquares[1].color)
            {
                const newState1 = [
                ...squares.slice(0,clickedSquares[0].index).map( obj=> { return{...obj} }) ,
                {
                    color: squares[clickedSquares[0].index].color,
                    clicked: false,
                    matched: true
                },
                ...squares.slice(clickedSquares[0].index+1,clickedSquares[1].index).map( obj => { return({...obj}) } ),
                {
                    color: squares[clickedSquares[1].index].color,
                    clicked: false,
                    matched: true
                },
                ...squares.slice(clickedSquares[1].index+1,squares.length).map( obj => { return({...obj}) } )
                ];
                setTimeout(()=>{
                    setSquares(newState1);
                },500);
                clickedSquares.length = 0;
            }
            else
            {
                const newState2 = [
                    ...squares.slice(0,clickedSquares[0].index).map( obj=> { return{...obj} }) ,
                    {
                        color: squares[clickedSquares[0].index].color,
                        clicked: false,
                        matched: false
                    },
                    ...squares.slice(clickedSquares[0].index+1,clickedSquares[1].index).map( obj => { return({...obj}) } ),
                    {
                        color: squares[clickedSquares[1].index].color,
                        clicked: false,
                        matched: false
                    },
                    ...squares.slice(clickedSquares[1].index+1,squares.length).map( obj => { return({...obj}) } )
                    ];
                    setTimeout(()=>{
                        setSquares(newState2);
                    },500);
                    clickedSquares.length = 0;
            }
        }
    },[squares]);

    useEffect(()=>{
        if(gameStatus === "started")
        {
        const _timerId = setInterval(() => {
            setTimeElapsed(Date.now()-timeStart);
            }, 10);
            setTimerId(_timerId);
        }
    },[gameStatus,timeStart])


    const startTimer = () => {
        setTimeStart(Date.now());
    }


    const stopTimer = () => {
        console.log(timerId);
        clearInterval(timerId);
    }


    const startGame = () => {
        startTimer();
        setGameStatus("started");
    }


    const clickHandler = (ind) => {
        if(squares[ind].matched)
        {
            return;
        }
        if(squares[ind].clicked)
        {
            const newState = [...squares.slice(0,ind),{
                color: squares[ind].color,
                clicked: false,
                matched: false
            },...squares.slice(ind+1,squares.length)];
            setSquares(newState);
            return;
        }
        const newState = [...squares.slice(0,ind),{
            color: squares[ind].color,
            clicked: true,
            matched: false
        },...squares.slice(ind+1,squares.length)];
        setSquares(newState);
    }


    const gameIsCompleted = squares.filter(square => !square.matched).length === 0;

    if(gameIsCompleted)
    {
        stopTimer();
    }

    let centiseconds = ("0" + (Math.floor(timeElapsed / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timeElapsed / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timeElapsed / 60000) % 60)).slice(-2);

    return(
        <>

            {gameStatus === "started" && !gameIsCompleted ? <div className="timeDisplay">{minutes} : {seconds} : {centiseconds}</div> : ""}
            <div className="game-wrapper">
                { 
                    gameStatus==="not-started" ? <button onClick={startGame}>Start Game</button> : 
                    gameIsCompleted ? <div> Time taken {minutes} : {seconds} : {centiseconds} </div> : <SquareDisplay 
                                                                                timeElapsed = {timeElapsed}
                                                                                squares = {squares}
                                                                                clickHandler = {clickHandler}/>
                }
            </div>
        </>
    );
}