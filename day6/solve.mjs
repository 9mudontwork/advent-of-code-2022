import fs from 'fs'

// const raw = fs.readFileSync('./example-input.txt', 'utf8')
const raw = fs.readFileSync('./input.txt', 'utf8')
const newLineRegex = '\n'
const data = raw.split(newLineRegex)

// 7
// mjqjpqmgbljsphdztnvjfqwrcgsmlb
// mjqjpqm gbljsphdztnvjfqwrcgsmlb

// 5
// bvwbjplbgvbhsrlpgdmjqwftvncz
// bvwbj plbgvbhsrlpgdmjqwftvncz

// 6
// nppdvjthqldpwncqszvftbrmjlhg
// nppdvj thqldpwncqszvftbrmjlhg

// 10
// nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg
// nznrnfrfnt jfmvfwmzdfjlvtqnbhcprsg

// 11
// zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw
// zcfzfwzzqfr ljwzlrfnpqdbhtmscgvjw

const part1 = data.map((val, id) => {
	const strs = val.split('')
	let pastFirst = false
	let pos = 4

	strs.forEach((val, is) => {
		const pack = strs.slice(is, is + 4)
		const dups = pack.filter((val, ip, arr) => {
			return arr.indexOf(val) !== ip && arr.includes(val)
		})

		if (dups.length > 0 && !pastFirst) {
			pos += 1
		} else {
			pastFirst = true
		}
	})

	return pos
})

console.log('🚀part1', part1)
