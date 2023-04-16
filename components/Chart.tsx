import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({ chartLabels, wpmData, accuracyData }: { chartLabels: Array<number>, wpmData: Array<number>, accuracyData: Array<number> }) => {

    const rootStyles = getComputedStyle(document.documentElement);
    const mainColor = rootStyles.getPropertyValue('--main-color');
    const subColor = rootStyles.getPropertyValue('--sub-color');
    const data = {
        labels: [] as number[],
        datasets: [
            {
                label: 'WPM',
                data: [] as number[],
                fill: true,
                backgroundColor: mainColor,
                borderColor: mainColor,
                lineTension: 0.4,
                yAxisID: 'y',
            },
            {
                label: 'Accuracy',
                data: [] as number[],
                fill: true,
                backgroundColor: subColor,
                borderColor: subColor,
                lineTension: 0.4,
                yAxisID: 'y1',
            },
        ],
    };

    const options: any = {
        tooltips: {
            enabled: true,
            mode: 'label',
        },
        bezierCurve: true,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                display: false,
                labels: {
                    usePointStyle: true,
                    font: {
                        size: 14,
                        family: 'lexend, sans-serif',
                    },
                },
            },
            title: {
                display: false,
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Test',
                    color: subColor,
                    font: {
                        size: 16,
                        family: 'lexend, sans-serif',
                    },
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    font: {
                        family: 'lexend, sans-serif',
                    },
                    color: subColor
                },
                grid: {
                    color: (context: any) => {
                        if (context.tick.value === data.labels[data.labels.length - 2] || context.tick.value === 0) {
                            return subColor
                        }
                        else {
                            return subColor + "15"
                        }
                    },
                },
            },
            y: {
                min: 0,
                max: Math.max(...wpmData) > 150 ? 290 : 200,
                position: 'left',
                title: {
                    display: true,
                    text: 'Words per minute',
                    color: subColor,
                    font: {
                        size: 16,
                        family: 'lexend, sans-serif',
                    },
                },
                ticks: {
                    font: {
                        family: 'lexend, sans-serif',
                    },
                    color: subColor,

                },
                grid: {
                    color: (context: any) => {
                        if (context.tick.value === 0) {
                            return subColor
                        }
                        else {
                            return subColor + "15"
                        }
                    },
                },
            },
            y1: {
                position: 'right',
                max: 120,
                min: 0,
                title: {
                    display: true,
                    text: 'Accuracy',
                    color: subColor,
                    font: {
                        size: 16,
                        family: 'lexend, sans-serif',
                    },
                },
                ticks: {
                    font: {
                        family: 'lexend, sans-serif',
                    },
                    color: subColor,
                },
                grid: {
                    color: (context: any) => {
                        if (context.tick.value === 0) {
                            return subColor
                        }
                        else {
                            return "transparent"
                        }
                    },
                },
                border: {
                    color: subColor
                }
            },
        },
        elements: {
            point: {
                radius: 2,
            },
        },
    };

    data.labels = chartLabels;
    data.datasets[0].data = wpmData;
    data.datasets[1].data = accuracyData;

    return (
        <div style={{ width: "70%", height: "400px", marginTop: "7rem" }}>
            <Line options={options} data={data} />
        </div>
    );
}

export default Chart;