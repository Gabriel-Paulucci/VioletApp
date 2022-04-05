import { defineStore } from "pinia";

export interface MainStore {
  token: string;
  apps: App[] | null;
}

export interface App {
  id: number;
  name: string;
  owner: string;
}

export const useMainStore = defineStore("mainStore", {
  state: (): MainStore => ({
    token: "",
    apps: null,
  }),
  getters: {
    getToken: (state: MainStore) => {
      return state.token;
    },
  },
});
