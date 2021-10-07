const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-2"});

exports.handler = async (event, context) => {
  
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2"});

  var inputData = event;
  
  //console.log(inputData)
  
  
  for (var index = 0; index <  inputData.length; index++) {
    
    var item = inputData[index];
    
    //console.log(item);
    
    
    const params = {
      TableName: "RemainingTodos",
      Item: {
        id: ''+item.id,
        userId: ''+item.userId,
        title: item.title,
        completed: item.completed
      }
    }
    
    //console.log(params);
    
    try {
      const data = await documentClient.put(params).promise();
      //console.log(data);
    } catch (err) {
      console.log(err);
    }
    
    
  };

  
}