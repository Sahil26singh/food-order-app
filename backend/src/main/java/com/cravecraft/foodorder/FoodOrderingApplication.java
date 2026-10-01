package com.cravecraft.foodorder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FoodOrderingApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodOrderingApplication.class, args);
		System.out.println("\n========================================================");
		System.out.println("🚀 CraveCraft Food Express Spring Boot Backend Running!");
		System.out.println("🌐 REST API Base URL: http://localhost:8080/api");
		System.out.println("🗄️ H2 Console: http://localhost:8080/h2-console");
		System.out.println("========================================================\n");
	}
}
