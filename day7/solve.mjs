import fs from 'fs'

const raw = fs.readFileSync('./example-input.txt', 'utf8')
// const raw = fs.readFileSync('./input.txt', 'utf8')
const newLineRegex = '\n'
const data = raw
	.split(newLineRegex)
	.map((data) => data.split(' '))
	.slice(1)
// console.log('🚀data', data)

const result = data.reduce(
	(acc, [size, cmd, path], i) => {
		if (cmd === 'ls') {
			acc.stacks.push(0)
		}

		if (!isNaN(Number(size))) {
			acc.stacks = acc.stacks.map((total) => total + Number(size))
		}

		if (path === '..') {
			acc.sizes.push(acc.stacks.pop())
		}

		// console.log('🚀acc', acc)
		return acc
	},
	{ stacks: [], sizes: [] }
)

const sizeDirs = [...result.stacks, ...result.sizes]

const size = sizeDirs.filter((size) => size < 100000)
const part1 = size.reduce((sum, size) => sum + size, 0)
console.log('🚀part1', part1)

const part2 = sizeDirs.filter((size) => {
	return size > Math.max(...sizeDirs) - 40_000_000
})

console.log('🚀part2', Math.min(...part2))
