import { activeAlerts, activeAlertsStatus, avgPowerKw, energyTodayKwh, outputDeviationStatus, revenueTodayUsd, systemHealthPercent, systemHealthStatus, totalEnergyStatus, weeklyEnergy } from '../utils/kpiDashboardCalculations.js'

export async function getDashboardKpisService() {

  return {
    totalEnergyTodayMWh: +(await energyTodayKwh() / 1000).toFixed(2),
    revenueTodayUsd: +(await revenueTodayUsd()).toFixed(2),
    activeAlerts: await activeAlerts(),
    activeAlertsStatus: await activeAlertsStatus(),
    systemHealthPercent: +(await systemHealthPercent()).toFixed(1),
    systemHealthStatus: await systemHealthStatus(),
    avgPowerKw: +(await avgPowerKw()).toFixed(1),
    weeklyEnergy: await weeklyEnergy(),
    totalEnergyStatus: await totalEnergyStatus(),
    revenueStatus: await totalEnergyStatus(),
    outputDeviationStatus: await outputDeviationStatus(),
  }
}