const jBDPrueba={
    collections : [
        {
            "idCollection": 1,
            "name": "Persona",
            "description": "Una persona",
            "fields":[
                {
                    "name":"Nombre",
                    "type": {"name":"string"}
                },
                {
                    "name":"Apellido",
                    "type": {"name":"string"}
                },
                {
                    "name":"Edad",
                    "type": {"name":"number"}
                },
            ]
        },
        {
            "idCollection": 2,
            "name": "Mascota",
            "description": "La mascota",
            "fields":[
                {
                    "name":"Nombre",
                    "type": {"name":"string"}
                },
                {
                    "name":"Raza",
                    "type": {"name":"string"}
                },
                {
                    "name":"Edad",
                    "type": {"name":"number"}
                },
            ]
        },
        {
            "idCollection": 3,
            "name": "Documento_Identidad",
            "description": "Documento de una persona",
            "fields":[
                {
                    "name":"Nombre_Documento",
                    "type": {"name":"string"}
                },
                {
                    "name":"Numero_Documento",
                    "type": {"name":"varchar2(25)"}
                },
            ]
        },
    ],
    relations:[
        {
            "collectionA":"Persona",
            "collectionB":"Mascota",
            "relation": "ONE-TO-MANY",
            "Identification": "tiene"
        },{
            "collectionA":"Persona",
            "collectionB":"Documento_Identidad",
            "relation": "ONE-TO-ONE",
            "Identification": "posee"
        },

    ]

};

function procesaColeccionMermaid(coleccion){
    let mermaidColeccion=coleccion.name;
    if (coleccion.fields){
        mermaidColeccion=mermaidColeccion+ " {\n";

        for (let f=0; f< coleccion.fields.length; f++ ){
            let field = coleccion.fields[f];
            if (field.name && field.type){
                // base obligatoria
                mermaidColeccion=mermaidColeccion+ field.type.name + "  " + field.name + " \n";

            }
        }

        mermaidColeccion=mermaidColeccion+ " }\n";
    }


    console.log(coleccion);
    return mermaidColeccion;
}

function transformaMermaid ( jsonBD ){

    let mermaidLanguage="erDiagram  \n";

    for (let x=0; x< jsonBD.collections.length; x++ ){
        let coleccion= jsonBD.collections[x];
        mermaidLanguage= mermaidLanguage + procesaColeccionMermaid(coleccion);
    }

    return mermaidLanguage;

}

console.log(transformaMermaid(jBDPrueba));
//console.log(transformaMermaid(jBDPrueba.collections[0].relations));