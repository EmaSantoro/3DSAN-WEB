package com.tresdsam.service;

import com.tresdsam.model.Pregunta;
import com.tresdsam.repository.PreguntaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreguntaService {

    private final PreguntaRepository preguntaRepository;

    public PreguntaService(PreguntaRepository preguntaRepository) {
        this.preguntaRepository = preguntaRepository;
    }

    public List<Pregunta> getAll() {
        return preguntaRepository.findAllByOrderByOrdenAsc();
    }
}
