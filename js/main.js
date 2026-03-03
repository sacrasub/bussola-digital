document.addEventListener('DOMContentLoaded', () => {

    // Navbar Effect On Scroll
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 17, 40, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.2)';
            navbar.style.padding = '0.8rem 0';
        } else {
            navbar.style.background = 'rgba(10, 17, 40, 0.85)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            navbar.style.padding = '1.2rem 0';
        }
    });

    // Form submission mock (Para o MVP)
    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = leadForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="ph-bold ph-spinner ph-spin"></i> Processando...';
            btn.style.opacity = '0.8';

            // Simula um processamento de API
            setTimeout(() => {
                const nome = document.getElementById('nome').value;
                alert(`Sucesso, ${nome}! Você será redirecionado para o Grupo VIP e seu e-book chegará em instantes.`);

                // Limpa o form e volta botão ao normal
                leadForm.reset();
                btn.innerHTML = originalText;
                btn.style.opacity = '1';

                // Simulando Redirecionamento (Pode colocar o link real do grupo do WhatsApp aqui futuramente)
                // window.location.href = "https://chat.whatsapp.com/...";
            }, 1500);
        });
    }
});
