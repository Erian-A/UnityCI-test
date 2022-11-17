using System.Collections;
using System.Collections.Generic;
using UnityEngine;
//using System.Serializable;
using System;

[Serializable]
public class cidade
{

    public int populacao;
    public int area;
    public string nome;
    public string bandeira;
    public int[] arranhaceu;

    public cidade(){
        this.area = 1000;
        this.populacao = 100009;
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
