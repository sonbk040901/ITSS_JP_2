import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { FriendLatestChat, Message } from "types";
import { RootState } from "..";
import { userService } from "@/services";
interface ChatState {
  status: "idle" | "loading" | "success" | "error";
  friends: FriendLatestChat[];
  selectedFriend?: FriendLatestChat;
  selectedFriendMessagesStatus: "idle" | "loading" | "success" | "error";
  selectedFriendMessages: Message[];
  sendMessageStatus: "idle" | "loading" | "success" | "error";
}
const initialState: ChatState = {
  status: "idle",
  friends: [],
  selectedFriendMessagesStatus: "idle",
  selectedFriendMessages: [],
  sendMessageStatus: "idle",
};
export const fetchLatestChat = createAsyncThunk(
  "chat/fetchLatestChat",
  userService.getLatestChats,
);
export const selectChatFriend = createAsyncThunk(
  "chat/selectChatFriend",
  userService.getChat,
);
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  userService.sendMessage,
);
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetChatSelectedFriendMessagesStatus: (state) => {
      state.selectedFriendMessagesStatus = "idle";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchLatestChat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLatestChat.fulfilled, (state, action) => {
        state.status = "success";
        state.friends = action.payload;
      })
      .addCase(fetchLatestChat.rejected, (state) => {
        state.status = "error";
      })
      .addCase(selectChatFriend.pending, (state, payload) => {
        state.selectedFriendMessagesStatus = "loading";
        state.selectedFriend = state.friends.find(
          (f) => f.id === payload.meta.arg,
        );
      })
      .addCase(selectChatFriend.fulfilled, (state, action) => {
        state.selectedFriendMessagesStatus = "success";
        if (action.payload.length !== state.selectedFriendMessages.length) {
          state.selectedFriendMessages = action.payload;
        }
      })
      .addCase(selectChatFriend.rejected, (state) => {
        state.selectedFriendMessagesStatus = "error";
      })
      .addCase(sendMessage.pending, (state) => {
        state.sendMessageStatus = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendMessageStatus = "success";
        state.selectedFriendMessages.unshift(action.payload);
        state.selectedFriendMessages = [...state.selectedFriendMessages];
        state.friends = [
          ...state.friends.map((f) => {
            if (f.id === action.meta.arg.id) {
              return {
                ...f,
                latestMessage: action.payload,
              };
            }
            return f;
          }),
        ];
      }),
});
export const selectChat = (state: RootState) => state.chat;
export const selectChatFriends = createSelector(
  selectChat,
  (chat) => chat.friends,
);
export const selectChatStatus = createSelector(
  selectChat,
  (chat) => chat.status,
);
export const selectChatSelectedFriend = createSelector(
  selectChat,
  (chat) => chat.selectedFriend,
);
export const selectChatSelectedFriendMessages = createSelector(
  selectChat,
  (chat) => chat.selectedFriendMessages,
);
export const selectChatSelectedFriendMessagesStatus = createSelector(
  selectChat,
  (chat) => chat.selectedFriendMessagesStatus,
);
export const { resetChatSelectedFriendMessagesStatus } = chatSlice.actions;
export default chatSlice.reducer;
