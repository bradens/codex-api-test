import { Codex } from "@codex-data/sdk";

if (!process.env.API_KEY) throw new Error("Must set API_KEY");

const sdk = new Codex(process.env.API_KEY);

let count = 0;
let startTime = Date.now();

// Log price rate every second
setInterval(() => {
  const elapsed = (Date.now() - startTime) / 1000;
  const rate = count / elapsed;
  console.log(
    `Rate: ${rate.toFixed(2)} events/second (${count} total events in ${elapsed.toFixed(1)}s)`,
  );

  // Reset counters
  count = 0;
  startTime = Date.now();
}, 1000);

// Now test a subscription
sdk.subscriptions.onUnconfirmedEventsCreated(
  {  id: "Czfq3xZZDmsdGdUyrNLtRhGc47cXcZtLG4crryfu44zE:1399811149" },
  {
    next(value) {
      const event = value.data?.onUnconfirmedEventsCreated;

      if (!event || !event.events[0]?.timestamp) {
        console.log("No price found");
        return;
      }

      count++;
      console.log(
        `[𝚫${Date.now() - event.events[0]?.timestamp * 1000}ms] Received event ${event.events[0]?.address}`,
      );
  },
  error(err) {
    console.error("Error:", err);
  },
  complete() {
    console.log("Subscription completed");
  },
});
