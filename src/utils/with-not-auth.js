import { useRouter } from "next/router";
import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useSession } from "next-auth/react";

const withNotAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session, status } = useSession();
    //if (typeof window !== "undefined") {
      console.log(session)
    const router = useRouter();
    React.useEffect(() => {
      if (session) {
        router.push("/");
      }
    }, [session, router]);

    if (status === "loading") {
      return <FaSpinner aria-label="loading" size={20} />;
    }
    if (status === "unauthenticated" && !session) return <WrappedComponent {...props} />;
    return null;
  };

  // return null;
  // };
};

withNotAuth.displayName = "WithNotAuth";

export default withNotAuth;
