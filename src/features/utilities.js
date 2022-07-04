import { setFolder } from "./filesystemSlice";
import { store } from "../app/store.js";
import { overwritePage } from "./pageSlice";

export async function showDirContents(dirHandlePromise) {
  if (!dirHandlePromise) return;
  let handle = await dirHandlePromise;
  let json = await handle.getFileHandle("page.json", {
    create: true,
  });
  const writable = await json.createWritable();
  await writable.write(JSON.stringify(store.getState().page));
  await writable.close();
  // console.log(handle?.values());
  // for await (const entry of handle.values()) {
  //   let file = await entry.getFile();
  //   console.log(file);
  // }
  return;
}

export async function permitFSAccess() {
  let dir;

  try {
    dir = await window.showDirectoryPicker({
      startIn: "downloads",
    });
    await dir
      .getFileHandle("page.json", {
        create: false,
      })
      .then((fileHandle) => fileHandle.getFile())
      .then((file) => file.text())
      .then((text) => {
        let json = JSON.parse(text);
        console.log(json);
        store.dispatch(overwritePage(json));
      })
      .catch((error) => {
        store.dispatch(setFolder({ folder: true }));
        console.log("filenotfound");
        return dir;
      });

    store.dispatch(setFolder({ folder: true }));
    return dir;
    // for await (const entry of directory.values()) {
    //   console.log(entry);
    // }
  } catch (e) {
    console.log(e);
  }
}
