import { db } from "@/db";
import { drinks as drinksTable, machines as machinesTable } from "@/db/schema";
import { DRINKS, MACHINES } from "@/lib/data";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function ensureSeed() {
  try {
    const existing = await db.select().from(drinksTable).limit(1);
    if (existing.length === 0) {
      await db.insert(drinksTable).values(DRINKS);
    }
    const m = await db.select().from(machinesTable).limit(1);
    if (m.length === 0) {
      await db.insert(machinesTable).values(MACHINES);
    }
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  const ok = await ensureSeed();
  if (!ok) {
    return Response.json({ source: "fallback", machines: MACHINES, drinks: DRINKS });
  }
  try {
    const d = await db.select().from(drinksTable).orderBy(asc(drinksTable.sort));
    const m = await db.select().from(machinesTable);
    return Response.json({ source: "db", machines: m.length ? m : MACHINES, drinks: d.length ? d : DRINKS });
  } catch {
    return Response.json({ source: "fallback", machines: MACHINES, drinks: DRINKS });
  }
}
