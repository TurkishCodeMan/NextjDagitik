import React from "react";
import Navbar from "components/navbars/auth-navbar";
import Seo from "components/seo";

import ChatTeamSidebar from "components/chat/chat-team-sidebar";
import ChatArea from "components/chat";

export default function Chat() {
  return (
    <>
      <Seo title="Chat" />
      <Navbar transparent />
      <div className="flex-1  flex w-full min-h-screen">
        <ChatTeamSidebar team={{ name: "aaaa" }} />
        <ChatArea />
      </div>
    </>
  );
}
