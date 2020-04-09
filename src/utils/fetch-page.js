


async function load() {
    const data = await fetch('/pages/data.json')
    const json = await data.json()

    return json.data
}

let ALL = undefined

/**
 * 
 * @param {Object} params start page, rows number
 */
async function fetchPage({ start = 0, rows = 10 }) {
    if (!ALL) {
        ALL = await load()
    }

    return new Promise(function (res, err) {
        const page = ALL.reduce(function (a, b, i) {
            if (Math.trunc(i / rows) === start) {
                return [...a, b]
            }
            return a
        }, [])
        res({ data: page, maxRows: ALL.length })
    })
}

export default fetchPage