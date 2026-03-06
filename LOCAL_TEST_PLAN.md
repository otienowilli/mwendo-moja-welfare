# 🧪 LOCAL SERVER TEST PLAN - Contributions Page

## ✅ Test Environment

- **Backend**: http://localhost:8000 (Node.js/Express)
- **Frontend**: http://localhost:3000 (Static files)
- **Database**: SQLite (local)
- **Status**: Both servers running

---

## 📋 Test Cases

### Test 1: Form Display
**Objective**: Verify the contribution form displays with all required fields

**Steps**:
1. Navigate to http://localhost:3000/contributions
2. Click "+ Add Contribution" button
3. Verify form appears with:
   - Member dropdown selector
   - REGISTRATION FEES input
   - ENTRY FEE input
   - MEMBERSHIP CARD input
   - SHARES input
   - SAVINGS input
   - ADMIN COST input
   - SEED FUND input
   - FINES/PENALTIES input
   - UNIFORM input
   - MERRY-GO input
   - ANNIVERSARY input
   - SINDIKIZA input
   - MEALS input
   - PAMBA JIKONI input

**Expected Result**: ✅ All 15 fields visible with correct labels

---

### Test 2: Add Contribution
**Objective**: Add a new contribution for a member

**Steps**:
1. Click "+ Add Contribution"
2. Select a member from dropdown
3. Enter amounts for each field (e.g., 100, 200, 150, etc.)
4. Click "Add Contribution" button
5. Verify form closes and table updates

**Expected Result**: ✅ Contribution saved and displayed in table

---

### Test 3: Table Display
**Objective**: Verify table shows contributions correctly

**Expected Columns**:
- S/NO (serial number)
- NAME (member name)
- REG, ENTRY, CARD, SHAR, SAVI, ADMN, S/FUND, FINE, UNIF, MERR, ANNIV, SINDI, MEAL, JIKON
- TOTAL (auto-calculated)

**Expected Result**: ✅ All columns visible with correct data

---

### Test 4: Automatic Total Calculation
**Objective**: Verify total is calculated correctly

**Steps**:
1. Add contribution with amounts: 100 + 200 + 150 + 50 + 75 + 100 + 50 + 25 + 100 + 50 + 75 + 100 + 50 + 25
2. Check TOTAL column
3. Verify sum = 1225

**Expected Result**: ✅ Total correctly calculated

---

### Test 5: Edit Contribution
**Objective**: Edit an existing contribution

**Steps**:
1. Click "Edit" button on any row
2. Form populates with current values
3. Change one amount
4. Click "Update Contribution"
5. Verify table updates

**Expected Result**: ✅ Contribution updated successfully

---

### Test 6: Delete Contribution
**Objective**: Delete a contribution

**Steps**:
1. Click "Delete" button on any row
2. Verify contribution removed from table

**Expected Result**: ✅ Contribution deleted successfully

---

### Test 7: Column Totals
**Objective**: Verify column totals are calculated

**Steps**:
1. Add multiple contributions
2. Check bottom row "TOTALS"
3. Verify each column shows sum of all values

**Expected Result**: ✅ Column totals correct

---

### Test 8: Print Report
**Objective**: Verify print functionality

**Steps**:
1. Click "🖨️ Print Report"
2. Browser print dialog opens
3. Preview shows formatted report

**Expected Result**: ✅ Print dialog opens with proper formatting

---

## 🔍 Verification Checklist

- [ ] Form displays with all 15 fields
- [ ] Member dropdown populated
- [ ] Can add new contribution
- [ ] Table displays correctly
- [ ] Totals calculated automatically
- [ ] Can edit contribution
- [ ] Can delete contribution
- [ ] Column totals show correctly
- [ ] Print functionality works
- [ ] No console errors
- [ ] No API errors

---

## 📊 Test Data

Use these test values:
- Member: Select any member
- REG: 100
- ENTRY: 200
- CARD: 150
- SHAR: 50
- SAVI: 75
- ADMN: 100
- S/FUND: 50
- FINE: 25
- UNIF: 100
- MERR: 50
- ANNIV: 75
- SINDI: 100
- MEAL: 50
- JIKON: 25

**Expected Total**: 1225

---

## 🚀 Ready to Test!

Open browser: http://localhost:3000/contributions

Login and test the contribution form!

