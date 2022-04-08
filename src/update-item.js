const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1"});

const ddb = new AWS.DynamoDB.DocumentClient();

function updateItem() {
    const table = "Movies";
    const year = 2021;
    const title = "Puaada";

    const params = {
        TableName: table,
        Key: {
            year,
            title,
        },
        UpdateExpression: "set #y = :yyyy, #t = :name",
        ExpressionAttributeNames: {
            "#y": "year",
            "#t": "title"
        },
        ExpressionAttributeValues: {
            ":yyyy": 2022,
            ":name": "DDB Se Bachke"
        }
    }

    ddb.update(params, (err, data) => {
        if (err) {
            console.error("Unable to update item: " + "\n" + JSON.stringify(err, undefined, 2));
        } else {
            console.log("UpdateItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2));
        }
    })
}

updateItem();

/* var params = {
    TableName:table,
    Key:{
        "year":year,
        "title":title
    },
    ConditionExpression:"info.rating <= :val",
    ExpressionAttributeValues: {
        ":val": 5.0
    }
};

docClient.delete(params, function(err, data) {
    if (err) {
        document.getElementById('textarea').innerHTML = "The conditional delete failed: " + "\n" + JSON.stringify(err, undefined, 2);
    } else {
        document.getElementById('textarea').innerHTML = "The conditional delete succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
    }
});
} */


/* var params = {
    TableName:table,
    Key:{
        "year": year,
        "title": title
    },
    UpdateExpression: "set info.rating = info.rating + :val",
    ExpressionAttributeValues:{
        ":val":1
    },
    ReturnValues:"UPDATED_NEW"
}; */

/* const params = {
    TableName: table,
    Key: {
        year,
        title,
    },
    UpdateExpression: "remove info.actors[0]",
    ConditionExpression: "size(info.actors) = :num",
    ExpressionAttributeValues: {
        ":num": 2
    },
    ReturnValues: "UPDATED_NEW"
} */