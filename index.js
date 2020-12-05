const { timeFormat } = require('d3-time-format');

const intervals = [
  { property: 'minutes', format: timeFormat('%Y-%m-%dT%H:%M') },
  { property: 'hours', format: timeFormat('%Y-%m-%dT%H') },
  { property: 'days', format: timeFormat('%Y-%m-%d') },
  { property: 'weeks', format: timeFormat('%Y-W%V') },
  { property: 'months', format: timeFormat('%Y-%m') },
  { property: 'quarters', format: timeFormat('%Y-Q%q') },
  { property: 'years', format: timeFormat('%Y') },
];

const increment = (record = {}, date, maxEntries) => {
  return intervals.reduce((accumulator, { property, format }) => {
    const key = format(date);

    const newRecord = {
      ...accumulator,
      [property]: {
        ...record[property],
        [key]: ((record[property] && record[property][key]) || 0) + 1,
      },
    };

    // Age out old entries.
    const keys = Object.keys(newRecord[property]);
    if (keys.length > maxEntries) {
      delete newRecord[property][keys[0]];
    }

    return newRecord;
  }, record);
};

module.exports = { increment };
