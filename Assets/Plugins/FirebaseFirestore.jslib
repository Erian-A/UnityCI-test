mergeInto(LibraryManager.library, {


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
                                "objeto":"SOLUCAO_1"
                            }]
                        },
                        {
                            "descricao":"Pipetar - solucao_1",
                            "tipo" : "Realizada",
                            "erros": [{    
                                "acao":"PIPETAR",
                                "objeto":"SOLUCAO_1"
                            }]
                        },
                        {
                            "descricao":"Descatar - Ponteira",
                            "tipo" : "Realizada",
                            "erros": [{    
                                "acao":"PIPETAR",
                                "objeto":"SOLUCAO_1"
                            }]
                        }
                    ]
                },
                {
                    "descricao":"Atv2",
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
        
        Object.keys(xyz).forEach(function(value, key) {
            nomePratica = value;
          dadosPratica.push({descricao : xyz[value].descricao, tipo : xyz[value].tipo});
          //console.log(value);
        
          console.log("Valor do primeiro Nível: " + value);
          //console.log(x[value].atividades[0].passos[0].size);
          
          xyz[value].atividades.forEach(function(v, k) {
            //console.log("Valor do segundo Nível: " + v.descricao);
        
            dadosAtividades.push({descricao : v.descricao, tipo : v.tipo});
            refAtividades.push("/atividades/" + v.descricao);
            
            
            
            v.passos.forEach(function(valor, chave){
                    //console.log("inner:" +valor.acao);
                dadosPassos.push({descricao : valor.descricao, tipo : valor.tipo, erros : []});
                refPassos.push("/passos/" + v.descricao + " Passo " + chave);
                refPassosDoc.push("/passos/" + v.descricao + " Passo " + chave);
            })
            dadosAtividades[k].passos = refPassos;
            refPassos = [];
            
            
          })
          
          
        });
        
       
        dadosPratica[0].atividades = refAtividades;
        //console.log(refPassos);
        //console.log(nomePratica);
        //console.log(dadosPratica[0]);
        //console.log(dadosAtividades);
        //console.log(dadosPassos);
        //console.log(refAtividades);
        //console.log(Object.keys(dadosPassos).length);
        var tamanho = Object.keys(dadosAtividades).length;
        var tamanhoPassos = Object.keys(refPassosDoc).length;
        //console.log(tamanho);   

        //  PERGUNTAR INTERFACE EXCEÇÃO
        // PERGUNTAR SOBRE COMO FICA A ESTRUTURA SEM ERROS

        var RefDoc;
        var docPassos;
        
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
            console.log("olhando passos: ", dadosPassos[j]);
            docPassos = firestore.doc(refPassosDoc[j]);
            docPassos.set(dadosPassos[j]);
        }
         
    },



    EnviarNovaAtividade: function(path, objectName, descricao, tipo, primeiraRefPassoDoVetor) {
        var parsedPath = Pointer_stringify(path);
        var parsedObjectName = Pointer_stringify(objectName);
        var parsedDescricao = Pointer_stringify(descricao);
        var parsedTipo = Pointer_stringify(tipo);
        var parsedPassoRef = Pointer_stringify(primeiraRefPassoDoVetor);


        var firestore = firebase.firestore();
        
        const docRef = firestore.doc(parsedPath);

        //conts refDoVetor = firestore.doc(parsedPassoRef);

        docRef.set({
            descricao : parsedDescricao,
            passos : [parsedPassoRef],
            tipo: parsedTipo
        });

    },

    EnviarNovoErro: function(path, objectName, acao, objeto) {
        var parsedPath = Pointer_stringify(path);
        var parsedObjectName = Pointer_stringify(objectName);
        var parsedAcao = Pointer_stringify(acao);
        var parsedObjeto = Pointer_stringify(objeto);

        // Pegar referencia
        var firestore = firebase.firestore();

        // Qual doc que vai ter dados inseridos
        const docRef = firestore.doc(parsedPath);

        docRef.set({
            Acao: parsedAcao,
            Objeto : parsedObjeto
        });
    },

    EnviarNovoPasso: function(path, objectName, descricao, tipo, primeiraRefErroDoVetor) {
        var parsedPath = Pointer_stringify(path);
        var parsedObjectName = Pointer_stringify(objectName);
        var parsedDescricao = Pointer_stringify(descricao);
        var parsedTipo = Pointer_stringify(tipo);
        var parsedErroRef = Pointer_stringify(primeiraRefErroDoVetor);

        // Pegar referencia
        var firestore = firebase.firestore();

        // Qual doc que vai ter dados inseridos
        const docRef = firestore.doc(parsedPath);

        //conts refDoVetor = firestore.doc(parsedErroRef);

        docRef.set({
            descricao : parsedDescricao,
            erros : [parsedErroRef],
            tipo: parsedTipo
        });
    },

    EnviarNovaPratica: function(path, objectName, descricao, tipo, primeiraRefAtividadeDoVetor) {
        var parsedPath = Pointer_stringify(path);
        var parsedObjectName = Pointer_stringify(objectName);
        var parsedDescricao = Pointer_stringify(descricao);
        var parsedTipo = Pointer_stringify(tipo);
        var parsedAtividadeRef = Pointer_stringify(primeiraRefAtividadeDoVetor);

        // Pegar referencia
        var firestore = firebase.firestore();

        // Qual doc que vai ter dados inseridos
        const docRef = firestore.doc(parsedPath);

        //conts refDoVetor = firestore.doc(parsedAtividadeRef);

        docRef.set({
            atividades : [parsedAtividadeRef],
            descricao : parsedDescricao,
            tipo: parsedTipo
        });
    },

    AcrescentarValorVetor: function(path, objectName, nomeVetor, valorVetor) {
        var parsedPath = Pointer_stringify(path);
        var parsedObjectName = Pointer_stringify(objectName);
        var parsedNomeVetor = Pointer_stringify(nomeVetor);
        var parsedValorVetor = Pointer_stringify(valorVetor);

        // Pegar referencia
        var firestore = firebase.firestore();

        // Qual doc que vai ter dados inseridos
        const docRef = firestore.doc(parsedPath);

        const refDoVetor = firestore.doc(parsedValorVetor);

        switch (parsedNomeVetor) {
            case 'passos':
                docRef.update({
                    passos: firebase.firestore.FieldValue.arrayUnion(refDoVetor)
                });
                break;
            case 'erros':
                docRef.update({
                    erros: firebase.firestore.FieldValue.arrayUnion(refDoVetor)
                });
                break;
            case 'atividades':
                docRef.update({
                    atividades: firebase.firestore.FieldValue.arrayUnion(refDoVetor)
                });
                break;
            default:
                console.log("Nome de vetor nao encontrado");
        }
    },
});
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
                            "erros": []
                        },
                        {
                                "descricao":"Pipetar - solucao_1",
                                    "tipo" : "Realizada",
                                    "erros": []
                        },
                        {
                            "descricao":"Descatar - Ponteira",
                            "tipo" : "Realizada",
                            "erros": []
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
                    })
                    
                    dadosPassos.push({descricao : valor.descricao, tipo : valor.tipo, erros : refErros});
                   refErros = [];
                })
                dadosAtividades[k].passos = refPassos;
            })
        });
        
       //console.log(dadosErros);
        dadosPratica[0].atividades = refAtividades;
        var tamanho = Object.keys(dadosAtividades).length;
        var tamanhoPassos = Object.keys(refPassosDoc).length;
        
        var tamanhoErros = Object.keys(dadosErros).length;
        
        console.log(tamanhoErros);
        //console.log(nomePratica);
        //console.log(dadosPratica[0]);
        //console.log(dadosAtividades);
      console.log(dadosPassos);
        //console.log(refAtividades);
        //console.log(refErros);
        //console.log(dadosErros);

/*
    PegarDados: function(colecao, documento, objectName, callback) {
        var parsedColecao = Pointer_stringify(colecao);
        var parsedObjectName = Pointer_stringify(objectName);
        var parsedDocumento = Pointer_stringify(documento);
        var parsedCallback = Pointer_stringify(callback);

        // Variavel que armazenara todas as informacoes de uma pratica
        var objetoDados;
    

        // Firebase
        var firestore = firebase.firestore();
        docRef = firestore.collection(parsedColecao).doc(parsedDocumento);

        
        docRef.get().then(function(doc){

            // Adicionando as informacoes da pratica em uma variavel
            objetoDados = {
                'tipo' : doc.data().tipo,
                'descricao' : doc.data().descricao
            };

            // Acessando o vetor de referencias de atividades de uma pratica
            doc.data().atividades.forEach(function(item, index){

                
                // Como as referencias das atividades estao sendo armazenadas como string,
                // é necessário pegar uma DocumentReference a partir da string --> *
                firestore.doc(item).get().then(function(document_1){
                    
                    // Adicionando as informacoes de uma determinada atividade na variavel
                    objetoDados['Atividade ' + (index + 1) + ' tipo'] = document_1.data().tipo;
                    objetoDados['Atividade ' + (index + 1) + ' descricao'] = document_1.data().descricao;


                    // Acessando o vetor de referencias de passos de uma atividade
                    document_1.data().passos.forEach(function(item1, index1){

                        // *
                        firestore.doc(item1).get().then(function(document_2){
                            
                            // Adicionando as informacoes de um determinado passo de uma atividade na variavel
                            objetoDados['A' + (index + 1) + ' P' + (index1 + 1) + ' descricao'] = document_2.data().descricao;
                            objetoDados['A' + (index + 1) + ' P' + (index1 + 1) + ' tipo'] = document_2.data().tipo;

                            // Acessando o vetor de referencias de erros de um passo
                            document_2.data().erros.forEach(function(item2, index2){

                                // *
                                firestore.doc(item2).get().then(function(document_3){

                                    // Adicionando as informacoes de um erro de um passo na variavel
                                    objetoDados['A' + (index + 1) + ' P' + (index1 + 1) + ' E ' + (index2 + 1) + ' acao'] = document_3.data().Acao;
                                    objetoDados['A' + (index + 1) + ' P' + (index1 + 1) + ' E ' + (index2 + 1) + ' objeto'] = document_3.data().Objeto;

                                    
                                    // Comando para enviar dados para a Unity
                                        if (index2 == Object.keys(document_2.data().erros).length - 1){
                                            instanciaTeste.Module.SendMessage(parsedObjectName, parsedCallback, JSON.stringify(objetoDados));
                                        }
                                });
                            });
                            
                            if ( (index1 == Object.keys(document_1.data().passos).length - 1) && !Object.keys(document_2.data().erros).length){
                                instanciaTeste.Module.SendMessage(parsedObjectName, parsedCallback, JSON.stringify(objetoDados));
                            }
                        });
                         

                    });

                }); 
                
            });
        });
*/