import React,{useState,useEffect} from 'react';


import {myUtils} from '../my_utils';


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

function Square(props) {
    return(
    <button className="square" 
    style={props.squareObj.matched ? {backgroundColor: 'gray'} : props.squareObj.clicked ? {backgroundColor: props.squareObj.color} : {}} 
    key={props.id}
    onClick = {()=> props.onClick(props.id)}>
    </button>
    );
}

export default function Game(props) {
    const [squares,setSquares] = useState(initalGameState);

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
    });

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

    return(
        <div className="game-wrapper">
            {squares.map(
                (square,i) => <Square squareObj={square} id={i} onClick={clickHandler}/>
            )}
        </div>
    );
}