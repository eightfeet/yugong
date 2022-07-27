import ResizableBox from "../ResizableBox";
import useDemoConfig from "../useDemoConfig";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function Bubble() {
  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "linear",
    useR: true,
  });

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as unknown as Date,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        elementType: "bubble",
      },
    ],
    []
  );

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <ResizableBox>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            interactionMode: "closest",
            getDatumStyle: (datum) =>
              ({
                circle: { r: datum.originalDatum.radius },
              } as any),
          }}
        />
      </ResizableBox>
    </>
  );
}
