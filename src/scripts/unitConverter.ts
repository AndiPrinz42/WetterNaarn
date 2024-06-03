export function fahrenheitToCelsius(fahrenheit: number, precision: number): number {
  return toPrecision((fahrenheit - 32) * 5 / 9, precision);
}

export function inHgToHpa(inHg: number, precision: number): number {
  return toPrecision(inHg * 33.863886666667, precision);
}

export function mphToKmh(mph: number, precision: number): number {
  return toPrecision(mph * 1.609344, precision);
}

export function inchToMm(inch: number, precision: number): number {
  return toPrecision(inch * 25.4, precision);
}

export function toPrecision(value: number, precision: number): number {
  return parseFloat(Number(value).toFixed(precision));
}