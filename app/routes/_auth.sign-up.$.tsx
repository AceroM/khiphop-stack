import { SignUp } from "@clerk/remix";
import AuthWrapper from "~/components/AuthWrapper";

export default function SignUpPage() {
  return (
    <AuthWrapper>
      <SignUp routing={"path"} path={"/sign-up"} />
    </AuthWrapper>
  );
}
