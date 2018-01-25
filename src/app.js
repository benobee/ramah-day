import controller from "./core/controller";
import Events from "./core/events";

const App = {
    init () {
        controller.init(Events);
    }
};

window.onload = App.init();