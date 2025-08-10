import { connectToDatabase } from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Task } from "../../../models/task.model";

export async function GET() {
  try {
    await connectToDatabase();
    const cards = await Task.find({});
    return NextResponse.json(cards);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.label) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTask = new Task(body);
    const savedTask = await newTask.save();

    return NextResponse.json(savedTask);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
