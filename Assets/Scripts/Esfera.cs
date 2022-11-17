using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Esfera : MonoBehaviour
{
    public Transform transformGourndCheck;
    private bool keyPressed;
    private float horizontalInput;
    private Rigidbody rigidiBody;
    private bool taNoChao;
    // Start is called before the first frame update
    void Start()
    {
        this.rigidiBody = GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space)){
            keyPressed = true;
        }
        if (Input.GetKeyDown(KeyCode.Q)){
            //keyPressed = true;
            Debug.Log("Info URL -> " + URLParameters.Href);
            Debug.Log("ID da URL -> " + URLParameters.GetSearchParameters().GetDouble("id", 42d));
            Debug.Log("Tentativa -> " + URLParameters.GetSearchParameters().GetString("id", "sad"));

        }
        horizontalInput = Input.GetAxis("Horizontal");      
        
    }

    void FixedUpdate()
    {
        if (keyPressed){
            rigidiBody.AddForce(Vector3.up * 5, ForceMode.VelocityChange);
            keyPressed = false;
        } 

        rigidiBody.velocity = new Vector3(horizontalInput, rigidiBody.velocity.y, rigidiBody.velocity.z);
    }

    /*
    private void OnCollisionEnter(Collision collision){
        taNoChao = true;
    }

    private void OnCollisionExit(Collision collision){
        taNoChao = false;
    }
    */
}