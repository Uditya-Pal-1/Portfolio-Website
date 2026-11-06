import { useState, useEffect } from 'react';

const TimeDisplay = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setTime(`${hours}:${minutes}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="font-mono text-sm tabular-nums tracking-wider text-zinc-400">
            {time || '--:--'}
        </span>
    );
};

export default TimeDisplay;
