/* eslint-env node, mocha */
const assert = require('assert')

// ## Benefits
// * Topics offer a separation of the `act/when` and the `assert/then`,
//   making it easy to do TDD/BDD assertions on a single action
// * Several outputs, including TAP
// * Choose your own assertion library

// ## Drawbacks
// * Cannot run tests with node - they have to be run by the ava client,
//   **which makes them harder to debug (but not as hard as ava)**
// * skipping tests can be hard to spot (it vs xit)
// * Nesing!!!!
// * Not idea for lots of integration tests (it runs in a series)
// * async can be really ugly

describe('Division by Zero', () => {
  describe('when dividing a number by zero', () => {
    // given
    const input = 42

    // when
    const actual = divideByZero(input)

    // then
    it('should return Inifinity', () => {
      assert.equal(actual, Infinity)
    })

    describe('but when dividing zero by zero', () => {
      describe('we get a value which', () => {
        // given
        const input = 0

        // when
        const actual = divideByZero(input)

        // then
        it('is not a number', () => {
          assert.equal(isNaN(actual), true)
        })

        // then
        it('is not equal to itself', () => {
          assert.notEqual(actual, actual)
        })
      })
    })
  })

  describe('when writing async code', () => {
    it('there is not a great way to run the describe async, even though it is supported',
      done => {
        // given
        const input = 42

        // when
        setTimeout(() => {
          const actual = divideByZero(input)

          // then
          assert.equal(actual, Infinity)
          done()
        }, 0)
      })
  })

  xdescribe('we can skip multiple tests', () => {
    // then
    it('should not get here', () => {
      assert.fail()
    })
  })

  describe('we can skip assertions', () => {
    // then
    xit('should not execute them', () => {
      assert.fail()
    })
  })
})

function divideByZero (number) {
  return number / 0
}
