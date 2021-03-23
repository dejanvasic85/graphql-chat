import React from "react";
import "./styles.css";

import { ChatProvider } from "./useChat/useChat";
import ChatBubble from "./components/ChatBubble";
import Chat from "./components/Chat";

export default function App() {
  return (
    <ChatProvider>
      <div className="App">
        <ChatBubble />
        <Chat />
      </div>
    </ChatProvider>
  );
}
