import keys from "./keys";
import arrayEach from "./_arrayEach";

const baseEach = (iteratee, collection) => {
  arrayEach(key => iteratee(collection[key], key), keys(collection));
};

export default baseEach;
