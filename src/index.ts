import { start } from "./start";

if (process.env !== "DEVELOPMENT") {
  addServiceWorker();
}

start();

function addServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        console.log("Service worker registration succeeded:", registration);
      })
      .catch(function (error) {
        console.log("Service worker registration failed:", error);
      });
  } else {
    console.log("Service workers are not supported.");
  }
}
