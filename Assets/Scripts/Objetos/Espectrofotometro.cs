using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Espectrofotometro : MonoBehaviour
{

    private bool contemConteudo = false;
    private bool emUso = false;
    private float tempoUso = 0;

   public bool GetContemConteudo(){
        return this.contemConteudo;
    }

    public void AlterarEmUso(){
        this.emUso = !this.GetEmUso();
    }

    public void AlterarConteudo(){
        this.contemConteudo = !this.contemConteudo;
    }

    public void ZerarContagem(){
        this.tempoUso = 0;
    }

    public bool GetEmUso(){
        return this.emUso;
    }

    public float GetTempoEmUso(){
        return this.tempoUso;
    }

    public void ContarTempo(){
        this.tempoUso += Time.deltaTime;
    }
   
}
