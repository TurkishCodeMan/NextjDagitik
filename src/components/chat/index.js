import ChannelHeader from "components/chat/channel-header";
import ChannelMessage from "components/chat/channel-message";
import ChannelFooter from "components/chat/channel-footer";
function ChatArea() {
  return (
    <main className="flex-1 min-h-screen   w-full  h-full flex flex-col bg-white overflow-hidden channel">
      <ChannelHeader title="TEST" description="TEST" />
      <div
        className="py-4 flex-1 overflow-y-scroll channel-messages-list"
        role="list"
      >
        <ChannelMessage
          key="2"
          body="deneme"
          date={new Date("12-12-2020")}
          user={{ name: "test" }}
        />
      </div>

      <ChannelFooter channelName="asdsad" />
    </main>
  );
}
export default ChatArea;
