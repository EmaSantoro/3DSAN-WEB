package com.tresdsam.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "servicios")
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String descripcionCorta;

    @Column(columnDefinition = "TEXT")
    private String descripcionDetalle;

    private String imagenPortada;

    private Integer orden = 0;
}
