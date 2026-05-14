import { Router } from "express";
import { db, conversations, messages } from "@workspace/db";
import { openai } from "@workspace/integrations-openai-ai-server";
import { eq } from "drizzle-orm";

const router = Router();

const SYSTEM_PROMPT = `You are AutoNxt Assistant — a knowledgeable, friendly AI assistant for AutoNxt, India's leading electric tractor company.

AutoNxt builds advanced electric tractors for Indian farmers. Key products:
- X45H2: 45HP flagship electric tractor — 280 Nm torque, 10+ hrs range, 4hr charge, AI load management, solar-compatible
- X25H4: 25HP entry-level tractor — 160 Nm torque, 8+ hrs range, 3hr charge, lightweight at 1,400 kg
- X25H2: 25HP compact model, ideal for small farms
- X60H2: 60HP heavy-duty commercial tractor

Key facts:
- 5,000+ tractors deployed across 18+ Indian states
- Zero emissions, 100% electric drivetrain
- 300+ hours saved per farmer per year
- Headquarters: 704 & 705 Amfotech IT Park, Thane, Maharashtra
- Contact: +91 9067404606 | sales@autonxt.in
- Demo bookable at /book
- Industries: Agriculture, Horticulture, Municipal, Defense, Construction, Airport Ground

Answer questions about AutoNxt products, pricing, specifications, farming use cases, industries served, sustainability, and general EV/electric tractor knowledge. Be concise, warm, and helpful. If asked something outside AutoNxt scope, politely redirect to AutoNxt topics.`;

/* ── List conversations ── */
router.get("/conversations", async (req, res) => {
  const convs = await db.select().from(conversations).orderBy(conversations.createdAt);
  res.json(convs);
});

/* ── Create conversation ── */
router.post("/conversations", async (req, res) => {
  const { title } = req.body as { title: string };
  const [conv] = await db.insert(conversations).values({ title }).returning();
  res.status(201).json(conv);
});

/* ── Get conversation with messages ── */
router.get("/conversations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [conv] = await db.select().from(conversations).where(eq(conversations.id, id));
  if (!conv) { res.status(404).json({ error: "Conversation not found" }); return; }
  const msgs = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);
  res.json({ ...conv, messages: msgs });
});

/* ── Delete conversation ── */
router.delete("/conversations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await db.delete(conversations).where(eq(conversations.id, id)).returning();
  if (!deleted.length) { res.status(404).json({ error: "Conversation not found" }); return; }
  res.status(204).end();
});

/* ── List messages ── */
router.get("/conversations/:id/messages", async (req, res) => {
  const id = Number(req.params.id);
  const msgs = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);
  res.json(msgs);
});

/* ── Send message (SSE streaming) ── */
router.post("/conversations/:id/messages", async (req, res) => {
  const id = Number(req.params.id);
  const { content } = req.body as { content: string };

  const [conv] = await db.select().from(conversations).where(eq(conversations.id, id));
  if (!conv) { res.status(404).json({ error: "Conversation not found" }); return; }

  await db.insert(messages).values({ conversationId: id, role: "user", content });

  const history = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);

  const chatMessages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
  ];

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";
  const stream = await openai.chat.completions.create({
    model: "gpt-5.1",
    max_completion_tokens: 8192,
    messages: chatMessages,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) {
      fullResponse += delta;
      res.write(`data: ${JSON.stringify({ content: delta })}\n\n`);
    }
  }

  await db.insert(messages).values({ conversationId: id, role: "assistant", content: fullResponse });

  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
});

export default router;
