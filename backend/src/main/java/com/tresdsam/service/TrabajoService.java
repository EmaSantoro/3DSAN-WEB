package com.tresdsam.service;

import com.tresdsam.dto.TrabajoDTO;
import com.tresdsam.model.Trabajo;
import com.tresdsam.repository.TrabajoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrabajoService {

    private final TrabajoRepository trabajoRepository;

    public TrabajoService(TrabajoRepository trabajoRepository) {
        this.trabajoRepository = trabajoRepository;
    }

    public List<TrabajoDTO> getAll() {
        return trabajoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public TrabajoDTO getById(Long id) {
        return trabajoRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Trabajo no encontrado con id: " + id));
    }

    public List<TrabajoDTO> getDestacados() {
        return trabajoRepository.findByDestacadoTrue().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<TrabajoDTO> getByCategoria(String categoria) {
        return trabajoRepository.findByCategoria(categoria).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private TrabajoDTO toDTO(Trabajo t) {
        TrabajoDTO dto = new TrabajoDTO();
        dto.setId(t.getId());
        dto.setTitulo(t.getTitulo());
        dto.setDescripcion(t.getDescripcion());
        dto.setCategoria(t.getCategoria());
        dto.setImagenes(t.getImagenes());
        dto.setModelo3DPath(t.getModelo3DPath());
        dto.setDestacado(t.getDestacado());
        dto.setFecha(t.getFecha());
        return dto;
    }
}