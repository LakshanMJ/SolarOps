const calculateAvgInverterPowerKw = (inverters) => {
    const onlineInverters = inverters.filter(
        inv => inv.status === "Online"
    );

    if (onlineInverters.length === 0) return 0;

    const inverterPowerKw = onlineInverters.map(inv => {
        if (!inv.telemetry || inv.telemetry.length === 0) return 0;

        const sumOutput = inv.telemetry.reduce(
            (sum, t) => sum + t.acOutputKw,
            0
        );

        return sumOutput / inv.telemetry.length;
    });

    const avg =
        inverterPowerKw.reduce((a, b) => a + b, 0) /
        inverterPowerKw.length;

    return +avg.toFixed(1);
};

export default calculateAvgInverterPowerKw;