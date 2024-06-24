import {
  GoogleSigninButton,
  Logout,
  NaverSigninButton,
} from "@/components/AuthButton";
import { authConfig } from "@/lib/auth";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";

export default async function Home() {
  await connectToDB();

  const session = await getServerSession(authConfig);

  const userId = session?.user?.id;

  try {
    const thisUser = await User.findOne({ id: userId });
    console.log(thisUser);
  } catch (error) {
    console.log("❌ This is Error ❌", error);
  }

  if (session) {
    return (
      <div>
        <h1>{`안녕하세요. ${session}`}</h1>
        <Logout />
      </div>
    );
  } else {
    return (
      <div>
        <h1>로그인을 하세요. </h1>
        <GoogleSigninButton />
        <NaverSigninButton />
      </div>
    );
  }
}
