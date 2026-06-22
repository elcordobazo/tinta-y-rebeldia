// ============================================================
// MAPA INTERACTIVO — pegá esto en tu archivo JS del mapa
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const grupos = document.querySelectorAll('.col-grupo');
  if (!grupos.length) return;

  const esTouch = window.matchMedia('(hover: none)').matches;

  // Calcula el largo real de cada ruta y lo asigna como dasharray/dashoffset
  // para que la animación de dibujado sea precisa sin importar el zoom
  grupos.forEach((grupo) => {
    const ruta = grupo.querySelector('.col-ruta');
    if (ruta) {
      const largo = ruta.getTotalLength();
      ruta.style.strokeDasharray = largo;
      ruta.style.strokeDashoffset = largo;
    }
  });

  grupos.forEach((grupo) => {
    const href = grupo.getAttribute('data-href');

    if (esTouch) {
      // Touch: primer tap activa, segundo tap navega
      grupo.addEventListener('click', () => {
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

  // Cerrar activo en touch si tocás fuera del mapa
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.col-grupo')) {
      grupos.forEach((g) => g.classList.remove('activo'));
    }
  });
});
