import { NextResponse } from "next/server";
import { site } from "@/lib/content/site";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const formsparkId = process.env.FORMSPARK_ID;
    if (formsparkId) {
      const res = await fetch(`https://submit-form.com/${formsparkId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message, _replyto: email }),
      });
      if (!res.ok) throw new Error("Formspark failed");
    } else {
      console.info("[contact]", { name, email, message, to: site.email });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
