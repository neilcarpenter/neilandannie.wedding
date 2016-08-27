function returnNearestIndex (dataArray, targetIndex) {
  if (targetIndex < 0) {
    return false
  }

  const size = dataArray.length - 1

  if (targetIndex > size) {
    return dataArray[ size ]
  } else {
    return dataArray[ targetIndex ]
  }
}

function getDataFile (templatePath, templateSubComponent) {
  const subComponentString = templateSubComponent ? `.${templateSubComponent}` : ''
  const defaultPath = `${templatePath}/data${subComponentString}.js`

  try {
    return require(`../../src/js/views/${defaultPath}`).default
  } catch (e) {
    return []
  }
}

function getData (templatePath, templateSubComponent, version) {
  const dataIndex = version - 1
  let dataVersions = getDataFile(templatePath, templateSubComponent)

  const data = dataVersions ? returnNearestIndex(dataVersions, dataIndex) : {}

  return data
}

export { getData, returnNearestIndex }
