const vows = require('vows')
const assert = require('assert')

// ## Benefits
// * Topics offer a separation of the `act/when` and the `assert/then`,
//   making it easy to do TDD/BDD assertions on a single action
// * Several outputs, including TAP
// * Choose your own assertion library
// * While there can be deep nests, it's up to you

// ## Drawbacks
// * Sytax differs between using the test runner, and running tests via node
//   (run() vs exports(module))
// * async syntax is weird: (this.callback)
// * there doesn't appear to be a way to skip tests
// * It modifies `assert`(breaks OCP)

vows.describe('Division by Zero').addBatch({
  'when dividing a number by zero': {
    topic: function () {
      // given
      const input = 42

      // when
      return divideByZero(input)
    },
    'we get Infinity': function (topic) {
      // then
      assert.equal(topic, Infinity)
    }
  },
  'but when dividing zero by zero': {
    topic: function () {
      // given
      const input = 0

      // when
      return divideByZero(input)
    },
    'we get a value which': {
      'is not a number': function (topic) {
        // then
        assert.isNaN(topic)
      },
      'is not equal to itself': function (topic) {
        // and then
        assert.notEqual(topic, topic)
      }
    }
  },
  'when async dividing a number by zero': {
    topic: function () {
      // given
      const input = 42
      const done = this.callback

      // when
      setTimeout(() => {
        done(null, divideByZero(input))
      }, 0)
    },

    'we get Infinity': function (err, topic) {
      // then
      assert.ifError(err)
      assert.equal(topic, Infinity)
    }
  }
//   '// when skipping a test': {
//     '// it should not run the assertions': () => {
//       assert.fail('it should not get here')
//     }
//   }
}).export(module)

function divideByZero (number) {
  return number / 0
}
