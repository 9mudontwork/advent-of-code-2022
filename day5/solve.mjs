import fs from 'fs'
// import { grids } from './data1.mjs'
import { grids } from './data2.mjs'

// const raw = fs.readFileSync('./example-input.txt', 'utf8')
const raw = fs.readFileSync('./input.txt', 'utf8')
const newLineRegex = '\n'
let data = raw.split(newLineRegex)

data = data.filter((val) => val.includes('move'))

const regex = /move (\d+) from (\d+) to (\d+)/

const procedures = data.reduce((acc, val, i) => {
	const [, move, from, to] = val.match(regex)
	acc.push([-Number(move), Number(from) - 1, Number(to) - 1])

	return acc
}, [])

procedures.forEach(([move, from, to]) => {
	// part 1
	// const tempMove = grids[from].slice(move).reverse()

	// part 2
	const tempMove = grids[from].slice(move)

	grids[from].splice(move)
	grids[to].push(...tempMove)
})

const part1 = grids
	.reduce((acc, val) => {
		acc.push(val.slice(-1))

		return acc
	}, [])
	.join('')

console.log('🚀part1', part1)
