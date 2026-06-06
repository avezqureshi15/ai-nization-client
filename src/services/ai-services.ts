import type { AIResponse } from "../app/chat/pages/chat.type";

/**
 * -------------------------
 * Flow State
 * -------------------------
 */
type FlowState =
  | "INIT"
  | "ROLE_INTRO"
  | "ROLE_DEFINED"
  | "SENIORITY_ADDED"
  | "LEADERSHIP_ADDED"
  | "FORMATTED"
  | "FINALIZED";

let state: FlowState = "INIT";

let context = {
  role: "",
};

/**
 * -------------------------
 * Markdown Cleaner (CRITICAL FIX)
 * prevents broken headers/lists
 * -------------------------
 */
const cleanMarkdown = (md: string) =>
  md
    .replace(/\r\n/g, "\n")
    .replace(/^\s+/gm, "") // removes indentation per line
    .trim();

/**
 * -------------------------
 * Main AI Function
 * -------------------------
 */
export const getAIResponse = async (
  input: string
): Promise<AIResponse> => {
  const text = input.toLowerCase();

  /**
   * =========================
   * INIT STATE
   * =========================
   */
  if (state === "INIT") {
    if (text.includes("hire")) {
      state = "ROLE_INTRO";

      return {
        type: "text",
        
        text: "Got it. What role are we hiring for?",
          suggestions: [
    { label: "Frontend Engineer", action: "role:frontend" },
    { label: "Backend Engineer", action: "role:backend" },
    { label: "Fullstack", action: "role:fullstack" }
  ]
      };
    }

   return {
  type: "text",
  text: "Tell me what role you want to hire for.",
  suggestions: [
    { label: "Frontend Engineer", action: "role:frontend" },
    { label: "Backend Engineer", action: "role:backend" },
    { label: "Fullstack", action: "role:fullstack" }
  ]
};
  }

  /**
   * =========================
   * ROLE INPUT
   * =========================
   */
  if (state === "ROLE_INTRO") {
    context.role = input;
    state = "ROLE_DEFINED";

    return {
      type: "text",
      text:
        "Understood. Should I make this a senior role with system design responsibilities?",
    };
  }

  /**
   * =========================
   * SENIORITY + SYSTEM DESIGN
   * =========================
   */
  if (state === "ROLE_DEFINED") {
    if (text.includes("senior") || text.includes("system")) {
      state = "SENIORITY_ADDED";

      return {
        type: "stream",
        steps: [
          "Analyzing role depth...",
          "Adding system design scope...",
          "Upgrading seniority level...",
        ],
        final: [
          {
            type: "text",
            text: `Updated Role: ${context.role}`,
          },
          {
            type: "markdown",
            content: cleanMarkdown(`
## 🚀 Role Overview
We are hiring a **Senior-level Frontend Engineer** responsible for building scalable UI systems in a product-based environment.

---

## 🧠 Core Responsibilities
- Design scalable frontend architecture
- Own system design decisions for UI layer
- Build high-performance React applications
- Collaborate with backend teams on API contracts

---

## 📌 Expectations
- Strong understanding of system design (frontend-heavy systems)
- Ability to lead technical direction
            `),
          },
        ],
      };
    }
  }

  /**
   * =========================
   * LEADERSHIP + MICROFRONTEND
   * =========================
   */
  if (state === "SENIORITY_ADDED") {
    if (text.includes("mentor") || text.includes("microfrontend")) {
      state = "LEADERSHIP_ADDED";

      return {
        type: "stream",
        steps: [
          "Adding leadership responsibilities...",
          "Integrating microfrontend architecture...",
          "Enhancing ownership scope...",
        ],
        final: [
          {
            type: "markdown",
            content: cleanMarkdown(`
## 🏗️ Expanded Role: ${context.role}

### Leadership Responsibilities
- Mentor junior engineers and conduct code reviews
- Drive frontend architecture decisions
- Lead microfrontend implementation strategies

### Architecture Ownership
- Design and maintain microfrontend systems
- Ensure scalability across multiple teams
- Optimize frontend performance at scale

### Senior Expectations
- Strong ownership mindset
- System design capability
- Ability to break down complex UI systems
            `),
          },
        ],
      };
    }
  }

  /**
   * =========================
   * FORMATTING REQUEST
   * =========================
   */
  if (state === "LEADERSHIP_ADDED") {
    if (text.includes("lengthy") || text.includes("formatted")) {
      state = "FORMATTED";

      return {
        type: "stream",
        steps: [
          "Structuring job description...",
          "Applying professional formatting...",
          "Finalizing JD document...",
        ],
        final: [
          {
            type: "markdown",
            content: cleanMarkdown(`
# 💼 Senior ${context.role}

## 🌟 Overview
We are looking for a highly skilled engineer to design and scale frontend systems in a product-based environment.

---

## 🧩 Responsibilities
- Build scalable React-based architectures
- Lead system design for frontend-heavy applications
- Design and maintain microfrontend systems
- Mentor and guide engineering teams
- Ensure performance and scalability at scale

---

## 🎯 Requirements
- 6+ years of frontend experience
- Strong React + TypeScript expertise
- System design understanding (frontend focus)
- Experience with distributed UI systems

---

## 🚀 Nice to Have
- Microfrontend architecture experience
- Experience in product-based companies
- Leadership experience in engineering teams
            `),
          },
        ],
      };
    }
  }

  /**
   * =========================
   * FINAL STATE
   * =========================
   */
  if (text.includes("final")) {
    state = "FINALIZED";

    return {
      type: "text",
      text: "Done. The job description is finalized and ready to publish.",
    };
  }

  /**
   * =========================
   * FALLBACK
   * =========================
   */
  return {
    type: "text",
    text: "Can you clarify the requirement?",
  };
};