const calculateAvgPR = (inverters) => {
    if (inverters.length === 0) return 0
    const inverterPRs = inverters.map(inv => {
        if (!inv.telemetry || inv.telemetry.length === 0) return 0
        const sumOutput = inv.telemetry.reduce(
            (sum, t) => sum + t.acOutputKw,
            0
        )
        return (sumOutput / inv.telemetry.length) * (inv.status === "Online" ? 1 : 0)
    })
    const avg = inverterPRs.reduce((a, b) => a + b, 0) / inverterPRs.length
    return +avg.toFixed(1)
}

export default calculateAvgPR;