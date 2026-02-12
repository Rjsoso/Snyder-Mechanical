# Chatbot: Supabase conversations by session ID

This doc describes how to store each chatbot thread as its own conversation in Supabase, keyed by the `sessionId` the website sends to n8n.

## Vercel env (copyable)

In Vercel → Project → Settings → Environment Variables, add:

**Name** (copy the line below):

```
N8N_CHATBOT_WEBHOOK
```

**Value** (copy the line below; use your production webhook URL, not `webhook-test`):

```
https://n8n.srv1328675.hstgr.cloud/webhook/729c8053-809b-487f-b8ef-9d7f9e8e6452
```

## 1. Supabase schema

Run the SQL migration in your Supabase project:

1. Open [Supabase Dashboard](https://app.supabase.com) → your project → **SQL Editor**.
2. Paste the contents of [chatbot-supabase-schema.sql](chatbot-supabase-schema.sql).
3. Run the query.

This creates:

- **`conversations`** – one row per chat thread: `id` (uuid), `session_id` (unique, same as frontend `sessionId`), `created_at`, `updated_at`.
- **`messages`** – one row per message: `id`, `conversation_id` (FK to `conversations.id`), `role` (`user` | `assistant`), `content`, `created_at`.

Relationship: one conversation per `session_id`; many messages per conversation.

## 2. n8n workflow: group by `sessionId`

In the n8n workflow that receives the chatbot webhook and writes to Supabase:

### Step 1 – Read `sessionId` from the webhook body

The payload from this site includes `sessionId` and `session_id` (same value). Use that as the unique key for the conversation.

### Step 2 – Ensure one conversation per session (upsert)

- **Option A (recommended):** Use the Supabase node “Insert or update” (upsert) on `conversations` with conflict on `session_id`. Set `session_id` and `updated_at` (e.g. `{{ $now.toISO() }}`). If a row with that `session_id` exists, it updates `updated_at`; otherwise it inserts a new row. Capture the returned `id` (or run a separate “Select” by `session_id` after upsert) to use as `conversation_id`.
- **Option B:** “Select from Supabase” where `session_id` = webhook `sessionId`. If no row, “Insert” a new conversation and use its `id`; if a row exists, use that `id` as `conversation_id`.

### Step 3 – Insert messages under that conversation

For each message to store (user message and AI reply):

- Insert into `messages` with:
  - `conversation_id` = the conversation’s `id` from step 2
  - `role` = `user` or `assistant`
  - `content` = message text

### Step 4 – When to write

- When you receive the user message: upsert/lookup the conversation, then insert the user message with that `conversation_id`.
- When you have the AI reply: insert the assistant message with the same `conversation_id`.

Result: every chat thread (same `sessionId` from the website) gets one row in `conversations` and many rows in `messages` with that `conversation_id`.

## 3. Website behavior

- The frontend ([ChatbotPlaceholder.jsx](../src/components/layout/ChatbotPlaceholder.jsx)) already sends `sessionId` (and `session_id`) on every request; [api/chatbot/chat.js](../api/chatbot/chat.js) forwards it to n8n unchanged.
- A “New conversation” button in the chat UI creates a new UUID, saves it as the current session, and resets the thread. The next request sends the new `sessionId`, so n8n will create a new `conversations` row and subsequent messages will attach to that conversation. No backend change is required.

## Summary

| Where      | Action |
|-----------|--------|
| **Supabase** | Run [chatbot-supabase-schema.sql](chatbot-supabase-schema.sql) to add `conversations` and `messages`. |
| **n8n**      | On each webhook: get `sessionId` → upsert/lookup `conversations` by `session_id` → insert user and assistant messages with that `conversation_id`. |
| **This repo** | Session is already sent; optional “New conversation” button starts a new thread (new `sessionId`). |
