# 🔍 CHECK SERVER FILES

## In your cPanel Terminal, run:

```bash
ls -lh ~/public_html/*.zip
```

This will show all ZIP files on the server.

---

## If you see `mwendo-deployment.zip` or `mwendo-frontend-new.zip`:

We can use one of those instead! Run:

```bash
cd ~/public_html && \
unzip -o mwendo-deployment.zip && \
cp -r client/dist/* . && \
rm -rf client && \
rm -f mwendo-deployment.zip && \
ls -la index.html assets/ vite.svg && \
curl http://localhost:8000/api/health
```

---

## If NO ZIP files exist:

We need to upload `frontend-dist.zip` from your Mac.

Use this command in cPanel Terminal to create a simple upload:

```bash
cd ~/public_html && \
wget https://example.com/frontend-dist.zip
```

But we need the file URL first.

---

## ALTERNATIVE: Build Frontend on Server

If the source code is there, we can build it:

```bash
cd ~/public_html && \
npm run build
```

---

**Run the first command and tell me what ZIP files exist on the server!**

