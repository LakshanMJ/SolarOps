interface Alert {
    status: string;
}

interface Inverter {
    alerts: Alert[];
}

const unresolvedAlertsCount = (
    inverters: Inverter[]
): number => {
    return inverters
        .flatMap((inv) => inv.alerts)
        .filter((alert) => alert.status !== "Resolved").length;
};

export default unresolvedAlertsCount;