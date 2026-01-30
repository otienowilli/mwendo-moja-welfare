const VoteHead = require('../models/VoteHead');

const createVoteHead = async (req, res) => {
  try {
    const { name, description, expected_amount, duration_months } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Vote head name is required' });
    }

    const voteHead = await VoteHead.create({
      name,
      description,
      expected_amount: expected_amount || 0,
      duration_months: duration_months || 12,
      is_active: true,
    });

    res.status(201).json({
      message: 'Vote head created successfully',
      voteHead,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllVoteHeads = async (req, res) => {
  try {
    const { active_only } = req.query;

    const where = {};
    if (active_only === 'true') {
      where.is_active = true;
    }

    const voteHeads = await VoteHead.findAll({
      where,
      order: [['name', 'ASC']],
    });

    res.json({
      count: voteHeads.length,
      voteHeads,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVoteHeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const voteHead = await VoteHead.findByPk(id);

    if (!voteHead) {
      return res.status(404).json({ error: 'Vote head not found' });
    }

    res.json(voteHead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVoteHead = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const voteHead = await VoteHead.findByPk(id);

    if (!voteHead) {
      return res.status(404).json({ error: 'Vote head not found' });
    }

    await voteHead.update(updates);

    res.json({
      message: 'Vote head updated successfully',
      voteHead,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deactivateVoteHead = async (req, res) => {
  try {
    const { id } = req.params;

    const voteHead = await VoteHead.findByPk(id);

    if (!voteHead) {
      return res.status(404).json({ error: 'Vote head not found' });
    }

    await voteHead.update({ is_active: false });

    res.json({
      message: 'Vote head deactivated successfully',
      voteHead,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVoteHead,
  getAllVoteHeads,
  getVoteHeadById,
  updateVoteHead,
  deactivateVoteHead,
};

