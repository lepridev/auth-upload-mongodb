import { connect } from "@/dbConfig/dbConfig";
import { error } from "console";
import multer from "multer";
import { NextResponse } from "next/server";
import Image from "@/models/imageModel";

export async function POST(req: any, res: any) {
  try {
    connect();

      const { name, imgUrl } = await req.json()
      console.log(name, imgUrl);

      const createImage = await new Image({
          name, imgUrl
      })

      await createImage.save()
      
    return NextResponse.json({message: "All data getted"})
  } catch (error: any) {
    return NextResponse.json({ message: "some thing went wrong", error });
  }
}
