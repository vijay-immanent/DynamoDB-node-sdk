const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1"});

const ddb = new AWS.DynamoDB.DocumentClient();

function createItem() {
    const params = {
        TableName: "Movies",
        Item: {
            "year":  2021,
            "title": "Puaada",
            "info": {
                "plot": "Jaggi, a farmer, and Raunak, a young woman, love each other and wish to get married. However, they face several challenges in their quest to unite."
            }
        }
    }
    ddb.put(params, (err, data) => {
        if (err) {
            console.warn("Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2));
        } else {
            console.log("PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2));
        }
    })
}

createItem();