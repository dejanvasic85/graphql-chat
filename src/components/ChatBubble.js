/**
 * This component displays the chat bubble (separate from the real chat)
 */

import React, { useState } from "react";
import "../styles.css";
import { useChat } from "../useChat/useChat";

export default function ChatBubble() {
  const [lastCheck, setLastCheck] = useState(new Date());
  const { messages, loading } = useChat();

  if (loading) {
    return <div>loading bubble...</div>;
  }

  const unreadMsgCount = messages.filter(
    (m) => new Date(m.createdAt) > lastCheck
  );

  return (
    <div>
      <div className="container">
        <div className="bubble">{unreadMsgCount.length}</div>
        <button className="btn" onClick={() => setLastCheck(new Date())}>
          reset
        </button>
        <div>
          Last Check <span>{lastCheck.toISOString()}</span>
        </div>
      </div>
    </div>
  );
}
