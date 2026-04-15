package com.tresdsam.repository;

import com.tresdsam.model.Trabajo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrabajoRepository extends JpaRepository<Trabajo, Long> {
    List<Trabajo> findByDestacadoTrue();
    List<Trabajo> findByCategoria(String categoria);
}
