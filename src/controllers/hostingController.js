const HostingEvent = require('../models/HostingEvent');
const HostingContribution = require('../models/HostingContribution');
const Member = require('../models/Member');

const createHostingEvent = async (req, res) => {
  try {
    const {
      member_id,
      event_date,
      event_type,
      event_location,
      expected_guests,
      notes,
    } = req.body;

    // Validate required fields
    if (!member_id || !event_date || !event_type) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Check member exists
    const member = await Member.findByPk(member_id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const event = await HostingEvent.create({
      member_id,
      event_date,
      event_type,
      event_location,
      expected_guests,
      status: 'scheduled',
      total_collected: 0,
      notes,
      created_by: req.user.id,
    });

    res.status(201).json({
      message: 'Hosting event created successfully',
      event,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const recordHostingContribution = async (req, res) => {
  try {
    const {
      hosting_event_id,
      member_id,
      amount,
      payment_method,
      reference_number,
    } = req.body;

    // Validate required fields
    if (!hosting_event_id || !member_id || !amount) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Check event exists
    const event = await HostingEvent.findByPk(hosting_event_id);
    if (!event) {
      return res.status(404).json({ error: 'Hosting event not found' });
    }

    // Check member exists
    const member = await Member.findByPk(member_id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const contribution = await HostingContribution.create({
      hosting_event_id,
      member_id,
      amount,
      payment_method: payment_method || 'cash',
      reference_number,
      status: 'pending',
      recorded_by: req.user.id,
    });

    res.status(201).json({
      message: 'Hosting contribution recorded successfully',
      contribution,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmHostingContribution = async (req, res) => {
  try {
    const { id } = req.params;

    const contribution = await HostingContribution.findByPk(id);
    if (!contribution) {
      return res.status(404).json({ error: 'Contribution not found' });
    }

    await contribution.update({ status: 'confirmed' });

    // Update event total
    const event = await HostingEvent.findByPk(contribution.hosting_event_id);
    await event.increment('total_collected', { by: contribution.amount });

    res.json({
      message: 'Hosting contribution confirmed successfully',
      contribution,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHostingEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await HostingEvent.findByPk(id, {
      include: [{ model: Member, attributes: ['full_name', 'membership_card_number'] }],
    });

    if (!event) {
      return res.status(404).json({ error: 'Hosting event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEventContributions = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { status } = req.query;

    const where = { hosting_event_id: event_id };
    if (status) where.status = status;

    const contributions = await HostingContribution.findAll({
      where,
      include: [{ model: Member, attributes: ['full_name', 'membership_card_number'] }],
    });

    const total = contributions.reduce((sum, c) => sum + parseFloat(c.amount), 0);

    res.json({
      count: contributions.length,
      total,
      contributions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const completeHostingEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await HostingEvent.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Hosting event not found' });
    }

    await event.update({ status: 'completed' });

    res.json({
      message: 'Hosting event marked as completed',
      event,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createHostingEvent,
  recordHostingContribution,
  confirmHostingContribution,
  getHostingEvent,
  getEventContributions,
  completeHostingEvent,
};

