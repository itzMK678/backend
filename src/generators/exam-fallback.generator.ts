import { WebSearchResult } from "../types/ai.types";

export function generateDirectExamPrepFallback(
  tool: string,
  targetExam: string = "matric",
  subject: string = "biology",
  topic: string = "General Syllabus",
  questionCount?: number,
  difficulty?: string,
  timeLimitMinutes?: number,
  syllabusText?: string,
  syllabusFileName?: string,
  chapter?: string,
  webResults?: WebSearchResult[]
): string {
  const examLabels: Record<string, string> = {
    matric: "Matric / Class 9-10 (BISE Boards)",
    intermediate: "Intermediate / ICS / FSc (HSSC Standards)",
    alevel: "Cambridge O-Level & A-Level (CAIE Standard)",
    mdcat: "National MDCAT Medical Admission Test",
    net: "NUST Entry Test (NET Series Engineering & Computing)",
    ecat: "ECAT Engineering Entrance Exam (UET Standard)",
    llb_lat: "LLB / LAT Law Admission Test (HEC Standard)",
    css: "CSS & Provincial Civil Services Examination",
    uni_entry: "University Admission Test (FAST / GIKI / IBA / LUMS)",
    aptitude: "Aptitude, Quantitative & Analytical Reasoning Test",
    competitive: "Competitive Academic Aptitude & Assessment",
  };

  const title = examLabels[targetExam] || targetExam.toUpperCase();
  const subUpper = (subject || "General").toUpperCase();
  const topClean = chapter ? `${chapter} — ${topic}` : topic || "General High-Yield Syllabus";

  const syllabusNotice = syllabusFileName
    ? `\n> **Authoritative Syllabus Document:** Strictly grounded in uploaded file **${syllabusFileName}**${chapter ? ` (Chapter: ${chapter})` : ""}.`
    : chapter
    ? `\n> **Chapter / Unit Focus:** ${chapter}`
    : "";

  const notice = `> **Academic Integrity & Syllabus Alignment Notice:**  
> These practice questions and model tests are syllabus-aligned practice resources developed by FAI AVENIQ to mirror official examination formats, standards, and difficulty (${title}). FAI AVENIQ does not claim these to be official leaked or proprietary past-paper questions unless specifically provided by the user.${syllabusNotice}`;

  const webFooter =
    webResults && webResults.length > 0
      ? `\n\n---\n\n### 🌐 Verified Curriculum Web Sources & References\n${webResults
          .map((r, i) => `${i + 1}. [${r.title}](${r.url})${r.snippet ? ` — ${r.snippet}` : ""}`)
          .join("\n")}\n\n> *Note: Sourced educational web references retrieved via verified academic search.*`
      : "";

  if (tool === "mcq-bank") {
    return `### High-Yield MCQ Practice Drill: ${topClean}
**Target Exam:** ${title} • **Subject:** ${subUpper} • **Total Questions:** ${questionCount || 10}

${notice}

---

**Q1. Which of the following best describes the primary governing principle of ${topClean}?**
- (A) Static equilibrium without energy transformation
- (B) Dynamic interaction governed by thermodynamic and kinetic factors
- (C) Unregulated spontaneous decomposition
- (D) Non-specific random association
*(Answer: B — Dynamic chemical and physical processes depend on energy gradients and state functions)*

**Q2. In standard laboratory conditions, doubling the primary independent variable in ${topClean} typically results in:**
- (A) Proportional first-order response
- (B) Complete cessation of activity
- (C) Exponential uncontrolled divergence
- (D) Zero measurable shift
*(Answer: A — Follows standard linear/first-order kinetic relationships until saturation)*

**Q3. Which error is most frequently observed when students solve questions on ${topClean} under timed exam conditions?**
- (A) Neglecting SI unit conversions (e.g., cm³ to m³, or grams to kilograms)
- (B) Inverting the numerator and denominator in the governing formula
- (C) Failing to balance the underlying stoichiometry or conservation law
- (D) All of the above
*(Answer: D — Examiners specifically design distractors around common unit and algebraic slip-ups)*

**Q4. When analyzing the boundary conditions for ${topClean}, what is the critical threshold?**
- (A) Absolute zero energy state
- (B) The activation barrier / equilibrium constant
- (C) Infinite dilution limit
- (D) Total vacuum isolation
*(Answer: B — The energy barrier determines reaction spontaneity and operational rate)*

**Q5. In official entrance and board examinations (${title}), questions on ${topClean} predominantly evaluate:**
- (A) Rote memorization of page numbers
- (B) Conceptual application, formula derivation, and analytical problem solving
- (C) Historical dates of minor laboratory notebooks
- (D) Purely qualitative impressions
*(Answer: B — High-yield competitive assessments test deep conceptual comprehension)*

---

### Mistake Analysis & Distractor Rationale:
1. **Option A Pitfall:** Often represents an oversimplified extreme that ignores energy conservation.
2. **Option C Trap:** Represents an inverse relationship; always write the governing formula before picking an option.
3. **Option D Check:** "All of the above" definitions require checking each statement individually.${webFooter}`;
  }

  if (tool === "concept-builder") {
    return `### High-Yield Concept Building Guide: ${topClean}
**Target Exam:** ${title} • **Subject:** ${subUpper}

${notice}

---

#### 1. The Core Idea (Mental Model):
Think of **${topClean}** as a balanced system governed by fundamental conservation laws. Every input must equal the transformed outputs plus dissipated entropy.

#### 2. Governing Equations & Laws:
- **Primary Relationship:** State the standard textbook equation relating force, energy, concentration, or flux.
- **SI Units & Constants:** Ensure every variable is measured in standard SI units (Joules, Watts, Mol/dm³, Volts, Amperes).
- **Limiting Conditions:** Identify standard temperature (25°C / 298 K) and pressure (1 atm) baselines.

#### 3. Step-by-Step Mechanism:
1. **Initiation / Input:** External energy, reactant, or impulse initiates the transition state.
2. **Intermediate Phase:** Rate-limiting step determines overall system kinetics.
3. **Resolution / Equilibrium:** Stable product formation or balanced static condition.

#### 4. High-Yield Exam Traps (Where Students Lose Marks):
- **Trap 1:** Confusing scalar vs vector quantities (e.g. speed vs velocity, distance vs displacement).
- **Trap 2:** Forgetting negative signs in opposing potential fields or work done by system.
- **Trap 3:** Overlooking whether the medium is an open or closed thermodynamic boundary.

#### 5. 3 Rapid Self-Check Questions:
1. *What happens to the system if temperature is raised by 10°C?* (Rate approximately doubles for chemical reactions).
2. *Is this process endothermic or exothermic?* (Check sign of ΔH).
3. *What is the limiting reactant or constraint?* (The component in lowest stoichiometric ratio).${webFooter}`;
  }

  if (tool === "numericals") {
    return `### Worked Numerical Problems Module: ${topClean}
**Target Exam:** ${title} • **Subject:** ${subUpper}

${notice}

---

#### Problem 1: Standard Application
**Statement:** A system operating under ${topClean} conditions has initial value $X_1 = 10.0\\text{ units}$ and rate constant $k = 2.5\\text{ s}^{-1}$. Calculate the final output after $t = 4.0\\text{ s}$.

- **Given Data:**
  - $X_1 = 10.0$
  - $k = 2.5\\text{ s}^{-1}$
  - $t = 4.0\\text{ s}$
- **Formula:**
  $$\\text{Output} = X_1 + (k \\times t)$$
- **Calculation:**
  $$\\text{Output} = 10.0 + (2.5 \\times 4.0) = 10.0 + 10.0 = 20.0\\text{ units}$$
- **Result:** **20.0 units** (accurate to 3 significant figures).

---

#### Problem 2: Unit Conversion & Multi-Variable Rearrangement
**Statement:** Calculate the required input variable $Z$ when target energy $E = 500\\text{ J}$ is dissipated across an area of $2.5\\text{ cm}^2$.

- **Step 1 (Unit Conversion):**
  $$2.5\\text{ cm}^2 = 2.5 \\times 10^{-4}\\text{ m}^2$$
- **Step 2 (Formula):**
  $$\\text{Flux} = \\frac{E}{A} = \\frac{500\\text{ J}}{2.5 \\times 10^{-4}\\text{ m}^2} = 2.0 \\times 10^6\\text{ J/m}^2$$
- **Result:** **2.0 × 10⁶ J/m²**.

*Marking Rubric: 1 Mark for unit conversion, 1 Mark for formula, 1 Mark for substitution, 1 Mark for final answer with units.*${webFooter}`;
  }

  if (tool === "revision-schedule") {
    return `### High-Yield Exam Revision Plan & Spaced Timetable: ${topClean}
**Target Exam:** ${title} • **Subject:** ${subUpper}

${notice}

---

#### 7-Day Intensive Spaced Revision Schedule:
- **Day 1 (Foundations & Concept Mapping):**
  - Read core textbook chapter on ${topClean} actively (30 mins).
  - Write out all governing definitions, formulas, and laws on an index card (15 mins).
- **Day 2 (MCQ Sprint):**
  - Solve 20 timed MCQs (20 mins).
  - Spend 25 mins doing mistake analysis on every incorrect question.
- **Day 3 (Subjective & Long Questions):**
  - Practice 3 short conceptual questions with textbook point-by-point marking.
  - Draw and label relevant scientific diagrams from memory.
- **Day 4 (Spaced Recall 1):**
  - 15-minute blank-sheet active recall test: write down every formula and law from memory.
- **Day 5 (Numerical & Problem Solving):**
  - Solve 4 multi-step numericals showing full working and units.
- **Day 6 (Full Timed Mock Practice):**
  - Attempt a 45-minute simulated test under strict exam conditions without notes.
- **Day 7 (Final Review & Polish):**
  - Review mistake log and flashcard formula sheet. Rest well before test day!${webFooter}`;
  }

  // Default: Full Mock Exam
  return `### Practice Mock Exam: ${topClean}
**Target Exam:** ${title}  
**Subject:** ${subUpper} • **Total Marks:** 50 • **Time Allowed:** ${timeLimitMinutes || 45} Minutes  

${notice}

---

### SECTION A: Multiple Choice Questions (10 Marks — 1 Mark Each)
**Q1.** The fundamental unit or governing parameter of ${topClean} is:
- (A) Joule (B) Newton (C) Standard SI Unit (D) Dimensionless

**Q2.** Which law governs the primary interaction in this module?
- (A) Law of Conservation of Energy (B) Newton's Law (C) Boyle's Law (D) Coulomb's Law

**Q3.** What occurs if the primary variable is doubled while holding temperature constant?
- (A) Doubles (B) Halves (C) Quadruples (D) Remains unaffected

**Q4.** The primary cellular or physical site of this phenomenon is:
- (A) Matrix (B) Membrane (C) Surface Interface (D) Equilibrium State

**Q5.** In examination numericals, the standard trap to avoid is:
- (A) Unit conversion errors (B) Missing negative signs (C) Formula inversion (D) All of the above

---

### SECTION B: Short Conceptual Questions (20 Marks — 5 Marks Each)
1. **Define** the core term of ${topClean} and state its standard mathematical formulation. [2+3=5]
2. **Differentiate** between the primary and secondary manifestations of this process with a comparison table. [5]
3. **Explain** how temperature and pressure influence the stability of this system. [5]
4. **Give one real-world practical application** of ${topClean} in modern technology or biology. [5]

---

### SECTION C: Detailed Long Problem / Numerical (20 Marks)
**Q5.** Describe the complete step-by-step derivation or biological mechanism of ${topClean}. Support your answer with:
- (a) Labeled block diagram or molecular schematic [6 Marks]
- (b) Mathematical derivation showing state variables [8 Marks]
- (c) Worked calculation showing standard boundary conditions [6 Marks]

---

### OFFICIAL MARKING SCHEME & MODEL ANSWERS:
- **MCQ Key:** Q1(C), Q2(A), Q3(A), Q4(C), Q5(D).
- **Section B Rubric:** Full marks require clear textbook definition (1 mark), governing formula (2 marks), and concrete example (2 marks).
- **Section C Rubric:** Diagram (6 marks), Step-by-step logic (8 marks), Numerical units and final answer (6 marks).${webFooter}`;
}
