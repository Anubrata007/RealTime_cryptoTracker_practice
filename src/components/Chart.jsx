import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import date adapter for time handling
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

// Register all components from Chart.js and the financial chart components
Chart.register(...registerables);
Chart.register(CandlestickController, CandlestickElement); // Register candlestick components

const ChartComponent = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const chartInstance = new Chart(ctx, {
            type: 'candlestick', // Set the type to candlestick
            data: {
                datasets: [{
                    label: 'Price',
                    data: data.map((d) => ({
                        x: new Date(d.t), // Convert timestamp to Date object
                        o: d.o,
                        h: d.h,
                        l: d.l,
                        c: d.c,
                    })),
                    barThickness: 10, // Change the width of candlestick
                }],
            },
            options: {
                scales: {
                    x: {
                        type: 'time', // Set x-axis type to time
                        title: {
                            display: true,
                            text: 'Time',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price',
                        },
                        beginAtZero: false,
                    },
                },
            },
        });

        return () => {
            chartInstance.destroy();
        };
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default ChartComponent;
