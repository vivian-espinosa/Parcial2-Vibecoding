document.addEventListener('DOMContentLoaded', () => {
  if (window.__vibeInitialized) return;
  window.__vibeInitialized = true;

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.header-layout nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Cerrar ×' : 'Menú ☰';
    });
  }

  const filters = document.querySelectorAll('[data-filter]');

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      filters.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');

      document.querySelectorAll('[data-category]').forEach((card) => {
        const hidden = button.dataset.filter !== 'todos' && card.dataset.category !== button.dataset.filter;
        card.classList.toggle('hidden-tool', hidden);
      });
    });
  });

  const roles = {
    frontend: {
      name: 'Frontend / UI',
      instruction: 'Diseña una interfaz clara, adaptable a móviles y con una jerarquía visual consistente. Utiliza HTML semántico, CSS propio y verifica accesibilidad.'
    },
    backend: {
      name: 'Backend',
      instruction: 'Organiza las rutas de una API para administrar equipos de un hackathon. Valida datos de entrada y documenta cada endpoint.'
    },
    qa: {
      name: 'Control de calidad',
      instruction: 'Prueba la navegación, los formularios y los estados de error. Escribe casos de prueba y explica los resultados encontrados.'
    },
    seguridad: {
      name: 'Seguridad',
      instruction: 'Revisa autenticación, permisos, entradas del usuario y gestión de credenciales. Describe los riesgos y cómo corregirlos.'
    }
  };

  const code = document.querySelector('#skill-code');
  const roleTitle = document.querySelector('#role-title');
  const roleButtons = document.querySelectorAll('[data-role]');

  roleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      roleButtons.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      const role = roles[button.dataset.role];
      if (!role) return;

      if (code) {
        code.textContent = '# SKILL.md\nname: ' + button.dataset.role + '\n\n# Instrucciones\n' + role.instruction;
      }
      if (roleTitle) roleTitle.textContent = role.name;
    });
  });

  const quiz = document.querySelector('#quiz');

  if (quiz) {
    quiz.addEventListener('submit', (event) => {
      event.preventDefault();
      const correct = { q1: 'b', q2: 'a', q3: 'c', q4: 'b', q5: 'a' };
      let score = 0;

      Object.entries(correct).forEach(([key, value]) => {
        const selected = quiz.querySelector('input[name="' + key + '"]:checked');
        if (selected && selected.value === value) score++;
      });

      const result = document.querySelector('#quiz-result');
      if (!result) return;
      result.textContent = 'Obtuviste ' + score + ' de 5 respuestas correctas. ' +
        (score === 5 ? '¡Excelente trabajo!' : 'Puedes revisar el contenido y volver a intentarlo.');
      result.classList.add('visible');
      result.setAttribute('role', 'status');
    });
  }
});
