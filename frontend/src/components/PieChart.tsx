import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { toCurrency } from "../utils/formatNumber";
import './charts.scss'

type Props = {
    devedores: any[]
}

export const PieChart = (props: Props) => {
    const { devedores } = props

    const options: ApexOptions = {
        title: {
            text: 'Top 6 maiores débitos'
        },
        labels: devedores.map(d => d.empresa),
        //DEFAULT COLORS: 
        //colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
        colors: ['#008FFB', '#00B1F2', '#00E396', '#F9C80E', '#FF9800', '#FF4560', '#7A02DB',],

        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            fontWeight: 600,
                            show: true,
                        },
                        value: {
                            show: true,
                            fontWeight: 600,
                            formatter: val => toCurrency(+val)
                        },
                        total: {
                            show: true,
                            fontWeight: 600,
                            formatter: function (w) {
                                //@ts-ignore
                                const totalValue = w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)
                                return toCurrency(totalValue)
                            }
                        }
                    }
                },
            },
        },
        tooltip: {
            y: {
                formatter: val => toCurrency(+val)
            }
        }
    };

    const series = devedores.map(({ debt }) => parseInt(debt))

    return (
        <div className="chartContainer">
            <Chart
                options={options}
                series={series}
                type="donut"
                height='100%'
                width="1000"
            />
        </div>

    )
}
