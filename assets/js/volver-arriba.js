// ==========================================================================
// BOTÓN FLOTANTE "VOLVER ARRIBA" (Scroll to Top)
// --------------------------------------------------------------------------
// Se inyecta o vincula automáticamente en cualquier página con desplazamiento.
// Aparece al bajar más de 300px y realiza un desplazamiento suave hacia el inicio.
// ==========================================================================
(function () {
    const UMBRAL_SCROLL_PX = 300;

    function inicializarBotonVolverArriba() {
        let btn = document.getElementById('scrollToTop') || document.querySelector('[data-back-to-top]');

        if (!btn) {
            btn = document.createElement('button');
            btn.type = 'button';
            btn.id = 'scrollToTop';
            btn.className = 'scroll-to-top';
            btn.setAttribute('aria-label', 'Volver al inicio de la página');
            btn.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i>';
            document.body.appendChild(btn);
        } else {
            btn.classList.add('scroll-to-top');
            if (!btn.getAttribute('aria-label')) {
                btn.setAttribute('aria-label', 'Volver al inicio de la página');
            }
        }

        let ticking = false;

        function actualizarVisibilidad() {
            const scrollActual = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if (scrollActual > UMBRAL_SCROLL_PX) {
                btn.classList.add('show');
                btn.classList.add('visible');
            } else {
                btn.classList.remove('show');
                btn.classList.remove('visible');
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(actualizarVisibilidad);
                ticking = true;
            }
        }, { passive: true });

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });

        actualizarVisibilidad();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarBotonVolverArriba);
    } else {
        inicializarBotonVolverArriba();
    }
})();
