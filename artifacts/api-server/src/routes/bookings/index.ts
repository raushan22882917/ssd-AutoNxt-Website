import { Router } from "express";
import { db, bookings } from "@workspace/db";
import { desc } from "drizzle-orm";

const router = Router();

/* ── Submit booking ── */
router.post("/", async (req, res) => {
  const { name, email, phone, company, vehicleType, message } = req.body as {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    vehicleType: string;
    message?: string;
  };

  if (!name || !email || !vehicleType) {
    res.status(400).json({ error: "name, email, and vehicleType are required" });
    return;
  }

  const [booking] = await db
    .insert(bookings)
    .values({
      name,
      email,
      phone: phone ?? "",
      company: company ?? "",
      vehicleType,
      message: message ?? "",
    })
    .returning();

  res.status(201).json(booking);
});

/* ── List bookings (admin) ── */
router.get("/", async (_req, res) => {
  const rows = await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  res.json(rows);
});

export default router;
