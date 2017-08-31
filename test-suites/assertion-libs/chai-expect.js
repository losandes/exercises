/* eslint-env node, mocha */
const expect = require('chai').expect

describe('Division by Zero', () => {
  describe('when dividing a number by zero', () => {
    // given
    const input = 42

    // when
    const actual = divideByZero(input)

    // then
    it('should return Inifinity', () => {
      expect(actual).to.equal(Infinity)
    })

    describe('but when dividing zero by zero', () => {
      describe('we get a value which', () => {
        // given
        const input = 0

        // when
        const actual = divideByZero(input)

        // then
        it('is not a number', () => {
          expect(actual).to.be.NaN
        })

        // then
        it('is not equal to itself', () => {
          expect(actual).to.not.equal(actual)
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
          expect(actual).to.equal(Infinity)
          done()
        }, 0)
      })
  })

  xdescribe('we can skip multiple tests', () => {
    // then
    it('should not get here', () => {
      expect.fail('it should not get here')
    })
  })

  describe('we can skip assertions', () => {
    // then
    xit('should not execute them', () => {
      expect.fail('it should not get here')
    })
  })
})

function divideByZero (number) {
  return number / 0
}
