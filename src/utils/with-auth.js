import { useRouter } from "next/router";
import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useSession } from "next-auth/react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session, status } = useSession();
    //if (typeof window !== "undefined") {
      console.log(session,status)
    const router = useRouter();
    React.useEffect(() => {
      if (!session) {
        router.push("/auth/login");
      }
    }, [session, router]);

    if (status === "loading") {
      return <FaSpinner aria-label="loading" size={20} />;
    }
    if (status === "authenticated" && session) return <WrappedComponent {...props} />;
    return null;
  };

  // return null;
  // };
};

withAuth.displayName = "WithAuth";

export default withAuth;
