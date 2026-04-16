package com.tresdsam.controller;

import com.tresdsam.dto.TrabajoDTO;
import com.tresdsam.service.TrabajoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trabajos")
public class TrabajoController {

    private final TrabajoService trabajoService;

    public TrabajoController(TrabajoService trabajoService) {
        this.trabajoService = trabajoService;
    }

    @GetMapping
    public List<TrabajoDTO> getAll(@RequestParam(required = false) String categoria) {
        if (categoria != null && !categoria.isBlank()) {
            return trabajoService.getByCategoria(categoria);
        }
        return trabajoService.getAll();
    }

    @GetMapping("/destacados")
    public List<TrabajoDTO> getDestacados() {
        return trabajoService.getDestacados();
    }

    @GetMapping("/{id}")
    public TrabajoDTO getById(@PathVariable Long id) {
        return trabajoService.getById(id);
    }
}