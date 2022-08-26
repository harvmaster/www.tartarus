export const days = new Array(31).fill(0).map((d, i) => `${i+1}`)
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const years = new Array(new Date().getFullYear() - 1869).fill(0).map((d, i) => `${i + 1869 + 1}`).reverse()

export const computeDate = (day: number, month: string, year: number) => {
  const monthNo = months.findIndex(m => m.toLowerCase() == month.toLowerCase())
  const date = new Date(year, monthNo, day)

  return date
}

export const filterDays = (inp: string) => {
  return filter(inp, days)
}

export const filterMonths = (inp: string) => {
  const options = filter(inp?.toLowerCase(), months.map(m => m.toLowerCase()))
  return options.map(m => m.substring(0, 1).toUpperCase() + m.substring(1))
}

export const filterYears = (inp: string) => {
  return filter(inp, years)
}

export const filter = (inp: string, arr: string[]) => {
  if (!inp || inp == '') return arr
  return arr.filter(i => i.includes(inp))
}
