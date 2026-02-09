# n8n + Supabase chat memory setup

This guide explains how to add Supabase-backed conversation memory to your n8n chatbot workflow. The website frontend already sends `session_id`, `messages`, and `history` on every request; no frontend changes are required for Supabase to work.

## When to use Supabase memory

- **Frontend-only (current):** n8n receives `messages`/`history` in the webhook body. Use that in your LLM node for context. No database needed; memory = last 20 messages in this browser.
- **Supabase:** Use when you want server-side or cross-device memory (same conversation from another browser/device), longer history, or a single source of truth in the cloud.

You can keep the frontend as-is and add Supabase only in n8n.

---

## 1. Supabase

1. Create a Supabase project and get the **Project URL** and **anon** (or **service_role**) key from Project Settings → API.
2. In the SQL editor, create a table for chat turns:

```sql
create table if not exists chat_memory (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_memory_session_id on chat_memory (session_id, created_at);
```

---

## 2. n8n workflow

In the workflow that is triggered by your chatbot webhook:

### Read history

- After the **Webhook** node, add a **Supabase** node (or **HTTP Request** to Supabase REST API).
- **Operation:** Get many / Select.
- **Table:** `chat_memory`.
- **Filter:** `session_id` equals `{{ $json.body.session_id }}` (or `{{ $json.body.sessionId }}`).
- **Sort:** `created_at` ascending.
- **Limit:** e.g. 20 (or 50 for longer context).

Use this result as the “history from DB” when building the messages array for the LLM.

### LLM context

- Build the messages array for your LLM node from the Supabase rows: map each row to `{ role: row.role, content: row.content }`, then append the new user message from the webhook (`{{ $json.body.message }}`).
- **Option A – Supabase only:** Use only the history from Supabase + current message; ignore `body.messages` / `body.history`.
- **Option B – Request body only:** Keep using `body.messages` or `body.history` from the webhook (no Supabase). Simplest.
- **Option C – Hybrid:** Use Supabase for older turns, then append the latest from `body.messages` (or just the current `body.message`) so the LLM sees the full thread.

### Write new turn

- After the LLM node returns the assistant reply:
  1. Insert one row: `session_id` = webhook `session_id`, `role` = `user`, `content` = webhook `message`.
  2. Insert second row: same `session_id`, `role` = `assistant`, `content` = LLM response.

Use two Supabase “Insert” nodes or one node with a loop, depending on your n8n version.

---

## 3. n8n Supabase credentials

In n8n: Credentials → Add → Supabase. Enter the Supabase **Host** (e.g. `https://xxxx.supabase.co`), **Service Role** or **anon** key. Use service role if you need to bypass RLS.

---

## Summary

| Step    | Where   | Action |
|---------|---------|--------|
| Table   | Supabase | `chat_memory` with `session_id`, `role`, `content`, `created_at` |
| Read    | n8n     | Query `chat_memory` by `session_id`, order by `created_at`, limit 20 |
| LLM     | n8n     | Build messages from DB history + current `message` (and optionally `body.messages`) |
| Write   | n8n     | Insert user message and assistant reply into `chat_memory` |
| Frontend| Website | No changes; already sends `session_id`, `messages`, `history` |
