/**
 * GDW 2026 On-Site Guide - Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.GDW_CONFIG || {};

  // DOM Elements
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalIcon = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody = document.getElementById('modal-body');
  const modalActions = document.getElementById('modal-actions');
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  // Accordion
  const surveyAccordion = document.getElementById('accordion-survey');
  const surveyHeader = document.getElementById('btn-survey-header');

  // Populate dynamic Header & Event Info from config
  if (config.event) {
    if (config.event.title) document.getElementById('event-title').innerHTML = config.event.title.replace('On-Site Guide', '<span>On-Site Guide</span>');
    if (config.event.subtitle) document.getElementById('event-subtitle').textContent = config.event.subtitle;
    if (config.event.dates) document.getElementById('event-dates').textContent = config.event.dates;
    if (config.event.venue) document.getElementById('event-venue').textContent = config.event.venue;
  }

  // Toast Function
  function showToast(msg = '클립보드에 복사되었습니다.') {
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // Copy to Clipboard
  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`비밀번호 '${text}'가 복사되었습니다.`);
      }).catch(() => {
        fallbackCopyTextToClipboard(text);
      });
    } else {
      fallbackCopyTextToClipboard(text);
    }
  }

  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`비밀번호 '${text}'가 복사되었습니다.`);
    } catch (err) {
      showToast('복사에 실패했습니다. 직접 선택하여 복사해주세요.');
    }
    document.body.removeChild(textArea);
  }

  // Modal Control Functions
  function openModal(options) {
    modalIcon.textContent = options.icon || 'ℹ️';
    modalTitle.textContent = options.title || '';
    modalSubtitle.textContent = options.subtitle || '';
    modalBody.innerHTML = options.bodyHTML || '';
    modalActions.innerHTML = options.actionsHTML || '';

    modalOverlay.classList.add('active');

    // Attach copy button handler inside modal if exists
    const copyBtn = modalBody.querySelector('.copy-pwd-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const pwd = copyBtn.getAttribute('data-password');
        copyToClipboard(pwd);
      });
    }
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // 1. 🎟️ On-Site Registration Click Handler
  const btnOnsite = document.getElementById('btn-onsite-register');
  if (btnOnsite) {
    btnOnsite.addEventListener('click', (e) => {
      const reg = (window.GDW_CONFIG && window.GDW_CONFIG.onSiteRegistration) || config.onSiteRegistration || {};
      if (!reg.url || reg.url.trim() === '') {
        e.preventDefault();
        openModal({
          icon: '🎟️',
          title: '모바일 현장등록',
          subtitle: 'On-Site Registration',
          bodyHTML: `
            <div class="info-box">
              <p style="font-size: 0.875rem; color: var(--text-primary); line-height: 1.5;">
                GDW 2026 현장 등록 및 참가 신청 페이지입니다.
              </p>
            </div>
          `,
          actionsHTML: `
            <button class="btn-secondary-action" onclick="document.getElementById('modal-overlay').classList.remove('active')">닫기</button>
          `
        });
      }
    });
  }

  // 2. 📖 e-Program Book Click Handler
  const btnProgram = document.getElementById('btn-program-book');
  if (btnProgram) {
    btnProgram.addEventListener('click', (e) => {
      const info = (window.GDW_CONFIG && window.GDW_CONFIG.programBook) || config.programBook || {};
      if (!info.url || info.url.trim() === '') {
        e.preventDefault();
        openModal({
          icon: '📖',
          title: '📖 e-Program Book',
          subtitle: '프로그램북 링크 안내',
          bodyHTML: `
            <div class="info-box">
              <p style="font-size: 0.875rem; color: var(--text-primary); line-height: 1.5;">
                GDW 2026 전자 프로그램북 연결 페이지입니다.<br>
                현재 <strong>행사 준비 중</strong>으로 링크가 연결 예정 상태입니다.
              </p>
            </div>
            <div class="instruction-list">
              <div class="instruction-item">• 프로그램 및 연사 정보가 담긴 e-Book 디지털 책자입니다.</div>
            </div>
          `,
          actionsHTML: `
            <button class="btn-secondary-action" onclick="document.getElementById('modal-overlay').classList.remove('active')">닫기 (Close)</button>
          `
        });
      }
    });
  }



  // 4. 🎧 AI Live Interpretation (SNAP SIGHT) Handler
  document.getElementById('btn-ai-interpretation').addEventListener('click', () => {
    const ai = config.aiInterpretation || {};
    const instructionsHTML = (ai.instructions || [])
      .map(item => `<div class="instruction-item">${item}</div>`)
      .join('');

    const actionButton = (ai.url && ai.url.trim() !== '') 
      ? `<a href="${ai.url}" target="_blank" class="btn-primary-action">🎧 SNAP SIGHT 접속하기</a>`
      : `<button class="btn-primary-action" onclick="window.GDW_SHOW_TOAST('SNAP SIGHT 서비스 접속 링크 연결 예정입니다.')">🎧 SNAP SIGHT 바로가기 (준비중)</button>`;

    openModal({
      icon: '🎧',
      title: '실시간 AI 통역 (SNAP SIGHT)',
      subtitle: 'AI Live Multilingual Interpretation',
      bodyHTML: `
        <div class="info-box">
          <p style="font-size: 0.85rem; color: var(--text-primary); line-height: 1.5;">
            ${ai.description || '행사 중 무대에서 보여지는 실시간 AI 번역 자막 서비스를 개인 스마트폰에서도 확인하실 수 있습니다. (※ 음성 서비스는 제공되지 않습니다.)'}
          </p>
        </div>
        <div class="section-title" style="margin-bottom: 6px;">이용 방법 (How to use)</div>
        <div class="instruction-list">
          ${instructionsHTML}
        </div>
      `,
      actionsHTML: `
        ${actionButton}
        <button class="btn-secondary-action" onclick="document.getElementById('modal-overlay').classList.remove('active')">닫기</button>
      `
    });
  });

  // 5. 🔴 YouTube Live Streaming Handler
  document.getElementById('btn-youtube-live').addEventListener('click', () => {
    const yt = config.youtubeLive || {};
    const instructionsHTML = (yt.instructions || [])
      .map(item => `<div class="instruction-item">${item}</div>`)
      .join('');

    const actionButton = (yt.url && yt.url.trim() !== '') 
      ? `<a href="${yt.url}" target="_blank" class="btn-primary-action" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">▶️ 유튜브 라이브 시청하기</a>`
      : `<button class="btn-primary-action" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);" onclick="window.GDW_SHOW_TOAST('유튜브 라이브 방송 링크 연결 준비 중입니다.')">🔴 유튜브 라이브 바로가기 (준비중)</button>`;

    openModal({
      icon: '🔴',
      title: '유튜브 라이브 실시간 중계',
      subtitle: 'YouTube Live Streaming',
      bodyHTML: `
        <div class="info-box">
          <p style="font-size: 0.85rem; color: var(--text-primary); line-height: 1.5;">
            ${yt.description || 'GDW 2026 주요 세션 현장을 실시간 유튜브 라이브 스트리밍으로 생중계합니다.'}
          </p>
        </div>
        <div class="section-title" style="margin-bottom: 6px;">시청 안내 (Streaming Guide)</div>
        <div class="instruction-list">
          ${instructionsHTML}
        </div>
      `,
      actionsHTML: `
        ${actionButton}
        <button class="btn-secondary-action" onclick="document.getElementById('modal-overlay').classList.remove('active')">닫기</button>
      `
    });
  });

  // 6. 📲 Official App (CVENT) Handler
  const btnOfficial = document.getElementById('btn-official-app');
  if (btnOfficial) {
    btnOfficial.addEventListener('click', (e) => {
      const app = (window.GDW_CONFIG && window.GDW_CONFIG.officialApp) || config.officialApp || {};
      if (!app.url || app.url.trim() === '') {
        e.preventDefault();
        const instructionsHTML = (app.instructions || [])
          .map(item => `<div class="instruction-item">${item}</div>`)
          .join('');

        openModal({
          icon: '📲',
          title: '행사 공식 앱 (CVENT)',
          subtitle: 'CVENT Events Mobile App',
          bodyHTML: `
            <div class="info-box">
              <div class="info-row">
                <span class="info-label">이벤트 코드 (Event Code)</span>
                <span class="info-value" style="color: var(--mint);">${app.eventCode || 'GDW2026'}</span>
              </div>
            </div>
            <div class="section-title" style="margin-bottom: 6px;">설치 및 이용 방법</div>
            <div class="instruction-list">
              ${instructionsHTML}
            </div>
          `,
          actionsHTML: `
            <button class="btn-secondary-action" onclick="document.getElementById('modal-overlay').classList.remove('active')">닫기</button>
          `
        });
      }
    });
  }

  // 7. Accordion Toggle for Daily Survey
  surveyHeader.addEventListener('click', () => {
    surveyAccordion.classList.toggle('open');
  });

  // Daily Survey Items Click Handlers
  document.querySelectorAll('.survey-item-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const surveyId = btn.getAttribute('data-survey-id');
      const surveyList = config.surveys || [];
      const surveyData = surveyList.find(s => s.id === surveyId) || {};

      if (surveyData.url && surveyData.url.trim() !== '') {
        window.open(surveyData.url, '_blank');
      } else {
        openModal({
          icon: '📝',
          title: surveyData.dayTitle || 'Daily Survey',
          subtitle: `${surveyData.date || ''} 설문조사`,
          bodyHTML: `
            <div class="info-box">
              <p style="font-size: 0.875rem; color: var(--text-primary); line-height: 1.5;">
                <strong>${surveyData.dayTitle}</strong> 링크 안내입니다.<br>
                현재 설문조사 문항 등록 및 <strong>링크 연결 준비 중</strong>입니다.
              </p>
            </div>
            <div class="instruction-list">
              <div class="instruction-item">• 세션 종료 후 설문 링크가 활성화되면 바로 접속 가능합니다.</div>
              <div class="instruction-item">• 추후 config.js의 surveys 항목에 survey URL을 지정하면 직관적으로 열립니다.</div>
            </div>
          `,
          actionsHTML: `
            <button class="btn-secondary-action" onclick="document.getElementById('modal-overlay').classList.remove('active')">닫기</button>
          `
        });
      }
    });
  });

  // Export Toast globally for inline onclick fallbacks
  window.GDW_SHOW_TOAST = showToast;
});
