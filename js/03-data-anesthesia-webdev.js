/* ═══════════════════════════════════════════════════════════════
   ✦ NEW DATA — ANESTHESIA & WEB DEV CONTENT
═══════════════════════════════════════════════════════════════ */

const DRUG_DATA = [
  {
    id:'propofol', name:'Propofol', generic:'2,6-diisopropylphenol', drugClass:'sedative',
    classLabel:'Induction Agent / Sedative',
    dose:{induction:'1.5–2.5 mg/kg IV', maintenance:'4–12 mg/kg/hr TIVA', titration:'Titrate 40 mg q10s'},
    onset:'30–60 seconds', duration:'5–10 min', halfLife:'1–3 hours',
    proteinBinding:'98%', vd:'4–6 L/kg', metabolism:'Hepatic (CYP), extrahepatic',
    mechanism:'GABA-A receptor potentiation → CNS depression',
    indications:'IV induction, TIVA maintenance, procedural sedation, ICU sedation',
    contraindications:'Allergy to egg/soy lecithin (relative), children <3yr for ICU sedation (Propofol Infusion Syndrome risk)',
    sideEffects:'Pain on injection, hypotension, apnoea, bradycardia, PRIS (high dose >5 mg/kg/hr >48h)',
    tags:['drug-tag-sedative','drug-tag-iv'],
    tagLabels:['Sedative','IV'],
    warning:'Pain on injection minimized by pre-treatment with lignocaine 40mg IV or using antecubital vein. Propofol Infusion Syndrome (PRIS): lactic acidosis, rhabdomyolysis, AKI, cardiac failure — monitor CK, lactate on prolonged infusions.',
    pearl:'The "milk of amnesia" — white lipid emulsion. Supports microbial growth — maintain strict asepsis. Reduces ICP, CMRO₂, cerebral blood flow. Anti-emetic properties at sub-anesthetic doses.'
  },
  {
    id:'ketamine', name:'Ketamine', generic:'(RS)-2-(2-chlorophenyl)-2-(methylamino)cyclohexan-1-one', drugClass:'sedative',
    classLabel:'Dissociative Anesthetic',
    dose:{induction:'1–2 mg/kg IV / 4–8 mg/kg IM',analgesic:'0.1–0.3 mg/kg IV', infusion:'0.1–0.5 mg/kg/hr'},
    onset:'30–60s IV / 3–5 min IM', duration:'10–15 min IV', halfLife:'2.5–3 hours',
    proteinBinding:'27%', vd:'3.5–4 L/kg', metabolism:'Hepatic → norketamine (active)',
    mechanism:'NMDA receptor antagonism → dissociative state; also σ receptors, opioid receptors',
    indications:'Induction in shocked/asthmatic patients, procedural sedation, sub-dissociative analgesia, pediatric ketamine, difficult/rural settings, TIVA supplement, chronic pain, depression',
    contraindications:'Raised ICP (relative — now controversial), ischaemic heart disease, hypertensive crisis, schizophrenia, eclampsia (relative)',
    sideEffects:'Emergence phenomena (hallucinations — minimize with midazolam), ↑HR, ↑BP, ↑IOP, laryngospasm (rare), hypersalivation, PONV',
    tags:['drug-tag-sedative','drug-tag-iv'],
    tagLabels:['Dissociative','IV/IM'],
    warning:'Emergence reactions occur in 10–30% — treat prophylactically with midazolam 0.05 mg/kg. Contraindicated in patients with ↑ICP per older teaching, but current evidence shows ketamine is safe with ICP monitoring.',
    pearl:'Unique in maintaining spontaneous respiration and airway reflexes. Sympathomimetic — excellent for shocked/asthmatic patients. The only IV anesthetic with reliable analgesia. Preserves laryngeal reflexes (not absolutely — never assume protected airway).'
  },
  {
    id:'midazolam', name:'Midazolam', generic:'8-chloro-6-(2-fluorophenyl)-1-methyl-4H-imidazo[1,5-a][1,4]benzodiazepine', drugClass:'sedative',
    classLabel:'Benzodiazepine Anxiolytic',
    dose:{premedication:'0.02–0.05 mg/kg IV / 0.1 mg/kg IM', sedation:'1–2 mg IV titrated',induction:'0.1–0.4 mg/kg IV (adjunct)'},
    onset:'1–2 min IV', duration:'15–30 min', halfLife:'1.5–2.5 hours',
    proteinBinding:'97%', vd:'1.1–1.7 L/kg', metabolism:'CYP3A4 → hydroxymidazolam',
    mechanism:'GABA-A receptor positive allosteric modulator → anxiolysis, amnesia, sedation',
    indications:'Premedication (anxiolysis, amnesia), ICU sedation, anticonvulsant, adjunct to induction, procedural sedation, alcohol withdrawal',
    contraindications:'Acute angle-closure glaucoma, first trimester pregnancy (relative), respiratory depression (relative)',
    sideEffects:'Respiratory depression (potentiated by opioids), anterograde amnesia, paradoxical agitation in elderly',
    tags:['drug-tag-sedative','drug-tag-iv'],
    tagLabels:['Benzo','Amnestic'],
    warning:'Respiratory depression risk markedly increased when combined with opioids — have flumazenil (reversal agent) ready. Cumulative in elderly and hepatic failure — titrate carefully.',
    pearl:'Gold standard for premedication. Excellent anterograde amnesia — patients will not remember unpleasant induction events. Water-soluble at low pH (injection pain) → becomes lipid-soluble at physiological pH (rapid CNS penetration).'
  },
  {
    id:'fentanyl', name:'Fentanyl', generic:'N-phenyl-N-[1-(2-phenylethyl)-4-piperidinyl]-propanamide', drugClass:'opioid',
    classLabel:'Synthetic Opioid',
    dose:{analgesic:'1–2 mcg/kg IV', induction:'2–5 mcg/kg IV', infusion:'0.5–2 mcg/kg/hr'},
    onset:'1–2 min IV', duration:'30–60 min', halfLife:'3.7 hours (context-sensitive)',
    proteinBinding:'80–85%', vd:'4–6 L/kg', metabolism:'CYP3A4 → inactive norfentanyl',
    mechanism:'μ (mu) opioid receptor agonist → supraspinal analgesia, sedation, respiratory depression',
    indications:'Intraoperative analgesia, adjunct to induction/maintenance, post-op pain, ICU analgesia, epidural/spinal adjuvant',
    contraindications:'MAOI use within 14 days, respiratory depression without monitoring, opioid allergy',
    sideEffects:'Respiratory depression, chest wall rigidity (high doses/rapid infusion), PONV, pruritis, bradycardia, miosis',
    tags:['drug-tag-opioid','drug-tag-iv'],
    tagLabels:['Opioid','μ-agonist'],
    warning:'Chest wall rigidity ("fentanyl chest") with high doses or rapid injection — treat with succinylcholine + airway control. Respiratory depression can be delayed. Have naloxone available (40 mcg increments IV).',
    pearl:'100x more potent than morphine. Highly lipophilic → rapid onset, redistribution to fat stores → context-sensitive half-time increases with prolonged infusion. Classic multimodal analgesia component. Transdermal patches used for chronic pain.'
  },
  {
    id:'succinylcholine', name:'Succinylcholine', generic:'Diacetylcholine / Suxamethonium', drugClass:'nmba',
    classLabel:'Depolarizing NMBA',
    dose:{rsi:'1–1.5 mg/kg IV', pediatric:'2 mg/kg IV'},
    onset:'60 seconds', duration:'5–10 min', halfLife:'N/A — plasma cholinesterase',
    proteinBinding:'Minimal', vd:'0.04 L/kg', metabolism:'Pseudocholinesterase (plasma)',
    mechanism:'Acetylcholine mimic → persistent depolarization at NMJ → neuromuscular blockade',
    indications:'RSI (fastest onset and offset), laryngospasm treatment (4 mg/kg IM), electroconvulsive therapy',
    contraindications:'Malignant hyperthermia susceptibility, denervation injuries >48h, burns >48h, hyperkalemia risk, Duchenne muscular dystrophy, personal/family history of MH',
    sideEffects:'Hyperkalemia (↑0.5–1 mEq/L — can be fatal in at-risk patients), bradycardia/arrest (especially 2nd dose, children — pretreat with atropine), malignant hyperthermia, myalgia, raised IOP/ICP/intragastric pressure, prolonged block (pseudo-cholinesterase deficiency)',
    tags:['drug-tag-nmba','drug-tag-iv'],
    tagLabels:['Depolarizing','RSI'],
    warning:'CONTRAINDICATED in: burns/trauma/denervation >48h, Duchenne MD, hyperkalemia risk (chronic renal failure, prolonged immobility) — can cause fatal cardiac arrest from K+ surge. MH trigger. Check DBNO (dibucaine number) if prolonged block.',
    pearl:'Still the gold standard for RSI due to unmatched speed (60 seconds to intubation conditions). Only depolarizing NMBA in clinical use. The drug that "makes you forget you can\'t breathe" — use with extreme respect. Sugammadex has made high-dose rocuronium (1.2mg/kg) a genuine RSI alternative.'
  },
  {
    id:'rocuronium', name:'Rocuronium', generic:'1-[17β-(Acetyloxy)-3α-hydroxy-2β-(morpholin-4-yl)-5α-androstan-16β-yl]-1-(prop-2-en-1-yl)pyrrolidin-1-ium bromide', drugClass:'nmba',
    classLabel:'Non-depolarizing NMBA',
    dose:{intubation:'0.6 mg/kg IV', rsii:'1.2 mg/kg IV', maintenance:'0.1–0.15 mg/kg'},
    onset:'60–90s (0.6 mg/kg) / 60s (1.2 mg/kg)', duration:'30–45 min (0.6) / 60–70 min (1.2)', halfLife:'1.5–2 hours',
    proteinBinding:'30%', vd:'0.25–0.35 L/kg', metabolism:'Hepatic/biliary',
    mechanism:'Competitive ACh antagonist at NMJ → non-depolarizing neuromuscular blockade',
    indications:'Tracheal intubation, maintenance of NMB, RSI alternative (1.2 mg/kg + sugammadex rescue)',
    contraindications:'Myasthenia gravis (use with extreme caution), hepatic failure (prolongs action)',
    sideEffects:'Minimal CV effects; pain on injection (antecubital preferred); prolonged block in hepatic failure',
    tags:['drug-tag-nmba','drug-tag-iv'],
    tagLabels:['Non-dep.','Sugammadex reversible'],
    warning:'At 1.2 mg/kg for RSI (Modified RSI / RSII), duration extends to 60–70 min. MUST have sugammadex 16 mg/kg immediately available as rescue reversal — this is the primary advantage over succinylcholine for RSI in MH-susceptible patients.',
    pearl:'Revolutionized by sugammadex — the only NMBA with a specific cyclodextrin reversal agent. 1.2 mg/kg provides comparable intubation conditions to succinylcholine at 60 seconds. Preferred for RSI in MH-susceptible patients, burns, hyperkalemia risk.'
  },
  {
    id:'neostigmine', name:'Neostigmine', generic:'Neostigmine methylsulfate', drugClass:'reversal',
    classLabel:'Cholinesterase Inhibitor (Reversal)',
    dose:{reversal:'0.04–0.07 mg/kg IV (max 5 mg)', always:'Always pair with glycopyrrolate 0.01 mg/kg or atropine 0.02 mg/kg'},
    onset:'1–5 min', duration:'30–90 min', halfLife:'60–90 min',
    proteinBinding:'Minimal', vd:'0.7 L/kg', metabolism:'Plasma cholinesterase + hepatic',
    mechanism:'Reversible inhibition of acetylcholinesterase → ↑ACh at all cholinergic synapses → reverses NMBA',
    indications:'Reversal of non-depolarizing NMBAs (moderate block — TOF count ≥2), myasthenia gravis treatment',
    contraindications:'Deep block (TOF count <2 — inadequate reversal), succinylcholine reversal (CONTRAINDICATED — worsens), peritonitis/bowel obstruction (relative)',
    sideEffects:'Bradycardia, bronchospasm, salivation, lacrimation, urination, defaecation, GI motility ↑ (SLUDGE effects) — always give with anticholinergic',
    tags:['drug-tag-reversal','drug-tag-iv'],
    tagLabels:['Reversal','+Glycopyrrolate'],
    warning:'NEVER give without an anticholinergic (glycopyrrolate or atropine) — severe bradycardia and cardiac arrest have occurred. Use glycopyrrolate (not atropine) as it does not cross BBB. Sugammadex has superseded neostigmine for rocuronium/vecuronium reversal.',
    pearl:'Neostigmine reversal is unreliable if TOF ratio <0.4. Ceiling effect at ~5mg. Use quantitative neuromuscular monitoring (TOF-ratio). Sugammadex is now preferred for safe, complete reversal — particularly for deep block.'
  },
  {
    id:'atropine', name:'Atropine', generic:'(RS)-3-Hydroxy-2-phenylpropanoic acid [(1R,3r,5S)-8-methyl-8-azabicyclo[3.2.1]octan-3-yl] ester', drugClass:'reversal',
    classLabel:'Anticholinergic',
    dose:{bradycardia:'0.01–0.02 mg/kg IV (min 0.1 mg, max 0.5 mg adult)', glyco_alternative:'Glycopyrrolate 0.01 mg/kg preferred'},
    onset:'<1 min IV', duration:'30–60 min', halfLife:'2–3 hours',
    proteinBinding:'14–22%', vd:'1.7–2.9 L/kg', metabolism:'Hepatic ester hydrolysis',
    mechanism:'Muscarinic acetylcholine receptor antagonist → ↑HR, ↓secretions, bronchodilation, ↓GI motility',
    indications:'Perioperative bradycardia, anticholinesterase reversal pre-treatment, organophosphate poisoning, asystole (ACLS), sinus node dysfunction',
    contraindications:'Acute angle-closure glaucoma, thyrotoxicosis, prostate hypertrophy (relative), tachyarrhythmias',
    sideEffects:'Tachycardia, dry mouth, mydriasis, urinary retention, constipation, ↑IOP, pyrexia (especially children), paradoxical bradycardia at very low doses (<0.1mg)',
    tags:['drug-tag-reversal','drug-tag-iv'],
    tagLabels:['Anticholinergic','ACLS'],
    warning:'Paradoxical bradycardia can occur with doses <0.1mg — always give ≥0.1mg IV. Crosses BBB — can cause central anticholinergic syndrome (confusion, delirium). Glycopyrrolate preferred perioperatively as it does NOT cross BBB.',
    pearl:'ACLS dose for asystole/PEA: 1 mg IV. No longer recommended in ACLS 2015 for PEA/asystole as primary therapy. Organophosphate poisoning: large doses (2–4mg+ IV) to achieve atropinisation (dry secretions, HR>80). In children, bradycardia from volatile agents is common — have atropine at the bedside.'
  },
  {
    id:'ephedrine', name:'Ephedrine', generic:'(1R,2S)-2-(methylamino)-1-phenylpropan-1-ol', drugClass:'vasopressor',
    classLabel:'Mixed Sympathomimetic',
    dose:{hypotension:'3–6 mg IV boluses titrated', infusion:'3–30 mg/hr'},
    onset:'<1 min IV', duration:'15–60 min', halfLife:'3–6 hours',
    proteinBinding:'Minimal', vd:'High — crosses CNS', metabolism:'MAO (slow) + renal excretion',
    mechanism:'Indirect (norepinephrine release) + direct (α+β receptor agonist) → ↑HR, ↑BP, bronchodilation',
    indications:'Spinal/epidural hypotension (particularly obstetric), bradycardia with hypotension, bronchospasm',
    contraindications:'Tachyarrhythmias, MAOI use (hypertensive crisis), thyrotoxicosis, pheochromocytoma',
    sideEffects:'Tachycardia, hypertension, ↑myocardial O₂ demand, tachyphylaxis with repeated doses, reflex bradycardia',
    tags:['drug-tag-vasopressor','drug-tag-iv'],
    tagLabels:['Vasopressor','β-effect'],
    warning:'Tachyphylaxis develops with repeated boluses — switch to phenylephrine if required. In obstetrics: ephedrine crosses placenta — may cause fetal tachycardia. Phenylephrine now preferred in obstetric spinal hypotension (less fetal acidosis).',
    pearl:'The go-to for spinal hypotension with bradycardia (β-mediated ↑HR + ↑BP). Phenylephrine preferred for spinal hypotension with normal/high HR (pure α-agonist, less tachycardia). Ephedrine preserves cardiac output better in obstetric patients. Always have vasopressors drawn before neuraxial blocks.'
  },
  {
    id:'sevoflurane', name:'Sevoflurane', generic:'(RS)-1,1,1,3,3,3-hexafluoro-2-(fluoromethoxy)propane', drugClass:'inhalational',
    classLabel:'Halogenated Volatile Agent',
    dose:{mac:'2.0% (adults)', induction:'4–8% (inhalational induction)', maintenance:'1–3% with N₂O/O₂'},
    onset:'Fast (blood:gas λ=0.63)', duration:'Context-dependent', halfLife:'2–3 min (alveolar washout)',
    proteinBinding:'N/A', vd:'N/A — alveolar pharmacokinetics', metabolism:'2–5% hepatic → hexafluoroisopropanol, inorganic fluoride',
    mechanism:'Exact mechanism unclear — enhances GABA-A, inhibits NMDA, modulates Kv/Na channels',
    indications:'Inhalational induction (pediatric — non-pungent), maintenance of general anesthesia, supplement to TIVA',
    contraindications:'MH susceptibility, known halogenated volatile sensitivity',
    sideEffects:'Dose-dependent hypotension, respiratory depression, MH trigger, Compound A (low-flow systems) — nephrotoxic in animals, not clinically significant in humans',
    tags:['drug-tag-inhalational'],
    tagLabels:['Inhaled','MH Trigger'],
    warning:'MH TRIGGER — avoid in susceptible patients. Use TIVA (propofol + remifentanil) instead. Compound A formation with low-flow systems and soda lime — minimum FGF 2 L/min or use fresh lime. Highest pungency tolerance → preferred for mask induction.',
    pearl:'Gold standard for pediatric mask induction (sweet smell, non-pungent). Fast onset/offset. Safest volatile for hepatotoxicity (halothane > desflurane > isoflurane > sevoflurane). Still requires MH precautions. MAC reduces 6% per decade after 40 years.'
  },
  {
    id:'thiopental', name:'Thiopental', generic:'Sodium 5-ethyl-5-(pentan-2-yl)-2-sulfanylidene-1,3-diazinane-4,6-dionate', drugClass:'sedative',
    classLabel:'Barbiturate Induction Agent',
    dose:{induction:'3–5 mg/kg IV', children:'5–7 mg/kg IV', ica:'2–3 mg/kg IV (head injury)'},
    onset:'30–60 seconds', duration:'5–10 min', halfLife:'11–12 hours',
    proteinBinding:'85%', vd:'1.4–2.3 L/kg', metabolism:'Hepatic (slow) → hydroxypentobarbital',
    mechanism:'GABA-A receptor agonist + glutamate (AMPA) antagonist → CNS depression',
    indications:'IV induction (alternative to propofol), raised ICP management, status epilepticus (refractory), anesthetic for procedures in burned patients',
    contraindications:'Acute porphyria (ABSOLUTE — triggers life-threatening crisis), airway obstruction, myasthenia gravis, severe hepatic disease, shock',
    sideEffects:'Cardiovascular depression (less than propofol), respiratory depression, laryngospasm (especially light anesthesia), histamine release, tissue necrosis (intra-arterial injection)',
    tags:['drug-tag-sedative','drug-tag-iv'],
    tagLabels:['Barbiturate','Porphyria risk'],
    warning:'ABSOLUTELY CONTRAINDICATED IN ACUTE PORPHYRIA — can precipitate fatal crisis. Intra-arterial injection causes intense pain, arterial spasm, gangrene — treat immediately with papaverine/phentolamine. No antiemetic properties. Less commonly used since propofol.',
    pearl:'Decreases CMRO₂, CBF, ICP — still used in neurosurgical anesthesia. Anti-epileptic properties. In resource-limited settings, may be preferred over propofol. "Taper" — give slowly to avoid apnoea. The original "sleep dose" against which propofol was compared.'
  },
  {
    id:'etomidate', name:'Etomidate', generic:'(R)-1-(1-phenylethyl)-1H-imidazole-5-carboxylic acid ethyl ester', drugClass:'sedative',
    classLabel:'Imidazole Induction Agent',
    dose:{induction:'0.2–0.4 mg/kg IV', elderly:'0.1–0.2 mg/kg IV'},
    onset:'30–60 seconds', duration:'5–15 min', halfLife:'75 min',
    proteinBinding:'75%', vd:'4.5 L/kg', metabolism:'Ester hydrolysis (plasma + liver)',
    mechanism:'GABA-A receptor positive modulation — selectively at β2/β3 subunits',
    indications:'Induction in haemodynamically unstable patients (MI, cardiomyopathy, tamponade, sepsis), RSI in cardiac patients, head-injured patients (reduces ICP)',
    contraindications:'Adrenocortical insufficiency (relative), sepsis (relative — single dose OK), contraindicated for maintenance',
    sideEffects:'Adrenocortical suppression (24–48h after single dose — ↓cortisol synthesis — inhibits 11β-hydroxylase), myoclonus (common — premedicate with opioid/benzo), PONV (high incidence), pain on injection',
    tags:['drug-tag-sedative','drug-tag-iv'],
    tagLabels:['Cardiac stable','Adrenal suppression'],
    warning:'ADRENOCORTICAL SUPPRESSION: single induction dose suppresses cortisol for 24–48 hours. Controversial in septic patients — supplemental hydrocortisone may be needed. Myoclonus in ~30% — pretreat with fentanyl 50 mcg or midazolam 2 mg.',
    pearl:'The "cardiac induction" agent — provides greater hemodynamic stability than propofol or thiopental. No analgesic properties. Preserves airway reflexes relatively better. The preferred agent when cardiovascular stability is paramount. Historical use as sole anesthetic avoided — cumulative adrenal suppression.'
  },
  {
    id:'remifentanil', name:'Remifentanil', generic:'4-carboxy-4-[(1-oxopropyl)phenylamino]-1-piperidine-propanoic acid methyl ester', drugClass:'opioid',
    classLabel:'Ultra-Short-Acting Opioid',
    dose:{infusion:'0.05–0.5 mcg/kg/min', bolus:'0.5–1 mcg/kg over 30s (intubation)'},
    onset:'1–2 min', duration:'3–10 min (even with prolonged infusion)', halfLife:'3–10 min',
    proteinBinding:'80%', vd:'0.35 L/kg', metabolism:'Non-specific esterases (blood, tissue)',
    mechanism:'μ opioid receptor agonist — ultra-potent, ultra-short acting',
    indications:'TIVA (propofol + remifentanil — the gold standard TIVA regimen), controlled hypotension, neuromonitoring procedures (MEP/SSEP), day surgery, ICU analgesia',
    contraindications:'Known opioid hypersensitivity, single injection into subarachnoid/epidural (glycine excipient — neurotoxic)',
    sideEffects:'Respiratory depression, bradycardia, hypotension, opioid-induced hyperalgesia (OIH) with prolonged use, chest wall rigidity (at high doses), acute opioid tolerance',
    tags:['drug-tag-opioid','drug-tag-iv'],
    tagLabels:['Ultra-short','Esterase metabolism'],
    warning:'CONTEXT-INSENSITIVE HALF-TIME — offset is always 5–10 min regardless of infusion duration. Must ALWAYS ensure analgesic cover before emergence (morphine/fentanyl 20–30min before end, or peripheral nerve block) — analgesic "gap" causes severe pain on awakening. OIH risk with prolonged high-dose infusion.',
    pearl:'Revolutionary pharmacokinetics — metabolism by non-specific esterases, not liver/kidney dependent. The ideal TIVA opioid for precise control. Gold standard for procedures requiring rapid neurological assessment. Absolute predictability of offset. Used for neuromuscular scoliosis monitoring (MEP/SSEP preservation).'
  },
  {
    id:'dexmedetomidine', name:'Dexmedetomidine', generic:'(S)-4-[1-(2,3-dimethylphenyl)ethyl]-3H-imidazole', drugClass:'sedative',
    classLabel:'α₂-Adrenergic Agonist',
    dose:{loading:'0.5–1 mcg/kg over 10 min', maintenance:'0.2–0.7 mcg/kg/hr', awake_intub:'0.7–1 mcg/kg/hr'},
    onset:'15 min', duration:'1–2 hours', halfLife:'2 hours',
    proteinBinding:'94%', vd:'1.33 L/kg', metabolism:'Glucuronidation + N-methylation',
    mechanism:'Highly selective α₂-receptor agonist (α₂:α₁ = 1620:1) → ↓NE release → sedation, anxiolysis, analgesia, blunts stress response',
    indications:'ICU sedation (cooperative, rousable), procedural sedation, awake fiberoptic intubation, opioid-sparing analgesia, alcohol/opioid withdrawal, pediatric sedation',
    contraindications:'Second/third degree heart block, severe bradycardia, cardiogenic shock, use with caution in advanced hepatic disease',
    sideEffects:'Bradycardia (most common — treat with atropine/ephedrine), hypotension (biphasic: initial hypertension with loading dose then hypotension), dry mouth, nausea',
    tags:['drug-tag-sedative','drug-tag-iv'],
    tagLabels:['α₂-agonist','Opioid-sparing'],
    warning:'BRADYCARDIA: significant and common. Give loading dose over 10 min (not faster). Have atropine ready. Avoid in patients with pre-existing bradycardia/heart block. Produces "cooperative sedation" — patient responds to voice but quickly re-sedates without stimulation.',
    pearl:'The only sedative that produces near-natural sleep neurophysiology. Opioid-sparing — reduces fentanyl requirements by 30–50%. "Awake craniotomy" and "awake intubation" drug of choice. Does NOT reliably suppress EEG burst suppression — not for neuroprotection. Shivering treatment — 0.5 mcg/kg over 10 min.'
  },
  {
    id:'sugammadex', name:'Sugammadex', generic:'Modified γ-cyclodextrin', drugClass:'reversal',
    classLabel:'Selective Relaxant Binding Agent (SRBA)',
    dose:{moderate:'2 mg/kg IV (TOF count ≥2)', deep:'4 mg/kg IV (1–2 PTC)', immediate:'16 mg/kg IV (within 3 min of 1.2mg/kg rocuronium)'},
    onset:'1–2 min', duration:'Sustained', halfLife:'2 hours',
    proteinBinding:'~0%', vd:'0.14 L/kg', metabolism:'None — excreted unchanged renally',
    mechanism:'Encapsulates (chelates) steroidal NMBAs (rocuronium > vecuronium > pancuronium) in 1:1 complex → removes from NMJ',
    indications:'Reversal of rocuronium/vecuronium at any depth of block, "cannot intubate cannot oxygenate" rescue reversal (16 mg/kg)',
    contraindications:'Allergy to sugammadex (rare), severe renal failure (eCrCl<30 — use cautiously, re-block possible)',
    sideEffects:'Bradycardia (rare), hypersensitivity/anaphylaxis (0.3%), transiently reduces progesterone/estrogen (OCP failure — use barrier contraception for 7 days)',
    tags:['drug-tag-reversal','drug-tag-iv'],
    tagLabels:['Cyclodextrin','Immediate reversal'],
    warning:'ORAL CONTRACEPTIVE FAILURE: sugammadex reduces progesterone efficacy — equivalent to missed OCP dose. Counsel female patients to use barrier contraception for 7 days. Anaphylaxis reported (0.3%) — have adrenaline ready. Re-neuromuscular block: possible if patient has severe renal failure (eCrCl<30).',
    pearl:'The most significant advancement in NMBA safety in decades. Immediate, predictable, complete reversal. 16 mg/kg in CICO scenario — can reverse 1.2 mg/kg rocuronium within 3 min. Specific ONLY to aminosteroid NMBAs — does NOT reverse benzylisoquinolinium NMBAs (atracurium, cisatracurium). Always verify reversal with quantitative TOF monitoring (TOF ratio ≥0.9).'
  },
  {
    id:'phenylephrine', name:'Phenylephrine', generic:'(R)-3-hydroxy-α-[(methylamino)methyl]benzyl alcohol', drugClass:'vasopressor',
    classLabel:'Selective α₁-Agonist',
    dose:{bolus:'50–100 mcg IV', infusion:'0.5–1.5 mcg/kg/min', obstetric:'50–100 mcg bolus / 0.5–0.75 mcg/kg/min infusion'},
    onset:'<1 min IV', duration:'15–30 min', halfLife:'2.5–3 hours',
    proteinBinding:'95%', vd:'0.8 L/kg', metabolism:'Hepatic MAO + intestinal + tissue',
    mechanism:'Pure α₁-adrenergic agonist → arterial vasoconstriction → ↑SVR → ↑MAP (no direct β-effect)',
    indications:'Spinal hypotension (especially obstetric — now 1st line), hypotension in tachycardic patients, vasodilatory shock, nasal decongestant (topical)',
    contraindications:'Severe bradycardia, hypertension, hyperthyroidism (relative)',
    sideEffects:'Reflex bradycardia (via baroreceptor reflex — vagal), ↓cardiac output (↑afterload), hypertension, uterine vasoconstriction at high doses',
    tags:['drug-tag-vasopressor','drug-tag-iv'],
    tagLabels:['α₁-agonist','Obstetric first line'],
    warning:'REFLEX BRADYCARDIA: common with bolus doses — have atropine ready. Pure vasoconstriction reduces cardiac output in patients with poor myocardial function — use ephedrine or vasopressin instead. Reduces uteroplacental blood flow at high doses.',
    pearl:'Now the preferred vasopressor for obstetric spinal hypotension — maintains uteroplacental blood flow better than ephedrine (less fetal acidosis). Phenylephrine infusion during CS spinal significantly reduces maternal nausea. For non-obstetric use, choose based on HR: tachycardic → phenylephrine; bradycardic → ephedrine; combined → both.'
  },
  {
    id:'morphine', name:'Morphine', generic:'(4R,4aR,7S,7aR,12bS)-3-methyl-2,3,4,4a,7,7a-hexahydro-1H-4,12-methanobenzofuro[3,2-e]isoquinoline-7,9-diol', drugClass:'opioid',
    classLabel:'Natural Opioid Analgesic',
    dose:{analgesia:'0.05–0.2 mg/kg IV titrated', epidural:'2–5 mg', intrathecal:'0.1–0.3 mg (gold-standard neuraxial)'},
    onset:'5–10 min IV', duration:'3–5 hours', halfLife:'2–4 hours',
    proteinBinding:'35%', vd:'3–5 L/kg', metabolism:'UGT glucuronidation → M-6-G (active, potent), M-3-G (inactive)',
    mechanism:'μ > κ > δ opioid receptor agonist; M-6-G is more potent than morphine',
    indications:'Moderate–severe acute pain, post-operative analgesia, cancer pain, neuraxial analgesia (gold standard intrathecal for prolonged post-op analgesia), palliative care',
    contraindications:'Respiratory depression, raised ICP (relative — reduce dose), hepatic failure (M-6-G accumulation), renal failure (M-6-G accumulation — avoid/reduce)',
    sideEffects:'Respiratory depression, PONV (strong), constipation, pruritis (especially neuraxial), physical dependence, urinary retention',
    tags:['drug-tag-opioid','drug-tag-iv'],
    tagLabels:['Natural opioid','Neuraxial gold standard'],
    warning:'M-6-G accumulates in renal failure → delayed respiratory depression hours after dosing. Highest PONV risk of all opioids — prophylactic ondansetron + dexamethasone recommended. Neuraxial morphine: single intrathecal dose provides 12–24h analgesia — monitor respiratory rate for 24h.',
    pearl:'The reference opioid against which all others are compared. Intrathecal morphine 100–200 mcg provides 18–24h post-op analgesia — eliminates need for epidural in many cases. Hydrophilic — slow spread in CSF → delayed cephalad migration → delayed respiratory depression. Pruritis treated with naloxone 40 mcg IV or nalbuphine 2.5 mg IV.'
  }
];

const MONITORING_DATA = [
  {name:'Electrocardiography',abbr:'ECG',normal:'Rate 60–100 bpm; sinus rhythm; normal P-QRS-T morphology',desc:'Continuous 5-lead ECG monitoring is mandatory for all procedures under anesthesia. Detects arrhythmias, ischaemia (ST changes), electrolyte disturbances, and pacemaker function.',alert:'ST elevation >1mm in 2+ contiguous leads = STEMI until proven otherwise. New LBBB = STEMI equivalent. Peaked T-waves = hyperkalemia.'},
  {name:'Pulse Oximetry',abbr:'SpO₂',normal:'95–100% (healthy adult); >94% acceptable',desc:'Non-invasive, continuous measurement of arterial haemoglobin oxygen saturation. Uses photoplethysmography with red (660nm) and infrared (940nm) wavelengths. Critical for detecting hypoxaemia before clinical cyanosis.',alert:'SpO₂ <94% = hypoxaemia requiring immediate intervention. SpO₂ <90% = severe hypoxaemia. Falsely normal with carbon monoxide poisoning (pulse-CO-oximetry needed). Falsely low: nail polish (dark), poor perfusion, motion artefact.'},
  {name:'End-Tidal CO₂',abbr:'EtCO₂',normal:'35–45 mmHg (4.6–6.0 kPa); waveform present with each breath',desc:'Capnography measures CO₂ in expired gas. Confirms tracheal intubation (gold standard). Reflects alveolar ventilation, cardiac output, and CO₂ production. The capnography waveform provides information on airway patency, ventilation adequacy, and respiratory mechanics.',alert:'Absent waveform post-intubation = oesophageal intubation (deflate cuff, reintubate). Sudden ↓ EtCO₂ to zero = circuit disconnect/apnoea/cardiac arrest. Gradual rise = MH (↑ CO₂ production), inadequate ventilation. Gradual fall = ↓ cardiac output, PE, or hyperventilation.'},
  {name:'Non-Invasive Blood Pressure',abbr:'NIBP',normal:'SBP 90–140 mmHg; DBP 60–90 mmHg; MAP >65 mmHg',desc:'Oscillometric measurement provides SBP, DBP, and MAP. Minimum monitoring frequency: every 5 minutes under GA. Every 2 minutes for first 15 minutes after neuraxial blocks. Correct cuff sizing critical — too small = false high, too large = false low.',alert:'MAP <65 mmHg = haemodynamic instability requiring intervention. SBP drop >20% from baseline = clinically significant hypotension. BP cuff should be applied to the non-surgical arm when possible.'},
  {name:'Bispectral Index',abbr:'BIS',normal:'40–60 (surgical anesthesia); 60–85 (moderate sedation)',desc:'Processed EEG monitor providing a numerical index (0–100) reflecting depth of hypnosis. 100 = fully awake, 0 = isoelectric EEG. Reduces incidence of intraoperative awareness. Does NOT measure analgesia — adequacy of analgesia assessed by haemodynamic response.',alert:'BIS >60 during surgical anesthesia = risk of awareness. BIS <40 = excessively deep anesthesia (risk of delayed emergence, ↑PONV). Electrosurgery (diathermy) and muscle activity artefact BIS readings — verify clinically.'},
  {name:'Temperature',abbr:'TEMP',normal:'36.0–37.5°C; Core temperature preferred (nasopharyngeal, oesophageal, bladder)',desc:'Perioperative hypothermia (core <36°C) increases: wound infection, coagulopathy, myocardial complications, shivering, delayed emergence, blood loss. Active warming mandatory. Malignant hyperthermia: rapidly rising temperature + rigidity + ↑EtCO₂ = MH crisis.',alert:'Core temp >38.5°C rising rapidly during GA = MALIGNANT HYPERTHERMIA CRISIS — stop volatile, call for help, IV dantrolene 2.5 mg/kg. Core temp <35°C = hypothermia — initiate active warming (forced air warmer, warmed IV fluids, operating room temperature increase).'},
  {name:'Neuromuscular Monitoring',abbr:'TOF',normal:'TOF ratio ≥0.9 (quantitative) = adequate reversal; TOF count 4 = moderate block',desc:'Train-of-four (TOF) stimulation of peripheral nerve (ulnar → adductor pollicis OR facial → orbicularis oculi) assesses degree of neuromuscular blockade. Quantitative acceleromyography or mechanomyography most accurate. Qualitative tactile/visual assessment unreliable.',alert:'DO NOT extubate with TOF ratio <0.9 — residual paralysis causes silent hypoxaemia, airway collapse, aspiration. Always use quantitative monitoring + confirm clinical signs (5s head lift, tongue protrusion, grip strength) before extubation.'},
  {name:'Invasive Arterial Pressure',abbr:'IBP/Art',normal:'SBP 90–140, DBP 60–90, MAP ≥65 mmHg; continuous waveform',desc:'Continuous real-time BP measurement via arterial cannula (radial, femoral, axillary, brachial). Provides beat-to-beat monitoring and arterial blood gas sampling access. Waveform analysis for dynamic preload indices (PPV, SVV). Essential for major surgery, haemodynamically unstable patients, controlled hypotension.',alert:'Damped waveform = air bubble, clot, or malposition — flush and check. Ensure zero reference at right atrium (mid-axillary line). Ischaemia risk if radial artery — check Allen\'s test. Label clearly — never inject drugs into arterial line.'},
  {name:'Central Venous Pressure',abbr:'CVP',normal:'3–8 mmHg (or 4–12 cmH₂O); trend more important than absolute values',desc:'Pressure in superior vena cava/right atrium. Reflects right heart filling pressures. CVP trending: rising with fluid = good response; no response = consider inadequate cardiac function or distributive physiology. Limited as sole guide to fluid responsiveness — use dynamic indices (PPV, SVV, PLR).',alert:'CVP >15 mmHg = right heart failure or cardiac tamponade until proven otherwise. CVP pneumothorax/haemothorax complication of central line insertion — check CXR post-insertion. Air embolism risk during insertion — Trendelenburg position, Valsalva.'},
  {name:'Peripheral Nerve Stimulation',abbr:'PNS',normal:'TOF count 4 (moderate); TOF ratio ≥0.9 (full reversal)',desc:'Adjunct to quantitative TOF — used to assess depth of block before and during reversal. PNS alone insufficient for safe extubation decisions — always use quantitative measurement + clinical signs combination.',alert:'TOF count 0–1 = deep block (don\'t reverse with neostigmine — ineffective/unreliable). TOF count ≥4 + quantitative ratio ≥0.9 = adequate reversal. Post-tetanic count (PTC) used for deep block assessment.'},
  {name:'Urine Output',abbr:'UO',normal:'≥0.5 mL/kg/hr (adult); ≥1 mL/kg/hr (children)',desc:'Urinary catheterisation provides hourly urine output monitoring during major surgery. Reflects renal perfusion and cardiac output indirectly. Essential in major vascular, cardiac, and urological surgery and critically ill patients.',alert:'UO <0.5 mL/kg/hr = oliguria — assess volume status (CVP, filling challenge), BP, haemoglobin, urinary indices (Na, osmolality, creatinine). Rule out catheter blockage. Anuria = consider renal artery/vein occlusion, severe hypoperfusion, or contrast nephropathy.'},
  {name:'Inspired/Expired Gas Analysis',abbr:'Gas',normal:'FiO₂ 0.21–1.0; Volatile agent % within set range; N₂O accurately metered',desc:'Continuous measurement of inspired and expired gas concentrations including O₂, CO₂, and volatile anesthetic agents. Confirms delivery of anesthetic agents. Agent concentration guides anesthetic depth. Essential for confirming correct vaporizer settings and detecting circuit problems.',alert:'↓ Inspired volatile = vaporizer empty, leak, malfunction. ↑ Volatile with no vaporizer = contaminated circuit (scavenging failure). FiO₂ <0.21 = hypoxic gas mixture — check N₂O:O₂ ratio, O₂ supply failure. Agent-specific analysis essential as desflurane/sevoflurane require agent identification.'},
];

const EMERGENCY_DATA = [
  {
    icon:'🔥', title:'Malignant Hyperthermia (MH)', severity:'critical', severityLabel:'LIFE-THREATENING EMERGENCY',
    background:'#1a0a0a',
    steps:[
      'CALL FOR HELP immediately — activate MH protocol',
      'STOP triggering agents: turn off all volatile agents, stop succinylcholine',
      'HYPERVENTILATE with 100% O₂ at 10 L/min FGF — aim EtCO₂ <35 mmHg',
      'DANTROLENE 2.5 mg/kg IV bolus — repeat every 5 min to max 10 mg/kg',
      'Cool patient: ice packs, cold IV saline (avoid Ringer\'s lactate — ↑K+), cold water irrigation',
      'Treat hyperkalemia: calcium gluconate, sodium bicarbonate, insulin/dextrose, dialysis if refractory',
      'Treat arrhythmias: amiodarone (avoid calcium channel blockers with dantrolene)',
      'Insert arterial line + central venous access — invasive monitoring mandatory',
      'Send bloods: ABG, K+, CK, lactate, myoglobin, coagulation, renal function',
      'Continue dantrolene 1 mg/kg q4–6h for 24–48h post-crisis',
      'Admit ICU — monitor for DIC, renal failure, compartment syndrome'
    ],
    drugs:'<strong>Dantrolene 2.5 mg/kg IV (dilute 20mg in 60mL sterile water)</strong> — MUST be stocked in every theater. MH hotline: MH Association of USA 1-800-MH-HYPER'
  },
  {
    icon:'✈️', title:'Cannot Intubate Cannot Oxygenate (CICO)', severity:'critical', severityLabel:'LIFE-THREATENING EMERGENCY',
    background:'#0d1a00',
    steps:[
      'Declare CICO immediately — call for help',
      'Optimize head position — head up, ramped, jaw thrust, BURP',
      'Consider: 2nd-generation supraglottic device (i-gel, LMA Proseal)',
      'If LMA ventilating: use as conduit for fiberoptic-guided intubation',
      'If no oxygenation: SURGICAL AIRWAY — do not delay',
      'First: Scalpel-finger-bougie technique (fastest): horizontal stab incision through cricothyroid membrane, insert finger, dilate, pass bougie, railroad size 6.0 ETT',
      'Alternative: Cannula cricothyrotomy + jet ventilation (use only as temporizing measure — max 30–45 min)',
      'Alternative: Surgical tracheostomy if skilled surgeon available',
      'Post-procedure: ventilate, verify capnography, obtain definitive airway',
      'Sugammadex 16 mg/kg if intubation was after rocuronium 1.2 mg/kg'
    ],
    drugs:'<strong>Sugammadex 16 mg/kg IV</strong> — instantly reverses 1.2 mg/kg rocuronium. Have surgical cricothyrotomy kit open and ready before induction of high-risk airway patients.'
  },
  {
    icon:'🌊', title:'Anaphylaxis Under Anesthesia', severity:'high', severityLabel:'HIGH SEVERITY EMERGENCY',
    background:'#1a0010',
    steps:[
      'STOP administration of suspected trigger (drug, blood, latex, chlorhexidine)',
      'Call for help — activate anaphylaxis protocol',
      'ADRENALINE (epinephrine) 0.01 mg/kg IV bolus (max 0.5 mg) — FIRST-LINE treatment',
      'Infuse large volume crystalloid FAST — 500–2000mL (massive vasodilation)',
      'Ensure 100% O₂ — secure/maintain airway (may need intubation if angioedema)',
      'If bronchospasm: salbutamol 2.5 mg nebulised, magnesium 2g IV over 20 min',
      'If cardiac arrest: standard ALS but double adrenaline doses',
      'SECOND-LINE (after adrenaline + fluids): chlorphenamine 10 mg IV, hydrocortisone 200 mg IV',
      'Establish monitoring: ECG, invasive BP, SpO₂',
      'Post-episode: tryptase levels at 0–1h, 2h, 24h (baseline)',
      'Document and report — refer for specialist allergy testing in 4–6 weeks'
    ],
    drugs:'<strong>Adrenaline (epinephrine) 0.01 mg/kg IV</strong> is the only life-saving drug in anaphylaxis. Give immediately. Antihistamines and steroids are adjuncts — never first-line alone.'
  },
  {
    icon:'💔', title:'Cardiac Arrest in Theatre', severity:'critical', severityLabel:'LIFE-THREATENING EMERGENCY',
    background:'#1a0000',
    steps:[
      'Diagnose: no pulse + unresponsive/no breathing → START CPR immediately',
      'Shout for help: call cardiac arrest team, get defibrillator',
      'CPR: 30:2 ratio, 100–120/min compressions, 5–6cm depth, allow full recoil',
      'Confirm rhythm on defibrillator: VF/pVT (shockable) or PEA/asystole (non-shockable)',
      'SHOCKABLE: defibrillate 200J biphasic immediately, resume CPR 2 min',
      'NON-SHOCKABLE: CPR + treat reversible causes (4Hs and 4Ts)',
      'Adrenaline 1mg IV every 3–5 min (after 2nd non-shockable rhythm check)',
      'Amiodarone 300mg IV after 3rd shock (VF/pVT)',
      '4Hs: Hypoxia, Hypovolaemia, Hypo/hyperkalaemia, Hypothermia',
      '4Ts: Tension pneumothorax, Tamponade, Toxins, Thrombosis (PE/coronary)',
      'Consider ROSC: post-cardiac arrest care, target MAP ≥65, temperature management'
    ],
    drugs:'<strong>Adrenaline 1mg IV (10mL of 1:10,000)</strong> every 3–5 min. <strong>Amiodarone 300mg IV</strong> in refractory VF/pVT. Special consideration: pericardiocentesis for tamponade, chest decompression for tension pneumothorax.'
  },
  {
    icon:'💉', title:'Local Anaesthetic Systemic Toxicity (LAST)', severity:'high', severityLabel:'HIGH SEVERITY EMERGENCY',
    background:'#0a0a1a',
    steps:[
      'STOP injection of local anaesthetic immediately',
      'Call for help — activate LAST protocol',
      'AIRWAY: 100% O₂, suction, prepare to intubate',
      'Treat seizures: benzodiazepine (midazolam 2–5 mg IV) — avoid propofol in cardiovascular instability',
      'If cardiac arrest: CPR + 20% LIPID EMULSION immediately',
      '20% Intralipid: 1.5 mL/kg IV bolus over 1 min, then 0.25 mL/kg/min infusion',
      'Repeat 1.5 mL/kg boluses q3–5 min if no response (max 12 mL/kg total)',
      'For VF: defibrillate; for VT: amiodarone 150 mg IV',
      'AVOID: propofol for LAST-associated cardiac arrest (lipid load, myocardial depression), vasopressin, calcium channel blockers, β-blockers, local anaesthetic',
      'Prolonged CPR may be required (lipid-encapsulation of LA takes time)',
      'Consider ECMO/ECPR in refractory arrest'
    ],
    drugs:'<strong>20% Lipid Emulsion (Intralipid) 1.5 mL/kg IV bolus</strong> then infusion. Mechanism: "lipid sink" — sequesters local anaesthetic in lipid compartment. Pre-draw for all major regional blocks. Maximum cumulative dose 12 mL/kg.'
  },
  {
    icon:'🌫️', title:'Laryngospasm', severity:'high', severityLabel:'URGENT EMERGENCY',
    background:'#0a1a10',
    steps:[
      'Identify: stridor/high-pitched breathing/paradoxical chest/abdomen movement → complete obstruction = silent',
      'Remove precipitant: blood, secretions, airway manipulation',
      '100% O₂ — apply CPAP 20–40 cmH₂O via tight-fitting mask',
      'Jaw thrust + neck extension — reposition patient/airway',
      '"Laryngospasm notch" manoeuvre: bilateral firm pressure behind ear lobule (Larson\'s manoeuvre)',
      'If partial: nebulised salbutamol, continue O₂ CPAP, gentle stimulation avoidance',
      'If complete/no improvement: Succinylcholine 0.5–1 mg/kg IV (FULL DOSE — 4 mg/kg IM if no IV access)',
      'After succinylcholine: intubate or ventilate via mask until resolved',
      'If unable to ventilate post-sux: consider laryngeal pathology, CICO protocol',
      'Post-episode: negative pressure pulmonary oedema possible (treat with CPAP/BiPAP)'
    ],
    drugs:'<strong>Succinylcholine 1 mg/kg IV</strong> (or 4 mg/kg IM) for complete laryngospasm unresponsive to CPAP. Have succinylcholine drawn before ALL airway manipulation. Propofol 0.5 mg/kg IV can break mild laryngospasm.'
  },
  {
    icon:'🫁', title:'Acute Bronchospasm / Severe Asthma', severity:'high', severityLabel:'HIGH SEVERITY EMERGENCY',
    background:'#0a0a1a',
    steps:[
      'Increase FiO₂ to 100% — reduce minute ventilation to allow expiration (↓rate, ↑I:E ratio)',
      'Auscultate: wheeze/absent air entry bilaterally? Unilateral = pneumothorax?',
      'Deepen anesthesia: ↑volatile agent (ketamine 1 mg/kg IV if TIVA)',
      'Nebulised salbutamol 2.5–5 mg via circuit T-piece',
      'IV salbutamol 250 mcg slow IV if nebuliser inadequate',
      'Magnesium 2g IV over 20 min (bronchodilator, muscle relaxant effect)',
      'Hydrocortisone 100–200 mg IV (anti-inflammatory — delayed but important)',
      'Check: precipitants — secretions, ETT position (endobronchial), anaphylaxis, pneumothorax',
      'Avoid: morphine (histamine release), NSAIDs (aspirin-sensitive asthma), succinylcholine (histamine)',
      'If refractory: heliox, ketamine infusion, ECMO in extremis'
    ],
    drugs:'<strong>Salbutamol 2.5–5mg nebulised</strong> (or 250 mcg IV slow). <strong>Magnesium 2g IV over 20 min</strong>. <strong>Adrenaline 0.3 mg IM</strong> if anaphylaxis component suspected.'
  },
  {
    icon:'💧', title:'Tension Pneumothorax', severity:'critical', severityLabel:'LIFE-THREATENING EMERGENCY',
    background:'#1a1a00',
    steps:[
      'DIAGNOSE: ↓/absent breath sounds + ↑peak airway pressures + ↓SpO₂ + ↓BP + ↑HR + tracheal deviation (late sign)',
      'Clinical diagnosis ONLY — do NOT await CXR in unstable patient',
      'IMMEDIATE DECOMPRESSION: 2nd intercostal space, midclavicular line, large bore needle (14G) — listen for hiss',
      'Definitive treatment: chest drain (5th ICS, anterior axillary line) — insert immediately after needle decompression',
      'Check bilateral breath sounds pre-intubation (exclude endobronchial intubation first)',
      'If ventilated patient: sudden ↑PIP + ↓SpO₂ = disconnect ventilator, hand-ventilate, assess',
      'Treat shock: IV fluids, vasopressors as needed',
      'Monitor after drain: blood loss, air leak, suction requirement'
    ],
    drugs:'<strong>No specific drugs</strong> — mechanical emergency requiring immediate decompression. 14G needle (minimum 4.5cm length for obese) immediately, then formal drain. Persistent air leak after drain = major bronchial injury — thoracic surgery consult.'
  },
];

const ASA_DATA = [
  {cls:'ASA I',cssClass:'asa-1',label:'Normal Healthy Patient',desc:'No organic, physiologic, or psychiatric disturbance. Excludes the very young and very old.',examples:'Healthy adult; BMI <30; non-smoker, minimal alcohol use',mortality:'0.06%'},
  {cls:'ASA II',cssClass:'asa-2',label:'Mild Systemic Disease',desc:'Mild disease without substantive functional limitations. Controlled comorbidities.',examples:'Well-controlled DM or HTN, smoking, controlled epilepsy, mild asthma, BMI 30–40, social alcohol use, pregnancy',mortality:'0.27%'},
  {cls:'ASA III',cssClass:'asa-3',label:'Severe Systemic Disease',desc:'Substantive functional limitations; one or more severe diseases. Not incapacitating.',examples:'Poorly controlled DM/HTN, COPD, morbid obesity (BMI>40), active hepatitis, end-stage renal disease on dialysis, history of MI/CVA/TIA >3 months ago, CABG, stents',mortality:'1.8–4.3%'},
  {cls:'ASA IV',cssClass:'asa-4',label:'Severe Systemic Disease — Constant Threat to Life',desc:'Incapacitating disease with constant threat to life.',examples:'Recent MI/CVA/TIA <3 months, severe valvular disease (AS/MS), severe cardiac dysfunction (EF<25%), sepsis, DIC, ARD, end-stage hepatic failure',mortality:'7.8–23%'},
  {cls:'ASA V',cssClass:'asa-5',label:'Moribund — Not Expected to Survive Without Operation',desc:'Emergency operation — not expected to survive >24h without surgical intervention. Moribund patient.',examples:'Ruptured AAA, massive PE, intracranial bleed with raised ICP, ischaemic bowel/multi-organ failure, multi-trauma',mortality:'>50%'},
  {cls:'ASA VI',cssClass:'asa-6',label:'Brain-Dead — Organ Donation',desc:'Declared brain-dead patient being maintained for organ donation.',examples:'Organ procurement procedure in brain-dead donor',mortality:'N/A (brain-dead)'},
];

const AIRWAY_DATA = [
  {
    title:'Mallampati Classification 🫦',
    intro:'Assess with patient sitting upright, head neutral, mouth wide open, tongue protruded maximally, without phonation. Predicts laryngoscopy difficulty.',
    grades:[
      {num:'Class I',desc:'Entire soft palate, uvula, fauces, tonsillar pillars visible. Laryngoscopy grade 1 expected.',cls:'grade-easy'},
      {num:'Class II',desc:'Soft palate, uvula, fauces visible. Tonsillar pillars partially obscured. Grade 1–2 expected.',cls:'grade-easy'},
      {num:'Class III',desc:'Soft palate and base of uvula visible. Fauces not seen. Grade 2–3 expected — prepare for difficult laryngoscopy.',cls:'grade-moderate'},
      {num:'Class IV',desc:'Only hard palate visible. Difficult laryngoscopy expected. Have difficult airway equipment ready.',cls:'grade-difficult'},
    ]
  },
  {
    title:'Cormack–Lehane Grading 🔦',
    intro:'Direct laryngoscopy view grading system. Describes what is seen via laryngoscope.',
    grades:[
      {num:'Grade I',desc:'Full view of glottis visible (>75% of cords seen). Easy intubation.',cls:'grade-easy'},
      {num:'Grade II',desc:'Partial view of glottis. Posterior commissure or arytenoids visible only. May need BURP, bougie.',cls:'grade-moderate'},
      {num:'Grade III',desc:'Only epiglottis visible — glottis not seen. Difficult intubation. Video laryngoscope/bougie essential.',cls:'grade-difficult'},
      {num:'Grade IV',desc:'Neither epiglottis nor glottis visible. Cannot intubate by direct laryngoscopy. CICO protocol.',cls:'grade-failed'},
    ]
  },
  {
    title:'LEMON Assessment 🍋',
    intro:'Systematic pre-intubation airway assessment mnemonic to predict difficult laryngoscopy/intubation.',
    lemon:[
      {letter:'L',title:'Look externally',desc:'Facial trauma, large incisors, beard/moustache, short neck, obese neck, burns, surgical scars'},
      {letter:'E',title:'Evaluate 3-3-2 Rule',desc:'Mouth opening ≥3 fingers (interincisor distance); Hyoid–mandible distance ≥3 fingers; Hyoid–thyroid ≥2 fingers'},
      {letter:'M',title:'Mallampati',desc:'Class I–II acceptable; Class III–IV predict difficulty — consider video laryngoscope as first choice'},
      {letter:'O',title:'Obstruction',desc:'Epiglottitis, foreign body, abscess, trauma, tumour, haematoma — consider awake technique'},
      {letter:'N',title:'Neck Mobility',desc:'Full flexion/extension required. Collar, arthritis, fixation, ankylosing spondylitis = restricted → video laryngoscope'}
    ]
  },
  {
    title:'Thyromental Distance (TMD) 📏',
    intro:'Distance from thyroid notch to chin with neck fully extended. Predicts mandible space for tongue displacement during laryngoscopy.',
    grades:[
      {num:'≥6.5 cm',desc:'Normal — laryngoscopy should be straightforward.',cls:'grade-easy'},
      {num:'6.0–6.5 cm',desc:'Borderline — may be slightly difficult.',cls:'grade-moderate'},
      {num:'<6.0 cm',desc:'Short TMD — inadequate mandible space. Difficult laryngoscopy highly likely.',cls:'grade-difficult'},
    ]
  },
  {
    title:'Modified Wilson Score ⭐',
    intro:'5-factor scoring system: Weight, Head/neck movement, Mouth opening, Jaw protrusion, Retrognathia. Each scored 0–2. Score ≥2 = difficult laryngoscopy likely.',
    grades:[
      {num:'Score 0–1',desc:'Low risk of difficulty. Standard preparation.',cls:'grade-easy'},
      {num:'Score 2–3',desc:'Moderate risk. Prepare difficult airway equipment.',cls:'grade-moderate'},
      {num:'Score ≥4',desc:'High risk. Consider awake technique, senior help, video laryngoscope.',cls:'grade-difficult'},
    ]
  },
  {
    title:'Awake Fibreoptic Intubation Indications 🔬',
    intro:'Awake intubation is mandatory when impossible/hazardous to manage the airway under general anesthesia.',
    grades:[
      {num:'Predicted difficult airway',desc:'Multiple difficulty predictors — cannot guarantee bag-mask ventilation after induction',cls:'grade-moderate'},
      {num:'Known difficult airway',desc:'Previous Cormack-Lehane grade 3–4 documented. Proceed awake.',cls:'grade-difficult'},
      {num:'Unstable C-spine',desc:'Trauma, rheumatoid arthritis, ankylosing spondylitis — neutralise with MILS, prefer awake technique',cls:'grade-difficult'},
      {num:'Full stomach + difficult airway',desc:'Cannot compromise aspiration risk AND cannot secure airway safely. Awake intubation mandatory.',cls:'grade-failed'},
    ]
  }
];

const CASE_STUDIES = [
  {
    id:'CASE-001', title:'Perioperative Hypotension in Elderly Hip Arthroplasty', asa:'ASA III', age:'78F', type:'Orthopaedic GA',
    vitals:{bp:'76/44', hr:'104', spo2:'94'},
    scenario:'A 78-year-old female presents for total hip arthroplasty under spinal anesthesia. PMH: hypertension (ramipril, amlodipine), type 2 diabetes, mild LV dysfunction (EF 45%). Intraoperative BP drops to 76/44 mmHg 10 minutes after spinal injection at L3-4 with 2.5 mL 0.5% heavy bupivacaine. HR 104 bpm. SpO₂ 94% on 2L O₂.',
    question:'🤔 What is your immediate management priority and first pharmacological intervention?',
    answer:'PRIORITY: Maintain spinal cord and myocardial perfusion. MANAGEMENT: (1) Position flat (supine, legs elevated 15°) — increase venous return. (2) Phenylephrine 50–100 mcg IV bolus (NOT ephedrine — tachycardia already present; phenylephrine treats pure vasodilation without increasing HR/MVO₂). (3) If ineffective → vasopressin 0.5–2 units IV (pure vasoconstriction, no β-effect). (4) 500mL crystalloid bolus. (5) Check sensory level (high spinal?). (6) If cardiac cause (LV dysfunction) → dobutamine/noradrenaline combination. RATIONALE: This patient\'s phenotype (elderly, on ACE-inhibitor, LV dysfunction) makes profound spinal hypotension predictable. Pre-emptive phenylephrine infusion 0.5 mcg/kg/min should be started before block.'
  },
  {
    id:'CASE-002', title:'Unexpected Difficult Airway — Obese Patient RSI', asa:'ASA II', age:'45M', type:'Emergency Laparotomy',
    vitals:{bp:'145/88', hr:'95', spo2:'99'},
    scenario:'A 45-year-old male, BMI 48, presents for emergency laparotomy for perforated peptic ulcer. Last ate 2 hours ago. Mallampati class III, TMD 5.5 cm, mouth opening 3.5 cm, limited neck extension. Rocuronium 1.2 mg/kg RSI performed. Post-induction: Cormack-Lehane Grade III on direct laryngoscopy, unable to intubate after 2 attempts. SpO₂ falling to 86%.',
    question:'🤔 Outline your "CICO" management strategy step-by-step.',
    answer:'DECLARE CICO — call for all available help immediately. (1) OXYGENATE: two-hand mask ventilation with OPA/NPA in situ; CPAP 30 cmH₂O; 100% O₂. (2) TRY 2nd-generation supraglottic device: i-gel size 4 (for BMI >30) or LMA Proseal. If ventilating → continue surgery via LMA if safe, or use as conduit for fibreoptic intubation. (3) If still CICO: SURGICAL AIRWAY immediately — scalpel-finger-bougie technique: horizontal stab at cricothyroid membrane, finger to dilate, bougie, 6.0 cuffed ETT. (4) SUGAMMADEX 16 mg/kg IV — can reverse 1.2 mg/kg rocuronium in 3 min (used if surgical airway cannot be performed and patient tolerated, to allow spontaneous ventilation return). (5) NEVER: multiple failed oral attempts (abandon after 3), soft bougie forcing. DEBRIEF: This case requires documentation, mortality conference review, and patient/family notification of difficult airway (medical alert bracelet/documentation).'
  },
  {
    id:'CASE-003', title:'Paediatric Laryngospasm Post-Adenotonsillectomy', asa:'ASA I', age:'6M', type:'ENT GA',
    vitals:{bp:'90/50', hr:'68', spo2:'82'},
    scenario:'A 6-year-old male, 22 kg, recovering from adenotonsillectomy in the recovery room. Nurse calls urgently — child is making high-pitched inspiratory stridor, SpO₂ dropping to 82%, HR 68 bpm, paradoxical chest/abdominal movement, suprasternal recession. LMA was removed at light anesthesia.',
    question:'🤔 What is your immediate management? At what SpO₂/clinical state do you give succinylcholine?',
    answer:'DIAGNOSIS: Complete laryngospasm (silent chest + paradoxical movement) vs partial (audible stridor). IMMEDIATE: (1) Call for help. (2) Jaw thrust + head extension — remove any oral secretions/blood. (3) 100% O₂ tight-fitting mask CPAP 20–40 cmH₂O. (4) Larson\'s manoeuvre: firm bilateral pressure in the "laryngospasm notch" (retroauricular groove between mastoid process and ascending ramus of mandible). (5) If partial response: continue CPAP, gentle positive pressure. SUCCINYLCHOLINE THRESHOLD: SpO₂ <85% and falling + no ventilation = give IMMEDIATELY: 0.5–1 mg/kg IV (child has IV). If NO IV ACCESS: succinylcholine 4 mg/kg IM (deltoid or thigh). After succinylcholine: ventilate by mask, re-insert LMA/intubate if needed. PREVENTION: All airways should be managed at deep anesthesia level or full awake — the "rule of two planes" (fully asleep or fully awake). COMPLICATION to watch: Negative-pressure pulmonary oedema (NPPO) post-laryngospasm — SpO₂ continues to fall, pink frothy secretions.'
  },
  {
    id:'CASE-004', title:'Regional Anesthesia Toxicity — Interscalene Block', asa:'ASA II', age:'35F', type:'Shoulder Surgery',
    vitals:{bp:'135/82', hr:'78', spo2:'97'},
    scenario:'A 35-year-old female, 65 kg, undergoing right shoulder arthroplasty under interscalene brachial plexus block. 30 mL of 0.5% ropivacaine injected under ultrasound guidance. 3 minutes post-injection she reports perioral tingling, metallic taste, feeling "strange." BP 145/92, HR 55, SpO₂ 95%. Then: sudden tonic-clonic seizure.',
    question:'🤔 What drug was injected? What is the definitive treatment? What is the maximum safe dose that should have been given?',
    answer:'DIAGNOSIS: Local Anaesthetic Systemic Toxicity (LAST) from intravascular injection of ropivacaine (despite US guidance — ~1–2% incidence). 0.5% ropivacaine 30 mL = 150 mg ropivacaine. Maximum dose: 3 mg/kg for ropivacaine without epinephrine = 195 mg for 65 kg — technically within limit, but intravascular administration means ALL dose entered circulation at once. TREATMENT: (1) CALL FOR HELP — activate LAST protocol. (2) Airway: 100% O₂, intubate if seizures persist. (3) SEIZURES: midazolam 5 mg IV (NOT propofol as cardiovascular unstable). (4) 20% LIPID EMULSION: 1.5 mL/kg (=97.5 mL) IV bolus over 1 min, then 0.25 mL/kg/min infusion. (5) If cardiac arrest: ACLS + continue lipid emulsion + consider ECMO. (6) Monitor ECG for PR prolongation, QRS widening, VT/VF. PREVENTION: Always aspirate before injection; inject in 5 mL increments with aspiration; add epinephrine as vascular marker (↑HR if intravascular); use ultrasound to observe spread.'
  },
];

const QUIZ_QUESTIONS = [
  {q:'What is the MAC (Minimum Alveolar Concentration) of sevoflurane in adults?',opts:['0.75%','1.15%','2.0%','6.0%'],correct:2,exp:'Sevoflurane MAC = 2.0% in adults (age 30–55). MAC decreases with age (~6% per decade after 40). For comparison: halothane 0.75%, isoflurane 1.15%, desflurane 6.0%, nitrous oxide 104% (cannot achieve GA alone).'},
  {q:'Which mechanism describes Propofol\'s hypnotic action?',opts:['NMDA receptor antagonism','μ-opioid receptor agonism','GABA-A receptor positive allosteric modulation','Selective α₂-adrenergic agonism'],correct:2,exp:'Propofol acts as a positive allosteric modulator of GABA-A receptors, enhancing chloride ion conductance and causing CNS depression. (Ketamine = NMDA antagonist; Morphine = μ-opioid agonist; Dexmedetomidine = α₂ agonist)'},
  {q:'The "gold standard" for confirming correct endotracheal tube placement is:',opts:['Chest X-ray','Bilateral chest auscultation','Continuous capnography (EtCO₂ waveform)','Fibreoptic bronchoscopy'],correct:2,exp:'Continuous EtCO₂ capnography is the gold standard — a persistent waveform over multiple breaths confirms tracheal placement. CXR confirms tube position. Auscultation can be misleading (transmitted sounds). Fibreoptic confirms but is impractical for immediate confirmation.'},
  {q:'Which neuromuscular blocking agent is the ONLY depolarizing NMBA in clinical use?',opts:['Rocuronium','Vecuronium','Atracurium','Succinylcholine'],correct:3,exp:'Succinylcholine (suxamethonium) is the only depolarizing NMBA. It mimics acetylcholine, causing persistent depolarization. All others (rocuronium, vecuronium, atracurium) are non-depolarizing — competitive ACh antagonists at the NMJ.'},
  {q:'ASA III classification describes:',opts:['Normal healthy patient','Mild systemic disease without functional limitation','Severe systemic disease with substantive functional limitation','Incapacitating disease with constant threat to life'],correct:2,exp:'ASA III = severe systemic disease with substantive functional limitations but not incapacitating. Examples: poorly controlled DM/HTN, COPD, morbid obesity (BMI>40), history of MI/CVA >3 months, dialysis-dependent renal failure.'},
  {q:'The reversal agent SPECIFIC to rocuronium and vecuronium (not applicable to benzylisoquinoliniums) is:',opts:['Neostigmine','Flumazenil','Sugammadex','Naloxone'],correct:2,exp:'Sugammadex is a modified γ-cyclodextrin that encapsulates aminosteroidal NMBAs (rocuronium > vecuronium > pancuronium) with high affinity. It does NOT work for benzylisoquinoliniums (atracurium, cisatracurium) — use neostigmine for those.'},
  {q:'Normal EtCO₂ during controlled ventilation should be:',opts:['20–30 mmHg','35–45 mmHg','50–60 mmHg','60–70 mmHg'],correct:1,exp:'Normal EtCO₂ = 35–45 mmHg (4.6–6.0 kPa). Arterial PaCO₂ is usually 2–5 mmHg higher than EtCO₂ in healthy lungs. Values <35 = hyperventilation; >45 = hypoventilation/increased CO₂ production/MH.'},
  {q:'Malignant Hyperthermia (MH) is triggered by which drug combination?',opts:['Propofol + fentanyl','Sevoflurane + succinylcholine','Ketamine + rocuronium','Midazolam + morphine'],correct:1,exp:'MH is triggered by all halogenated volatile agents (sevoflurane, desflurane, isoflurane, halothane, enflurane) AND succinylcholine. TIVA (propofol + opioid + non-depolarizing NMBA) is safe in MH-susceptible patients.'},
  {q:'Which blood pressure value is considered the minimum acceptable MAP (Mean Arterial Pressure) perioperatively?',opts:['40 mmHg','55 mmHg','65 mmHg','80 mmHg'],correct:2,exp:'MAP ≥65 mmHg is the widely accepted minimum perioperative target — below this, cerebral, renal, and myocardial autoregulation may be compromised. For hypertensive patients, consider higher targets (MAP = (SBP + 2×DBP) / 3).'},
  {q:'The first-line treatment for anaphylaxis under anesthesia is:',opts:['Hydrocortisone 200mg IV','Chlorphenamine 10mg IV','Adrenaline 0.01 mg/kg IV','20% Lipid emulsion'],correct:2,exp:'Adrenaline (epinephrine) 0.01 mg/kg IV is ALWAYS first-line for anaphylaxis. It reverses bronchospasm (β₂), vasoconstriction (α₁), and ↑cardiac output (β₁). Antihistamines and steroids are NEVER first-line alone — they are secondary treatments.'},
  {q:'Ketamine\'s primary receptor mechanism is:',opts:['GABA-A receptor modulation','μ-opioid receptor agonism','NMDA receptor antagonism','Muscarinic receptor blockade'],correct:2,exp:'Ketamine is an NMDA (N-methyl-D-aspartate) receptor antagonist — blocks the ion channel, preventing glutamate-mediated excitation. It also acts at σ receptors and has weak opioid receptor activity. This mechanism explains both analgesia and the dissociative state.'},
  {q:'Which feature CORRECTLY describes "cannot intubate, cannot oxygenate" (CICO) management?',opts:['Attempt intubation indefinitely until successful','Immediately perform awake nasal intubation','Perform front-of-neck airway (surgical cricothyrotomy)','Administer IV neostigmine'],correct:2,exp:'CICO requires IMMEDIATE front-of-neck airway — scalpel-finger-bougie technique is the recommended approach (fastest, most reliable). Sugammadex 16 mg/kg may also be given if rocuronium was used for RSI. Continued intubation attempts and nasal intubation are inappropriate in CICO.'},
  {q:'The Mallampati classification is assessed with the patient:',opts:['Supine with head neutral','Sitting, mouth open, tongue maximally protruded, no phonation','Sitting, neck flexed, mouth open','Supine, head extended, mouth wide open'],correct:1,exp:'Correct Mallampati assessment: patient sitting upright, head in neutral position, mouth wide open, tongue maximally protruded, WITHOUT phonation. Phonation elevates the soft palate and falsely improves the score.'},
  {q:'Rocuronium dose for rapid sequence intubation (RSII) to achieve conditions comparable to succinylcholine is:',opts:['0.3 mg/kg','0.6 mg/kg','1.2 mg/kg','2.0 mg/kg'],correct:2,exp:'Rocuronium 1.2 mg/kg provides intubation conditions within 60 seconds, comparable to succinylcholine — this is the "RSII" dose. At this dose, SUGAMMADEX 16 mg/kg must be immediately available to reverse the block if CICO occurs.'},
  {q:'A TOF (Train-of-Four) ratio of <0.9 at extubation indicates:',opts:['Complete neuromuscular recovery — safe to extubate','Adequate recovery — extubation acceptable','Residual neuromuscular blockade — do NOT extubate','Full block — administer more NMBA'],correct:2,exp:'TOF ratio <0.9 = residual neuromuscular block (RMNB). RMNB causes silent hypoxaemia, airway collapse, aspiration, and pharyngeal dysfunction even with apparent clinical recovery signs. ALWAYS verify TOF ≥0.9 quantitatively before extubation.'},
  {q:'Which opioid has a context-insensitive half-time and is metabolized by non-specific esterases?',opts:['Morphine','Fentanyl','Alfentanil','Remifentanil'],correct:3,exp:'Remifentanil is metabolized by non-specific plasma and tissue esterases — its half-time is always 3–10 minutes regardless of infusion duration (context-insensitive). This is unique among opioids. Essential for TIVA (propofol + remifentanil) for precise control.'},
  {q:'Which drug causes adrenocortical suppression (inhibits 11β-hydroxylase) even after a single induction dose?',opts:['Propofol','Thiopental','Etomidate','Ketamine'],correct:2,exp:'Etomidate inhibits 11β-hydroxylase, suppressing adrenocortical cortisol synthesis for 24–48 hours after a single induction dose. This is controversial in septic patients — hydrocortisone supplementation may be required. Preferred in hemodynamically unstable patients despite this side effect.'},
  {q:'The dantrolene dose for malignant hyperthermia crisis is:',opts:['0.5 mg/kg IV once','1 mg/kg IV once','2.5 mg/kg IV, repeated every 5 minutes to max 10 mg/kg','10 mg/kg IV bolus once'],correct:2,exp:'Dantrolene 2.5 mg/kg IV bolus is the initial dose for MH crisis, repeated every 5 minutes to maximum 10 mg/kg until symptoms resolve. This is followed by 1 mg/kg every 4–6 hours for 24–48 hours. Dantrolene must be available in every operating theatre.'},
  {q:'The primary advantage of neuraxial (spinal/epidural) anesthesia over general anesthesia includes:',opts:['Complete consciousness maintained — patient aware of surgery','Avoidance of airway manipulation — reduced pulmonary complications','No cardiovascular effects','Shorter operating time universally'],correct:1,exp:'Neuraxial anesthesia avoids airway instrumentation (no intubation, reduced aspiration risk, less pulmonary complications), provides excellent surgical anesthesia, reduces blood loss, DVT/PE risk, and allows conscious patient participation — but does have cardiovascular effects (hypotension from sympathetic blockade).'},
  {q:'BIS (Bispectral Index) target range for adequate surgical anesthesia is:',opts:['80–95','60–80','40–60','20–40'],correct:2,exp:'BIS 40–60 represents adequate surgical anesthesia — suppressed consciousness with acceptable depth. BIS 60–85 = moderate sedation; BIS >85 = awake; BIS 40–60 reduces intraoperative awareness risk; BIS <40 = excessively deep (↑PONV, delayed emergence). BIS does NOT measure analgesia.'},
  {q:'Which NMBA is safe to use in patients with severe renal AND hepatic failure?',opts:['Vecuronium','Pancuronium','Rocuronium','Cisatracurium'],correct:3,exp:'Cisatracurium undergoes Hofmann degradation (spontaneous pH- and temperature-dependent breakdown) + non-specific ester hydrolysis — not dependent on renal or hepatic function. This makes it ideal for ICU patients with organ failure. Atracurium also undergoes Hofmann degradation but releases more laudanosine (CNS stimulant).'},
  {q:'The Larson\'s manoeuvre (laryngospasm notch pressure) is applied at:',opts:['The thyroid cartilage bilaterally','Bilateral retroauricular groove between mastoid process and ascending ramus of mandible','The suprasternal notch','The cricothyroid membrane'],correct:1,exp:'Larson\'s manoeuvre: apply firm inward and upward pressure in the "laryngospasm notch" — the bilateral retroauricular grooves posterior to the ear lobule (between mastoid process and ascending ramus of mandible). This stimulates a painful afferent nerve pathway, breaking the reflex arc of laryngospasm.'},
  {q:'Local anaesthetic systemic toxicity (LAST) definitive treatment with intralipid involves:',opts:['0.5 mg/kg IV bolus, no infusion','1.5 mL/kg IV bolus, then 0.25 mL/kg/min infusion','5 mL/kg IV bolus once','1 mL/kg over 5 minutes, repeat if no response'],correct:1,exp:'20% Intralipid for LAST: 1.5 mL/kg IV bolus over 1 minute, then 0.25 mL/kg/min infusion. Can repeat bolus (1.5 mL/kg) every 3–5 min if no response. Maximum cumulative dose: 12 mL/kg. Mechanism: lipid sink — sequesters lipid-soluble local anaesthetic away from sodium channels.'},
  {q:'Which vasopressor is now preferred for obstetric spinal hypotension?',opts:['Ephedrine (β-effect maintains CO)','Metaraminol','Phenylephrine (pure α₁) — or noradrenaline','Vasopressin'],correct:2,exp:'Phenylephrine (or noradrenaline) is now 1st-line for obstetric spinal hypotension — associated with LESS fetal acidosis than ephedrine. Phenylephrine\'s pure vasoconstriction maintains uteroplacental blood flow without increasing fetal HR/metabolic demand. Ephedrine\'s β-effects cross placenta → fetal tachycardia → increased metabolic demand → acidosis.'},
  {q:'The maximum dose of lignocaine (lidocaine) without adrenaline for infiltration anesthesia is:',opts:['2 mg/kg','3 mg/kg','5 mg/kg','7 mg/kg'],correct:1,exp:'Lignocaine (lidocaine) maximum dose: 3 mg/kg WITHOUT adrenaline; 7 mg/kg WITH adrenaline. Ropivacaine: 3 mg/kg. Bupivacaine: 2 mg/kg (narrow toxic:therapeutic ratio — use lower doses). Always calculate total mg from concentration: 1% = 10 mg/mL.'},
];

const CHECKLIST_DATA = [
  {section:'Equipment Check (MSMAIDS)', critical:true, items:[
    {text:'Machine — anesthesia machine checked, all components functional',critical:true},
    {text:'Suction — working, Yankauer catheter connected and tested',critical:true},
    {text:'Monitors — ECG, SpO₂, NIBP, EtCO₂, temperature probe, NMT',critical:false},
    {text:'Airway — ETT (correct size + size above/below), LMA, laryngoscope blades, video laryngoscope, bougie',critical:true},
    {text:'IV access — confirmed, flushed, drugs drawn up',critical:true},
    {text:'Drugs — induction agent, opioid, NMBA, vasopressors, reversal agents prepared',critical:true},
    {text:'Suction — powered, accessible, functioning',critical:true},
  ]},
  {section:'Patient Assessment', critical:false, items:[
    {text:'Patient identity confirmed (name, DOB, consent signed)',critical:true},
    {text:'Operation site and side confirmed',critical:true},
    {text:'Allergies reviewed',critical:true},
    {text:'Fasting status confirmed (≥6h solids, ≥2h clear fluids for elective)',critical:false},
    {text:'ASA classification noted',critical:false},
    {text:'Airway assessment completed (Mallampati, LEMON, TMD)',critical:false},
    {text:'Difficult airway plan A, B, C defined',critical:false},
    {text:'Anesthetic plan discussed with patient',critical:false},
  ]},
  {section:'Monitoring Setup', critical:false, items:[
    {text:'ECG leads connected, rhythm confirmed',critical:false},
    {text:'SpO₂ probe applied and waveform confirmed',critical:false},
    {text:'NIBP cuff correct size, baseline recorded',critical:false},
    {text:'IV access checked — patent, secured',critical:false},
    {text:'Temperature probe positioned',critical:false},
  ]},
  {section:'Pre-Induction Safety', critical:true, items:[
    {text:'WHO Surgical Safety Checklist "Sign-In" completed',critical:true},
    {text:'Positioning and pressure points addressed',critical:false},
    {text:'Warming device in place (forced-air warmer / warming blanket)',critical:false},
    {text:'Vasopressor/rescue drugs available and labelled',critical:true},
    {text:'Difficult airway trolley location known',critical:true},
    {text:'Team briefed on emergency plan',critical:false},
  ]},
];

const MACHINE_COMPONENTS = [
  {icon:'💨',name:'Gas Supply System',desc:'Pipeline (400 kPa) and cylinder backup O₂, N₂O, air. Color-coded connections (O₂=white UK, N₂O=blue). Pin-index safety system prevents misconnections.'},
  {icon:'⚗️',name:'Vaporizer',desc:'Precision drug delivery system for volatile agents. TEC-7 (sevoflurane/desflurane). Concentration-calibrated dial. Interlocks prevent two vaporizers opening simultaneously.'},
  {icon:'🌬️',name:'Flowmeters (Rotameters)',desc:'Glass tubes with floating bobbles indicating gas flow (L/min). O₂ always downstream from N₂O (hypoxic guard). Anti-hypoxia interlock ensures O₂:N₂O ratio ≥25:75.'},
  {icon:'🔄',name:'Rebreathing Circuit',desc:'Circle system with inspiratory/expiratory limbs, one-way valves, Y-piece, reservoir bag. CO₂ absorbed by soda lime (Baralyme). Low-flow anesthesia reduces agent consumption.'},
  {icon:'🧪',name:'CO₂ Absorber (Soda Lime)',desc:'NaOH + KOH + Ca(OH)₂ + moisture. Absorbs exhaled CO₂ exothermically. Indicator dye (ethyl violet) turns purple when exhausted. Sevoflurane + dry soda lime = Compound A.'},
  {icon:'🦺',name:'APL Valve (Pop-off)',desc:'Adjustable Pressure Limiting valve. Controls maximum circuit pressure during spontaneous or manual ventilation. 30 cmH₂O for adults, 20 for children. Must be CLOSED during mechanical ventilation.'},
  {icon:'🫁',name:'Bellows Ventilator',desc:'Pneumatically-driven bellows delivers tidal volumes. Modes: Volume-control (VC-CMV), Pressure-control (PC-CMV), SIMV, Pressure Support. Compliance compensation corrects for circuit expansion.'},
  {icon:'📊',name:'Gas Analyser',desc:'Sidestream or mainstream infrared spectrometry. Measures FiO₂, EtCO₂, inspired/expired volatile agent, N₂O. Agent-specific identification. Spirometry (flow-volume loops) integrated.'},
  {icon:'💡',name:'Backup Power / UPS',desc:'Battery backup maintains ventilation and monitoring during power failure. Typically 30–60 min reserve. Audible alarm on power loss. Emergency O₂ flow via Oxygen Flush valve (35–75 L/min).'},
  {icon:'🔒',name:'Scavenging System',desc:'Collects and vents waste anesthetic gases from APL valve and ventilator outlet. Active (Venturi) or passive systems. Prevents OT contamination. NIOSH standards: N₂O <25 ppm, volatiles <2 ppm.'},
  {icon:'🫀',name:'Oxygen Flush Valve',desc:'Emergency 35–75 L/min direct O₂ bypass, bypasses vaporizer and flowmeters. Fills circuit instantly. Use cautiously — extremely high flow can cause barotrauma. Never press during spontaneous ventilation.'},
  {icon:'⚠️',name:'Oxygen Failure Alarm',desc:'Mandatory — activates within 30s of O₂ pressure falling below threshold. Cuts N₂O delivery (hypoxic guard). Visual + audible. Backup O₂ cylinder must be mounted and checked before each list.'},
];

const PUBLICATIONS_DATA = [
  {type:'article',typeLabel:'Article',date:'Mar 2024',title:'Dual Expertise: How Medical Training Transforms Software Architecture',excerpt:'The parallels between anesthesia practice and software engineering are striking — both require systems thinking, failure mode analysis, and precision under pressure. This article explores how clinical training in anesthesiology directly enhances software architecture skills.',tags:['Anesthesia','Software','Career'],readTime:'8 min'},
  {type:'research',typeLabel:'Research Notes',date:'Jan 2024',title:'Pre-Anesthesia Assessment in Resource-Limited Settings: A Framework for Ethiopian Hospitals',excerpt:'Developing a systematic pre-anesthesia assessment protocol adapted for resource-limited clinical environments. Focuses on identifying high-risk patients with minimal diagnostic resources, leveraging clinical examination and history.',tags:['Anesthesia','Ethiopia','Clinical'],readTime:'12 min'},
  {type:'tutorial',typeLabel:'Tutorial',date:'Nov 2023',title:'Building a Real-Time Vital Signs Dashboard with React and WebSockets',excerpt:'Step-by-step guide to creating a clinical-grade vital signs monitoring interface using React 18, WebSockets for live data streaming, and Canvas API for ECG waveform rendering. Inspired by real patient monitor interfaces.',tags:['React','WebSocket','Healthcare Tech'],readTime:'15 min'},
  {type:'article',typeLabel:'Article',date:'Sep 2023',title:'Propofol and the Designer Drug Paradox: Why Anesthesiologists Must Understand Pharmacokinetics',excerpt:'A deep dive into propofol pharmacokinetics — explaining why the "milk of amnesia" behaves so predictably in skilled hands yet dangerously in untrained ones. Context-sensitive half-times, TIVA principles, and clinical pearls.',tags:['Pharmacology','Propofol','Education'],readTime:'10 min'},
  {type:'tutorial',typeLabel:'Tutorial',date:'Jul 2023',title:'Accessible Component Design: Building WCAG 2.2 AA Compliant React Components',excerpt:'A comprehensive guide to accessibility-first React component development. From semantic HTML and ARIA attributes to keyboard navigation, focus management, and automated testing with axe-core.',tags:['React','Accessibility','TypeScript'],readTime:'18 min'},
  {type:'case',typeLabel:'Case Study',date:'May 2023',title:'Managing Anaphylaxis Under General Anesthesia: A Clinical Simulation Analysis',excerpt:'Analysis of anaphylaxis management under general anesthesia through clinical simulation scenarios. Covers diagnosis (Ringing‐Leeuwenkamp criteria), graded responses, adrenaline dosing, and team communication in the sterile environment.',tags:['Anesthesia','Emergency','Simulation'],readTime:'14 min'},
];

const CERTS_DATA = [
  {icon:'🩺',iconCls:'cert-icon-medical',title:'Basic Life Support (BLS) Certification',issuer:'Ethiopian Medical Association',date:'2023',verified:true},
  {icon:'⚕️',iconCls:'cert-icon-medical',title:'Advanced Cardiovascular Life Support (ACLS)',issuer:'AHA Protocol Training',date:'2023',verified:true},
  {icon:'🫁',iconCls:'cert-icon-medical',title:'Paediatric Advanced Life Support (PALS)',issuer:'Paediatric Emergency Protocol',date:'2023',verified:true},
  {icon:'⚛️',iconCls:'cert-icon-web',title:'Meta Front-End Developer Certificate',issuer:'Meta (Coursera)',date:'2023',verified:true},
  {icon:'🔷',iconCls:'cert-icon-web',title:'TypeScript Advanced Patterns',issuer:'Total TypeScript',date:'2022',verified:true},
  {icon:'🎨',iconCls:'cert-icon-web',title:'CSS for JavaScript Developers',issuer:'Josh Comeau',date:'2023',verified:true},
  {icon:'☁️',iconCls:'cert-icon-cloud',title:'AWS Cloud Practitioner',issuer:'Amazon Web Services',date:'2022',verified:true},
  {icon:'📱',iconCls:'cert-icon-web',title:'React Native — Practical Guide',issuer:'Udemy / Maximilian',date:'2022',verified:true},
  {icon:'📊',iconCls:'cert-icon-data',title:'The Analytics Edge',issuer:'MIT OpenCourseWare',date:'2023',verified:true},
];

const TESTIMONIALS_DATA = [
  {stars:5,text:'Eyob\'s frontend work is exceptional — he delivered a React component library that exceeded our expectations. His code is clean, well-documented, and his attention to accessibility details is something we rarely see in developers.',name:'Mihret A.',place:'Addis Ababa, Ethiopia',email:'mihret.a@example.com',project:'Frontend Development',date:'Mar 2024',photo:'img/mihret.jpg',role:'CTO, Addis Tech Startup',avatar:'👩‍💼'},
  {stars:5,text:'Working with Eyob was a pleasure. He asks the right questions, understands business requirements deeply, and delivers pixel-perfect UIs. His TypeScript skills are particularly impressive for someone still in university.',name:'Dr. Samuel K.',place:'Bahir Dar, Ethiopia',email:'samuel.k@example.com',project:'Web Application',date:'Jan 2024',photo:'img/samuel.jpg',role:'Medical Director, Regional Hospital',avatar:'👨‍⚕️'},
  {stars:5,text:'What sets Eyob apart is his dual perspective — he thinks about user interfaces the way a clinician thinks about patient care. Precise, systematic, and always safety-first. His portfolio site alone is a testament to his talent.',name:'Liya B.',place:'Addis Ababa, Ethiopia',email:'liya.b@example.com',project:'UI/UX Collaboration',date:'Nov 2023',photo:'img/liya.jpg',role:'Product Designer, Freelance',avatar:'👩‍🎨'},
  {stars:5,text:'Exceptional attention to detail and a willingness to go beyond the brief. Eyob refactored our entire frontend architecture from class components to hooks-based React, reducing our bundle by 40%.',name:'Abebe T.',place:'Hawassa, Ethiopia',email:'abebe.t@example.com',project:'React Refactoring',date:'Aug 2023',photo:'img/abebe.jpg',role:'Lead Developer, E-Commerce Platform',avatar:'👨‍💻'},
  {stars:5,text:'Eyob helped me understand complex anesthesia pharmacology through clear, systematic explanations. His ability to break down difficult concepts — both medical and technical — is remarkable.',name:'Tigist M.',place:'Gondar, Ethiopia',email:'tigist.m@example.com',project:'Anesthesia Mentoring',date:'Jun 2023',photo:'',role:'Fellow Anesthesia Student',avatar:'👩‍🎓'},
  {stars:5,text:'The mobile app he built for our clinic was delivered on time, on budget, and with thoughtful UX details we hadn\'t even considered. He understands both the medical and technical requirements.',name:'Dr. Kebede W.',place:'Addis Ababa, Ethiopia',email:'kebede.w@example.com',project:'Mobile App Development',date:'Feb 2023',photo:'img/kebede.jpg',role:'Surgeon, Private Clinic',avatar:'👨‍⚕️'},
];

const DEV_TOOLS_DATA = [
  {icon:'⚡',name:'Vite',desc:'Next-gen bundler — instant HMR, optimized builds'},
  {icon:'🔷',name:'TypeScript',desc:'Static typing for large-scale reliability'},
  {icon:'⚛️',name:'React 18',desc:'Concurrent features, hooks, RSC'},
  {icon:'🎨',name:'Figma',desc:'UI design, prototyping, design tokens'},
  {icon:'🐙',name:'GitHub',desc:'Version control, Actions CI/CD'},
  {icon:'🐳',name:'Docker',desc:'Containerization, reproducible envs'},
  {icon:'📦',name:'pnpm',desc:'Fast, space-efficient package manager'},
  {icon:'🧪',name:'Vitest',desc:'Unit/integration testing, coverage'},
  {icon:'📖',name:'Storybook',desc:'Component workshop, design system docs'},
  {icon:'🌊',name:'TailwindCSS',desc:'Utility-first CSS at scale'},
  {icon:'🗄️',name:'PostgreSQL',desc:'Relational DB, JSONB, full-text search'},
  {icon:'☁️',name:'AWS',desc:'Lambda, S3, RDS, CloudFront'},
  {icon:'🔍',name:'Playwright',desc:'E2E testing, cross-browser automation'},
  {icon:'📊',name:'Datadog',desc:'APM, logging, RUM performance'},
  {icon:'🤖',name:'GitHub Copilot',desc:'AI pair programming, code completion'},
];

