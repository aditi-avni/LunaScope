
require('dotenv').config()
const mongoose = require('mongoose')
const Location = require('./models/locations')

const locations = [
  {
    name: 'Shackleton Crater',
    type: 'Crater',
    description: 'A crater near the lunar south pole, important for studying permanently shadowed regions and potential water ice.',
    latitude: -89.9,
    longitude: 0,
    region: 'Lunar South Pole',
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2024/01/faces-of-shackleton.jpg',
    facts: [
      'Located near the Moon’s south pole.',
      'Some nearby areas receive sunlight for extended periods.',
      'Permanently shadowed regions may preserve water ice.'
    ],
    sourceUrl: 'https://science.nasa.gov/moon/'
  },
  {
    name: 'Tycho Crater',
    type: 'Crater',
    description: 'A prominent impact crater in the Moon’s southern highlands, known for its bright rays.',
    latitude: -43.3,
    longitude: -11.2,
    region: 'Southern Lunar Highlands',
    imageUrl: '',
    facts: [
      'Its bright rays are visible across much of the Moon.',
      'It is a relatively young lunar impact crater.'
    ],
    sourceUrl: 'https://science.nasa.gov/moon/'
  },
  {
    name: 'Mare Tranquillitatis',
    type: 'Lunar Mare',
    description: 'A broad basaltic plain that was the landing region for Apollo 11.',
    latitude: 8.5,
    longitude: 31.4,
    region: 'Near Side',
    imageUrl: '',
    facts: [
      'Apollo 11 landed here in 1969.',
      'Its surface contains ancient volcanic material.'
    ],
    sourceUrl: 'https://science.nasa.gov/moon/'
  },
  {
    name: 'Oceanus Procellarum',
    type: 'Lunar Mare',
    description: 'A vast volcanic plain on the Moon’s near side.',
    latitude: 18.4,
    longitude: -57.4,
    region: 'Near Side',
    imageUrl: '',
    facts: [
      'Its name means Ocean of Storms.',
      'It is one of the largest lunar maria.'
    ],
    sourceUrl: 'https://science.nasa.gov/moon/'
  },
  {
    name: 'Aristarchus Plateau',
    type: 'Lunar Plateau',
    description: 'A geologically interesting region containing Aristarchus Crater and nearby volcanic features.',
    latitude: 23.7,
    longitude: -47.4,
    region: 'Northwestern Near Side',
    imageUrl: '',
    facts: [
      'Aristarchus Crater is known for its brightness.',
      'The region contains varied volcanic and geological features.'
    ],
    sourceUrl: 'https://science.nasa.gov/moon/'
  }
]

async function seedLocations() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    for (const location of locations) {
      await Location.findOneAndUpdate(
        { name: location.name },
        location,
        { upsert: true, returnDocument: 'after', runValidators: true }
      )
    }

    console.log(`${locations.length} lunar locations seeded successfully.`)
  } catch (error) {
    console.error('Seeding failed:', error.message)
  } finally {
    await mongoose.disconnect()
  }
}

seedLocations()
