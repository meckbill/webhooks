import { createHmac } from "crypto";

export async function validateHmac(event) {
  let response = { statusCode: 200 };

  const { webhook_verify_hash } = process.env;

  const shopify_hash = event.headers
    ? event.headers["X-Shopify-Hmac-Sha256"] ||
      event.headers["x-shopify-hmac-sha256"]
    : "";

  const hmac_content = createHmac("sha256", webhook_verify_hash)
    .update(Buffer.from(event.body, "utf-8"))
    .digest("base64");

  if (hmac_content !== shopify_hash) {
    console.log("Not from shopify");
    response.statusCode = 500;
    response = {
      body: JSON.stringify({ error: "Not from shopify" }),
    };

    throw new Error(response.body);
  }

  console.log("Ok, from shopify");
  response.statusCode = 200;
  response = {
    body: JSON.stringify("From shopify"),
  };

  return response;
}
