/**
 * Portfolio Interactive Logic, Particles Canvas & Terminal Emulator
 * Candidate: San Jeffrey D | Cloud & DevOps
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme & Visual Canvas
  initTheme();
  initParticles();
  initScrollProgress();

  // 2. Initialize Dynamic Content
  renderSkills();
  renderProjects('all');
  renderExperienceAndCerts();

  // 3. Initialize Interactive Components
  initTypewriter();
  initStatsObserver();
  initTerminal();
  initProjectFilters();
  initModal();
  initContactForm();
  initNavigation();
});

/* ==========================================================================
   1. Theme Toggle Engine
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      showToast(`Switched to ${newTheme} mode`, 'success');
    });
  });
}

/* ==========================================================================
   2. Reading Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  });
}

/* ==========================================================================
   3. Interactive Background Particles (Constellation)
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 70);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 1.8 + 0.8
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const dotColor = isLight ? 'rgba(2, 132, 199, 0.4)' : 'rgba(56, 189, 248, 0.45)';
    const lineColor = isLight ? 'rgba(99, 102, 241, ' : 'rgba(56, 189, 248, ';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 125) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `${lineColor}${0.16 * (1 - dist / 125)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================================================
   4. Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const typedTarget = document.getElementById('typed-text');
  if (!typedTarget) return;

  const roles = (typeof portfolioData !== 'undefined' && portfolioData.personal && portfolioData.personal.roles) 
    ? portfolioData.personal.roles 
    : [
        "Junior DevOps Engineer",
        "Associate Cloud Engineer",
        "Junior Cloud Engineer",
        "Cloud Support Engineer",
        "Cloud Operations Engineer"
      ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 85;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typedTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1900; // Pause at word completion
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 380;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* ==========================================================================
   5. Dynamic Skills Rendering
   ========================================================================== */
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container || typeof portfolioData === 'undefined') return;

  container.innerHTML = portfolioData.skills.map(cat => `
    <div class="skill-category-card">
      <div class="skill-cat-header">
        <i class="${cat.icon}"></i>
        <span>${cat.category}</span>
      </div>
      <div class="skill-items-list">
        ${cat.items.map(item => `
          <div class="skill-row">
            <div class="skill-meta">
              <div class="skill-name-wrap">
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
              </div>
              <span class="skill-percent">${item.level}%</span>
            </div>
            <div class="skill-bar-bg">
              <div class="skill-bar-fill" style="width: ${item.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   6. Dynamic Projects Rendering & Filtering
   ========================================================================== */
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid || typeof portfolioData === 'undefined') return;

  const filtered = filter === 'all' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.category === filter || filter === 'all');

  grid.innerHTML = filtered.map(p => `
    <div class="project-card" data-id="${p.id}">
      <div class="project-img-box">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <span class="project-badge">${p.badge}</span>
      </div>
      <div class="project-body">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.78rem; font-weight: 700; color: var(--accent-primary); text-transform: uppercase; letter-spacing: 0.05em;">${p.type}</span>
          <span style="color: var(--text-muted);">•</span>
          <span style="font-size: 0.78rem; color: var(--accent-emerald); font-weight: 600;">${p.status}</span>
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-summary">${p.summary}</p>
        
        <div class="project-tags">
          ${p.tags.slice(0, 5).map(t => `<span class="tag-chip">${t}</span>`).join('')}
        </div>

        <div class="project-metrics-list">
          ${p.metrics.map(m => `
            <span class="metric-chip">
              <i class="fa-solid fa-circle-check"></i> ${m}
            </span>
          `).join('')}
        </div>

        <div class="project-footer">
          <div class="project-links">
            <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="p-link" title="View Repository on GitHub">
              <i class="fa-brands fa-github"></i> View My GitHub
            </a>
          </div>
          <button class="btn-details" onclick="openProjectModal('${p.id}')">
            Architecture Details
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

/* ==========================================================================
   7. Experience, Education & Certifications Rendering
   ========================================================================== */
function renderExperienceAndCerts() {
  // Experience Timeline
  const timeline = document.getElementById('experience-timeline');
  if (timeline && typeof portfolioData !== 'undefined') {
    timeline.innerHTML = portfolioData.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-node"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
              <h4 class="timeline-role">${exp.role}</h4>
              <span class="tag-chip" style="color: var(--accent-emerald); border-color: rgba(52, 211, 153, 0.3); font-size: 0.75rem;">${exp.type}</span>
            </div>
            <div class="timeline-company">${exp.company}</div>
            <div class="timeline-meta">
              <span><i class="fa-regular fa-calendar"></i> ${exp.period}</span>
              <span><i class="fa-solid fa-location-dot"></i> ${exp.location}</span>
            </div>
          </div>
          <p class="timeline-desc">${exp.description}</p>
          
          <h5 style="font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin: 0.75rem 0 0.4rem;">Key Responsibilities:</h5>
          <ul class="timeline-bullets">
            ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
          </ul>

          <h5 style="font-size: 0.88rem; font-weight: 700; color: var(--accent-primary); margin: 1rem 0 0.5rem;">Transferable Skills to Cloud &amp; DevOps:</h5>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${exp.transferableSkills.map(s => `<span class="tag-chip" style="color: var(--accent-primary); background: rgba(56, 189, 248, 0.08);">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Education Card
  const eduCard = document.getElementById('education-card-container');
  if (eduCard && typeof portfolioData !== 'undefined' && portfolioData.education) {
    const edu = portfolioData.education;
    eduCard.innerHTML = `
      <div class="cert-card" style="border-left: 3px solid var(--accent-primary);">
        <div class="cert-icon-wrap" style="color: var(--accent-primary);">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <div class="cert-info" style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.25rem;">
            <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.2rem;">${edu.degree}</h4>
            <span style="font-size: 0.82rem; font-weight: 600; color: var(--accent-primary); font-family: var(--font-mono);">${edu.graduation}</span>
          </div>
          <p style="font-size: 0.9rem; color: var(--accent-secondary); font-weight: 600; margin-bottom: 0.4rem;">${edu.institution}</p>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">${edu.description}</p>
        </div>
      </div>
    `;
  }

  // Certifications List (AWS Academy with Credly Verification)
  const certsList = document.getElementById('certs-list');
  if (certsList && typeof portfolioData !== 'undefined') {
    certsList.innerHTML = portfolioData.certifications.map(c => `
      <div class="cert-card" style="border-left: 3px solid ${c.badgeColor}; flex-direction: column; align-items: flex-start; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 1.1rem; width: 100%;">
          <div class="cert-icon-wrap" style="color: ${c.badgeColor};">
            <i class="${c.icon}"></i>
          </div>
          <div class="cert-info" style="flex: 1;">
            <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.2rem;">${c.title}</h4>
            <p style="font-size: 0.88rem; color: var(--accent-amber); font-weight: 600;">${c.issuer}</p>
            <p style="font-size: 0.82rem; color: var(--text-muted);">${c.duration} • ${c.date}</p>
          </div>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">${c.description}</p>
        <a href="${c.credlyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="padding: 0.45rem 1rem; font-size: 0.85rem; width: 100%; border-color: ${c.badgeColor}; color: ${c.badgeColor};">
          <i class="fa-solid fa-award"></i> Verify Digital Badge on Credly ↗
        </a>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   8. Project Modal Details
   ========================================================================== */
function initModal() {
  const backdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && backdrop) {
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('active')) {
        closeModal();
      }
    });
  }
}

window.openProjectModal = function(projectId) {
  if (typeof portfolioData === 'undefined') return;
  const project = portfolioData.projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-project-title');
  const body = document.getElementById('modal-project-body');

  title.textContent = project.title;
  body.innerHTML = `
    <div>
      <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
        <span class="tag-chip" style="color: var(--accent-primary); font-weight: 700;">${project.type}</span>
        <span class="tag-chip" style="color: var(--accent-emerald);">${project.status}</span>
      </div>
      <h5 class="modal-section-title">Project Overview</h5>
      <p class="project-summary">${project.description}</p>
    </div>

    <div>
      <h5 class="modal-section-title">Current Architecture</h5>
      <div class="modal-architecture-box">
        <code>${project.currentArchitecture}</code>
      </div>
    </div>

    <div>
      <h5 class="modal-section-title">Planned / Target Architecture</h5>
      <div class="modal-architecture-box" style="border-color: rgba(245, 158, 11, 0.3); color: var(--accent-amber);">
        <code>${project.plannedArchitecture}</code>
      </div>
    </div>

    <div>
      <h5 class="modal-section-title">DevOps &amp; Cloud Demonstrations</h5>
      <ul class="timeline-bullets">
        ${project.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>

    <div>
      <h5 class="modal-section-title">Technologies &amp; Tooling</h5>
      <div class="project-tags">
        ${project.tags.map(t => `<span class="tag-chip">${t}</span>`).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 1rem; margin-top: 1.25rem;">
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1;">
        <i class="fa-brands fa-github"></i> View My GitHub Repository
      </a>
      <a href="https://www.linkedin.com/in/san-jeffrey-95a589354/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="flex: 1;">
        <i class="fa-brands fa-linkedin"></i> Connect on LinkedIn
      </a>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   9. Interactive DevOps Terminal Emulator
   ========================================================================== */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const historyContainer = document.getElementById('terminal-history');
  const terminalBody = document.getElementById('terminal-body');
  if (!input || !historyContainer) return;

  const commandHistory = [];
  let historyPointer = -1;

  // Banner welcome
  appendOutput(`
<span class="term-info">⚡ Welcome to San Jeffrey D's Cloud & DevOps Interactive Shell</span>
Target Roles: <span class="term-highlight">Junior DevOps Engineer | Associate Cloud Engineer | Cloud Support</span>
Type <span class="term-highlight">'help'</span> to see available commands or click any chip above.
----------------------------------------------------------------------`, false);

  window.runTerminalCommand = function(cmd) {
    input.value = cmd;
    processCommand(cmd);
    input.value = '';
    input.focus();
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const raw = input.value.trim();
      if (raw) {
        commandHistory.push(raw);
        historyPointer = commandHistory.length;
        processCommand(raw);
      }
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      if (historyPointer > 0) {
        historyPointer--;
        input.value = commandHistory[historyPointer] || '';
      }
    } else if (e.key === 'ArrowDown') {
      if (historyPointer < commandHistory.length - 1) {
        historyPointer++;
        input.value = commandHistory[historyPointer] || '';
      } else {
        historyPointer = commandHistory.length;
        input.value = '';
      }
    }
  });

  function processCommand(raw) {
    appendOutput(`<span class="term-prompt">san-jeffrey@cloud-ops:~$</span> <span class="term-info">${escapeHtml(raw)}</span>`);

    const parts = raw.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (cmd) {
      case 'help':
        appendOutput(`
<span class="term-highlight">Available Shell Commands:</span>
  <span class="term-info">about</span>          - Professional summary, education & target roles
  <span class="term-info">skills</span>         - Technical skills across AWS, Docker, Linux, CI/CD, Git
  <span class="term-info">projects</span>       - CloudDeploy platform & DevOps hands-on labs
  <span class="term-info">certs</span>          - AWS Academy Cloud Architecting (with Credly badge)
  <span class="term-info">experience</span>     - IT Support Executive background at Concord Consultancy
  <span class="term-info">education</span>      - B.Tech in IT (Saint Xavier's Catholic College of Engg)
  <span class="term-info">deploy</span>         - Simulate CloudDeploy containerized Nginx deployment
  <span class="term-info">contact</span>        - LinkedIn & GitHub direct profile links
  <span class="term-info">theme</span>          - Toggle Dark / Light theme
  <span class="term-info">cat &lt;file&gt;</span>     - View files (e.g. 'cat bio.txt', 'cat Dockerfile')
  <span class="term-info">clear</span>         - Clear terminal output
`);
        break;

      case 'about':
        if (typeof portfolioData !== 'undefined') {
          appendOutput(`
<span class="term-highlight">${portfolioData.personal.name}</span>
<span class="term-muted">Location:</span> ${portfolioData.personal.location}
<span class="term-muted">Career Goal:</span> "${portfolioData.personal.careerGoal}"
<span class="term-muted">Education:</span> ${portfolioData.education.degree} (${portfolioData.education.graduation})

<span class="term-info">Professional Summary:</span>
${portfolioData.personal.bio}
`);
        }
        break;

      case 'skills':
        if (typeof portfolioData !== 'undefined') {
          let skillText = `<span class="term-highlight">Technical Competencies Matrix:</span>\n`;
          portfolioData.skills.forEach(s => {
            skillText += `\n<span class="term-info">[${s.category}]</span>\n`;
            skillText += s.items.map(i => `  • ${i.name.padEnd(32, ' ')} [${'#'.repeat(Math.round(i.level/10))}${' '.repeat(10-Math.round(i.level/10))}] ${i.level}%`).join('\n');
          });
          appendOutput(skillText);
        }
        break;

      case 'projects':
        if (typeof portfolioData !== 'undefined') {
          let pText = `<span class="term-highlight">Practical DevOps &amp; Cloud Projects:</span>\n`;
          portfolioData.projects.forEach((p, idx) => {
            pText += `\n<span class="term-success">[${idx + 1}] ${p.title}</span> (${p.status})\n    <span class="term-muted">Current:</span> ${p.currentArchitecture}\n    <span class="term-muted">Planned:</span> ${p.plannedArchitecture}\n    <span class="term-info">GitHub:</span> <a href="${p.github}" target="_blank" class="term-info">${p.github}</a>`;
          });
          appendOutput(pText);
        }
        break;

      case 'certs':
      case 'certifications':
        if (typeof portfolioData !== 'undefined') {
          let cText = `<span class="term-highlight">Verified Industry Certifications:</span>\n`;
          portfolioData.certifications.forEach(c => {
            cText += `  ✔ <span class="term-success">${c.title}</span>\n     Issuer: ${c.issuer} | Duration: ${c.duration} | ${c.date}\n     Digital Badge: <a href="${c.credlyUrl}" target="_blank" class="term-info">${c.credlyUrl}</a>\n`;
          });
          appendOutput(cText);
        }
        break;

      case 'experience':
        if (typeof portfolioData !== 'undefined') {
          const exp = portfolioData.experience[0];
          appendOutput(`
<span class="term-highlight">${exp.role}</span> @ <span class="term-success">${exp.company}</span>
<span class="term-muted">Duration:</span> ${exp.period} | ${exp.location}
<span class="term-info">Description:</span> ${exp.description}

<span class="term-highlight">Transferable Skills to Cloud &amp; DevOps:</span>
${exp.transferableSkills.map(s => `  ✔ ${s}`).join('\n')}
`);
        }
        break;

      case 'education':
        if (typeof portfolioData !== 'undefined') {
          const edu = portfolioData.education;
          appendOutput(`
<span class="term-highlight">Degree:</span> ${edu.degree}
<span class="term-muted">Institution:</span> ${edu.institution}
<span class="term-muted">Graduation:</span> ${edu.graduation}
<span class="term-info">${edu.description}</span>
`);
        }
        break;

      case 'deploy':
        simulateDeployment();
        break;

      case 'contact':
        if (typeof portfolioData !== 'undefined') {
          appendOutput(`
<span class="term-highlight">Professional Profiles &amp; Direct Channels:</span>
  💼 LinkedIn: <a href="${portfolioData.personal.linkedin}" target="_blank" class="term-info">${portfolioData.personal.linkedin}</a>
  🐙 GitHub:   <a href="${portfolioData.personal.github}" target="_blank" class="term-info">${portfolioData.personal.github}</a>
  📍 Location: ${portfolioData.personal.location}
`);
        }
        break;

      case 'theme':
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        appendOutput(`<span class="term-success">✔ Theme switched to ${newTheme} mode.</span>`);
        break;

      case 'cat':
        if (arg === 'bio.txt' && typeof portfolioData !== 'undefined') {
          appendOutput(portfolioData.personal.bio);
        } else if (arg === 'Dockerfile' || arg === 'dockerfile') {
          appendOutput(`FROM nginx:latest\nCOPY Portfolio/ /usr/share/nginx/html/\nEXPOSE 80`);
        } else if (arg === 'docker-compose.yml') {
          appendOutput(`services:\n  web:\n    build: .\n    container_name: cloud-web\n    ports:\n      - "8080:80"`);
        } else {
          appendOutput(`<span class="term-warning">File not found: '${escapeHtml(arg || '')}'. Try 'cat bio.txt', 'cat Dockerfile', or 'cat docker-compose.yml'</span>`);
        }
        break;

      case 'clear':
        historyContainer.innerHTML = '';
        break;

      case 'sudo':
        appendOutput(`<span class="term-danger">Nice try! User san-jeffrey is granted root privileges for cloud learning 🚀</span>`);
        break;

      case 'echo':
        appendOutput(escapeHtml(arg));
        break;

      default:
        appendOutput(`<span class="term-warning">Command not found: '${escapeHtml(cmd)}'. Type <span class="term-highlight">'help'</span> for list of commands.</span>`);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function appendOutput(html, isCommand = true) {
    const div = document.createElement('div');
    div.className = 'term-output-line';
    div.innerHTML = html;
    historyContainer.appendChild(div);
  }

  function simulateDeployment() {
    appendOutput(`<span class="term-info">🚀 Running CloudDeploy Containerized Build &amp; Deployment...</span>`);
    
    const steps = [
      "Cloning source code repository from GitHub (main branch)... [FETCHED]",
      "Executing Docker multi-stage build: 'docker build -t cloud-web .' ... [BUILT]",
      "Validating Nginx configuration & index.html static assets... [SYNTAX OK]",
      "Deploying container with Docker Compose (mapping port 8080:80)... [RUNNING]",
      "✨ Deployment Successful! Nginx web server active and listening on http://localhost:8080"
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        appendOutput(`<span class="term-success">  ✔ Step ${i+1}/${steps.length}:</span> ${step}`);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }, (i + 1) * 400);
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
  }
}

/* ==========================================================================
   10. Stats Observer & Counter Animation
   ========================================================================== */
function initStatsObserver() {
  const statElements = document.querySelectorAll('.stat-number');
  if (!statElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalNum = parseFloat(target.getAttribute('data-count') || 0);
        const suffix = target.getAttribute('data-suffix') || '';
        animateValue(target, 0, finalNum, 1500, suffix);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statElements.forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration, suffix = '') {
  let startTimestamp = null;
  const isFloat = end % 1 !== 0;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = progress * (end - start) + start;
    obj.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* ==========================================================================
   11. Contact Form Handler & Toast System
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
      showToast('🚀 Message received! Thank you for reaching out.', 'success');
    }, 900);
  });
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="toast-icon fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
    <span>${msg}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ==========================================================================
   12. Navigation & Scroll Spy
   ========================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
      });
    });
  }

  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
