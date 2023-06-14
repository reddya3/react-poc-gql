/* eslint-disable no-plusplus,no-console */

const fs = require('fs')
const faker = require('faker')

// Seed to create the same output every time
faker.seed(1)

const ITEM_COUNT = 10

// Generate
const mock = {
  items: []
}

for (let i = 0; i < ITEM_COUNT; i++) {
  const item = {
    name: faker.name.findName(),
    value: faker.commerce.color()
  }
  mock.items.push(item)
}

// Write to file
fs.writeFile('mock.json', JSON.stringify(mock, null, 2), 'utf8', err => {
  if (!err) {
    console.log('Written generated mock to mock.json!')
  } else {
    console.error(err)
  }
})
