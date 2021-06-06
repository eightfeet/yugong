import { SortableContainer } from "react-sortable-hoc";
import { Api } from "~/types/appData";
import { ExposeApi } from "~/types/modules";
import ApiItem from "./ApiItem";

const ApiList = SortableContainer(
    ({
      operateApi,
      apiData = [],
      onRemove,
      onChangeUrl,
      onChangeMethod,
      onChangeSetting,
      onHandleUserArg,
      onchangeDatamap,
      sortable,
    }: {
      operateApi: ExposeApi[];
      apiData?: Api[];
      onRemove?: (index: number, data: Api) => void;
      onchangeDatamap: (index: number, data: Api['dataMap']) => void;
      onChangeUrl: (index: number) => any;
      onChangeMethod: (index: number) => any;
      onChangeSetting: (index: number) => any;
      onHandleUserArg: (
        index: number,
        type: "body" | "successPublic" | "errorPublic" 
      ) => void;
      sortable?: boolean;
    }) => (
      <div>
        {operateApi?.map((element, index) => (
          <ApiItem
            key={`${element.apiId}${index}`}
            onchangeDatamap={(data) => onchangeDatamap(index, data)}
            index={index}
            sortable={sortable}
            currentIndex={index}
            element={element}
            apiData={apiData}
            onRemove={onRemove}
            onChangeUrl={onChangeUrl}
            onChangeMethod={onChangeMethod}
            onChangeSetting={onChangeSetting}
            onHandleUserArg={onHandleUserArg}
          />
        ))}
      </div>
    )
  );

  export default ApiList