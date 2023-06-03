import React, { useState, useRef } from 'react';

export function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(0);

    // ストップウォッチを起動
    function handleStart() {
        setIsRunning(true);
        // setIntervalから後でclearするのに必要なintervalidが返却されるのでuseRefに格納しておく
        intervalRef.current = window.setInterval(() => {
            setTime(prevTime => prevTime + 10);
        }, 10);
    }

    // 停止
    function handlePause() {
        // intervalidを引数で渡してintervalを止める
        clearInterval(intervalRef.current);
        setIsRunning(false);
    }

    // リセット
    function handleReset() {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setTime(0);
    }

    //const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);

    return (
        <div className='flex flex-row'>
            <div className='flex flex-col'>
                <p className='text-high-green text-3xl'>{hours}:{minutes}:{seconds}</p>
                <div className="flex justify-between">
                    {isRunning ? (
                        <button className='text-high-green' onClick={handlePause}>Pause</button>
                    ) : (
                        <button className='text-high-green' onClick={handleStart}>Start</button>
                    )}
                    <button className='text-high-green' onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}

