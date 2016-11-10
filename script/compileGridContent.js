import fs from 'fs'
import slug from 'slug'
import GoogleSpreadsheet from 'google-spreadsheet'
import findWhere from 'lodash.findwhere'

const SPREADSHEET_ID = '1PnZiZKa_TZAOkmY5sXrVnYDOU_NkSIALUKEftFaYwKQ'
const SERVICE_ACCOUNT_KEY = require('../service-account-key.json')

const CONTENT_TYPES = [
  {
    name: 'neilAndAnnie',
    sheetLabel: 'Neil and Annie',
    data: []
  },
  {
    name: 'neilAndAnnieExtension',
    sheetLabel: 'Neil and Annie extension',
    data: []
  },
  {
    name: 'location',
    sheetLabel: 'Location',
    data: []
  },
  {
    name: 'Wedding',
    sheetLabel: 'Wedding',
    data: []
  }
]

const CELL_PROPERTY_MAP = {
  title: 'title',
  location: 'location',
  time: 'timestamp',
  'comment-annie': 'comment_annie',
  'comment-neil': 'comment_neil'
}

const sheet = new GoogleSpreadsheet(SPREADSHEET_ID)

function writeContent() {
  CONTENT_TYPES.forEach(type => {
    const content = `export default ${JSON.stringify(type.data)}`
    fs.writeFileSync(`./app/gridContent/${type.name}.js`, content)
  })
}

sheet.useServiceAccountAuth(SERVICE_ACCOUNT_KEY, (err) => {
  if (err) {
    console.log(`ERROR::sheet.useServiceAccountAuth`)
    console.error(err)
  }

  // tabs.forEach(tab => {
    const tabType = 'images'
    sheet.getRows(1, {}, (rowErr, rows) => {
      if (rowErr) {
        console.log(`ERROR::sheet.getRows`)
        console.error(rowErr)
      }

      rows.shift()
      rows.forEach(row => {
        const contentType = findWhere(CONTENT_TYPES, { sheetLabel: row.type })
        const rowItem = {}

        for (let key in row) {
          if (CELL_PROPERTY_MAP.hasOwnProperty(key)) {
            rowItem[CELL_PROPERTY_MAP[key]] = row[key]
          }
        }

        rowItem.slug = slug(rowItem.title, { lower: true })
        rowItem.source = `/gridAssets/${tabType}/${row.filename}`
        rowItem.thumbnail = `/gridAssets/thumbnails/${row.filename}`

        contentType.data.push(rowItem)
      })

      writeContent()
    })
  // })
})
