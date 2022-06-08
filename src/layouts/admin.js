import React from "react";

// components

import AdminNavbar from "components/navbars/admin-navbar";
import Sidebar from "components/sidebar/sidebar.js";
import HeaderStats from "components/headers/header-stats.js";
import FooterAdmin from "components/footers/footer-admin.js";

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative lg:ml-64 bg-blueGray-100">
        <AdminNavbar />

        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full min-h-screen   ">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
