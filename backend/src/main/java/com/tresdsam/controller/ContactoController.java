package com.tresdsam.controller;

import com.tresdsam.dto.ContactoDTO;
import com.tresdsam.service.ContactoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contacto")
public class ContactoController {

    private final ContactoService contactoService;

    public ContactoController(ContactoService contactoService) {
        this.contactoService = contactoService;
    }

    @PostMapping
    public ResponseEntity<Void> registrar(@RequestBody ContactoDTO dto) {
        contactoService.registrarConsulta(dto);
        return ResponseEntity.ok().build();
    }
}
