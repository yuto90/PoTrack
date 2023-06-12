import React, { useState, useEffect, useRef } from 'react';
import { formatTime } from '~/utils/helper';

interface Props {
    reset: boolean
}

export const OrgStopWatch: React.FC<Props> = ({ reset }) => {
    // ローカルストレージから前回の時間を取得するか、初期値0を設定
    const [time, setTime] = useState<number>(Number(localStorage.getItem('time')) || 0);

    // ローカルストレージからストップウォッチの状態を取得するか、初期値falseを設定
    const [isRunning, setIsRunning] = useState<boolean>(localStorage.getItem('isRunning') === 'true');

    // setIntervalの参照を保存するためのRef
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // isRunningが更新されたら発火
    useEffect(() => {
        // RunningフラグがtrueであればIntervalを継続させる
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }

        // ストップウォッチの状態が変更されるたびにローカルストレージに保存
        localStorage.setItem('isRunning', String(isRunning));

        // コンポーネントのアンマウント時にタイマーをクリア
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    // timeが更新されたら発火
    useEffect(() => {
        // 時間が変更されるたびにローカルストレージに保存
        localStorage.setItem('time', String(time));
    }, [time]);

    // OrgCreateTodoのリセットフラグが更新されたら発火
    useEffect(() => {
        handleReset()
    }, [reset]);

    const handleStart = () => {
        // ストップウォッチが動作中でなければ開始
        if (!isRunning) {
            setIsRunning(true);
        }
    };

    const handleStop = () => {
        // ストップウォッチが動作中であれば停止
        if (isRunning) {
            setIsRunning(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    };

    // 時間をリセットし、ストップウォッチを停止
    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        localStorage.setItem('time', '0');
    };

    return (
        <div className='flex flex-row text-high-green'>
            <div className='flex flex-col md:w-32 text-center'>
                <input className='text-3xl bg-gray-four' value={formatTime(time)} />
                <div className="flex justify-between">
                    {isRunning
                        ? <button onClick={handleStop}>Stop</button>
                        : <button onClick={handleStart}>Start</button>
                    }
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
};
