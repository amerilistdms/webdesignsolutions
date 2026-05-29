import { NextResponse } from "next/server";

const SALESFORCE_OID = "00D5Y000001d8KR";
const WEB_TO_LEAD_URL =
  "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";

type LeadPayload = {
  services?: string[];
  timeline?: string;
  budget?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  phone?: string;
  phoneExt?: string;
  notes?: string;
};

function buildDescription(payload: LeadPayload): string {
  const lines = [
    "--- Amerilist Web Design (Get Started) ---",
    payload.services?.length
      ? `Services: ${payload.services.join(", ")}`
      : "Services: (none selected)",
    payload.timeline ? `Timeline: ${payload.timeline}` : null,
    payload.budget ? `Budget: ${payload.budget}` : null,
    payload.phoneExt ? `Phone ext: ${payload.phoneExt}` : null,
    payload.notes?.trim() ? `\nNotes:\n${payload.notes.trim()}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const firstName = payload.firstName?.trim();
  const lastName = payload.lastName?.trim();
  const email = payload.email?.trim();
  const phone = payload.phone?.trim();

  const company = payload.company?.trim() ?? "";
  const notes = payload.notes?.trim() ?? "";

  if (!firstName || !lastName || !email || !phone) {
    return NextResponse.json(
      { error: "First name, last name, email, and phone are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  if (phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
  }

  if (!company) {
    return NextResponse.json({ error: "Company is required." }, { status: 400 });
  }

  if (!notes || notes.length < 20) {
    return NextResponse.json(
      { error: "Project details are required (at least 20 characters)." },
      { status: 400 },
    );
  }

  const body = new URLSearchParams({
    oid: SALESFORCE_OID,
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    company,
    description: buildDescription(payload),
  });

  try {
    const sfResponse = await fetch(WEB_TO_LEAD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!sfResponse.ok) {
      console.error("Salesforce WebToLead failed:", sfResponse.status);
      return NextResponse.json(
        {
          error:
            "We could not submit your request right now. Please email sales@amerilistwebdesign.com or call 1.800.457.2899.",
        },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Salesforce WebToLead error:", err);
    return NextResponse.json(
      {
        error:
          "We could not submit your request right now. Please email sales@amerilistwebdesign.com or call 1.800.457.2899.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
