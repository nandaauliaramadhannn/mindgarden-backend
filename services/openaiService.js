const { OpenAI } = require('openai');
const db = require('../models');

const getActiveKey = async () => {
  const key = await db.OpenAiKey.findOne({ where: { is_active: true } });
  if (!key) throw new Error('No active OpenAI key found');
  return key;
};

const generateText = async (prompt) => {
  const key = await getActiveKey();

  const openai = new OpenAI({
    apiKey: key.key_secret
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: prompt }
    ]
  });

  return completion.choices[0].message.content;
};

module.exports = { generateText };
