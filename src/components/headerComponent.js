import React from 'react';

export default function Header(props) {
    return(
        <>
            <h1 className="game-title">
                Memory Game
            </h1>            
            <div className="instructions">
                Match all the cards within the given time.
            </div>            
        </>
    );
}