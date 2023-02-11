import fs from 'fs'

// R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2

const raw = fs.readFileSync('./example-input.txt', 'utf8')
// const raw = fs.readFileSync('./input.txt', 'utf8')
const newLineRegex = '\n'
const data = raw.split(newLineRegex).map((data) => data.split(' '))

const grid = Array(5).fill(0)
grid.forEach((row, i) => {
	grid[i] = Array(6).fill(0)
})
const gridH = grid.map((v) => v.slice())
let gridT = grid.map((v) => v.slice())

let head = { y: 4, x: 0 }
let tail = { y: 4, x: 0 }
let stamp = { y: 4, x: 0 }

let step = 0
gridH[head.y][head.x] = 1
gridT[tail.y][tail.x] = 1

function goMove(way) {
	const move = {
		L: () => {
			head.x -= 1
			head.x < 0 && (head.x = 0)
			gridH[head.y][head.x] = 1
			gridH[head.y][head.x + 1] = 0
		},
		R: () => {
			head.x += 1
			head.x > 5 && (head.x = 5)
			gridH[head.y][head.x] = 1
			gridH[head.y][head.x - 1] = 0
		},
		U: () => {
			head.y -= 1
			head.y < 0 && (head.y = 0)
			gridH[head.y][head.x] = 1
			gridH[head.y + 1][head.x] = 0
		},
		D: () => {
			head.y += 1
			head.y > 5 && (head.y = 5)
			gridH[head.y][head.x] = 1
			gridH[head.y - 1][head.x] = 0
		},
	}[way]

	move()
}

function isNear() {
	const touchs = {
		top: gridT[head.y - 1] ? gridT[head.y - 1][head.x] : null,
		bottom: gridT[head.y + 1] ? gridT[head.y + 1][head.x] : null,
		left: gridT[head.y][head.x - 1] || null,
		right: gridT[head.y][head.x + 1] || null,
		topLeft: gridT[head.y - 1] ? gridT[head.y - 1][head.x - 1] : null,
		topRight: gridT[head.y - 1] ? gridT[head.y - 1][head.x + 1] : null,
		bottomLeft: gridT[head.y + 1] ? gridT[head.y + 1][head.x - 1] : null,
		bottomRight: gridT[head.y + 1] ? gridT[head.y + 1][head.x + 1] : null,
	}

	const hasTouch = Object.values(touchs).some((v) => v === 1)

	return hasTouch
}

function resetT() {
	gridT = grid.map((v) => v.slice())
}

data.forEach(([way, move]) => {
	const moveCount = Number(move)

	for (let i = 0; i < moveCount; i++) {
		goMove(way)

		if (isNear()) {
			stamp = { ...head }
		}

		if (!isNear()) {
			resetT()
			gridT[stamp.y][stamp.x] = 1
			step++
		}
	}
})

console.log('🚀step', step)
