import { Codex } from "@codex-data/sdk";

if (!process.env.API_KEY) throw new Error("Must set API_KEY");

const sdk = new Codex(process.env.API_KEY);

// Create an api token
const res = await sdk.mutations.createApiTokens({
  input: { expiresIn: 3600 * 1000 },
});

const token = res.createApiTokens[0].token;

const shortLivedSdk = new Codex(`Bearer ${token}`);

shortLivedSdk.queries
  .token({
    input: {
      address: "0xc56c7a0eaa804f854b536a5f3d5f49d2ec4b12b8",
      networkId: 1,
    },
  })
  .then(({ token }) => console.log(`Token: ${token.id} - ${token.symbol}`));
