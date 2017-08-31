const test = require('ava')

// ## Benefits
// * lot's of async options
// * Several outputs, including TAP
// * Easy to read
// * No nesting

// ## Drawbacks
// * Cannot run tests with node - they have to be run by the ava client,
//   **which makes them harder to debug**
// * there doesn't appear to be a way to skip tests
// * Locked into their custom assertion library
// * Lack of nesting means you need to roll your own shared topics in the
//   file scope, which can lead to side effects
// * Slow to startup, but fast after that

test('Division by Zero, when dividing a number by zero, we get Infinity', t => {
  // given
  const input = 42

  // when
  const actual = divideByZero(input)

  // then
  t.is(actual, Infinity)
})

test('Division by Zero, when dividing a zero by zero, we get NaN', t => {
  // given
  const input = 0

  // when
  const actual = divideByZero(input)

  // then
  t.is(actual, NaN)
  t.false(actual === actual)
})

test.cb('Async Division by Zero, when dividing a number by zero, we get Infinity', t => {
  // given
  const input = 42

  // when
  setTimeout(() => {
    const actual = divideByZero(input)

    // then
    t.is(actual, Infinity)
    t.end()
  }, 0)
})

test('Async Division by Zero with Promises, when dividing a number by zero, we get Infinity', t => {
  // given
  const input = 42

  // when
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(divideByZero(input))
    }, 0)
  }).then(actual => {
    // then
    t.is(actual, Infinity)
  })
})

test('Async Division by Zero with async, when dividing a number by zero, we get Infinity',
  async t => {
    // given
    const input = 42

    // when
    const actual = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(divideByZero(input))
      }, 0)
    })

    // then
    t.is(actual, Infinity)
  })

test.skip('and you can skip tests', t => {
  t.fail('this should not run')
})

function divideByZero (number) {
  return number / 0
}
