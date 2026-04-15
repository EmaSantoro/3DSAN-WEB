package com.tresdsam.repository;

import com.tresdsam.model.Pregunta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PreguntaRepository extends JpaRepository<Pregunta, Long> {
    List<Pregunta> findAllByOrderByOrdenAsc();
}
