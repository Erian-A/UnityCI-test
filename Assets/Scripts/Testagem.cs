using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;
using System.Linq;
//import System.Web.Script.Serialization;
//using System.Web.Script.Serialization;
//using System.Web.Extensions;

//using Firebase.Firestore;
//using Firebase.Extensions;




public class Testagem : MonoBehaviour
{
    List<string> listaPraticas = new List<string>();
    List<string> listaAtividades = new List<string>();
    List<string> listaPassos = new List<string>();


    //System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
    //p1 = JsonUtility.FromJson<Pessoa>(json);
    //JsonUtility.FromJsonOverwrite(json, myObject);

    [DllImport("__Internal")]
    static extern void EnviarNovaAtividade(string path, string objectName, string descricao, string tipo, string primeiraRefPassoDoVetor);
    [DllImport("__Internal")]
    static extern void EnviarNovoErro(string path, string objectName, string acao, string objeto);
    [DllImport("__Internal")]
    static extern void EnviarNovoPasso(string path, string objectName, string descricao, string tipo, string primeiraRefErroDoVetor);
    [DllImport("__Internal")]
    static extern void EnviarNovaPratica(string path, string objectName, string descricao, string tipo, string primeiraRefAtividadeDoVetor);
    [DllImport("__Internal")]
    static extern void AcrescentarValorVetor(string path, string objectName, string nomeVetor, string valorVetor);
    
    [DllImport("__Internal")]
    static extern void PegarPasso(string colecao, string objectName, string func);
    [DllImport("__Internal")]
    static extern void PegarAtividade(string colecao, string objectName, string func);
    [DllImport("__Internal")]
    static extern void PegarErro(string colecao, string doc, string objectName, string func);
    [DllImport("__Internal")]
    static extern void PegarPratica(string colecao, string doc, string objectName, string func);
    [DllImport("__Internal")]
    static extern void ABC(string colecao, string doc, string objectName, string func);
    [DllImport("__Internal")]
    static extern void EnviarObjeto(string path, string objectName);



    // Start is called before the first frame update
    void Start()
    {
        //EnviarNovoErro("erros/Erro 2", gameObject.name, "PIPETAR_500", "MICROTUBO_1");
        //EnviarNovoPasso("passo/Passo 1", gameObject.name, "Pipetar 200ul da Solucao 1", "Esperada", "erros/Erro1");
        //EnviarNovaAtividade("atividades/Atividade 1", gameObject.name, "Atividade 1", "Esperada", "passo/Passo 1");
        //EnviarNovaPratica("praticas/Pratica 1", gameObject.name, "Treinamento Pipeta", "Esperada", "atividades/Atividade 1");
        //AcrescentarValorVetor("passo/Passo 1", gameObject.name, "erros", "erros/Erro 2");
        //string d = PegarPasso("praticas", "Pratica 1", gameObject.name, "Success");
        //PegarAtividade("atividades", "Atividade 1", gameObject.name, "Success");
        //ABC("erros", "Erro 1", gameObject.name, "Success");
        //PegarPratica("praticas", "pratica1", gameObject.name, "Success");
        //EnviarObjeto("teste/fe", gameObject.name);
        //Debug.Log("Passou pela Start.");
        //Vamo();

    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void Vamo(){
        Debug.Log("1: " + this.listaPraticas[0]);
    }

    private void Success(string xoxo){
       
        Debug.Log("Dado pego pela Func Pratica: " + xoxo);
        this.listaPraticas = xoxo.Split('-').ToList();
        //Debug.Log("Tamanho lista: " + this.lista.Count);
        for (int i = 0; i < (this.listaPraticas.Count - 2); i++){

            PegarAtividade(this.listaPraticas[i], gameObject.name, "Failure");
        }
    }

    private void Failure(string xexe){
        Debug.Log("Dados pegos atraves dos enderecos de atividades:" + xexe);

        this.listaAtividades = xexe.Split('-').ToList();

        for (int j = 0; j < this.listaAtividades.Count; j++){

            if (this.listaAtividades[j].Contains("/")){
                PegarPasso(this.listaAtividades[j], gameObject.name, "ArmazenarPassos");
            }

        }
    }

    private void ArmazenarPassos(string dados){

        Debug.Log("Dados pegos passos:" + dados);

        this.listaPassos = dados.Split('-').ToList();

    }




}
