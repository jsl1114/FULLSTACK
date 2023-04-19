const { average } = require('../utils/for_testing')

describe('average', () => {
  test('of empty array is zero', () => {
    const ans = average([])

    expect(ans).toBe(0)
  })

  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })
})
