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
    theme: "base",
    securityLevel: "loose",
    themeVariables: {
      'primaryColor': '#1f2020',
      'primaryTextColor': 'white',
      'primaryBorderColor': '#81B1DB',
      'lineColor': 'white',
      'secondaryColor': 'white',
      'tertiaryColor': 'white'
    },
    themeCSS: `
    .attributeBoxOdd {
      fill: hsl(0, 0%, 32%);
      stroke: '#81B1DB';
    }
    .attributeBoxEven {
      fill: hsl(0, 0%, 22%);
      stroke: '#81B1DB';
    }
    `
    
  });

  const mermaidCode = parseToMermaid({ draft });

  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return <div className="mermaid">{mermaidCode}</div>;
};

export default MermaidComponent;
