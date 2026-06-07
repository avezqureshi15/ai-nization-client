import type { AIResponse } from "../../../app/chat/pages/chat.type";
import { cleanMarkdown, context } from "../util";

export const publishTriggerResponse = {
  default: () =>
    ( {
        type: "ui_action",
        action: "SHOW_JOB_PANEL",
        payload: {
          jobId: context.jobId,
          role: context.role
        },    suggestions: [
        { label: "Publish Job", action: "role:publishJob" },
        { label: "Cancel Application", action: "role:cancel" },
      ],

            steps: [
                  "Finalizing job description...",
                  "Preparing publish-ready format...",
                  "Generating final output..."
                ],
                final: [
                  {
                    type: "text",
                    text:
                      "Done. The job description is finalized and ready to publish."
                  },
                  {
                    type: "markdown",
                    content: cleanMarkdown(`
            # 💼 Final Job Description: ${context.role}
            
            ## 🌟 Overview
            We are hiring a highly skilled **${context.role} Engineer** to design, build, and scale modern applications in a product-driven environment.
            
            ---
            
            ## 🧩 Responsibilities
            - Design and build scalable system architecture
            - Develop high-performance applications
            - Own frontend/backend integration layers
            - Collaborate with cross-functional teams
            - Participate in system design discussions
            
            ---
            
            ## 🧠 Technical Expectations
            - Strong expertise in system design
            - Deep understanding of scalable architectures
            - Production-grade development experience
            - Strong debugging and optimization skills
            
            ---
            
            ## 🚀 Leadership Expectations
            - Mentor engineers and guide technical decisions
            - Drive architecture discussions
            - Ensure code quality and best practices
            
            ---
            
            ## 📌 Nice to Have
            - Microfrontend experience
            - Experience in product-based companies
            - Experience leading distributed teams
                    `)
                  }
                ]
      } satisfies AIResponse),
 
};