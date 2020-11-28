import React from 'react';


import Header from './headerComponent';
import Game from './gameComponent';

export default function Main(props) {
    return(
        <>
            <Header/>
            <Game />
        </>
    );
}