/** Parse relative Hindi/English date phrases → YYYY-MM-DD (Asia/Kolkata). */

const TZ = "Asia/Kolkata";

function istNow(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: TZ }));
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function formatYmd(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function getSessionClock(): { currentDate: string; currentTime: string; timezone: string } {
  const n = istNow();
  return {
    currentDate: formatYmd(n),
    currentTime: `${pad2(n.getHours())}:${pad2(n.getMinutes())}`,
    timezone: TZ,
  };
}

function parseYmd(s: string): Date | null {
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  return new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10));
}

function addDays(ymd: string, days: number): string {
  const d = parseYmd(ymd);
  if (!d) return ymd;
  d.setDate(d.getDate() + days);
  return formatYmd(d);
}

export interface ParsedDateTime {
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

/** Normalize "आज रात 9 बजे" style input for forms/API. */
export function parseRelativeDateTime(opts: {
  text?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  currentDate?: string;
  currentTime?: string;
}): ParsedDateTime {
  const clock = getSessionClock();
  const currentDate = opts.currentDate || clock.currentDate;
  const blob = [opts.text, opts.preferredDate, opts.preferredTime, opts.notes]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let preferredDate = (opts.preferredDate || "").trim();
  let preferredTime = (opts.preferredTime || "").trim();
  const extraNotes = (opts.notes || "").trim();

  if (parseYmd(preferredDate)) {
    return { preferredDate, preferredTime, notes: extraNotes };
  }

  if (/आज|aaj|today|இன்று|inru/i.test(blob)) preferredDate = currentDate;
  else if (/परसों|परवा|parso|day after tomorrow/i.test(blob)) preferredDate = addDays(currentDate, 2);
  else if (/कल|kal|tomorrow|उद्या|நாளை/i.test(blob)) preferredDate = addDays(currentDate, 1);

  const colon = blob.match(/(\d{1,2})\s*:\s*(\d{2})/);
  if (colon) preferredTime = `${pad2(parseInt(colon[1], 10))}:${colon[2]}`;
  else {
    const hr = blob.match(
      /(?:रात|रात्रि|night|evening|शाम)?[^\d]*(\d{1,2})\s*(?:बजे|baje|वाजता|pm|am)?/i
    );
    if (hr) {
      let h = parseInt(hr[1], 10);
      if (/रात|night|evening|शाम|pm/i.test(blob) && h < 12) h += 12;
      preferredTime = `${pad2(h)}:00`;
    }
  }

  if (/रात\s*9|9\s*बजे|9\s*pm|21:00/i.test(blob) && !preferredTime) preferredTime = "21:00";
  if (!preferredDate) preferredDate = currentDate;

  let notes = extraNotes;
  if (preferredTime && !notes.includes(preferredTime)) {
    notes = notes ? `${notes} | Preferred time: ${preferredTime} IST` : `Preferred time: ${preferredTime} IST`;
  }

  return { preferredDate, preferredTime, notes };
}
