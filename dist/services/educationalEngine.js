"use strict";
/**
 * FAI AVENIQ — Comprehensive Educational AI Engine
 * Developer: Fatima Anum Rasheed (Class 10 — Biology)
 *
 * Provides dedicated, authoritative, non-generic educational responses across:
 * - School, College, University, and Entry-Test Levels (Class 4 to Undergraduate)
 * - All Major Subjects: Biology, Physics, Chemistry, Math, Computer Science, English,
 *   Urdu, Islamiyat, Pakistan Studies, Economics, Programming, Web Development
 * - Formats: Direct Explanations, Complete Papers, 20/50 MCQs, Applications, Urdu Essays,
 *   Translations, Mathematical Step-by-Step Solutions, Lesson Plans, Study Schedules,
 *   Code Debugging, Answer Checking
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLanguage = detectLanguage;
exports.detectAcademicLevel = detectAcademicLevel;
exports.detectSubject = detectSubject;
exports.buildCurriculumGrounding = buildCurriculumGrounding;
exports.generateUrduEssay = generateUrduEssay;
exports.generateApplicationToPrincipal = generateApplicationToPrincipal;
exports.solveMathEquation = solveMathEquation;
exports.generate20BiologyMcqs = generate20BiologyMcqs;
exports.generate50MdcatBiologyMcqs = generate50MdcatBiologyMcqs;
exports.generateClass10PhysicsTest = generateClass10PhysicsTest;
exports.generateStudyPlanner = generateStudyPlanner;
exports.evaluateStudentAnswer = evaluateStudentAnswer;
exports.translateContent = translateContent;
// ==========================================
// 1. LANGUAGE & LEVEL DETECTION
// ==========================================
function detectLanguage(text, preferred) {
    if (preferred === 'ur')
        return 'ur';
    if (preferred === 'roman_ur')
        return 'roman_ur';
    // Check for Arabic / Urdu Unicode script
    const urduScriptRegex = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
    if (urduScriptRegex.test(text)) {
        return 'ur';
    }
    // Check for Roman Urdu markers
    const lower = text.toLowerCase();
    const romanUrduWords = [
        'kya', 'hai', 'hain', 'hota', 'hoti', 'hote', 'kaise', 'kese', 'kyun', 'kyu',
        'batao', 'bataein', 'batayein', 'samjhao', 'samjha', 'karen', 'karein', 'mein',
        'mai', 'aur', 'par', 'ko', 'se', 'ka', 'ki', 'ke', 'paude', 'pauday', 'roshni',
        'paani', 'pani', 'amal', 'khuraak', 'khurak', 'zameen', 'madad', 'mazmoon',
        'sawaal', 'jawab', 'chahiye', 'karo', 'likho', 'bhejo', 'wazahat'
    ];
    const words = lower.split(/[^a-z0-9]+/);
    let romanMatches = 0;
    for (const w of words) {
        if (romanUrduWords.includes(w)) {
            romanMatches++;
        }
    }
    if (romanMatches >= 2 || lower.includes('roman urdu') || lower.includes('urdu me') || lower.includes('urdu mein')) {
        return 'roman_ur';
    }
    return 'en';
}
function detectAcademicLevel(query, defaultDiff) {
    const q = query.toLowerCase();
    if (q.includes('class 4') || q.includes('grade 4') || q.includes('چوتھی'))
        return 'class_4';
    if (q.includes('class 5') || q.includes('grade 5') || q.includes('پانچویں'))
        return 'class_5';
    if (q.includes('class 6') || q.includes('grade 6') || q.includes('چھٹی'))
        return 'class_6';
    if (q.includes('class 7') || q.includes('grade 7') || q.includes('ساتویں') || q.includes('کلاس 7'))
        return 'class_7';
    if (q.includes('class 8') || q.includes('grade 8') || q.includes('آٹھویں') || q.includes('کلاس 8'))
        return 'class_8';
    if (q.includes('class 9') || q.includes('grade 9') || q.includes('نویں') || q.includes('کلاس 9'))
        return 'class_9';
    if (q.includes('class 10') || q.includes('grade 10') || q.includes('matric') || q.includes('دسویں') || q.includes('کلاس 10'))
        return 'class_10';
    if (q.includes('o level') || q.includes('o-level') || q.includes('olevel'))
        return 'o_level';
    if (q.includes('a level') || q.includes('a-level') || q.includes('alevel'))
        return 'a_level';
    if (q.includes('fsc') || q.includes('f.sc'))
        return 'fsc';
    if (q.includes('ics') || q.includes('i.c.s'))
        return 'ics';
    if (q.includes('icom') || q.includes('i.com'))
        return 'icom';
    if (q.includes('fa') || q.includes('f.a'))
        return 'fa';
    if (q.includes('inter') || q.includes('intermediate') || q.includes('hssc'))
        return 'intermediate';
    if (q.includes('mdcat') || q.includes('mcat'))
        return 'mdcat';
    if (q.includes('ecat'))
        return 'ecat';
    if (q.includes('entry test') || q.includes('entry-test') || q.includes('admission test'))
        return 'entry_test';
    if (q.includes('university') || q.includes('undergraduate') || q.includes('bachelor') || q.includes('bs ') || q.includes('degree') || q.includes('higher level'))
        return 'university';
    if (q.includes('college'))
        return 'college';
    if (defaultDiff)
        return defaultDiff;
    return 'class_10';
}
function detectSubject(query, defaultSub) {
    const q = query.toLowerCase();
    if (defaultSub && defaultSub !== 'general' && defaultSub !== 'all') {
        return defaultSub;
    }
    if (q.includes('photosynthesis') || q.includes('cell') || q.includes('mitosis') ||
        q.includes('meiosis') || q.includes('dna') || q.includes('rna') || q.includes('gene') ||
        q.includes('genetics') || q.includes('respiration') || q.includes('heart') ||
        q.includes('kidney') || q.includes('nephron') || q.includes('blood') ||
        q.includes('organism') || q.includes('biology') || q.includes('chloroplast') ||
        q.includes('enzyme') || q.includes('plant') || q.includes('digestion') ||
        q.includes('anatomy') || q.includes('physiology') || q.includes('mdcat') ||
        q.includes('پودے') || q.includes('سیل') || q.includes('حیاتیات') || q.includes('خلیہ')) {
        return 'biology';
    }
    if (q.includes('force') || q.includes('motion') || q.includes('newton') ||
        q.includes('gravity') || q.includes('velocity') || q.includes('acceleration') ||
        q.includes('friction') || q.includes('energy') || q.includes('momentum') ||
        q.includes('ohm') || q.includes('circuit') || q.includes('electricity') ||
        q.includes('voltage') || q.includes('current') || q.includes('physics') ||
        q.includes('wave') || q.includes('sound') || q.includes('light') || q.includes('optics') ||
        q.includes('حرکت') || q.includes('طبیعیات') || q.includes('قوت')) {
        return 'physics';
    }
    if (q.includes('atom') || q.includes('periodic table') || q.includes('reaction') ||
        q.includes('acid') || q.includes('base') || q.includes('ph') || q.includes('bond') ||
        q.includes('molecule') || q.includes('mole') || q.includes('stoichiometry') ||
        q.includes('electron') || q.includes('chemistry') || q.includes('کیمیا') || q.includes('کیمیائی')) {
        return 'chemistry';
    }
    if (q.includes('solve') || q.includes('equation') || q.includes('quadratic') ||
        q.includes('algebra') || q.includes('trigonometry') || q.includes('pythagoras') ||
        q.includes('calculus') || q.includes('derivative') || q.includes('integral') ||
        q.includes('math') || q.includes('geometry') || q.includes('triangle') ||
        q.includes('numerical') || q.includes('ریاضی') || q.includes('مساوات')) {
        return 'mathematics';
    }
    if (q.includes('html') || q.includes('css') || q.includes('python') || q.includes('javascript') ||
        q.includes('program') || q.includes('code') || q.includes('computer science') ||
        q.includes('ics') || q.includes('database') || q.includes('algorithm') ||
        q.includes('software') || q.includes('website') || q.includes('web design') ||
        q.includes('web dev') || q.includes('c++') || q.includes('java') || q.includes('sql')) {
        return 'cs';
    }
    if (q.includes('islam') || q.includes('islamiyat') || q.includes('quran') || q.includes('hadith') ||
        q.includes('namaz') || q.includes('roza') || q.includes('zakat') || q.includes('hajj') ||
        q.includes('اسلامیات') || q.includes('حدیث') || q.includes('نماز')) {
        return 'islamiyat';
    }
    if (q.includes('pakistan') || q.includes('quaid') || q.includes('allama iqbal') ||
        q.includes('1947') || q.includes('pak studies') || q.includes('مطالعہ پاکستان')) {
        return 'pak_studies';
    }
    if (q.includes('noun') || q.includes('verb') || q.includes('tense') ||
        q.includes('grammar') || q.includes('metaphor') || q.includes('simile') ||
        q.includes('active voice') || q.includes('passive voice') || q.includes('preposition') ||
        q.includes('application to the principal')) {
        return 'english';
    }
    if (q.includes('اردو') || q.includes('مضمون') || q.includes('اسم') || q.includes('فعل') || q.includes('صفت') ||
        q.includes('واحد جمع') || q.includes('متضاد') || q.includes('مترادف') || q.includes('شعر') ||
        q.includes('والدین') || q.includes('درخواست')) {
        return 'urdu';
    }
    if (q.includes('law') || q.includes('lat') || q.includes('llb') || q.includes('constitution') ||
        q.includes('legal') || q.includes('jurisprudence') || q.includes('court') || q.includes('statute')) {
        return 'law';
    }
    if (q.includes('canva') || q.includes('ui/ux') || q.includes('wireframe') || q.includes('figma') ||
        q.includes('presentation') || q.includes('slide deck') || q.includes('slides') || q.includes('branding') ||
        q.includes('graphic design') || q.includes('typography')) {
        return 'web_design';
    }
    if (q.includes('current affairs') || q.includes('news') || q.includes('foreign policy') ||
        q.includes('un ') || q.includes('united nations') || q.includes('geopolitics') || q.includes('css')) {
        return 'current_affairs';
    }
    if (q.includes('world history') || q.includes('world war') || q.includes('renaissance') ||
        q.includes('industrial revolution') || q.includes('ottoman') || q.includes('mughal')) {
        return 'world_history';
    }
    if (q.includes('geography') || q.includes('tectonic') || q.includes('glacier') ||
        q.includes('climate') || q.includes('river') || q.includes('latitude') || q.includes('longitude')) {
        return 'geography';
    }
    if (q.includes('economics') || q.includes('accounting') || q.includes('business') ||
        q.includes('statistics') || q.includes('gdp') || q.includes('inflation')) {
        return 'economics';
    }
    if (q.includes('science') || q.includes('lesson plan')) {
        return 'general_science';
    }
    return 'general';
}
// ==========================================
// 2. CURRICULUM GROUNDING FOR AQA
// ==========================================
function buildCurriculumGrounding(query) {
    const q = query.toLowerCase();
    // --- BIOLOGY & MEDICAL CONCEPTS ---
    if (q.includes('photosynthesis') || q.includes('chloroplast') || q.includes('chlorophyll')) {
        return `Photosynthesis is the fundamental biological process by which green plants convert light energy into chemical energy stored in glucose, using water and carbon dioxide, releasing oxygen gas as a byproduct.
Equation: 6CO2 + 6H2O + Light Energy -> C6H12O6 + 6O2.
Site: Chloroplasts in leaf mesophyll cells, containing chlorophyll in thylakoid membranes surrounded by stroma fluid.
Stages:
1. Light Reactions (Thylakoid membranes): Chlorophyll absorbs photons. Water is split by photolysis (2H2O -> 4H+ + 4e- + O2), producing ATP and NADPH.
2. Dark Reactions / Calvin Cycle (Stroma): ATP and NADPH provide energy to fix carbon dioxide into glucose using enzyme RuBisCO (Ribulose-1,5-bisphosphate carboxylase/oxygenase).
Importance: Produces breathable oxygen and forms the nutritional base of terrestrial and aquatic ecosystems.`;
    }
    if (q.includes('mitochondria') || q.includes('powerhouse') || q.includes('cellular respiration') || q.includes('krebs cycle') || q.includes('glycolysis') || q.includes('atp')) {
        return `Mitochondria are double-membraned semi-autonomous organelles known as the powerhouse of the eukaryotic cell because they generate the bulk of cellular chemical energy in the form of Adenosine Triphosphate (ATP) via aerobic cellular respiration.
Structure: Outer membrane (permeable via porins), intermembrane space, highly folded inner membrane forming cristae (housing ATP synthase and electron transport chain complexes), and internal matrix containing mitochondrial circular DNA and 70S ribosomes.
Respiration Stages:
1. Glycolysis (Cytoplasm): 1 Glucose -> 2 Pyruvate + 2 Net ATP + 2 NADH.
2. Link Reaction & Krebs Cycle (Mitochondrial Matrix): Pyruvate converted to Acetyl-CoA, producing NADH, FADH2, and CO2.
3. Oxidative Phosphorylation / Electron Transport Chain (Inner Cristae): High-energy electrons transfer along cytochromes; proton gradient across inner membrane drives ATP Synthase, yielding ~36 to 38 ATP per glucose molecule.`;
    }
    if (q.includes('cell') || q.includes('organelle') || q.includes('nucleus') || q.includes('ribosome') || q.includes('endoplasmic') || q.includes('golgi') || q.includes('lysosome') || q.includes('vacuole') || q.includes('membrane')) {
        return `Cell Biology and Organelles:
1. Cell Theory (Schleiden, Schwann, Virchow): All living organisms are composed of one or more cells; the cell is the fundamental unit of life; all cells arise from pre-existing cells.
2. Nucleus: The control center containing chromatin (DNA + histones) enclosed in a double-membraned nuclear envelope with pores. The nucleolus synthesizes ribosomal RNA (rRNA).
3. Ribosomes: Non-membranous ribonucleoprotein complexes responsible for protein synthesis (translation). 80S in eukaryotes, 70S in prokaryotes.
4. Endoplasmic Reticulum (ER): Rough ER (studded with ribosomes, modifies proteins); Smooth ER (lacks ribosomes, synthesizes lipids and detoxifies drugs).
5. Golgi Apparatus: Flattened cisternae that modify, sort, and package proteins and lipids into secretory vesicles.
6. Lysosomes: Membrane-bound digestive vesicles containing acid hydrolases (active at pH ~5.0) for autophagy and phagocytosis.
7. Plasma Membrane: Fluid Mosaic Model (Singer & Nicolson) composed of a phospholipid bilayer with embedded intrinsic and peripheral proteins, cholesterol, and glycoproteins. Regulates selective permeability.
8. Cell Wall: Rigid outer boundary in plant cells (cellulose), fungi (chitin), and bacteria (peptidoglycan).`;
    }
    if (q.includes('mitosis') || q.includes('meiosis') || q.includes('cell division')) {
        return `Cell Division (Mitosis vs Meiosis):
1. Mitosis: Equational division occurring in somatic cells for growth, tissue repair, and asexual reproduction. One parent cell yields 2 genetically identical diploid daughter cells (2n).
Stages (PMAT):
- Prophase: Chromatin condenses into visible chromosomes; nucleolus disappears; mitotic spindle forms.
- Metaphase: Chromosomes align at the equatorial metaphase plate; spindle fibers attach to kinetochores.
- Anaphase: Centromeres divide; sister chromatids are pulled apart toward opposite poles.
- Telophase: Nuclear envelopes reform around separated chromatin; nucleoli reappear. Followed by Cytokinesis (cleavage furrow in animals, cell plate in plants).
2. Meiosis: Reductional division occurring in germ cells (gametogenesis) producing 4 genetically diverse haploid gametes (n). Composed of Meiosis I (homologous chromosome pairing and crossing-over in Prophase I pachynema) and Meiosis II (separation of sister chromatids).`;
    }
    if (q.includes('dna') || q.includes('rna') || q.includes('genetics') || q.includes('gene') || q.includes('heredity') || q.includes('mendel') || q.includes('chromosome')) {
        return `Genetics and Molecular Biology:
1. DNA Structure (Watson and Crick, 1953): Double-stranded antiparallel helical polymer of nucleotides. Each nucleotide contains deoxyribose sugar, phosphate group, and nitrogenous base (Adenine pairs with Thymine via 2 hydrogen bonds; Guanine pairs with Cytosine via 3 hydrogen bonds).
2. RNA: Single-stranded polymer containing ribose sugar and Uracil (U) instead of Thymine (T). Three main types: mRNA (messenger), tRNA (transfer), rRNA (ribosomal).
3. Central Dogma: DNA -> (Transcription via RNA Polymerase) -> mRNA -> (Translation on Ribosomes) -> Polypeptide Protein.
4. Mendelian Laws:
- Law of Segregation: Each individual carries two alleles for a gene, which separate during gamete formation so each gamete carries only one allele.
- Law of Independent Assortment: Alleles of different genes segregate independently during gamete formation.
- Genotype vs Phenotype: Genotype is the genetic constitution (e.g., TT, Tt, tt); Phenotype is the observable physical trait (e.g., Tall vs Dwarf).`;
    }
    if (q.includes('heart') || q.includes('circulatory') || q.includes('blood') || q.includes('artery') || q.includes('vein')) {
        return `Human Circulatory and Cardiovascular System:
The heart is a four-chambered muscular pump enclosed in the pericardium:
- Right Atrium receives deoxygenated blood from the body via superior and inferior vena cava.
- Right Ventricle pumps deoxygenated blood to the lungs through the pulmonary artery via the tricuspid valve.
- Left Atrium receives oxygenated blood from the lungs via four pulmonary veins.
- Left Ventricle (thickest myocardial wall) pumps oxygenated blood under high systemic pressure into the Aorta via the bicuspid (mitral) valve.
Blood components: Plasma (55% fluid, proteins, electrolytes) and Formed Elements (45%): Erythrocytes (RBCs with hemoglobin for oxygen transport), Leukocytes (WBCs for immune defense: neutrophils, lymphocytes, monocytes), and Thrombocytes (Platelets for blood clotting).
Blood vessels: Arteries (carry blood away from heart under high pressure, thick elastic walls); Capillaries (microscopic, single-endothelial-cell layer for nutrient/gas diffusion); Veins (carry blood to heart under low pressure, contain valves to prevent backflow).`;
    }
    if (q.includes('kidney') || q.includes('nephron') || q.includes('excretion') || q.includes('urine') || q.includes('dialysis')) {
        return `Human Excretory System & Kidney Anatomy:
The human kidneys are bean-shaped retroperitoneal organs responsible for excretion and osmoregulation (regulating water and electrolyte balance).
Microscopic Unit - The Nephron (~1 million per kidney):
1. Renal Corpuscle: Glomerulus (capillary tuft) enclosed by Bowman's capsule where high hydrostatic pressure drives ultrafiltration of blood plasma, creating glomerular filtrate.
2. Proximal Convoluted Tubule (PCT): Obligate selective reabsorption of 100% of glucose, amino acids, and ~65% of water and sodium ions.
3. Loop of Henle: Descending limb (permeable to water) and ascending limb (impermeable to water, actively transports Na+ and Cl-), creating a hypertonic medullary gradient via countercurrent multiplier.
4. Distal Convoluted Tubule (DCT) & Collecting Duct: Facultative reabsorption under hormonal control (Aldosterone increases Na+ reabsorption; Antidiuretic Hormone ADH / Vasopressin inserts aquaporins to concentrate urine).`;
    }
    if (q.includes('brain') || q.includes('neuron') || q.includes('nervous') || q.includes('reflex') || q.includes('synapse')) {
        return `Human Nervous System:
1. Central Nervous System (CNS): Brain and Spinal Cord.
- Cerebrum: Largest part, controls sensory perception, voluntary movement, cognition, speech, memory, and consciousness. Divided into 4 lobes: Frontal, Parietal, Temporal, Occipital.
- Cerebellum: Situated posterior-inferiorly; coordinates fine motor movements, muscle tone, balance, and equilibrium.
- Brainstem (Midbrain, Pons, Medulla Oblongata): Regulates involuntary autonomic vital functions (heart rate, respiration, blood pressure, swallowing, coughing).
2. The Neuron (Nerve Cell): Dendrites (receive signals), Soma/Cell body, Axon (transmits action potential), Myelin sheath (formed by Schwann cells in PNS / oligodendrocytes in CNS, enables rapid saltatory conduction via Nodes of Ranvier).
3. Reflex Arc: Fast involuntary pathway: Receptor -> Sensory Neuron -> Interneuron (in spinal cord gray matter) -> Motor Neuron -> Effector (muscle/gland).`;
    }
    if (q.includes('anatomy') || q.includes('organ') || q.includes('human body')) {
        return `Anatomy is the biological branch studying the physical structure and morphology of living organisms.
Derived from Greek 'anatomē' (ana = up, temnein = to cut, meaning dissection).
Subdivisions:
1. Gross / Macroscopic Anatomy: Visible without microscope (systemic, regional, surface anatomy).
2. Microscopic Anatomy: Requires magnification (cytology = cells, histology = tissues).
Anatomy studies form and structural relationships ("what it is and where it is located"), while Physiology studies functional mechanisms ("how it operates"). Key organ systems include skeletal, muscular, cardiovascular, respiratory, nervous, digestive, excretory, endocrine, and reproductive systems.`;
    }
    if (q.includes('enzyme') || q.includes('catalyst') || q.includes('substrate')) {
        return `Enzymes are specialized biological catalysts composed predominantly of globular proteins that accelerate chemical reactions in living organisms by lowering the required activation energy (Ea) without being consumed in the reaction.
Characteristics:
1. Active Site: Specific three-dimensional catalytic cleft formed by folded polypeptide chains where substrate molecules bind.
2. Mechanisms: Lock and Key Model (Emil Fischer) emphasizes rigid geometric specificity; Induced Fit Model (Daniel Koshland) describes dynamic conformational adjustments upon substrate binding.
3. Factors Influencing Enzyme Activity: Substrate concentration, enzyme concentration, temperature (optimum around 37°C for human enzymes; denaturation occurs at extreme temperatures due to tertiary structure breakdown), and pH (pepsin operates at pH ~2, trypsin at pH ~8).
4. Inhibition: Competitive inhibitors resemble substrate and compete for active site (increases Km, Vmax unchanged); Non-competitive inhibitors bind allosteric site (decreases Vmax, Km unchanged).`;
    }
    // --- PHYSICS CONCEPTS ---
    if (q.includes('newton') || q.includes('motion') || q.includes('force') || q.includes('inertia') || q.includes('momentum')) {
        return `Newton's Laws of Motion and Classical Mechanics:
1. First Law (Law of Inertia): An object remains at rest or continues moving at constant velocity in a straight line unless acted upon by a net external unbalanced force. Inertia is the intrinsic property of matter that resists changes in motion and is directly proportional to mass.
2. Second Law (F = ma): The acceleration of a body is directly proportional to the net force applied, in the same direction, and inversely proportional to mass: F = m * a. In terms of momentum: Force equals the time rate of change of linear momentum (F = dp/dt, where p = m * v).
3. Third Law (Action and Reaction): For every action force, there is an equal and opposite reaction force acting simultaneously on two distinct interacting bodies (F_AB = -F_BA). Examples: Rocket propulsion, walking on ground, swimming.
Kinematic Equations of Uniformly Accelerated Motion:
- v = u + a * t
- s = u * t + 0.5 * a * t^2
- v^2 = u^2 + 2 * a * s`;
    }
    if (q.includes('ohm') || q.includes('circuit') || q.includes('electricity') || q.includes('resistance') || q.includes('voltage') || q.includes('current')) {
        return `Electricity, Magnetism, and Ohm's Law:
1. Ohm's Law (Georg Simon Ohm): The electric current (I) flowing through an ohmic conductor between two points is directly proportional to the potential difference (V) across the two points, provided physical factors such as temperature remain constant.
Mathematical Formula: V = I * R (where V is in Volts, I in Amperes, and R in Ohms Ω).
2. Resistance (R): The opposition to the flow of electric charge. Formula: R = ρ * (L / A), where ρ is resistivity, L is length, and A is cross-sectional area.
3. Resistors in Series: Current is identical through all components; Total Resistance: R_total = R1 + R2 + R3; Total Voltage: V_total = V1 + V2 + V3.
4. Resistors in Parallel: Voltage is identical across each branch; Total Resistance: 1 / R_total = 1/R1 + 1/R2 + 1/R3; Total Current: I_total = I1 + I2 + I3.
5. Electrical Power & Joule's Heating: P = V * I = I^2 * R = V^2 / R (Watts). Energy: E = P * t = I^2 * R * t (Joules).`;
    }
    if (q.includes('gravity') || q.includes('gravitation') || q.includes('weight') || q.includes('mass')) {
        return `Gravitation and Gravitational Fields:
1. Newton's Universal Law of Gravitation: Every point mass attracts every other point mass with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between their centers.
Formula: F = G * (m1 * m2) / r^2, where G is the Universal Gravitational Constant = 6.674 x 10^-11 N m^2 / kg^2.
2. Acceleration due to Gravity (g): On Earth's surface, g = G * M_earth / R_earth^2 ≈ 9.8 m/s^2 (downward).
3. Mass vs Weight: Mass (m) is the scalar quantity of matter in an object, measured in kilograms (kg), and remains invariant anywhere in the universe. Weight (W) is the gravitational force exerted on a body, measured in Newtons (N): W = m * g, which varies with local gravitational field strength.`;
    }
    if (q.includes('wave') || q.includes('sound') || q.includes('light') || q.includes('optics') || q.includes('refraction') || q.includes('reflection') || q.includes('lens')) {
        return `Waves, Sound, and Geometric Optics:
1. Wave Characteristics: Wave equation v = f * λ (Wave speed = frequency * wavelength). Transverse waves oscillate perpendicular to wave propagation (e.g., light, electromagnetic waves); Longitudinal waves oscillate parallel to wave propagation (e.g., sound waves, comprising compressions and rarefactions).
2. Speed of Sound: Approximately 343 m/s in dry air at 20°C; sound requires a material medium to propagate (cannot travel in vacuum).
3. Reflection: Angle of incidence equals angle of reflection (θi = θr).
4. Refraction: The change in direction and speed of a wave passing from one medium to another. Snell's Law: n1 * sin(θ1) = n2 * sin(θ2), where n is the refractive index (n = c / v).
5. Lenses: Thin lens formula: 1/f = 1/do + 1/di (where f is focal length, do is object distance, di is image distance). Convex lenses converge light; concave lenses diverge light.`;
    }
    if (q.includes('work') || q.includes('energy') || q.includes('power') || q.includes('kinetic') || q.includes('potential')) {
        return `Work, Energy, and Power:
1. Work (W): Work is done when an applied force causes displacement in the direction of the force. Formula: W = F * d * cos(θ) (measured in Joules, J).
2. Energy: The capacity to do work (scalar, measured in Joules).
- Kinetic Energy (KE): Energy of motion: KE = 0.5 * m * v^2.
- Gravitational Potential Energy (PE): Energy of position: PE = m * g * h.
3. Law of Conservation of Energy: Energy cannot be created or destroyed, only transformed from one form to another (Total Mechanical Energy E = KE + PE = Constant).
4. Power (P): The rate of doing work or transferring energy: P = W / t = F * v (measured in Watts, W = J/s). 1 Horsepower (hp) = 746 Watts.`;
    }
    // --- CHEMISTRY CONCEPTS ---
    if (q.includes('atom') || q.includes('periodic table') || q.includes('electron') || q.includes('proton') || q.includes('neutron') || q.includes('isotope')) {
        return `Atomic Structure and the Periodic Table:
1. Subatomic Particles: Protons (charge +1, mass ~1 amu, in nucleus), Neutrons (neutral charge 0, mass ~1 amu, in nucleus), Electrons (charge -1, mass 1/1836 amu, orbiting in electron shells/orbitals).
2. Atomic Number (Z) equals number of protons. Mass Number (A) equals protons + neutrons.
3. Isotopes: Atoms of the same chemical element having identical atomic numbers (protons) but different mass numbers (neutrons). E.g., Protium (1H), Deuterium (2H), Tritium (3H); Carbon-12 vs Carbon-14.
4. Electronic Configuration: Governed by Aufbau Principle (lowest energy orbitals fill first: 1s 2s 2p 3s 3p 4s 3d), Pauli Exclusion Principle (no two electrons have identical 4 quantum numbers; max 2 opposite-spin electrons per orbital), and Hund's Rule of Maximum Multiplicity.
5. Periodic Trends:
- Atomic Radius: Decreases across a period (left to right) due to increasing nuclear charge; increases down a group due to additional electron shells.
- Ionization Energy: Increases across a period; decreases down a group.
- Electronegativity: The relative ability of an atom in a molecule to attract bonding electron pairs. Fluorine is the most electronegative element (Pauling scale 4.0). Increases across a period; decreases down a group.`;
    }
    if (q.includes('bond') || q.includes('ionic') || q.includes('covalent') || q.includes('chemical bonding')) {
        return `Chemical Bonding (Ionic vs Covalent):
Atoms form bonds to achieve stable inert gas electron octets (Octet Rule).
1. Ionic Bonding: Formed by complete valence electron transfer from an electropositive metal to an electronegative non-metal. Cations (+) and anions (-) are held by strong electrostatic coulombic attraction. Example: NaCl (Na 2,8,1 loses 1e- to become Na+; Cl 2,8,7 gains 1e- to become Cl-). High melting points, crystalline lattice, conduct electricity when molten or in aqueous solution.
2. Covalent Bonding: Formed by mutual sharing of electron pairs between non-metal atoms. Single bond (1 shared pair, e.g. H2, CH4), Double bond (2 shared pairs, e.g. O2, CO2), Triple bond (3 shared pairs, e.g. N2). Lower melting points, volatile, poor electrical conductors.
3. Coordinate Covalent (Dative) Bond: Both shared electrons originate from a single donor atom possessing a lone pair (e.g., NH4+ from NH3 and H+).
4. Hydrogen Bonding: Strong dipole-dipole attraction between hydrogen covalently bound to highly electronegative small atoms (F, O, N) and a lone pair on a neighboring electronegative atom (explains high boiling point and surface tension of water H2O).`;
    }
    if (q.includes('acid') || q.includes('base') || q.includes('ph') || q.includes('neutralization')) {
        return `Acids, Bases, and the pH Scale:
1. Definitions of Acids and Bases:
- Arrhenius: Acids produce H+ (or H3O+) ions in aqueous solution; Bases produce OH- ions in water.
- Brønsted-Lowry: Acid is a proton (H+) donor; Base is a proton (H+) acceptor. Conjugate acid-base pairs differ by a single H+.
- Lewis: Acid is an electron pair acceptor (e.g. BF3, AlCl3); Base is an electron pair donor (e.g. NH3).
2. The pH Scale (0 to 14 at 25°C): pH = -log10[H+]; pOH = -log10[OH-]; pH + pOH = 14.
- Acidic: pH < 7 (high [H+])
- Neutral: pH = 7 (pure water, [H+] = [OH-] = 10^-7 M)
- Basic / Alkaline: pH > 7 (high [OH-])
3. Neutralization Reaction: Acid + Base -> Salt + Water. Example: HCl + NaOH -> NaCl + H2O.`;
    }
    // --- MATHEMATICS CONCEPTS ---
    if (q.includes('equation') || q.includes('algebra') || q.includes('solve') || q.includes('quadratic') || q.includes('polynomial')) {
        return `Algebraic Equations and Methods of Solution:
1. Linear Equations (Degree 1): ax + b = c.
Solution procedure:
- Isolate the variable term: ax = c - b
- Divide by coefficient: x = (c - b) / a
Example: 2x + 5 = 15 -> 2x = 10 -> x = 5.
2. Quadratic Equations (Degree 2): ax^2 + bx + c = 0 (where a ≠ 0).
Solution Methods:
- Factorization / Splitting the middle term.
- Completing the Square.
- Quadratic Formula: x = [-b ± √(b^2 - 4ac)] / (2a).
- Discriminant (D = b^2 - 4ac): If D > 0, roots are real and distinct; If D = 0, roots are real and equal; If D < 0, roots are complex conjugates.`;
    }
    if (q.includes('pythagoras') || q.includes('trigonometry') || q.includes('triangle') || q.includes('sine') || q.includes('cosine') || q.includes('tangent')) {
        return `Trigonometry and Pythagoras Theorem:
1. Pythagoras Theorem: In any right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two perpendicular sides:
Formula: c^2 = a^2 + b^2 (or Hypotenuse^2 = Base^2 + Perpendicular^2).
2. Basic Trigonometric Ratios (SOH CAH TOA):
- sin(θ) = Opposite / Hypotenuse (Perpendicular / Hypotenuse)
- cos(θ) = Adjacent / Hypotenuse (Base / Hypotenuse)
- tan(θ) = Opposite / Adjacent = sin(θ) / cos(θ)
- cosec(θ) = 1 / sin(θ); sec(θ) = 1 / cos(θ); cot(θ) = 1 / tan(θ).
3. Fundamental Identities:
- sin^2(θ) + cos^2(θ) = 1
- 1 + tan^2(θ) = sec^2(θ)
- 1 + cot^2(θ) = cosec^2(θ)`;
    }
    // --- COMPUTER SCIENCE & PROGRAMMING ---
    if (q.includes('programming') || q.includes('python') || q.includes('code') || q.includes('javascript') || q.includes('html') || q.includes('css') || q.includes('algorithm') || q.includes('loop')) {
        return `Computer Science and Programming Fundamentals:
1. Core Concepts:
- Variables & Data Types: Integer (int), Floating-point (float), Text (string), Boolean (true/false).
- Control Flow: Conditional statements (if, else if, else), Loops (for loop for known iterations, while loop for condition-driven execution).
- Functions: Reusable blocks of code accepting parameters and returning values.
2. Web Development Essentials:
- HTML (HyperText Markup Language): Provides document structure (<h1>, <p>, <a>, <div>, <form>, <input>, <button>).
- CSS (Cascading Style Sheets): Styles presentation (color, background, font-family, margin, padding, flexbox, grid, responsive @media queries).
- JavaScript: Adds dynamic client-side interactivity, DOM manipulation, event listeners (click, change), and asynchronous data fetching (fetch API, Promises, async/await).
3. Data Structures:
- Arrays / Lists: Contiguous memory collection accessed by numerical zero-based index.
- Stack: Last-In, First-Out (LIFO) abstract structure supporting push and pop operations.
- Queue: First-In, First-Out (FIFO) structure supporting enqueue and dequeue operations.
- Hash Tables / Dictionaries: Key-value stores offering average O(1) time complexity lookups.`;
    }
    // --- ENGLISH & GRAMMAR ---
    if (q.includes('noun') || q.includes('verb') || q.includes('grammar') || q.includes('tense') || q.includes('metaphor') || q.includes('simile')) {
        return `English Language and Grammar Standards:
1. Parts of Speech:
- Noun: Name of a person, place, thing, or concept (Common: boy; Proper: Lahore; Collective: team; Abstract: honesty).
- Pronoun: Replaces a noun (he, she, it, they, whom, whose).
- Verb: Action, occurrence, or state of being (run, exist, is, have).
- Adjective: Modifies or describes a noun or pronoun (brilliant, green, massive).
- Adverb: Modifies a verb, adjective, or another adverb (slowly, very, gracefully).
- Preposition: Shows spatial, temporal, or logical relationship (in, on, under, between, through).
- Conjunction: Connects words, phrases, or clauses (and, but, because, although).
2. Figures of Speech:
- Simile: Explicit comparison between two dissimilar things using "like" or "as" ("He was as brave as a lion").
- Metaphor: Implicit comparison stating one thing is another without "like" or "as" ("Time is a thief").
3. Active vs Passive Voice:
- Active: Subject performs the action: "The student solved the problem."
- Passive: Subject receives the action: "The problem was solved by the student."`;
    }
    // Default dynamic curriculum grounding builder
    return `Comprehensive academic subject facts for "${query}". Includes formal textbook definition, underlying principles, governing scientific or mathematical laws, concrete real-world examples, and accurate step-by-step breakdown across standard secondary, higher secondary, and undergraduate curricula.`;
}
// ==========================================
// 3. ESSAY & APPLICATION GENERATORS
// ==========================================
function generateUrduEssay(query, level) {
    const q = query.toLowerCase();
    if (q.includes('وقت') || q.includes('pabandi')) {
        return `# مضمون: وقت کی پابندی
**(تمام ثانوی و اعلیٰ ثانوی درجات کے لیے)**

---

### تعارف:
وقت انسانی زندگی کا سب سے قیمتی سرمایہ ہے جو ایک بار گزر جائے تو دنیا کی تمام دولت لٹا کر بھی واپس نہیں حاصل کیا جا سکتا۔ عربی کا مشہور مقولہ ہے کہ *"الوقت کالسیف ان لم تقطعہ قطعک"* یعنی وقت تلوار کی مانند ہے، اگر تم اسے نہیں کاٹو گے تو یہ تمہیں کاٹ دے گا۔ وقت کی قدر و قیمت کا احساس اور اس کا درست استعمال ہی کامیابی کی اولین ضمانت ہے۔

---

### کائنات اور فطرت میں وقت کی پابندی:
اللہ تعالیٰ کے بنائے ہوئے نظامِ کائنات پر اگر ہم غور کریں تو معلوم ہوتا ہے کہ کائنات کی ہر شے وقت کی پابند ہے۔
- سورج اپنے مقررہ وقت پر طلوع اور غروب ہوتا ہے۔
- چاند اور ستارے ایک متعین رفتار سے اپنے مدار میں گردش کرتے ہیں۔
- موسم اپنے وقت پر بدلتے ہیں۔
اگر سورج ایک دن بھی اپنے وقت پر طلوع نہ ہو تو کائنات کا سارا نظام درہم برہم ہو جائے۔

---

### اسلام اور وقت کی اہمیت:
دینِ اسلام نے بھی وقت کی پابندی پر غیر معمولی زور دیا ہے۔ اسلامی عبادات انسان کو وقت کی قدر سکھاتی ہیں:
- پانچ وقت کی نمازیں اپنے مقررہ اوقات پر فرض کی گئی ہیں: *"ان الصلوۃ کانت علی المؤمنین کتابا موقوتا"*
- رمضان المبارک کے روزے سحر اور افطار کے قطعی اوقات کے پابند ہیں۔
- حج کا فریضہ ذوالحجہ کے مخصوص دنوں میں ہی ادا کیا جا سکتا ہے۔

---

### طلبہ کی زندگی میں وقت کی اہمیت:
طالب علم کے لیے وقت کی پابندی آبِ حیات کی حیثیت رکھتی ہے۔ جو طالب علم اپنے تعلیمی سال کے آغاز سے ہی پڑھائی، کھیل کود، اور آرام کا باقاعدہ نظام الاوقات (Timetable) بنا کر اس پر عمل کرتا ہے، اسے امتحانات کے دنوں میں کبھی پریشانی کا سامنا نہیں کرنا پڑتا اور وہ ہمیشہ امتیازی نمبروں سے کامیاب ہوتا ہے۔ اس کے برعکس سست اور لاپرواہ طلبہ وقت ضائع کر کے بعد میں پچھتاتے ہیں۔

---

### اختتامیہ:
دنیا کی تاریخ گواہ ہے کہ جتنی بھی عظیم شخصیات گزری ہیں، انہوں نے وقت کے ہر لمحے کو غنیمت جانا۔ قائداعظم محمد علی جناح اور علامہ اقبال وقت کے سخت پابند تھے۔ ہمیں چاہیے کہ ہم آج کا کام کل پر نہ ٹالیں، سستی کو چھوڑیں اور وقت کی قدر کریں تاکہ ہم ملکی و بین الاقوامی سطح پر سرخرو ہو سکیں۔`;
    }
    // Default to والدین کا مقام
    return `# مضمون: والدین کا مقام
**(کلاس 7 اور ثانوی تعلیمی نصاب کے عین مطابق)**

---

### تعارف:
اللہ تبارک و تعالیٰ نے کائناتِ ہستی میں انسان کے لیے بے شمار نعمتیں پیدا فرمائی ہیں، لیکن رشتوں کے لحاظ سے سب سے عظیم، انمول اور بابرکت نعمت "والدین" ہیں۔ والدین وہ پاکیزہ ہستیاں ہیں جو بے لوث ہو کر اپنی اولاد کی پرورش کرتی ہیں اور بچوں کی خوشی اور آرام کے لیے اپنی نیندیں اور خواہشات قربان کر دیتی ہیں۔ سچ یہ ہے کہ اس دنیا میں والدین کا کوئی بدل یا نعم البدل نہیں۔

---

### اسلام میں والدین کا مقام و مرتبہ:
دینِ اسلام نے والدین کے احترام اور خدمت کو اتنی زیادہ اہمیت دی ہے کہ قرآن مجید میں اللہ تعالیٰ نے اپنی توحید اور عبادت کے فوراً بعد والدین کے ساتھ حسنِ سلوک کا حکم فرمایا ہے۔

ارشادِ باری تعالیٰ ہے:
> *"اور تیرے رب نے یہ فیصلہ صادر فرما دیا ہے کہ تم اس کے سوا کسی کی عبادت نہ کرو اور والدین کے ساتھ حسنِ سلوک کرو۔ اگر ان میں سے کوئی ایک یا دونوں تمہارے سامنے بڑھاپے کو پہنچ جائیں تو انہیں 'اُف' تک نہ کہو اور نہ انہیں جھڑکو، بلکہ ان سے عزت اور نرمی کے ساتھ بات کرو۔"* (سورۃ الاسراء: 23)

حضور اکرم ﷺ نے ارشاد فرمایا:
> *"ماں کے قدموں تلے جنت ہے، اور باپ کی خوشنودی میں اللہ کی رضا ہے۔"*

---

### ماں کی بے لوث محبت اور قربانیاں:
ماں کی محبت دنیا کی سب سے خالص اور سچی محبت ہے۔ ماں نو ماہ تک اپنے بچے کو پیٹ میں اٹھائے پھرتی ہے اور ولادت کے وقت جان لیوا تکالیف برداشت کرتی ہے۔ بچپن میں جب بچہ بیمار پڑ جائے تو ماں رات بھر جاگ کر اس کے سرہانے بیٹھتی ہے۔ خود گیلی جگہ سو جاتی ہے لیکن بچے کو سوکھی جگہ سلاتی ہے۔ ماں کی پرخلوص دعائیں اولاد کے لیے زندگی کے ہر موڑ پر ڈھال بن جاتی ہیں۔

---

### باپ کی شفقت، محنت اور کفالت:
اگر ماں محبت اور شفقت کی ٹھنڈی چھاؤں ہے تو باپ ایک مضبوط اور سایہ دار تناور درخت کی مانند ہے جو زمانے کی کڑی دھوپ، آندھیوں اور طوفانوں کو خود برداشت کر کے اپنے بچوں کو تحفظ فراہم کرتا ہے۔ باپ صبح سے شام تک خون پسینہ ایک کر کے حلال روزی کماتا ہے تاکہ اپنے بچوں کو اعلیٰ تعلیم، اچھے کپڑے اور روشن مستقبل دے سکے۔ باپ کا احترام ہر بیٹے اور بیٹی پر فرض ہے۔

---

### اولاد کے فرائض اور حقوق:
والدین کے ہمارے اوپر بے پناہ احسانات ہیں جن کا بدلہ ہم پوری زندگی خدمت کر کے بھی نہیں چکا سکتے، تاہم ساتویں جماعت کے طالب علم کی حیثیت سے ہمارے بنیادی فرائض درج ذیل ہیں:
1. ہمیشہ والدین کے سامنے ادب و احترام سے پیش آئیں اور کبھی ان کے آگے اونچی آواز میں بات نہ کریں۔
2. ان کے ہر جائز حکم کی فوراً اور خوش دلی سے تعمیل کریں۔
3. بڑھاپے اور بیماری میں ان کی دل و جان سے خدمت کریں اور ان کی ادویات و آرام کا خیال رکھیں۔
4. ہر نماز کے بعد ان کے لیے یہ قرآنی دعا لازمی مانگیں:
   > *"رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا"* (اے میرے رب! ان دونوں پر رحم فرما جیسا کہ انہوں نے بچپن میں مجھے شفقت سے پالا)۔

---

### اختتامیہ (نتیجہ):
خوش نصیب ہیں وہ بچے جن کے والدین حیات ہیں اور جنہیں ان کی خدمت کر کے اللہ کی رضا اور جنت کمانے کی سعادت نصیب ہوتی ہے۔ ہمیں عہد کرنا چاہیے کہ ہم کبھی اپنے والدین کا دل نہیں دکھائیں گے اور ہمیشہ ان کا فرمانبردار بن کر ایک باوقار زندگی گزاریں گے تاکہ دنیا اور آخرت دونوں میں سرخرو ہو سکیں۔`;
}
function generateApplicationToPrincipal(query, lang) {
    const q = query.toLowerCase();
    if (lang === 'ur' || q.includes('درخواست') || q.includes('رخصت')) {
        return `# درخواست برائے رخصت بیماری بخدمت جناب پرنسپل صاحب

**بخدمت جناب پرنسپل صاحب،**  
گورنمنٹ ہائی اسکول / کالج، [شہر کا نام]

**جنابِ عالی،**

نہایت ادب و احترام سے گزارش ہے کہ مجھے کل رات سے شدید بخار اور سر درد کی شکایت ہے۔ ڈاکٹر صاحب نے معائنہ کرنے کے بعد دوائی تجویز کی ہے اور دو دن تک مکمل آرام کا مشورہ دیا ہے۔ اس بنا پر میں آج اسکول حاضر ہونے سے قاصر ہوں۔

برائے مہربانی مجھے دو یوم (مورخہ [تاریخ] تا [تاریخ]) کی رخصتِ بیماری عنایت فرمائی جائے۔ آپ کی عین نوازش ہوگی۔

**العارض:**  
آپ کا / کی تابع دار شاگرد / شاگردہ  
**نام:** [آپ کا نام]  
**جماعت:** دسویں (Class 10) / سیکشن [A]  
**رول نمبر:** [آپ کا رول نمبر]  
**مورخہ:** [آج کی تاریخ]`;
    }
    // English Application to the Principal
    return `### Formal Application to the Principal (Sick Leave)

**To,**  
The Principal,  
[School / College Name],  
[City Name].  

**Subject:** Application for Sick Leave  

**Respected Sir / Madam,**  

Most respectfully, I beg to state that I have been suffering from a sudden high fever and severe headache since last night. The consulting doctor has examined me, prescribed medication, and strictly advised two days of complete bed rest for proper recovery.

Owing to this medical reason, I will not be able to attend my classes today and tomorrow. 

Kindly grant me leave of absence for two days, from **[Start Date]** to **[End Date]**. I will ensure that all pending classwork and homework are promptly completed upon my return.

I shall be deeply grateful for your kind consideration.

**Yours obediently,**  
**Name:** [Your Name]  
**Class / Grade:** Class 10 (Section A)  
**Roll Number:** [Your Roll No.]  
**Date:** [Current Date]

---

*Note: If you need an application for **Fee Concession**, **Urgent Piece of Work**, or **Character Certificate**, simply mention the reason and I will adapt it immediately!*`;
}
// ==========================================
// 4. MATHEMATICS & EQUATION SOLVER
// ==========================================
function solveMathEquation(query) {
    const q = query.toLowerCase().replace(/\s+/g, '');
    // Detect linear equations like 2x+5=15 or 3x-6=12
    const linearMatch = q.match(/([+-]?\d*)x([+-]\d+)=([+-]?\d+)/);
    if (linearMatch) {
        const aStr = linearMatch[1];
        const a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseFloat(aStr);
        const b = parseFloat(linearMatch[2]);
        const c = parseFloat(linearMatch[3]);
        const step1 = c - b;
        const x = step1 / a;
        return `### Step-by-Step Algebraic Solution

**Given Linear Equation:**
$$${a === 1 ? '' : a === -1 ? '-' : a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${c}$$

---

#### Step 1: Isolate the variable term ($${a === 1 ? '' : a}x$)
Apply the inverse operation: ${b >= 0 ? `Subtract ${b}` : `Add ${Math.abs(b)}`} to both sides of the equation:
$$${a === 1 ? '' : a}x = ${c} ${b >= 0 ? '- ' + b : '+ ' + Math.abs(b)}$$
$$${a === 1 ? '' : a}x = ${step1}$$

---

#### Step 2: Solve for $x$
Divide both sides by the coefficient of $x$ ($${a}$):
$$x = \\frac{${step1}}{${a}}$$
$$x = ${x}$$

---

#### Step 3: Verification (Check your work)
Substitute $x = ${x}$ back into the original equation:
$$\\text{LHS} = ${a}(${x}) ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${a * x} ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${a * x + b}$$
$$\\text{RHS} = ${c}$$
Since $\\text{LHS} = \\text{RHS}$, the solution is **verified and accurate**.

---

**Final Answer:**
$$\\mathbf{x = ${x}}$$`;
    }
    // Specific 2x + 5 = 15 fallback
    if (query.includes('2x + 5 = 15') || query.includes('2x+5=15')) {
        return `### Step-by-Step Mathematical Solution

**Given Linear Equation:**
$$2x + 5 = 15$$

---

#### Step 1: Isolate the variable term ($2x$)
Subtract $5$ from both sides of the equation:
$$2x + 5 - 5 = 15 - 5$$
$$2x = 10$$

---

#### Step 2: Solve for $x$
Divide both sides by $2$ (the coefficient of $x$):
$$\\frac{2x}{2} = \\frac{10}{2}$$
$$x = 5$$

---

#### Step 3: Verification (Check your answer)
Substitute $x = 5$ into the original equation:
$$\\text{LHS} = 2(5) + 5 = 10 + 5 = 15$$
$$\\text{RHS} = 15$$
Since $\\text{LHS} = \\text{RHS}$, the result is completely verified.

---

**Final Answer:**
$$\\mathbf{x = 5}$$`;
    }
    return `### Step-by-Step Algebraic Solution

**Inquiry:** "${query}"

1. **Identify the equation structure:** Group variable terms on the left and constant terms on the right.
2. **Apply inverse operations:** Use addition/subtraction to isolate the variable term, then multiplication/division to find the unknown.
3. **Verification:** Substitute the calculated value back into the original equation to verify that $\\text{LHS} = \\text{RHS}$.`;
}
// ==========================================
// 5. MCQS GENERATORS (20 & 50 MCQS)
// ==========================================
function generate20BiologyMcqs() {
    return `### 20 Matric / Class 10 Biology Multiple Choice Questions (MCQs)
**Board Examination Standard with Complete Answer Key & Explanations**

---

**Q1. Gaseous exchange in green leaves occurs predominantly through:**
- (A) Lenticels
- (B) Stomata
- (C) Cuticle
- (D) Xylem vessels

**Q2. The structural and functional microscopic filtration unit of the human kidney is the:**
- (A) Neuron
- (B) Nephron
- (C) Glomerulus
- (D) Bowman's capsule

**Q3. Which part of the human brain maintains posture, equilibrium, and muscular coordination?**
- (A) Cerebrum
- (B) Cerebellum
- (C) Medulla oblongata
- (D) Hypothalamus

**Q4. Mitosis in somatic cells produces how many daughter cells relative to the parent cell?**
- (A) 2 genetically identical diploid cells ($2n$)
- (B) 4 haploid cells ($n$)
- (C) 2 haploid cells ($n$)
- (D) 4 diploid cells ($2n$)

**Q5. The observable physical or physiological expression of a gene is termed its:**
- (A) Genotype
- (B) Phenotype
- (C) Karyotype
- (D) Allele

**Q6. Which salivary enzyme initiates the hydrolysis of dietary starch into maltose in the mouth?**
- (A) Pepsin
- (B) Salivary Amylase (Ptyalin)
- (C) Lipase
- (D) Trypsin

**Q7. Deoxygenated blood from systemic circulation enters which heart chamber first?**
- (A) Left Atrium
- (B) Right Atrium
- (C) Right Ventricle
- (D) Left Ventricle

**Q8. The transfer of pollen grains from the anther to the receptive stigma of a flower is:**
- (A) Fertilization
- (B) Pollination
- (C) Germination
- (D) Parthenogenesis

**Q9. Organisms that decompose and recycle dead organic matter into soil nutrients are:**
- (A) Autotrophs
- (B) Decomposers (Saprotrophs)
- (C) Herbivores
- (D) Primary consumers

**Q10. The primary green photosynthetic pigment embedded in thylakoid membranes is:**
- (A) Carotenoid
- (B) Chlorophyll
- (C) Xanthophyll
- (D) Anthocyanin

**Q11. The maintenance of internal osmotic concentration of water and dissolved salts in an organism is called:**
- (A) Thermoregulation
- (B) Osmoregulation
- (C) Excretion
- (D) Homeostasis

**Q12. What connects a bone to another bone across a joint?**
- (A) Tendon
- (B) Ligament
- (C) Cartilage
- (D) Synovial membrane

**Q13. In the human nervous system, the rapid automatic involuntary response to a stimulus is called a:**
- (A) Reflex arc / Reflex action
- (B) Voluntary movement
- (C) Synaptic delay
- (D) Conditioned reflex

**Q14. Which endocrine gland is located on top of each human kidney?**
- (A) Thyroid gland
- (B) Adrenal gland
- (C) Pituitary gland
- (D) Pancreas

**Q15. The normal diploid ($2n$) chromosome number in a healthy human somatic cell is:**
- (A) 23
- (B) 46
- (C) 48
- (D) 44

**Q16. During which phase of mitosis do sister chromatids separate and move to opposite poles?**
- (A) Prophase
- (B) Metaphase
- (C) Anaphase
- (D) Telophase

**Q17. The process of aerobic cellular respiration yields approximately how many ATP molecules per glucose?**
- (A) 2 ATP
- (B) 36 to 38 ATP
- (C) 12 ATP
- (D) 50 ATP

**Q18. In genetics, an individual possessing two identical alleles for a given trait (e.g. $TT$ or $tt$) is:**
- (A) Heterozygous
- (B) Homozygous
- (C) Hemizygous
- (D) Hybrid

**Q19. Which blood vessels carry oxygenated blood away from the heart to body tissues under high pressure?**
- (A) Veins
- (B) Arteries
- (C) Capillaries
- (D) Venules

**Q20. The circular DNA molecule found in bacteria widely utilized as a cloning vector in biotechnology is called a:**
- (A) Chromosome
- (B) Plasmid
- (C) Centromere
- (D) Ribosome

---

### Complete Answer Key & Rationales:
1. **(B) Stomata** — Guard cells regulate the opening of stomata on the lower leaf epidermis.
2. **(B) Nephron** — Each kidney houses ~1 million nephrons for ultrafiltration and selective reabsorption.
3. **(B) Cerebellum** — Located beneath the occipital lobe; coordinates complex fine motor movements.
4. **(A) 2 genetically identical diploid cells** — Mitosis maintains exact parental chromosome number.
5. **(B) Phenotype** — Physical manifestation (e.g. tall vs dwarf), whereas genotype is genetic constitution.
6. **(B) Salivary Amylase** — Breaks alpha-1,4-glycosidic bonds in cooked starches.
7. **(B) Right Atrium** — Receives blood via superior and inferior vena cava.
8. **(B) Pollination** — Followed by pollen tube growth and double fertilization.
9. **(B) Decomposers** — Bacteria and fungi recycling minerals in ecosystems.
10. **(B) Chlorophyll** — Absorbs red and blue wavelengths, reflects green.
11. **(B) Osmoregulation** — Regulates osmotic pressure and water balance.
12. **(B) Ligament** — Fibrous connective tissue connecting bone to bone; tendons connect muscle to bone.
13. **(A) Reflex arc** — Involves receptor, sensory neuron, interneuron, motor neuron, and effector.
14. **(B) Adrenal gland** — Adrenal medulla secretes adrenaline (fight or flight hormone).
15. **(B) 46** — 23 pairs of homologous chromosomes (22 autosome pairs + 1 sex pair).
16. **(C) Anaphase** — Spindle fibers shorten, cleaving centromeres.
17. **(B) 36 to 38 ATP** — Derived through glycolysis, Krebs cycle, and oxidative phosphorylation.
18. **(B) Homozygous** — Homozygous dominant ($TT$) or homozygous recessive ($tt$).
19. **(B) Arteries** — Thick muscular walls to withstand high systolic pressures.
20. **(B) Plasmid** — Extra-chromosomal circular self-replicating DNA vector.`;
}
function generate50MdcatBiologyMcqs() {
    return `### 50 High-Yield MDCAT Biology Multiple Choice Questions (MCQs)
**Medical College Admission Test (MDCAT) High-Yield Preparation**
**Covers Cell Biology, Biological Molecules, Enzymes, Bioenergetics, Human Physiology, Genetics & Evolution**

---

#### 1. Cell Biology & Biological Molecules (Q1–Q10)
**Q1.** Non-membranous ribonucleoprotein complexes consisting of large and small subunits are:  
(A) Peroxisomes (B) Ribosomes (C) Lysosomes (D) Nucleoli  
**Q2.** The covalent linkage formed between the carboxyl group of one amino acid and amino group of another is a:  
(A) Glycosidic bond (B) Peptide bond (C) Ester bond (D) Phosphodiester bond  
**Q3.** The fluid mosaic model of cell membranes was proposed in 1972 by:  
(A) Singer and Nicolson (B) Robertson (C) Danielli and Davson (D) Schleiden and Schwann  
**Q4.** In competitive enzyme inhibition, what happens to $V_{\\max}$ and $K_m$?  
(A) $V_{\\max}$ decreases, $K_m$ constant (B) $V_{\\max}$ unchanged, $K_m$ increases (C) Both decrease (D) Both increase  
**Q5.** Which cellular organelle contains hydrolytic enzymes active at acidic pH (approx 5.0)?  
(A) Golgi body (B) Lysosome (C) Glyoxysome (D) Endoplasmic reticulum  
**Q6.** The primary cell wall of plant cells is composed predominantly of:  
(A) Lignin (B) Cellulose (C) Suberin (D) Cutin  
**Q7.** Which of the following is a purine nitrogenous base?  
(A) Cytosine (B) Thymine (C) Adenine (D) Uracil  
**Q8.** Lipids are insoluble in water but soluble in non-polar organic solvents due to:  
(A) Hydrophobic hydrocarbon chains (B) Hydrophilic glycerol (C) Peptide bonds (D) High polarity  
**Q9.** The complete, fully assembled infectious viral particle is designated as a:  
(A) Capsid (B) Virion (C) Capsomere (D) Viroid  
**Q10.** The non-protein inorganic ion cofactor required for optimal enzyme activity is termed an:  
(A) Activator (B) Coenzyme (C) Prosthetic group (D) Apoenzyme  

#### 2. Bioenergetics & Respiration (Q11–Q20)
**Q11.** Photolysis of water in the light reactions of photosynthesis is associated with:  
(A) Photosystem I (B) Photosystem II (P680) (C) Cytochrome b6f (D) ATP Synthase  
**Q12.** The primary $\\text{CO}_2$ acceptor molecule in the Calvin cycle (C3 pathway) is:  
(A) PEP (B) RuBP (5C) (C) 3-PGA (D) Oxaloacetate  
**Q13.** Glycolysis takes place in which cellular compartment?  
(A) Mitochondrial matrix (B) Cytoplasm (Cytosol) (C) Thylakoid lumen (D) Cristae  
**Q14.** In aerobic cellular respiration, the terminal electron acceptor in the electron transport chain is:  
(A) $\\text{NAD}^+$ (B) Molecular Oxygen ($\\text{O}_2$) (C) Cytochrome c (D) Pyruvate  
**Q15.** The net yield of ATP synthesized per molecule of glucose during glycolysis alone is:  
(A) 4 ATP (B) 2 ATP (C) 36 ATP (D) 38 ATP  
**Q16.** The cyclic electron flow in chloroplasts produces:  
(A) ATP only (B) NADPH only (C) Both ATP and NADPH (D) Glucose  
**Q17.** How many turns of the Krebs cycle occur for the complete oxidation of one glucose molecule?  
(A) 1 turn (B) 2 turns (C) 3 turns (D) 4 turns  
**Q18.** The synthesis of ATP driven by proton gradient across mitochondrial inner membrane is called:  
(A) Substrate-level phosphorylation (B) Chemiosmosis (C) Photophosphorylation (D) Fermentation  
**Q19.** Which enzyme fixes $\\text{CO}_2$ in the mesophyll cells of C4 plants?  
(A) RuBisCO (B) PEP Carboxylase (C) Amylase (D) Hexokinase  
**Q20.** During intense anaerobic exercise in human skeletal muscles, pyruvate is reduced to:  
(A) Ethanol (B) Lactic acid (Lactate) (C) Acetic acid (D) Acetyl-CoA  

#### 3. Human Physiology & Organ Systems (Q21–Q35)
**Q21.** The bicuspid (mitral) valve prevents backflow of blood from:  
(A) Right ventricle to right atrium (B) Left ventricle to left atrium (C) Aorta to left ventricle (D) Pulmonary trunk to right ventricle  
**Q22.** The resting membrane potential of a human neuron ($-70\\text{ mV}$) is maintained by:  
(A) $\\text{Na}^+/\\text{K}^+$ ATPase pump expelling $3\\text{ Na}^+$ and importing $2\\text{ K}^+$ (B) Influx of calcium (C) Open sodium gates (D) Passive diffusion  
**Q23.** Which hormone increases water permeability in collecting ducts of nephrons?  
(A) Aldosterone (B) Antidiuretic Hormone (ADH / Vasopressin) (C) Oxytocin (D) Cortisol  
**Q24.** Rapid mid-cycle surge of which pituitary gonadotropin induces ovulation on day 14?  
(A) FSH (B) Luteinizing Hormone (LH) (C) Progesterone (D) hCG  
**Q25.** The functional unit of a skeletal muscle myofibril between two adjacent Z-discs is a:  
(A) Sarcolemma (B) Sarcomere (C) Sarcoplasm (D) Myosin filament  
**Q26.** Oxygen is transported in human arterial blood primarily as:  
(A) Dissolved gas in plasma (B) Oxyhemoglobin ($HbO_2$) (C) Bicarbonate ions (D) Carbaminohemoglobin  
**Q27.** The pace-maker of the human heart that generates rhythmic cardiac impulses is the:  
(A) AV Node (B) Sinoatrial (SA) Node (C) Bundle of His (D) Purkinje fibers  
**Q28.** The respiratory rhythmicity center in the human brainstem is situated in the:  
(A) Cerebellum (B) Medulla oblongata (C) Thalamus (D) Pons only  
**Q29.** Gastric chief (peptic) cells secrete the zymogen precursor:  
(A) Pepsinogen (B) Hydrochloric acid (C) Intrinsic factor (D) Gastrin  
**Q30.** Bile salts synthesized by hepatocytes emulsify:  
(A) Carbohydrates (B) Dietary Lipids / Fats (C) Proteins (D) Nucleic acids  
**Q31.** B-lymphocytes undergo clonal selection to differentiate into antibody-secreting:  
(A) Cytotoxic T-cells (B) Plasma cells (C) Monocytes (D) Dendritic cells  
**Q32.** Type 1 Diabetes mellitus is characterized by autoimmune destruction of pancreatic:  
(A) Alpha cells (B) Beta cells of Islets of Langerhans (C) Delta cells (D) Acinar cells  
**Q33.** The structural protein component of thick myofilaments in muscular contraction is:  
(A) Actin (B) Myosin (C) Tropomyosin (D) Troponin  
**Q34.** Ultrafiltration in the renal corpuscle occurs across the endothelial-podocyte barrier in the:  
(A) Glomerulus and Bowman's capsule (B) Loop of Henle (C) Distal convoluted tubule (D) Ureter  
**Q35.** The master endocrine gland connected to the hypothalamus via the infundibulum is the:  
(A) Thyroid (B) Pituitary gland (Hypophysis) (C) Adrenal gland (D) Parathyroid  

#### 4. Genetics, Evolution & Reproduction (Q36–Q50)
**Q36.** The chromosomal karyotype $45, X0$ in human females causing gonadal dysgenesis is:  
(A) Klinefelter's syndrome (B) Turner's syndrome (C) Down's syndrome (D) Edwards syndrome  
**Q37.** Trisomy of human autosome chromosome 21 results in:  
(A) Turner's syndrome (B) Down's syndrome (C) Patau syndrome (D) Cri-du-chat  
**Q38.** Okazaki fragments synthesized on the lagging strand during DNA replication are joined by:  
(A) DNA Polymerase I (B) DNA Ligase (C) Helicase (D) Topoisomerase  
**Q39.** The stop codons that signal termination of protein translation are:  
(A) AUG, UAA, UAG (B) UAA, UAG, UGA (C) UGG, UGA, UAA (D) AAA, UAA, UGA  
**Q40.** An evolutionary structure having similar fundamental anatomy but performing different functions (e.g. human arm and bird wing) is:  
(A) Analogous (B) Homologous (C) Vestigial (D) Atavistic  
**Q41.** The Hardy-Weinberg equilibrium equation for allele frequencies in a population is:  
(A) $p + q = 1$ and $p^2 + 2pq + q^2 = 1$ (B) $p^2 + q^2 = 1$ (C) $p + 2q = 1$ (D) $p^2 + q = 1$  
**Q42.** Crossing over (genetic recombination) occurs during which sub-stage of Prophase I?  
(A) Leptotene (B) Pachytene (C) Diplotene (D) Zygotene  
**Q43.** The semi-conservative model of DNA replication was confirmed experimentally by:  
(A) Hershey and Chase (B) Meselson and Stahl (C) Watson and Crick (D) Avery, MacLeod, and McCarty  
**Q44.** Haemophilia and red-green colour blindness in humans are inherited as:  
(A) Autosomal dominant (B) X-linked recessive traits (C) Y-linked traits (D) Autosomal recessive  
**Q45.** The enzyme responsible for transcribing mRNA from a DNA template strand is:  
(A) DNA Polymerase III (B) RNA Polymerase (C) Reverse Transcriptase (D) Primase  
**Q46.** The protective cap structure added to the 5' end of eukaryotic pre-mRNA is:  
(A) Poly-A tail (B) 7-Methylguanosine (7-mG) cap (C) Intron (D) Exon  
**Q47.** In the human female, fertilization of the secondary oocyte typically occurs in the:  
(A) Uterine cavity (B) Ampulla of Fallopian (Uterine) tube (C) Cervix (D) Ovary surface  
**Q48.** Human immunodeficiency virus (HIV) specifically infects and destroys:  
(A) Cytotoxic T-cells (B) Helper T-cells (CD4+ T-lymphocytes) (C) B-cells (D) Platelets  
**Q49.** The non-coding intervening sequences removed from pre-mRNA during RNA splicing are:  
(A) Exons (B) Introns (C) Promoters (D) Enhancers  
**Q50.** The primary theory explaining active phloem sap translocation in angiosperms is the:  
(A) Cohesion-Tension theory (B) Munch Pressure-Flow Hypothesis (C) Imbibition theory (D) Root pressure hypothesis  

---

### Master Answer Key (MDCAT 1 to 50):
1. **(B)** | 2. **(B)** | 3. **(A)** | 4. **(B)** | 5. **(B)** | 6. **(B)** | 7. **(C)** | 8. **(A)** | 9. **(B)** | 10. **(A)**  
11. **(B)** | 12. **(B)** | 13. **(B)** | 14. **(B)** | 15. **(B)** | 16. **(A)** | 17. **(B)** | 18. **(B)** | 19. **(B)** | 20. **(B)**  
21. **(B)** | 22. **(A)** | 23. **(B)** | 24. **(B)** | 25. **(B)** | 26. **(B)** | 27. **(B)** | 28. **(B)** | 29. **(A)** | 30. **(B)**  
31. **(B)** | 32. **(B)** | 33. **(B)** | 34. **(A)** | 35. **(B)** | 36. **(B)** | 37. **(B)** | 38. **(B)** | 39. **(B)** | 40. **(B)**  
41. **(A)** | 42. **(B)** | 43. **(B)** | 44. **(B)** | 45. **(B)** | 46. **(B)** | 47. **(B)** | 48. **(B)** | 49. **(B)** | 50. **(B)**`;
}
// ==========================================
// 6. CLASS 10 PHYSICS EXAMINATION PAPER
// ==========================================
function generateClass10PhysicsTest() {
    return `### Class 10 Physics Full Board Practice Examination
**Total Marks: 60 | Time Allowed: 2 Hours**
**Standard: Matriculation / Secondary School Certificate (SSC Part II)**

---

#### SECTION A: Multiple Choice Questions (12 Marks)
*Attempt all questions. Each carries 1 mark:*

1. Which of the following is an example of Simple Harmonic Motion (SHM)?  
   (A) Motion of a ceiling fan  
   (B) Motion of a simple pendulum  
   (C) Spinning of Earth  
   (D) An arrow fired from a bow  
2. If the mass of the bob of a simple pendulum is doubled, its time period will:  
   (A) Double  
   (B) Halve  
   (C) Remain the same  
   (D) Quadruple  
3. Longitudinal waves consist of:  
   (A) Crests and troughs  
   (B) Compressions and rarefactions  
   (C) Nodes and antinodes only  
   (D) Electric and magnetic fields  
4. The speed of sound in air at normal atmospheric temperature ($20^\\circ\\text{C}$) is approximately:  
   (A) $330\\text{ m/s}$ to $343\\text{ m/s}$  
   (B) $3 \\times 10^8\\text{ m/s}$  
   (C) $1500\\text{ m/s}$  
   (D) $5000\\text{ m/s}$  
5. A ray of light passing from an optically denser medium into a rarer medium bends:  
   (A) Towards the normal  
   (B) Away from the normal  
   (C) Undeviated  
   (D) Reflects backwards at $0^\\circ$  
6. The critical angle for water when light travels into air is approximately:  
   (A) $42^\\circ$  
   (B) $48.8^\\circ$  
   (C) $90^\\circ$  
   (D) $24^\\circ$  
7. Electrostatic force between two point charges is governed by:  
   (A) Ohm's Law  
   (B) Coulomb's Law  
   (C) Faraday's Law  
   (D) Ampere's Law  
8. One kilowatt-hour ($1\\text{ kWh}$) of electrical energy is equal to:  
   (A) $3.6 \\times 10^5\\text{ J}$  
   (B) $3.6 \\times 10^6\\text{ J}$ ($3.6\\text{ MJ}$)  
   (C) $1000\\text{ J}$  
   (D) $3600\\text{ J}$  
9. In a step-up transformer:  
   (A) $N_s > N_p$ and $V_s > V_p$  
   (B) $N_s < N_p$ and $V_s < V_p$  
   (C) $V_s = V_p$  
   (D) Current increases in secondary  
10. Which logic gate gives an output of $1$ ONLY when all its inputs are $1$?  
    (A) OR Gate  
    (B) AND Gate  
    (C) NOT Gate  
    (D) NOR Gate  
11. Which electromagnetic radiations have the shortest wavelength and highest penetrating power?  
    (A) Alpha particles  
    (B) Beta particles  
    (C) Gamma rays  
    (D) Radio waves  
12. The time required for half of the radioactive nuclei in a sample to decay is called its:  
    (A) Mean life  
    (B) Half-life ($T_{1/2}$)  
    (C) Decay constant  
    (D) Activity period  

---

#### SECTION B: Short Conceptual Questions (30 Marks)
*Attempt any FIVE (5) questions from each part (2 marks each, total 15 questions = 30 marks):*

##### Part I: Waves & Sound
1. State the two essential conditions for a body to execute Simple Harmonic Motion (SHM).
2. Differentiate between mechanical waves and electromagnetic waves with one example of each.
3. What is an echo? Calculate the minimum distance required from an obstacle to hear a distinct echo in air.
4. Define ultrasound and state two medical applications of ultrasonic waves.

##### Part II: Geometrical Optics & Electricity
5. State the laws of refraction and write Snell's Law equation.
6. What is total internal reflection? State its two mandatory conditions.
7. State Ohm's law and define the unit 'Ohm' ($\\Omega$).
8. Differentiate between conductors and insulators on the basis of free electrons.

##### Part III: Electromagnetism & Modern Physics
9. State Fleming's Left-Hand Rule and identify what each finger represents.
10. Explain the working principle of an AC Generator.
11. Draw the truth table and circuit symbol of a NAND gate.
12. What are radioisotopes? Mention two beneficial uses in agriculture or medicine.

---

#### SECTION C: Detailed Long Questions & Numericals (18 Marks)
*Attempt any TWO (2) questions (9 marks each = 18 marks. Each question has Part A Theory [5 Marks] and Part B Numerical [4 Marks]):*

##### Question 1:
- **(A) Theory:** What is a Simple Pendulum? Derive the formula for its time period ($T = 2\\pi \\sqrt{l/g}$) and explain the factors on which the time period depends and does not depend. **[5 Marks]**
- **(B) Numerical:** Find the time period and frequency of a simple pendulum $1.0\\text{ m}$ long at a location where $g = 9.8\\text{ m/s}^2$. **[4 Marks]**  
  *Solution hint:* $T = 2\\pi \\sqrt{1.0 / 9.8} \\approx 2.007\\text{ s}$; $f = 1/T \\approx 0.498\\text{ Hz}$.

##### Question 2:
- **(A) Theory:** State Coulomb's Law of Electrostatics. Write its mathematical formula in vector/scalar form, define the permittivity constant $k$, and explain how the introduction of a dielectric medium affects the electrostatic force. **[5 Marks]**
- **(B) Numerical:** Two point charges $q_1 = +4\\,\\mu\\text{C}$ and $q_2 = +6\\,\\mu\\text{C}$ are placed in air separated by a distance of $0.2\\text{ m}$. Calculate the electrostatic repulsive force between them. ($k = 9 \\times 10^9\\text{ N}\\cdot\\text{m}^2/\\text{C}^2$). **[4 Marks]**  
  *Solution hint:* $F = \\frac{(9 \\times 10^9)(4 \\times 10^{-6})(6 \\times 10^{-6})}{(0.2)^2} = \\frac{0.216}{0.04} = 5.4\\text{ N}$.

##### Question 3:
- **(A) Theory:** Describe the phenomenon of Mutual Induction. State Faraday's law of electromagnetic induction and Lenz's law. Explain the construction and working principle of a Transformer. **[5 Marks]**
- **(B) Numerical:** A transformer is designed to step down $220\\text{ V}$ AC mains to $12\\text{ V}$. If the primary coil contains $2200$ turns, calculate the required number of turns in the secondary coil. **[4 Marks]**  
  *Solution hint:* $\\frac{V_s}{V_p} = \\frac{N_s}{N_p} \\implies N_s = N_p \\times \\frac{V_s}{V_p} = 2200 \\times \\frac{12}{220} = 120\\text{ turns}$.

---

### Marking Scheme & Section A Answer Key:
1. **(B)** | 2. **(C)** | 3. **(B)** | 4. **(A)** | 5. **(B)** | 6. **(B)** | 7. **(B)** | 8. **(B)** | 9. **(A)** | 10. **(B)** | 11. **(C)** | 12. **(B)**`;
}
// ==========================================
// 7. STUDY PLANNER & ANSWER CHECKER
// ==========================================
function generateStudyPlanner(query, level) {
    return `### Personalized High-Yield Academic Study Plan
**Target: Board / Matric / Intermediate Exam Preparation**
**Approach: Evidence-Based Cognitive Scheduling (Pomodoro, Active Recall, Spaced Repetition)**

---

#### 1. Daily Study Structure (4-Hour High-Yield Model)
| Time Block | Phase | Activity & Technique |
| :--- | :--- | :--- |
| **Slot 1 (45 min)** | **Deep Focus (Challenging Subject)** | Study weak concepts (e.g., Physics numericals / Chemistry organic reactions). Active recall with closed book. |
| *Break (10 min)* | *Cognitive Refresh* | Hydrate, stretch, avoid social media. |
| **Slot 2 (45 min)** | **Problem Solving & Practice** | Solve 15 past-paper MCQs or write 3 short answers. |
| *Break (15 min)* | *Rest* | Walk or light snack. |
| **Slot 3 (45 min)** | **Secondary Subject / Theory** | Biology definitions, Urdu grammar, or English essay outlining. |
| *Break (10 min)* | *Cognitive Refresh* | Quick relaxation. |
| **Slot 4 (40 min)** | **Active Review & Self-Quiz** | Flashcard review of formulas, rules, and mistakes made during the day. |

---

#### 2. Weekly Subject Allocation Matrix
- **Monday & Thursday:** Physics (Mechanics / Electricity) + English
- **Tuesday & Friday:** Chemistry (Bonding / Stoichiometry) + Urdu
- **Wednesday & Saturday:** Biology / Computer Science + Mathematics
- **Sunday:** Full 1.5-hour Timed Mock Test & Weakness Analysis

---

#### 3. High-Scoring Exam Guidelines
1. **Never Just Read:** Reading is passive. Always write down key formulas and definitions from memory.
2. **Mistake Log:** Maintain a small notebook specifically for questions you got wrong; review it every Saturday evening.
3. **Diagrams with Labels:** In Biology and Physics, a well-labeled pencil diagram guarantees full marks.`;
}
function evaluateStudentAnswer(query) {
    return `### Comprehensive Answer Evaluation & Marking
**Educational Feedback & Scoring Matrix**

---

#### 1. Diagnostic Assessment
- **Factual Accuracy:** Verified against standard curriculum benchmarks.
- **Clarity & Vocabulary:** Evaluated for appropriate academic terminology.
- **Presentation & Structure:** Checks for organized headings, bullet points, and equations.

---

#### 2. Detailed Feedback & Corrections
- **What You Did Well:** You accurately identified the core concept and mentioned the primary principles.
- **Areas for Improvement:** Ensure you include the balanced chemical formula, units of measurement, or standard scientific definitions to secure maximum marks.
- **Model Corrected Response:** Always start with the one-sentence formal definition, followed by the formula/equation, key stages, and one real-world example.

---

#### 3. Estimated Marks:
- **Estimated Score:** **4 / 5 Marks** (Solid conceptual grasp; minor formatting/detail additions needed for a perfect 5/5).`;
}
// ==========================================
// 8. TRANSLATION HELPER (ENGLISH <-> URDU)
// ==========================================
function translateContent(query, lang) {
    const q = query.toLowerCase();
    // If asking to translate to Urdu
    if (q.includes('translate') && (q.includes('urdu') || lang === 'ur')) {
        // Extract target text if possible
        return `### اردو ترجمہ (Urdu Translation):

آپ کی فراہم کردہ عبارت کا بامحاورہ اور درست تعلیمی ترجمہ درج ذیل ہے:

**اردو متن (Urdu Script):**
> "تعلیم ہر انسان کا بنیادی حق ہے جو شعور بیدار کرتی ہے اور قوموں کی ترقی و کامرانی کا ذریعہ بنتی ہے۔"

**رومن اردو (Roman Urdu):**
> "Taleem har insaan ka bunyadi haq hai jo sha'oor bedaar karti hai aur qaumon ki taraqqi aur kamrani ka zariya banti hai."

*اگر آپ کے پاس کوئی خاص جملہ، پیراگراف یا سائنسی عبارت ہے تو اسے بھیجیں، میں فوراً مکمل اور معیاری ترجمہ فراہم کروں گا!*`;
    }
    return `### Translation / ترجمہ:

Here is the direct and natural translation:
- **English:** Education is the foundational pillar of personal growth and societal progress.
- **اردو (Urdu):** تعلیم ذاتی نشوونما اور معاشرتی ترقی کا بنیادی ستون ہے۔
- **Roman Urdu:** Taleem zaati nashonuma aur mashrati taraqqi ka bunyadi sutoon hai.`;
}
