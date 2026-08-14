document.addEventListener('DOMContentLoaded', () => {

  /* ---------- PRELOADER ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => preloader.classList.add('hidden'));
  setTimeout(() => preloader.classList.add('hidden'), 1500);

  /* ---------- AOS ---------- */
  if (window.AOS) AOS.init({ once: true, duration: 800, easing: 'ease-out-cubic' });

  /* ---------- STICKY HEADER ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ---------- MOBILE NAV ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });

  /* ---------- SMOOTH SCROLL + ACTIVE LINK + CLOSE MOBILE NAV ---------- */
  const navLinks = document.querySelectorAll('[data-scroll]');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const icon = navToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const spyLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    spyLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  /* ---------- COUNTERS ---------- */
  const counters = document.querySelectorAll('[data-count], [data-target]');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count || el.dataset.target, 10);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('es-CO');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('es-CO');
    };
    requestAnimationFrame(step);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- SWIPER SLIDERS ---------- */
  if (window.Swiper) {
    new Swiper('.pets-swiper', {
      loop: true,
      spaceBetween: 24,
      slidesPerView: 1,
      pagination: { el: '.pets-swiper .swiper-pagination', clickable: true },
      navigation: { nextEl: '.pets-swiper .swiper-button-next', prevEl: '.pets-swiper .swiper-button-prev' },
      autoplay: { delay: 3800, disableOnInteraction: false },
      breakpoints: { 640: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }
    });

    new Swiper('.shop-swiper', {
      loop: true,
      spaceBetween: 24,
      slidesPerView: 1,
      pagination: { el: '.shop-swiper .swiper-pagination', clickable: true },
      navigation: { nextEl: '.shop-swiper .swiper-button-next', prevEl: '.shop-swiper .swiper-button-prev' },
      autoplay: { delay: 4200, disableOnInteraction: false },
      breakpoints: { 640: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }
    });

    new Swiper('.testimonials-swiper', {
      loop: true,
      spaceBetween: 24,
      slidesPerView: 1,
      pagination: { el: '.testimonials-swiper .swiper-pagination', clickable: true },
      autoplay: { delay: 5000, disableOnInteraction: false },
      breakpoints: { 992: { slidesPerView: 2 } }
    });
  }

  /* ---------- 3D TILT (VanillaTilt) ---------- */
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
      max: 12,
      speed: 400,
      glare: true,
      'max-glare': 0.25,
      scale: 1.03
    });
  }

  /* ---------- CURRENCY CONVERTER ---------- */
  const RATES = { COP: 1, USD: 1 / 4000, EUR: 1 / 4300 };
  const SYMBOLS = { COP: '$', USD: 'US$', EUR: '€' };
  const currencySelect = document.getElementById('currencySelect');
  const currencyLabel = document.getElementById('currencyLabel');
  const priceValues = document.querySelectorAll('.price-value');
  const priceCurrencies = document.querySelectorAll('.price-currency');

  function formatPrice(cop, currency) {
    const converted = cop * RATES[currency];
    if (currency === 'COP') {
      return Math.round(converted).toLocaleString('es-CO');
    }
    return converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function applyCurrency(currency) {
    priceValues.forEach(el => {
      const cop = parseFloat(el.dataset.cop);
      el.textContent = `${SYMBOLS[currency]} ${formatPrice(cop, currency)}`;
    });
    priceCurrencies.forEach(el => el.textContent = currency);
    if (currencyLabel) currencyLabel.textContent = currency;
  }

  if (currencySelect) {
    applyCurrency(currencySelect.value);
    currencySelect.addEventListener('change', () => applyCurrency(currencySelect.value));
  }

  /* ---------- CONTACT FORM (front-end only demo) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      formSuccess.classList.add('show');
      contactForm.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 6000);
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      input.value = '';
      input.placeholder = '¡Gracias por suscribirte!';
    });
  }

  /* ---------- BACK TO TOP ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- FOOTER YEAR ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- CHATBOT ---------- */
  const chatToggle = document.getElementById('chatToggle');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  const chatBody = document.getElementById('chatBody');
  const chatQuickReplies = document.getElementById('chatQuickReplies');

  const CHAT_MENU = [
    { id: 'adopcion', label: '¿Cómo adopto?', reply: 'Para adoptar debes completar el formulario de contacto seleccionando "Adopción", agendaremos una visita y una entrevista rápida con nuestro equipo. ¡Todo el proceso es gratuito!' },
    { id: 'donar', label: '¿Cómo donar?', reply: 'Puedes donar dinero, alimento o insumos veterinarios escribiéndonos por WhatsApp, o comprando en nuestra tienda solidaria: el 100% se destina al cuidado de los animales.' },
    { id: 'horario', label: 'Horario de atención', reply: 'Atendemos de lunes a sábado, de 8:00 a.m. a 5:00 p.m. Los domingos solo urgencias por WhatsApp.' },
    { id: 'voluntariado', label: 'Ser voluntario', reply: '¡Genial! Cuéntanos por el formulario de contacto seleccionando "Voluntariado" y te enviaremos la próxima jornada de rescate o adopción.' },
    { id: 'contacto', label: 'Hablar con un asesor', reply: 'Claro, escríbenos al +57 300 123 4567 por WhatsApp o completa el formulario de contacto y te responderemos en menos de 24 horas.' }
  ];

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function renderMenu() {
    chatQuickReplies.innerHTML = '';
    CHAT_MENU.forEach(item => {
      const btn = document.createElement('button');
      btn.textContent = item.label;
      btn.addEventListener('click', () => {
        addMessage(item.label, 'user');
        setTimeout(() => {
          addMessage(item.reply, 'bot');
          renderBackButton();
        }, 400);
      });
      chatQuickReplies.appendChild(btn);
    });
  }

  function renderBackButton() {
    chatQuickReplies.innerHTML = '';
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Volver al menú';
    btn.addEventListener('click', renderMenu);
    chatQuickReplies.appendChild(btn);
  }

  let chatStarted = false;
  function openChat() {
    chatWindow.classList.add('open');
    if (!chatStarted) {
      chatStarted = true;
      addMessage('¡Hola! Soy el asistente virtual de Patitas Felices. ¿En qué puedo ayudarte hoy?', 'bot');
      renderMenu();
    }
  }

  chatToggle.addEventListener('click', () => {
    chatWindow.classList.contains('open') ? chatWindow.classList.remove('open') : openChat();
  });
  chatClose.addEventListener('click', () => chatWindow.classList.remove('open'));

});
