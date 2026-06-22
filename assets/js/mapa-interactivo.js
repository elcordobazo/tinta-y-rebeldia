// Tinta y Rebeldía — Mapa interactivo de columnas
// Maneja hover de escritorio y tap en touch, y navega al hacer click.

document.addEventListener('DOMContentLoaded', () => {
  const grupos = document.querySelectorAll('.col-grupo');
  if (!grupos.length) return;

  const esTouch = window.matchMedia('(hover: none)').matches;

  grupos.forEach((grupo) => {
    const href = grupo.getAttribute('data-href');

    if (esTouch) {
      // En touch: primer tap activa el hover, segundo tap navega
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
      // En desktop: click navega directamente
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
