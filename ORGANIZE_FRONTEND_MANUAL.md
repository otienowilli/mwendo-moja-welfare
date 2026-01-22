# Organize Frontend Files - Manual Steps

## 📋 What You Need to Do

The frontend files are currently in a `dist/` folder, but they need to be in the `public_html/` root.

---

## ✅ Option 1: Use the PHP Script (Easiest)

### Step 1: Upload PHP Script

1. Go to cPanel File Manager: `https://mwendomojawelfare.co.ke:2083`
2. Log in with:
   - Username: `Williamsotie`
   - Password: `0nXk5{H{$TC`
3. Navigate to **public_html**
4. Click **Upload**
5. Select: `organize-frontend.php` from your computer
6. Wait for upload to complete

### Step 2: Run the Script

1. In your browser, go to: `https://mwendomojawelfare.co.ke/organize-frontend.php`
2. Wait for it to complete
3. You should see:
   ```
   ✅ Organization Complete!
   ```

### Step 3: Delete the Script

1. Go back to cPanel File Manager
2. Find `organize-frontend.php` in public_html
3. Right-click → **Delete**

### Step 4: Test

1. Go to: `https://mwendomojawelfare.co.ke`
2. You should see the login page

---

## ✅ Option 2: Manual Steps (If PHP Script Doesn't Work)

### Step 1: Open File Manager

1. Go to cPanel: `https://mwendomojawelfare.co.ke:2083`
2. Click **File Manager**
3. Navigate to **public_html**

### Step 2: Open dist/ Folder

1. Double-click the `dist/` folder
2. You should see:
   - `index.html`
   - `vite.svg`
   - `assets/` folder

### Step 3: Select All Files

1. Press **Ctrl+A** (or **Cmd+A** on Mac)
2. All files should be highlighted

### Step 4: Cut Files

1. Right-click on selected files
2. Click **Cut**

### Step 5: Go Back to public_html

1. Click the **Back** button or **public_html** in breadcrumb
2. You should be back in public_html root

### Step 6: Paste Files

1. Right-click in empty space
2. Click **Paste**
3. Wait for paste to complete

### Step 7: Delete dist/ Folder

1. Find the empty `dist/` folder
2. Right-click → **Delete**

### Step 8: Delete Zip File

1. Find `mwendo-frontend.zip`
2. Right-click → **Delete**

### Step 9: Verify Structure

Your public_html should now contain:
```
✓ index.html
✓ vite.svg
✓ assets/ (folder)
  ✓ index-Bae-AoHF.css
  ✓ index-C7XE-BH8.js
```

---

## 🧪 Test

1. Open browser
2. Go to: `https://mwendomojawelfare.co.ke`
3. You should see the login page

---

## 🆘 Troubleshooting

### Still seeing blank page
- Press F12 to open browser console
- Look for errors
- Check that index.html is in public_html root

### Files still in dist/ folder
- Make sure you moved them, not copied
- Delete dist/ folder after moving

### Cannot access the site
- Wait 5 minutes for DNS to propagate
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private window

---

## 📁 File Locations

**Local machine:**
- `organize-frontend.php` is in: `/Users/blessedwilliams/MWENDO MOJA WELFARE/`

**On server (after organization):**
- `public_html/index.html`
- `public_html/vite.svg`
- `public_html/assets/index-Bae-AoHF.css`
- `public_html/assets/index-C7XE-BH8.js`

---

## ✅ Success Indicators

✅ yourdomain.com loads
✅ Login page displays
✅ No 404 errors
✅ No console errors (F12)

Your frontend is now live! 🎉

