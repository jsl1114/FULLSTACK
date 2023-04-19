const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('should return one', () => {
    expect(listHelper.dummy([])).toBe(1)
  })
})
