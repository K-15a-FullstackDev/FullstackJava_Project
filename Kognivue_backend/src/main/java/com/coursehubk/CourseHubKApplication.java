package com.coursehubk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.coursehubk")
public class CourseHubKApplication {
    public static void main(String[] args) {
        SpringApplication.run(CourseHubKApplication.class, args);
    }
}
