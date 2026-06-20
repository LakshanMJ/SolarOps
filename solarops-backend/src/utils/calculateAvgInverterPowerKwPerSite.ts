interface Telemetry {
    acOutputKw: number;
}

interface Inverter {
    status: string;
    telemetry?: Telemetry[];
}

const calculateAvgInverterPowerKw = (
    inverters: Inverter[]
): number => {
    const onlineInverters = inverters.filter(
        (inv: Inverter) => inv.status === "Online"
    );

    if (onlineInverters.length === 0) return 0;

    const inverterPowerKw: number[] = onlineInverters.map(
        (inv: Inverter): number => {
            if (!inv.telemetry || inv.telemetry.length === 0) return 0;

            const sumOutput: number = inv.telemetry.reduce(
                (sum: number, t: Telemetry): number => sum + t.acOutputKw,
                0
            );

            return sumOutput / inv.telemetry.length;
        }
    );

    const avg: number =
        inverterPowerKw.reduce(
            (a: number, b: number): number => a + b,
            0
        ) / inverterPowerKw.length;

    return Number(avg.toFixed(1));
};

export default calculateAvgInverterPowerKw;