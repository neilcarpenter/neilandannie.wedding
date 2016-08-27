// Regex to find '+' symbol
const plus = /\+/g
// Regex to find key value pairs
const search = /([^&=]+)=?([^&]*)/g

function decode (str) {
  return decodeURIComponent(str.replace(plus, ' '))
}

export default function parseQueryString (query) {
  if (!query) return {}

  const params = {}

  let match = search.exec(query)

  while (match) {
    params[decode(match[1])] = decode(match[2])
    match = search.exec(query)
  }

  // console.debug('parseQueryString:', query, JSON.stringify(params, null, 2));
  return params
}
