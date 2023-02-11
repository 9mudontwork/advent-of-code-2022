import fs from 'fs'

const raw = fs.readFileSync('./example-input.txt', 'utf8')
// const raw = fs.readFileSync('./input.txt', 'utf8')
const newLineRegex = '\n'
const data = raw.split(newLineRegex).map((data) => data.split(' '))

const grid = Array(5).fill(0)
grid.forEach((row, i) => {
	grid[i] = Array(6).fill(0)
})
const gridH = grid.map((v) => v.slice())
const gridT = grid.map((v) => v.slice())

let head = { y: 3, x: 4 }
let tail = { y: 4, x: 3 }

gridH[head.y][head.x] = 1
gridT[tail.y][tail.x] = 1

console.log('head', gridH)
console.log('🚀tail', gridT)

let step = 0

data.forEach(([way, move]) => {
	// gridH[head.x][head.y] = 0
	const moveCount = Number(move)

	for (let i = 0; i < moveCount; i++) {
		if (way === 'R' && head.x < 4) {
			head.x += 1
			gridH[head.y][head.x] = 1
			gridH[head.y][head.x - 1] = 0
		}

		if (way === 'L' && head.x > 0) {
			head.x -= 1
			gridH[head.y][head.x] = 1
			gridH[head.y][head.x + 1] = 0
		}

		if (way === 'U' && head.y > 0) {
			head.y -= 1
			gridH[head.y][head.x] = 1
			gridH[head.y + 1][head.x] = 0
		}

		if (way === 'D' && head.y < 4) {
			head.y += 1
			gridH[head.y][head.x] = 1
			gridH[head.y - 1][head.x] = 0
		}

		function findAround() {
			const left = tail.x - 1 < 4 ? 0 : gridH[tail.y][tail.x - 1]

			const right = tail.x + 1 > 4 ? 0 : gridH[tail.y][tail.x + 1]

			const top = tail.y - 1 < 4 ? 0 : gridH[tail.y - 1][tail.x]

			const bottom = tail.y + 1 > 0 ? 0 : gridH[tail.y + 1][tail.x]

			return { left, right, top, bottom }
		}

		function allPositionAtZero() {
			const { left, right, top, bottom } = findAround()
			return left + right + top + bottom === 0
		}

		// if (allPositionAtZero()) {
		// 	if (head.x === tail.y && head.y === tail.x) {
		// 		gridT[tail.y - 1][tail.x + 1] = 1
		// 		gridT[tail.y][tail.x] = 0

		// 		console.log('ทะแยง')
		// 	} else {
		// 		if (way === 'R' && tail.x < 4) {
		// 			tail.x += 1
		// 			gridT[tail.y][tail.x] = 1
		// 			gridT[tail.y][tail.x - 1] = 0
		// 		}
		// 	}

		// 	// if (way === 'L' && tail.x > 0) {
		// 	// 	tail.x -= 1
		// 	// 	gridT[tail.y][tail.x] = 1
		// 	// 	gridT[tail.y][tail.x + 1] = 0
		// 	// }

		// 	// if (way === 'U' && tail.y > 0) {
		// 	// 	tail.y -= 1
		// 	// 	gridT[tail.y][tail.x] = 1
		// 	// 	gridT[tail.y + 1][tail.x] = 0
		// 	// }

		// 	// if (way === 'D' && tail.y < 4) {
		// 	// 	tail.y += 1
		// 	// 	gridT[tail.y][tail.x] = 1
		// 	// 	gridT[tail.y - 1][tail.x] = 0
		// 	// }

		// 	step++
		// }

		// console.log(findAround())
		console.log(`H ${way} ${move}`, gridH)
		console.log(`T ${way} ${move}`, gridT)
	}
})

console.log('🚀step', step)
