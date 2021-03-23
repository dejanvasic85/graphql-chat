import React, { useState, useEffect } from "react";
import "./styles.css";
import { useQuery } from "@apollo/client";
import { CHAT_ROOM, COMMENTS_SUBSCRIPTION } from "./queries";
import { chatRoomId } from "./data";

export default function ChatBubble() {
  const [lastCheck, setLastCheck] = useState(new Date());
  const { data, loading, subscribeToMore } = useQuery(CHAT_ROOM, {
    variables: {
      chatRoomId,
      first: 1,
      after: null
    }
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: COMMENTS_SUBSCRIPTION,
      variables: { chatRoomId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const value = {
          ...prev,
          chatRoom: {
            ...prev.chatRoom,
            messages: {
              __typename: "ChatMessageList",
              items: [
                subscriptionData.data.chatMessageAdded,
                ...prev.chatRoom.messages.items
              ],
              pageInfo: prev.chatRoom.messages.pageInfo
            }
          }
        };

        return value;
      }
    });

    return () => unsubscribe();
  }, [subscribeToMore]);

  if (loading) {
    return <div>loading...</div>;
  }

  const unreadMsgCount = data.chatRoom.messages.items.filter(
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
      <ul>
        {data.chatRoom.messages.items.map((m) => (
          <li key={m.id}>
            {m.createdAt}: {m.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
