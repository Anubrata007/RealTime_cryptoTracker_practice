import React, { useState, useEffect } from 'react';
import CoinSelector from './components/CoinSelector';
import ChartComponent from './components/Chart';
import useWebSocket from './hooks/useWebSocket';

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState('ETH/USDT');
  const [interval, setInterval] = useState('1m');
  const [historicalData, setHistoricalData] = useState({});

  const symbolMap = {
    'ETH/USDT': 'ethusdt',
    'BNB/USDT': 'bnbusdt',
    'DOT/USDT': 'dotusdt',
  };

  const data = useWebSocket(symbolMap[selectedCoin], interval);

  useEffect(() => {
    setHistoricalData((prev) => ({
      ...prev,
      [selectedCoin]: data,
    }));
  }, [data, selectedCoin]);

  return (
    <div className='container mx-auto flex flex-col align-middle text-center items-center py-12'>
      <div className='flex flex-col gap-6 pb-5'>
        <h1 className="text-2xl font-bold">Crypto Chart</h1>
        <div className='flex gap-5'>
          <CoinSelector selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />
          <button>
            <select onChange={(e) => setInterval(e.target.value)} value={interval}>
              <option value="1m">1 Minute</option>
              <option value="3m">3 Minutes</option>
              <option value="5m">5 Minutes</option>
            </select>
          </button>
        </div>
      </div>
      <ChartComponent data={historicalData[selectedCoin] || []} />
    </div>
  );
};

export default App;
