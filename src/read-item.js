const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const ddb = new AWS.DynamoDB.DocumentClient();

function readItem() {
    const table = "Movies";
    const year = 2021;
    const title = "Puaada";

    const params = {
        TableName: table,
        Key: {
            year,
            title,
        }
    }

    ddb.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2));
        } else {
            console.log("GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2));
        }
    })
}

readItem();