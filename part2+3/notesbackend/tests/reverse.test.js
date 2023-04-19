const { reverse } = require('../utils/for_testing')

describe('reverse', () => {
  test('of a', () => {
    const ans = reverse('a')

    expect(ans).toBe('a')
  })

  test('of react', () => {
    const ans = reverse('react')

    expect(ans).toBe('tcaer')
  })

  test('of releveler', () => {
    const ans = reverse('releveler')

    expect(ans).toBe('releveler')
  })
})
