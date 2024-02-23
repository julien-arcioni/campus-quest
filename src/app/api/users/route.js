import { dbConnect, db } from "@/lib/database";
import {NextResponse} from "next/server";

export async function POST(req) {
    await dbConnect();

    let body = '';
    for await (const chunk of req.body) {
        body += chunk;
    }
    const { userId, questCode } = JSON.parse(body);
    const collection = db.collection('users');
    const user = await collection.findOne({ id: userId });

    try {
        if (!user) {
            // Si l'utilisateur n'existe pas
            await collection.insertOne({ id: userId, quests: [questCode] });
            return NextResponse.json(1); // Succès
        } else {
            // l'utilisateur existe déjà
            if (user.quests.includes(questCode)) {
                return NextResponse.json(0); // Quest déjà validée
            } else {
                await collection.updateOne({ id: userId }, { $push: { quests: questCode } });
                return NextResponse.json(1); // Succès
            }
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(-1); // Erreur
    }
}