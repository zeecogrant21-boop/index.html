/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

export interface DiseaseInfo {
  id: string;
  name: string;
  category: 'Cardiovascular' | 'Endocrine & Metabolic' | 'Respiratory' | 'Infectious & Tropical' | 'Gastrointestinal' | 'Neurological' | 'Dermatology & Wounds' | 'Musculoskeletal' | 'Renal & Urology';
  severity: 'Critical / Emergency' | 'Moderate / Chronic' | 'Mild / Acute';
  description: string;
  symptoms: string[];
  etiologyAndCauses: string;
  standardTreatment: string;
  primaryMedications: string[];
  firstAidOrEmergencySteps?: string[];
  preventionAndDietary: string;
}

export interface WoundAndCutsTreatment {
  type: string;
  severityGrade: string;
  immediateAction: string[];
  cleansingAndDisinfection: string;
  dressingsAndClosure: string;
  infectionSignsToWatch: string[];
  medicationsAndOintments: string[];
  whenToSeekEmergencyCare: string;
}

export interface MedicationGuideItem {
  genericName: string;
  brandNames: string[];
  drugClass: string;
  primaryIndications: string[];
  mechanismOfAction: string;
  commonDosingRange: string;
  criticalContraindications: string[];
  keySideEffects: string[];
  warningsAndNotes: string;
}

export const WOUND_AND_CUTS_PROTOCOLS: WoundAndCutsTreatment[] = [
  {
    type: 'Cuts, Lacerations & Incised Wounds',
    severityGrade: 'Mild to Severe depending on depth and arterial involvement',
    immediateAction: [
      'Apply direct firm pressure with sterile gauze or clean cloth for 5–10 minutes continuously without lifting to allow platelet clot formation.',
      'Elevate the injured limb above heart level to reduce hydrostatic blood pressure at the wound site.',
      'If blood soaks through, do NOT remove the original dressing; add additional layers of gauze on top and maintain pressure.',
      'For severe arterial spurting, apply an approved tourniquet 2–3 inches proximal to the wound (never on a joint) and note the application time.'
    ],
    cleansingAndDisinfection: 'Irrigate generously with copious sterile saline or clean running potable water under mild pressure. Avoid pouring straight hydrogen peroxide or isopropyl alcohol directly into deep tissue, as this causes cellular necrosis and delays healing.',
    dressingsAndClosure: 'For clean, shallow cuts with edges that meet cleanly, apply sterile wound closure strips (Steri-Strips) perpendicular to the wound. For gaping wounds deeper than 1/4 inch, wounds over joints, or facial cuts, professional suturing, staples, or surgical glue (Dermabond) is required within 6–8 hours.',
    infectionSignsToWatch: ['Spreading erythema (redness) > 1cm from edge', 'Purulent drainage (pus)', 'Fever or chills', 'Increasing throbbing pain', 'Red streaks ascending toward the heart (lymphangitis)'],
    medicationsAndOintments: ['Topical Bacitracin or Polymyxin B ointment', 'Oral Cephalexin or Amoxicillin-Clavulanate if infected', 'Tetanus toxoid booster if > 5-10 years since last dose', 'Acetaminophen or Ibuprofen for pain relief'],
    whenToSeekEmergencyCare: 'Spurting blood that does not stop after 10 minutes of direct pressure; numbness or loss of motor function distal to cut; gaping tissue showing fat, muscle, or bone; contaminated or dirty animal/human bites.'
  },
  {
    type: 'Puncture Wounds (Nails, Thorns, Splinters)',
    severityGrade: 'High risk of deep anaerobic infection (Clostridium tetani)',
    immediateAction: [
      'Do not probe deeply or aggressively squeeze the wound.',
      'Allow modest bleeding for a few seconds to naturally flush contaminants.',
      'Remove easily accessible superficial foreign objects with sterilized tweezers; do NOT remove deeply embedded objects (seek ER care).'
    ],
    cleansingAndDisinfection: 'Soak the wound in warm soapy water for 10–15 minutes. Flush thoroughly with sterile saline.',
    dressingsAndClosure: 'Do NOT close puncture wounds with tape or glue; they need to drain to prevent anaerobic bacterial abscess formation. Cover with sterile non-stick bandage.',
    infectionSignsToWatch: ['Swelling and deep throbbing', 'Erythema', 'Inability to bear weight', 'Trismus (jaw stiffness / tetanus sign)'],
    medicationsAndOintments: ['Immediate Tetanus Toxoid vaccination within 48 hours', 'Prophylactic oral antibiotics (Ciprofloxacin or Augmentin if stepped on nail through rubber shoe)'],
    whenToSeekEmergencyCare: 'Deep puncture through rubber shoe or dirty nail; object remains broken inside; numbness or signs of tetanus.'
  },
  {
    type: 'Burns (Thermal, Scald, Chemical, Electrical)',
    severityGrade: '1st Degree (Superficial), 2nd Degree (Partial Thickness), 3rd Degree (Full Thickness)',
    immediateAction: [
      'Immediately cool the burn under gentle, running cool tap water for 15–20 minutes.',
      'CRITICAL: NEVER apply ice, iced water, butter, oil, toothpaste, or lard (causes tissue hypothermia and infection).',
      'Gently remove rings, watches, or restrictive clothing before swelling occurs.',
      'Do NOT intentionally pop or de-roof blisters; the blister roof acts as a sterile biologic dressing.'
    ],
    cleansingAndDisinfection: 'Wash gently with mild fragrance-free soap and sterile saline. Pat dry with sterile non-woven gauze.',
    dressingsAndClosure: 'Apply sterile silver sulfadiazine cream (1%) or medical-grade petroleum gauze / hydrogel dressing. Wrap loosely with sterile conforming bandage.',
    infectionSignsToWatch: ['Foul-smelling exudate', 'High fever', 'Cellulitis spreading beyond burn boundary'],
    medicationsAndOintments: ['Silver Sulfadiazine cream 1%', 'Bacitracin ointment', 'Oral Paracetamol / Ibuprofen for pain', 'Oral rehydration therapy with electrolytes'],
    whenToSeekEmergencyCare: 'Third-degree burns (charred, white, leathery skin, often painless due to nerve destruction); burns covering > 10% of total body surface; burns involving the face, hands, feet, groin, or major joints; all electrical and chemical burns.'
  }
];

export const ENCYCLOPEDIC_DISEASES_DB: DiseaseInfo[] = [
  // -------------------------------------------------------------
  // 1. CARDIOVASCULAR
  // -------------------------------------------------------------
  {
    id: 'hypertension',
    name: 'Essential Hypertension (High Blood Pressure)',
    category: 'Cardiovascular',
    severity: 'Moderate / Chronic',
    description: 'Persistent arterial systolic pressure ≥ 130 mmHg and/or diastolic pressure ≥ 80 mmHg. Termed the "silent killer" because it causes progressive target-organ damage (heart, kidneys, brain, retina) without early symptoms.',
    symptoms: ['Often asymptomatic ("silent")', 'Occipital morning headaches in severe cases', 'Lightheadedness', 'Tinnitus', 'Epistaxis (nosebleeds) in hypertensive crises'],
    etiologyAndCauses: 'Multifactorial genetic predisposition, excess dietary sodium (> 2,300 mg/day), obesity, physical inactivity, chronic stress, endothelial stiffness.',
    standardTreatment: 'DASH diet (rich in potassium and magnesium), salt restriction (< 1.5g sodium/day), 150 min/week aerobic exercise, weight reduction, smoking cessation, pharmacotherapy.',
    primaryMedications: [
      'ACE Inhibitors: Lisinopril (10–40 mg daily), Enalapril',
      'ARBs: Losartan (50–100 mg daily), Telmisartan',
      'Calcium Channel Blockers: Amlodipine (5–10 mg daily)',
      'Thiazide Diuretics: Hydrochlorothiazide (12.5–25 mg daily), Chlorthalidone'
    ],
    preventionAndDietary: 'DASH eating pattern, reduction of processed canned foods, regular aerobic conditioning, moderation of alcohol.'
  },
  {
    id: 'myocardial_infarction',
    name: 'Acute Myocardial Infarction (Heart Attack / STEMI / NSTEMI)',
    category: 'Cardiovascular',
    severity: 'Critical / Emergency',
    description: 'Ischemic myocardial necrosis caused by sudden acute occlusion of a coronary artery, typically precipitated by atherosclerotic plaque rupture and subsequent thrombus formation.',
    symptoms: [
      'Substernal crushing, heavy chest pressure ("elephant on chest") lasting > 20 mins',
      'Radiation of pain to left arm, neck, jaw, epigastrium, or interscapular region',
      'Diaphoresis (profuse cold sweat)',
      'Dyspnea (shortness of breath)',
      'Nausea, vomiting, lightheadedness, or sudden syncope'
    ],
    etiologyAndCauses: 'Atherosclerosis of coronary arteries, hyperlipidemia, smoking, hypertension, diabetes mellitus, sedentary lifestyle.',
    standardTreatment: 'EMERGENCY: Immediate EMS call, emergency coronary catheterization (PCI / angioplasty with drug-eluting stent) within 90 minutes ("door-to-balloon time"), or IV thrombolysis (Alteplase) if PCI unavailable within 120 mins.',
    primaryMedications: [
      'Immediate: Aspirin 325 mg chewed immediately',
      'Sublingual Nitroglycerin (0.4 mg every 5 min up to 3 doses if systolic BP > 90)',
      'P2Y12 Antiplatelet: Clopidogrel (300–600 mg loading) or Ticagrelor',
      'Anticoagulant: Heparin or Enoxaparin',
      'Beta-Blocker: Metoprolol tartrate',
      'High-Intensity Statin: Atorvastatin 80 mg daily'
    ],
    firstAidOrEmergencySteps: [
      'Call emergency medical services immediately (do NOT drive yourself).',
      'Have patient sit upright, keep calm, and loosen restrictive clothing.',
      'Administer 325 mg uncoated Aspirin to be chewed thoroughly for rapid absorption.',
      'Be prepared to initiate CPR and deploy an AED if patient becomes pulseless.'
    ],
    preventionAndDietary: 'Long-term cardiac rehabilitation, Mediterranean diet, smoking cessation, lipid management with statins, daily low-dose aspirin as indicated.'
  },

  // -------------------------------------------------------------
  // 2. ENDOCRINE & METABOLIC
  // -------------------------------------------------------------
  {
    id: 'type_2_diabetes',
    name: 'Type 2 Diabetes Mellitus',
    category: 'Endocrine & Metabolic',
    severity: 'Moderate / Chronic',
    description: 'Progressive metabolic disorder characterized by peripheral insulin resistance, impaired insulin secretion by pancreatic beta-cells, and chronic hyperglycemia (Fasting plasma glucose ≥ 126 mg/dL or HbA1c ≥ 6.5%).',
    symptoms: [
      'Polyuria (excessive urination)',
      'Polydipsia (unquenchable thirst)',
      'Polyphagia (constant hunger)',
      'Unexplained weight loss or weight gain',
      'Blurred vision',
      'Poor wound healing',
      'Peripheral neuropathy (tingling in toes/feet)'
    ],
    etiologyAndCauses: 'Genetic susceptibility, visceral adiposity, high glycemic processed diets, physical inactivity, chronic systemic inflammation.',
    standardTreatment: 'Medical nutrition therapy (low glycemic index carbohydrates), structured aerobic and resistance training, glycemic self-monitoring, stepwise pharmacotherapy.',
    primaryMedications: [
      'First-Line Biguanide: Metformin (500–2,000 mg daily with meals)',
      'SGLT2 Inhibitors: Empagliflozin (Jardiance 10–25 mg daily), Dapagliflozin',
      'GLP-1 Receptor Agonists: Semaglutide (Ozempic), Liraglutide',
      'DPP-4 Inhibitors: Sitagliptin (Januvia 100 mg daily)',
      'Sulfonylureas: Glipizide, Glimepiride',
      'Basal Insulins: Insulin Glargine (Lantus), Degludec'
    ],
    preventionAndDietary: 'Eliminate sugar-sweetened beverages, prioritize high-fiber vegetables and lean protein, achieve 7% body weight reduction, annual diabetic foot and dilated retinal exams.'
  },
  {
    id: 'hypoglycemia',
    name: 'Acute Hypoglycemia (Low Blood Sugar Crisis)',
    category: 'Endocrine & Metabolic',
    severity: 'Critical / Emergency',
    description: 'Acute drop in blood glucose concentration < 70 mg/dL (3.9 mmol/L), frequently triggered by excess insulin/sulfonylurea administration, missed meals, or strenuous uncompensated exertion.',
    symptoms: [
      'Autonomic: Diaphoresis (cold clammy sweat), tremors, palpitations, anxiety, tachycardia',
      'Neuroglycopenic: Confusion, slurred speech, dizziness, visual disturbances, seizure, loss of consciousness'
    ],
    etiologyAndCauses: 'Iatrogenic overdose of diabetic medication, prolonged fasting, alcohol consumption on empty stomach.',
    standardTreatment: 'Rule of 15: Ingest 15–20g of fast-acting simple carbohydrates; recheck blood glucose in 15 minutes; repeat if still < 70 mg/dL.',
    primaryMedications: [
      'Oral: 4 glucose tablets, 1/2 cup (4 oz) fruit juice or regular soda',
      'Emergency Injectable: Glucagon 1 mg IM/SC kit or Baqsimi nasal powder (3 mg)',
      'IV in Hospital: 50 mL of 50% Dextrose (D50W) push'
    ],
    firstAidOrEmergencySteps: [
      'If conscious: Administer 15g fast-acting sugar (fruit juice, honey, glucose tabs).',
      'If unconscious or seizing: Place in recovery position, do NOT pour liquids into mouth (aspiration risk), administer emergency Glucagon, and call emergency services.'
    ],
    preventionAndDietary: 'Consistent meal timing, carry rapid-acting glucose at all times, wear medical alert identification.'
  },

  // -------------------------------------------------------------
  // 3. RESPIRATORY ILLNESSES
  // -------------------------------------------------------------
  {
    id: 'asthma',
    name: 'Bronchial Asthma & Acute Bronchospasm',
    category: 'Respiratory',
    severity: 'Moderate to Critical during Acute Attack',
    description: 'Chronic inflammatory airway disease characterized by bronchial hyperresponsiveness, smooth muscle bronchospasm, mucosal edema, and reversible airflow limitation.',
    symptoms: ['Wheezing (expiratory whistle)', 'Cough (especially nocturnal or post-exercise)', 'Dyspnea (shortness of breath)', 'Chest tightness', 'Retractions of intercostal muscles during severe distress'],
    etiologyAndCauses: 'Atopic IgE-mediated response to allergens (dust mites, pollen, pet dander), viral upper respiratory infections, cold dry air, exercise, NSAIDs/aspirin.',
    standardTreatment: 'Stepwise pharmacotherapy: Rapid bronchodilation with short-acting beta-agonists (SABA) for acute symptoms; long-term daily anti-inflammatory inhaled corticosteroids (ICS) for maintenance.',
    primaryMedications: [
      'Rescue SABA: Albuterol / Salbutamol inhaler (2 puffs every 4–6 hrs PRN)',
      'Controller ICS: Fluticasone propionate, Budesonide (Pulmicort)',
      'Combination ICS/LABA: Fluticasone/Salmeterol (Advair), Budesonide/Formoterol (Symbicort)',
      'Leukotriene Receptor Antagonist: Montelukast (Singulair 10 mg at bedtime)',
      'Systemic Steroids for Exacerbation: Oral Prednisone 40–50 mg daily for 5 days'
    ],
    firstAidOrEmergencySteps: [
      'Seat patient upright and encourage slow, pursed-lip breathing.',
      'Administer 2 to 4 puffs of Albuterol through a spacer immediately; repeat every 20 minutes up to 3 times.',
      'Call emergency services if speech is limited to single words, lips turn blue (cyanosis), or peak flow is < 50%.'
    ],
    preventionAndDietary: 'Identify and mitigate allergen triggers, use allergen-proof mattress encasings, ensure annual influenza vaccination.'
  },
  {
    id: 'pneumonia',
    name: 'Bacterial and Viral Community-Acquired Pneumonia',
    category: 'Respiratory',
    severity: 'Moderate to Critical',
    description: 'Acute lower respiratory tract infection with inflammation and alveolar consolidation (fluid/exudate filling air sacs), most commonly caused by Streptococcus pneumoniae.',
    symptoms: ['High fever and shaking chills (rigors)', 'Productive cough with rust-colored or purulent sputum', 'Pleuritic chest pain (sharp pain on inspiration)', 'Tachypnea (rapid breathing)', 'Fatigue and mental confusion in elderly'],
    etiologyAndCauses: 'Streptococcus pneumoniae, Mycoplasma pneumoniae, Haemophilus influenzae, Respiratory Syncytial Virus (RSV), SARS-CoV-2.',
    standardTreatment: 'Appropriate targeted empirical antibiotic therapy, supplemental oxygen for SpO2 < 92%, antipyretics, chest physiotherapy, and aggressive oral hydration.',
    primaryMedications: [
      'Outpatient Uncomplicated: Amoxicillin (1g TID) or Doxycycline (100mg BID)',
      'With Comorbidities: Amoxicillin-Clavulanate (Augmentin 875/125mg BID) + Azithromycin (500mg day 1, then 250mg)',
      'Inpatient Hospital: IV Ceftriaxone (1g–2g daily) + Azithromycin (500mg IV daily) or Levofloxacin',
      'Antipyretics: Paracetamol 500–1000 mg every 6 hrs'
    ],
    preventionAndDietary: 'Pneumococcal vaccines (PCV20 or PCV15 followed by PPSV23), annual influenza vaccine, smoking cessation.'
  },

  // -------------------------------------------------------------
  // 4. INFECTIOUS & TROPICAL DISEASES
  // -------------------------------------------------------------
  {
    id: 'dengue_fever',
    name: 'Dengue Virus & Severe Dengue (Breakbone Fever)',
    category: 'Infectious & Tropical',
    severity: 'Moderate to Critical (Dengue Hemorrhagic / Shock)',
    description: 'Arboviral infection transmitted by daytime-biting female Aedes aegypti mosquitoes. Characterized by sudden high fever and intense retro-orbital and musculoskeletal pain.',
    symptoms: [
      'High fever (up to 104°F / 40°C)',
      'Severe retro-orbital (behind the eye) headache',
      'Severe arthralgia and myalgia ("breakbone" pain)',
      'Maculopapular rash appearing 3–5 days after fever onset',
      'Warning signs of severe dengue: Persistent vomiting, severe abdominal pain, mucosal bleeding (bleeding gums), lethargy, rapid drop in platelets'
    ],
    etiologyAndCauses: 'Dengue virus serotypes 1–4, transmitted by Aedes mosquitoes breeding in stagnant freshwater containers.',
    standardTreatment: 'Supportive care: Strict hydration with oral rehydration salts (ORS), serial complete blood counts (CBC) monitoring hematocrit and platelet count. CRITICAL: Avoid Aspirin and NSAIDs.',
    primaryMedications: [
      'Analgesic/Antipyretic: Acetaminophen / Paracetamol (500mg–1000mg every 6 hrs, max 3000mg/24hr)',
      'STRICT CONTRAINDICATION: Aspirin, Ibuprofen, Naproxen, Diclofenac (they cause severe platelet inhibition and increase fatal hemorrhage risk!)',
      'Severe Dengue: Hospital IV crystalloid fluid resuscitation (Normal Saline or Ringer’s Lactate)'
    ],
    preventionAndDietary: 'Eliminate standing water in flowerpots, tires, and drums; apply DEET mosquito repellent; install window screens.'
  },

  // -------------------------------------------------------------
  // 5. GASTROINTESTINAL & HEPATIC
  // -------------------------------------------------------------
  {
    id: 'gerd_peptic_ulcer',
    name: 'Peptic Ulcer Disease & Gastroesophageal Reflux (GERD)',
    category: 'Gastrointestinal',
    severity: 'Moderate / Chronic',
    description: 'Mucosal mucosal erosion in the stomach (gastric ulcer) or duodenum (duodenal ulcer) caused by Helicobacter pylori infection or chronic NSAID use; GERD involves retrograde reflux of acidic gastric contents into the esophagus.',
    symptoms: [
      'Epigastric burning or gnawing pain (often relieved by food or antacids in duodenal ulcers, worsened by food in gastric ulcers)',
      'Heartburn (pyrosis) and acid regurgitation',
      'Nausea, early satiety, bloating',
      'Alarm signs: Melena (black tarry stools), hematemesis (coffee-ground vomit), dysphagia (difficulty swallowing)'
    ],
    etiologyAndCauses: 'Helicobacter pylori bacterial colonization, chronic NSAID use (Ibuprofen, Naproxen, Aspirin), hyperchlorhydria, tobacco smoking, alcohol.',
    standardTreatment: 'Gastric acid suppression with proton pump inhibitors, H. pylori eradication therapy if positive, elimination of NSAIDs.',
    primaryMedications: [
      'Proton Pump Inhibitors (PPIs): Omeprazole (20–40 mg daily before breakfast), Pantoprazole, Esomeprazole',
      'H2-Receptor Antagonists: Famotidine (20–40 mg daily)',
      'H. Pylori Quadruple Eradication Regimen (14 days): Bismuth subsalicylate + Metronidazole + Tetracycline + PPI',
      'Antacids for Quick Relief: Calcium carbonate (Tums), Aluminum-Magnesium hydroxide'
    ],
    preventionAndDietary: 'Avoid lying down within 3 hours of meals, elevate head of bed, avoid spicy/acidic foods, limit alcohol and caffeine.'
  },

  // -------------------------------------------------------------
  // 6. NEUROLOGICAL CONDITIONS
  // -------------------------------------------------------------
  {
    id: 'epilepsy_seizures',
    name: 'Epilepsy & Acute Tonic-Clonic Seizures',
    category: 'Neurological',
    severity: 'Moderate to Critical (Status Epilepticus)',
    description: 'Neurological disorder characterized by recurrent, unprovoked paroxysmal electrical discharges in the cerebral cortex, resulting in sudden involuntary motor convulsions and loss of awareness.',
    symptoms: ['Tonic phase (stiffening of muscles)', 'Clonic phase (rhythmic jerking of extremities)', 'Tongue biting, urinary incontinence', 'Post-ictal state (deep sleep, confusion, headache lasting 15–60 mins)'],
    etiologyAndCauses: 'Genetic ion channel mutations, head trauma, stroke, CNS infections (meningitis), brain tumors, electrolyte imbalances (hyponatremia).',
    standardTreatment: 'Maintenance antiepileptic drug (AED) monotherapy or polytherapy, avoidance of sleep deprivation and strobe triggers, surgical resection for focal refractory epilepsy.',
    primaryMedications: [
      'Broad-Spectrum Maintenance: Levetiracetam (Keppra 500–1500 mg BID), Lamotrigine, Valproic Acid',
      'Narrow-Spectrum: Carbamazepine, Phenytoin',
      'Acute Emergency Seizure Rescue (> 5 mins): Lorazepam (Ativan 2–4 mg IV) or Rectal Diazepam gel (Diastat) or Intranasal Midazolam'
    ],
    firstAidOrEmergencySteps: [
      'Gently ease the person to the floor and turn them onto their side (recovery position) to prevent aspiration.',
      'Place a soft cushion or jacket under their head.',
      'Loosen tight clothing around the neck; remove eyeglasses.',
      'CRITICAL: NEVER put anything inside the person’s mouth (do NOT insert spoons or fingers—causes teeth fractures and choking).',
      'CRITICAL: Do NOT hold them down or try to stop their jerking movements.',
      'Time the seizure: If it lasts longer than 5 minutes or a second seizure occurs without consciousness regaining, call EMS immediately (Status Epilepticus).'
    ],
    preventionAndDietary: 'Strict adherence to medication schedules, adequate sleep hygiene, avoidance of alcohol bingeing.'
  }
];

export const ESSENTIAL_MEDICATIONS_DB: MedicationGuideItem[] = [
  {
    genericName: 'Acetaminophen / Paracetamol',
    brandNames: ['Tylenol', 'Panadol', 'Calpol'],
    drugClass: 'Non-Opioid Analgesic & Antipyretic',
    primaryIndications: ['Mild to moderate pain', 'Fever reduction', 'Safe first-line antipyretic in suspected Dengue or viral illness'],
    mechanismOfAction: 'Centrally inhibits prostaglandin synthesis in the central nervous system; minimal peripheral anti-inflammatory activity.',
    commonDosingRange: 'Adults: 500 mg to 1,000 mg every 4 to 6 hours as needed. Maximum 3,000 mg to 4,000 mg in 24 hours.',
    criticalContraindications: ['Severe active hepatic impairment or cirrhosis', 'Acute liver failure', 'Concurrent heavy alcohol consumption'],
    keySideEffects: ['Hepatotoxicity in overdose', 'Rare cutaneous allergic reactions'],
    warningsAndNotes: 'CRITICAL: Acute overdose (> 7.5g to 10g) causes severe centrilobular hepatic necrosis. Antidote for overdose is N-acetylcysteine (NAC) administered within 8 hours.'
  },
  {
    genericName: 'Ibuprofen',
    brandNames: ['Advil', 'Motrin', 'Nurofen'],
    drugClass: 'Nonsteroidal Anti-Inflammatory Drug (NSAID)',
    primaryIndications: ['Musculoskeletal pain', 'Inflammatory arthritis', 'Dysmenorrhea', 'Dental pain', 'Headache'],
    mechanismOfAction: 'Non-selectively inhibits cyclooxygenase-1 (COX-1) and cyclooxygenase-2 (COX-2) enzymes, blocking inflammatory prostaglandin production.',
    commonDosingRange: 'Adults: 200 mg to 400 mg every 4 to 6 hours with food. Maximum 1,200 mg OTC or 2,400 mg prescription per 24 hours.',
    criticalContraindications: ['Active peptic ulcer or GI bleeding', 'Severe heart failure', 'Third-trimester pregnancy (causes premature closure of ductus arteriosus)', 'Suspected Dengue fever (increases hemorrhage)'],
    keySideEffects: ['Gastric mucosal irritation', 'GI ulceration', 'Fluid retention', 'Renal function impairment (inhibits renal vasodilating prostaglandins)'],
    warningsAndNotes: 'Always ingest with food or milk to minimize gastric mucosal irritation. Avoid long-term continuous use without gastric acid protection in high-risk patients.'
  },
  {
    genericName: 'Amoxicillin & Amoxicillin-Clavulanate',
    brandNames: ['Amoxil', 'Augmentin'],
    drugClass: 'Aminopenicillin & Beta-Lactamase Inhibitor Antibiotic',
    primaryIndications: ['Acute bacterial sinusitis', 'Streptococcal pharyngitis', 'Otitis media', 'Bacterial community pneumonia', 'Infected skin cuts/animal bites'],
    mechanismOfAction: 'Amoxicillin binds to penicillin-binding proteins (PBPs) inhibiting bacterial cell wall synthesis; clavulanic acid inhibits beta-lactamase degradation.',
    commonDosingRange: 'Amoxicillin: 500 mg TID or 875 mg BID. Augmentin: 875/125 mg orally twice daily with meals for 7–10 days.',
    criticalContraindications: ['Known severe IgE-mediated anaphylaxis to penicillins or beta-lactams', 'History of Augmentin-associated cholestatic jaundice'],
    keySideEffects: ['Diarrhea (clavulanate-induced gastrointestinal motility)', 'Nausea', 'Maculopapular rash in Epstein-Barr virus mononucleosis'],
    warningsAndNotes: 'Patients MUST complete the full prescribed course even if feeling better to prevent emergence of multidrug-resistant bacteria.'
  },
  {
    genericName: 'Lisinopril',
    brandNames: ['Zestril', 'Prinivil'],
    drugClass: 'Angiotensin-Converting Enzyme (ACE) Inhibitor',
    primaryIndications: ['Hypertension', 'Heart failure with reduced ejection fraction', 'Post-myocardial infarction', 'Diabetic nephropathy'],
    mechanismOfAction: 'Competitively inhibits ACE, preventing the conversion of angiotensin I to angiotensin II, leading to systemic vasodilation and reduced aldosterone secretion.',
    commonDosingRange: 'Hypertension: Initial 10 mg once daily, titrated up to 20–40 mg once daily.',
    criticalContraindications: ['Absolute: Pregnancy (teratogenic / fetal renal dysgenesis)', 'History of ACE inhibitor-induced angioedema', 'Bilateral renal artery stenosis'],
    keySideEffects: ['Dry, persistent nocturnal cough (caused by bradykinin accumulation in lungs)', 'Hyperkalemia', 'Hypotension', 'Rare life-threatening angioedema'],
    warningsAndNotes: 'Check serum creatinine and potassium levels within 2 weeks of initiation. If intractable dry cough occurs, switch to an ARB like Losartan.'
  },
  {
    genericName: 'Albuterol / Salbutamol',
    brandNames: ['Ventolin', 'ProAir', 'Proventil'],
    drugClass: 'Short-Acting Beta-2 Adrenergic Agonist (SABA)',
    primaryIndications: ['Acute relief of bronchospasm in asthma and COPD', 'Exercise-induced bronchoconstriction prevention'],
    mechanismOfAction: 'Stimulates beta-2 adrenergic receptors on bronchial smooth muscle, activating adenylate cyclase and increasing intracellular cAMP, causing rapid bronchodilation.',
    commonDosingRange: 'Inhalation: 1 to 2 puffs (90 mcg/puff) every 4 to 6 hours as needed for wheezing; 2 puffs 15 minutes before exercise.',
    criticalContraindications: ['Hypersensitivity to albuterol'],
    keySideEffects: ['Skeletal muscle tremor (fine hand shake)', 'Tachycardia and palpitations', 'Hypokalemia at high doses', 'Nervousness'],
    warningsAndNotes: 'Using more than one canister per month indicates poorly controlled asthma requiring escalation of inhaled corticosteroid maintenance controller therapy.'
  },
  {
    genericName: 'Epinephrine (Adrenaline)',
    brandNames: ['EpiPen', 'Auvi-Q', 'Adrenaclick'],
    drugClass: 'Non-Selective Alpha and Beta Adrenergic Agonist',
    primaryIndications: ['Anaphylaxis (severe allergic reaction with respiratory compromise or hypotension)', 'Cardiac arrest', 'Severe croup'],
    mechanismOfAction: 'Alpha-1 agonist causes peripheral vasoconstriction (reverses hypotension and mucosal edema); Beta-1 increases cardiac inotropy/chronotropy; Beta-2 causes powerful bronchodilation and inhibits mast cell mediator release.',
    commonDosingRange: 'Anaphylaxis: 0.3 mg (adults) or 0.15 mg (children 15–30kg) administered Intramuscularly (IM) into anterolateral mid-thigh.',
    criticalContraindications: ['NO ABSOLUTE CONTRAINDICATIONS in life-threatening anaphylaxis.'],
    keySideEffects: ['Tachycardia', 'Tremor', 'Anxiety', 'Headache', 'Hypertension'],
    warningsAndNotes: 'Administer immediately at the first sign of anaphylaxis (throat tightness, wheezing, hypotension). Do NOT delay for oral antihistamines. Call emergency services immediately after injection.'
  }
];
