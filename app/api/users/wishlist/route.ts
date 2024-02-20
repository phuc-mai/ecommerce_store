import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";

import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { favoriteItem } = await req.json();

    if (!favoriteItem) {
      return new NextResponse("Favorite item is required", {
        status: 400,
      });
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const isFavorite = user.wishlist.includes(favoriteItem);

    if (isFavorite) {
      user.wishlist = user.wishlist.filter(
        (item: string) => item !== favoriteItem
      );
    } else {
      user.wishlist.push(favoriteItem);
    }

    await user.save();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[user_wishlist_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}