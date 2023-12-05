import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  count: 0,
  plus() {
    set((state) => ({ count: state.count + 1 }));
  },
  minus() {
    set((state) => ({ count: state.count - 1 }));
  },
  result: [],
  result2: [],
  async select() {
    await axios
      .post("/api/user/select_elo_desc")
      .then((res) => {
        console.log(res.data);
        set(() => ({ result: res.data }));
      })
      .catch((err) => console.log(err));
  },
  async select2(rounds) {
    await axios
      .post("/api/amx10/round_search", { rounds })
      .then((res) => {
        console.log(res.data);
        set(() => ({ result: res.data }));
      })
      .catch((err) => console.log(err));
  },
}));

export default useStore;
