import compose from "compose-function";
import { withRouter } from "./withRouter";
import { withAuthContext } from "./withAuthContext";

export const withProviders = compose(withRouter, withAuthContext);
