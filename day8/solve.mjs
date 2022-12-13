import fs from 'fs'

// const raw = fs.readFileSync('./example-input.txt', 'utf8')
const raw = fs.readFileSync('./input.txt', 'utf8')
const newLineRegex = '\n'
const data = raw.split(newLineRegex)
// console.log('🚀data', data)

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

const scores = []

// console.log('🚀data', data)
const part1 = data.reduce(
	(acc, val, i) => {
		let isVisible = false

		for (let j = 0; j < numberCol; j++) {
			let tLeft = 0
			let tRight = 0
			let tTop = 0
			let tBottom = 0

			const tree = Number(val.split('')[j])

			const left = data[i].slice(0, j).split('').map(Number).reverse()
			const right = data[i]
				.slice(j + 1)
				.split('')
				.map(Number)

			const top = cols[j].map(Number).slice(0, i).reverse()
			const bottom = cols[j].slice(i + 1).map(Number)

			if (
				tree > Math.max(...left) ||
				tree > Math.max(...right) ||
				tree > Math.max(...top) ||
				tree > Math.max(...bottom)
			) {
				acc.visible++
				isVisible = true
			}

			isVisible = false

			if (j !== 0 && j !== numberCol - 1) {
				left.some((t) => {
					tLeft++
					return t >= tree
				})

				right.some((t) => {
					tRight++
					return t >= tree
				})

				top.some((t) => {
					tTop++
					return t >= tree
				})

				bottom.some((t) => {
					tBottom++
					return t >= tree
				})

				const multiplyScore = tLeft * tRight * tTop * tBottom
				scores.push(multiplyScore)

				// console.log({
				// 	position: [i, j],
				// 	tree,
				// 	left: [tLeft, left],
				// 	right: [tRight, right],
				// 	top: [tTop, top],
				// 	bottom: [tBottom, bottom],
				// 	multiplyScore,
				// })
			}
		}

		return acc
	},
	{ visible: 0 }
)

console.log('🚀part1', part1)

// console.log('🚀scores', scores)
console.log('part2', Math.max(...scores))
