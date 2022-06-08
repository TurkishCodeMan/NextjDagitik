import React from "react";

// components

import Navbar from "components/navbars/auth-navbar.js";
import FooterSmall from "components/footers/footer-small";

// views

export default function Auth({children}) {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(/rr.png)",
            }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
