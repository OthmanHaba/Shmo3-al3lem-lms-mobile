import {create} from "zustand";

export const useWalletStore = create((set) => ({
    balance: 0,
    transactions: [],
    setBalance: (balance) => set({balance}),
    history:[],
    setHistory: (history) => set({history}),
}));
