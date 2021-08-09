const expect = require('chai').expect;
const utils = require('../../server/api/utils');

describe('Testing API utils', () => {
  it('formatResponse should return a JSON string', () => {
    expect(utils.formatResponse(true, "hello", null))
    .deep.to.equal({"success": true, "data": "hello", "error": null});
  });

  it('validateDate should return a JSON string with message "No date selected"', () => {
    expect(utils.validateDate(''))
    .deep.to.equal({"valid": false, "message": "No date selected"});
  });
  it('validateDate should return a JSON string with message "Invalid Date"', () => {
    expect(utils.validateDate('k'))
    .deep.to.equal({"valid": false, "message": "Invalid Date"});
  });
  it('validateDate should return a JSON string with message "Invalid Date" when validating February 30th', () => {
    expect(utils.validateDate('2021-02-30T23:59:59Z'))
    .deep.to.equal({"valid": false, "message": "Invalid Date"});
  });
  it('validateDate should return a JSON string with valid value set to true', () => {
    expect(utils.validateDate('2021-01-06T23:59:59Z'))
    .deep.to.equal({"valid": true, "message": null});
  });

  it('addDays should return date three days later', () => {
    const testDate = new Date('2021-01-29T23:59:59Z');
    expect(utils.addDays(testDate, 3))
    .deep.to.equal(new Date('2021-02-01T23:59:59Z'));
  });
  it('addDays should return date after 30 days', () => {
    const testDate = new Date('2021-03-17T23:59:59Z');
    expect(utils.addDays(testDate, 30))
    .deep.to.equal(new Date('2021-04-16T23:59:59Z'));
  });
  it('addMillisecond should return a date that is one millisecond later that the requested', () => {
    const testDate = new Date('2021-03-17T23:59:59.999Z');
    expect(utils.addMillisecond(testDate))
    .deep.to.equal(new Date('2021-03-18T00:00:00.000Z'));
  });
});
