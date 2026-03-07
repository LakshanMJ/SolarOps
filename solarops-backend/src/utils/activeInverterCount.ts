const countActiveInverters = (inverters) => {
  return inverters.filter(inv => inv.status === "Online").length
}

export default countActiveInverters;