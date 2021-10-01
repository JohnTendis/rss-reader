import PouchDB from "pouchdb";
import { env } from "process";
import { RssFeed } from "../src/types/common";
// FIXME: On prod remove verbose to close logs
const database = new PouchDB("./database/pouchdb");

// const rssfeeds: any = [
//   {
//     _id: "1",
//     title: "Пыль, пылевые клещи и их аллергены. Профилактика и защита",
//     url: "https://habr.com/ru/rss/post/580034/?fl=ru",
//     allItemsCount: "0",
//     oldItemsCount: "0",
//     iconPath: "",
//     rssFolderId: "",
//     filters: [],
//   },
//   {
//     _id: "2",
//     title: "Идеальная светодиодная лампа за 21 рубль",
//     url: "https://habr.com/ru/rss/post/580228/?fl=ru",
//     allItemsCount: "0",
//     oldItemsCount: "0",
//     iconPath: "",
//     rssFolderId: "",
//     filters: [],
//   },
//   {
//     _id: "3",
//     title: "LED-лампочки: линейный драйвер и пульсация",
//     url: "https://habr.com/ru/rss/post/579146/?fl=ru",
//     allItemsCount: 0,
//     oldItemsCount: 0,
//     iconPath: "",
//     rssFolderId: "",
//     filters: [],
//   },
// ];

// rssfeeds.forEach((val: any) => database.put(val));

// database.serialize(function () {
//   database.run(`CREATE TABLE rssfeed (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         title TEXT,
//         url TEXT)`);

//     const stmt = database.prepare("INSERT INTO lorem VALUES (?)");
//     for (let i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//     }
//     stmt.finalize();

//     database.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
//       console.log(row.id + ": " + row.info);
//     });
// });

export default database;
