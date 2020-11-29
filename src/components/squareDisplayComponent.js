import React from 'react';


function Square(props) {
    return(
    <button className="square" 
    style={props.squareObj.matched ? {backgroundColor: 'gray'} : props.squareObj.clicked ? {backgroundColor: props.squareObj.color} : {}} 
    key={props.id}
    onClick = {()=> props.onClick(props.id)}>
    </button>
    );
}


export default function SquareDisplay(props) {

    return(
        <>
            {
                props.squares.map(
                (square,i) => <Square squareObj={square} 
                                    id={i} 
                                    onClick={props.clickHandler}/>
                )
            }
        </>
    );
}