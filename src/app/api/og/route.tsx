import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<ImageResponse> {
  const { searchParams } = new URL(request.url);
  const hasTitle: boolean = searchParams.has("title");

  const title: string =
    (hasTitle && searchParams.get("title")) ||
    "Local Farmer Booking - Fresh Produce Direct from Farmers";

  return new ImageResponse(
    (
      <div tw="text-7xl bg-teal-600 w-full h-full flex text-center items-center justify-center text-white font-bold">
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
