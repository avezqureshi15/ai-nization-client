import type { AIResponse } from "../../../app/chat/pages/chat.type";
import { cleanMarkdown, context } from "../util";

export const formattingResponse = {
  default: () =>
    ( {
            type: "stream",
            steps: [
              "Structuring job description...",
              "Applying professional formatting...",
              "Finalizing JD document..."
            ],
            final: [
              {
                type: "markdown",
                content: cleanMarkdown(`
    # 💼 Senior ${context.role}
    
    ## 🌟 Overview
    We are hiring a senior engineer to design and scale systems in a product-based environment.
    
    ---
    
    ## 🧩 Responsibilities
    - Build scalable systems
    - Lead architecture decisions
    - Work on distributed frontend/backend systems
    - Mentor engineers
    
    ---
    
    ## 🎯 Requirements
    - 6+ years experience
    - Strong system design skills
    - Production-level experience
    
    ---
    
    ## 🚀 Nice to Have
    - Microfrontend experience
    - Leadership experience
                `)
              }
            ]
          } satisfies AIResponse),
 
};