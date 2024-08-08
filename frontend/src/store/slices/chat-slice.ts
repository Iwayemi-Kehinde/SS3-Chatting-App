export type ChatSlice = {
  selectedChatType: any;
  selectedChatData: any;
  selectedChatMessages: any[];
  setSelectedChatType: (selectedChatType: any) => void;
  setSelectedChatData: (selectedChatData: any) => void;
  setSelectedChatMessages: (selectedChatMessages: any[]) => void;
  closeChat: () => void;
  addMessage: (message: any) => void
};

export const createChatSlice = (set: (partial: Partial<ChatSlice>) => void, get: any): ChatSlice => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
  closeChat: () => set({ selectedChatType: undefined, selectedChatData: undefined, selectedChatMessages: [] }),
  addMessage: (message: any) => {
    const selectedChatMessages = get().selectedChatMessages
    const selectedChatType = get().selectedChatType
    set(
      {
        selectedChatMessages: [
          ...selectedChatMessages, {
            ...message,
            recipient: selectedChatType === "channel" ? message.recipient : message.recipient._id,
            sender:
              selectedChatType === "cancel"
          }
        ]
      }
    )
  }
});
