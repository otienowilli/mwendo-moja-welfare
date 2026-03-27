const Member = require('../models/Member');
const MemberSharesSavings = require('../models/MemberSharesSavings');

const createMember = async (req, res) => {
  try {
    const {
      membership_card_number,
      national_id,
      first_name,
      middle_name,
      last_name,
      email,
      designation,
      sex,
      date_of_birth,
      phone_number,
      residence,
      role_in_group,
    } = req.body;

    // Validate required fields
    if (!membership_card_number || !national_id || !first_name || !last_name) {
      return res.status(400).json({ error: 'Membership card number, national ID, first name, and last name are required' });
    }

    // Check for duplicates
    const existingMember = await Member.findOne({
      where: { membership_card_number },
    });

    if (existingMember) {
      return res.status(400).json({ error: 'Membership card number already exists' });
    }

    // Check if email already exists (if provided)
    if (email) {
      const existingEmail = await Member.findOne({
        where: { email },
      });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    // Build full_name from first, middle, and last names
    const full_name = middle_name
      ? `${first_name} ${middle_name} ${last_name}`
      : `${first_name} ${last_name}`;

    const member = await Member.create({
      membership_card_number,
      national_id,
      first_name,
      middle_name: middle_name || null,
      last_name,
      email: email || null,
      designation: designation || null,
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

    // Ensure full_name is included in response
    const memberJson = member.toJSON ? member.toJSON() : member;

    res.status(201).json({
      message: 'Member created successfully',
      member: {
        ...memberJson,
        full_name: memberJson.full_name || full_name
      },
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

    // Explicitly map members to ensure full_name is always included
    const mappedMembers = members.map(member => {
      const memberJson = member.toJSON ? member.toJSON() : member;

      // Ensure full_name is always present, fallback to constructed name
      const full_name = memberJson.full_name ||
        `${memberJson.first_name || ''} ${memberJson.middle_name ? memberJson.middle_name + ' ' : ''}${memberJson.last_name || ''}`.trim();

      return {
        ...memberJson,
        full_name: full_name || 'Unknown'
      };
    });

    res.json({
      members: mappedMembers,  // Return as 'members' to match frontend expectations
      data: mappedMembers,     // Also include 'data' for backward compatibility
      count: mappedMembers.length,
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

    // Ensure full_name is always included
    const memberJson = member.toJSON ? member.toJSON() : member;
    const full_name = memberJson.full_name ||
      `${memberJson.first_name || ''} ${memberJson.middle_name ? memberJson.middle_name + ' ' : ''}${memberJson.last_name || ''}`.trim();

    res.json({
      ...memberJson,
      full_name: full_name || 'Unknown'
    });
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

    // Ensure full_name is always included in response
    const memberJson = member.toJSON ? member.toJSON() : member;
    const full_name = memberJson.full_name ||
      `${memberJson.first_name || ''} ${memberJson.middle_name ? memberJson.middle_name + ' ' : ''}${memberJson.last_name || ''}`.trim();

    res.json({
      message: 'Member updated successfully',
      member: {
        ...memberJson,
        full_name: full_name || 'Unknown'
      },
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

    // Ensure full_name is always included in response
    const memberJson = member.toJSON ? member.toJSON() : member;
    const full_name = memberJson.full_name ||
      `${memberJson.first_name || ''} ${memberJson.middle_name ? memberJson.middle_name + ' ' : ''}${memberJson.last_name || ''}`.trim();

    res.json({
      message: 'Member deactivated successfully',
      member: {
        ...memberJson,
        full_name: full_name || 'Unknown'
      },
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

