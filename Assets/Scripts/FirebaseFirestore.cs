using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;



// Interface
public static class FirebaseFirestore
{

    [DllImport("__Internal")]
    public static extern void EnviarObjeto(string obejtoCSharp);
    [DllImport("__Internal")]
    public static extern void PegarDados(string colecao, string documento, string objectName, string funcaoRetornoDados);


    [DllImport("__Internal")]
    public static extern void lidandoObjeto(string teste, string objectName, string funcao);


}
