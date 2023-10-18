package com.gebczyk.test;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
    @GetMapping(path = "/hello") // Path / Dirección URL en el navegador: http://localhost:8080/hello
    public String helloWorld() {
        return "Hello World"; // Retorna un String ("Hello world")
    }
}
