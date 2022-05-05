// Returns an array containing numbers from min to max-1
export const range = (min, max) => [...Array(Math.abs(max - min)).keys()].map(x => x + min)

// Returns a dict mapping each element of an array to its total count
export const frequency = (array) => array.reduce((sum, x) => {
        sum[x] = (sum[x] | 0) + 1
        return sum
}, {})

export const sleep = (ms) => new Promise(x => setTimeout(x, ms))