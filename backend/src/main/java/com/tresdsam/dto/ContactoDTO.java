package com.tresdsam.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ContactoDTO {
    private Long id;
    private String nombre;
    private String mensaje;
    private LocalDateTime fecha;
}
