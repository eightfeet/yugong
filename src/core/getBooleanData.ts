import { ArgumentsBoolean } from "~/types/appData";

const getBooleanData = ({
  comparableAverageA,
  comparableAverageB,
  method,
}: ArgumentsBoolean["data"]) => {
  switch (method) {
    case "===":
      return comparableAverageA === comparableAverageB;
    case ">=":
      return comparableAverageA >= comparableAverageB;
    case "<":
      return comparableAverageA < comparableAverageB;
    case "<=":
      return comparableAverageA <= comparableAverageB;
    case "==":
      // eslint-disable-next-line eqeqeq
      return comparableAverageA == comparableAverageB;
    case "&&":
      return comparableAverageA && comparableAverageB;
    case "||":
      return comparableAverageA && comparableAverageB;
    default:
      return false;
  }
};

export default getBooleanData;
