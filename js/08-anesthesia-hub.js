/* ═══════════════════════════════════════════════════════════════
   ✦ NEW JAVASCRIPT — ALL NEW FEATURES
═══════════════════════════════════════════════════════════════ */

/* ═══ HUB TABS ═══ */
document.querySelectorAll('.hub-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.hub-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const panelId = 'htab-' + tab.dataset.htab;
    document.querySelectorAll('.hub-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById(panelId);
    if(panel) { panel.classList.add('active'); panel.scrollIntoView({behavior:'smooth', block:'nearest'}); }
  });
});

/* ═══ REGIONAL TABS ═══ */
document.querySelectorAll('.reg-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.reg-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.reg-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('rtab-' + tab.dataset.rtab);
    if(panel) panel.classList.add('active');
  });
});

/* ═══ PK TABS ═══ */
document.querySelectorAll('.pk-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pk-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.pk-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('pktab-' + tab.dataset.pktab);
    if(panel) panel.classList.add('active');
  });
});

/* ═══ DRUG GRID RENDER ═══ */
(function(){
  const grid = document.getElementById('drugGrid');
  if(!grid) return;
  function render(filter){
    const list = filter === 'all' ? DRUG_DATA : DRUG_DATA.filter(d => d.drugClass === filter);
    grid.innerHTML = list.map(drug => `
      <div class="drug-card ${drug.drugClass}" onclick="openDrugModal('${drug.id}')">
        <div class="drug-card__class">${drug.classLabel}</div>
        <div class="drug-card__name">${drug.name}</div>
        <div class="drug-card__generic">${drug.generic.length > 40 ? drug.generic.substring(0,40)+'…' : drug.generic}</div>
        <div class="drug-card__dose">
          ${Object.entries(drug.dose).slice(0,2).map(([k,v]) => `<div class="drug-dose-row"><span class="drug-dose-label">${k.charAt(0).toUpperCase()+k.slice(1).replace(/([A-Z])/g,' $1')}</span><span class="drug-dose-val">${v}</span></div>`).join('')}
          <div class="drug-dose-row"><span class="drug-dose-label">Onset</span><span class="drug-dose-val">${drug.onset}</span></div>
          <div class="drug-dose-row"><span class="drug-dose-label">Duration</span><span class="drug-dose-val">${drug.duration}</span></div>
        </div>
        <div class="drug-card__tags">
          ${drug.tags.map((t,i) => `<span class="drug-tag ${t}">${drug.tagLabels[i]||'Drug'}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }
  render('all');
  document.getElementById('drugFilterBar').addEventListener('click', e => {
    const btn = e.target.closest('.fbtn');
    if(!btn) return;
    document.querySelectorAll('#drugFilterBar .fbtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.dfilt);
  });
})();

/* ═══ DRUG MODAL ═══ */
function openDrugModal(id) {
  const drug = DRUG_DATA.find(d => d.id === id);
  if(!drug) return;
  const bg = document.getElementById('drugModalBg');
  document.getElementById('drugModalContent').innerHTML = `
    <div class="drug-modal-header">
      <div class="drug-modal-class">${drug.classLabel}</div>
      <div class="drug-modal-name">${drug.name}</div>
      <div class="drug-modal-generic"><em>${drug.generic}</em></div>
      <div class="drug-card__tags" style="margin-top:.5rem;">
        ${drug.tags.map((t,i) => `<span class="drug-tag ${t}">${drug.tagLabels[i]||'Drug'}</span>`).join('')}
      </div>
    </div>
    <div class="drug-modal-grid">
      <div class="drug-modal-section">
        <h4>📊 Dosing</h4>
        ${Object.entries(drug.dose).map(([k,v]) => `<div class="drug-info-row"><span class="drug-info-label">${k.charAt(0).toUpperCase()+k.slice(1).replace(/([A-Z])/g,' $1')}</span><span class="drug-info-value">${v}</span></div>`).join('')}
        <div class="drug-info-row"><span class="drug-info-label">Onset</span><span class="drug-info-value">${drug.onset}</span></div>
        <div class="drug-info-row"><span class="drug-info-label">Duration</span><span class="drug-info-value">${drug.duration}</span></div>
        <div class="drug-info-row"><span class="drug-info-label">Half-life (β)</span><span class="drug-info-value">${drug.halfLife}</span></div>
      </div>
      <div class="drug-modal-section">
        <h4>🔬 Pharmacokinetics</h4>
        <div class="drug-info-row"><span class="drug-info-label">Protein Binding</span><span class="drug-info-value">${drug.proteinBinding}</span></div>
        <div class="drug-info-row"><span class="drug-info-label">Volume of Distribution</span><span class="drug-info-value">${drug.vd}</span></div>
        <div class="drug-info-row"><span class="drug-info-label">Metabolism</span><span class="drug-info-value">${drug.metabolism}</span></div>
      </div>
    </div>
    <div class="drug-modal-section" style="margin-bottom:1rem;">
      <h4>⚙️ Mechanism of Action</h4>
      <p style="font-size:.85rem;color:var(--c-txt2);line-height:1.65;">${drug.mechanism}</p>
    </div>
    <div class="drug-modal-section" style="margin-bottom:1rem;">
      <h4>✅ Indications</h4>
      <p style="font-size:.85rem;color:var(--c-txt2);line-height:1.65;">${drug.indications}</p>
    </div>
    <div class="drug-modal-section" style="margin-bottom:1rem;">
      <h4>🚫 Contraindications</h4>
      <p style="font-size:.85rem;color:var(--c-txt2);line-height:1.65;">${drug.contraindications}</p>
    </div>
    <div class="drug-modal-section" style="margin-bottom:1rem;">
      <h4>⚠️ Side Effects</h4>
      <p style="font-size:.85rem;color:var(--c-txt2);line-height:1.65;">${drug.sideEffects}</p>
    </div>
    <div class="drug-warning-box"><strong>⚠ Clinical Warning:</strong> ${drug.warning}</div>
    <div style="margin-top:1rem;padding:1rem;background:rgba(0,255,229,.06);border:1px solid rgba(0,255,229,.15);border-radius:10px;">
      <div style="font-family:var(--f-mono);font-size:.68rem;color:var(--c-neon);margin-bottom:.4rem;">💡 CLINICAL PEARL</div>
      <p style="font-size:.84rem;color:var(--c-txt2);line-height:1.65;">${drug.pearl}</p>
    </div>
  `;
  bg.classList.add('open');
  document.body.style.overflow = 'hidden';
}
document.getElementById('drugModalClose').addEventListener('click', () => {
  document.getElementById('drugModalBg').classList.remove('open');
  document.body.style.overflow = '';
});
document.getElementById('drugModalBg').addEventListener('click', e => {
  if(e.target === document.getElementById('drugModalBg')) {
    document.getElementById('drugModalBg').classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ═══ MONITORING PARAMETERS RENDER ═══ */
(function(){
  const grid = document.getElementById('monitorParamGrid');
  if(!grid) return;
  grid.innerHTML = MONITORING_DATA.map(p => `
    <div class="monitor-param-card">
      <div class="monitor-param-name">
        ${p.name}
        <span class="monitor-param-abbr">${p.abbr}</span>
      </div>
      <div class="monitor-param-normal">${p.normal}</div>
      <p class="monitor-param-desc">${p.desc}</p>
      <div class="monitor-param-alert">⚠ ${p.alert}</div>
    </div>
  `).join('');
})();

/* ═══ AIRWAY GRID RENDER ═══ */
(function(){
  const grid = document.getElementById('airwayGrid');
  if(!grid) return;
  grid.innerHTML = AIRWAY_DATA.map(a => `
    <div class="airway-card">
      <div class="airway-card__title">${a.title}</div>
      <p style="font-size:.83rem;color:var(--c-txt2);margin-bottom:.75rem;line-height:1.6;">${a.intro}</p>
      ${a.grades ? `<div class="airway-grades">${a.grades.map(g => `
        <div class="airway-grade ${g.cls}">
          <span class="airway-grade-num">${g.num}</span>
          <span class="airway-grade-desc">${g.desc}</span>
        </div>
      `).join('')}</div>` : ''}
      ${a.lemon ? `<div class="airway-grades">${a.lemon.map(l => `
        <div class="lemon-item">
          <span class="lemon-letter">${l.letter}</span>
          <div><span class="lemon-title">${l.title}</span>${l.desc}</div>
        </div>
      `).join('')}</div>` : ''}
    </div>
  `).join('');
})();

/* ═══ EMERGENCY GRID RENDER ═══ */
(function(){
  const grid = document.getElementById('emergGrid');
  if(!grid) return;
  grid.innerHTML = EMERGENCY_DATA.map((emerg, i) => `
    <div class="emerg-card" id="emerg-${i}">
      <div class="emerg-card__header" style="background:${emerg.background};">
        <span class="emerg-card__icon">${emerg.icon}</span>
        <div>
          <div class="emerg-card__title">${emerg.title}</div>
          <div class="emerg-card__severity sev-${emerg.severity}">${emerg.severityLabel}</div>
        </div>
      </div>
      <button class="emerg-expand-btn" onclick="toggleEmerg(${i})">
        View Protocol <span class="emerg-expand-icon">▼</span>
      </button>
      <div class="emerg-card__body">
        <div class="emerg-steps">
          ${emerg.steps.map((s, si) => `
            <div class="emerg-step">
              <div class="emerg-step-num">${si+1}</div>
              <div>${s}</div>
            </div>
          `).join('')}
        </div>
        <div class="emerg-drug-box">${emerg.drugs}</div>
      </div>
    </div>
  `).join('');
});
function toggleEmerg(i){
  const card = document.getElementById('emerg-'+i);
  if(card) card.classList.toggle('expanded');
}
(function initEmergGrid(){
  const grid = document.getElementById('emergGrid');
  if(!grid) return;
  grid.innerHTML = EMERGENCY_DATA.map((emerg, i) => `
    <div class="emerg-card" id="emerg-${i}">
      <div class="emerg-card__header" style="background:${emerg.background};">
        <span class="emerg-card__icon">${emerg.icon}</span>
        <div>
          <div class="emerg-card__title">${emerg.title}</div>
          <div class="emerg-card__severity sev-${emerg.severity}">${emerg.severityLabel}</div>
        </div>
      </div>
      <button class="emerg-expand-btn" onclick="toggleEmerg(${i})">
        View Protocol <span class="emerg-expand-icon">▼</span>
      </button>
      <div class="emerg-card__body">
        <div class="emerg-steps">
          ${emerg.steps.map((s, si) => `
            <div class="emerg-step">
              <div class="emerg-step-num">${si+1}</div>
              <div>${s}</div>
            </div>
          `).join('')}
        </div>
        <div class="emerg-drug-box">${emerg.drugs}</div>
      </div>
    </div>
  `).join('');
})();

/* ═══ ASA GRID RENDER ═══ */
(function(){
  const grid = document.getElementById('asaGrid');
  if(!grid) return;
  grid.innerHTML = ASA_DATA.map(a => `
    <div class="asa-card ${a.cssClass}">
      <div class="asa-class">${a.cls}</div>
      <div class="asa-label">${a.label}</div>
      <p class="asa-desc">${a.desc}</p>
      <p class="asa-examples"><strong>Examples:</strong> ${a.examples}</p>
      <div class="asa-mortality">Perioperative Mortality: <span class="asa-mortality-rate">${a.mortality}</span></div>
    </div>
  `).join('');
})();

/* ═══ CHECKLIST RENDER ═══ */
(function(){
  const body = document.getElementById('checklistBody');
  if(!body) return;
  let total = 0, checked = 0;
  CHECKLIST_DATA.forEach(s => s.items.forEach(() => total++));

  body.innerHTML = CHECKLIST_DATA.map((section, si) => `
    <div class="checklist-section">
      <div class="checklist-section__title">
        ${si===0?'⚙️':si===1?'👤':si===2?'📊':'🛡️'} ${section.section}
        ${section.critical?'<span class="check-critical">Critical</span>':''}
      </div>
      <div class="checklist-items">
        ${section.items.map((item, ii) => `
          <div class="check-item" onclick="toggleCheck(this)" data-section="${si}" data-item="${ii}">
            <div class="check-box">✓</div>
            <span class="check-text">${item.text}</span>
            ${item.critical?'<span class="check-critical">⚠ Critical</span>':''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
})();

function toggleCheck(el) {
  el.classList.toggle('checked');
  updateChecklistProgress();
}
function updateChecklistProgress() {
  const all = document.querySelectorAll('.check-item');
  const done = document.querySelectorAll('.check-item.checked');
  const pct = Math.round((done.length / all.length) * 100);
  const fill = document.getElementById('checklistFill');
  const pctEl = document.getElementById('checklistPct');
  if(fill) fill.style.width = pct + '%';
  if(pctEl) pctEl.textContent = pct + '%';
  if(pct === 100) showToast('✅ Pre-op checklist complete!', 's');
}
function resetChecklist() {
  document.querySelectorAll('.check-item.checked').forEach(el => el.classList.remove('checked'));
  updateChecklistProgress();
}

/* ═══ DOSE CALCULATOR ═══ */
const DOSE_FORMULAS = {
  propofol: w => ({
    'Induction Dose': `${(w*1.5).toFixed(0)}–${(w*2.5).toFixed(0)} mg IV`,
    'In mL (1%)': `${(w*1.5/10).toFixed(1)}–${(w*2.5/10).toFixed(1)} mL`,
    'Rate Titration': `${(w*0.04).toFixed(0)} mg (4 mL) q10 sec`
  }),
  'propofol-maint': w => ({
    'TIVA Rate': `${(w*4).toFixed(0)}–${(w*12).toFixed(0)} mg/hr`,
    'In mL/hr (1%)': `${(w*4/10).toFixed(1)}–${(w*12/10).toFixed(1)} mL/hr`,
    'Titrate to BIS': '40–60 target BIS'
  }),
  ketamine: w => ({
    'IV Induction': `${(w*1).toFixed(0)}–${(w*2).toFixed(0)} mg IV`,
    'IM Induction': `${(w*4).toFixed(0)}–${(w*8).toFixed(0)} mg IM`,
    'In mL (50mg/mL)': `${(w*2/50).toFixed(1)} mL IV (high dose)`
  }),
  'ketamine-sub': w => ({
    'Analgesic IV': `${(w*0.1).toFixed(0)}–${(w*0.3).toFixed(0)} mg IV`,
    'Infusion Rate': `${(w*0.1).toFixed(0)}–${(w*0.5).toFixed(0)} mg/hr`,
    'In mL (10mg/mL)': `${(w*0.2/10).toFixed(1)} mL IV (0.2 mg/kg)`
  }),
  midazolam: w => ({
    'Premedication IV': `${(w*0.02).toFixed(1)}–${(w*0.04).toFixed(1)} mg IV`,
    'Premedication IM': `${(w*0.05).toFixed(1)}–${(w*0.1).toFixed(1)} mg IM`,
    'In mL (5mg/mL)': `${(w*0.03/5).toFixed(1)} mL IV (0.03 mg/kg)`
  }),
  'midazolam-iv': w => ({
    'Sedation': `${Math.min(2, (w*0.02).toFixed(1))}–${Math.min(5, (w*0.05).toFixed(1))} mg IV titrated`,
    'Incremental Dose': '0.5–1 mg aliquots',
    'Max Single Dose': '5 mg IV (elderly: 2 mg)'
  }),
  fentanyl: w => ({
    'Analgesic IV': `${(w*1).toFixed(0)}–${(w*2).toFixed(0)} mcg IV`,
    'Induction Supplement': `${(w*2).toFixed(0)}–${(w*5).toFixed(0)} mcg IV`,
    'In mL (50mcg/mL)': `${(w*2/50).toFixed(1)}–${(w*3/50).toFixed(1)} mL IV`
  }),
  morphine: w => ({
    'IV Analgesic': `${(w*0.05).toFixed(1)}–${(w*0.1).toFixed(1)} mg IV`,
    'Intrathecal': `0.1–0.3 mg (100–300 mcg) — NOT weight-based`,
    'Titration': `${(w*0.02).toFixed(1)} mg q5min prn`
  }),
  succinylcholine: w => ({
    'RSI Dose IV': `${(w*1).toFixed(0)}–${(w*1.5).toFixed(0)} mg IV`,
    'IM (no IV access)': `${(w*4).toFixed(0)} mg IM (deltoid/thigh)`,
    'In mL (50mg/mL)': `${(w*1.5/50).toFixed(1)} mL IV`
  }),
  rocuronium: w => ({
    'Intubation IV': `${(w*0.6).toFixed(1)} mg IV`,
    'In mL (10mg/mL)': `${(w*0.6/10).toFixed(1)} mL IV`,
    'Maintenance': `${(w*0.1).toFixed(1)}–${(w*0.15).toFixed(1)} mg IV prn`
  }),
  'rocuronium-rsii': w => ({
    'RSII Dose IV': `${(w*1.2).toFixed(1)} mg IV`,
    'In mL (10mg/mL)': `${(w*1.2/10).toFixed(1)} mL IV`,
    'Sugammadex Rescue': `${(w*16).toFixed(0)} mg IV (must have ready!)`
  }),
  vecuronium: w => ({
    'Intubation IV': `${(w*0.1).toFixed(2)} mg IV`,
    'In mL (1mg/mL)': `${(w*0.1).toFixed(1)} mL IV`,
    'Maintenance': `${(w*0.02).toFixed(2)}–${(w*0.04).toFixed(2)} mg IV prn`
  }),
  atracurium: w => ({
    'Intubation IV': `${(w*0.5).toFixed(1)} mg IV`,
    'In mL (10mg/mL)': `${(w*0.5/10).toFixed(1)} mL IV`,
    'Infusion': `${(w*0.3).toFixed(1)}–${(w*0.6).toFixed(1)} mg/hr`
  }),
  neostigmine: w => ({
    'Reversal IV': `${(w*0.04).toFixed(2)}–${(w*0.07).toFixed(2)} mg IV`,
    'In mL (2.5mg/mL)': `${(w*0.05/2.5).toFixed(1)} mL IV`,
    'ALWAYS WITH': `Glycopyrrolate ${(w*0.01).toFixed(2)} mg IV`
  }),
  atropine: w => ({
    'Bradycardia IV': `${(w*0.01).toFixed(2)}–${(w*0.02).toFixed(2)} mg IV`,
    'Minimum Dose': '0.1 mg (avoid paradoxical brady)',
    'Maximum Dose': '0.5 mg (adult) / 0.4 mg (child)'
  }),
  ephedrine: w => ({
    'Hypotension Bolus': '3–6 mg IV (not weight-based)',
    'Infusion': '3–30 mg/hr titrated',
    'IM Alternative': '12.5–25 mg IM'
  }),
  phenylephrine: w => ({
    'Bolus IV': '50–100 mcg IV (not weight-based)',
    'Infusion': `${(w*0.5).toFixed(1)}–${(w*1.5).toFixed(1)} mcg/min`,
    'Obstetric (spinal)': '50–100 mcg bolus / 0.5 mcg/kg/min infusion'
  }),
  dexamethasone: w => ({
    'PONV Prophylaxis': '4–8 mg IV (flat dose)',
    'Anti-inflammatory': '0.1 mg/kg IV',
    'In mL (4mg/mL)': '1–2 mL IV (4–8 mg)'
  }),
  ondansetron: w => ({
    'PONV Prophylaxis': '4 mg IV (flat dose at end of surgery)',
    'Treatment': '4 mg IV (max 32 mg/24h)',
    'In mL (2mg/mL)': '2 mL IV (4 mg)'
  }),
  paracetamol: w => ({
    'IV Dose': `${Math.min(1000, w*15).toFixed(0)} mg IV over 15 min`,
    'Max Single': '1000 mg IV (adult)',
    'Frequency': 'Every 6 hours (max 4g/day)'
  }),
  'lidocaine-iv': w => ({
    'Antiarrhythmic': `${(w*1).toFixed(0)}–${(w*1.5).toFixed(0)} mg IV bolus`,
    'Analgesic Infusion': `${(w*1).toFixed(0)}–${(w*2).toFixed(0)} mg/kg/hr`,
    'Max Bolus': `${(w*3).toFixed(0)} mg IV`
  }),
  thiopental: w => ({
    'Induction IV': `${(w*3).toFixed(0)}–${(w*5).toFixed(0)} mg IV`,
    'In mL (25mg/mL)': `${(w*4/25).toFixed(1)} mL IV`,
    'Elderly/Cardiac': `${(w*2).toFixed(0)}–${(w*3).toFixed(0)} mg IV (reduced)`
  }),
  etomidate: w => ({
    'Induction IV': `${(w*0.2).toFixed(2)}–${(w*0.4).toFixed(2)} mg IV`,
    'In mL (2mg/mL)': `${(w*0.3/2).toFixed(1)} mL IV`,
    'Elderly Dose': `${(w*0.1).toFixed(2)}–${(w*0.2).toFixed(2)} mg IV`
  }),
  dexmedetomidine: w => ({
    'Loading Dose': `${(w*0.5).toFixed(1)}–${(w*1).toFixed(1)} mcg IV over 10 min`,
    'Maintenance': `${(w*0.2).toFixed(1)}–${(w*0.7).toFixed(1)} mcg/hr`,
    'AWI Protocol': `${(w*0.7).toFixed(1)}–${(w*1).toFixed(1)} mcg/hr`
  }),
  sugammadex: w => ({
    'Moderate Block': `${(w*2).toFixed(0)} mg IV (TOF ≥2)`,
    'Deep Block': `${(w*4).toFixed(0)} mg IV (PTC 1–2)`,
    'Immediate Reversal': `${(w*16).toFixed(0)} mg IV (within 3 min of 1.2mg/kg roc)`
  }),
};

function calculateDose() {
  const weight = parseFloat(document.getElementById('calcWeight').value) || 70;
  const drug = document.getElementById('calcDrug').value;
  const scenario = document.getElementById('calcScenario').value;
  const asa = document.getElementById('calcASA').value;

  if(!drug) { showToast('Please select a drug first','e'); return; }

  let effectiveWeight = weight;
  let modifier = '';
  if(scenario === 'elderly') { effectiveWeight = weight * 0.75; modifier = 'Elderly dose reduction applied (−25%)'; }
  else if(scenario === 'obese') { effectiveWeight = 22 + 0.91*(weight - 152.4 < 0 ? weight - 152.4 : weight - 152.4); if(effectiveWeight < 50) effectiveWeight = weight * 0.6; modifier = 'Lean Body Weight used (obese dosing)'; }
  else if(scenario === 'pediatric') { effectiveWeight = Math.min(weight, 40); modifier = 'Pediatric weight-based dosing (cap 40kg)'; }

  const formula = DOSE_FORMULAS[drug];
  if(!formula) { showToast('Calculator formula not yet implemented for this drug','e'); return; }

  const results = formula(effectiveWeight);
  const resultsGrid = document.getElementById('calcResultsGrid');
  const warningEl = document.getElementById('calcWarning');
  const resultsEl = document.getElementById('calcResults');

  resultsGrid.innerHTML = Object.entries(results).map(([label, value]) => `
    <div class="calc-result-item">
      <div class="calc-result-label">${label}</div>
      <div class="calc-result-value" style="font-size:1rem;">${value}</div>
    </div>
  `).join('');

  let warnings = [];
  if(asa >= 3) warnings.push('⚠ ASA III+: Reduce induction doses by 20–30%, titrate carefully, have vasopressors ready.');
  if(scenario === 'elderly') warnings.push('⚠ Elderly: Reduced clearance, ↑sensitivity, CNS fragility — titrate in small increments.');
  if(scenario === 'cardiac') warnings.push('⚠ Cardiac disease: Etomidate preferred for hemodynamic stability. Minimize induction doses.');
  if(scenario === 'hepatic') warnings.push('⚠ Hepatic failure: Prolonged drug effects (reduced clearance). Avoid hepatically-metabolized drugs at standard doses.');
  if(drug === 'succinylcholine') warnings.push('⚠ SUCCINYLCHOLINE: Check for contraindications (burns >48h, denervation, hyperkalemia, MH susceptibility, Duchenne MD) before administering.');
  if(drug === 'rocuronium-rsii') warnings.push('⚠ RSII: Sugammadex '+Math.round(effectiveWeight*16)+' mg must be immediately available for rescue reversal.');
  if(modifier) warnings.unshift('ℹ '+modifier);
  warnings.push('⚠ These are reference calculations only. Always verify with current drug references and institutional protocols. Individual patient variation requires clinical titration.');

  warningEl.innerHTML = warnings.join('<br><br>');
  warningEl.style.display = 'block';
  resultsEl.classList.add('show');
  showToast('Dose calculated! ✓', 's');
}

