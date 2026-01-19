type Props = {
    label: string
    value: string
}

const KpiCard = ({ label, value }: Props) => {
    return (
        <div className="kpi-card">
            <p>{label}</p>
            <h2>{value}</h2>
        </div>
    )
}
export default KpiCard;