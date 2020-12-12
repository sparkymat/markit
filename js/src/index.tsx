import * as React from "react";
import * as ReactDOM from "react-dom";

const initializeMenu = (element: HTMLElement) => {
  ReactDOM.render(
    (<IngredientsPage />),
    element,
  );
};

document.addEventListener("DOMContentLoaded", (event) => {
  const element = document.getElementById("js-menu");
  if (element) {
    initializeMenu(element);
  }
});
