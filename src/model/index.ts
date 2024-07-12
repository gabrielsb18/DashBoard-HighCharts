export type AnalyticsData = {
    TotalOpenAndClosedCalls: {
        ChamadasAbertas: {
            porcentage: number;
            value: number;
        };
        ChamadasFechadas: {
            porcentage: number;
            value: number;
        };
        all: number;
    };
    TotalOpenCallsPerHour: {
        ChamadasAbertas: number[];
        ChamadasFechadas: number[];
    };
    TotalOpenCallsByMonth: {
        months: Array<number[]>;
        days: number[];
    };
    accessGoals: number;
    accessByDevice: {
        mobile: number;
        browser: number;
    };
};
