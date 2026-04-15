package com.tresdsam.dto;

import lombok.Data;

@Data
public class ServicioDTO {
    private Long id;
    private String nombre;
    private String slug;
    private String descripcionCorta;
    private String descripcionDetalle;
    private String imagenPortada;
    private Integer orden;
}
