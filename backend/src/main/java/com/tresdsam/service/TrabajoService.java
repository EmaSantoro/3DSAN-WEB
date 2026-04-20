package com.tresdsam.service;

import com.tresdsam.dto.TrabajoDTO;
import com.tresdsam.exception.ResourceNotFoundException;
import com.tresdsam.model.Trabajo;
import com.tresdsam.repository.TrabajoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrabajoService {

    private final TrabajoRepository trabajoRepository;

    public TrabajoService(TrabajoRepository trabajoRepository) {
        this.trabajoRepository = trabajoRepository;
    }

    public List<TrabajoDTO> getAll() {
        return trabajoRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public TrabajoDTO getById(Long id) {
        return trabajoRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Trabajo no encontrado con id: " + id));
    }

    public List<TrabajoDTO> getDestacados() {
        return trabajoRepository.findByDestacadoTrue().stream()
                .map(this::toDTO)
                .toList();
    }

    public List<TrabajoDTO> getByCategoria(String categoria) {
        return trabajoRepository.findByCategoria(categoria).stream()
                .map(this::toDTO)
                .toList();
    }

    private TrabajoDTO toDTO(Trabajo t) {
        TrabajoDTO dto = new TrabajoDTO();
        dto.setId(t.getId());
        dto.setTitulo(t.getTitulo());
        dto.setDescripcion(t.getDescripcion());
        dto.setCategoria(t.getCategoria());
        dto.setImagenes(t.getImagenes());
        dto.setDestacado(t.getDestacado());
        dto.setFecha(t.getFecha());
        return dto;
    }
}