using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Interface : MonoBehaviour
{

    public GameObject nomeObjeto;
    //public GameObject botoesInteracao;
    public GameObject cronometro;
    public Text textoTempo;
   
    // Start is called before the first frame update
    void Start()
    {
        //this.botoesInteracao.SetActive(false);
        //this.nomeObjeto.SetActive(false);
        //this.cronometro.SetActive(false);
    }

    public void AtivarEquipamento(){

        //this.botoesInteracao.SetActive(true);
        this.nomeObjeto.SetActive(true);
    }

    public void AtivarTempo(float tempo)
    {
        this.cronometro.SetActive(true);
        this.textoTempo.text = tempo.ToString("0.0");
        this.cronometro.transform.Rotate(0, 0, 5, Space.Self);
        if (tempo <= 0.3)
            this.cronometro.SetActive(false);
    }

}
