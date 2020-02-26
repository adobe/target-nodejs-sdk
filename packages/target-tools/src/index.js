import { getLogger } from "./logger";
import { uuid } from "./lodash";

const TargetTools = {
  getLogger,
  createUUID: () => uuid()
};

export default TargetTools;
