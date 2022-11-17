mergeInto(LibraryManager.library, {

    PegarDados: function(colecao, documento, objectName, callback) {

      // Convertendo parametros para strings
      var parsedColecao = Pointer_stringify(colecao);
      var parsedObjectName = Pointer_stringify(objectName);
      var parsedDocumento = Pointer_stringify(documento);
      var parsedCallback = Pointer_stringify(callback);

      // Variaveis que armazenam informacoes de uma pratica
      var objetoDados;
      var objetoAtividade;
      var objetoPassos;
    

      // Pegando instancia do Firestore
      var firestore = firebase.firestore();
      // Pegando referencia da pratica (Documento) especificada pelo parametro
      docRef = firestore.collection(parsedColecao).doc(parsedDocumento);

      // Acessando a pratica referenciada
      docRef.get().then(function(doc){

        // Adicionando as informacoes da pratica em uma variavel
        objetoDados = {
          'descricaoPratica' : doc.data().descricao,
          'titulo' : doc.data().titulo,
          'atividades' : []
        };

        // Acessando o vetor de referencias de atividades de uma pratica
        doc.data().atividades.forEach(function(item, index){

                
          // Acessando cada atividade de uma pratica
          item.get().then(function(document_1){
                    
            // Adicionando as informacoes de uma atividade em uma variavel
            objetoAtividade = {
              'descricao' : document_1.data().descricao,
              'passos' : []
            };

            // Acessando o vetor de referencias de passos de uma atividade
            document_1.data().passos.forEach(function(item1, index1){

              // Acessando cada passo de uma atividade
              item1.get().then(function(document_2){
                         
                // Adicionando as informacoes de um passo em uma variavel
                objetoPassos = {
                  'descricao' : document_2.data().descricao,
                  'acoes' : []
                };

                // Adicionando um objeto de dados presente em um passo no banco em uma variavel
                objetoPassos['acoes'].push(document_2.data().acoes);
                         
                // Adicionando a variavel (Object) com os dados de um Passo na variavel que armazena dados de uma Atividade
                objetoAtividade['passos'].push(objetoPassos);
                
                // Caso o ultimo Passo de uma Atividade tenha sido lido, a variavel que contem os dados da Atividade eh adicionado na
                // variavel que armazena os dados da Pratica
                if ( (index1 == Object.keys(document_1.data().passos).length - 1)){
                  objetoDados['atividades'].push(objetoAtividade);

                }

                // Verifica se o ultimo Passo da ultima Atividade foi lido, em caso afirmativo a variavel com os dados da Pratica eh enviada
                // para o C#
                if ( (index1 == Object.keys(document_1.data().passos).length - 1) && (index == Object.keys(doc.data().atividades).length - 1) ){
                  instanciaTeste.Module.SendMessage(parsedObjectName, parsedCallback, JSON.stringify(objetoDados));
                }
                

              });
            });
          }); 
        });
      });

    },

    EnviarObjeto: function(objetoCSharp){

      // Convertendo para string a variavel passado por parametro
      var parsedStringDados = Pointer_stringify(objetoCSharp);

      //var json = JSON.parse(parsedStringDados);


      // Obtendo referencias do Banco de Dados
      var firestore = firebase.firestore();
      var batchPassos = firestore.batch();
      var batchAtividades = firestore.batch();
        
        var x = {
            "descricao":"Treinamento da Pipeta",
            "atividades":[
              {
                "descricao":"Atv Realizada",
                "passos":[
                  {
                    "descricao":"Passo 0",
                    "acoes":[
                      {
                        "acao":"AJUSTAR_VOLUME_200",
                        "objeto":"PIPETA"
                      }
                    ],
                    "erros":[
                      {
                        "acao":"NONE",
                        "objeto":"NONE"
                      }
                    ]
                  },
                  {
                    "descricao":"Passo 1",
                    "acoes":[
                      {
                        "acao":"PIPETAR_300",
                        "objeto":"PIPETA"
                      },
                      {
                        "acao":"ACOPLAR",
                        "objeto":"PONTEIRA"
                      }
                    ],
                    "erros":[
                      {
                        "acao":"NONE",
                        "objeto":"NONE"
                      }
                    ]
                  },
                  {
                    "descricao":"Passo 2",
                    "acoes":[
                      {
                        "acao":"PIPETAR_200",
                        "objeto":"SOLUCAO_1"
                      }
                    ],
                    "erros":[
                      {
                        "acao":"NONE",
                        "objeto":"NONE"
                      }
                    ]
                  },
                  {
                    "descricao":"Passo 3",
                    "acoes":[
                      {
                        "acao":"DISPENSAR_200",
                        "objeto":"MICROTUBO_1"
                      }
                    ],
                    "erros":[
                      {
                        "acao":"NONE",
                        "objeto":"NONE"
                      }
                    ]
                  },
                  {
                    "descricao":"Passo 4",
                    "acoes":[
                      {
                        "acao":"DESCARTAR",
                        "objeto":"PONTEIRA"
                      }
                    ],
                    "erros":[
                      {
                        "acao":"NONE",
                        "objeto":"NONE"
                      }
                    ]
                  }
                ]
              },
              {
                "descricao":"Atv Realizada",
                "passos":[
                  {
                    "descricao":"Passo 0",
                    "acoes":[
                      {
                        "acao":"AJUSTAR_VOLUME_300",
                        "objeto":"PIPETA"
                      }
                    ],
                    "erros":[
                      {
                        "acao":"NONE",
                        "objeto":"NONE"
                      }
                    ]
                  },
                  {
                    "descricao":"Passo 1",
                    "acoes":[
                      {
                        "acao":"ACOPLAR",
                        "objeto":"PONTEIRA"
                      }
                    ],
                    "erros":[
                      {
                        "acao":"NONE",
                        "objeto":"NONE"
                      }
                    ]
                  }
                ]
              },
              {
                "descricao":"Atv Realizada",
                "passos":[
                  
                ]
              }
            ]
          }
       
      // Declaracao de variaveis para conter dados do JSON a serem armazenados no Banco de Dados
      var nomePratica = x.descricao;
      var dadosAtividades = [];
      var listaAcoesPasso = [];
      var listaErrosPasso = [];
      var dadosPassos = [];
      var dadosPassosAux = [];
      var dadosPratica = [];

      // Percorrendo o JSON e agrupando as informacoes para serem armazenadas da maneira que foi estruturado o Banco de Dados
      // Percorrendo as Atividades
      x.atividades.forEach(function(valueArray, k) {
             
        // Armazenando a descricao das Atividades
        dadosAtividades.push({descricao : valueArray.descricao});
                             
        // Percorrendo os Passos de uma Atividade
        valueArray.passos.forEach(function(valueArray_I, index_I){
                          
          // Armazenando os pedacos (Object) de um Passo que contem as informacoes sobre as Acoes realizadas e os Erros 
          valueArray_I.acoes.forEach(function(valueArray_II, index_II){
            listaAcoesPasso.push(valueArray_II);
          })
          valueArray_I.erros.forEach(function(valueArray_II, index_II){
            listaErrosPasso.push(valueArray_II);
          })

          // Cria um vetor de Objects no qual em cada índice tem-se um objeto com os dados de um Passo de uma Atividade
          dadosPassosAux.push({descricao : valueArray_I.descricao, acoes : listaAcoesPasso, erros : listaErrosPasso});
          
          // "Limpando" as variaveis para conterem dados de outros Passos
          listaAcoesPasso = [];
          listaErrosPasso = [];
        })

        // Cria um vetor de vetores no qual em cada índice há um vetor que contem os Passos de uma atividade, sendo um Passo por índice
        dadosPassos.push(dadosPassosAux);
        dadosPassosAux = [];
                  
      });
          
      dadosPratica.push({descricao : nomePratica});

            
      // Vetores para armazenar as referências de Passos e Atividades, os quais serao armazenadas no banco
      var refs = [];
      var referenciasPassos = [];
      var referenciasAtividades = [];

      // Acessa cada valor no vetor de vetores
      dadosPassos.forEach(function(valueArray, index){

        // Acessa cada objeto que contêm as informações de um Passo no vetor de Passos (Objects)
        valueArray.forEach(function(valueArray_I, index_I){

          // Cria um documento na coleção especificada com um ID aleatório e retorna esse ID -> **
          var docRef = firestore.collection("PassoRealizado").doc();
          // Registra a operação de gravação em um lote (Batch) que será gravado no banco posteriormente -> ++
          batchPassos.set(docRef, valueArray_I);
          // Armazena o ID gerado em um vetor, tais IDs farão parte dos dados armazenados no banco -> *+
          refs.push(docRef);
        })

        referenciasPassos.push(refs);
        refs = [];
      })
        
      dadosAtividades.forEach(function(valueArray, index){

        // Adiciona no objeto que contêm os dados de uma Atividade o vetor de Referências de Passos relacionados a aquela Atividade
        valueArray.passos = referenciasPassos[index];
        // **
        var docRef = firestore.collection("AtividadeRealizada").doc();
        // ++
        batchAtividades.set(docRef, valueArray);
        // *+
        referenciasAtividades.push(docRef);
      })

      // Adiciona no objeto que contêm os dados de uma Pratica o vetor de Referências de Atividades relacionados a aquela Pratica
      dadosPratica[0].atividades = referenciasAtividades;

      // Adiciona a pratica no banco com um ID aleatório na coleção especificada
      firestore.collection("PraticaRealizada").add(dadosPratica[0]);
        
      // Grava as operações de inserção no banco, essas que foram registradas em lotes (Batchs)
      batchPassos.commit();
      batchAtividades.commit();        

    },

});



/*
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
                'tipoPratica' : doc.data().tipo,
                'descricaoPratica' : doc.data().descricao
            };

            // Acessando o vetor de referencias de atividades de uma pratica
            doc.data().atividades.forEach(function(item, index){

                
                // Como as referencias das atividades estao sendo armazenadas como string,
                // é necessário pegar uma DocumentReference a partir da string --> *
                firestore.doc(item).get().then(function(document_1){
                    
                    // Adicionando as informacoes de uma determinada atividade na variavel
                    objetoDados['A' + (index + 1) + ' tipo'] = document_1.data().tipo;
                    objetoDados['A' + (index + 1) + ' descricao'] = document_1.data().descricao;


                    // Acessando o vetor de referencias de passos de uma atividade
                    document_1.data().passos.forEach(function(item1, index1){

                        // *
                        firestore.doc(item1).get().then(function(document_2){
                            
                            // Adicionando as informacoes de um determinado passo de uma atividade na variavel
                            objetoDados['A' + (index + 1) + ' P' + (index1 + 1) + ' descricao'] = document_2.data().descricao;
                            objetoDados['A' + (index + 1) + ' P' + (index1 + 1) + ' tipo'] = document_2.data().tipo;

                        
                            
                            if ( (index1 == Object.keys(document_1.data().passos).length - 1)){
                                instanciaTeste.Module.SendMessage(parsedObjectName, parsedCallback, JSON.stringify(objetoDados));
                            }
                        });
                         

                    });

                }); 
                
            });
        });
*/