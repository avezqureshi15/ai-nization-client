import type { AIResponse } from "../../../app/chat/pages/chat.type";
import { cleanMarkdown, context } from "../util";

export const seniorityResponse = {
    default: () =>
    ({
        type: "stream",
        steps: [
            "Analyzing role depth...",
            "Adding system design scope...",
            "Upgrading seniority level..."
        ],
        final: [
            {
                type: "text",
                text: `Updated Role: ${context.role}`
            },
            {
                type: "markdown",
                content: cleanMarkdown(`
## 🚀 Role Overview
We are hiring a **Senior-level ${context.role} Engineer** responsible for building scalable systems in a product-based environment.

---

## 🧠 Core Responsibilities
- Design scalable system architecture
- Own technical decisions for core modules
- Build high-performance applications
- Collaborate across teams

---

## 📌 Expectations
- Strong system design understanding
- Leadership potential
- Ownership mindset
            `)
            }
        ]
    } satisfies AIResponse),

};