const base = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";

const handleResponse = async (response: Response) => {
  if (response.ok) {
    return response.json();
  } else {
    const errMsg = await response.text();
    throw new Error(errMsg);
  }
};

export const paypal = {
  async createOrder(price: number) {
    const token = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: price,
            },
          },
        ],
      }),
    });

    return handleResponse(response);
  },

  async capturePayment(orderId: string) {
    const token = await generateAccessToken();

    const url = `${base}/v2/checkout/orders/${orderId}/capture`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },
};

// generate paypal an access token
const generateAccessToken = async () => {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
    "base64"
  );

  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const jsnData = await handleResponse(response);
  return jsnData.access_token;
};

export { generateAccessToken };
