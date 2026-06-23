// ============================================================
// MAPA INTERACTIVO — mapa.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const grupos = document.querySelectorAll('.col-grupo');
  if (!grupos.length) return;

  const esTouch = window.matchMedia('(hover: none)').matches;

  // Calcula el largo real de cada ruta para que la animación sea exacta
  grupos.forEach((grupo) => {
    const ruta = grupo.querySelector('.col-ruta');
    if (ruta) {
      try {
        const largo = ruta.getTotalLength();
        ruta.style.strokeDasharray = largo;
        ruta.style.strokeDashoffset = largo;
      } catch(e) {}
    }
  });

  grupos.forEach((grupo) => {
    const href = grupo.getAttribute('data-href');

    if (esTouch) {
      // Touch: primer tap activa hover, segundo tap navega
      grupo.addEventListener('click', (e) => {
        e.stopPropagation();
        const yaActivo = grupo.classList.contains('activo');
        grupos.forEach((g) => g.classList.remove('activo'));
        if (!yaActivo) {
          grupo.classList.add('activo');
        } else if (href) {
          window.location.href = href;
        }
      });
    } else {
      // Desktop: click navega directo
      if (href) {
        grupo.addEventListener('click', () => {
          window.location.href = href;
        });
      }

      // Accesibilidad teclado
      grupo.setAttribute('tabindex', '0');
      grupo.setAttribute('role', 'button');
      grupo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (href) window.location.href = href;
        }
      });
    }
  });

  // Cerrar activo en touch si tocás fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.col-grupo')) {
      grupos.forEach((g) => g.classList.remove('activo'));
    }
  });
});
