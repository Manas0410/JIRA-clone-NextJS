import { SignUpCard } from "@/features/auth/components/SignUpCard";
import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/actions";

const SignUpPage = async () => {
  const user = await getCurrent();
  if (user) redirect("/");
  return (
    <div>
      <SignUpCard />
    </div>
  );
};

export default SignUpPage;
