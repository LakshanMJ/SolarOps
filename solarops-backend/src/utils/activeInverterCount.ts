interface Inverter {
    status: string;
}

const countActiveInverters = (
    inverters: Inverter[]
): number => {
    return inverters.filter(
        (inv) => inv.status === "Online"
    ).length;
};

export default countActiveInverters;