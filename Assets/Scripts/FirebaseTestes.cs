using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;

public class FirebaseTestes : MonoBehaviour
{
    //string dados = @"{"descricao":"Treinamento da Pipeta","atividades":[{"descricao":"Atv Realizada","passos":[{"descricao":"Passo 0","acoes":[{"acao":"AJUSTAR_VOLUME_200","objeto":"PIPETA"}],"erros":[{"acao":"NONE","objeto":"NONE"}]},{"descricao":"Passo 1","acoes":[{"acao":"PIPETAR_300","objeto":"PIPETA"},{"acao":"ACOPLAR","objeto":"PONTEIRA"}],"erros":[{"acao":"NONE","objeto":"NONE"}]},{"descricao":"Passo 2","acoes":[{"acao":"PIPETAR_200","objeto":"SOLUCAO_1"}],"erros":[{"acao":"NONE","objeto":"NONE"}]},{"descricao":"Passo 3","acoes":[{"acao":"DISPENSAR_200","objeto":"MICROTUBO_1"}],"erros":[{"acao":"NONE","objeto":"NONE"}]},{"descricao":"Passo 4","acoes":[{"acao":"DESCARTAR","objeto":"PONTEIRA"}],"erros":[{"acao":"NONE","objeto":"NONE"}]}]},{"descricao":"Atv Realizada","passos":[{"descricao":"Passo 0","acoes":[{"acao":"AJUSTAR_VOLUME_300","objeto":"PIPETA"}],"erros":[{"acao":"NONE","objeto":"NONE"}]},{"descricao":"Passo 1","acoes":[{"acao":"ACOPLAR","objeto":"PONTEIRA"}],"erros":[{"acao":"NONE","objeto":"NONE"}]}]},{"descricao":"Atv Realizada","passos":[]}]}";
    cidade teste;
    private string dadosPegos;

    // Start is called before the first frame update
    void Start()
    {
        
        //FirebaseFirestore.EnviarObjeto("ole");
        FirebaseFirestore.PegarDados("praticaEsperada", "8MQEK5QRXrBVOBksRLL6", gameObject.name, "Teste");
        Debug.Log(this.dadosPegos);
    }


    // Quando o comando "instanciaTeste.Module.SendMessage()" eh executado no .jslib esta funcao eh chamada e os dados enviados por la
    // sao passados como parametro para essa funcao
    
    private void Teste(string dadosFirebase){
        Debug.Log("Objeto Firebase: " + dadosFirebase);

        this.dadosPegos = dadosFirebase;

        Debug.Log("A: " + this.dadosPegos);
    }

}
