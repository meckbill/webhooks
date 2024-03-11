import { validateHmac } from "./src/validation.mjs";
import { checkoutQueue } from "./src/queue/checkout.mjs";
import { updateQueue } from "./src/queue/update.mjs";
import { orderQueue } from "./src/queue/order.mjs";

const cartCheckout = "/cart/checkout";
const cartUpdate = "/cart/update";
const orderComplete = "/order/complete";

export const handler = async (event) => {
  const response = await validateHmac(event);
  try {
    const path = event.path;
    let res;
    switch (path) {
      case cartCheckout:
        res = await checkoutQueue(event.body);
        console.log(path);
        break;
      case cartUpdate:
        res = await updateQueue(event.body);
        console.log(path);
        break;
      case orderComplete:
        res = await orderQueue(event.body);
        console.log(path);
        break;
      default:
        res = { error: "Incorrect path" };
        console.log(res);
    }
  } catch (e) {
    console.warn(e);
  }
};
