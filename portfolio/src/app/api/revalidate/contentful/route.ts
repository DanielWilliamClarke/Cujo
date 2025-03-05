import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json(); // res now contains body

  // Check for secret to confirm this is a valid request
  if (body.secret !== process.env.CUJO_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "Revalidation Invalid" },
      { status: 401 },
    );
  }

  if (body.tag) {
    console.log(`Revalidating ${body.tag}`);
    revalidateTag(body.tag);
    return NextResponse.json({ revalidated: true }, { status: 200 });
  }

  return NextResponse.json({ message: "Revalidation Error" }, { status: 500 });
}
