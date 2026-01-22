# Upload Frontend to cPanel - Step by Step

## ✅ Frontend Build Complete!

**File Ready:** `client/mwendo-frontend.zip` (193 KB)

---

## 📋 Upload Instructions

### Step 1: Log in to cPanel

1. Go to: `https://yourdomain.com:2083` or `https://your-server-ip:2083`
2. Enter your cPanel username and password
3. Click "Log in"

---

### Step 2: Open File Manager

1. In cPanel dashboard, find **File Manager**
2. Click on it
3. Select **public_html** folder
4. Click "Go"

---

### Step 3: Upload the Zip File

**Option A: Drag & Drop**
1. In File Manager, you should see the public_html folder
2. Drag `mwendo-frontend.zip` from your computer into the File Manager window
3. Wait for upload to complete

**Option B: Upload Button**
1. Click the **Upload** button in File Manager
2. Click **Select File**
3. Choose `client/mwendo-frontend.zip` from your computer
4. Click **Open**
5. Wait for upload to complete

---

### Step 4: Extract the Zip File

1. In File Manager, find `mwendo-frontend.zip`
2. Right-click on it
3. Select **Extract**
4. Click **Extract File(s)**
5. Wait for extraction to complete

---

### Step 5: Move Files to public_html Root

After extraction, you'll have:
```
public_html/
  dist/
    index.html
    vite.svg
    assets/
      index-Bae-AoHF.css
      index-C7XE-BH8.js
  mwendo-frontend.zip
```

**But you need:**
```
public_html/
  index.html
  vite.svg
  assets/
    index-Bae-AoHF.css
    index-C7XE-BH8.js
```

**To fix this:**

1. Open the `dist` folder
2. Select all files inside (Ctrl+A or Cmd+A)
3. Cut them (Ctrl+X or Cmd+X)
4. Go back to public_html
5. Paste them (Ctrl+V or Cmd+V)
6. Delete the empty `dist` folder
7. Delete the `mwendo-frontend.zip` file

---

### Step 6: Verify Structure

Your public_html should now contain:
```
✓ index.html
✓ vite.svg
✓ assets/ (folder)
  ✓ index-Bae-AoHF.css
  ✓ index-C7XE-BH8.js
```

---

### Step 7: Test in Browser

1. Open your browser
2. Go to: `https://yourdomain.com`
3. You should see the login page

---

## 🆘 Troubleshooting

### Files in dist/ folder instead of public_html/

**Fix:**
1. Open dist folder
2. Select all files
3. Cut (Ctrl+X)
4. Go back to public_html
5. Paste (Ctrl+V)
6. Delete dist folder

### Still seeing blank page

1. Check browser console (F12)
2. Look for errors
3. Verify files are in public_html root
4. Check that index.html is there

### Cannot extract zip

1. Try uploading again
2. Or use terminal: `unzip mwendo-frontend.zip`

---

## ✅ Success Indicators

✅ index.html in public_html root
✅ assets/ folder in public_html root
✅ yourdomain.com shows login page
✅ No 404 errors in browser console

Your frontend is now live! 🎉

