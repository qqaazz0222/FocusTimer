import { NextRequest, NextResponse } from "next/server";
import Axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
    const genre = req.nextUrl.searchParams.get("g");
    const key = encodeURI(`${genre} 플레이리스트`);
    const response = await Axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBCV424E5phcYZNF8Pk18qXTigKe-2O4jE&part=id&maxResults=10&q=${key}`
    );
    const result =
        response.data.items[Math.floor(Math.random() * 10)].id.videoId;
    return NextResponse.json(
        { videoId: result },
        {
            status: 200,
        }
    );
}

// export async function HEAD(request: Request) {}

// export async function POST(request: Request) {}

// export async function PUT(request: Request) {}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}
