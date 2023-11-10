"use client";

import React, { useEffect } from "react";
import mermaid from "mermaid";
import { DraftWithCollection } from "@/types/types";
import { parseToMermaid } from "@/lib/mermaidUtils/util";

interface DrawDraftInterface {
  draft: DraftWithCollection;
}

const MermaidComponent = ({ draft }: DrawDraftInterface) => {
  mermaid.initialize({
    startOnLoad: true,
    theme: "default",
    securityLevel: "loose",
  });

  const mermaidCode = parseToMermaid({ draft });

  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return <div className="mermaid">{mermaidCode}</div>;
};

export default MermaidComponent;
