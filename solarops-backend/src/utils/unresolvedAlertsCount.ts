const unresolvedAlertsCount = (inverters) => {
    return inverters
        .flatMap(inv => inv.alerts)
        .filter(alert => alert.status !== "Resolved").length
}

export default unresolvedAlertsCount;