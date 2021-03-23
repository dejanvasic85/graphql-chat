import gql from "graphql-tag";

export const CHAT_ROOM = gql`
  query ChatRoom($chatRoomId: ID!, $first: Int, $after: String) {
    chatRoom(id: $chatRoomId) {
      id
      users {
        id
        chatRoomId
        userId
        user {
          id
          firstName
          lastName
          email
        }
      }
      messages(first: $first, after: $after) {
        pageInfo {
          endCursor
          hasMore
        }
        items {
          id
          message
          createdAt
          userId
        }
      }
    }
  }
`;

export const COMMENTS_SUBSCRIPTION = gql`
  subscription ChatMessageAdded($chatRoomId: ID!) {
    chatMessageAdded(chatRoomId: $chatRoomId) {
      id
      userId
      message
      chatRoomId
      createdAt
    }
  }
`;
