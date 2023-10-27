
import {createStore} from "vuex";
import home from "./modules/home";
import add from "./modules/add";

export default createStore({
    modules:{
        home,
        add
    }
})