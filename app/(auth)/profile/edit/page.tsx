import { auth } from "@/auth";
import EditProfile from "@/components/EditProfile";
import { getUserById } from "@/lib/action/GetUserById.action";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/Login");
  }

  const result = await getUserById({
    userId: session.user.id,
  });

  if (!result.success || !result.data?.user) {
    throw new Error(result.message || "User not found");
  }

  const user = result.data.user;

  return (
    <div>
      <EditProfile
        userId={session.user.id}
        user={{
          name: user.name ?? "",
          username: user.username ?? "",
          email: user.email ?? "",
        }}
      />
    </div>
  );
}

export default page;