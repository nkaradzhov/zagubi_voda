export default (value, digits = 2) =>
  value
    ? typeof value === 'number'
      ? Math.round((value * Math.pow(10, digits)) / Math.pow(10, digits))
      : value
    : ''
