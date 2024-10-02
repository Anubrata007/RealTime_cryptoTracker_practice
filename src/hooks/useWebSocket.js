import { useEffect, useState } from 'react';

const useWebSocket = (symbol, interval) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`);

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            const kline = message.k;
            if (kline) {
                setData((prevData) => [...prevData, kline]);
            }
        };

        return () => {
            ws.close();
        };
    }, [symbol, interval]);

    return data;
};

export default useWebSocket;
