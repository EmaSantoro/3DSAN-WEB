package com.tresdsam.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "trabajos")
public class Trabajo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    private String categoria;

    @ElementCollection
    @CollectionTable(name = "trabajo_imagenes", joinColumns = @JoinColumn(name = "trabajo_id"))
    @Column(name = "imagen_path")
    private List<String> imagenes = new ArrayList<>();

    private Boolean destacado = false;

    private LocalDate fecha;
}
