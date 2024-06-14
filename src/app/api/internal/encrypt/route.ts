import { NextRequest, NextResponse } from "next/server";

import { encryptData } from "~/utils/encryptionHelper";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const sp = new URL(request.nextUrl).searchParams;
    const query = sp.get("q");
    if (!query) return new NextResponse("Add query parameter 'q' with the value to encrypt", { status: 400 });

    var key = sp.get("ENCRYPTION_KEY")
    key = !key ? process.env.ENCRYPTION_KEY : key.length < 16 ? key.padEnd(16, "0") : key.length > 16 ? key.slice(0, 16) : key;
    const encrypted = await encryptData(query,key);

    return NextResponse.json(
      {
        value: encrypted,
        key
      },
      { status: 200 },
    );
  } catch (error) {
    const e = error as Error;
    console.error(e);
    return new Response(e.message, { status: 500 });
  }
}
