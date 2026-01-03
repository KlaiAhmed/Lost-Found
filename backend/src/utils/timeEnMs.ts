const ms=(timeString: string): number => {
  const units: { [key: string]: number } = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  const match = timeString.match(/^(\d+)(ms|s|m|h|d)$/);
  if (!match) {
    throw new Error(`Invalid time format: ${timeString}`);
  }

  const [, value, unit] = match;
  return parseInt(value, 10) * units[unit];
}

export default ms;