# Home Page & Hero Carousel (Deployed Setup)

The **Home Page** and **Hero Section** (including the hero background carousel) are edited in **deployed** Sanity Studio. The main website (Vercel) already has the carousel code and will show images once you add them in Studio.

## 1. Deploy Sanity Studio (one-time)

So the **deployed** Studio has the Home Page and Background Images fields, deploy from this folder:

```bash
cd snyder-mechanicalllc
npm install
npm run deploy
```

- When prompted, choose your existing hostname (e.g. **snyder-mechanical**) or create a new one.
- Log in to Sanity if asked.
- After deploy, your Studio is live at e.g. **https://snyder-mechanical.sanity.studio** (or the hostname you chose).

## 2. Use the deployed Studio

1. Open your **deployed** Studio URL (e.g. https://snyder-mechanical.sanity.studio).
2. In the sidebar, open **Pages** → **Home Page**.
3. Under **Hero Section**, use **Background Images** to add images (each with **Alt Text**).
4. Click **Publish**.

## 3. Deployed website (Vercel)

- The site at your Vercel URL already uses the carousel: when **Background Images** has images, they rotate every 5 seconds with a dark overlay.
- If **Background Images** is empty, the hero uses the blue gradient.
- No local run needed; everything is for the **deployed** website and **deployed** Studio.
