const calculateSiteHealth = (inverters: { status: string }[]) => {
    if (!inverters.length) return 'Unknown'
    const weights: Record<string, number> = {
        Online: 1,
        Degraded: 0.6,
        Critical: 0.3,
        Offline: 0,
    }
    const totalScore = inverters.reduce((sum, inv) => sum + (weights[inv.status] ?? 0), 0)
    const score = totalScore / inverters.length
    if (score >= 0.85) return 'Good'
    if (score >= 0.6) return 'Warning'
    return 'Critical'
}

export default calculateSiteHealth;