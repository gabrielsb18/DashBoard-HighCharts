import { TooltipFormatterContextObject } from "highcharts";
import Chart from "../../../../components/Chart";
import { AnalyticsColors } from "../../../../constants";
import useAnalyticsData from "../../../../hook/useAnalyticsData";

import * as S from "./styles";
import CustomChartTitle from "../../../../components/CustomChartTitle";

const TotalAccessPerHour = () => {
    const { analyticsDataState } = useAnalyticsData();
    const options: Highcharts.Options = {
        // titulo do gráfico
        title: {
            text: "",
        },
        // Dados do gráfico
        series: [
            {
                type: "column",
                name: "Chamadas Fechadas",
                color: AnalyticsColors.ecWine,
                data: analyticsDataState.TotalOpenCallsPerHour
                    ?.ChamadasFechadas,
            },
            {
                type: "spline",
                name: "Chamadas Abertas",
                color: AnalyticsColors.purple,
                data: analyticsDataState.TotalOpenCallsPerHour?.ChamadasAbertas,
            },
        ],
        // Plotagem do gráfico em horas
        xAxis: {
            min: 0,
            max: 23,
            tickInterval: 1,
        },
        yAxis: {
            title: {
                text: "",
            },
        },
        // Estilização da legenda do gráfico
        legend: {
            align: "left",
            verticalAlign: "top",
            margin: 40,
        },
        // Estilização do tooltip
        tooltip: {
            useHTML: true,
            formatter() {
                const self: TooltipFormatterContextObject = this;
                return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; z-index: 1">
                <h1 style="font-size: 30px; font-family: Inter; color: ${AnalyticsColors.black}; margin: 0px;"> ${self.point.y}</h1>
                <span style="font-size: 16px; font-weight: 500; font-style: normal; color: ${AnalyticsColors.darkGray}"> Chamadas </span>
                </div>`;
            },
        },
    };
    return (
        <S.Wrapper>
            {/* //Componente de título do gráfico, header */}
            <CustomChartTitle
                description="Acompanhe a quantidade de chamadas abertas por hora"
                title="Total de chamadas abertas por hora"
            />
            <Chart options={options} />
        </S.Wrapper>
    );
};

export default TotalAccessPerHour;
