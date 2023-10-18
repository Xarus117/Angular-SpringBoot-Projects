package com.gebczyk.test;
import org.springframework.context.ApplicationContext; 
import org.springframework.stereotype.Component;

@Component // COMPONENTE
public class AppConfig {
    public AppConfig(ApplicationContext applicationContext) {
    UserController userController = applicationContext.getBean(UserController.class);
    UserService userService = applicationContext.getBean(UserService.class);
    UserRepository userRepository = applicationContext.getBean(UserRepository.class);
    if (userController != null) {
        System.out.println("Created UserController");
    }

    if (userService != null) {
        System.out.println("Created UserService");
    }

    if (userRepository!= null) {
        System.out.println("Created UserRepository");
    }
    }
}
