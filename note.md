**Reminder for AI Agent Tool Calls:**

> **Do not display assistant content immediately if there are pending tool calls.**
>
> - First, check for any `tool_calls` in the response.
> - Execute all tool calls (or run them in parallel).
> - Only after all tool calls are complete, display the assistant’s `content`.
> - This prevents showing intermediate/thinking messages like “Let me look that up for you” and ensures the final answer appears cleanly.

**Rule of Thumb:**

> _“Run tools first → show final content last.”_

---
