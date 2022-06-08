import { logout, useUser } from "@/utils/auth-provider";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";



const withAuth = (WrappedComponent) =>{
  return (props) => {
    //if (typeof window !== "undefined") {
      const router = useRouter();
      const { data, isLoading } = useUser();
      React.useEffect(() => {
        if ((!data && !isLoading)) {
          logout()
          router.push("/")
        };
      }, [data,isLoading]);

      if (isLoading) {
        return <Spinner aria-label="loading" size="xl"/>;
      }
      if (!data && !isLoading) return <div aria-label="error">Error</div>;

      return <WrappedComponent {...props} />;
    }

   // return null;
 // };
};

withAuth.displayName="WithAuth"

export default withAuth;
