package com.tresdsam.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "preguntas")
public class Pregunta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String pregunta;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String respuesta;

    private Integer orden = 0;
}
