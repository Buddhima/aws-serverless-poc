var AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
    
    var s3 = new AWS.S3();
    
    var params = {
        Bucket : 'buddhima-testing-lambda-bucket',
        Key : 'exports/export.csv'
    };
    
    
    try {
        var result = await s3.getObject(params).promise();
        console.log(result.Body.toString());
        callback(null, toJSON(result.Body.toString()));
    } catch (err) {
        console.log(err);
        callback(Error(err));
    }
    

};

function toJSON(data) {
    var textArray = data.split('\n');
    textArray.shift();
    
    var result = [];
    
    textArray.forEach(function(item) {
        if (item.length > 5) {
            var segments = item.split(',');
            if (segments.length > 0) {
                
                    result.push(
                        {
                            id : segments[0].trim(),
                            userId : Number(segments[1].trim()),
                            title : segments[2].trim(),
                            completed : (segments[3].trim() === 'true')
                        }
                    );
            }

        }
    });
    
    console.log(result);
    
    return result;
}
