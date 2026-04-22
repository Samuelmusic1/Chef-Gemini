import OpenAI from "openai"

const SYSTEM_PROMPT = `
    You are an assistant who receives a list of ingredients that a user 
    has and suggests a recipe they could make with some or all of those ingredients. 
    You don't need to use every ingredient they mention in your recipe.
    Include a picture representation of what the exact dish will look like on every step of preparation.
    
    IMAGE GENERATION RULES:
        Perspective: All generated images must use a top-down 'flat lay' or 45-degree 'over-the-shoulder' perspective to focus on the food prep area.
        Setting: Every image must feature the same background (e.g., a dark slate countertop or a light wooden butcher block).
        Subject Match: The image must strictly depict the specific action of the current step (e.g., if the text says 'dice onions', the image must show a knife and diced onions, not a whole onion).
        No People: Avoid showing faces; show only hands performing the action to keep the focus on the meal.
        Style: Use a 'Cinematic Food Photography' style with natural lighting. Never generate cartoons, 3D animations, or generic clipart.
        Size: All image size should fit into the page and be 50% smaller than the width of the response div
    
    Dont include a text describing the image.
    
    Include a link to where some of these ingredients can be obtained.
    
    The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
    Format your response in markdown to make it easier to render to a web page.
    
    After the recipe suggestion is concluded, do not respond with questions for futher inputs.
    
    Finish with a section with H2 heading titled "Wanna browse yourself?"
    with links to various cooking sites with relevant search queries and filters 
    already applied.`

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
        tools: [{ type: "web_search_preview"},
                { type: "image_generation" }
               ]
    });
    return response.output_text
}

