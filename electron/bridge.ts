import { contextBridge, ipcRenderer } from "electron";

import axios, { AxiosResponse } from "axios";
//axios.defaults.adapter = require("axios/lib/adapters/http");

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

import database from "../database";

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */

  sendMessage: (message: string) => {
    ipcRenderer.send("message", message);
  },

  fetchData: (callback: (res: AxiosResponse<any>) => void) => {
    axios.get(fakeDataUrl).then(callback);
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: (data: any) => any) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },

  database: {
    getAllRssFeeds: () =>
      database.allDocs({
        include_docs: true,
        attachments: true,
      }),
    postRssFeed: () => {
      return 0;
    },
    updateRssFeed: () => {
      return 0;
    },
  },
  // send: (message: string) => {
  //   return new Promise((resolve) => {
  //     ipcRenderer.once("asynchronous-reply", (_, arg) => {
  //       resolve(arg);
  //     });
  //     ipcRenderer.send("asynchronous-message", message);
  //   });
  // },
};

contextBridge.exposeInMainWorld("Main", api);
