import rng from "./rng";
import v4 from "./v4";

export default function uuid() {
  return v4(rng);
}
