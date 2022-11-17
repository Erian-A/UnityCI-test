using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ControladorEspectrofotometro : MonoBehaviour
{

    private GameObject objEspectrofotometro;
    private GameObject[] resultados;
    private Espectrofotometro espectrofotometro;

    void Update()
    {
        
         if (Vector3.Distance(Camera.main.transform.position, this.objEspectrofotometro.transform.position) <= 1.5 /*&& this.objEspectrofotometro.GetComponent<trigger>().getAlvo()*/){
            // Já fez a verificação antes se colocou conteudo?
            if (Input.GetKeyUp(KeyCode.R)){
                if (this.espectrofotometro.GetContemConteudo()){
                    ContarTempo();
                }
                // Talvez colocar uma verificação se executou o tempo correto
                else if (this.espectrofotometro.GetEmUso()) {
                    DescartarConteudo();
                }
                this.espectrofotometro.AlterarEmUso();


            }
            
        }
        
    }

    public ControladorEspectrofotometro(){

        this.objEspectrofotometro = GameObject.FindGameObjectWithTag("espectro");
        //this.espectrofotometro = this.objEspectrofotometro.AddComponent<Espectrofotometro>();
        this.espectrofotometro = new Espectrofotometro();
    }

    public void ColocarSolucao(){
        this.espectrofotometro.AlterarConteudo();
    }

    public void DescartarConteudo(){
        this.espectrofotometro.AlterarConteudo();
        this.espectrofotometro.ZerarContagem();
    }

    public void ContarTempo(){
        this.espectrofotometro.ContarTempo();
    }
}
