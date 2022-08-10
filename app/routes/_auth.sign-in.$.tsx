import { SignIn } from "@clerk/remix";
import AuthWrapper from "~/components/AuthWrapper";

export default function SignInPage() {
  return (
    <AuthWrapper>
      <SignIn path={"sign-in"} />
    </AuthWrapper>
  );
}
