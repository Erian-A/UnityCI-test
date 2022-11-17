using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Runtime.InteropServices;


public class ClickOb : MonoBehaviour
{

    private string dadosPegos;

    void OnMouseDown()
    {
        //FirebaseFirestore.PegarDados("praticaEsperada", "8MQEK5QRXrBVOBksRLL6", gameObject.name, "Teste");
        //Debug.Log(this.dadosPegos);
        FirebaseFirestore.EnviarObjeto("praticaEsperada");
        Debug.Log("Hello");
    }

    private void Teste(string dadosFirebase){
        Debug.Log("Objeto Firebase: " + dadosFirebase);

    }
}
