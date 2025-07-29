import { AnimatedGridParams } from "@/components/animated-grid/animated-grid-types";
import defaultParamsRaw from "@/app/components/animated-grid/default-params.json";

const defaultParams: AnimatedGridParams = {
  ...defaultParamsRaw,
  starShape: defaultParamsRaw.starShape as AnimatedGridParams["starShape"],
};

export default defaultParams;
