const assert = require('assert');
const { increment } = require('./index');

describe('Multiscale Timeseries', () => {
  describe('increment()', () => {
    let record;
    it('should increment a timeseries record', () => {
      const date = new Date('2020-10-05T14:32:40.441Z');
      record = increment(record, date);
      assert.deepEqual(record, {
        minutes: { '2020-10-05T14:32': 1 },
        hours: { '2020-10-05T14': 1 },
        days: { '2020-10-05': 1 },
        weeks: { '2020-W41': 1 },
        months: { '2020-10': 1 },
        quarters: { '2020-Q4': 1 },
        years: { 2020: 1 },
        all: { all: 1 },
      });
      record = increment(record, date);
      assert.deepEqual(record, {
        minutes: { '2020-10-05T14:32': 2 },
        hours: { '2020-10-05T14': 2 },
        days: { '2020-10-05': 2 },
        weeks: { '2020-W41': 2 },
        months: { '2020-10': 2 },
        quarters: { '2020-Q4': 2 },
        years: { 2020: 2 },
        all: { all: 2 },
      });
    });
    it('should increment a timeseries record for another date', () => {
      const date = new Date('2020-12-05T14:32:40.441Z');
      record = increment(record, date);
      assert.deepEqual(record, {
        minutes: { '2020-10-05T14:32': 2, '2020-12-05T14:32': 1 },
        hours: { '2020-10-05T14': 2, '2020-12-05T14': 1 },
        days: { '2020-10-05': 2, '2020-12-05': 1 },
        weeks: { '2020-W41': 2, '2020-W49': 1 },
        months: { '2020-10': 2, '2020-12': 1 },
        quarters: { '2020-Q4': 3 },
        years: { 2020: 3 },
        all: { all: 3 },
      });
      record = increment(record, date);
      assert.deepEqual(record, {
        minutes: { '2020-10-05T14:32': 2, '2020-12-05T14:32': 2 },
        hours: { '2020-10-05T14': 2, '2020-12-05T14': 2 },
        days: { '2020-10-05': 2, '2020-12-05': 2 },
        weeks: { '2020-W41': 2, '2020-W49': 2 },
        months: { '2020-10': 2, '2020-12': 2 },
        quarters: { '2020-Q4': 4 },
        years: { 2020: 4 },
        all: { all: 4 },
      });
    });
    it('should age out old entries', () => {
      const date = new Date('2020-12-06T14:32:40.441Z');
      record = increment(record, date, 2);
      assert.deepEqual(record, {
        minutes: { '2020-12-05T14:32': 2, '2020-12-06T14:32': 1 },
        hours: { '2020-12-05T14': 2, '2020-12-06T14': 1 },
        days: { '2020-12-05': 2, '2020-12-06': 1 },
        weeks: { '2020-W41': 2, '2020-W49': 3 },
        months: { '2020-10': 2, '2020-12': 3 },
        quarters: { '2020-Q4': 5 },
        years: { 2020: 5 },
        all: { all: 5 },
      });
    });
  });
});
