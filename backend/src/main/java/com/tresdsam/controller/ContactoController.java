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
    public ResponseEntity<String> enviar(@RequestBody ContactoDTO dto) {
        contactoService.save(dto);
        return ResponseEntity.ok("Mensaje enviado correctamente");
    }
}
