// src/app/registry.tsx
"use client";

import { useState } from "react";
import { StyleSheetManager } from "styled-components";
import { useServerInsertedHTML } from "next/navigation";
import { GlobalStyle } from "@/styles/global";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(
    () => new (require("styled-components").ServerStyleSheet)()
  );

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    return (
      <>
        <GlobalStyle />
        {children}
      </>
    );
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <GlobalStyle />
      {children}
    </StyleSheetManager>
  );
}
