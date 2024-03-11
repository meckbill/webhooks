import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqsClient = new SQSClient({ region: "eu-central-1" });

let sqsUrl = process.env.CHECKOUT_QUEUE_ARN;

export async function checkoutQueue(body) {
  console.log("checkout queue");
  const response = { statusCode: 200 };
  try {
    const command = new SendMessageCommand({
      MessageBody: JSON.stringify(body),
      QueueUrl: sqsUrl,
      MessageAttributes: {
        Coda: { DataType: "String", StringValue: "coda checkout" },
      },
    });
    await sqsClient.send(command);
    response.statusCode = 201;
    response.body = JSON.stringify({
      message: "Sent to sqs",
    });
    console.log(response.body);
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Something went wrong",
      errorMsg: e.message,
      errorStack: e.stack,
    });
  }
  return response;
}
