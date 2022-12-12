import fs from 'fs'

// const raw = fs.readFileSync('./example-input.txt', 'utf8')
const raw = fs.readFileSync('./input.txt', 'utf8')
const newLineRegex = '\n'
const data = raw.split(newLineRegex)
console.log('🚀data', data)

const numberCol = data[0].split('').length
const numberRow = data.length

// const maxValPerRow = data.reduce((acc, val) => {
// 	const max = Number(val.split('').sort((a, b) => b - a)[0])
// 	acc.push(max)
// 	return acc
// }, [])

// const cols = []

const cols = data.reduce((acc, val, i) => {
	// console.log('🚀acc', acc)
	const stack = []
	for (let j = 0; j < numberRow; j++) {
		const tree = data[j].split('')[i]
		stack.push(tree)
	}

	acc.push(stack)

	// acc.push(Math.max(...stack))

	return acc
}, [])

// console.log('🚀cols', cols)

const result = data.reduce(
	(acc, val, i) => {
		let isVisible = false

		for (let j = 0; j < numberCol; j++) {
			const tree = val.split('')[j]

			const left = data[i].slice(0, j).split('')
			const right = data[i].slice(j + 1).split('')

			const top = cols[j].slice(0, i)
			const bottom = cols[j].slice(i + 1)

			if (
				tree > Math.max(...left) ||
				tree > Math.max(...right) ||
				tree > Math.max(...top) ||
				tree > Math.max(...bottom)
			) {
				acc.visible++
				isVisible = true
			}

			// console.log({
			// 	position: [i, j],
			// 	isVisible,
			// 	tree,
			// 	left,
			// 	right,
			// 	top,
			// 	bottom,
			// })

			isVisible = false
		}

		return acc
	},
	{ visible: 0 }
)

console.log('🚀result', result)
