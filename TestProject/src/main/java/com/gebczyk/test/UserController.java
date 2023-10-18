package com.gebczyk.test;

import org.springframework.stereotype.Controller;

@Controller
public class UserController {
    public UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public void HelloWorld() {

    }
}
