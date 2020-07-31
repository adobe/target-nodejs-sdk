import isArray from "./isArray";

function join(joiner, collection) {
  if (!isArray(collection)) {
    return "";
  }

  return collection.join(joiner || "");
}

export default join;
