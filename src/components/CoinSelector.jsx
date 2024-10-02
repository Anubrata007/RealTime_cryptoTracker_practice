import React from 'react';

const CoinSelector = ({ selectedCoin, setSelectedCoin }) => {
    const coins = ['ETH/USDT', 'BNB/USDT', 'DOT/USDT'];

    return (
        <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)}>
            {coins.map((coin) => (
                <option key={coin} value={coin}>
                    {coin}
                </option>
            ))}
        </select>
    );
};

export default CoinSelector;
