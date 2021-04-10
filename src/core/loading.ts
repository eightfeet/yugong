import Loading, { LoadingParameters } from "@eightfeet/loading";

const paramsData: LoadingParameters = {
  length: 50, // 由几个vertices组成默认12个
  style: {
    // 定义样式 {overlay: 覆盖层, content: 内容区, vertices: 组成节点}
    overlay: {
      backgroundColor: "rgba(0,0,0,0)",
    },
    content: {
      backgroundColor: "rgba(0,0,0,0)",
    },
    vertices: {
      height: "3px",
      width: "3px",
      borderRadius: "3px",
      backgroundColor: "rgba(0,0,0,0.2)",
      size: "20px",
    },
  },
};

const loading = (params: LoadingParameters) => new Loading(params);

export default loading(paramsData);
