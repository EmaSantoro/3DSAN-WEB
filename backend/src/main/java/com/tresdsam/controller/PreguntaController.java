package com.tresdsam.controller;

import com.tresdsam.model.Pregunta;
import com.tresdsam.service.PreguntaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/preguntas")
public class PreguntaController {

    private final PreguntaService preguntaService;

    public PreguntaController(PreguntaService preguntaService) {
        this.preguntaService = preguntaService;
    }

    @GetMapping
    public List<Pregunta> getAll() {
        return preguntaService.getAll();
    }
}
