// @ts-check
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const moviedata = require("./assets/moviedata.json")

const ddb = new AWS.DynamoDB.DocumentClient();

moviedata.forEach((movie, count) => {
    const params = {
        TableName: "Movies",
        Item: {
            "year": movie.year,
            "title": movie.title,
            "info": movie.info
        }
    };
    
    ddb.put(params, (err, data) => {
        if (err) {
            console.warn("Unable to add movie: " + (count + 1) + movie.title + "\n");
            console.error("Error JSON: " + JSON.stringify(err) + "\n")
        } else {
            console.log("PutItem succeeded: " + movie.title + "\n");
        }
    })
})
