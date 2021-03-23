import React from "react";
import "./styles.css";

import ChatBubble from "./ChatBubble";

export default function App() {
  return (
    <div className="App">
      <div>
        Unread messages: <ChatBubble />
      </div>
    </div>
  );
}
