import { TooltipFormatterContextObject } from "highcharts";
import Chart from "../../../../components/Chart";
import { AnalyticsColors } from "../../../../constants";
import useAnalyticsData from "../../../../hook/useAnalyticsData";
import * as S from "./styles";

const PorcentageOfAccessOnPages = () => {
    const { analyticsDataState } = useAnalyticsData();
    const options: Highcharts.Options = {
        // 1. Titulo do gráfico
        title: {
            text: "Porcentagem de chamadas",
            // Temos que definir o useHTML como true para a estilização seja aplicada
            useHTML: true,
            style: {
                fontSize: "20px",
                color: AnalyticsColors.black,
                fontWeight: "bold",
                fontStyle: "normal",
                fontFamily: "Inter",
                padding: "20px",
            },
        },
        // 2.Definindo o tipo do gráfico
        chart: {
            type: "pie",
        },
        // 3.Conjunto de dados
        series: [
            {
                type: "pie",
                // espaçamento inteno da "pizza"
                innerSize: "60%",
                data: [
                    {
                        x: analyticsDataState?.TotalOpenAndClosedCalls
                            ?.ChamadasFechadas?.value,
                        y: analyticsDataState?.TotalOpenAndClosedCalls
                            ?.ChamadasFechadas?.porcentage,
                        color: AnalyticsColors.ecWine,
                        name: "Chamadas Fechadas",
                    },
                    {
                        x: analyticsDataState?.TotalOpenAndClosedCalls
                            ?.ChamadasAbertas?.value,
                        y: analyticsDataState?.TotalOpenAndClosedCalls
                            ?.ChamadasAbertas?.porcentage,
                        color: AnalyticsColors.purple,
                        name: "Chamadas Abertas",
                    },
                ],
            },
        ],
        // 4. Configurações do gráfico
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false,
                },
                // legenda do grafico
                showInLegend: true,
                cursor: "pointer",
                // transforma o cursor em uma mãozinha quando passa por cima
                allowPointSelect: true,
            },
        },
        // 5. Configurações do tooltip = caixa de informações que aparece quando passamos o mouse por cima
        tooltip: {
            useHTML: true,
            // Função que formata o tooltip, que nos permite acessar os dados para representação
            formatter() {
                const self: TooltipFormatterContextObject = this;
                return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; z-index: 1">
                <h1 style="font-size: 36px; font-family: Inter; color: ${AnalyticsColors.black}; margin: 0px;"> ${self.point.y}% </h1>
                <span style="font-size: 24px; font-weight: 500; font-style: normal; color: ${AnalyticsColors.darkGray}">${self.point.x} Chamadas </span>
                </div>`;
            },
            // Função que nos permite posicionar o tooltip
            positioner() {
                return { x: 70, y: 80 };
            },
        },
    };

    return (
        <S.Wrapper>
            <S.TotalOfAccess>
                {/* span que permite possionar um texto no centro do gráfico */}
                <span>
                    <b>{analyticsDataState?.TotalOpenAndClosedCalls?.all}</b>
                    Chamadas
                </span>
            </S.TotalOfAccess>
            <Chart options={options} />
        </S.Wrapper>
    );
};

export default PorcentageOfAccessOnPages;
