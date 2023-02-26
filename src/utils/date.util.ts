export const convert = (d: any) => {
  return d.constructor === Date
    ? d
    : d.constructor === Array
    ? new Date(d[0], d[1], d[2])
    : d.constructor === Number
    ? new Date(d as number)
    : d.constructor === String
    ? new Date(d as string)
    : typeof d === 'object'
    ? new Date(d.year, d.month, d.date)
    : NaN
}

export const compare = (a, b) => {
  return isFinite((a = convert(a).valueOf())) && isFinite((b = convert(b).valueOf()))
    ? +(a > b) - +(a < b)
    : NaN
}

export const inRange = (d: any, start: any, end: any) => {
  return isFinite((d = convert(d).valueOf())) &&
    isFinite((start = convert(start).valueOf())) &&
    isFinite((end = convert(end).valueOf()))
    ? start <= d && d <= end
    : NaN
}
