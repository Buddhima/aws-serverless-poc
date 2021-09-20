


const https = require('https')

let options = {
      hostname: 'jsonplaceholder.typicode.com',
      port: 443,
      path: '/todos',
      method: 'GET'
    }

exports.handler = async (event) => {
  console.log(event);
  
  const promise = new Promise(function(resolve, reject) {
    https.get(options, (res) => {
        var body = '';
        
        res.on("data", function(chunk) {
          // console.log("BODY: " + chunk);
          body += chunk;
        });
        
        res.on('end', function() {
          console.log(body);
          resolve(JSON.parse(body))
        });
        
      }).on('error', (e) => {
        reject(Error(e))
      })
    })
  return promise
}
