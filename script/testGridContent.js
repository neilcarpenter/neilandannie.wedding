import groupBy from 'lodash.groupby'

import { all } from '../app/gridContent'

const REQUIRED_PROPERTIES = [
  'slug'
]

const errors = []

let allItems = []
all.forEach(gridContent => {
  gridContent.data.map(contentItem => contentItem._contentFile = gridContent.label)
  allItems = allItems.concat(gridContent.data)
})

function checkUniqueSlugs() {
  const grouped = groupBy(allItems, 'slug')

  for (let key in grouped) {
    if (grouped[key].length > 1) {
      errors.push(`Non-unique slug detected in gridContent\n\n${JSON.stringify(grouped[key], null, 2)}`)
    }
  }
}

function checkRequiredProperties() {
  allItems.forEach(item => {
    REQUIRED_PROPERTIES.forEach(property => {
      if (!item[property]) {
        errors.push(`Grid content item missing required property "${property}"\n\n${JSON.stringify(item, null, 2)}`)
      }
    })
  })
}

function reportErrors() {
  if (errors.length) {
    const message = errors.join('\n\n-- AND --\n\n')
    throw new Error(message)
  }
}

checkUniqueSlugs()
checkRequiredProperties()
reportErrors()
