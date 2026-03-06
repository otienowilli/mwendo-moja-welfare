# 🚀 QUICK TEST GUIDE - Contributions Page

## 🎯 What to Test

You now have a **Contributions Page** where you can:
1. **Enter member contributions** with 15 different vote heads
2. **View contributions** in a professional table format
3. **Edit and delete** contributions
4. **Print reports** with all data

---

## 📱 How to Use

### Step 1: Open the Page
```
http://localhost:3000/contributions
```

### Step 2: Add a Contribution
1. Click **"+ Add Contribution"** button
2. A form appears with these fields:
   - Member (dropdown)
   - REGISTRATION FEES
   - ENTRY FEE
   - MEMBERSHIP CARD
   - SHARES
   - SAVINGS
   - ADMIN COST
   - SEED FUND
   - FINES/PENALTIES
   - UNIFORM
   - MERRY-GO
   - ANNIVERSARY
   - SINDIKIZA
   - MEALS
   - PAMBA JIKONI

### Step 3: Fill in the Form
1. Select a member from dropdown
2. Enter amounts for each field (numbers only)
3. Click **"Add Contribution"**

### Step 4: View the Table
The table shows:
- **S/NO** - Row number
- **NAME** - Member name
- **Vote Head Columns** - All 14 contribution types
- **TOTAL** - Automatically calculated sum
- **Edit/Delete** - Buttons to modify or remove

### Step 5: Edit a Contribution
1. Click **"Edit"** button on any row
2. Form populates with current values
3. Change any amounts
4. Click **"Update Contribution"**

### Step 6: Delete a Contribution
1. Click **"Delete"** button on any row
2. Contribution is removed

### Step 7: Print Report
1. Click **"🖨️ Print Report"** button
2. Browser print dialog opens
3. Save as PDF or print to paper

---

## ✅ Verification Checklist

When testing, verify:

- [ ] Form appears when clicking "+ Add Contribution"
- [ ] All 15 fields are visible with correct labels
- [ ] Member dropdown is populated
- [ ] Can enter numbers in all fields
- [ ] "Add Contribution" button saves data
- [ ] Table displays the new contribution
- [ ] S/NO shows correct serial number
- [ ] NAME shows correct member name
- [ ] All vote head columns show entered amounts
- [ ] TOTAL column shows correct sum
- [ ] Edit button opens form with current values
- [ ] Update button saves changes
- [ ] Delete button removes contribution
- [ ] Column totals at bottom are correct
- [ ] Print button opens print dialog

---

## 🧮 Test Data Example

Try adding this contribution:
- **Member**: Select any member
- **REGISTRATION FEES**: 100
- **ENTRY FEE**: 200
- **MEMBERSHIP CARD**: 150
- **SHARES**: 50
- **SAVINGS**: 75
- **ADMIN COST**: 100
- **SEED FUND**: 50
- **FINES/PENALTIES**: 25
- **UNIFORM**: 100
- **MERRY-GO**: 50
- **ANNIVERSARY**: 75
- **SINDIKIZA**: 100
- **MEALS**: 50
- **PAMBA JIKONI**: 25

**Expected Total**: 1225

---

## 🔍 Troubleshooting

### Form doesn't appear
- Refresh the page (Ctrl+R or Cmd+R)
- Check browser console (F12) for errors
- Verify backend is running: `curl http://localhost:8000/api/health`

### Data doesn't save
- Check browser console for error messages
- Verify all required fields are filled
- Check backend logs: `tail -50 /tmp/backend.log`

### Table is empty
- Add a contribution first
- Refresh the page
- Check if member exists in Members page

### Numbers not calculating
- Ensure you entered valid numbers
- Check if TOTAL column shows the sum
- Refresh page if needed

---

## 📊 What's Stored in Database

Each contribution record contains:
- Member ID
- House Number
- 14 vote head amounts (REG, ENTRY, CARD, SHAR, SAVI, ADMN, S/FUND, FINE, UNIF, MERR, ANNIV, SINDI, MEAL, JIKON)
- Total (auto-calculated)
- Date recorded
- User who recorded it
- Optional notes

---

## 🎉 You're Ready!

Open http://localhost:3000/contributions and start testing!

**Questions?** Check the browser console (F12) for error messages.

