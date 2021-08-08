const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../server/index.js');

describe('Testing fetching orders and vaccinations data', () => {
  it('number of orders arrived on January 2nd 2021 by 16:25:04 should be 12', async () => {
    const timestamp = '2021-01-02T16:25:04Z';
    const res = await request(app).get('/data?date=' + timestamp);
    expect(res.body.data.ordersData.orders).to.equal(12);
  });
  it('number of vaccines arrived on January 2nd 2021 by 16:25:04 should be 61', async () => {
    const timestamp = '2021-01-02T16:25:03.693461Z';
    const res = await request(app).get('/data?date=' + timestamp);
    expect(res.body.data.ordersData.vaccines).to.equal(61);
  });
  it('number of orders arrived on March 20th should be 61', async () => {
    const timestamp = '2021-03-20T23:59:59Z';
    const res = await request(app).get('/data?date=' + timestamp);
    expect(res.body.data.ordersData.orders).to.equal(61);
  });
  it('number of vaccines arrived on March 20th should be 300', async () => {
    const timestamp = '2021-03-20T23:59:59Z';
    const res = await request(app).get('/data?date=' + timestamp);
    expect(res.body.data.ordersData.vaccines).to.equal(300);
  });
  it('should return error message "Invalid Date"', async () => {
    const timestamp = 'k';
    const res = await request(app).get('/data?date=' + timestamp);
    expect(res.body.error).to.equal('Invalid Date');
  });
  it('should return error message "No date selected"', async () => {
    const res = await request(app).get('/data?date=');
    expect(res.body.error).to.equal('No date selected');
  });
  it('number of vaccinations on January 5th 2021 should be 10', async () => {
    const timestamp = '2021-01-05T23:59:59Z';
    const res = await request(app).get('/data?date=' + timestamp);
    expect(res.body.data.vaccinationsData.vaccinations).to.equal(10);
  });
  it('number of Zerpfy vaccinations on January 5th 2021 should be 3', async () => {
    const timestamp = '2021-01-05T23:59:59Z';
    const res = await request(app).get('/data?date=' + timestamp);
    expect(res.body.data.vaccinationsData.zerpfyVaccinations).to.equal(3);
  });
  it('number of vaccinations done in HYKS district on January 5th 2021 should be 5', async () => {
    const timestamp = '2021-01-05T23:59:59Z';
    const res = await request(app).get('/data?date=' + timestamp);
    expect(res.body.data.vaccinationsData.hyksVaccinations).to.equal(5);
  });
})

describe('Testing fetching expiration and other vaccine data', () => {
  it('number of used vaccines out of arrived vaccines on January 3rd 2021 should be 2', async () => {
    const timestamp = '2021-01-03T23:59:59Z';
    const res = await request(app).get('/data?date=' + timestamp);
    expect(res.body.data.vaccineData.usedArrived).to.equal(2);
  });
  it('number of used vaccines out of arrived vaccines on January 6th 2021 should be 3', async () => {
    const timestamp = '2021-01-06T23:59:59Z';
    const res = await request(app).get('/data?date=' + timestamp);
    expect(res.body.data.vaccineData.usedArrived).to.equal(3);
  });
  it('number of vaccines that have expired by datetime 2021-04-12T11:10:06.473587Z should be 12590', async () => {
    const timestamp = '2021-04-12T11:10:06.473587Z';
    const res = await request(app).get('/data?date=' + timestamp);
    expect(res.body.data.vaccineData.expiredVaccinesOverall).to.equal(12590);
  });
  it('number of expired bottles on February 12th by 04:14:30 should be 6', async () => {
    const timestamp = '2021-02-12T04:14:30Z';
    const res = await request(app).get('/data?date=' + timestamp);
    expect(res.body.data.vaccineData.expiredBottles).to.equal(6);
  });
  it('number of vaccines that are left in expired bottles on February 12th by 04:14:30 should be 23', async () => {
    const timestamp = '2021-02-12T04:14:30Z';
    const res = await request(app).get('/data?date=' + timestamp);
    expect(res.body.data.vaccineData.expiredVaccines).to.equal(23);
  });
})

/*
it('test case', async () => {
  const timestamp = '';
  const res = await request(app).get('/data?date=' + timestamp);
  expect(res.body.something).to.equal('something');
});
*/
