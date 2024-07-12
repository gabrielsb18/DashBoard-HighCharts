import { ChangeEvent, useCallback } from "react";
import * as S from "./styles";
import LogoChat from "../../assets/LogoChat.svg";
import { AnalyticsService } from "../../service/Analytics";
import { AxiosAdapter } from "../../infra/AxiosAdapter";
import { AnalyticsData } from "../../model";
import useAnalyticsData from "../../hook/useAnalyticsData";

type PresetDataProps = {
    title: string;
    value: string;
};

const PRESET_DATAS: PresetDataProps[] = [
    {
        title: "Ontem",
        value: "yesterday",
    },
    {
        title: "Últimos 30 dias",
        value: "last_30_days",
    },
    {
        title: "Últimos 6 meses",
        value: "last_6_months",
    },
    {
        title: "Últimos 12 meses",
        value: "last_12_months",
    },
];

const axios = new AxiosAdapter();

const Header = () => {
    const { setIsLoading, setAnalyticsDataState } = useAnalyticsData();

    const handleSelect = useCallback(
        async (e: ChangeEvent<HTMLSelectElement>) => {
            setIsLoading(true);
            await new AnalyticsService(axios)
                .getInformationsByPeriod(e.target.value)
                .then((informations) => {
                    setAnalyticsDataState(informations as AnalyticsData);
                })
                .finally(() => setIsLoading(false));
        },
        []
    );

    return (
        <S.Wrapper>
            <S.Head>
                <img src={LogoChat} alt="Experts club logo" />
            </S.Head>
            <S.Main>
                <h5>Chat Bot</h5>
                <span>
                    Analise a quantidade de chamadas realizadas no chatbot por
                    clientes
                </span>

                <S.Content>
                    <h3>Selecione um periodo</h3>
                    <select
                        defaultValue="DEFAULT"
                        data-testid="select-period-id"
                        name="select-period"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            handleSelect(e)
                        }
                    >
                        <option value="DEFAULT" disabled>
                            Selecione um período
                        </option>
                        {PRESET_DATAS.map((element) => (
                            <option
                                data-testid="select-option"
                                key={element.value}
                                value={element.value}
                            >
                                {element.title}
                            </option>
                        ))}
                    </select>
                </S.Content>
            </S.Main>
        </S.Wrapper>
    );
};

export default Header;
