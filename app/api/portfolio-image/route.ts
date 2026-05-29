import { NextResponse } from "next/server";

const ALLOWED_HOST = "amerilistwebdesign.com";

export async function GET(request: Request) {
  const src = new URL(request.url).searchParams.get("url");

  if (!src) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  let parsed: URL;

  try {
    parsed = new URL(src);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (parsed.hostname !== ALLOWED_HOST || parsed.protocol !== "https:") {
    return NextResponse.json({ error: "Forbidden host" }, { status: 403 });
  }

  try {
    const upstream = await fetch(parsed.toString(), {
      next: { revalidate: 86400 },
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Upstream fetch failed" },
        { status: upstream.status },
      );
    }

    const contentType =
      upstream.headers.get("content-type") ?? "application/octet-stream";
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json({ error: "Fetch error" }, { status: 502 });
  }
}
