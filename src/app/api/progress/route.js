import { dbConnect, db } from "@/lib/database";
import {NextResponse} from "next/server";

export async function GET(req) {
    await dbConnect();

    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: "No userId provided" });
    }

    const collection = db.collection('users');
    const user = await collection.findOne({ id: userId });

    if (!user) {
        return NextResponse.json({ error: "User not found" });
    }

    return NextResponse.json(user.quests);
}