package com.tresdsam.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class TrabajoDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private String categoria;
    private List<String> imagenes;
    private Boolean destacado;
    private LocalDate fecha;
}
