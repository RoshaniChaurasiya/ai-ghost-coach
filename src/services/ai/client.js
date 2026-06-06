import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_MODEL } from '../../utils/constants';

let client = null;
let jsonModel = null;
let textModel = null;

function getClient() {
  if (client) return client;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY in .env file');
  }

  client = new GoogleGenerativeAI(apiKey);
  return client;
}

export function getJsonModel() {
  if (jsonModel) return jsonModel;

  const genAI = getClient();

  jsonModel = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      responseMimeType: 'application/json',
    },
  });

  return jsonModel;
}

export function getTextModel() {
  if (textModel) return textModel;

  const genAI = getClient();

  textModel = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
  });

  return textModel;
}