// ============================================================
// MAPA INTERACTIVO — mapa.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const grupos = document.querySelectorAll('.col-grupo');
  if (!grupos.length) return;

  const esTouch = window.matchMedia('(hover: none)').matches;

  // Inicializa cada ruta con dasharray y dashoffset correctos
  // Usa requestAnimationFrame para asegurarse que el SVG ya renderizó
  requestAnimationFrame(() => {
    grupos.forEach((grupo) => {
      const ruta = grupo.querySelector('.col-ruta');
      if (!ruta) return;

      // getTotalLength() puede dar 0 si el SVG no renderizó; usamos fallback
      let largo = 0;
      try { largo = ruta.getTotalLength(); } catch(e) {}
      if (!largo || largo < 10) largo = 3000;

      ruta.style.strokeDasharray  = largo;
      ruta.style.strokeDashoffset = largo;
      // Forzamos un reflow para que el browser registre el estado inicial
      ruta.getBoundingClientRect();
    });
  });

  grupos.forEach((grupo) => {
    const href = grupo.getAttribute('data-href');

    if (esTouch) {
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
      if (href) {
        grupo.addEventListener('click', () => {
          window.location.href = href;
        });
      }
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
