import { marked } from "marked"

export default function GeminiRecipe({ recipe }) {
    const htmlContent = marked.parse(recipe || "")

    return (
        <section>
            <h2>Chef Gemini Recommendation:</h2>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </section>
    )
}