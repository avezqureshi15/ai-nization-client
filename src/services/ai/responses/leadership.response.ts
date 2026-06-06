import type { AIResponse } from "../../../app/chat/pages/chat.type";
import { cleanMarkdown, context } from "../util";

export const leaderShipResponse = {
  default: () =>
    ( {
            type: "stream",
            steps: [
              "Adding leadership responsibilities...",
              "Integrating microfrontend architecture...",
              "Enhancing ownership scope..."
            ],
            final: [
              {
                type: "markdown",
                content: cleanMarkdown(`
    ## 🏗️ Expanded Role: ${context.role}
    
    ### Leadership Responsibilities
    - Mentor engineers and lead reviews
    - Drive architecture decisions
    - Guide technical direction
    
    ### Architecture Ownership
    - Microfrontend design and scaling
    - Cross-team system coordination
    - Performance optimization at scale
                `)
              }
            ]
          } satisfies AIResponse),
 
};