'use client'

import React from "react";
import mermaid from "mermaid";

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

export default class MermaidDiagram extends React.Component {
    componentDidMount() {
      mermaid.contentLoaded();
    }
    render() {
      return <div className="mermaid">{mermaidCode}</div>;
    }
  }