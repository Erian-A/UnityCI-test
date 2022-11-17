using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Mixer : MonoBehaviour
{
    private bool contemConteudo = false;
    private float tempoRotacao = 10.0f;

    public bool GetContemConteudo(){
        return this.contemConteudo;
    }

    public void AlterarConteudo(){
        this.contemConteudo = !this.contemConteudo;
        ZerarContagem();
    }

    public void ZerarContagem(){
        this.tempoRotacao = 0.0f;
    }

    public float GetTempoRotacao(){
        return this.tempoRotacao;
    }

    public void Rotacionar(){
        this.tempoRotacao += Time.deltaTime;
    }

    public float ContarTempo() {
        if (this.tempoRotacao >= 0.02)
            this.tempoRotacao -= Time.deltaTime;
        else
        {
            this.contemConteudo = false;
            this.tempoRotacao = 10.0f;
        }
        return this.tempoRotacao;
    }
    public float GetTempo() { return this.tempoRotacao; }


/*
Criando funções para retornar a descricao da atividade e do passo para mostrar na interface
*/


}
