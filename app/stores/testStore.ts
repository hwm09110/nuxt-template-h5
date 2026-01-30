interface IState {
  count: number;
}

export const useTestStore = defineStore('test-store', {
  state: (): IState => ({
    count: 1,
  }),
  getters: {
    getCount(): number {
      return this.count;
    },
  },
  actions: {
    addCount() {
      this.count++;
    },
  },
});
