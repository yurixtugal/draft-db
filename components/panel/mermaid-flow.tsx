'use client'

import React, { useEffect } from "react";
import mermaid from "mermaid";
import { DraftWithCollection } from "@/types/types";

interface DrawDraftInterface {
  draft: DraftWithCollection;
}

const MermaidComponent = ( {draft}: DrawDraftInterface ) => {

  mermaid.initialize({
    startOnLoad: true,
    theme: "default",
    securityLevel: "loose",
});


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

        `;
  useEffect(() => {
    mermaid.contentLoaded();
  }
  , []);
  
  return <div className="mermaid">{mermaidCode}</div>
}
 
export default MermaidComponent;
