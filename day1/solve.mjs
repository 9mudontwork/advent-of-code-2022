import fs from 'fs'

// const raw = fs.readFileSync('./example-input.txt', 'utf8')
const raw = fs.readFileSync('./input.txt', 'utf8')
const newLineRegex = '\n'
const data = raw.split(newLineRegex)

const cals = data.reduce(
	(acc, cur) => {
		const curVal = Number(cur)

		if (curVal > 0) {
			acc[1] += curVal
		} else {
			acc[0] += 1
			acc[1] = 0
		}

		if (acc[1] != 0) {
			acc[2][acc[0]] = acc[1]
		}

		return acc
	},
	[0, 0, []]
)

console.log('🚀cals', cals[2])

const maxVal = Math.max(...cals[2])
console.log('🚀maxVal', maxVal)

const [one, two, three] = cals[2].sort((a, b) => b - a)
console.log(one + two + three)
