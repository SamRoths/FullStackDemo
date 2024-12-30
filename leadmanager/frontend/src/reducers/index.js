import { combineReducers } from "redux";
import leads from "./leads";
import errors from "./errors"
import messages from "./messages";
import auth from "./auth"
import ssgroups from "./ssgroups";

export default combineReducers({
    leads,
    errors,
    messages,
    auth,
    ssgroups
});