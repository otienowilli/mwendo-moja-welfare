const HouseContributions = require('../models/HouseContributions');
const Member = require('../models/Member');

// Get all house contributions
const getHouseContributions = async (req, res) => {
  try {
    const contributions = await HouseContributions.findAll({
      include: [{ model: Member, attributes: ['id', 'full_name', 'membership_card_number'] }],
      order: [['house_number', 'ASC'], ['member_id', 'ASC']],
    });
    res.json({ success: true, data: contributions });
  } catch (error) {
    console.error('Error fetching house contributions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contributions' });
  }
};

// Get contributions by house number
const getContributionsByHouse = async (req, res) => {
  try {
    const { houseNumber } = req.params;
    const contributions = await HouseContributions.findAll({
      where: { house_number: houseNumber },
      include: [{ model: Member, attributes: ['id', 'full_name', 'membership_card_number'] }],
      order: [['member_id', 'ASC']],
    });
    res.json({ success: true, data: contributions });
  } catch (error) {
    console.error('Error fetching house contributions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contributions' });
  }
};

// Create or update house contribution
const saveHouseContribution = async (req, res) => {
  try {
    const { member_id, house_number, reg, entry, card, shar, savi, admn, s_fund, fine, unif, merr, anniv, sindi, meal, jikon, notes } = req.body;

    // Calculate total
    const total = parseFloat(reg || 0) + parseFloat(entry || 0) + parseFloat(card || 0) + 
                  parseFloat(shar || 0) + parseFloat(savi || 0) + parseFloat(admn || 0) + 
                  parseFloat(s_fund || 0) + parseFloat(fine || 0) + parseFloat(unif || 0) + 
                  parseFloat(merr || 0) + parseFloat(anniv || 0) + parseFloat(sindi || 0) + 
                  parseFloat(meal || 0) + parseFloat(jikon || 0);

    // Check if record exists
    let contribution = await HouseContributions.findOne({
      where: { member_id, house_number },
    });

    if (contribution) {
      // Update existing
      await contribution.update({
        reg: reg || 0,
        entry: entry || 0,
        card: card || 0,
        shar: shar || 0,
        savi: savi || 0,
        admn: admn || 0,
        s_fund: s_fund || 0,
        fine: fine || 0,
        unif: unif || 0,
        merr: merr || 0,
        anniv: anniv || 0,
        sindi: sindi || 0,
        meal: meal || 0,
        jikon: jikon || 0,
        total,
        notes,
        recorded_by: req.user?.id,
      });
    } else {
      // Create new
      contribution = await HouseContributions.create({
        member_id,
        house_number,
        reg: reg || 0,
        entry: entry || 0,
        card: card || 0,
        shar: shar || 0,
        savi: savi || 0,
        admn: admn || 0,
        s_fund: s_fund || 0,
        fine: fine || 0,
        unif: unif || 0,
        merr: merr || 0,
        anniv: anniv || 0,
        sindi: sindi || 0,
        meal: meal || 0,
        jikon: jikon || 0,
        total,
        notes,
        recorded_by: req.user?.id,
      });
    }

    res.json({ success: true, data: contribution, message: 'Contribution saved successfully' });
  } catch (error) {
    console.error('Error saving house contribution:', error);
    res.status(500).json({ success: false, message: 'Failed to save contribution' });
  }
};

// Delete house contribution
const deleteHouseContribution = async (req, res) => {
  try {
    const { id } = req.params;
    await HouseContributions.destroy({ where: { id } });
    res.json({ success: true, message: 'Contribution deleted successfully' });
  } catch (error) {
    console.error('Error deleting house contribution:', error);
    res.status(500).json({ success: false, message: 'Failed to delete contribution' });
  }
};

module.exports = {
  getHouseContributions,
  getContributionsByHouse,
  saveHouseContribution,
  deleteHouseContribution,
};

