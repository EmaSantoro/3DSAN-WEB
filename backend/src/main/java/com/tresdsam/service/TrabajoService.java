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

    public TrabajoDTO create(TrabajoDTO dto) {
        return toDTO(trabajoRepository.save(toEntity(dto)));
    }

    public TrabajoDTO update(Long id, TrabajoDTO dto) {
        Trabajo existing = trabajoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trabajo no encontrado con id: " + id));
        existing.setTitulo(dto.getTitulo());
        existing.setDescripcion(dto.getDescripcion());
        existing.setCategoria(dto.getCategoria());
        existing.setImagenes(dto.getImagenes());
        existing.setModelo3DPath(dto.getModelo3DPath());
        existing.setDestacado(dto.getDestacado() != null ? dto.getDestacado() : false);
        existing.setFecha(dto.getFecha());
        return toDTO(trabajoRepository.save(existing));
    }

    public void delete(Long id) {
        trabajoRepository.deleteById(id);
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

    private Trabajo toEntity(TrabajoDTO dto) {
        Trabajo t = new Trabajo();
        t.setTitulo(dto.getTitulo());
        t.setDescripcion(dto.getDescripcion());
        t.setCategoria(dto.getCategoria());
        t.setImagenes(dto.getImagenes());
        t.setModelo3DPath(dto.getModelo3DPath());
        t.setDestacado(dto.getDestacado() != null ? dto.getDestacado() : false);
        t.setFecha(dto.getFecha());
        return t;
    }
}
