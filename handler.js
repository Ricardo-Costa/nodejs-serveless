"use strict";

const { Lambda } = require("aws-sdk");

exports.handler = async function () {
  const lambda = new Lambda({
    apiVersion: "2015-03-31",
    // endpoint needs to be set only if it deviates from the default, e.g. in a dev environment
    // process.env.SOME_VARIABLE could be set in e.g. serverless.yml for provider.environment or function.environment
    endpoint: process.env.SOME_VARIABLE
      ? "http://localhost:3002"
      : "https://lambda.us-east-1.amazonaws.com",
  });

  const params = {
    // FunctionName is composed of: service name - stage - function name, e.g.
    FunctionName: "hello",
    InvocationType: "RequestResponse",
    Payload: JSON.stringify({ data: "foo" }),
  };

  const response = await lambda.invoke(params).promise();
};

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
