const { expect } = require('chai')
const seed = require('../../../script/seed');
const { db, models: { Product } } = require('../index')


describe('Products Route', () => {
    let seed1;
    beforeEach(async() => {
        seed1 = await seed()
    })
    
    it('length = 104', () => {
        expect(Object.values(seed1.products).length).to.equal(104)
    })
})