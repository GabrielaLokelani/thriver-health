export interface Condition {
  id: string;
  name: string;
  description: string;
  category: 'cancer' | 'autoimmune' | 'mental-health' | 'cardiovascular' | 'neurological' | 'digestive' | 'endocrine' | 'respiratory';
  severity: 'mild' | 'moderate' | 'severe';
  symptoms: string[];
  conventionalTreatments: string[];
  alternativeTreatments: string[];
  researchLevel: 'established' | 'emerging' | 'experimental';
  image?: string;
}

export interface Treatment {
  id: string;
  name: string;
  description: string;
  type: 'supplement' | 'therapy' | 'procedure' | 'lifestyle' | 'medication';
  conditions: string[];
  effectiveness: number; // 1-10
  sideEffects: string[];
  cost: 'free' | 'low' | 'medium' | 'high';
  researchLevel: 'established' | 'emerging' | 'experimental';
  image?: string;
}

export const conditions: Condition[] = [
  {
    id: 'prostate-cancer',
    name: 'Prostate Cancer',
    description: 'Cancer that occurs in the prostate gland, a small walnut-shaped gland in men that produces seminal fluid.',
    category: 'cancer',
    severity: 'severe',
    symptoms: ['Elevated PSA', 'Frequent urination', 'Weak urine flow', 'Blood in urine', 'Erectile dysfunction'],
    conventionalTreatments: ['Radiation therapy', 'Hormone therapy', 'Chemotherapy', 'Surgery'],
    alternativeTreatments: ['Ivermectin', 'Vitamin D', 'Curcumin', 'Green tea extract', 'Pomegranate extract'],
    researchLevel: 'established'
  },
  {
    id: 'multiple-sclerosis',
    name: 'Multiple Sclerosis',
    description: 'A disease that affects the central nervous system, causing communication problems between the brain and body.',
    category: 'neurological',
    severity: 'severe',
    symptoms: ['Fatigue', 'Mobility issues', 'Vision problems', 'Cognitive fog', 'Numbness', 'Tremors'],
    conventionalTreatments: ['Disease-modifying drugs', 'Corticosteroids', 'Physical therapy'],
    alternativeTreatments: ['Stem cell therapy', 'Vitamin D', 'Omega-3', 'Cannabis', 'Acupuncture'],
    researchLevel: 'emerging'
  },
  {
    id: 'anxiety',
    name: 'Anxiety Disorders',
    description: 'Mental health conditions characterized by excessive worry, fear, and nervousness.',
    category: 'mental-health',
    severity: 'moderate',
    symptoms: ['Excessive worry', 'Panic attacks', 'Sleep problems', 'Physical tension', 'Irritability'],
    conventionalTreatments: ['SSRIs', 'Benzodiazepines', 'Cognitive behavioral therapy'],
    alternativeTreatments: ['CBD oil', 'Meditation', 'Breathwork', 'L-theanine', 'Ashwagandha'],
    researchLevel: 'established'
  },
  {
    id: 'depression',
    name: 'Depression',
    description: 'A mood disorder that causes persistent feelings of sadness and loss of interest.',
    category: 'mental-health',
    severity: 'moderate',
    symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Sleep changes', 'Appetite changes'],
    conventionalTreatments: ['Antidepressants', 'Psychotherapy', 'ECT'],
    alternativeTreatments: ['St. John\'s Wort', 'SAM-e', 'Omega-3', 'Exercise', 'Light therapy'],
    researchLevel: 'established'
  },
  {
    id: 'diabetes',
    name: 'Type 2 Diabetes',
    description: 'A chronic condition affecting how your body metabolizes glucose.',
    category: 'endocrine',
    severity: 'moderate',
    symptoms: ['Increased thirst', 'Frequent urination', 'Fatigue', 'Blurred vision', 'Slow healing'],
    conventionalTreatments: ['Metformin', 'Insulin', 'Lifestyle changes'],
    alternativeTreatments: ['Berberine', 'Cinnamon', 'Chromium', 'Low-carb diet', 'Exercise'],
    researchLevel: 'established'
  },
  {
    id: 'autoimmune-disease',
    name: 'Autoimmune Diseases',
    description: 'Conditions where the immune system attacks healthy body tissues.',
    category: 'autoimmune',
    severity: 'moderate',
    symptoms: ['Fatigue', 'Joint pain', 'Inflammation', 'Skin rashes', 'Digestive issues'],
    conventionalTreatments: ['Immunosuppressants', 'Corticosteroids', 'Biologics'],
    alternativeTreatments: ['Vitamin D', 'Omega-3', 'Probiotics', 'Anti-inflammatory diet', 'Stress reduction'],
    researchLevel: 'emerging'
  },
  {
    id: 'heart-disease',
    name: 'Cardiovascular Disease',
    description: 'Conditions affecting the heart and blood vessels.',
    category: 'cardiovascular',
    severity: 'severe',
    symptoms: ['Chest pain', 'Shortness of breath', 'Fatigue', 'Swelling', 'Irregular heartbeat'],
    conventionalTreatments: ['Statins', 'Beta blockers', 'ACE inhibitors', 'Surgery'],
    alternativeTreatments: ['CoQ10', 'Omega-3', 'Garlic', 'Exercise', 'Meditation'],
    researchLevel: 'established'
  },
  {
    id: 'fibromyalgia',
    name: 'Fibromyalgia',
    description: 'A disorder characterized by widespread musculoskeletal pain.',
    category: 'autoimmune',
    severity: 'moderate',
    symptoms: ['Widespread pain', 'Fatigue', 'Sleep problems', 'Cognitive issues', 'Stiffness'],
    conventionalTreatments: ['Pain medications', 'Antidepressants', 'Physical therapy'],
    alternativeTreatments: ['Acupuncture', 'Massage', 'Yoga', 'Magnesium', 'Vitamin D'],
    researchLevel: 'emerging'
  },
  {
    id: 'ibs',
    name: 'Irritable Bowel Syndrome',
    description: 'A common disorder affecting the large intestine.',
    category: 'digestive',
    severity: 'mild',
    symptoms: ['Abdominal pain', 'Bloating', 'Diarrhea', 'Constipation', 'Gas'],
    conventionalTreatments: ['Fiber supplements', 'Antispasmodics', 'Laxatives'],
    alternativeTreatments: ['Probiotics', 'Peppermint oil', 'Low FODMAP diet', 'Stress reduction'],
    researchLevel: 'established'
  },
  {
    id: 'chronic-fatigue',
    name: 'Chronic Fatigue Syndrome',
    description: 'A complex disorder characterized by extreme fatigue.',
    category: 'autoimmune',
    severity: 'moderate',
    symptoms: ['Severe fatigue', 'Sleep problems', 'Cognitive issues', 'Muscle pain', 'Headaches'],
    conventionalTreatments: ['Graded exercise therapy', 'Cognitive behavioral therapy'],
    alternativeTreatments: ['Vitamin B12', 'CoQ10', 'Acupuncture', 'Rest', 'Stress management'],
    researchLevel: 'emerging'
  }
];

export const treatments: Treatment[] = [
  {
    id: 'ivermectin',
    name: 'Ivermectin',
    description: 'An antiparasitic medication with potential anti-cancer and anti-inflammatory properties.',
    type: 'medication',
    conditions: ['prostate-cancer', 'autoimmune-disease'],
    effectiveness: 8,
    sideEffects: ['Mild nausea', 'Dizziness', 'Headache'],
    cost: 'low',
    researchLevel: 'emerging'
  },
  {
    id: 'stem-cell-therapy',
    name: 'Stem Cell Therapy',
    description: 'Treatment using stem cells to repair damaged tissues and organs.',
    type: 'procedure',
    conditions: ['multiple-sclerosis', 'autoimmune-disease', 'chronic-fatigue'],
    effectiveness: 9,
    sideEffects: ['Initial fatigue', 'Mild fever', 'Infection risk'],
    cost: 'high',
    researchLevel: 'emerging'
  },
  {
    id: 'cbd-oil',
    name: 'CBD Oil',
    description: 'Cannabidiol oil derived from cannabis with potential therapeutic benefits.',
    type: 'supplement',
    conditions: ['anxiety', 'depression', 'chronic-fatigue', 'fibromyalgia'],
    effectiveness: 7,
    sideEffects: ['Mild drowsiness', 'Dry mouth', 'Appetite changes'],
    cost: 'medium',
    researchLevel: 'emerging'
  },
  {
    id: 'vitamin-d',
    name: 'Vitamin D',
    description: 'Essential vitamin with immune system and bone health benefits.',
    type: 'supplement',
    conditions: ['autoimmune-disease', 'multiple-sclerosis', 'depression', 'diabetes'],
    effectiveness: 8,
    sideEffects: ['None at normal doses'],
    cost: 'low',
    researchLevel: 'established'
  },
  {
    id: 'berberine',
    name: 'Berberine',
    description: 'Natural compound with blood sugar and cholesterol regulating properties.',
    type: 'supplement',
    conditions: ['diabetes', 'heart-disease'],
    effectiveness: 8,
    sideEffects: ['Digestive upset', 'Headache'],
    cost: 'low',
    researchLevel: 'emerging'
  },
  {
    id: 'coq10',
    name: 'Coenzyme Q10',
    description: 'Antioxidant that helps produce energy in cells.',
    type: 'supplement',
    conditions: ['heart-disease', 'chronic-fatigue', 'fibromyalgia'],
    effectiveness: 7,
    sideEffects: ['Mild digestive upset'],
    cost: 'medium',
    researchLevel: 'established'
  },
  {
    id: 'probiotics',
    name: 'Probiotics',
    description: 'Beneficial bacteria that support gut health.',
    type: 'supplement',
    conditions: ['ibs', 'autoimmune-disease', 'anxiety'],
    effectiveness: 7,
    sideEffects: ['Mild bloating initially'],
    cost: 'low',
    researchLevel: 'established'
  },
  {
    id: 'acupuncture',
    name: 'Acupuncture',
    description: 'Traditional Chinese medicine technique using thin needles.',
    type: 'therapy',
    conditions: ['fibromyalgia', 'chronic-fatigue', 'anxiety', 'ibs'],
    effectiveness: 6,
    sideEffects: ['Minor bruising', 'Slight pain'],
    cost: 'medium',
    researchLevel: 'established'
  },
  {
    id: 'meditation',
    name: 'Meditation',
    description: 'Mindfulness practice for stress reduction and mental clarity.',
    type: 'lifestyle',
    conditions: ['anxiety', 'depression', 'chronic-fatigue', 'ibs'],
    effectiveness: 8,
    sideEffects: ['None'],
    cost: 'free',
    researchLevel: 'established'
  },
  {
    id: 'exercise',
    name: 'Exercise',
    description: 'Physical activity for overall health and wellness.',
    type: 'lifestyle',
    conditions: ['diabetes', 'heart-disease', 'depression', 'anxiety'],
    effectiveness: 9,
    sideEffects: ['Muscle soreness', 'Fatigue'],
    cost: 'free',
    researchLevel: 'established'
  }
];

export const getConditionById = (id: string): Condition | undefined => {
  return conditions.find(condition => condition.id === id);
};

export const getTreatmentsByCondition = (conditionId: string): Treatment[] => {
  return treatments.filter(treatment => treatment.conditions.includes(conditionId));
};

export const getConditionsByCategory = (category: string): Condition[] => {
  return conditions.filter(condition => condition.category === category);
};

export const getTreatmentsByType = (type: string): Treatment[] => {
  return treatments.filter(treatment => treatment.type === type);
};

export const getEstablishedTreatments = (): Treatment[] => {
  return treatments.filter(treatment => treatment.researchLevel === 'established');
};

export const getEmergingTreatments = (): Treatment[] => {
  return treatments.filter(treatment => treatment.researchLevel === 'emerging');
}; 