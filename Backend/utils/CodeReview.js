import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const codeReview = async (code, input) => {
 console.log(code)
};

export default codeReview;