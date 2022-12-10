import fs from 'fs'

// const raw = fs.readFileSync('./example-input.txt', 'utf8')
const raw = fs.readFileSync('./input.txt', 'utf8')
const newLineRegex = '\n'
const data = raw.split(newLineRegex).map((val) => val.replace(' ', ''))
console.log('🚀data', data)

// A rock 1
// B paper 2
// C scissors 3

// X rock 1
// Y paper 2
// Z scissors 3

// 0 lost, 3 draw , 6 win

const result = {
	AX: 4,
	AY: 8,
	AZ: 3,
	BX: 1,
	BY: 5,
	BZ: 9,
	CX: 7,
	CY: 2,
	CZ: 6,
}

// x need lose
// y need draw
// z need win

const part2 = {
	AX: 3,
	AY: 4,
	AZ: 8,
	BX: 1,
	BY: 5,
	BZ: 9,
	CX: 2,
	CY: 6,
	CZ: 7,
}

const score = data.reduce((acc, val) => {
	acc += result[val]
	return acc
}, 0)

console.log('🚀score', score)

const score2 = data.reduce((acc, val) => {
	acc += part2[val]
	return acc
}, 0)

console.log('🚀score2', score2)
