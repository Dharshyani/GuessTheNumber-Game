import React, { useEffect, useState } from 'react'
import '../styles/GuessTheNumber.css';

const generateRandomNumber = () => Math.floor(Math.random() * 10) + 1;

const GuessTheNumber = () => {
    const[userNumber, setUserNumber] = useState("");
    const[gameOver, setGameOver] = useState(false);
    const [randomNumber, setRandomNumber] = useState(generateRandomNumber());

    const[message, setMessage] = useState("Welcome! Guess a number between 1 and 10.");

    const[remainingTime, setRemainingTime] = useState(30);

useEffect(() =>{
    if(gameOver) return;

    if(remainingTime <= 0) {
        setMessage(`Game over ! Times up! The number was ${randomNumber}`);
        setGameOver(true)
    }
    else {
    const timer = setInterval(() => {
        setRemainingTime((pre) => pre - 1);
    },1000);
    return () => clearInterval(timer);
    }
}, [remainingTime , gameOver , randomNumber])

    const handleGuess = () => {
        if(parseInt(userNumber) === randomNumber) {
            setMessage("Correct! You guessed the Number");
            setGameOver(true);
        }
        else if(parseInt(userNumber) > randomNumber){
            setMessage("Too high! Try again");
            setGameOver(true);
        }
        else if(parseInt(userNumber) < randomNumber){
            setMessage("Too low! Try again");
            setGameOver(true);
        }
    };

    const handleReset = () => {
        setUserNumber('');
        setMessage('Welcome! Guess a number between 1 and 10.');
        setGameOver(false);
        setRemainingTime(30);
        setRandomNumber(generateRandomNumber());
    }

  return (
    <div className='game-container'>
        <h2 className='game-title'>Guess The Number Game</h2>

        <p
        className={`game-message ${
            gameOver ? parseInt(userNumber) === randomNumber ? "Success" : "failure" : "info"}`}>
        {message}</p>
            
        {!gameOver && (
        <div>
        <input type='number' 
        className='game-input' 
        value={userNumber}
        onChange={(e) => setUserNumber(e.target.value)}>
        </input>
        <button className='game-button' onClick={handleGuess} disabled = {gameOver}>Guess</button>
        </div>
    )}

        <div className='game-starts'>
        <p>Time Left: {remainingTime} seconds</p>

        {gameOver && (
        <button className='reset-button' onClick={handleReset}>Reset</button>
        )}
        </div>
    </div>

  )
}

export default GuessTheNumber; 