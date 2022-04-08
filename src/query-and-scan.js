const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const ddb = new AWS.DynamoDB.DocumentClient();

function queryItems() {
    var params = {
        TableName: "Movies",
        ProjectionExpression: "#yr, title, info.genres, info.actors[0]",
        KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
        ExpressionAttributeNames: {
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":yyyy": 1992,
            ":letter1": "A",
            ":letter2": "L"
        }
    };

    ddb.query(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error: " + "\n" + JSON.stringify(err, undefined, 2));
        } else {
            console.log("Querying for movies from 1992 - titles A-L, with genres and lead actor: " + "\n" + JSON.stringify(data, undefined, 2));
        }
    });
}

// queryItems();


function scanItems() {
    const params = {
        TableName: "Movies",
        ProjectionExpression: "#yr, title, info.rating",
        FilterExpresssion: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":start_yr": 2009,
            ":end_yr": 2020
        }
    }
    ddb.scan(params, (err, data) => {
        if (err) {
            console.error("Unable to scan the table: " + "\n" + JSON.stringify(err, undefined, 2));
        } else {
            console.log("Scan Succeded: " + data.Items + " items found.")
        }
    })
}

scanItems()