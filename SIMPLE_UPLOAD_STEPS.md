# 📤 SIMPLE UPLOAD STEPS - FROM YOUR SSH SESSION

You're already connected to the server. Let's use a different approach to get the file there.

---

## ✅ OPTION 1: Use Base64 Encoding (WORKS OVER SSH)

Since you're already in the SSH session, we can encode the file and paste it.

### On Your Mac Terminal (NEW WINDOW):

1. Open a NEW Terminal window (keep your SSH session open)
2. Run this command to encode the file:

```bash
base64 "/Users/blessedwilliams/MWENDO MOJA WELFARE/frontend-dist.zip" | pbcopy
```

This copies the encoded file to your clipboard.

---

## ✅ OPTION 2: Create File on Server (EASIEST)

Since the files are already partially there, let's check what we have:

In your SSH session, run:

```bash
ls -la client/dist/
```

If the `client/dist/` folder has files, we can deploy directly without the ZIP!

---

## ✅ OPTION 3: Use cPanel File Manager

Go back to cPanel File Manager and upload the file there:

1. https://mwendomojawelfare.co.ke:2083
2. Login: Williamsotie / 0nXk5{H{$TC}
3. File Manager → public_html
4. Upload button → Select frontend-dist.zip
5. Wait for upload

Then run deployment command in SSH.

---

## 🔍 FIRST: Check What's Already There

In your SSH session, run:

```bash
ls -la client/dist/ 2>/dev/null || echo "client/dist/ does not exist"
```

Let me know what you see!

---

**Status**: Troubleshooting Upload
**Date**: March 6, 2026

