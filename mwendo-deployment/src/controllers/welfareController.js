const WelfareIncident = require('../models/WelfareIncident');
const Beneficiary = require('../models/Beneficiary');
const Member = require('../models/Member');

const reportIncident = async (req, res) => {
  try {
    const {
      member_id,
      incident_type,
      incident_date,
      description,
    } = req.body;

    // Validate required fields
    if (!member_id || !incident_type || !description) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Check member exists
    const member = await Member.findByPk(member_id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const incident = await WelfareIncident.create({
      member_id,
      incident_type,
      incident_date: incident_date || new Date(),
      description,
      status: 'reported',
      reported_by: req.user.id,
    });

    res.status(201).json({
      message: 'Incident reported successfully',
      incident,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount_approved } = req.body;

    const incident = await WelfareIncident.findByPk(id);
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    await incident.update({
      status: 'approved',
      amount_approved,
      approved_by: req.user.id,
      approval_date: new Date(),
    });

    res.json({
      message: 'Incident approved successfully',
      incident,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const processPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount_paid } = req.body;

    const incident = await WelfareIncident.findByPk(id);
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    if (incident.status !== 'approved') {
      return res.status(400).json({ error: 'Incident must be approved before payment' });
    }

    await incident.update({
      status: 'paid',
      amount_paid,
      payment_date: new Date(),
    });

    res.json({
      message: 'Payment processed successfully',
      incident,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMemberIncidents = async (req, res) => {
  try {
    const { member_id } = req.params;
    const { status } = req.query;

    const where = { member_id };
    if (status) where.status = status;

    const incidents = await WelfareIncident.findAll({
      where,
      order: [['incident_date', 'DESC']],
    });

    res.json({
      count: incidents.length,
      incidents,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBeneficiary = async (req, res) => {
  try {
    const {
      member_id,
      beneficiary_name,
      relationship,
      phone_number,
      national_id,
      percentage,
    } = req.body;

    if (!member_id || !beneficiary_name || !relationship || !percentage) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const member = await Member.findByPk(member_id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const beneficiary = await Beneficiary.create({
      member_id,
      beneficiary_name,
      relationship,
      phone_number,
      national_id,
      percentage,
      status: 'active',
      added_by: req.user.id,
    });

    res.status(201).json({
      message: 'Beneficiary added successfully',
      beneficiary,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMemberBeneficiaries = async (req, res) => {
  try {
    const { member_id } = req.params;

    const beneficiaries = await Beneficiary.findAll({
      where: { member_id, status: 'active' },
    });

    res.json({
      count: beneficiaries.length,
      beneficiaries,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  reportIncident,
  approveIncident,
  processPayment,
  getMemberIncidents,
  addBeneficiary,
  getMemberBeneficiaries,
};

