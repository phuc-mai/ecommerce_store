import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return
    }

    await connectToDB();

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      user = new User({
        clerkId: userId,
      });

      await user.save();
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log("[user_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}