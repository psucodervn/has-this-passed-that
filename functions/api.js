const fetch = require('node-fetch')
const API_KEY = process.env.YOUTUBE_API_KEY;

const API_ENDPOINT = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=knW7-x7Y7RE%2Cj8U06veqxdU&key=${API_KEY}`

exports.handler = async (event, context) => {
  let data
  try {
    data = await fetch(API_ENDPOINT).then(res => res.json())
    // handle response
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: data.items.map(i => i.statistics)
      })
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
}