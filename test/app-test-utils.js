import React from "react";
import { render as rtlRender } from "@testing-library/react";
import {AppProviders} from "context/index";

function render(UI, { ...options } = {}) {
  return rtlRender(
    <AppProviders>
      <UI />
    </AppProviders>
  );
}

export * from "@testing-library/react";
// override the built-in render with our own
export { render };
