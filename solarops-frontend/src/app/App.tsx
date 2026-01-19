import KpiCard from '@/components/kpi/KpiCard'
import './App.css'

function App() {

  return (
    <>
      <div className="card">
        <KpiCard label="Total Energy Today" value="12.4 MWh" />
      </div>
    </>
  )
}

export default App
