import React from 'react';



export default function HighScores(props) {
    const convertTime = (timeElapsed) => {
        let centiseconds = ("0" + (Math.floor(timeElapsed / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(timeElapsed / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timeElapsed / 60000) % 60)).slice(-2);

        return({
            minutes,
            seconds,
            centiseconds
        });
    }
    return(
        <>
            <h3>Top ten scores:</h3>
            <ol>
                {props.highScores.map((score,ind)=> {
                    const convertedTime = convertTime(score.timeTaken);
                    return(
                    <li key={ind}><span className="score-name">{score.name} = </span>{convertedTime.minutes} : {convertedTime.seconds} : {convertedTime.centiseconds}</li>
                    );
                })}
            </ol>
        </>
    );
}
