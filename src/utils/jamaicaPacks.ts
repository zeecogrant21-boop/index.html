/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import { ParishInfo } from '../types/database';

export interface RawKnowledgeItem {
  q: string;
  a: string;
  pack: string;
  category: 'English' | 'Maths' | 'Science' | 'Agri' | 'Reading' | 'Coding' | 'Health' | 'Wealth' | 'History' | 'World Events' | 'Parishes & Culture';
  tags: string[];
  isImmutable?: boolean;
}

// 14 Parishes of Jamaica with complete factual records
export const JAMAICA_PARISHES: ParishInfo[] = [
  {
    name: 'Kingston',
    capital: 'Kingston',
    county: 'Surrey',
    areaSqKm: 22.7,
    populationApprox: '90,000 (Metropolitan Area 670,000 with St. Andrew)',
    famousFor: 'Capital city, cultural heart of Jamaica, Port Royal, National Gallery, Sabina Park, Ward Theatre',
    history: 'Founded in 1692 following the catastrophic Port Royal earthquake as a refuge for survivors; became the official capital of Jamaica in 1872, succeeding Spanish Town.',
    notableAttractions: ['Port Royal & Fort Charles', 'National Gallery of Jamaica', 'Trench Town Culture Yard', 'Sabina Park', 'Institute of Jamaica']
  },
  {
    name: 'St. Andrew',
    capital: 'Half Way Tree',
    county: 'Surrey',
    areaSqKm: 434.5,
    populationApprox: '575,000',
    famousFor: 'Half Way Tree, University of the West Indies Mona, Bob Marley Museum, Hope Botanical Gardens, Devon House',
    history: 'One of the first parishes established by the English in 1664; surrounded Kingston and experienced rapid urbanization in the 20th century.',
    notableAttractions: ['Bob Marley Museum at 56 Hope Road', 'Devon House (mansion of George Stiebel, Jamaica’s first black millionaire)', 'Hope Royal Botanical Gardens', 'UWI Mona Campus', 'Blue and John Crow Mountains']
  },
  {
    name: 'St. Thomas',
    capital: 'Morant Bay',
    county: 'Surrey',
    areaSqKm: 742.8,
    populationApprox: '94,000',
    famousFor: '1865 Morant Bay Rebellion led by Paul Bogle, Bath Fountain mineral springs, sugar and banana estates',
    history: 'Site of the historic October 1865 Morant Bay Rebellion protesting injustice and poverty, which resulted in Jamaica becoming a British Crown Colony.',
    notableAttractions: ['Morant Bay Courthouse & Paul Bogle Monument', 'Bath Mineral Springs & Botanical Gardens', 'Morant Point Lighthouse (oldest in Jamaica, 1841)', 'Yallahs Ponds']
  },
  {
    name: 'Portland',
    capital: 'Port Antonio',
    county: 'Surrey',
    areaSqKm: 814.0,
    populationApprox: '82,000',
    famousFor: 'Jerk pork/chicken birthplace (Boston Bay), Blue Lagoon, Frenchman’s Cove, Rio Grande rafting, Errol Flynn legacy',
    history: 'Named after the Duke of Portland, Governor of Jamaica in 1723. Renowned historically as the center of the banana boom in late 19th/early 20th century.',
    notableAttractions: ['Boston Bay (cradle of authentic jerk)', 'Blue Lagoon (formerly The Blue Hole)', 'Rio Grande Bamboo Rafting', 'Reach Falls', 'Frenchman’s Cove Beach']
  },
  {
    name: 'St. Mary',
    capital: 'Port Maria',
    county: 'Middlesex',
    areaSqKm: 610.5,
    populationApprox: '114,000',
    famousFor: 'Tacky’s 1760 rebellion, Ian Fleming Goldeneye (James Bond creation), Noel Coward Firefly, banana export history',
    history: 'Site of Tacky’s Revolt in Easter 1760, one of the greatest slave rebellions in the British Empire. Historically rich in agricultural estates.',
    notableAttractions: ['Firefly Estate (Noel Coward)', 'GoldenEye (Ian Fleming’s sanctuary)', 'Castleton Botanical Gardens', 'Sun Valley Plantation', 'Pagee Beach']
  },
  {
    name: 'St. Ann',
    capital: 'St. Ann’s Bay',
    county: 'Middlesex',
    areaSqKm: 1212.6,
    populationApprox: '173,000',
    famousFor: 'Garden Parish, birthplace of Bob Marley (Nine Mile) & Marcus Garvey, Dunn’s River Falls, Ocho Rios, Seville Heritage Park',
    history: 'Where Christopher Columbus first made landfall in Jamaica in May 1494. Known as the Garden Parish for its lush vegetation and bauxite deposits.',
    notableAttractions: ['Dunn’s River Falls', 'Nine Mile (Bob Marley Mausoleum)', 'Mystic Mountain & Dolphin Cove', 'Green Grotto Caves', 'Seville Heritage Park']
  },
  {
    name: 'Trelawny',
    capital: 'Falmouth',
    county: 'Cornwall',
    areaSqKm: 874.6,
    populationApprox: '75,000',
    famousFor: 'Birthplace of Usain Bolt (Sherwood Content), Georgian architecture of Falmouth, Cockpit Country, Glistening Waters luminous lagoon',
    history: 'Formed in 1770 from St. James; named after Sir William Trelawny. Center of wealthy sugar plantations in 18th century and Maroons in the Cockpit Country.',
    notableAttractions: ['Historic Georgian Falmouth & Cruise Port', 'Glistening Waters (Luminous Lagoon)', 'Cockpit Country Wilderness', 'Martha Brae River Rafting', 'Usain Bolt Tracks & Records Heritage']
  },
  {
    name: 'St. James',
    capital: 'Montego Bay',
    county: 'Cornwall',
    areaSqKm: 595.0,
    populationApprox: '185,000',
    famousFor: 'Montego Bay (Jamaica’s second city & tourism capital), Sam Sharpe 1831 Christmas Rebellion, Rose Hall Great House, Reggae Sumfest',
    history: 'Site of the monumental 1831 Baptist War / Christmas Rebellion led by National Hero Samuel Sharpe, which hastened the British Abolition of Slavery in 1834.',
    notableAttractions: ['Rose Hall Great House (White Witch legend)', 'Doctor’s Cave Beach', 'Sam Sharpe Square & The Cage', 'Hip Strip (Gloucester Avenue)', 'Rocklands Bird Sanctuary']
  },
  {
    name: 'Hanover',
    capital: 'Lucea',
    county: 'Cornwall',
    areaSqKm: 450.4,
    populationApprox: '70,000',
    famousFor: 'Lucea harbour, Fort Charlotte, Tryall Golf Club, Dolphin Head mountain, famous Lucea yams',
    history: 'Created on November 12, 1723; named for the British monarch King George I of the House of Hanover. Renowned for its calm deepwater harbour.',
    notableAttractions: ['Fort Charlotte (1761)', 'Lucea Town Hall & Clocktower', 'Tryall Club & Great House', 'Bloody Bay & Point Village', 'Dolphin Head Mountain']
  },
  {
    name: 'Westmoreland',
    capital: 'Savanna-la-Mar',
    county: 'Cornwall',
    areaSqKm: 807.0,
    populationApprox: '145,000',
    famousFor: 'Negril Seven Mile Beach, Negril Lighthouse, Frome Sugar Factory (1938 labor riots), Bluefields Bay (Peter Tosh birthplace)',
    history: 'Established in 1703; named as the westernmost parish in Jamaica. Key sugar hub where the historic 1938 Frome strikes ignited the modern Jamaican labor movement.',
    notableAttractions: ['Negril Seven Mile Beach & West End Cliffs', 'Rick’s Cafe (cliff jumping & sunsets)', 'Peter Tosh Memorial at Belmont', 'Roaring River Park & Caves', 'Frome Sugar Estate']
  },
  {
    name: 'St. Elizabeth',
    capital: 'Black River',
    county: 'Cornwall',
    areaSqKm: 1211.4,
    populationApprox: '151,000',
    famousFor: 'Breadbasket of Jamaica, Black River Safari (crocodiles), YS Falls, Appleton Estate Rum Tour, Lovers’ Leap, Accompong Maroons',
    history: 'One of the oldest parishes in Jamaica. Black River was the first town in Jamaica to be lit by electricity in 1893. Home of the sovereign Accompong Maroon town.',
    notableAttractions: ['Black River Safari & Mangroves', 'Appleton Estate Rum Experience', 'YS Falls', 'Lovers’ Leap cliff (1,700-foot drop)', 'Accompong Maroon Village']
  },
  {
    name: 'Manchester',
    capital: 'Mandeville',
    county: 'Middlesex',
    areaSqKm: 830.1,
    populationApprox: '190,000',
    famousFor: 'Mandeville cool climate, bauxite mining (Kirkvine/Windalco), Northern Caribbean University (NCU), citrus production',
    history: 'Formed in 1814; named after the Duke of Manchester. Elevated on a limestone plateau over 2,000 feet, giving it a distinctive temperate climate.',
    notableAttractions: ['Historic Mandeville Square & Courthouse', 'Cecil Charlton Park', 'Northern Caribbean University', 'Marshall’s Pen Sanctuary', 'Roxborough (birthplace of Norman Manley)']
  },
  {
    name: 'Clarendon',
    capital: 'May Pen',
    county: 'Middlesex',
    areaSqKm: 1196.3,
    populationApprox: '246,000',
    famousFor: 'Milk River Mineral Bath (highest natural radioactivity), Jamalco bauxite, citrus estates, Portland Point Lighthouse',
    history: 'Formed in 1664; named in honor of Lord Chancellor Edward Hyde, First Earl of Clarendon. Key sugar production center along the Rio Minho valley.',
    notableAttractions: ['Milk River Mineral Bath & Spa', 'Portland Point (southernmost tip of Jamaica)', 'Halse Hall Great House', 'Denbigh Agricultural Showgrounds', 'Salt River Mineral Springs']
  },
  {
    name: 'St. Catherine',
    capital: 'Spanish Town',
    county: 'Middlesex',
    areaSqKm: 1192.4,
    populationApprox: '516,000',
    famousFor: 'Spanish Town (first capital of Jamaica from 1534 to 1872), Flat Bridge across Rio Cobre, Rodney Memorial, Caymanas Park horse racing',
    history: 'Established in 1534 by the Spanish as Villa de la Vega (Spanish Town); served as Jamaica’s premier administrative and legislative capital for 338 years.',
    notableAttractions: ['Spanish Town Emancipation Square & Rodney Memorial', 'St. Jago de la Vega Cathedral (oldest Anglican cathedral in the Caribbean)', 'Historic Flat Bridge & Bog Walk Gorge', 'Caymanas Park Horse Racing', 'Two Sisters Cave (Hellshire)']
  }
];

// Master Preloaded Knowledge Packs: 100% Pinned, Immutable, and Protected Against Deletion
export const MASTER_KNOWLEDGE_PACKS: RawKnowledgeItem[] = [
  // -------------------------------------------------------------
  // 1. ENGLISH & LANGUAGE ARTS
  // -------------------------------------------------------------
  {
    q: 'What are the eight traditional parts of speech in English grammar?',
    a: 'The eight traditional parts of speech are: 1) Noun (person, place, thing, or idea), 2) Pronoun (replaces a noun), 3) Verb (expresses action or state of being), 4) Adjective (modifies a noun), 5) Adverb (modifies a verb, adjective, or another adverb), 6) Preposition (shows spatial or temporal relationships), 7) Conjunction (connects words, phrases, or clauses), and 8) Interjection (expresses sudden emotion).',
    pack: 'EnglishGrammarMaster.kt',
    category: 'English',
    tags: ['grammar', 'parts-of-speech', 'language', 'syntax'],
    isImmutable: true
  },
  {
    q: 'What is the difference between active voice and passive voice in English syntax?',
    a: 'In active voice, the subject performs the action of the verb (e.g., "Zeeco Grant coded the supreme Main Brain"). In passive voice, the subject receives the action, and the agent is introduced with a preposition or omitted (e.g., "The supreme Main Brain was coded by Zeeco Grant"). Active voice offers greater directness, clarity, and conciseness.',
    pack: 'EnglishSyntaxAdvanced.kt',
    category: 'English',
    tags: ['grammar', 'voice', 'syntax', 'composition'],
    isImmutable: true
  },
  {
    q: 'What are the core figures of speech and literary devices in English composition?',
    a: 'Key literary devices include: 1) Metaphor (direct comparison without "like" or "as"), 2) Simile (comparison using "like" or "as"), 3) Personification (attributing human qualities to non-human entities), 4) Hyperbole (deliberate exaggeration for emphasis), 5) Onomatopoeia (words imitating sounds, like "buzz" or "crash"), 6) Alliteration (repetition of initial consonant sounds), 7) Oxymoron (juxtaposition of contradictory terms), and 8) Irony (discrepancy between expectation and reality).',
    pack: 'EnglishLiteraryDevices.kt',
    category: 'English',
    tags: ['figures-of-speech', 'rhetoric', 'writing', 'composition'],
    isImmutable: true
  },
  {
    q: 'How does Jamaican Patois (Patwa) operate as a rule-governed creole language?',
    a: 'Jamaican Creole (Patwa) is an English-lexified creole with West African (primarily Akan/Twi, Igbo, and Yoruba) syntactic substrates. Key linguistic features include: lack of inflectional verb endings (tense marked by particles: "did" for past, "a" for continuous progressive), absence of gendered third-person pronouns ("im" or "dem"), reduplication for emphasis ("chaka-chaka", "fenke-fenke"), and nasalized vowels.',
    pack: 'JamaicanLinguisticsPatwa.kt',
    category: 'English',
    tags: ['patois', 'linguistics', 'creole', 'caribbean'],
    isImmutable: true
  },

  // -------------------------------------------------------------
  // 2. MATHEMATICS & COMPUTATION
  // -------------------------------------------------------------
  {
    q: 'What is 2+2?',
    a: '2 + 2 = 4. In elementary Peano arithmetic and standard integer number theory, adding two units to two units yields four units.',
    pack: 'MathFoundationsArithmetic.kt',
    category: 'Maths',
    tags: ['arithmetic', 'addition', 'elementary', 'foundations'],
    isImmutable: true
  },
  {
    q: 'What is the quadratic formula and how does the discriminant predict roots?',
    a: 'For any quadratic equation ax² + bx + c = 0 (where a ≠ 0), the roots are given by x = (-b ± √(b² - 4ac)) / (2a). The discriminant Δ = b² - 4ac determines the nature of the roots: If Δ > 0, there are two distinct real roots; if Δ = 0, there is exactly one repeated real root; if Δ < 0, there are two complex conjugate roots with no real solutions.',
    pack: 'MathAlgebraQuadratics.kt',
    category: 'Maths',
    tags: ['algebra', 'quadratics', 'discriminant', 'polynomials'],
    isImmutable: true
  },
  {
    q: 'How is Jamaican General Consumption Tax (GCT) calculated at the statutory 15% rate?',
    a: 'In Jamaica, standard General Consumption Tax (GCT) is levied at 15% on taxable goods and services. Formula: GCT Amount = Subtotal × 0.15; Grand Total = Subtotal × 1.15. For example, on a subtotal of JMD $10,000, GCT is $1,500, resulting in an invoice total of JMD $11,500.',
    pack: 'JamaicanTaxationGCT.kt',
    category: 'Maths',
    tags: ['taxation', 'gct', 'percentages', 'finance', 'economy'],
    isImmutable: true
  },
  {
    q: 'What is the Pythagorean Theorem and the foundational trigonometric ratios?',
    a: 'In a right-angled triangle with legs a and b and hypotenuse c, a² + b² = c². The fundamental trigonometric ratios are: Sine (sin θ = Opposite / Hypotenuse), Cosine (cos θ = Adjacent / Hypotenuse), and Tangent (tan θ = Opposite / Adjacent = sin θ / cos θ). The fundamental Pythagorean trigonometric identity is sin² θ + cos² θ = 1.',
    pack: 'MathTrigonometryGeometry.kt',
    category: 'Maths',
    tags: ['pythagoras', 'geometry', 'trigonometry', 'triangles'],
    isImmutable: true
  },
  {
    q: 'What is compound interest and the formula for exponential capital accumulation?',
    a: 'Compound interest calculates interest on both the initial principal and accumulated interest over successive periods. Formula: A = P(1 + r/n)^(nt), where A = final accumulated balance, P = principal, r = annual interest rate, n = compounding frequency per year, and t = time in years. Continuous compounding uses the limit formula A = Pe^(rt).',
    pack: 'MathFinancialCalculus.kt',
    category: 'Maths',
    tags: ['compound-interest', 'finance', 'wealth', 'exponential-growth'],
    isImmutable: true
  },

  // -------------------------------------------------------------
  // 3. SCIENCE & NATURAL SYSTEMS
  // -------------------------------------------------------------
  {
    q: 'What is cellular respiration and the biochemical role of mitochondria?',
    a: 'Cellular respiration is the metabolic pathway that converts glucose and oxygen into usable adenosine triphosphate (ATP), releasing carbon dioxide and water: C6H12O6 + 6O2 → 6CO2 + 6H2O + 36-38 ATP. Mitochondria are the organelles that house the Krebs (citric acid) cycle and the electron transport chain, generating the vast majority of cellular energy.',
    pack: 'ScienceBiologyCellular.kt',
    category: 'Science',
    tags: ['biology', 'mitochondria', 'cellular-respiration', 'atp'],
    isImmutable: true
  },
  {
    q: 'What are Sir Isaac Newton’s Three Laws of Motion?',
    a: '1) First Law (Inertia): An object at rest stays at rest, and an object in motion stays in uniform motion unless acted upon by a net external force. 2) Second Law (Force and Acceleration): F = ma (Force equals mass times acceleration). 3) Third Law (Action-Reaction): For every action, there is an equal and opposite reaction.',
    pack: 'SciencePhysicsMechanics.kt',
    category: 'Science',
    tags: ['physics', 'newton', 'mechanics', 'force'],
    isImmutable: true
  },
  {
    q: 'How does oxygenic photosynthesis work in green plants?',
    a: 'Photosynthesis converts solar photonic energy into chemical energy within plant chloroplasts: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2. It occurs in two stages: Light-dependent reactions in the thylakoid membranes (generating ATP and NADPH while splitting water to release oxygen), and light-independent Calvin cycle in the stroma (fixing atmospheric carbon dioxide into glucose).',
    pack: 'SciencePhotosynthesisBiochem.kt',
    category: 'Science',
    tags: ['photosynthesis', 'chloroplast', 'calvin-cycle', 'botany'],
    isImmutable: true
  },
  {
    q: 'What is the structure of DNA and the central dogma of molecular biology?',
    a: 'DNA is a double-stranded antiparallel helical polymer formed by nucleotides containing a deoxyribose sugar, phosphate group, and nitrogenous bases: Adenine pairs with Thymine (A-T), and Guanine pairs with Cytosine (G-C). The central dogma of molecular biology states that genetic information flows from DNA → RNA (transcription) → Protein (translation).',
    pack: 'ScienceGeneticsMolecular.kt',
    category: 'Science',
    tags: ['genetics', 'dna', 'molecular-biology', 'transcription'],
    isImmutable: true
  },

  // -------------------------------------------------------------
  // 4. AGRICULTURE & TROPICAL AGRONOMY
  // -------------------------------------------------------------
  {
    q: 'What environmental factors make Jamaica Blue Mountain Coffee world-renowned?',
    a: 'Certified Jamaica Blue Mountain Coffee is cultivated strictly between 3,000 and 5,500 feet elevation in the Blue Mountain range across Portland, St. Andrew, and St. Thomas. The unique combination of volcanic, mineral-rich soil, cool misty cloud cover that slows cherry maturation, and rigorous wet-milling processing produces an exceptionally smooth, sweet, and mild cup with zero bitterness.',
    pack: 'JamaicaAgriCoffee.kt',
    category: 'Agri',
    tags: ['coffee', 'blue-mountain', 'agriculture', 'export'],
    isImmutable: true
  },
  {
    q: 'What are the main agricultural staples grown across Jamaican farming belts?',
    a: 'Major staples include: 1) Roots & Tubers: Yellow yam (Trelawny/Hanover), sweet potato, dasheen, and coco; 2) Tree Crops: Breadfruit, pimento (allspice), ackee, mango, and coconut; 3) Cash Crops: Sugarcane (Frome, Bernard Lodge), Blue Mountain coffee, cocoa, and ginger; 4) Vegetables: Scotch bonnet peppers, scallions, thyme, and callaloo in the St. Elizabeth breadbasket.',
    pack: 'JamaicaAgriStaples.kt',
    category: 'Agri',
    tags: ['crops', 'breadbasket', 'yam', 'pimento', 'scotch-bonnet'],
    isImmutable: true
  },
  {
    q: 'What is soil conservation and drip irrigation management in tropical agriculture?',
    a: 'In tropical climates with seasonal rainfall, soil conservation methods include contour plowing, terracing on hillsides to prevent topsoil runoff, cover cropping, and mulch conservation. Drip irrigation delivers water directly to crop root zones at low pressure, reducing water loss by evaporation by up to 50% compared to overhead sprinklers.',
    pack: 'AgriIrrigationSoil.kt',
    category: 'Agri',
    tags: ['irrigation', 'soil', 'conservation', 'farming'],
    isImmutable: true
  },

  // -------------------------------------------------------------
  // 5. READING & LITERATURE
  // -------------------------------------------------------------
  {
    q: 'Who was Louise Bennett-Coverley ("Miss Lou") and what was her literary legacy?',
    a: 'Dr. Louise Bennett-Coverley, OM, MBE (1919–2006), affectionately known as "Miss Lou", was a pioneering Jamaican poet, folklorist, writer, and broadcaster. She championed Jamaican Creole (Patwa) as a legitimate, expressive literary language through iconic dialect poetry such as "Dry-Foot Bwoy", "Colonization in Reverse", and "Noh Lickle Twang", transforming Caribbean cultural identity.',
    pack: 'JamaicaLiteratureMissLou.kt',
    category: 'Reading',
    tags: ['miss-lou', 'poetry', 'patwa', 'literature', 'folklore'],
    isImmutable: true
  },
  {
    q: 'Who was Claude McKay and what was his contribution to international literature?',
    a: 'Claude McKay (1889–1948), born in Sunny Ville, Clarendon, Jamaica, was a foundational poet and novelist of both Jamaican dialect verse ("Songs of Jamaica", "Constab Ballads") and the Harlem Renaissance in New York. His celebrated 1919 sonnet "If We Must Die" became an international anthem of defiant civil rights resistance.',
    pack: 'JamaicaLiteratureClaudeMcKay.kt',
    category: 'Reading',
    tags: ['claude-mckay', 'harlem-renaissance', 'poetry', 'literature'],
    isImmutable: true
  },

  // -------------------------------------------------------------
  // 6. CODING & COMPUTER SCIENCE
  // -------------------------------------------------------------
  {
    q: 'What is Big O notation and how do algorithmic complexity classes compare?',
    a: 'Big O notation characterizes the worst-case asymptotic upper bound of time or memory growth relative to input size n. Common classes ordered by efficiency: O(1) Constant time (hash map lookup) < O(log n) Logarithmic (binary search) < O(n) Linear (single loop scan) < O(n log n) Linearithmic (merge sort, quicksort average) < O(n²) Quadratic (nested loops, bubble sort) < O(2^n) Exponential (brute force recursive Fibonacci).',
    pack: 'CodingAlgorithmsBigO.kt',
    category: 'Coding',
    tags: ['algorithms', 'big-o', 'data-structures', 'performance'],
    isImmutable: true
  },
  {
    q: 'What are the core principles of TypeScript and why is static typing beneficial?',
    a: 'TypeScript is a strongly typed superset of JavaScript developed by Microsoft. It introduces compile-time static type checking, interfaces, generics, union types, and enums. Key benefits include preventing runtime type errors (e.g., "undefined is not a function"), rich IDE autocompletion, self-documenting codebases, and maintainable large-scale refactoring.',
    pack: 'CodingTypeScriptArchitect.kt',
    category: 'Coding',
    tags: ['typescript', 'javascript', 'static-types', 'software-engineering'],
    isImmutable: true
  },
  {
    q: 'What is ACID compliance in database transaction management?',
    a: 'ACID guarantees database reliability: 1) Atomicity: Transactions execute as a single, all-or-nothing unit; 2) Consistency: Transitions must preserve all database invariants and constraints; 3) Isolation: Concurrent transactions execute without cross-interference; 4) Durability: Once committed, state changes survive system crashes and power loss.',
    pack: 'CodingDatabaseArchitecture.kt',
    category: 'Coding',
    tags: ['databases', 'acid', 'sqlite', 'transactions', 'sql'],
    isImmutable: true
  },

  // -------------------------------------------------------------
  // 7. HEALTH & BIOMEDICINE
  // -------------------------------------------------------------
  {
    q: 'What are traditional Jamaican medicinal herbs and their scientific properties?',
    a: 'Traditional Jamaican bush medicine includes: 1) Cerasee (Momordica charantia): Contains charantin and momordicins, traditionally used for blood purification and metabolic regulation; 2) Guinea Hen Weed (Petiveria alliacea): Rich in dibenzyl trisulfide with proven anti-inflammatory and immunomodulatory properties; 3) Fever Grass / Lemongrass (Cymbopogon citratus): Contains citral for soothing fever and digestive tract spasms; 4) Ginger (Zingiber officinale): High in gingerols for anti-nausea and circulation.',
    pack: 'HealthTropicalHerbal.kt',
    category: 'Health',
    tags: ['herbal-medicine', 'cerasee', 'bush-tea', 'wellness'],
    isImmutable: true
  },
  {
    q: 'What are the physiological pillars of cardiovascular health and VO2 max?',
    a: 'Cardiovascular health depends on myocardial stroke volume, endothelial flexibility, and mitochondrial density. VO2 max (maximum rate of oxygen consumption during incremental exercise) is the definitive metric of aerobic endurance. It is optimized through zone 2 base cardiovascular training combined with high-intensity interval training (HIIT), balanced omega-3 nutrition, and adequate sleep.',
    pack: 'HealthCardiovascularBiomech.kt',
    category: 'Health',
    tags: ['cardiovascular', 'exercise', 'vo2-max', 'longevity'],
    isImmutable: true
  },

  // -------------------------------------------------------------
  // 8. WEALTH & CAPITAL MARKETS
  // -------------------------------------------------------------
  {
    q: 'What is the Jamaica Stock Exchange (JSE) and its historical performance?',
    a: 'Established in 1968 and operational since 1969 in Kingston, the Jamaica Stock Exchange (JSE) is one of the premier exchanges in the Caribbean. In 2015 and 2018, Bloomberg ranked the JSE as the best-performing stock market index in the world due to financial regulatory reforms, corporate tax incentives for Junior Market listings, and strong local investor participation.',
    pack: 'WealthJamaicaStockExchange.kt',
    category: 'Wealth',
    tags: ['jse', 'investing', 'stocks', 'jamaica-economy', 'wealth'],
    isImmutable: true
  },
  {
    q: 'What are the foundational principles of personal wealth accumulation?',
    a: '1) Maintain positive net cash flow (spend less than you earn); 2) Build a 3-6 month emergency fund in liquid high-yield assets; 3) Avoid high-interest consumer debt; 4) Invest systematically in diversified index funds and income-generating assets to harness compound interest; 5) Reinvest dividends (DRIP); 6) Acquire appreciating real estate with sound titling.',
    pack: 'WealthPersonalFinanceMaster.kt',
    category: 'Wealth',
    tags: ['investing', 'budgeting', 'compound-interest', 'real-estate'],
    isImmutable: true
  },

  // -------------------------------------------------------------
  // 9. HISTORY & NATIONAL HEROES
  // -------------------------------------------------------------
  {
    q: 'Who was Queen Nanny of the Maroons and what were her military tactics?',
    a: 'Right Excellent Queen Nanny of the Maroons (c. 1686 – c. 1755) is Jamaica’s sole National Heroine. A brilliant military tactician and spiritual leader of the Windward Maroons in the Blue Mountains, she used guerrilla camouflage warfare, ambushes, and communication via the abeng horn to defeat the British Army, culminating in the 1739/1740 Peace Treaty guaranteeing Maroon autonomy and land ownership at Nanny Town and Moore Town.',
    pack: 'JamaicaHeroesNanny.kt',
    category: 'History',
    tags: ['nanny', 'maroons', 'national-hero', 'guerrilla-warfare'],
    isImmutable: true
  },
  {
    q: 'Who was Right Excellent Samuel Sharpe and what was the 1831 Christmas Rebellion?',
    a: 'Samuel Sharpe (1801–1832) was an educated enslaved Baptist preacher who organized the December 1831 Christmas Rebellion (Baptist War) in St. James, which mobilized over 60,000 enslaved people demanding freedom. Although brutally suppressed, Sharpe’s martyrdom ("I would rather die upon yonder gallows than live in slavery") directly forced the British Parliament to pass the Slavery Abolition Act of 1833.',
    pack: 'JamaicaHeroesSamSharpe.kt',
    category: 'History',
    tags: ['sam-sharpe', '1831', 'emancipation', 'baptist-war'],
    isImmutable: true
  },
  {
    q: 'What was the Morant Bay Rebellion of 1865 and Paul Bogle’s sacrifice?',
    a: 'On October 11, 1865, Deacon Paul Bogle led a march from Stony Gut to the Morant Bay Courthouse in St. Thomas demanding justice, land, and fair wages. Governor Edward Eyre declared martial law, executing Bogle, George William Gordon, and over 430 Jamaicans. The public outcry in London resulted in Eyre’s dismissal and the dissolution of the corrupt colonial assembly, making Jamaica a British Crown Colony.',
    pack: 'JamaicaHeroesPaulBogle.kt',
    category: 'History',
    tags: ['paul-bogle', 'morant-bay', '1865', 'crown-colony'],
    isImmutable: true
  },
  {
    q: 'Who was Right Excellent Marcus Mosiah Garvey and what was the UNIA?',
    a: 'Marcus Mosiah Garvey (1887–1940), born in St. Ann’s Bay, Jamaica, was Jamaica’s first designated National Hero. In 1914, he founded the Universal Negro Improvement Association (UNIA) in Kingston, which expanded to millions of members across 40 nations. Garvey championed Pan-Africanism, economic self-reliance ("Up, you mighty race, accomplish what you will!"), and established the Black Star Line shipping company.',
    pack: 'JamaicaHeroesMarcusGarvey.kt',
    category: 'History',
    tags: ['marcus-garvey', 'pan-africanism', 'unia', 'civil-rights'],
    isImmutable: true
  },
  {
    q: 'Who were Norman Washington Manley and Sir Alexander Bustamante in 1938–1962?',
    a: 'Cousins Norman Manley (founder of the People’s National Party in 1938) and Alexander Bustamante (founder of the Bustamante Industrial Trade Union and the Jamaica Labour Party) led the 1938 labor movement, secured universal adult suffrage in 1944, and negotiated Jamaica’s peaceful independence from Great Britain on August 6, 1962. Both are revered National Heroes.',
    pack: 'JamaicaHeroesManleyBustamante.kt',
    category: 'History',
    tags: ['norman-manley', 'bustamante', 'independence', '1962', 'trade-union'],
    isImmutable: true
  },
  {
    q: 'What was the Port Royal earthquake of June 7, 1692?',
    a: 'Port Royal, known as the "wickedest city on earth" and headquarters for privateers like Sir Henry Morgan, was struck by a catastrophic earthquake and tsunami on June 7, 1692. Two-thirds of the city slid into Kingston Harbour, killing over 2,000 people. The survivors relocated across the harbour to establish Kingston.',
    pack: 'JamaicaHistoryPortRoyal.kt',
    category: 'History',
    tags: ['port-royal', 'earthquake', '1692', 'pirates', 'kingston'],
    isImmutable: true
  },

  // -------------------------------------------------------------
  // 10. WORLD HISTORY & GEOPOLITICS
  // -------------------------------------------------------------
  {
    q: 'What was the HMT Empire Windrush migration of 1948 and its historical significance?',
    a: 'On June 22, 1948, the HMT Empire Windrush arrived at Tilbury Docks in Essex, carrying 492 Jamaican and Caribbean passengers responding to the British government’s call to help rebuild post-World War II Britain. The Windrush generation laid the foundations of the National Health Service (NHS), public transport, and modern British multiculturalism.',
    pack: 'WorldHistoryWindrush.kt',
    category: 'World Events',
    tags: ['windrush', '1948', 'diaspora', 'post-war', 'britain'],
    isImmutable: true
  },
  {
    q: 'What were the causes and consequences of World War II (1939–1945)?',
    a: 'World War II was ignited by Axis aggression (Nazi Germany, Fascist Italy, Imperial Japan) following the instability left by the Treaty of Versailles and the Great Depression. The Allied victory in 1945 resulted in the defeat of fascism, the founding of the United Nations, the Nuremberg trials establishing crimes against humanity, the Universal Declaration of Human Rights in 1948, and the onset of the Cold War.',
    pack: 'WorldHistoryWWII.kt',
    category: 'World Events',
    tags: ['wwii', 'united-nations', 'allies', 'human-rights'],
    isImmutable: true
  },
  {
    q: 'What was the Industrial Revolution and its economic transformation?',
    a: 'Beginning in Great Britain in the mid-18th century, the Industrial Revolution transitioned human manufacturing from agrarian and handicraft methods to machine production powered by coal and steam engines. It spurred rapid urbanization, mass production, capitalist financial markets, modern transportation (railways and steamships), and the rise of organized labor movements.',
    pack: 'WorldHistoryIndustrialRev.kt',
    category: 'World Events',
    tags: ['industrial-revolution', 'steam-engine', 'economics', 'urbanization'],
    isImmutable: true
  },

  // -------------------------------------------------------------
  // 11. JAMAICAN COFFEE ESTATES, OWNERS, VARIETIES & PROCESS
  // -------------------------------------------------------------
  {
    q: 'What are the premier Jamaican Blue Mountain coffee estates, their owners, elevations, and histories?',
    a: 'Key estates include: 1) Mavis Bank Coffee Factory & Estate (St. Andrew, 3,000–4,200 ft, founded 1920 by Victor C. Munn, famed producer of Jablum); 2) Clifton Mount Estate (St. Andrew, 4,300–5,000 ft, founded 1750 by Robert Hamilton, stewarded by the Sharp family, oldest functioning estate in Jamaica); 3) Wallenford Coffee Estate (Portland/St. Andrew, 3,500–4,500 ft, established late 1780s, historic royal European exporter); 4) Craighton Estate (Irish Town, 2,600–3,200 ft, 1805 Georgian great house, owned by Ueshima Coffee Company / UCC Japan); 5) Flamstead Estate (St. Andrew, 3,300–3,800 ft, founded 1764); 6) Old Tavern Estate (Portland, 4,000–4,800 ft on Blue Mountain Peak slopes, pioneered by Alex Twyman); 7) Clydesdale Estate (St. Andrew, 3,000–3,700 ft, founded 1800 by Dr. Colin McClarty); 8) Abbey Green Estate (St. Thomas/Portland border, 4,500–5,500 ft, highest commercial farm in Jamaica); 9) Baronhall Estate (Clarendon, premier High Mountain Arabica estate).',
    pack: 'JamaicaCoffeeEstatesMaster.kt',
    category: 'Agri',
    tags: ['coffee', 'estates', 'mavis-bank', 'clifton-mount', 'wallenford', 'craighton', 'old-tavern'],
    isImmutable: true
  },
  {
    q: 'What botanical varieties of coffee are grown in the Jamaican Blue Mountains?',
    a: '1) Coffea Arabica var. Typica: Represents over 90% of Blue Mountain plantings. Introduced in 1728 by Governor Sir Nicholas Lawes at Temple Hall. Famous for its exquisite balance, natural sweetness, floral notes, and zero bitterness. 2) Coffea Arabica var. Geisha (Gesha): Ultra-premium high-altitude plantings at Clifton Mount with intense jasmine floral aromatics. 3) Coffea Arabica var. Bourbon: Sweet caramel and complex body. 4) Peaberry (Caracol): A natural mutation occurring in ~5% of cherries where a single round oval bean develops, yielding concentrated flavor.',
    pack: 'JamaicaCoffeeVarieties.kt',
    category: 'Agri',
    tags: ['coffee-varieties', 'typica', 'geisha', 'bourbon', 'peaberry'],
    isImmutable: true
  },
  {
    q: 'What is the complete 12-step seed-to-cup process for authentic Jamaica Blue Mountain Coffee?',
    a: '1) Nursery propagation (6–9 months); 2) Selective manual hand-picking of strictly ripe red cherries on steep 45° slopes; 3) Same-day wet pulping (<24 hours post-harvest); 4) Controlled water fermentation (12–24 hours) to digest mucilage; 5) Washing in pure Blue Mountain spring water; 6) Sun-drying on concrete barbecues continuously raked to precisely 11.5%–12.5% moisture; 7) Repos / conditioning (resting in wooden bins for 8–12 weeks to mature flavor); 8) Dry milling and hulling of parchment; 9) Density grading through screen sizes (Screen 17/18 for Grade 1); 10) Hand-sorting by certified Jamaican sorters removing all defects; 11) JACRA statutory laboratory cupping and seal certification; 12) Packaging in handmade aspen wood barrels (15kg, 30kg, 70kg) and roasting to Medium City roast.',
    pack: 'JamaicaCoffeeProcessingCycle.kt',
    category: 'Agri',
    tags: ['coffee-process', 'barbecue-drying', 'jacra', 'aspen-barrels', 'hulling'],
    isImmutable: true
  },

  // -------------------------------------------------------------
  // 12. DISEASES, FIRST AID, CUTS & MEDICATIONS
  // -------------------------------------------------------------
  {
    q: 'How should cuts, lacerations, and wounds be treated in first aid emergencies?',
    a: '1) Apply firm direct pressure with sterile gauze or clean cloth for 5–10 minutes continuously without lifting; 2) Elevate the injured limb above heart level; 3) Cleanse thoroughly by irrigating with copious sterile saline or potable water (avoid pouring straight alcohol or hydrogen peroxide directly into deep tissue); 4) For clean shallow cuts, apply Steri-Strips or sterile bandage; for gaping wounds >1/4 inch deep or facial lacerations, professional suturing is required within 6–8 hours; 5) Apply topical antibiotic ointment (Bacitracin/Polymyxin); 6) Verify tetanus toxoid immunization status within 48 hours.',
    pack: 'MedicalEmergencyWoundCare.kt',
    category: 'Health',
    tags: ['cuts', 'wounds', 'lacerations', 'first-aid', 'tetanus', 'bleeding'],
    isImmutable: true
  },
  {
    q: 'What is essential hypertension, its symptoms, and standard medications?',
    a: 'Hypertension is persistent blood pressure ≥ 130/80 mmHg. Termed the "silent killer" because it causes progressive organ damage without early symptoms. Treatment involves dietary sodium restriction (< 1.5g/day), aerobic exercise, and first-line medications: 1) ACE Inhibitors (Lisinopril 10–40mg daily); 2) ARBs (Losartan 50–100mg daily); 3) Calcium Channel Blockers (Amlodipine 5–10mg daily); 4) Thiazide Diuretics (Hydrochlorothiazide 12.5–25mg daily).',
    pack: 'MedicalCardiovascularHypertension.kt',
    category: 'Health',
    tags: ['hypertension', 'blood-pressure', 'lisinopril', 'losartan', 'amlodipine'],
    isImmutable: true
  },
  {
    q: 'What is the immediate emergency response and treatment for acute myocardial infarction (heart attack)?',
    a: 'Emergency protocol: 1) Immediately dial EMS; 2) Administer 325 mg uncoated Aspirin to be chewed immediately for rapid antiplatelet action; 3) Keep patient seated upright, calm, and loosen tight clothing; 4) Administer sublingual Nitroglycerin (0.4 mg) if prescribed and systolic BP > 90 mmHg; 5) Be prepared to initiate high-quality CPR (100–120 compressions/min) and deploy an AED if pulseless; 6) In hospital, primary percutaneous coronary intervention (PCI / stent) is performed within 90 minutes.',
    pack: 'MedicalCardiovascularHeartAttack.kt',
    category: 'Health',
    tags: ['heart-attack', 'myocardial-infarction', 'aspirin', 'emergency', 'cpr'],
    isImmutable: true
  },
  {
    q: 'What is Type 2 Diabetes Mellitus, its symptoms, and primary medications?',
    a: 'Type 2 Diabetes is chronic hyperglycemia caused by progressive insulin resistance and pancreatic beta-cell dysfunction. Symptoms include polyuria (frequent urination), polydipsia (excessive thirst), polyphagia (hunger), and fatigue. First-line pharmacotherapy is Metformin (500–2,000 mg daily), which suppresses hepatic gluconeogenesis and improves peripheral insulin sensitivity. Additional modern agents include SGLT2 inhibitors (Empagliflozin/Jardiance) and GLP-1 receptor agonists (Semaglutide/Ozempic).',
    pack: 'MedicalEndocrineDiabetes.kt',
    category: 'Health',
    tags: ['diabetes', 'metformin', 'insulin', 'hyperglycemia', 'jardiance'],
    isImmutable: true
  },
  {
    q: 'What is the acute treatment for bronchial asthma attacks and maintenance therapy?',
    a: 'Acute attack: Administer 2–4 puffs of a short-acting beta-2 agonist (Albuterol / Salbutamol inhaler) via spacer immediately, repeating every 20 minutes as needed up to 3 times. Seat patient upright. Daily maintenance controller therapy requires an inhaled corticosteroid (ICS) such as Fluticasone or Budesonide, often combined with a long-acting beta agonist (LABA like Salmeterol or Formoterol) to prevent airway remodeling.',
    pack: 'MedicalRespiratoryAsthma.kt',
    category: 'Health',
    tags: ['asthma', 'albuterol', 'salbutamol', 'inhaler', 'bronchospasm'],
    isImmutable: true
  },
  {
    q: 'What is Dengue fever, how is it treated, and which medications are strictly contraindicated?',
    a: 'Dengue is a mosquito-borne arbovirus (Aedes aegypti) causing sudden high fever, retro-orbital headache, and severe muscle/joint pain ("breakbone fever"). Treatment: Aggressive oral hydration with Oral Rehydration Salts (ORS) and Acetaminophen / Paracetamol (max 3,000mg/24hr) for fever. STRICT CONTRAINDICATION: Never take Aspirin, Ibuprofen, Naproxen, or other NSAIDs during suspected Dengue, as they inhibit platelets and drastically elevate the risk of fatal hemorrhage!',
    pack: 'MedicalTropicalDengue.kt',
    category: 'Health',
    tags: ['dengue', 'paracetamol', 'nsaid-contraindication', 'hydration', 'fever'],
    isImmutable: true
  },
  {
    q: 'How should thermal burns be treated immediately in first aid?',
    a: '1) Immediately cool the burn under running cool potable water for 15–20 minutes; 2) NEVER apply ice, iced water, butter, grease, or toothpaste (causes severe tissue necrosis and infection); 3) Do NOT pop or de-roof blisters; 4) Cover with a sterile non-adherent dressing or clean plastic wrap; 5) Apply 1% Silver Sulfadiazine cream or medical petroleum gauze; 6) Seek emergency medical attention for 3rd-degree burns, burns > 10% body surface area, or burns involving face, hands, feet, or groin.',
    pack: 'MedicalFirstAidBurns.kt',
    category: 'Health',
    tags: ['burns', 'first-aid', 'silver-sulfadiazine', 'cooling', 'blisters'],
    isImmutable: true
  },
  {
    q: 'What is anaphylaxis and the immediate life-saving medication protocol?',
    a: 'Anaphylaxis is a severe, life-threatening systemic allergic reaction involving respiratory compromise (bronchospasm, laryngeal edema) and/or cardiovascular collapse (hypotension). The single FIRST-LINE life-saving medication is Epinephrine (Adrenaline) 0.3 mg IM (adult) or 0.15 mg IM (child), injected into the mid-outer anterolateral thigh immediately. Do not delay for oral antihistamines. Call emergency services immediately after administering Epinephrine.',
    pack: 'MedicalEmergencyAnaphylaxis.kt',
    category: 'Health',
    tags: ['anaphylaxis', 'epinephrine', 'epipen', 'emergency', 'allergy'],
    isImmutable: true
  }
];

export const INITIAL_KNOWLEDGE_PACKS = MASTER_KNOWLEDGE_PACKS;
export const SUPERSEDED_KEYS = new Set<string>(['deprecated_currency_1970', 'legacy_bauxite_spec']);

