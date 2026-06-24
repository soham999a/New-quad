export const CONTEXTS = [
  {
    id: "school",
    label: "School",
    icon: "🏫",
    desc: "Foundational development with age-appropriate activities and developmental milestones.",
  },
  {
    id: "college",
    label: "College",
    icon: "🎓",
    desc: "Advanced development with specialization based on academic and career paths.",
  },
  {
    id: "corporate",
    label: "Corporate",
    icon: "🏢",
    desc: "Professional application with focus on leadership, teamwork, and organizational effectiveness.",
  },
  {
    id: "individual",
    label: "Individual",
    icon: "🧠",
    desc: "Personalized holistic development pathway tailored to unique goals and strengths.",
  },
  {
    id: "custom",
    label: "Custom",
    icon: "⚙️",
    desc: "Configurable context for specialized institutions and unique developmental needs.",
  },
];

export const WEIGHTS = { IQ: 1.0, EQ: 2.0, SQ: 2.0, AQ: 1.28 };
export const MAX_WEIGHT_SUM = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);

export const GRADE_BANDS = [
  {
    grade: "A",
    label: "Excellent",
    min: 90,
    max: 100,
    color: "#10b981",
    bg: "rgba(16,185,129,0.15)",
  },
  {
    grade: "B",
    label: "Very Good",
    min: 75,
    max: 89,
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.15)",
  },
  { grade: "C", label: "Good", min: 60, max: 74, color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  {
    grade: "D",
    label: "Satisfactory",
    min: 45,
    max: 59,
    color: "#f97316",
    bg: "rgba(249,115,22,0.15)",
  },
  {
    grade: "E",
    label: "Needs Improvement",
    min: 0,
    max: 44,
    color: "#ef4444",
    bg: "rgba(239,68,68,0.15)",
  },
];

export interface PillarSubParam {
  id: string;
  label: string;
  max: number;
  desc: string;
  weight?: number;
}
export interface PillarBonusSection {
  id: string;
  label: string;
  max: number;
  desc: string;
}

export interface PillarDef {
  id: string;
  label: string;
  short: string;
  color: string;
  gradient: string;
  weight: number;
  maxScore: number;
  emoji: string;
  description: string;
  framework: string;
  subParams: PillarSubParam[];
  bonusSections?: PillarBonusSection[];
  assessmentMethods: string[];
  developmentFocus: string[];
  careerAlignment: string;
  rdWeights?: Record<string, number>;
  rdMax?: number;
}

export const PILLARS: Record<string, PillarDef> = {
  IQ: {
    id: "IQ",
    label: "Intelligence Quotient",
    short: "IQ",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1, #818cf8)",
    weight: 1.0,
    maxScore: 125,
    emoji: "🧠",
    description:
      "Extends beyond traditional IQ testing to encompass multiple dimensions of cognitive ability including verbal, quantitative, psychometric, and performance intelligence.",
    framework: "Four-Parameter Cognitive Model + AI & Visual Extension",
    subParams: [
      {
        id: "verbal",
        label: "Verbal Intelligence",
        max: 25,
        desc: "Language comprehension, expression, and reasoning through words.",
      },
      {
        id: "quantitative",
        label: "Quantitative Intelligence",
        max: 25,
        desc: "Numerical reasoning, mathematical problem-solving, and logical analysis.",
      },
      {
        id: "psychometric",
        label: "Psychometric Abilities",
        max: 25,
        desc: "Pattern recognition, spatial reasoning, and abstract thinking.",
      },
      {
        id: "performance",
        label: "Performance Intelligence",
        max: 25,
        desc: "Practical application of cognitive skills in real-world tasks.",
      },
    ],
    bonusSections: [
      {
        id: "_aiBonus",
        label: "AI-Generated Questions",
        max: 16,
        desc: "4 sections × 2 questions × 2 marks each.",
      },
      {
        id: "_visualBonus",
        label: "Visual / Diagram",
        max: 9,
        desc: "9 diagram-based questions from a rotating pool.",
      },
    ],
    assessmentMethods: [
      "Standardized psychometric tests",
      "Verbal reasoning tasks",
      "Quantitative problem sets",
      "Performance-based activities",
      "AI-generated dynamic questions",
      "Visual/diagram-based questions",
    ],
    developmentFocus: [
      "Cognitive strengthening exercises",
      "Reasoning and logic training",
      "Problem-solving modules",
      "Critical thinking workshops",
    ],
    careerAlignment:
      "High IQ profiles align with analytical, technical, research, and specialist career tracks.",
  },
  EQ: {
    id: "EQ",
    label: "Emotional Quotient",
    short: "EQ",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
    weight: 2.0,
    maxScore: 100,
    emoji: "❤️",
    description:
      "Assessed through the Dynamic Emotional Competency (DEC) Framework — measuring real-time emotional adaptability and contextual integration rather than static traits.",
    framework: "Dynamic Emotional Competency (DEC)",
    subParams: [
      {
        id: "SA",
        label: "Self-Awareness",
        max: 10,
        desc: "Reflective insight, emotional literacy, self-appraisal, self-concept clarity.",
      },
      {
        id: "ER",
        label: "Emotion Regulation",
        max: 10,
        desc: "Impulse control, emotional flexibility, resilience, self-soothing, mood management.",
      },
      {
        id: "SM",
        label: "Self-Motivation",
        max: 10,
        desc: "Intrinsic drive, vision and goal orientation, commitment to growth, self-efficacy.",
      },
      {
        id: "E",
        label: "Empathy",
        max: 10,
        desc: "Perspective-taking, emotional resonance, compassion in action, non-verbal sensitivity.",
      },
      {
        id: "IS",
        label: "Interpersonal Skills",
        max: 10,
        desc: "Authentic communication, conflict navigation, social adaptability, relationship cultivation.",
      },
    ],
    assessmentMethods: [
      "DEC Likert questionnaire (Part A)",
      "Activity-based assessment (Part B)",
      "Scenario analysis",
      "Behavioral observation",
    ],
    developmentFocus: [
      "Pause-and-reflect drills (Stop-Think-Act)",
      "Self-regulation practice",
      "Emotional awareness journaling",
      "Empathy-building activities",
    ],
    careerAlignment:
      "High EQ profiles excel in HR, counseling, customer relations, and high-level leadership roles.",
  },
  SQ: {
    id: "SQ",
    label: "Social Quotient",
    short: "SQ",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f7, #c084fc)",
    weight: 2.0,
    maxScore: 100,
    emoji: "🤝",
    description:
      "Measures the ability to navigate social environments effectively, build meaningful relationships, and demonstrate cognitive social intelligence.",
    framework: "Social Intelligence Assessment Center",
    subParams: [
      {
        id: "ACE",
        label: "Assessment Centre Exercise",
        max: 20,
        desc: "Active listening, collaboration, communication, empathy, leadership.",
      },
      {
        id: "CSI",
        label: "Cognitive SQ Test",
        max: 10,
        desc: "Understanding social cues, predicting outcomes, social problem-solving, empathy, decision-making.",
      },
      {
        id: "PBA",
        label: "Performance-Based Activities",
        max: 20,
        desc: "Role-play, team projects, peer feedback, debates, empathy mapping.",
      },
    ],
    assessmentMethods: [
      "Assessment Centre group exercises",
      "Cognitive MCQ scenarios",
      "Performance-based activities",
      "Peer evaluation",
    ],
    developmentFocus: [
      "Collaboration workshops",
      "Social awareness training",
      "Communication skills modules",
      "Team leadership exercises",
    ],
    careerAlignment:
      "High SQ profiles thrive in team leadership, community development, education, and social enterprise roles.",
  },
  AQ: {
    id: "AQ",
    label: "Adversity Quotient",
    short: "AQ",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    weight: 1.28,
    maxScore: 100,
    emoji: "⚡",
    description:
      "Evaluated through the Resilience Dynamics Framework (RDF) — measuring the ability to anticipate, navigate, and grow through adversity.",
    framework: "Resilience Dynamics Framework (RDF)",
    subParams: [
      {
        id: "SA",
        label: "Situational Agility",
        max: 19,
        desc: "Adaptive Problem-Solving • Cognitive Flexibility • Emotional Anchoring",
        weight: 1.5,
      },
      {
        id: "PM",
        label: "Proactive Momentum",
        max: 19,
        desc: "Anticipatory Readiness • Initiative Amplifier • Momentum Sustainment",
        weight: 1.0,
      },
      {
        id: "RR",
        label: "Relational Resilience",
        max: 19,
        desc: "Collective Synergy • Boundary Navigation • Empathic Advocacy",
        weight: 1.0,
      },
      {
        id: "RC",
        label: "Regenerative Capacity",
        max: 19,
        desc: "Energy Restoration • Growth Integration • Future-Proofing",
        weight: 1.5,
      },
    ],
    assessmentMethods: [
      "CORE-style scenario questionnaire (Likert 1–5)",
      "Simulation exercises",
      "Performance tasks",
      "Peer evaluation",
      "Self-reflection tool",
      "Structured interview",
    ],
    developmentFocus: [
      "Resilience-building modules",
      "Anticipation and adaptability training",
      "Relational boundary coaching",
      "Regenerative capacity workshops",
    ],
    careerAlignment:
      "High AQ profiles are suited for high-pressure, adaptive, and resilience-heavy roles.",
    rdWeights: { SA: 1.5, PM: 1.0, RR: 1.0, RC: 1.5 },
    rdMax: 95,
  },
};

export const EQ_QUESTIONS: Record<string, any> = {
  partA: {
    SA: {
      label: "Self-Awareness",
      subParams: "Reflective Insight • Emotional Literacy • Self-Appraisal",
      questions: {
        "11-18": [
          "I notice right away when my emotions start to shift.",
          "I can name exactly what I am feeling.",
          "I have a realistic picture of my strengths and weaknesses.",
          "I know what I truly value in life.",
          "My gut feelings often give me useful signals.",
        ],
        "19-32": [
          "I can identify and label my emotional states with precision.",
          "I understand recurring patterns in my emotional responses.",
          "I hold a realistic and balanced view of my capabilities.",
          "My personal values are clearly defined.",
          "I trust my internal emotional compass when navigating complex decisions.",
        ],
      },
    },
    ER: {
      label: "Emotion Regulation",
      subParams: "Impulse Control • Emotional Flexibility • Resilience",
      questions: {
        "11-18": [
          "When I feel a strong urge to react angrily, I can pause and choose how to respond.",
          "I can shift my emotional state when a situation changes.",
          "After a setback, I bounce back fairly quickly.",
          "I have healthy strategies to calm myself when overwhelmed.",
          "I can keep my mood from negatively affecting my work or relationships.",
        ],
        "19-32": [
          "I consistently employ evidence-based self-regulation strategies.",
          "I adapt my emotional tone across professional, social, and personal contexts.",
          "I recover from adversity without prolonged emotional disruption.",
          "I have a personal repertoire of effective self-soothing techniques.",
          "I maintain sustained emotional balance under prolonged stress.",
        ],
      },
    },
    SM: {
      label: "Self-Motivation",
      subParams: "Intrinsic Drive • Vision and Goal Orientation",
      questions: {
        "11-18": [
          "I work hard on things I care about even without rewards.",
          "I set clear goals for my future and take steps toward them.",
          "When I make a mistake, I see it as a learning opportunity.",
          "I genuinely believe I can improve through effort.",
          "I can channel nervous energy into productive action.",
        ],
        "19-32": [
          "My motivation is sustained by internal values rather than external rewards.",
          "I set specific long-term goals with systematic action plans.",
          "I actively seek feedback and development opportunities.",
          "I maintain a strong belief in my capacity to succeed.",
          "I manage my emotional energy strategically.",
        ],
      },
    },
    E: {
      label: "Empathy",
      subParams: "Perspective-Taking • Emotional Resonance • Compassion",
      questions: {
        "11-18": [
          "I try to understand situations from another person point of view.",
          "When someone close is sad, I genuinely feel moved.",
          "If I see someone struggling, I take action to help.",
          "I pick up on small signals like tone of voice and body language.",
          "I respect people from different backgrounds and cultures.",
        ],
        "19-32": [
          "I intentionally engage in perspective-taking as a cognitive practice.",
          "I experience genuine emotional resonance while maintaining boundaries.",
          "I translate compassionate awareness into concrete support.",
          "I am highly attuned to non-verbal and para-verbal cues.",
          "I adapt my empathic approach across cultural and contextual differences.",
        ],
      },
    },
    IS: {
      label: "Interpersonal Skills",
      subParams: "Authentic Communication • Conflict Navigation",
      questions: {
        "11-18": [
          "I can express my thoughts clearly without being hurtful.",
          "In disagreements, I look for solutions that work for everyone.",
          "I adjust how I talk depending on who I am with.",
          "I invest time in building and maintaining my relationships.",
          "I contribute actively to group work.",
        ],
        "19-32": [
          "I communicate authentically and assertively.",
          "I navigate conflicts using principled approaches.",
          "I adapt my communication style across diverse contexts.",
          "I deliberately invest in deep, reciprocal relationships.",
          "I facilitate collaborative environments.",
        ],
      },
    },
  },
  partB: [
    {
      id: "B1",
      code: "SA",
      label: "Emotion Mapping Canvas",
      component: "Self-Awareness",
      maxScore: 5,
      desc: "Participants are presented with 6 illustrated scenario cards.",
      rubric: [
        { criterion: "Emotion Identification", marks: 2 },
        { criterion: "Trigger Recognition", marks: 1 },
        { criterion: "Behavioral Insight", marks: 1 },
        { criterion: "Personal Reflection Depth", marks: 1 },
      ],
    },
    {
      id: "B2",
      code: "ER",
      label: "The Pressure Cooker Simulation",
      component: "Emotion Regulation",
      maxScore: 5,
      desc: "A timed role-play scenario.",
      rubric: [
        { criterion: "Impulse Control", marks: 2 },
        { criterion: "Emotional Flexibility", marks: 1 },
        { criterion: "Debrief Self-Awareness", marks: 1 },
        { criterion: "Recovery Speed", marks: 1 },
      ],
    },
    {
      id: "B3",
      code: "SM",
      label: "The Goal Combustion Board",
      component: "Self-Motivation",
      maxScore: 5,
      desc: "Participants design a 90-day growth plan.",
      rubric: [
        { criterion: "Intrinsic Motivation Clarity", marks: 2 },
        { criterion: "Obstacle Anticipation", marks: 1 },
        { criterion: "Goal Specificity", marks: 1 },
        { criterion: "Commitment Language", marks: 1 },
      ],
    },
    {
      id: "B4",
      code: "E",
      label: "Walk in Their Shoes",
      component: "Empathy",
      maxScore: 5,
      desc: "Participants respond to an emotional narrative.",
      rubric: [
        { criterion: "Emotional Resonance Depth", marks: 2 },
        { criterion: "Compassion in Action Quality", marks: 1 },
        { criterion: "Non-Verbal Reading", marks: 1 },
        { criterion: "Cultural Sensitivity", marks: 1 },
      ],
    },
    {
      id: "B5",
      code: "IS",
      label: "The Bridge Builder",
      component: "Interpersonal Skills",
      maxScore: 5,
      desc: "Conflict resolution task in pairs/triads.",
      rubric: [
        { criterion: "Authentic Communication", marks: 1 },
        { criterion: "Conflict Navigation Style", marks: 2 },
        { criterion: "Social Adaptability", marks: 1 },
        { criterion: "Collaborative Engagement", marks: 1 },
      ],
    },
  ],
};

export const SQ_QUESTIONS: Record<string, any> = {
  component1_ACE: {
    label: "Assessment Centre Exercise",
    totalMarks: 20,
    exercises: [
      { id: "ACE1", label: "The Relay Narrative", marks: 4 },
      { id: "ACE2", label: "The Consensus Tower", marks: 4 },
      { id: "ACE3", label: "The Assertive Brief", marks: 4 },
      { id: "ACE4", label: "The Empathy Interview", marks: 4 },
      { id: "ACE5", label: "The Leaderless Group Challenge", marks: 4 },
    ],
  },
  component2_CSI: {
    label: "Cognitive Social Intelligence Test",
    totalMarks: 10,
    questions: [
      {
        id: "CSI1",
        scenario: "Team member goes quiet after contributing.",
        options: [
          { text: "She ran out of ideas", marks: 0 },
          { text: "She feels dismissed", marks: 2 },
          { text: "She is tired", marks: 1 },
        ],
      },
      {
        id: "CSI2",
        scenario: "Two members debating publicly in group chat.",
        options: [
          { text: "Make decision yourself", marks: 1 },
          { text: "Private conversation to find common ground", marks: 2 },
          { text: "Put it to a vote", marks: 0 },
        ],
      },
      {
        id: "CSI3",
        scenario: "Team member not contributing, deadline in 4 days.",
        options: [
          { text: "Escalate immediately", marks: 1 },
          { text: "Speak privately first", marks: 2 },
          { text: "Redistribute tasks silently", marks: 0 },
        ],
      },
    ],
  },
  component3_PBA: {
    label: "Performance-Based Activities",
    totalMarks: 20,
    activities: [
      { id: "PBA1", label: "Social Role-Play Gauntlet", marks: 10 },
      { id: "PBA2", label: "The Team Social Challenge", marks: 10 },
      { id: "PBA3", label: "Structured Peer Feedback Circuit", marks: 10 },
    ],
  },
};

export const AQ_QUESTIONS: Record<string, any> = {
  scoringKey: { 1: 0, 2: 0, 3: 1, 4: 2, 5: 3 },
  components: {
    SA: {
      id: "SA",
      label: "Situational Agility",
      weight: 1.5,
      subParams: "Adaptive Problem-Solving • Cognitive Flexibility • Emotional Anchoring",
      desc: "Ability to pivot strategies and maintain stability during crises.",
    },
    PM: {
      id: "PM",
      label: "Proactive Momentum",
      weight: 1.0,
      subParams: "Anticipatory Readiness • Initiative Amplifier • Momentum Sustainment",
      desc: "Ability to prepare for adversity in advance.",
    },
    RR: {
      id: "RR",
      label: "Relational Resilience",
      weight: 1.0,
      subParams: "Collective Synergy • Boundary Navigation • Empathic Advocacy",
      desc: "Ability to leverage networks during crises.",
    },
    RC: {
      id: "RC",
      label: "Regenerative Capacity",
      weight: 1.5,
      subParams: "Energy Restoration • Growth Integration • Future-Proofing",
      desc: "Ability to recover and apply lessons post-adversity.",
    },
  },
  levels: [
    { label: "Resilience Architect", min: 90, max: 100, color: "#10b981" },
    { label: "Dynamic Adaptor", min: 70, max: 89, color: "#06b6d4" },
    { label: "Emerging Resilient", min: 50, max: 69, color: "#f59e0b" },
    { label: "Reactive Responder", min: 0, max: 49, color: "#ef4444" },
  ],
};

export const IQ_QUESTIONS: Record<string, any> = {
  verbal: {
    label: "Verbal Intelligence",
    maxScore: 25,
    sections: [
      {
        title: "Vocabulary",
        type: "mcq",
        questions: [
          {
            q: "Eloquent",
            options: ["Shy", "Expressive and persuasive", "Angry", "Quiet"],
            answer: 1,
          },
          { q: "Perplexed", options: ["Confused", "Happy", "Angry", "Excited"], answer: 0 },
          {
            q: "Meticulous",
            options: ["Careful and precise", "Lazy", "Unorganized", "Quick"],
            answer: 0,
          },
          { q: "Arbitrary", options: ["Random", "Planned", "Important", "Necessary"], answer: 0 },
          { q: "Resilient", options: ["Flexible", "Fragile", "Slow", "Boring"], answer: 0 },
        ],
      },
      {
        title: "General Knowledge",
        type: "open",
        questions: [
          { q: "Who was the first Prime Minister of India?", answer: "jawaharlal nehru" },
          { q: "How many continents are there on Earth?", answer: "7" },
          { q: "What is the chemical symbol for water?", answer: "h2o" },
        ],
      },
      {
        title: "Verbal Reasoning",
        type: "mcq",
        questions: [
          {
            q: "Which word does not belong: Cat, Dog, Car, Rabbit?",
            options: ["Cat", "Dog", "Car", "Rabbit"],
            answer: 2,
          },
          {
            q: 'Which word is opposite of "Generous"?',
            options: ["Mean", "Friendly", "Brave", "Honest"],
            answer: 0,
          },
          {
            q: "Complete: Book is to Reading as Fork is to ___",
            options: ["Kitchen", "Eating", "Cooking", "Spoon"],
            answer: 1,
          },
        ],
      },
    ],
  },
  quantitative: {
    label: "Quantitative Intelligence",
    maxScore: 25,
    sections: [
      {
        title: "Arithmetic",
        type: "open",
        questions: [
          { q: "15 + 28 = ?", answer: "43" },
          { q: "64 − 37 = ?", answer: "27" },
          { q: "8 × 7 = ?", answer: "56" },
          { q: "81 ÷ 9 = ?", answer: "9" },
        ],
      },
      {
        title: "Pattern Recognition",
        type: "mcq",
        questions: [
          { q: "1, 4, 9, 16, ?", options: ["20", "25", "24", "18"], answer: 1 },
          { q: "3, 6, 12, 24, ?", options: ["36", "48", "30", "42"], answer: 1 },
        ],
      },
      {
        title: "Numeric Reasoning",
        type: "open",
        questions: [
          { q: "What is 25% of 80?", answer: "20" },
          { q: "Solve for x: 5x + 7 = 32", answer: "5" },
          { q: "What is the next number: 2, 6, 12, 20, ?", answer: "30" },
        ],
      },
    ],
  },
  psychometric: {
    label: "Psychometric Abilities",
    maxScore: 25,
    sections: [
      {
        title: "Spatial Reasoning",
        type: "open",
        questions: [
          { q: "If you fold a square paper in half diagonally, what shape?", answer: "triangle" },
          { q: "A clock shows 3:00. What is the angle between the hands?", answer: "90" },
        ],
      },
      {
        title: "Abstract Reasoning",
        type: "mcq",
        questions: [
          {
            q: "If BOOK = 2-15-15-11, what does CAT equal?",
            options: ["3-1-20", "3-1-19", "3-2-20", "4-1-20"],
            answer: 0,
          },
          { q: "Which is odd: 2, 3, 5, 7, 9, 11?", options: ["2", "3", "9", "11"], answer: 2 },
        ],
      },
      {
        title: "Critical Analysis",
        type: "open",
        questions: [
          {
            q: "A coin is flipped 5 times and lands heads each time. What is the probability it lands heads on the 6th flip?",
          },
        ],
      },
    ],
  },
  performance: {
    label: "Performance Intelligence",
    maxScore: 25,
    sections: [
      {
        title: "Problem-Solving",
        type: "open",
        questions: [
          {
            q: "You have 8 balls, one heavier. Using a balance scale only twice, how do you find it?",
          },
          { q: "You have a 3L and 5L jug. How do you measure exactly 4L?" },
        ],
      },
      {
        title: "Real-World Application",
        type: "open",
        questions: [
          {
            q: "You are planning a school event for 200 students with ₹10,000. List 3 key decisions.",
          },
        ],
      },
      {
        title: "Creative Intelligence",
        type: "open",
        questions: [{ q: "List 10 unusual uses for a paperclip." }],
      },
    ],
  },
};

export const PRE_INTERVENTION_NODES = [
  {
    id: "intake",
    label: "Intake & Consent",
    desc: "Collect identity, demographics, context, and informed consent.",
    owner: "Administrator",
    artifacts: ["Consent form", "Demographic profile"],
  },
  {
    id: "prepare",
    label: "Prepare Assessment Suite",
    desc: "Assemble instruments for all four pillars.",
    owner: "Assessment Lead",
    artifacts: ["Assessment battery"],
  },
  {
    id: "baseline",
    label: "Baseline Data Collection",
    desc: "Administer full assessment suite.",
    owner: "Evaluator",
    artifacts: ["Raw score sheets"],
  },
  {
    id: "standardize",
    label: "Standardize & Score",
    desc: "Normalize raw results to standardized scales.",
    owner: "Data Analyst",
    artifacts: ["Standardized scoring tables"],
  },
  {
    id: "profile",
    label: "Integrated Profile Construction",
    desc: "Aggregate sub-scores into pillar profiles.",
    owner: "Analyst",
    artifacts: ["Quotient profile", "Radar chart"],
  },
  {
    id: "weighting",
    label: "Dynamic Weightage Algorithm",
    desc: "Apply context-sensitive weights to compute unified score.",
    owner: "Algorithm Engine",
    artifacts: ["Weighted score matrix"],
  },
  {
    id: "banding",
    label: "Banding & Intervention Mapping",
    desc: "Assign grade bands and flag critical parameters.",
    owner: "Counselor",
    artifacts: ["Grade report", "Intervention map"],
  },
];

export const INTERVENTION_NODES = [
  {
    id: "scheduling",
    label: "Scheduling & Resource Allocation",
    desc: "Plan intervention timeline.",
    owner: "Program Manager",
    artifacts: ["6-month roadmap"],
  },
  {
    id: "deployment",
    label: "Module Deployment",
    desc: "Deploy targeted intervention modules.",
    owner: "Facilitator",
    artifacts: ["Module library"],
  },
  {
    id: "capture",
    label: "Session Data Capture",
    desc: "Record engagement metrics.",
    owner: "Data Coordinator",
    artifacts: ["Session logs"],
  },
  {
    id: "progress_eval",
    label: "Progress Evaluation Engine",
    desc: "Run mid-point assessments.",
    owner: "Evaluation Engine",
    artifacts: ["Progress reports"],
  },
  {
    id: "eq_practice",
    label: "Dynamic EQ Integration",
    desc: "Embed real-time emotional regulation practice.",
    owner: "EQ Specialist",
    artifacts: ["EQ practice logs"],
  },
  {
    id: "effectiveness",
    label: "Module Effectiveness Measurement",
    desc: "Evaluate module impact.",
    owner: "Quality Analyst",
    artifacts: ["Effectiveness scores"],
  },
];

export const POST_INTERVENTION_NODES = [
  {
    id: "reassessment",
    label: "Full Reassessment",
    desc: "Administer complete assessment battery.",
    owner: "Evaluator",
    artifacts: ["Post-assessment scores"],
  },
  {
    id: "outcomes",
    label: "Compute Outcomes",
    desc: "Calculate delta values.",
    owner: "Data Analyst",
    artifacts: ["Outcome matrix"],
  },
  {
    id: "synthesis",
    label: "Intervention Effectiveness Synthesis",
    desc: "Synthesize module effectiveness data.",
    owner: "Program Lead",
    artifacts: ["Effectiveness synthesis"],
  },
  {
    id: "idp",
    label: "Final IDP & Maintenance Roadmap",
    desc: "Construct Individual Development Plan.",
    owner: "Counselor",
    artifacts: ["IDP document"],
  },
  {
    id: "career",
    label: "Career Guidance & Recommendations",
    desc: "Generate career path recommendations.",
    owner: "Career Advisor",
    artifacts: ["Career guidance report"],
  },
  {
    id: "knowledge",
    label: "Knowledge Base & Closed-Loop Update",
    desc: "Feed outcomes back into the system.",
    owner: "System Admin",
    artifacts: ["Updated benchmarks"],
  },
];

export const INTERVENTION_MODULES: Record<string, any[]> = {
  IQ: [
    {
      id: "iq_cog",
      label: "Cognitive Strengthening",
      duration: "4 weeks",
      sessions: 8,
      priority: "medium",
    },
    {
      id: "iq_prob",
      label: "Problem-Solving Intensive",
      duration: "3 weeks",
      sessions: 6,
      priority: "high",
    },
    {
      id: "iq_crit",
      label: "Critical Thinking Workshop",
      duration: "2 weeks",
      sessions: 4,
      priority: "medium",
    },
  ],
  EQ: [
    {
      id: "eq_pause",
      label: "The Pause Button (Stop-Think-Act)",
      duration: "6 weeks",
      sessions: 12,
      priority: "high",
    },
    {
      id: "eq_aware",
      label: "Emotional Awareness Journey",
      duration: "4 weeks",
      sessions: 8,
      priority: "high",
    },
    {
      id: "eq_empathy",
      label: "Empathy & Social Attunement",
      duration: "3 weeks",
      sessions: 6,
      priority: "medium",
    },
  ],
  SQ: [
    {
      id: "sq_collab",
      label: "Collaboration Dynamics",
      duration: "4 weeks",
      sessions: 8,
      priority: "high",
    },
    {
      id: "sq_comm",
      label: "Communication Mastery",
      duration: "3 weeks",
      sessions: 6,
      priority: "medium",
    },
    {
      id: "sq_social",
      label: "Social Awareness Training",
      duration: "2 weeks",
      sessions: 4,
      priority: "medium",
    },
  ],
  AQ: [
    {
      id: "aq_resilience",
      label: "Resilience Foundations",
      duration: "6 weeks",
      sessions: 12,
      priority: "high",
    },
    {
      id: "aq_adapt",
      label: "Adaptability & Anticipation",
      duration: "4 weeks",
      sessions: 8,
      priority: "high",
    },
    {
      id: "aq_persist",
      label: "Persistence & Grit Coaching",
      duration: "3 weeks",
      sessions: 6,
      priority: "medium",
    },
  ],
};

export const CAREER_PROFILES = [
  {
    id: "specialist",
    label: "Specialist / Technical Track",
    condition: "High IQ + Lower AQ",
    desc: "Deep expertise in a focused domain.",
    roles: ["Research Scientist", "Software Engineer", "Data Analyst", "Financial Analyst"],
  },
  {
    id: "leader",
    label: "Leadership / People-Facing Track",
    condition: "High EQ + High SQ",
    desc: "Natural people leader.",
    roles: ["HR Director", "Counselor", "Team Lead", "Customer Success Manager"],
  },
  {
    id: "versatile",
    label: "Versatile / Multidisciplinary Path",
    condition: "Balanced High Scores",
    desc: "Adaptable generalist.",
    roles: ["Entrepreneur", "Consultant", "Product Manager"],
  },
  {
    id: "resilient",
    label: "Resilience-Heavy / Adaptive Track",
    condition: "Strong AQ",
    desc: "Built for high-pressure environments.",
    roles: ["Crisis Manager", "Emergency Services", "Startup Founder"],
  },
  {
    id: "creative",
    label: "Creative / Innovation Track",
    condition: "High IQ + High EQ",
    desc: "Combines cognitive power with emotional intelligence.",
    roles: ["UX Designer", "Creative Director", "Innovation Lead"],
  },
];

export const SKILL_SHAPES = [
  { id: "T", label: "T-Shaped", desc: "Deep expertise in one area with broad knowledge." },
  { id: "I", label: "I-Shaped", desc: "Deep specialist with narrow expertise." },
  { id: "X", label: "X-Shaped", desc: "Cross-functional leader with depth in multiple areas." },
  { id: "M", label: "M-Shaped", desc: "Multi-specialist with mastery in several domains." },
];

export const DEMO_SCORES: Record<string, Record<string, number>> = {
  IQ: { verbal: 20, quantitative: 18, psychometric: 22, performance: 17 },
  EQ: { SA: 8, ER: 7, SM: 8, E: 7, IS: 8 },
  SQ: { ACE: 14, CSI: 7, PBA: 13 },
  AQ: { SA: 14, PM: 11, RR: 12, RC: 13 },
};

export const DEMO_POST_SCORES: Record<string, Record<string, number>> = {
  IQ: { verbal: 23, quantitative: 21, psychometric: 24, performance: 20 },
  EQ: { SA: 9, ER: 9, SM: 9, E: 9, IS: 9 },
  SQ: { ACE: 17, CSI: 9, PBA: 17 },
  AQ: { SA: 17, PM: 15, RR: 16, RC: 17 },
};

export const IQ_MAX_SCORE = 125;
export const IQ_STATIC_MAX = 100;
export const IQ_AI_MAX = 16;
export const IQ_VISUAL_MAX = 9;

export function mapAQLikert(val: number) {
  if (val <= 2) return 0;
  if (val === 3) return 1;
  if (val === 4) return 2;
  return 3;
}

export const AQ_RD_MAX = 95;

export function computeAQScore(aqScores: Record<string, any>) {
  const weights = { SA: 1.5, PM: 1.0, RR: 1.0, RC: 1.5 };
  let rdScore = 0;
  Object.entries(weights).forEach(([comp, w]) => {
    const partAScores = aqScores[comp]?.partA || {};
    const partAMarks = Object.values(partAScores).reduce(
      (s: number, v: any) => s + mapAQLikert(v || 0),
      0,
    );
    const partBScores = aqScores[comp]?.partB || {};
    const partBMarks = Object.values(partBScores).reduce((s: number, v: any) => s + (v || 0), 0);
    const raw = Math.min(partAMarks + partBMarks, 19);
    rdScore += raw * w;
  });
  return Math.round((rdScore / AQ_RD_MAX) * 100);
}

export function computeStandardized(raw: number, max: number) {
  if (!max) return 0;
  return Math.round((raw / max) * 100);
}

export function computePillarScore(pillarId: string, scores: Record<string, any>) {
  const pillar = PILLARS[pillarId];
  if (pillarId === "IQ") {
    const totalRaw = pillar.subParams.reduce((s, p) => s + (scores[p.id] || 0), 0);
    const aiBonus = scores._aiBonus || 0;
    const visualBonus = scores._visualBonus || 0;
    return Math.min(totalRaw + aiBonus + visualBonus, IQ_MAX_SCORE);
  }
  if (pillarId === "EQ") {
    const totalRaw = pillar.subParams.reduce((s, p) => s + (scores[p.id] || 0), 0);
    const totalMax = pillar.subParams.reduce((s, p) => s + p.max, 0);
    return computeStandardized(totalRaw, totalMax);
  }
  if (pillarId === "SQ") {
    const totalRaw = (scores.ACE || 0) + (scores.CSI || 0) + (scores.PBA || 0);
    return computeStandardized(totalRaw, 50);
  }
  if (pillarId === "AQ") {
    const rdWeights = { SA: 1.5, PM: 1.0, RR: 1.0, RC: 1.5 };
    const rdScore = Object.entries(rdWeights).reduce(
      (sum, [comp, w]) => sum + (scores[comp] || 0) * w,
      0,
    );
    return Math.round((rdScore / 95) * 100);
  }
  const totalMax = pillar.subParams.reduce((s, p) => s + p.max, 0);
  const totalRaw = pillar.subParams.reduce((s, p) => s + (scores[p.id] || 0), 0);
  return computeStandardized(totalRaw, totalMax);
}

export function computeWeightedScore(pillarScores: Record<string, number>) {
  const iqNormalized = Math.min(Math.round(((pillarScores.IQ || 0) / IQ_MAX_SCORE) * 100), 100);
  const weighted =
    iqNormalized * WEIGHTS.IQ +
    (pillarScores.EQ || 0) * WEIGHTS.EQ +
    (pillarScores.SQ || 0) * WEIGHTS.SQ +
    (pillarScores.AQ || 0) * WEIGHTS.AQ;
  return Math.round(weighted / MAX_WEIGHT_SUM);
}

export function getGrade(score: number) {
  return GRADE_BANDS.find((b) => score >= b.min && score <= b.max) || GRADE_BANDS[4];
}

export function isCritical(score: number) {
  return score < 60;
}

export function getSkillShape(pillarScores: Record<string, number>) {
  const vals = Object.values(pillarScores);
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  const highCount = vals.filter((v) => v >= 75).length;
  if (highCount >= 3) return "M";
  if (max - min < 15 && avg >= 70) return "X";
  if (highCount === 1) return "I";
  return "T";
}

export function getCareerProfile(pillarScores: Record<string, number>) {
  const { IQ, EQ, SQ, AQ } = pillarScores;
  if (EQ >= 75 && SQ >= 75) return CAREER_PROFILES[1];
  if (IQ >= 75 && AQ < 60) return CAREER_PROFILES[0];
  if (AQ >= 75) return CAREER_PROFILES[3];
  if (IQ >= 75 && EQ >= 75) return CAREER_PROFILES[4];
  const avg = (IQ + EQ + SQ + AQ) / 4;
  if (avg >= 70) return CAREER_PROFILES[2];
  return CAREER_PROFILES[0];
}

export function computeEQScore(eqScores: Record<string, any>) {
  let total = 0;
  ["SA", "ER", "SM", "E", "IS"].forEach((k) => {
    total += (eqScores[k]?.partA || 0) + (eqScores[k]?.partB || 0);
  });
  return Math.round((total / 50) * 100);
}

export function computeSQScore(sqScores: Record<string, any>) {
  const raw = (sqScores.ACE || 0) + (sqScores.CSI || 0) + (sqScores.PBA || 0);
  return Math.round((raw / 50) * 100);
}
