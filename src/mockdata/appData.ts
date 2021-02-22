import { AppDataListTypes } from "~/types/appData";

const appData: AppDataListTypes = [
  {
    moduleId: "a",
    style: {
      basic: {
        display: { width: 200, height: 200, zIndex: 20, position: "relative" },
        border: {
          radiusTopLeft: 100,
          radiusTopRight: 100,
          radiusBottomLeft: 100,
          radiusBottomRight: 100,
        },
        backgroundGradient: {
          gradient: [
            { color: "rgba(150, 233, 8, 1)", transition: 31 },
            { color: "rgb(94, 201, 130)", transition: 59 },
            { color: "rgb(133, 249, 203)", transition: 100 },
          ],
          gradientDirections: "center",
        },
        textShadow: [
          {
            shiftDown: 1,
            color: "rgba(184, 233, 134, 1 )",
            shiftRight: 1,
          },
          {
            color: "rgba(19, 92, 1, 1 )",
            shiftRight: -1,
            shiftDown: -1,
          },
        ],
        font: {
          align: "center",
          fontSize: 90,
          lineHeight: 200,
          fontWeight: "bold",
          color: "rgba(65, 117, 5, 1)",
        },
        boxShadow: [
          {
            inset: true,
            spread: 20,
            color: "rgba(65, 117, 5, 0.47 )",
            blur: 8,
          },
          {
            color: "rgba(65, 117, 5, 0.58 )",
            inset: true,
            blur: 2,
            spread: 8,
          },
          {
            inset: true,
            color: "rgba(235, 234, 242, 0.21 )",
            shiftRight: 4,
            shiftDown: 56,
            spread: -20,
          },
          {
            color: "rgba(250, 249, 253, 1 )",
            inset: true,
            spread: 4,
          },
          {
            inset: true,
            color: "rgba(79, 51, 192, 0.08 )",
            spread: -3,
            shiftDown: -103,
          },
          { blur: 20, color: "rgba(43, 67, 17, 0.35 )" },
        ],
      },
      content: {},
    },
    content: {},
    event: {},
    type: "Root",
  },
  {
    moduleId: "a",
    layout: { w: 10, h: 7, x: 1, y: 0, i: "a", moved: false, static: false },
    style: {
      basic: {
        display: { width: 200, height: 200, zIndex: 20, position: "relative" },
        border: {
          radiusTopLeft: 100,
          radiusTopRight: 100,
          radiusBottomLeft: 100,
          radiusBottomRight: 100,
        },
        backgroundGradient: {
          gradient: [
            { color: "rgba(150, 233, 8, 1)", transition: 31 },
            { color: "rgb(94, 201, 130)", transition: 59 },
            { color: "rgb(133, 249, 203)", transition: 100 },
          ],
          gradientDirections: "center",
        },
        textShadow: [
          {
            shiftDown: 1,
            color: "rgba(184, 233, 134, 1 )",
            shiftRight: 1,
          },
          {
            color: "rgba(19, 92, 1, 1 )",
            shiftRight: -1,
            shiftDown: -1,
          },
        ],
        font: {
          align: "center",
          fontSize: 90,
          lineHeight: 200,
          fontWeight: "bold",
          color: "rgba(65, 117, 5, 1)",
        },
        boxShadow: [
          {
            inset: true,
            spread: 20,
            color: "rgba(65, 117, 5, 0.47 )",
            blur: 8,
          },
          {
            color: "rgba(65, 117, 5, 0.58 )",
            inset: true,
            blur: 2,
            spread: 8,
          },
          {
            inset: true,
            color: "rgba(235, 234, 242, 0.21 )",
            shiftRight: 4,
            shiftDown: 56,
            spread: -20,
          },
          {
            color: "rgba(250, 249, 253, 1 )",
            inset: true,
            spread: 4,
          },
          {
            inset: true,
            color: "rgba(79, 51, 192, 0.08 )",
            spread: -3,
            shiftDown: -103,
          },
          { blur: 20, color: "rgba(43, 67, 17, 0.35 )" },
        ],
      },
      content: {},
    },
    content: { text: "禅" },
    event: {},
    type: "Conterner",
  },
  {
    moduleId: "b",
    layout: { w: 8, h: 2, x: 2, y: 7, i: "b", moved: false, static: false },
    style: {
      basic: {
        display: { width: 200 },
        border: {
          borderPosition: {
            borderTop: false,
            borderRight: false,
            borderBottom: false,
            borderLeft: false,
            border: false,
          },
        },
      },
      trigger: {
        backgroundCommon: { backgroundColor: "rgba(126, 211, 33, 1)" },
        display: { height: 40 },
        font: {
          lineHeight: 40,
          align: "center",
          color: "rgba(255, 255, 255, 1)",
          fontWeight: "bold",
        },
        border: {
          borderPosition: {
            borderTop: false,
            borderRight: false,
            borderBottom: false,
            borderLeft: false,
            border: true,
          },
          radiusTopLeft: 20,
          radiusTopRight: 20,
          radiusBottomLeft: 20,
          radiusBottomRight: 20,
        },
        textShadow: [{ shiftDown: 1, color: "rgba(65, 117, 5, 1 )", blur: 2 }],
      },
      overlay: { backgroundCommon: { backgroundColor: "red" } },
      button: {
        display: { width: 100, height: 100 },
        backgroundCommon: { backgroundColor: "yellow" },
      },
      content: {},
      header: {},
      footer: {},
      article: {},
      close: {},
    },
    content: { text: "这是一个弹窗" },
    event: {},
    type: "Modal",
  },
  {
    moduleId: "c",
    layout: { w: 4, h: 11, x: 4, y: 9, i: "c", moved: false, static: false },
    style: {
      basic: {
        display: { width: 300, height: 300 },
        backgroundCommon: {
          backgroundColor: "rgba(54, 79, 29, 1)",
          imageUrl: "",
        },
        font: {
          align: "center",
          lineHeight: 260,
          fontSize: 188,
          fontWeight: "bold",
          color: "rgba(255, 255, 255, 1)",
        },
        textShadow: [
          { shiftDown: 2, color: "rgba(79, 143, 5, 1 )", blur: 2 },
          { color: "rgba(80, 146, 5, 1 )", shiftDown: 4 },
          { color: "rgba(90, 163, 7, 1 )", shiftDown: 6 },
          { color: "rgba(11, 4, 49, 0.65 )", shiftDown: 8, blur: 8 },
        ],
        backgroundGradient: {
          gradient: [
            { color: "rgba(245, 166, 35, 0)", transition: 1 },
            { color: "rgba(245, 166, 35, 1)", transition: 52 },
            { color: "rgba(208, 2, 27, 1)", transition: 100 },
          ],
          gradientDirections: "top",
        },
      },
    },
    content: { text: "c" },
    event: {},
    type: "Conterner",
  },
];

export default appData;
