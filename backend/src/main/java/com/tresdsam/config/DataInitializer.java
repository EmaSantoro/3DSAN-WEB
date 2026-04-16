package com.tresdsam.config;

import com.tresdsam.model.Pregunta;
import com.tresdsam.model.Servicio;
import com.tresdsam.model.Trabajo;
import com.tresdsam.repository.PreguntaRepository;
import com.tresdsam.repository.ServicioRepository;
import com.tresdsam.repository.TrabajoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(
            ServicioRepository servicioRepository,
            TrabajoRepository trabajoRepository,
            PreguntaRepository preguntaRepository
    ) {
        return args -> {

            // ── Servicios (sólo si la tabla está vacía) ────────────────────
            if (servicioRepository.count() == 0) {
                Servicio s1 = servicio("Jarras Personalizadas", "jarras-personalizadas",
                        "Jarras y tazas únicas con tu logo o diseño favorito.",
                        "Imprimimos jarras con diseños completamente personalizables. "
                        + "Ideales para regalos corporativos, souvenirs, eventos y uso cotidiano. "
                        + "Trabajamos con PLA de alta resistencia, personalizala con tus colores. "
                        + "Capacidad estándar de 500ml y 1lts. Consultanos por pedidos en cantidad.",
                        "/productos/jarras.png", 1);

                Servicio s2 = servicio("Llaveros para Negocios", "llaveros-negocios",
                        "Llaveros con tu marca, logo o mensaje para regalar y/o revender.",
                        "Llaveros impresos en 3D, resistentes y personalizables al 100%. "
                        + "Personalizables con el logo de tu negocio o empresa. "
                        + "Realizamos pedidos minoristas y mayoristas.",
                        "/productos/llaveros.png", 2);

                Servicio s3 = servicio("Piezas Funcionales", "piezas-funcionales",
                        "Repuestos, soportes y piezas técnicas a medida para industria y hogar.",
                        "Imprimimos piezas técnicas de alta precisión: repuestos, soportes, "
                        + "piezas de maquinaria, adaptadores y más. Trabajamos con PLA, PETG, TPU y ABS "
                        + "según los requerimientos de resistencia del cliente. "
                        + "Enviás el archivo o medidas y nosotros modelamos la pieza.",
                        "/productos/personalizados.jpeg", 3);

                Servicio s4 = servicio("Productos Essen", "productos-essen",
                        "LLaveros, carteles y soportes de tapa, para tu emprendimiento Essen.",
                        "Fabricamos piezas y accesorios para que destaques con tus clientes; "
                        + "Productos de alta calidad que complementan y potencian tus ventas.",
                        "/productos/essen.png", 4);

                servicioRepository.saveAll(List.of(s1, s2, s3, s4));
                log.info("Servicios mock creados");

                // ── Trabajos mock ──────────────────────────────────────────
                List<Trabajo> trabajos = List.of(
                    // Jarras
                    trabajo("Jarra logo empresa textil", "Jarra de 500ml con el logo de una empresa textil local. "
                        + "Acabado mate en negro con grabado en relieve del isotipo.", "jarras-personalizadas", true),
                    trabajo("Taza personalizada cumpleaños", "Taza de 350ml con nombre y fecha especial. "
                        + "Impresa en blanco y rosa para regalo de cumpleaños.", "jarras-personalizadas", false),
                    trabajo("Set de jarras corporativas", "Lote de 50 jarras con logo de empresa de seguros. "
                        + "Entregadas en caja individual para regalo corporativo.", "jarras-personalizadas", false),

                    // Llaveros
                    trabajo("Llaveros inmobiliaria Rivera", "Llaveros con logo de inmobiliaria para entrega a clientes. "
                        + "Producción de 200 unidades en color blanco y rojo.", "llaveros-negocios", true),
                    trabajo("Llavero hotel boutique", "Llavero numeral para habitaciones de hotel boutique. "
                        + "Diseño minimalista con número en relieve y textura premium.", "llaveros-negocios", false),
                    trabajo("Llaveros bicicleta personalizado", "Llavero portátil con nombre del propietario "
                        + "y número de contacto para bicicletas y motos.", "llaveros-negocios", false),

                    // Piezas funcionales
                    trabajo("Soporte para tablet industrial", "Soporte articulado impreso en PETG para tablet "
                        + "en línea de producción. Resistente a temperaturas de hasta 80°C.", "piezas-funcionales", true),
                    trabajo("Repuesto bisagra electrodoméstico", "Bisagra para horno de cocina descontinuada. "
                        + "Modelada a partir de la pieza original y reimpresa en ABS.", "piezas-funcionales", false),
                    trabajo("Adaptador cañería 3/4\"", "Adaptador personalizado para sistema de riego. "
                        + "Diseñado en PETG resistente al agua y a la presión.", "piezas-funcionales", false),

                    // Productos Essen
                    trabajo("Soporte tapa Essen 24cm", "Soporte de pared para tapa de olla Essen 24cm. "
                        + "Impreso en blanco, montaje sin herramientas.", "productos-essen", true),
                    trabajo("Organizador utensilios Essen", "Organizador de cajón para set de utensilios Essen. "
                        + "Diseño modular, disponible en gris y negro.", "productos-essen", false),
                    trabajo("Base antideslizante olla 28cm", "Base de silicona-PLA para olla Essen 28cm. "
                        + "Protege la superficie y evita deslizamientos.", "productos-essen", false)
                );

                trabajoRepository.saveAll(trabajos);
                log.info("{} trabajos mock creados", trabajos.size());
            }

            // ── Preguntas Frecuentes ───────────────────────────────────────
            if (preguntaRepository.count() == 0) {
                List<Pregunta> faqs = List.of(
                    pregunta("¿Cuánto tarda una impresión?",
                        "El tiempo varía según la complejidad y tamaño de la pieza. Una pieza pequeña puede estar lista en pocas horas, mientras que proyectos más complejos pueden llevar días. Te damos un tiempo estimado al recibir tu pedido.", 1),
                    pregunta("¿Qué materiales utilizan?",
                        "Trabajamos principalmente con PLA, PETG, ABS y TPU. Cada material tiene características distintas en cuanto a resistencia, flexibilidad y temperatura. Te asesoramos sobre cuál es el mejor para tu proyecto sin costo adicional.", 2),
                    pregunta("¿Puedo enviarles mi propio diseño?",
                        "Sí, aceptamos archivos STL y OBJ. Si no tenés el archivo, podés describirnos lo que necesitás o enviarnos una imagen de referencia y nos encargamos del modelado 3D.", 3),
                    pregunta("¿Hacen envíos a todo el país?",
                        "Sí, enviamos a todo Argentina mediante Correo Argentino. El costo de envío se calcula según el peso y el destino y te lo informamos antes de confirmar el pedido.", 4),
                    pregunta("¿Cuál es el pedido mínimo?",
                        "No tenemos pedido mínimo. Fabricamos desde una sola pieza hasta lotes de producción para empresas. Cada pedido recibe la misma atención y calidad.", 5),
                    pregunta("¿Cómo solicito un presupuesto?",
                        "Podés contactarnos vía Instagram (@3d.san), email (impresiones3dsan@gmail.com) o usando el formulario de contacto de esta página. Respondemos en menos de 24 horas con un presupuesto detallado.", 6),
                    pregunta("¿Qué pasa si la pieza tiene defectos?",
                        "Garantizamos la calidad de cada pieza. Si detectás algún defecto en el producto recibido, reimprimimos sin costo adicional. Tu satisfacción es nuestra prioridad.", 7),
                    pregunta("¿Puedo elegir el color de impresión?",
                        "Sí, contamos con una amplia gama de colores en filamento. Si buscás un color específico para tu marca o proyecto, consultanos y buscamos la opción más cercana.", 8)
                );
                preguntaRepository.saveAll(faqs);
                log.info("{} preguntas frecuentes creadas", faqs.size());
            }
        };
    }

    private Pregunta pregunta(String preg, String resp, int orden) {
        Pregunta p = new Pregunta();
        p.setPregunta(preg);
        p.setRespuesta(resp);
        p.setOrden(orden);
        return p;
    }

    private Servicio servicio(String nombre, String slug, String corta, String detalle, String imagen, int orden) {
        Servicio s = new Servicio();
        s.setNombre(nombre);
        s.setSlug(slug);
        s.setDescripcionCorta(corta);
        s.setDescripcionDetalle(detalle);
        s.setImagenPortada(imagen);
        s.setOrden(orden);
        return s;
    }

    private Trabajo trabajo(String titulo, String descripcion, String categoria, boolean destacado) {
        Trabajo t = new Trabajo();
        t.setTitulo(titulo);
        t.setDescripcion(descripcion);
        t.setCategoria(categoria);
        t.setDestacado(destacado);
        t.setFecha(LocalDate.now().minusDays((long)(Math.random() * 180)));
        return t;
    }
}
