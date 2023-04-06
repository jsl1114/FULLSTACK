const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
  const ans = reverse('a')

  expect(ans).toBe('a')
})

test('reverse of a', () => {
  const ans = reverse('react')

  expect(ans).toBe('tcaer')
})

test('reverse of releveler', () => {
  const ans = reverse('releveler')

  expect(ans).toBe('releveler')
})