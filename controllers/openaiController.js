const openaiService = require('../services/openaiService');

const testPrompt = async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await openaiService.generateText(prompt);
    res.json({ response: result });
  } catch (err) {
    res.status(500).json({ message: 'OpenAI Error', error: err.message });
  }
};

module.exports = { testPrompt };
