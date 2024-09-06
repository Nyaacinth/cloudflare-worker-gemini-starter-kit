import { GoogleGenerativeAI } from '@google/generative-ai';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const genAI = new GoogleGenerativeAI(env.GOOGLE_GEMINI_API_KEY);

		try {
			const model = genAI.getGenerativeModel(
				{ model: 'models/gemini-1.5-flash' },
				{
					baseUrl: `https://gateway.ai.cloudflare.com/v1/${env.CLOUDFLARE_ACCOUNT_ID}/${env.CLOUDFLARE_AI_GATEWAY_NAME}/google-ai-studio`,
				}
			);
			const prompt = 'Who are you?';
			const result = await model.generateContent(prompt);
			return Response.json({ success: true, response: result.response.text() }, { status: 200 });
		} catch (error) {
			console.error(error);
			return Response.json({ success: false, error: error, response: null }, { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;