# Ask about Sean

## This branch

The paperclip launcher in the bottom-right corner opens an interactive design preview. There is no separate `/ask/` page or chat navigation item. It uses a small, client-visible set of curated professional answers with source links. It makes no model requests and sends no questions to a server. Free text selects a relevant prepared answer; unknown topics get an honest fallback. The conversation lives only in React memory. It is not a completed LLM integration and the preview implements no usage limits.

## Recommended first live version

Pay for a small server-side API allowance so visitors can ask immediately. Keep the static site and deploy a separate same-origin `/api/ask` backend behind the existing hosting router. A Next route handler alone will not work with this repository's `output: "export"` deployment.

Do not make connecting a visitor's ChatGPT account the core flow. ChatGPT and API billing are separate; a subscription is not a general-purpose API allowance for this site. An optional link to a separately configured GPT could be a later convenience, but it moves the experience out of the site and requires its own setup. See [OpenAI's billing explanation](https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform).

Store the model credential only in the backend's secret store, never in a `NEXT_PUBLIC_` variable or static bundle. See [OpenAI API authentication](https://developers.openai.com/api/reference/overview).

### Content

Author a dedicated, reviewed collection of professional background notes: project decisions, research summaries, lessons learned, and public career history. It can be richer than the visible portfolio. Do not mount the personal knowledge base or feed it wholesale to retrieval. Anything supplied to a public chatbot should be treated as disclosable, even if stored server-side; prompt instructions cannot guarantee secrecy.

Give each note a stable ID, public source link, and review date. Retrieve a few relevant notes, answer only from them, cite the source links, and say when the notes do not answer a question. Do not impersonate Sean, invent achievements, or make commitments for him. Start without external tools or arbitrary URL fetching.

### Suggested launch limits (proposal, not configured)

- 10 questions per visitor per week, plus a short burst limit (3 per minute).
- $10 maximum total model spend per UTC week, with an operator kill switch.
- A modest question limit (1,000 characters), bounded history/context tokens, and a strict output-token maximum.

Anonymous cookies identify browsers, not people. Pair a signed, HTTP-only visitor cookie with a short-lived HMAC of the network address for abuse controls; do not claim this is an enforceable per-person quota. Introduce verified sign-in if a real per-user quota becomes necessary. Never ask visitors for their model API key.

### Durable budget enforcement

Use a transactional database or single durable coordinator. Before a provider request, atomically check and reserve the maximum possible request cost against **both** the visitor and global week buckets, based on a pinned model's verified token prices and bounded input/output. Reject if either reserve would exceed its cap. Reserve a message slot and concurrency slot in the same transaction. The backend must fail closed when accounting is unavailable.

Assign an idempotency key so retries cannot reserve twice or trigger duplicate inference. After completion, reconcile the reservation to actual token usage and release the unused portion. On timeout or ambiguous provider failure, retain the reservation until reconciliation; do not blindly refund a request that may have incurred cost. Store outstanding reservations durably across restarts. Avoid automatic provider retries unless the original outcome is known. Provider dashboard budgets are defense in depth, not a substitute for this admission check.

Return an explicit reset timestamp and a friendly exhausted-allowance state, with résumé and contact links still available. Use a fixed UTC week boundary and document it in the UI. Server-enforce origin, input size, model choice, and token limits. Client counters are presentation only.

### Before enabling live chat

1. Approve the curated background corpus and initial budget values.
2. Deploy the backend, persistent accounting store, and secret; confirm the host routes `/api/ask` to it instead of the static export.
3. Test simultaneous last-budget requests, spoofed client counters, repeated idempotency keys, week rollover, provider timeouts, store failures, and prompt injection.
4. Add a brief disclosure of model processing and retention to the chat and privacy page. Keep question text out of analytics and ordinary access logs. Specify retention for operational metadata.
5. Verify accessible streaming, cancellation, error recovery, source links, and budget-exhaustion states. Only then remove the preview label.
