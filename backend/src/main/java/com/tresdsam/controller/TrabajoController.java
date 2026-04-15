package com.tresdsam.controller;

import com.tresdsam.dto.TrabajoDTO;
import com.tresdsam.service.TrabajoService;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public ResponseEntity<TrabajoDTO> create(@RequestBody TrabajoDTO dto) {
        return ResponseEntity.ok(trabajoService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrabajoDTO> update(@PathVariable Long id, @RequestBody TrabajoDTO dto) {
        return ResponseEntity.ok(trabajoService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        trabajoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
