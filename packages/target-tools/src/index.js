import { getLogger } from "./logger";
import { uuid } from "./lodash";

const TargetTools = {
  getLogger,
  createUUID: () => uuid(),
  noop: () => undefined
};

export default TargetTools;
