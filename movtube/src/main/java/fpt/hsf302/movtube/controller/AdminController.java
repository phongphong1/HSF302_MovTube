package fpt.hsf302.movtube.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public String adminHome() {
        return "admin";
    }
}

