/**
 * This is the global Chat Provider that just runs in the background
 * and feeds the data down to the components that subscribe to use.
 * See Chat.js and ChatBubble.js
 */

import React, { createContext, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { CHAT_ROOM, COMMENTS_SUBSCRIPTION } from "../queries";
import { chatRoomId } from "../data";

export const ChatContext = createContext({ messages: [], loading: true });

export const ChatProvider = ({ children }) => {
  const { data, loading, subscribeToMore } = useQuery(CHAT_ROOM, {
    variables: {
      chatRoomId,
      first: 10,
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

  return (
    <ChatContext.Provider
      value={{
        messages: data?.chatRoom?.messages?.items,
        loading
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
