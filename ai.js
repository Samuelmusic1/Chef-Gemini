import OpenAI from "openai"

const SYSTEM_PROMPT = `
    You are an assistant who receives a list of ingredients that a user 
    has and suggests a recipe they could make with some or all of those ingredients. 
    You don't need to use every ingredient they mention in your recipe.
    Include a picture representation of what the dish will look like on every step.
    Include a link to where some of these ingredients can be obtained.
    The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
    Format your response in markdown to make it easier to render to a web page`
const openAI = new OpenAI({
    apiKey: import.meta.env.VITE_AI_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true
})

export async function getRecipeFromChefGemini(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    const response = await openAI.responses.create({
        model: "inclusionai/ling-2.6-flash:free",
        max_tokens: 1024,
        input: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe!` },
        ],
        tools: [{ type: "web_search_preview"}]
    });
    return response.output_text
}

