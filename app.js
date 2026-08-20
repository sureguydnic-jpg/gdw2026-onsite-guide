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
  document.getElementById('btn-onsite-register').addEventListener('click', () => {
    const reg = config.onSiteRegistration || {};
    if (reg.url && reg.url.trim() !== '') {
      window.open(reg.url, '_blank');
    } else {
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
          <a href="https://gdw2026.vercel.app/?view=public-register" target="_blank" class="btn-primary-action">🎟️ 현장등록 바로가기</a>
          <button class="btn-secondary-action" onclick="document.getElementById('modal-overlay').classList.remove('active')">닫기</button>
        `
      });
    }
  });

  // 2. 📖 e-Program Book Click Handler
  document.getElementById('btn-program-book').addEventListener('click', () => {
    const info = config.programBook || {};
    if (info.url && info.url.trim() !== '') {
      window.open(info.url, '_blank');
    } else {
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
            <div class="instruction-item">• 프로그램 및 연사 정보가 담긴 e-Book PDF 버전이 곧 등록됩니다.</div>
            <div class="instruction-item">• 주소가 연결되면 이 버튼 클릭 시 바로 바로가기가 실행됩니다.</div>
          </div>
        `,
        actionsHTML: `
          <button class="btn-secondary-action" onclick="document.getElementById('modal-overlay').classList.remove('active')">닫기 (Close)</button>
        `
      });
    }
  });

  // 3. 📶 Venue Wi-Fi Click Handler
  document.getElementById('btn-wifi').addEventListener('click', () => {
    const wifi = config.wifi || {};
    const instructionsHTML = (wifi.instructions || [])
      .map(item => `<div class="instruction-item">${item}</div>`)
      .join('');

    openModal({
      icon: '📶',
      title: '무료 와이파이 연결',
      subtitle: 'Venue Wi-Fi Info & Connection',
      bodyHTML: `
        <div class="info-box">
          <div class="info-row">
            <span class="info-label">와이파이 이름 (SSID)</span>
            <span class="info-value">${wifi.ssid || 'GDW_2026_Free_WiFi'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">비밀번호 (PW)</span>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="info-value" style="color: var(--gold);">${wifi.password || 'gdw2026conference'}</span>
              <button class="copy-btn copy-pwd-btn" data-password="${wifi.password || 'gdw2026conference'}">복사</button>
            </div>
          </div>
        </div>
        <div class="section-title" style="margin-bottom: 6px;">접속 안내 (Instructions)</div>
        <div class="instruction-list">
          ${instructionsHTML}
        </div>
      `,
      actionsHTML: `
        <button class="btn-primary-action copy-pwd-btn" data-password="${wifi.password || 'gdw2026conference'}">
          🔑 비밀번호 복사하기
        </button>
        <button class="btn-secondary-action" onclick="document.getElementById('modal-overlay').classList.remove('active')">닫기</button>
      `
    });
  });

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
            본 행사는 <strong>SNAP SIGHT</strong> 실시간 AI 자막 및 음성 통역 서비스를 제공합니다. 스마트폰으로 실시간 번역 자막을 확인하세요.
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
            GDW 2026 주요 세션 현장을 <strong>실시간 유튜브 라이브 스트리밍</strong>으로 생중계합니다.
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
  document.getElementById('btn-official-app').addEventListener('click', () => {
    const app = config.officialApp || {};
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
        <div class="store-btn-group">
          <a href="${app.iosUrl || '#'}" ${app.iosUrl ? 'target="_blank"' : 'onclick="window.GDW_SHOW_TOAST(\'App Store 앱 링크 준비 중입니다.\')"' } class="store-btn">
            <svg viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.63-.76 1.05-1.82.93-2.88-.91.04-2.03.61-2.68 1.37-.58.67-1.09 1.76-.95 2.8.01 0 .04.01.07.01 1.02 0 2.05-.54 2.63-1.3z"/></svg>
            App Store 다운로드
          </a>
          <a href="${app.androidUrl || '#'}" ${app.androidUrl ? 'target="_blank"' : 'onclick="window.GDW_SHOW_TOAST(\'Google Play 앱 링크 준비 중입니다.\')"' } class="store-btn">
            <svg viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.98 1.98 0 0 1-.61-.933V2.747c.15-.357.362-.68.609-.933zM15.207 13.414l2.766 2.766-12.87 7.43 10.104-10.196zm2.766-5.594l-2.766 2.766L5.103.39 17.973 7.82zm1.488 4.316l3.327-1.92c.677-.39.677-1.026 0-1.417l-3.327-1.92-2.903 2.903 2.903 2.354z"/></svg>
            Google Play 다운로드
          </a>
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
  });

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
          subtitle: `${surveyData.date || ''} 만족도 조사`,
          bodyHTML: `
            <div class="info-box">
              <p style="font-size: 0.875rem; color: var(--text-primary); line-height: 1.5;">
                <strong>${surveyData.dayTitle}</strong> 링크 안내입니다.<br>
                현재 만족도 조사 설지 문항 등록 및 <strong>링크 연결 준비 중</strong>입니다.
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
