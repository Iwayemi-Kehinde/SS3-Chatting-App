export type ChatSlice = {
    selectedChatType: any; 
    selectedChatData: any; 
    selectedChatMessages: any[]; 
    setSelectedChatType: (selectedChatType: any) => void;
    setSelectedChatData: (selectedChatData: any) => void;
    setSelectedChatMessages: (selectedChatMessages: any[]) => void;
    closeChat: () => void;
  };
  
  export const createChatSlice = (set: (partial: Partial<ChatSlice>) => void, get: any): ChatSlice => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
    closeChat: () => set({ selectedChatType: undefined, selectedChatData: undefined, selectedChatMessages: [] }),
  });
  