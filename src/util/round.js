export default (value, digits = 4) =>
  value
    ? typeof value === 'number'
      ? (
          parseInt(value * Math.pow(10, digits), 10) / Math.pow(10, digits)
        ).toFixed(digits)
      : value
    : ''
