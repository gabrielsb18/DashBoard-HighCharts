import Chart from "../../../../components/Chart";
import * as S from "./styles";
import Eye from "../../../../assets/eye.svg";
import { AnalyticsColors } from "../../../../constants";
import useAnalyticsData from "../../../../hook/useAnalyticsData";

export const TotalAccessOnPages = () => {
    // Contexto dos dados de analise
    const { analyticsDataState } = useAnalyticsData();

    const options: Highcharts.Options = {
        // 1.Propiedade - titulo do gráfico

        title: {
            /* Texto do gráfico podemos usar HTML para customizar o texto, porem é necessário passar a propriedade useHTML como true
             */
            text: `<img src=${Eye} width="16" height="16" style="margin-right:8px;" alt="Ícone de view" /> Total de chamadas`,
            useHTML: true,
            // Alinhamento do texto
            align: "left",
            // Estilização do titulo
            style: {
                padding: "30px",
                fontSize: "20px",
                color: AnalyticsColors.black,
                fontWeight: "bold",
                fontStyle: "Normal",
                fontFamily: "Inter",
            },
        },

        // 2.Propiedade - tipo do gráfico
        chart: {
            type: "column",
        },

        // 3.Propiedade - representa cada informação que será exibida no gráfico
        series: [
            // Primeiro Objeto - Tipo column
            {
                name: "Chamadas Abertas",
                type: "column",
                // informação que será exibida no gráfico
                data: [
                    analyticsDataState?.TotalOpenAndClosedCalls?.ChamadasAbertas
                        ?.value,
                ],
                // cor do coluna
                color: AnalyticsColors.purple,
            },
            // Segundo Objeto
            {
                name: "Chamadas Fechadas",
                type: "column",
                data: [
                    analyticsDataState?.TotalOpenAndClosedCalls
                        ?.ChamadasFechadas?.value,
                ],
                color: AnalyticsColors.ecWine,
            },
        ],

        // Tooltip - Exibe informações ao passar o mouse sobre o gráfico
        tooltip: {
            enabled: false,
        },

        // Eixo do grafico
        yAxis: {
            // escala do eixo Y
            min: 0,
            // Titulo do eixo Y. definimos o titulo como vazio
            title: {
                text: "",
            },
        },

        // Responsável por personalizar as colunas do gráfico
        plotOptions: {
            // definimos o tipo de gráfico que será personalizado
            column: {
                // informações que estão dentro da coluna
                dataLabels: {
                    useHTML: true,
                    // Exibição da informação
                    enabled: true,
                    color: AnalyticsColors.black,
                    inside: true,
                    // posição do texto
                    verticalAlign: "bottom",
                    // Tamanho da borda
                    borderWidth: 3,
                    // S
                    shadow: false,
                    // Estilização do texto
                    style: {
                        fontSize: "36px",
                        fontWeight: "bold",
                        fontStyle: "Normal",
                        lineHeight: "44px",
                        fontFamily: "Inter",
                        textOutline: "0",
                        padding: "14px",
                    },
                },
            },
        },
    };

    return (
        <S.Wrapper>
            <Chart options={options} />
        </S.Wrapper>
    );
};

export default TotalAccessOnPages;
