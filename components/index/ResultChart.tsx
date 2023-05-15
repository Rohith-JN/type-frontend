import React from 'react';
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

const ResultChart = ({ chartLabels, wpmData, incorrectChars, typedWords }: { chartLabels: Array<number>, wpmData: Array<number>, incorrectChars: Array<any>, typedWords: Array<String> }) => {

    const rootStyles = getComputedStyle(document.documentElement);
    const mainColor = rootStyles.getPropertyValue('--main-color');
    const subColor = rootStyles.getPropertyValue('--sub-color');
    const errorColor = rootStyles.getPropertyValue('--error-color');

    const data = {
        labels: [] as number[],
        datasets: [
            {
                label: 'Continuous WPM',
                data: [] as number[],
                fill: true,
                backgroundColor: mainColor,
                borderColor: mainColor,
                borderWidth: 3,
                lineTension: 0.4,
                yAxisID: 'y',
            },
            {
                label: 'Incorrect Characters',
                data: [] as number[],
                fill: true,
                borderColor: function (context: any) {
                    const dataPoint = context.dataset.data[context.dataIndex];
                    if (dataPoint && dataPoint.hasOwnProperty('y') && dataPoint.y === 0) {
                        return 'transparent';
                    } else {
                        return errorColor;
                    }
                },
                backgroundColor: function (context: any) {
                    const dataPoint = context.dataset.data[context.dataIndex];
                    if (dataPoint && dataPoint.hasOwnProperty('y') && dataPoint.y === 0) {
                        return 'transparent';
                    } else {
                        return errorColor;
                    }
                },
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 8,
                showLine: false,
                yAxisID: 'y1',
                pointStyle: 'cross'
            },
        ],
    };

    const title = (tooltipItems: any[]) => {
        if (tooltipItems.length > 0) {
            const dataIndex = tooltipItems[0].dataIndex;
            const typedWord = typedWords[dataIndex];
            return `'${typedWord}'`;
        }
        return '';
    };

    const options: any = {
        tooltips: {
            enabled: true,
            mode: 'label',
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        bezierCurve: true,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                displayColors: false,
                titleMarginBottom: 10,
                bodySpacing: 5,
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10,
                },
                titleFont: {
                    family: 'lexend, sans-serif',
                    size: 10,
                    weight: 'light',
                    color: subColor,
                },
                bodyFont: {
                    family: 'lexend, sans-serif',
                    size: 10,
                    weight: 'light',
                    color: subColor,
                },
                footerFont: {
                    family: 'lexend, sans-serif',
                    size: 10,
                    weight: 'light',
                    color: subColor,
                },
                callbacks: {
                    title: title,
                },
            },
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
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Word Number',
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
                    color: subColor + "15"
                },
                border: {
                    color: subColor
                }
            },
            y: {
                min: 0,
                max: Math.max(...wpmData) > 170 ? 300 : 200,
                position: 'left',
                title: {
                    display: true,
                    text: 'Words Per Minute',
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
                    callback: function (value: any, index: number, values: string | any[]) {
                        if (wpmData.length !== 0) {
                            // Show the actual value of each tick if chartData has values
                            return value;
                        } else {
                            if (index === values.length - 1) return 1;
                            else if (index === 0) return 0;
                            else return '';
                        }
                    }
                },
                grid: {
                    color: subColor + "15"
                },
                border: {
                    color: subColor,
                }
            },
            y1: {
                position: 'right',
                title: {
                    display: true,
                    text: 'Incorrect Characters',
                    color: subColor,
                    font: {
                        size: 16,
                        family: 'lexend, sans-serif',
                    },
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5,
                    precision: 0,
                    font: {
                        family: 'lexend, sans-serif',
                    },
                    color: subColor,
                    callback: function (value: any, index: number, values: string | any[]) {
                        if (incorrectChars.length !== 0) {
                            return value;
                        } else {
                            if (index === values.length - 1) return 1;
                            else if (index === 0) return 0;
                            else return '';
                        }
                    }
                },
                grid: {
                    color: "transparent"
                },
                border: {
                    color: subColor
                }
            },
        },
        elements: {
            point: {
                radius: 1,
            },
        },
    };

    data.labels = chartLabels;
    data.datasets[0].data = wpmData;
    data.datasets[1].data = incorrectChars;

    return (<Line options={options} data={data} />);
}

export default ResultChart;