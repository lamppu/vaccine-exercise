const expect = require('chai').expect;
const utils = require('../../server/models/utils');

describe('Testing utils for parsing files and strings', () => {
  it('should return an array of values', () => {
    expect(
      utils.valueParser('{"id":"6da3a8cf-c923-4c77-8f80-c69c935fe1df","orderNumber":1,"responsiblePerson":"Joonatan Siloma","healthCareDistrict":"KYS","vaccine":"Antiqua","injections":4,"arrived":"2021-01-11T08:59:28.642790Z"}'))
      .deep.to.equal(['6da3a8cf-c923-4c77-8f80-c69c935fe1df','1','Joonatan Siloma','KYS','Antiqua','4','2021-01-11T08:59:28.642790Z']);
  });
  it('should return an order object', () => {
    expect(
      utils.order(['8317f3a9-a0d4-4b7d-b9d3-90d6096b7871','29','Valio Karisto','HYKS','Antiqua','4','2021-03-28T02:01:12.643506Z']))
    .deep.to.equal(
      {
        id: '8317f3a9-a0d4-4b7d-b9d3-90d6096b7871',
        orderNumber: 29,
        responsiblePerson: 'Valio Karisto',
        healthCareDistrict: 'HYKS',
        vaccine: 'Antiqua',
        injections: 4,
        arrived: new Date('2021-03-28T02:01:12.643506Z')
      }
    )
  });
  it('should return a vaccination object', () => {
    expect(
      utils.vaccination(['bcff2e53-e515-4636-991a-ff4bfa5b931f','e1cd8aac-3796-4517-899d-45b45aa792c3','nonbinary','2021-02-07T20:20:59.662864Z'])
    ).deep.to.equal(
      {
        vaccinationId: 'bcff2e53-e515-4636-991a-ff4bfa5b931f',
        sourceBottle: 'e1cd8aac-3796-4517-899d-45b45aa792c3',
        gender: 'nonbinary',
        vaccinationDate: new Date('2021-02-07T20:20:59.662864Z')
      }
    )
  });
  it('should return an array with 1661 items', async () => {
    expect(await utils.parser('./server/models/data/Antiqua.source', utils.order))
    .to.have.lengthOf(1661);
  });
});
