import { create } from "zustand";
import axios from "axios";
import Papa from "papaparse";
import commonConfig from "@/app/assets/csvHeader";

const csvStore = create((set) => ({
  src: "",
  async fileupload(filename, file) {
    let res = await fetch("/api/admin/upload?file=" + filename);
    res = await res.json();
    const formData = new FormData();
    Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const result = await fetch(res.url, {
      method: "POST",
      body: formData,
    });
    if (result.ok) {
      set(() => ({ src: result.url + "/iracing/" + filename }));
    } else {
      console.log("ERROR....");
    }
  },
  parseData: [],
  parseCsv(csvUrl) {
    Papa.parse(`${csvUrl}`, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (result) => {
        set(() => ({ parseData: result.data }));
      },
    });
    console.log(csvUrl);
  },
  tableheader: [
    "Pos",
    "Name",
    "Start Elo",
    "Elo Diff",
    "Odds",
    "Result",
    "Win-Lose",
    "New Elo",
    "Points",
  ],
  topCarInfo: "",
  topTrackInfo: "",
  topDateInfo: "",
  settingInfo(data) {
    set(() => ({
      topCarInfo: data.topCarInfo,
      topTrackInfo: data.topTrackInfo,
      topDateInfo: data.topDateInfo,
    }));
  },
}));

export default csvStore;
