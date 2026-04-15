package com.tresdsam.service;

import com.tresdsam.dto.ServicioDTO;
import com.tresdsam.model.Servicio;
import com.tresdsam.repository.ServicioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioService {

    private final ServicioRepository servicioRepository;

    public ServicioService(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    public List<ServicioDTO> getAll() {
        return servicioRepository.findAllByOrderByOrdenAsc().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ServicioDTO getBySlug(String slug) {
        return servicioRepository.findBySlug(slug)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado: " + slug));
    }

    private ServicioDTO toDTO(Servicio s) {
        ServicioDTO dto = new ServicioDTO();
        dto.setId(s.getId());
        dto.setNombre(s.getNombre());
        dto.setSlug(s.getSlug());
        dto.setDescripcionCorta(s.getDescripcionCorta());
        dto.setDescripcionDetalle(s.getDescripcionDetalle());
        dto.setImagenPortada(s.getImagenPortada());
        dto.setOrden(s.getOrden());
        return dto;
    }
}
