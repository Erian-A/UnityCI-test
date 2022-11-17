using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ControladorMixer : MonoBehaviour
{
    private GameObject objMixer;
    private GameObject microtubo;
    public Interface interfaceMixer;

    /*
        E - Colocar/retirar conteudo
        R - Rotacionar
    */

    void Start(){
        this.interfaceMixer = GameObject.FindGameObjectWithTag("UITeste").GetComponent<Interface>();
    }

    void Update()
    {
        Mixer mixer =  GameObject.FindGameObjectWithTag("Esfera").GetComponent<Mixer>();
        
        if (Input.GetKeyUp(KeyCode.E)){
            this.interfaceMixer.AtivarEquipamento();
            Debug.Log("AQQ");
        }
        else if (Input.GetKeyDown(KeyCode.R)){
            
            this.interfaceMixer.AtivarTempo(mixer.GetTempo());
            mixer.ContarTempo();
        }
        
        // Erro no trigger
        /*
        if (Vector3.Distance(Camera.main.transform.position, this.objMixer.transform.position) <= 1.5 && this.objMixer.GetComponent<trigger>().getAlvo()){
            
            Mixer mixer = this.objMixer.GetComponent<Mixer>();
            this.interfaceMixer.AtivarEquipamento();

            // Caso não tenha conteúdo no mixer, tecla E seja clicada e personagem com microtubos -> Coloca microtubos no mixer
            if (!mixer.GetContemConteudo() && Personagem.objetoEquipado == "microtubo" && Input.GetKeyUp(KeyCode.E)){
                ColocarMicrotubosMixer(mixer);
            }
            // A tecla R seja pressionada -> Acontece a rotação
            else if (Input.GetKeyDown(KeyCode.R)){
                Rotacionar(mixer);
                this.interfaceMixer.AtivarTempo(mixer.GetTempo());
                mixer.ContarTempo();
            }
            // Caso os microtubos estejam no mixer, tecla E seja clicada e personagem sem itens equipados -> Retira os microtubos
            else if (mixer.GetContemConteudo() && Personagem.objetoEquipado == "" && Input.GetKeyUp(KeyCode.E)){
                RetirarMicrotubosMixer(mixer);
            }


        }
        */
        
    }

    public ControladorMixer(GameObject mixer, GameObject microtubo){

        this.objMixer = mixer;
        this.microtubo = microtubo;
        this.objMixer.AddComponent<Mixer>();
        //this.objMixer.AddComponent<trigger>();
        this.microtubo.SetActive(false);
    }

    public void ColocarMicrotubosMixer(Mixer mixer){
        mixer.AlterarConteudo();
        this.microtubo.SetActive(true);
    }

    public void RetirarMicrotubosMixer(Mixer mixer){
        mixer.AlterarConteudo();
        this.microtubo.SetActive(false);

    }

    public void Rotacionar(Mixer mixer){
        mixer.Rotacionar();
    }

    public float GetTempoRotacao(Mixer mixer){
        return mixer.GetTempoRotacao();
    }
    
}
