var AWS = require('aws-sdk');

exports.handler = async (event) => {
    
    var s3 = new AWS.S3();
    var params = {
        Bucket : 'buddhima-testing-lambda-bucket',
        Key : 'exports/export.csv',
        Body : toCSV(event),
        ContentType: 'application/csv'
    };
    
    console.log('--- before adding ---');
    
    try {
        var result = await s3.putObject(params).promise();
        console.log(result);
    } catch (err) {
      console.log(err);
    }
    
    
    
    
    
    
    // TODO implement
    const response = {
        statusCode: 201,
        body: '',
    };
    return response;
};


function toCSV(data) {
    var headers = 'id, userId, title, completed\n';
    var result = '';
    
    result += headers;
    
    data.forEach(function(item) {
        
        result += item.id + ", " + item.userId + ", " + item.title + ", " + item.completed + "\n";
        
    });
    
    return result;
}


