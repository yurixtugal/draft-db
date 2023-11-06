'use client'

import React, { useEffect } from "react";
import mermaid from "mermaid";
import { DraftWithCollection } from "@/types/types";
import {parseToMermaid} from "@/lib/mermaidUtils/util";


interface DrawDraftInterface {
  draft: DraftWithCollection;
}

const MermaidComponent = ( {draft}: DrawDraftInterface ) => {

  console.log(draft)

  mermaid.initialize({
    startOnLoad: true,
    theme: "default",
    securityLevel: "loose",
});

/*
const mermaidCode = `
erDiagram
CAR ||--o{ NAMED-DRIVER : allows
CAR {
    string registrationNumber
    string make
    string model
}
PERSON ||--o{ NAMED-DRIVER : is
PERSON {
    string firstName
    string lastName
    int age
}

        `;*/
  const mermaidCode = parseToMermaid({draft});

  useEffect(() => {
    mermaid.contentLoaded();
  }
  , []);
  
  return <div className="mermaid">{mermaidCode}</div>
}
 
export default MermaidComponent;
