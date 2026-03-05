package com.example.asseroo_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class AsserooBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AsserooBackendApplication.class, args);
	}

	// @GetMapping("/")
	// public String home(){
	// 	return "lol";
	// }

	// @GetMapping("/hello")
	// public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
	// 	return String.format("Hello %s!", name);
	// }
}
