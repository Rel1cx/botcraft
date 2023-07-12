import "core-js/stage/4";
import "core-js/features/object/has-own";

import { enableMapSet, setAutoFreeze } from "immer";

enableMapSet();
setAutoFreeze(true);
