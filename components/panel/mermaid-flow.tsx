'use client'

import React, { useEffect } from "react";
import mermaid from "mermaid";


const MermaidComponent = () => {

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
