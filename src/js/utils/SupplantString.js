export default function supplantString (str, vals) {
  return str.replace(/{{ ([^{}]*) }}/g, (a, b) => {
    const r = vals[ b ]
    const ret = (typeof r === 'string' || typeof r === 'number') ? r : a

    return ret
  })
}
