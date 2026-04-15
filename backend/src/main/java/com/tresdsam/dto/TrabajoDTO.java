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
    private String modelo3DPath;
    private Boolean destacado;
    private LocalDate fecha;
}
