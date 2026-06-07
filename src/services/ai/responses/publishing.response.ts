import type { AIResponse } from "../../../app/chat/pages/chat.type";
import { cleanMarkdown, context } from "../util";

export const publisingResponses = {
  default: () =>
    ({
      type: "stream",
      steps: [
        "Publishing job to career page...",
        "Posting job on LinkedIn...",
        "Creating hiring request on Talent OS..."
      ],
      final: [
        {
          type: "markdown",
          content: cleanMarkdown(`
## 🚀 Job Successfully Published!

Your **Senior React Developer** position is now live across all platforms.

---

### 🌐 View Listings
- 🏠 [Career Page](https://careers.webknot.com/jobs/${context.jobId})
- 💼 [LinkedIn Job Post](https://linkedin.com/jobs/view/${context.jobId})
- 🧑‍💻 [Talent OS Hiring Request](https://talentos.webknot.com/hiring/${context.jobId})

---

### 📊 Track & Manage Hiring
Everything is centralized in your dashboard:

- 📥 Applications  
- 👥 Applicants  
- 🗓️ Interview Rounds  
- 📈 Hiring Progress  

👉 [Open Hiring Dashboard](https://talentos.webknot.com/dashboard/${context.jobId})

---

### ✨ What’s Next?
Start reviewing candidates and move fast on top talent.
Great hires don’t wait.
          `)
        }
      ],
      suggestions: [
        { label: "Cancel Application", action: "open:cancel" },
        { label: "View Dashboard", action: "open:dashboard" },
        { label: "Create Another Job", action: "restart" }
      ]
    } satisfies AIResponse)
};