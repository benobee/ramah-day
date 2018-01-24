import controller from "./core/controller";
import Events from "./core/events";

const App = {
    init () {
        controller.init();
        Events.on("app-loaded", () => {
            console.log("app loaded");
        });
        Events.emit("app-loaded");
    },
    cacheDOM () {

    },
    execute () {

    }
};

window._CustomProductViewApp = App;

App.init();