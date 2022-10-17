import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { toCurrency } from "../utils/formatNumber";
import './charts.scss'

type Props = {
    devedores: any[]
}

export const BarChart = (props: Props) => {
    const
        { devedores: debtors } = props
        , devedores = debtors.slice(0, 10)

    const options: ApexOptions = {
        series: [{
            data: devedores.map(d => d.debt)
        }],
        chart: {
            type: 'bar',

        },
        tooltip: {
            y: {
                title: {
                    formatter: (seriesName) => 'Valor:',
                },
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true
            }
        },
        dataLabels: {
            enabled: true,
            formatter: val => toCurrency(Number(val))

        },
        xaxis: {
            categories: devedores.map(d => d.empresa),

        },
        yaxis: {
            seriesName: 'aaa'
        }
    };

    const series = [{
        data: devedores.map(({ debt }) => debt.toFixed(2)),

    }]

    return (
        <div className="chartContainer">
            <Chart
                options={options}
                series={series}
                type="bar"
                height='100%'
                width="1500"
            />
        </div>
    )
}
