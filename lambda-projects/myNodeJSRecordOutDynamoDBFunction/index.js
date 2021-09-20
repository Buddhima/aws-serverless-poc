
const AWS = require('aws-sdk');


AWS.config.update({ region: "us-east-2"});

exports.handler = async (event, context, callback) => {
    
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2"});
  const params = {
      TableName: "Todos"
    }
    
    //console.log(params);
    
    var scanResults = [];
    
    try {
        const data = await documentClient.scan(params).promise();
        
        scanResults = data.Items.filter((item) => item.completed == false);
        
        console.log('Result count: ' + scanResults.length);
        //console.log(data);
    } catch (err) {
        console.log(err);
    }
    
    return scanResults;
    
};
