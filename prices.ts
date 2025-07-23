import { Codex } from "@codex-data/sdk";

if (!process.env.API_KEY) throw new Error("Must set API_KEY");

const sdk = new Codex(process.env.API_KEY);

// Price rate tracking
let priceCount = 0;
let startTime = Date.now();

// Log price rate every second
setInterval(() => {
  const elapsed = (Date.now() - startTime) / 1000;
  const rate = priceCount / elapsed;
  console.log(
    `Rate: ${rate.toFixed(2)} prices/second (${priceCount} total prices in ${elapsed.toFixed(1)}s)`,
  );

  // Reset counters
  priceCount = 0;
  startTime = Date.now();
}, 1000);

// Now test a subscription
sdk.subscriptions.onPriceUpdated(
  { networkId: 1399811149 },
  {
    next(value) {
      const price = value.data?.onPriceUpdated;
      if (!price || !price.timestamp) {
        console.log("No price found");
        return;
      }

      priceCount++;
      console.log(
        `[𝚫${Date.now() - price.timestamp * 1000}ms] Received price ${value.data?.onPriceUpdated?.address}`,
      );
    },
    error(err) {
      console.error("Error:", err);
    },
    complete() {
      console.log("Subscription completed");
    },
  },
);
