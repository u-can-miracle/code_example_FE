import * as request from 'request'

export default async function postJsonToUrl(url, json = {}){
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url,
      json
    }

    request(options, (err, response, body) => {
      if(err){
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
}
