document.documentElement.classList.add('js');

const cibles = document.querySelectorAll('.apparait');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entrees) => {
    entrees.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  cibles.forEach((c) => obs.observe(c));
} else {
  cibles.forEach((c) => c.classList.add('visible'));
}

// Formulaire de contact : ouvre le mail du visiteur, prérempli
const form = document.querySelector('#form-contact');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const corps = `${d.get('message')}\n\n— ${d.get('nom')}\nEmail : ${d.get('email')}\nTéléphone : ${d.get('telephone') || 'non renseigné'}`;
    window.location.href = `mailto:contact@lecrivainpublic.example?subject=${encodeURIComponent("Demande depuis le site L'Écrivain Public")}&body=${encodeURIComponent(corps)}`;
    form.querySelector('.statut').textContent = "Votre messagerie va s'ouvrir avec votre message prêt à envoyer.";
  });
}
