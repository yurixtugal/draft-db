"use client";

import React, { useEffect } from "react";
import mermaid from "mermaid";
import { DraftWithCollection } from "@/types/types";
import { parseToMermaid } from "@/lib/mermaidUtils/util";
import styles from './mermaid.module.css'



interface DrawDraftInterface {
  draft: DraftWithCollection;
}

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

const dMermaidClass ={
  'SM':styles.sm,
  'MD':styles.md,
  'LG':styles.lg,
  'XL':styles.xl,
}

const MermaidComponent = ({ draft }: DrawDraftInterface) => {
  

  const mermaidCode = parseToMermaid({ draft });
  let mermaidClass = dMermaidClass['SM'];
  if (draft && draft.collections){
    if (draft.collections.length>5){
      mermaidClass = dMermaidClass['MD'];
    }
    if (draft.collections.length>10){
      mermaidClass = dMermaidClass['LG'];
    }
    if (draft.collections.length>15){
      mermaidClass = dMermaidClass['XL'];
    }
  }

  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return (
    
      <div className={'mermaid '+ mermaidClass}>{mermaidCode}</div>
    );
};

export default MermaidComponent;
