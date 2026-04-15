package com.tresdsam.controller;

import com.tresdsam.dto.ServicioDTO;
import com.tresdsam.service.ServicioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servicios")
public class ServicioController {

    private final ServicioService servicioService;

    public ServicioController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    @GetMapping
    public List<ServicioDTO> getAll() {
        return servicioService.getAll();
    }

    @GetMapping("/{slug}")
    public ServicioDTO getBySlug(@PathVariable String slug) {
        return servicioService.getBySlug(slug);
    }
}
