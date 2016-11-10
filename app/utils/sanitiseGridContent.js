export default function sanitiseGridContent(data) {
  let dataString = JSON.stringify(data)
  dataString = dataString.replace(/"/g, '&quot;')
  dataString = dataString.replace(/'/g, '&lsquo;')
  return dataString
}
