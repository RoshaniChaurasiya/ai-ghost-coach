import { getJsonModel, getTextModel } from './client';
import { buildAnalysisPrompt, buildChatSystemPrompt } from './prompts';

function safeParseJSON(text) {
    try {
        // Strip out accidental Markdown code wrappers if the LLM slips up
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanText);
    } catch (err) {
        console.warn('AI returned malformed JSON syntax. Initiating regex guardrail fallback check...', err);
        
        const lowerText = text.toLowerCase();
        // Fallback Interceptor: If the text indicates an image sport mismatch, build a safe recovery schema object
        if (lowerText.includes('not') || lowerText.includes('mismatch') || lowerText.includes('different sport') || lowerText.includes('depicts')) {
            return {
                overallScore: 1,
                strengths: ["Image verification exception caught."],
                areasToImprove: ["The uploaded visual stance asset does not match your active player profile settings."],
                priorityFix: "Please submit a technical photo that corresponds directly to your selected sport discipline.",
                drillSuggestion: "Biomechanical training suggestions are withheld until a valid profile asset is uploaded.",
                confidenceLevel: "Low"
            };
        }

        // Standard crash-handler if it's an unrelated, fatal structural glitch
        console.error('AI returned un-parseable JSON string:', text);
        throw new Error('Invalid AI response format. Please try again.');
    }
}

function cleanBase64(base64Image) {
    if (!base64Image) return '';
    if (base64Image.includes(',')) {
        return base64Image.split(',')[1];
    }
    return base64Image;
}

export async function analyzeTechnique(base64Image, mimeType, profile) {
    const model = getJsonModel();
    const prompt = buildAnalysisPrompt(profile);

    const result = await model.generateContent({
        contents: [
            {
                role: 'user',
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            data: cleanBase64(base64Image),
                            mimeType,
                        },
                    },
                ],
            },
        ],
    });

    const text = result.response.text();
    return safeParseJSON(text);
}

export async function askCoachFollowUp(sessionFeedback, question, profile) {
    const model = getTextModel();
    
    const systemInstruction = buildChatSystemPrompt(profile, sessionFeedback);

    const result = await model.generateContent({
        contents: [
            {
                role: 'user',
                parts: [
                    { text: `${systemInstruction}\n\nUser Question: ${question}` }
                ]
            }
        ]
    });
    
    return result.response.text();
}