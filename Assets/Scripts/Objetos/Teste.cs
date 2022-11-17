using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Teste : MonoBehaviour
{
    public GameObject lobo;
    public Text texto;




    // Start is called before the first frame update
    void Start()
    {   
        this.texto.text = "Qualquer coisa!";
        this.lobo.SetActive(false);
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
