import fs from 'fs'

// const raw = fs.readFileSync('./example-input.txt', 'utf8')
const raw = fs.readFileSync('./input.txt', 'utf8')
const newLineRegex = '\n'
const data = raw.split(newLineRegex)
console.log('🚀data', data)

// a-z 1-26
// A-Z 27-52

function mapCharToNumber(char) {
	const charCode = char.charCodeAt(0)

	if (charCode >= 97 && charCode <= 122) {
		return charCode - 96
	}

	if (charCode >= 65 && charCode <= 90) {
		return charCode + -38
	}
}

const result = data.reduce(
	(acc, val) => {
		const strHalfLength = val.length / 2
		const firstHalf = val.slice(0, strHalfLength)
		const secondHalf = val.slice(strHalfLength)

		const stack = []

		firstHalf.split('').forEach((char, i) => {
			if (secondHalf.includes(char) && !stack.includes(char)) {
				stack.push(char)
			}
		})

		acc.char.push(...stack)

		return acc
	},
	{ char: [] }
)

const part1 = result.char.reduce((acc, val) => {
	acc += mapCharToNumber(val)
	return acc
}, 0)

console.log('🚀part1', part1)

const groups = data.reduce((acc, val, i, input) => {
	if (i % 3 === 0) {
		acc.push(input.slice(i, i + 3))
	}

	return acc
}, [])

const result2 = groups.reduce(
	(acc, val) => {
		const stack = []

		const chars1 = val[0].split('')

		chars1.some((char1) => {
			const chars2 = val[1].split('')
			const chars3 = val[2].split('')

			if (
				chars2.includes(char1) &&
				chars3.includes(char1) &&
				!stack.includes(char1)
			) {
				stack.push(char1)
			}
		})

		acc.char.push(...stack)

		return acc
	},
	{ char: [] }
)

const part2 = result2.char.reduce((acc, val) => {
	acc += mapCharToNumber(val)
	return acc
}, 0)

console.log('part2', part2)
