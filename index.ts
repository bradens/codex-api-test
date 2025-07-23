import { Codex } from "@codex-data/sdk";

if (!process.env.API_KEY) throw new Error("Must set API_KEY");

const sdk = new Codex(process.env.API_KEY);

console.log(
  await sdk.queries.getTokenEvents({
    query: {
      address: "0xc56c7a0eaa804f854b536a5f3d5f49d2ec4b12b8",
      networkId: 1,
    },
  }),
);

// Now test a subscription
sdk.subscriptions.onLaunchpadTokenEvent(
  { input: { networkId: 1399811149 } },
  {
    next(value) {
      console.log(value);
    },
    complete() {
      console.log("Complete");
    },
    error(error) {
      console.log("Error", error);
    },
  },
);
