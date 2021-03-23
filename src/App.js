import React from "react";
import "./styles.css";

import { ChatProvider } from "./useChat/useChat";
import ChatBubble from "./components/ChatBubble";

export default function App() {
  return (
    <ChatProvider>
      <div className="App">
        <div>
          Unread messages: <ChatBubble />
        </div>
      </div>
    </ChatProvider>
  );
}
