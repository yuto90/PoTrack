import React, { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { convertTime } from '~/utils/helper';

interface Props {
    reset: boolean
}

export const OrgStopWatch: React.FC<Props> = ({ reset }) => {
    // ローカルストレージから前回の時間を取得するか、初期値0を設定
    const [time, setTime] = useState<number>(Number(localStorage.getItem('time')) || 0);
    // hhmmss形式の文字列を管理
    const [hhmmss, setHhmmss] = useState<string>('00:00:00');

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
            setHhmmss(convertTime(time));
        }
    };

    // 時間をリセットし、ストップウォッチを停止
    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        localStorage.setItem('time', '0');
    };

    const handleTime = (editTime: string) => {
        const [hours, minutes, seconds] = editTime.split(':');
        const secondsTime = Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);

        localStorage.setItem('time', String(secondsTime));

        // 修正済み文字列を時間に変換されたものを格納
        setTime(secondsTime);
        // 修正済文字列を格納
        setHhmmss(editTime);
    };

    return (
        <div className='flex flex-row text-high-green'>
            <div className='flex flex-col md:w-32 text-center'>
                <input
                    type='tel'
                    className='text-3xl bg-gray-four'
                    onFocus={() => { handleStop() }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { handleTime(e.target.value) }}
                    onBlur={() => { handleStart() }}
                    value={isRunning ? convertTime(time) : hhmmss} />
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
