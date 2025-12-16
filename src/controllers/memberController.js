const Member = require('../models/Member');
const MemberSharesSavings = require('../models/MemberSharesSavings');

const createMember = async (req, res) => {
  try {
    const {
      membership_card_number,
      national_id,
      full_name,
      sex,
      date_of_birth,
      phone_number,
      residence,
      role_in_group,
    } = req.body;

    // Validate required fields
    if (!membership_card_number || !national_id || !full_name) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Check for duplicates
    const existingMember = await Member.findOne({
      where: { membership_card_number },
    });

    if (existingMember) {
      return res.status(400).json({ error: 'Membership card number already exists' });
    }

    const member = await Member.create({
      membership_card_number,
      national_id,
      full_name,
      sex,
      date_of_birth,
      phone_number,
      residence,
      role_in_group,
      status: 'active',
      joined_date: new Date(),
    });

    // Create member shares/savings record
    await MemberSharesSavings.create({
      member_id: member.id,
    });

    res.status(201).json({
      message: 'Member created successfully',
      member,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll({
      where: { status: 'active' },
    });

    res.json({
      count: members.length,
      members,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    await member.update(updates);

    res.json({
      message: 'Member updated successfully',
      member,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deactivateMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    await member.update({ status: 'inactive' });

    res.json({
      message: 'Member deactivated successfully',
      member,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deactivateMember,
};

