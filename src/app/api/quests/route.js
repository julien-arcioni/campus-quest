import { dbConnect, db } from "@/lib/database";
import {NextResponse} from "next/server";

export async function GET() {
  await dbConnect();

  const collection = db.collection('quests');
  const quests = await collection.find().toArray();

  return NextResponse.json(quests);
}