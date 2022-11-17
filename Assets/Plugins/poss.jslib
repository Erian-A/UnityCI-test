mergeInto(LibraryManager.library, {


    EnviarJSONCloud: function(objectName, callback, fallback) {
        var parsedObjectName = Pointer_stringify(objectName);
        var parsedCallback = Pointer_stringify(callback);
        var parsedFallback = Pointer_stringify(fallback);


        var firestore = firebase.firestore();
        //const docRef = firestore.doc("new/Titans");
        /*
        docRef.set({
            id : "SPD"
        })
        */

        var docRef = firestore.collection("samples");

        //var varTeste = "name";

        /*
        docRef.doc("Jovens").withConverter(cityConverter).get().then((doc) => {
            if (doc.exists){
                // Convert to City object
                var city = doc.data();
                // Use a City instance method
                console.log(city.toString());
            } else {
                console.log("No such document!");
            }}).catch((error) => {
                console.log("Error getting document:", error);
            });
        */
  
        
        docRef.withConverter(cityConverter).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data(), doc.exists);
                var city = doc.data();
                // Use a City instance method
                console.log(city.toString());
                if (doc.id == "Jovens"){
                    console.log("uhuuuuu");
                }
            });
        });    
        
 
        
        instanciaTeste.Module.SendMessage(parsedObjectName, parsedCallback);

      
    },
});


// tentar acessar um campo --> doc.data().city 
// testar .docs na coleção x
// res.docs[0].data(); x


// Testar toObject passando um objeto do C#
// criar variaveis com nome do campo para automatizar x



///// ESTAVA NO FirestoreGet

/*

    ABC: function(colecao, documento, objectName, callback) {
        var parsedColecao = Pointer_stringify(colecao);
        var parsedObjectName = Pointer_stringify(objectName);
        var parsedDocumento = Pointer_stringify(documento);
        var parsedCallback = Pointer_stringify(callback);

        var firestore = firebase.firestore();
        docRef = firestore.collection(parsedColecao).doc(parsedDocumento);

        var x = {
                "pratica1":{
                    "nome":"Treinamento Pipeta",
                    "atividades":[{
                        "nome":"Atv1",
                        "passos":[{
                            "acao":"PIPETAR",
                            "objeto":"MICROTUBO_1",
                            "erros":[]
                            },
                            {
                                "acao":"PIPETAR",
                                "objeto":"SOLUCAO_1",
                                "erros":[]
                            },
                            {
                                "acao":"DESCARTAR",
                                "objeto":"PONTEIRA",
                                "erros":[]
                            }
                        ]
                    },
                    {
                        "nome":"Atv2",
                        "passos":[{
                            "acao":"ACOPLAR",
                            "objeto":"PONTEIRA",
                            "erros":[]
                            },
                            {
                                "acao":"PIPETAR",
                                "objeto":"SOLUCAO_1",
                                "erros":[]
                            },
                            {
                                "acao":"DESCARTAR",
                                "objeto":"PONTEIRA",
                                "erros":[]
                            }
                        ]
                    }]
                }
            }


        console.log("Dado: ", x);
        console.log("tipo: ", typeof x);
        console.log("Fim");

        
    },
    
/*
vetorErros[i].parent.get().then(function(querySnapshot) {
                                querySnapshot.forEach(function(docss) {
                                   
                                    console.log("Query interior: ", docss);
                                    console.log(docss.data());
                            });
                        });
*/

/*
PegarAtividade: function(path, objectName, callback) {
    //var parsedColecao = Pointer_stringify(colecao);
    var parsedObjectName = Pointer_stringify(objectName);
    //var parsedDocumento = Pointer_stringify(documento);
    var parsedCallback = Pointer_stringify(callback);
    var parsedPath = Pointer_stringify(path);

    

    var firestore = firebase.firestore();
    
    docRef = firestore.doc(parsedPath);

    docRef.get().then(function(doc) {
        
        stringRetorno = (doc.data().passos).join('-');
        stringRetorno = stringRetorno.concat('-' + doc.data().tipo, '-' + doc.data().descricao);

        instanciaTeste.Module.SendMessage(parsedObjectName, parsedCallback, stringRetorno);
            
        
    });
     
    
},

PegarPasso: function(path, objectName, callback) {
    //var parsedColecao = Pointer_stringify(colecao);
    var parsedObjectName = Pointer_stringify(objectName);
    //var parsedDocumento = Pointer_stringify(documento);
    var parsedCallback = Pointer_stringify(callback);
    var parsedPath = Pointer_stringify(path);

    

    var firestore = firebase.firestore();
    
    docRef = firestore.doc(parsedPath);

    docRef.get().then(function(doc) {
        
        stringRetorno = (doc.data().erros).join('-');
        stringRetorno = stringRetorno.concat('-' + doc.data().tipo, '-' + doc.data().descricao);

        instanciaTeste.Module.SendMessage(parsedObjectName, parsedCallback, stringRetorno);
            
        
    });
     
    
},

PegarErro: function(colecao, documento, objectName, callback) {
    var parsedColecao = Pointer_stringify(colecao);
    var parsedObjectName = Pointer_stringify(objectName);
    var parsedDocumento = Pointer_stringify(documento);
    var parsedCallback = Pointer_stringify(callback);


    var firestore = firebase.firestore();
    
    docRef = firestore.collection(parsedColecao);

    docRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
            if (doc.id == parsedDocumento){
    
                var stringRetorno = doc.data().Acao;
                stringRetorno = stringRetorno.concat('-' + doc.data().Objeto);

                instanciaTeste.Module.SendMessage(parsedObjectName, parsedCallback, stringRetorno);
            }
        });
    });
},

PegarPratica: function(colecao, documento, objectName, callback) {
    var parsedColecao = Pointer_stringify(colecao);
    var parsedObjectName = Pointer_stringify(objectName);
    var parsedDocumento = Pointer_stringify(documento);
    var parsedCallback = Pointer_stringify(callback);


    var stringRetorno;
    var firestore = firebase.firestore();
    
    docRef = firestore.collection(parsedColecao).doc(parsedDocumento);

    docRef.get().then(function(doc) {
        
        stringRetorno = (doc.data().atividades).join('-');
        stringRetorno = stringRetorno.concat('-' + doc.data().tipo, '-' + doc.data().descricao);

        instanciaTeste.Module.SendMessage(parsedObjectName, parsedCallback, stringRetorno);                
    });
},


*/

/*
EnviarObjeto: function(path, objectName){
        var parsedPath = Pointer_stringify(path);
        var parsedObjectName = Pointer_stringify(objectName);

        var firestore = firebase.firestore();
        
        //const docRef = firestore.doc(parsedPath);
        var x = {
            "pratica1":{
                "descricao":"Treinamento Pipeta",
                "tipo" : "Realizada",
                "atividades":[{
                    "descricao":"Atv1",
                    "tipo" : "Realizada",
                    "passos":[{
                        "descricao":"Pipetar - Microtubo_1",
                        "tipo" : "Realizada",
                        "erros": [{    
                            "acao":"PIPETAR",
                            "objeto":"SOLUCAO_1",
                        },
                        {
                                "acao":"DESCARTAR",
                            "objeto":"SOLUCAO_500"
                        
                        }]
                    },
                    {
                        "descricao":"Pipetar - solucao_1",
                        "tipo" : "Realizada",
                        "erros": [{    
                            "acao":"PIPETAR4",
                            "objeto":"SOLUCAO_13"
                        }]
                    },
                    {
                        "descricao":"Descatar - Ponteira",
                        "tipo" : "Realizada",
                        "erros": [{    
                            "acao":"PIPETAR54",
                            "objeto":"SOLUCAO_1234"
                        }]
                    }
                ]
            },
                {
                    "descricao":"Atv2",
                    "tipo" : "Realizada",
                    "passos":[{
                            "descricao":"acoplar - ponteira",
                            "tipo" : "Realizada",
                            "erros" : []    
                        },
                        {
                            "descricao":"Pipetar - solucao_1",
                            "tipo" : "Realizada",
                            "erros" : []
                        },
                        {
                            "descricao":"Descatar - Ponteira",
                            "tipo" : "Realizada",
                            "erros" : []
                        }
                    ]
                }]
            }
        }
        var xyz = {
            "Pratica110":{
                "descricao":"Treinamento Geral",
                "tipo" : "Realizada",
                "atividades":[{
                    "descricao":"Primeira Atividade",
                    "tipo" : "Realizada",
                    "passos":[{
                        "descricao":"Pipetar - Microtubo_1",
                            "tipo" : "Realizada"
                        },
                        {
                            "descricao":"Pipetar - solucao_1",
                                "tipo" : "Realizada"
                        },
                        {
                                "descricao":"Descatar - Ponteira",
                                    "tipo" : "Realizada"
                        }
                    ]
                },
                {
                    "descricao":"Segunda Atividade",
                    "tipo" : "Realizada",
                    "passos":[{
                            "descricao":"acoplar - ponteira",
                            "tipo" : "Realizada"
                        },
                        {
                                "descricao":"Pipetar - solucao_1",
                                    "tipo" : "Realizada"
                        },
                        {
                            "descricao":"Descatar - Ponteira",
                                    "tipo" : "Realizada"
                        }
                    ]
                }]
            }
        }                   
           
        var nomePratica;
        var dadosPratica = [];
        var dadosAtividades = [];
        var dadosPassos = [];
        var refAtividades = [];
        var refPassos = [];
        var refPassosDoc = [];
        var dadosErros = [];
        var refErros = [];
        var refErrosDoc = [];
        
        // Aqui
        Object.keys(x).forEach(function(value, key) {

            nomePratica = value;
            // Aqui
            dadosPratica.push({descricao : x[value].descricao, tipo : x[value].tipo});
        
            // Aqui
            x[value].atividades.forEach(function(v, k) {
        
                dadosAtividades.push({descricao : v.descricao, tipo : v.tipo});
                refAtividades.push("/atividades/" + v.descricao);
            
            
            
                v.passos.forEach(function(valor, chave){
                    
                    refPassos.push("/passos/" + v.descricao + " Passo " + chave);
                    refPassosDoc.push("/passos/" + v.descricao + " Passo " + chave);
										//console.log(Object.keys(valor.erros).lenght);
                    valor.erros.forEach(function(valor_III, chave_III){
                         //console.log("Buscando erros: " + valor_III.acao);
                         dadosErros.push({Acao : valor_III.acao, Objeto : valor_III.objeto});						
                    		 refErros.push("/erros/" + "E" + chave_III + " P" + chave + " A" + k);
                             refErrosDoc.push("/erros/" + "E" + chave_III + " P" + chave + " A" + k);
                    })
                    
                    dadosPassos.push({descricao : valor.descricao, tipo : valor.tipo, erros : refErros});
                    refErros = [];
                })
                dadosAtividades[k].passos = refPassos;
                refPassos = [];
            })
        });
        
       
        dadosPratica[0].atividades = refAtividades;
        var tamanho = Object.keys(dadosAtividades).length;
        var tamanhoPassos = Object.keys(refPassosDoc).length;
        var tamanhoErros = Object.keys(dadosErros).length;


        var RefDoc;
        var docPassos;
        var docErros;
        
        // Inserir Praticas
        const docRef = firestore.collection("praticas").doc(nomePratica);
        docRef.set(dadosPratica[0]);


        // Inserir Atividades
        for (var i = 0; i < tamanho; i++){
            RefDoc = firestore.doc(refAtividades[i]);
            RefDoc.set(dadosAtividades[i]);
        }

         // Inserir Passos
         for (var j = 0; j < tamanhoPassos; j++){
            //console.log("olhando passos: ", dadosPassos[j]);
            docPassos = firestore.doc(refPassosDoc[j]);
            docPassos.set(dadosPassos[j]);
        }

        // Inserir Erros
        for (var k = 0; k < tamanhoErros; k++){
            docErros = firestore.doc(refErrosDoc[k]);
            docErros.set(dadosErros[k]);
        }
         
    },

*/