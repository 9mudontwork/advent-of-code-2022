import fs from 'fs'

const raw = fs.readFileSync('./example-input.txt', 'utf8')
// const raw = fs.readFileSync('./input.txt', 'utf8')
const newLineRegex = '\n'
let data = raw.split(newLineRegex)

data = data.map((val) => {
	return val.split(',').map((val) => val.split('-'))
})

// [ [ '2', '4' ], [ '6', '8' ] ],
// [ [ '2', '3' ], [ '4', '5' ] ],
// [ [ '5', '7' ], [ '7', '9' ] ],
// [ [ '2', '8' ], [ '3', '7' ] ],
// [ [ '6', '6' ], [ '4', '6' ] ],
// [ [ '2', '6' ], [ '4', '8' ] ]

// console.log('🚀data', data)

const result1 = data.reduce((acc, vals) => {
	const firstFullStr = []
	const secondFullStr = []

	vals.map((val, i) => {
		const [onePos, twoPos] = val.map((val) => Number(val))

		if (i === 0) {
			for (let i = onePos; i <= twoPos; i++) {
				firstFullStr.push(i)
			}
		}

		if (i === 1) {
			for (let i = onePos; i <= twoPos; i++) {
				secondFullStr.push(i)
			}
		}
	})

	const con1 = firstFullStr.every((val) => secondFullStr.includes(val))
	const con2 = secondFullStr.every((val) => firstFullStr.includes(val))

	if (con1 | con2) acc += 1

	return acc
}, 0)

console.log('result1', result1)
