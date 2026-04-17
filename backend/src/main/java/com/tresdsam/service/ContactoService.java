package com.tresdsam.service;

import com.tresdsam.dto.ContactoDTO;
import com.tresdsam.model.Contacto;
import com.tresdsam.repository.ContactoRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactoService {

    private final ContactoRepository contactoRepository;

    public ContactoService(ContactoRepository contactoRepository) {
        this.contactoRepository = contactoRepository;
    }

    public void registrarConsulta(ContactoDTO dto) {
        Contacto contacto = new Contacto();
        contacto.setNombre(dto.getNombre());
        contacto.setMensaje(dto.getMensaje());
        contactoRepository.save(contacto);
    }
}
