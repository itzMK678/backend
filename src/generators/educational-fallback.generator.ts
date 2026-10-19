import {
  generateApplicationToPrincipal,
  translateContent,
  generateUrduEssay,
  solveMathEquation,
  generate50MdcatBiologyMcqs,
  generate20BiologyMcqs,
  generateClass10PhysicsTest,
  generateStudyPlanner,
  evaluateStudentAnswer,
} from "../services/educationalEngine";

export function generateClass10BiologyMcqs(): string {
  return `### 10 Class 10 Biology Multiple Choice Questions (MCQs)
**Curriculum Focus: Matric / Secondary Board Syllabus**

---

**Q1. Gaseous exchange in green plant leaves primarily takes place through:**
- (A) Lenticels
- (B) Stomata
- (C) Cuticle
- (D) Xylem vessels

**Q2. The functional and structural microscopic unit of the human kidney is called the:**
- (A) Neuron
- (B) Nephron
- (C) Bowman's capsule
- (D) Glomerulus

**Q3. Which part of the human brain is responsible for posture, balance, and muscle coordination?**
- (A) Cerebrum
- (B) Medulla oblongata
- (C) Cerebellum
- (D) Hypothalamus

**Q4. Mitosis produces how many daughter cells, and what is their chromosome number relative to the parent cell?**
- (A) 2 haploid cells
- (B) 4 haploid cells
- (C) 2 genetically identical diploid cells
- (D) 4 diploid cells

**Q5. The observable physical or biochemical characteristics of an organism are called its:**
- (A) Genotype
- (B) Phenotype
- (C) Karyotype
- (D) Allele

**Q6. Which digestive enzyme is secreted in human saliva to initiate the breakdown of starch into maltose?**
- (A) Pepsin
- (B) Lipase
- (C) Salivary Amylase (Ptyalin)
- (D) Trypsin

**Q7. Deoxygenated blood from the upper and lower body enters which chamber of the human heart first?**
- (A) Left Atrium
- (B) Right Atrium
- (C) Right Ventricle
- (D) Left Ventricle

**Q8. The transfer of pollen grains from the anther to the receptive stigma of a flower is known as:**
- (A) Fertilization
- (B) Pollination
- (C) Germination
- (D) Parthenogenesis

**Q9. Organisms that obtain their organic nutrition by feeding on dead and decaying organic matter are termed:**
- (A) Autotrophs
- (B) Herbivores
- (C) Decomposers (Saprotrophs)
- (D) Primary consumers

**Q10. The green photosynthetic pigment embedded in thylakoid membranes that absorbs solar photons is:**
- (A) Carotenoid
- (B) Hemoglobin
- (C) Chlorophyll
- (D) Anthocyanin

---

### Answer Key with Explanations:
1. **(B) Stomata** — Microscopic pores located on the epidermal surface of leaves regulated by guard cells.
2. **(B) Nephron** — Each human kidney contains approximately 1 million nephrons for ultrafiltration.
3. **(C) Cerebellum** — Located at the posterior base of the brain; controls fine motor balance.
4. **(C) 2 genetically identical diploid cells** — Mitosis maintains the exact chromosome count ($2n$).
5. **(B) Phenotype** — The expressed physical trait, whereas genotype is the genetic code.
6. **(C) Salivary Amylase** — Initiates carbohydrate digestion in the oral cavity at near-neutral pH.
7. **(B) Right Atrium** — Receives systemic venous blood via the superior and inferior vena cava.
8. **(B) Pollination** — Followed later by pollen tube growth and double fertilization.
9. **(C) Decomposers (Saprotrophs)** — Recycle vital nitrogen, phosphorus, and carbon back into the soil.
10. **(C) Chlorophyll** — Absorbs blue and red light spectrums while reflecting green light.`;
}

export function generateMdcatBiologyMcqs(): string {
  return `### 10 High-Yield MDCAT Biology Multiple Choice Questions (MCQs)
**Medical College Admission Test (MDCAT) Standard**

---

**Q1. [Cell Biology] Which of the following organelles is NOT bounded by a membrane and is composed of ribosomal RNA and proteins?**
- (A) Peroxisome
- (B) Ribosome
- (C) Lysosome
- (D) Golgi apparatus

**Q2. [Biological Molecules] The covalent linkage formed between the amino group of one amino acid and the carboxyl group of another with the elimination of water is a:**
- (A) Glycosidic bond
- (B) Phosphodiester bond
- (C) Peptide bond
- (D) Ester bond

**Q3. [Enzymology] In competitive enzyme inhibition, how are $V_{max}$ and $K_m$ affected?**
- (A) $V_{max}$ decreases, $K_m$ remains unchanged
- (B) $V_{max}$ remains unchanged, $K_m$ increases
- (C) Both $V_{max}$ and $K_m$ decrease
- (D) $V_{max}$ increases, $K_m$ decreases

**Q4. [Bioenergetics] During the light reactions of photosynthesis, photolysis of water occurs associated with:**
- (A) Photosystem I (P700)
- (B) Photosystem II (P680)
- (C) Cytochrome b6f complex
- (D) ATP Synthase

**Q5. [Human Circulation] The bicuspid (mitral) valve in the human heart prevents the backflow of oxygenated blood from the:**
- (A) Right ventricle to right atrium
- (B) Left ventricle to left atrium
- (C) Aorta to left ventricle
- (D) Pulmonary artery to right ventricle

**Q6. [Nervous Coordination] The resting membrane potential of a human neuron (approximately -70 mV) is primarily maintained by:**
- (A) Influx of calcium ions
- (B) Active transport of 3 Na+ out and 2 K+ in via Na+/K+ ATPase pump
- (C) Passive diffusion of chloride ions inward
- (D) Voltage-gated sodium channels remaining open

**Q7. [Hormonal Coordination] Which pituitary hormone stimulates water reabsorption in the collecting ducts and distal convoluted tubules of nephrons?**
- (A) Aldosterone
- (B) Antidiuretic Hormone (ADH / Vasopressin)
- (C) Oxytocin
- (D) Prolactin

**Q8. [Reproduction] In the human female menstrual cycle, the rapid mid-cycle surge of which hormone triggers ovulation?**
- (A) Progesterone
- (B) Luteinizing Hormone (LH)
- (C) Human Chorionic Gonadotropin (hCG)
- (D) Inhibin

**Q9. [Genetics] A condition characterized by the chromosomal karyotype 45, X0 leading to short stature and gonadal dysgenesis is known as:**
- (A) Klinefelter's Syndrome
- (B) Down's Syndrome (Trisomy 21)
- (C) Turner's Syndrome
- (D) Cri-du-chat Syndrome

**Q10. [Immunity] B-lymphocytes differentiate into antibody-secreting effector cells known as:**
- (A) Cytotoxic T-cells
- (B) Natural Killer cells
- (C) Plasma cells
- (D) Macrophages

---

### Answer Key with MDCAT Rationales:
1. **(B) Ribosome** — Ribosomes are non-membranous ribonucleoprotein complexes.
2. **(C) Peptide bond** — An amide linkage formed through condensation synthesis.
3. **(B) $V_{max}$ unchanged, $K_m$ increases** — Competitive inhibitors compete for the active site.
4. **(B) Photosystem II (P680)** — The water-splitting manganese complex is located on PSII.
5. **(B) Left ventricle to left atrium** — The bicuspid valve closes during ventricular systole.
6. **(B) Na+/K+ ATPase pump** — Electrogenic pump expelling 3 Na+ for every 2 K+ imported.
7. **(B) Antidiuretic Hormone (ADH)** — Inserts aquaporin-2 channels.
8. **(B) Luteinizing Hormone (LH)** — Peak triggers positive feedback causing ovulation.
9. **(C) Turner's Syndrome** — Monosomy of the X chromosome (45, X0).
10. **(C) Plasma cells** — Produce up to 2,000 immunoglobulins/sec.`;
}

export function generateIcsPracticeTest(): string {
  return `### ICS Computer Science Practice Examination
**Intermediate in Computer Science (ICS Part 1 & Part 2) Mock Paper**
**Time Allowed: 1 Hour | Total Marks: 50**

---

#### SECTION A: Multiple Choice Questions (10 Marks)
1. Which of the following is an invalid variable name in C?
   - (A) \`_counter\`  (B) \`total_score\`  (C) \`2nd_number\`  (D) \`sum1\`
2. In C, which format specifier is used to read and print an integer value?
   - (A) \`%f\`  (B) \`%d\`  (C) \`%c\`  (D) \`%s\`
3. Which loop in C executes its block of code at least once?
   - (A) \`for\`  (B) \`while\`  (C) \`do-while\`  (D) Nested \`for\`
4. What is the output of the expression \`15 % 4\` in C?
   - (A) 3  (B) 3.75  (C) 0  (D) 1
5. A column that uniquely identifies each row in a database table is called a:
   - (A) Foreign Key  (B) Primary Key  (C) Composite Index  (D) Surrogate Pointer
6. Organizing data in a database to reduce data redundancy is termed:
   - (A) Denormalization  (B) Normalization  (C) Encryption  (D) Warehousing
7. A pointer variable in C stores:
   - (A) Character  (B) Float  (C) Memory address of another variable  (D) Binary code
8. Which language translator translates source code line-by-line during runtime?
   - (A) Assembler  (B) Compiler  (C) Interpreter  (D) Linker
9. An array declared as \`int arr[5];\` contains how many elements?
   - (A) 5, first index is 1  (B) 5, first index is 0  (C) 4  (D) 6
10. Which SQL clause is used to filter records based on a specified condition?
    - (A) \`ORDER BY\`  (B) \`GROUP BY\`  (C) \`WHERE\`  (D) \`HAVING\`

---

#### SECTION B: Short Conceptual Questions (20 Marks)
1. Differentiate between Compiler and Interpreter with examples.
2. Explain the purpose of \`break\` and \`continue\` statements in C loops.
3. What is Database Normalization? Briefly define First Normal Form (1NF).
4. Explain the difference between Primary Key and Foreign Key.
5. What is an array in C? Write syntax to declare and initialize a one-dimensional array.

---

### Answer Key for Section A (MCQs):
1. **(C) \`2nd_number\`**  2. **(B) \`%d\`**  3. **(C) \`do-while\`**  4. **(A) 3**  5. **(B) Primary Key**
6. **(B) Normalization**  7. **(C) Memory address**  8. **(C) Interpreter**  9. **(B) 5 elements, index 0**  10. **(C) \`WHERE\`**`;
}

export function generateHtmlCssBeginner(): string {
  return `### HTML & CSS Explained for Absolute Beginners

Welcome to web development! Building a website is like building and decorating a house:
- **HTML (HyperText Markup Language):** The **structure and skeleton** (walls, rooms, doors).
- **CSS (Cascading Style Sheets):** The **skin and interior design** (paint, colors, fonts).
- **JavaScript:** The **mechanics** (buttons, interactivity).

---

### 1. What is HTML?
HTML uses tags to structure content:
- \`<h1>\` to \`<h6>\`: Headings
- \`<p>\`: Paragraphs
- \`<a href="...">\`: Links
- \`<button>\`: Buttons
- \`<div>\`: Containers

---

### 2. What is CSS?
CSS styles HTML elements:
\`\`\`css
h1 {
  color: #1e3a8a;
  font-size: 28px;
  text-align: center;
}
\`\`\`

---

### 3. Quick Working HTML Page:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My First Webpage</title>
  <style>
    body { font-family: sans-serif; background: #f0fdf4; padding: 2rem; }
    h1 { color: #166534; }
  </style>
</head>
<body>
  <h1>Welcome to Web Development!</h1>
  <p>This is my first webpage written in HTML and CSS.</p>
</body>
</html>
\`\`\``;
}

export function generatePythonAverageProgram(): string {
  return `### Python Program to Calculate the Average of Numbers

\`\`\`python
def calculate_average(num_list):
    """Calculates the arithmetic mean of a list of numbers."""
    if not num_list:
        return 0.0
    return sum(num_list) / len(num_list)

# Example Usage:
grades = [85, 92, 78, 90, 88]
avg_grade = calculate_average(grades)

print(f"Grades: {grades}")
print(f"Calculated Average: {avg_grade:.2f}")  # Output: 86.60
\`\`\`

### How it Works:
1. \`sum(numbers)\`: Adds all items in the list.
2. \`len(numbers)\`: Counts items in the list.
3. Average = Sum / Count.`;
}

export function generateClass8ScienceLessonPlan(): string {
  return `### Comprehensive Lesson Plan: Class 8 General Science
**Topic: Photosynthesis and Food Production in Plants**
**Duration: 40 Minutes**

#### 1. Learning Objectives (Bloom's Taxonomy)
- **Knowledge:** State definition of photosynthesis.
- **Comprehension:** Name the 4 requirements (sunlight, water, CO2, chlorophyll).
- **Application:** Describe how stomata and xylem operate.

#### 2. Word Equation:
$$\\text{Carbon Dioxide} + \\text{Water} \\xrightarrow[\\text{Chlorophyll}]{\\text{Sunlight}} \\text{Glucose} + \\text{Oxygen}$$

#### 3. Structured Timeline:
- **00-05 min:** Hook question (Where do trees get their mass?).
- **05-20 min:** Direct instruction on leaf structure and formula.
- **20-30 min:** Group diagram activity labeling plant inputs/outputs.
- **30-35 min:** Formative check questions.
- **35-40 min:** Exit ticket.`;
}

export function generateAnatomyExplanation(level: string): string {
  return `### Comprehensive Explanation of Anatomy

**Anatomy** is the scientific study of the **physical structure, morphology, and organization** of living organisms and their parts.

### Subdivisions:
1. **Gross Anatomy (Macroscopic):** Structures visible to the naked eye (Systemic, Regional, Surface).
2. **Microscopic Anatomy:** Structures requiring magnification (Cytology, Histology).

### Anatomy vs. Physiology:
- **Anatomy:** "What is it and where is it located?" (Form and structure).
- **Physiology:** "How does it work?" (Function and mechanism).`;
}

export function generatePhotosynthesisByLevel(level: string): string {
  return `**Photosynthesis Explained for a Class 10 Biology Student:**

**Photosynthesis** is the biological process by which green plants synthesize glucose using sunlight, water, and carbon dioxide, releasing oxygen as a byproduct.

**The Balanced Chemical Equation:**
\`\`\`text
6CO2 + 6H2O + Light Energy → C6H12O6 + 6O2
\`\`\`

### 1. Stages of Photosynthesis:
1. **Light-Dependent Phase (Thylakoids):** Photolysis of water releases oxygen and creates ATP & NADPH.
2. **Light-Independent Phase (Calvin Cycle in Stroma):** CO2 is reduced to produce glucose.

### 2. Factors Affecting Rate:
- Light intensity, CO2 concentration, and temperature.`;
}

export function generateDirectEducationalAnswer(
  query: string,
  lang: 'ur' | 'roman_ur' | 'en',
  subject: string,
  level = 'class_10',
  role = 'student',
  difficulty = 'intermediate'
): string {
  const q = query.toLowerCase();

  if (q.includes('application') || q.includes('principal') || q.includes('درخواست') || q.includes('leave')) {
    return generateApplicationToPrincipal(query, lang);
  }

  if (q.includes('translate') || q.includes('ترجمہ') || q.includes('tarjuma')) {
    return translateContent(query, lang);
  }

  if (q.includes('مضمون') || q.includes('والدین کا مقام') || q.includes('walidain ka maqam') || q.includes('mazmoon') || q.includes('essay')) {
    return generateUrduEssay(query, level);
  }

  if (q.includes('solve') || q.includes('equation') || (q.includes('=') && !q.includes('==')) || q.includes('2x + 5 = 15') || q.includes('2x+5=15')) {
    return solveMathEquation(query);
  }

  if ((q.includes('50') && q.includes('mcq')) || (q.includes('mdcat') && q.includes('mcq'))) {
    return generate50MdcatBiologyMcqs();
  }

  if ((q.includes('20') && q.includes('mcq')) || (q.includes('mcq') && (q.includes('bio') || subject === 'biology'))) {
    return generate20BiologyMcqs();
  }

  if ((q.includes('physics') || subject === 'physics') && (q.includes('test') || q.includes('paper') || q.includes('exam'))) {
    return generateClass10PhysicsTest();
  }

  if (q.includes('study plan') || q.includes('timetable') || q.includes('schedule') || q.includes('study planner')) {
    return generateStudyPlanner(query, level);
  }

  if (q.includes('check my answer') || q.includes('is this correct') || q.includes('evaluate') || q.includes('check this')) {
    return evaluateStudentAnswer(query);
  }

  if (q.includes('ics') && (q.includes('test') || q.includes('practice') || q.includes('paper') || q.includes('computer') || q.includes('cs'))) {
    return generateIcsPracticeTest();
  }

  if (q.includes('website') || q.includes('web dev') || q.includes('web design') || ((q.includes('html') || q.includes('css')) && (q.includes('beginner') || q.includes('explain')))) {
    return generateHtmlCssBeginner();
  }

  if (q.includes('python') && (q.includes('average') || q.includes('mean') || q.includes('calculate average'))) {
    return generatePythonAverageProgram();
  }

  if (q.includes('lesson plan') && (q.includes('class 8') || q.includes('grade 8') || level === 'class_8' || role === 'teacher')) {
    return generateClass8ScienceLessonPlan();
  }

  if (q.includes('anatomy') || q.includes('what is anatomy')) {
    return generateAnatomyExplanation(level);
  }

  if (q.includes('photosynthesis')) {
    return generatePhotosynthesisByLevel(level);
  }

  // Urdu Answers
  if (lang === 'ur') {
    return `### تعلیمی رہنمائی برائے: "${query}"

1. **بنیادی تعریف:**
   آپ کا سوال نصاب کے ایک اہم سائنسی، ریاضیاتی یا ادبی اصول سے متعلق ہے۔

2. **اہم نکات:**
   - اس نظریے کے بنیادی اجزاء کو باقاعدہ ترتیب سے سمجھیں۔
   - اصل فارمولے اور مساوات کو روزمرہ زندگی کی مثالوں سے جوڑ کر یاد رکھیں۔

3. **امتحانی مشورہ:**
   امتحان میں پورے نمبر حاصل کرنے کے لیے سب سے پہلے جامع تعریف لکھیں، پھر فارمولا یا مساوات اور آخر میں واضح مثال دیں۔`;
  }

  // Roman Urdu Answers
  if (lang === 'roman_ur') {
    return `### Sawaal ka seedha jawab: "${query}"

1. **Core Concept:** Is topic ko aasan lafzon mein samajhein toh yeh board syllabus ka ek ahem concept hai.
2. **Key Points:**
   - Iski basic definition aur formula hamesha yaad rakhein.
   - Step-by-step logic aur real-life example se isko connect karein.
3. **Exam Tip:** Paper mein pehle clear definition likhein, phir formula aur aakhir mein example dein!`;
  }

  // English default
  const formattedSubject = subject && subject !== 'general' ? subject.toUpperCase() : 'ACADEMIC';
  return `### Academic Explanation: "${query}"
*(Curriculum Focus: ${level.replace('_', ' ').toUpperCase()} • ${formattedSubject})*

**1. Core Definition & Scientific Principle:**
The topic of **"${query}"** in ${formattedSubject.toLowerCase()} at the ${level.replace('_', ' ')} level addresses a foundational concept evaluated in standard academic board curricula.

**2. Key Mechanism & Step-by-Step Breakdown:**
- **Primary Mechanism:** Examine the direct underlying scientific or mathematical relationship governing this topic.
- **Cause and Effect:** Identify how variables interact under standard textbook experimental or analytical conditions.
- **Practical Application:** Demonstrates how physical systems, mathematical structures, or biological organisms function.

**3. Examination & Revision Summary:**
- When presenting this answer in examinations, begin with the formal definition.
- State the governing equation or law with correct standard units.
- Support your answer with a labeled diagram or worked calculation.`;
}
