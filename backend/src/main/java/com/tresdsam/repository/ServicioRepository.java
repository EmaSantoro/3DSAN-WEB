package com.tresdsam.repository;

import com.tresdsam.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    Optional<Servicio> findBySlug(String slug);
    List<Servicio> findAllByOrderByOrdenAsc();
}
