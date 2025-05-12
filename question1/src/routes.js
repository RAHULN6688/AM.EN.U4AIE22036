const express = require('express');
const logic = require('./logic');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!['p', 'f', 'e', 'r'].includes(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  try {
    const data = await logic.getNumbers(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;