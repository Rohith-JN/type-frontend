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
import { TestsQuery } from '../../graphql/generated/graphql';
import { useAuth } from '../../firebase/auth';
import styles from '../../styles/Account.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({ data }: { data: TestsQuery }) => {
    const { authUser } = useAuth();

    const rootStyles = getComputedStyle(document.documentElement);
    const mainColor = rootStyles.getPropertyValue('--main-color');
    const subColor = rootStyles.getPropertyValue('--sub-color');

    const wpmData = data?.tests.wpmData!.length! > 0 ? data?.tests.wpmData! : []
    const accuracyData = (data?.tests.accuracyData!.length! > 0) ? data?.tests.accuracyData! : []
    const labels = (data?.tests.labels!.length! > 1) ? data?.tests.labels! : [1, 2]
    const testTaken = data?.tests.testTaken!

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'WPM',
                data: wpmData,
                fill: true,
                backgroundColor: mainColor,
                borderColor: mainColor,
                borderWidth: 3,
                lineTension: 0.4,
                yAxisID: 'y',
            },
            {
                label: 'Accuracy',
                data: accuracyData,
                fill: true,
                backgroundColor: subColor,
                borderColor: subColor,
                borderWidth: 3,
                lineTension: 0.4,
                yAxisID: 'y1',
            },
        ],
    };

    const footer = (tooltipItems: any[]) => {
        if (tooltipItems.length > 0) {
            const dataIndex = tooltipItems[0].dataIndex;;
            return testTaken[dataIndex];
        }
        return '';
    };

    const chartOptions: any = {
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
                titleMarginBottom: 10,
                bodySpacing: 5,
                footerMarginTop: 10,
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
                    footer: footer,
                    title: (tooltipItems: any[]) => {
                        return `Test: ${tooltipItems[0].label}`;
                    }
                }
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
                    color: subColor + "15"
                },
                border: {
                    color: subColor
                }
            },
            y: {
                min: 0,
                max: Math.max(...wpmData) > 150 ? 300 : 200,
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
                    color: subColor
                }
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
                    callback: function (value: any, index: number, values: string | any[]) {
                        if (accuracyData.length !== 0) {
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

    return (authUser) ?
        <div className={styles.graph}>
            <Line options={chartOptions} data={chartData} />
        </div>
        : null;
}

export default Chart