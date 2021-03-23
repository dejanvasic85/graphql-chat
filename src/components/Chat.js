/**
 * This component displays the chat and can be seen as the actual Chat Screen
 */

import React from "react";
import "../styles.css";
import { useChat } from "../useChat/useChat";

export default function ChatBubble() {
  const { messages, loading } = useChat();

  if (loading) {
    return <div>loading chat...</div>;
  }

  return (
    <ul>
      {messages.map((m) => (
        <li key={m.id}>
          {m.createdAt}: {m.message}
        </li>
      ))}
    </ul>
  );
}
