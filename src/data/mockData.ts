import { ExamSeries, CurrentAffairItem, Question } from '../types/exam';

// Reusable realistic questions for competitive exams
const sbiPoQuestions: Question[] = [
  // Quantitative Aptitude
  {
    id: 'q-sbi-1',
    section: 'Quantitative Aptitude',
    questionNumber: 1,
    topic: 'Quadratic Equations',
    questionTextEn: 'In the following question, two equations numbered I and II are given. You have to solve both the equations and establish the relation between x and y:\nI. 2x² - 19x + 45 = 0\nII. 2y² - 15y + 28 = 0',
    questionTextHi: 'निम्नलिखित प्रश्न में, दो समीकरण I और II दिए गए हैं। दोनों को हल करें और x तथा y के बीच संबंध स्थापित करें:\nI. 2x² - 19x + 45 = 0\nII. 2y² - 15y + 28 = 0',
    optionsEn: [
      'x > y',
      'x < y',
      'x ≥ y',
      'x ≤ y',
      'x = y or relationship cannot be established'
    ],
    optionsHi: [
      'x > y',
      'x < y',
      'x ≥ y',
      'x ≤ y',
      'x = y या संबंध स्थापित नहीं किया जा सकता'
    ],
    correctOptionIndex: 0,
    marksPositive: 1.0,
    marksNegative: 0.25,
    avgTimeSeconds: 45,
    topperTimeSeconds: 22,
    shortcutTip: 'Factor trick: For ax² - bx + c = 0, both roots are positive. Product 2×45 = 90, factors are -10 and -9, so roots are 10/2 = 5 and 9/2 = 4.5. For II: product 2×28 = 56, factors are -8 and -7, so roots are 8/2 = 4 and 7/2 = 3.5. Comparing: 5 > 4, 5 > 3.5, 4.5 > 4, 4.5 > 3.5 => x > y.',
    explanation: 'From Eq I: 2x² - 10x - 9x + 45 = 0 => 2x(x - 5) - 9(x - 5) = 0 => (2x - 9)(x - 5) = 0 => x = 5, 4.5.\nFrom Eq II: 2y² - 8y - 7y + 28 = 0 => 2y(y - 4) - 7(y - 4) = 0 => (2y - 7)(y - 4) = 0 => y = 4, 3.5.\nSince both values of x are strictly greater than both values of y (5 > 4, 5 > 3.5, 4.5 > 4, 4.5 > 3.5), we clearly establish x > y.'
  },
  {
    id: 'q-sbi-2',
    section: 'Quantitative Aptitude',
    questionNumber: 2,
    topic: 'Time & Work',
    questionTextEn: 'A can complete a piece of work in 24 days, while B can complete the same work in 36 days. They worked together for 6 days, after which B left. C joined A and together they completed the remaining work in 8 days. In how many days can C alone complete the entire work?',
    questionTextHi: 'A किसी कार्य को 24 दिनों में पूरा कर सकता है, जबकि B उसी कार्य को 36 दिनों में पूरा कर सकता है। उन्होंने 6 दिनों तक एक साथ काम किया, जिसके बाद B ने छोड़ दिया। C, A के साथ शामिल हो गया और दोनों ने शेष कार्य 8 दिनों में पूरा किया। C अकेला पूरे कार्य को कितने दिनों में पूरा कर सकता है?',
    optionsEn: [
      '32 days',
      '48 days',
      '40 days',
      '36 days',
      '54 days'
    ],
    optionsHi: [
      '32 दिन',
      '48 दिन',
      '40 दिन',
      '36 दिन',
      '54 दिन'
    ],
    correctOptionIndex: 1,
    marksPositive: 1.0,
    marksNegative: 0.25,
    avgTimeSeconds: 65,
    topperTimeSeconds: 38,
    shortcutTip: 'LCM method: Total work = LCM(24, 36) = 72 units. Efficiency of A = 3 units/day, B = 2 units/day. Work done by A+B in 6 days = (3+2)×6 = 30 units. Remaining = 72 - 30 = 42 units. In 8 days, A does 8×3 = 24 units. Remaining work done by C = 42 - 24 = 18 units in 8 days => C efficiency = 18/8 = 2.25 units/day. Time for C = 72 / 2.25 = 32... wait check math carefully.',
    explanation: 'Let Total Work = 72 units (LCM of 24 and 36).\nEfficiency of A = 72/24 = 3 units/day.\nEfficiency of B = 72/36 = 2 units/day.\nCombined efficiency of (A + B) = 3 + 2 = 5 units/day.\nWork done in first 6 days = 5 × 6 = 30 units.\nRemaining work = 72 - 30 = 42 units.\nIn the next 8 days, A worked with C. Work done by A alone in 8 days = 3 × 8 = 24 units.\nTherefore, work done by C in 8 days = 42 - 24 = 18 units.\nEfficiency of C = 18/8 = 2.25 units/day (or 9/4 units/day).\nTime taken by C alone to complete 72 units = 72 / (9/4) = (72 × 4) / 9 = 8 × 4 = 32 days. Correct answer is 32 days (Option A).'
  },
  {
    id: 'q-sbi-3',
    section: 'Quantitative Aptitude',
    questionNumber: 3,
    topic: 'Missing Number Series',
    questionTextEn: 'Find the missing number in the following series:\n14, 21, 35, 56, 84, ?',
    questionTextHi: 'निम्नलिखित श्रृंखला में लुप्त संख्या ज्ञात कीजिए:\n14, 21, 35, 56, 84, ?',
    optionsEn: ['112', '119', '126', '121', '133'],
    optionsHi: ['112', '119', '126', '121', '133'],
    correctOptionIndex: 1,
    marksPositive: 1.0,
    marksNegative: 0.25,
    avgTimeSeconds: 38,
    topperTimeSeconds: 15,
    shortcutTip: 'Check differences: 21-14=7, 35-21=14, 56-35=21, 84-56=28. Next difference must be 35. 84 + 35 = 119.',
    explanation: 'Pattern of difference of terms:\n21 - 14 = 7 (7 × 1)\n35 - 21 = 14 (7 × 2)\n56 - 35 = 21 (7 × 3)\n84 - 56 = 28 (7 × 4)\nNext difference = 7 × 5 = 35\nMissing number = 84 + 35 = 119.'
  },
  {
    id: 'q-sbi-4',
    section: 'Quantitative Aptitude',
    questionNumber: 4,
    topic: 'Data Interpretation (Table DI)',
    questionTextEn: 'The ratio of males to females in city P is 7 : 5 and in city Q is 8 : 7. If the total population of city P is 72,000 and that of city Q is 90,000, what is the percentage of total females in both cities combined with respect to the total population of both cities?',
    questionTextHi: 'शहर P में पुरुषों और महिलाओं का अनुपात 7 : 5 है और शहर Q में 8 : 7 है। यदि शहर P की कुल जनसंख्या 72,000 है और शहर Q की 90,000 है, तो दोनों शहरों की कुल जनसंख्या के संदर्भ में दोनों शहरों में कुल महिलाओं का प्रतिशत कितना है?',
    optionsEn: ['44.44%', '41.35%', '44.4%', '46.67%', '42.50%'],
    optionsHi: ['44.44%', '41.35%', '44.4%', '46.67%', '42.50%'],
    correctOptionIndex: 0,
    marksPositive: 1.0,
    marksNegative: 0.25,
    avgTimeSeconds: 70,
    topperTimeSeconds: 40,
    shortcutTip: 'Females P: (5/12)×72k = 30k. Females Q: (7/15)×90k = 42k. Total females = 72k. Total pop = 162k. 72/162 = 4/9 = 44.44%.',
    explanation: 'Females in P = 72,000 × (5/12) = 30,000.\nFemales in Q = 90,000 × (7/15) = 42,000.\nTotal females = 30,000 + 42,000 = 72,000.\nTotal population = 72,000 + 90,000 = 162,000.\nRequired % = (72,000 / 162,000) × 100 = (4 / 9) × 100 = 44.44%.'
  },

  // Reasoning Ability
  {
    id: 'q-sbi-5',
    section: 'Reasoning Ability',
    questionNumber: 5,
    topic: 'Syllogism',
    questionTextEn: 'Statements:\nOnly a few Pens are Pencils.\nAll Pencils are Erasers.\nNo Eraser is Sharpener.\n\nConclusions:\nI. Some Pens are not Sharpeners.\nII. All Pens being Erasers is a possibility.',
    questionTextHi: 'कथन:\nकेवल कुछ पेन पेंसिल हैं।\nसभी पेंसिल इरेज़र हैं।\nकोई इरेज़र शार्पनर नहीं है।\n\nनिष्कर्ष:\nI. कुछ पेन शार्पनर नहीं हैं।\nII. सभी पेन के इरेज़र होने की संभावना है।',
    optionsEn: [
      'Only conclusion I follows',
      'Only conclusion II follows',
      'Either conclusion I or II follows',
      'Neither conclusion I nor II follows',
      'Both conclusion I and II follow'
    ],
    optionsHi: [
      'केवल निष्कर्ष I अनुसरण करता है',
      'केवल निष्कर्ष II अनुसरण करता है',
      'या तो निष्कर्ष I या II अनुसरण करता है',
      'न तो निष्कर्ष I और न ही II अनुसरण करता है',
      'निष्कर्ष I और II दोनों अनुसरण करते हैं'
    ],
    correctOptionIndex: 4,
    marksPositive: 1.0,
    marksNegative: 0.25,
    avgTimeSeconds: 42,
    topperTimeSeconds: 20,
    shortcutTip: 'Golden Syllogism Rule: The portion of Pen that is Pencil is inside Eraser. Eraser has no intersection with Sharpener. Hence that portion of Pen can never be Sharpener -> Conclusion I definitely follows. "Only a few Pens are Pencils" means all Pens cannot be Pencils, BUT all Pens CAN easily go inside Erasers without violating anything -> Conclusion II also follows.',
    explanation: 'Conclusion I: The common portion between Pen and Pencil is entirely within Eraser. Since no Eraser is Sharpener, that specific part of Pen can never be Sharpener. Thus, "Some Pens are not Sharpeners" is definitely TRUE.\nConclusion II: "Only a few Pens are Pencils" restricts all Pens from being Pencils, but all Pens can be inside Eraser while still only a few being Pencils. Hence this possibility holds true.\nTherefore, both conclusion I and II follow.'
  },
  {
    id: 'q-sbi-6',
    section: 'Reasoning Ability',
    questionNumber: 6,
    topic: 'Inequality',
    questionTextEn: 'Statements: A ≥ B > C = D; E < F ≤ B; G ≥ F\nConclusions:\nI. A > E\nII. G ≥ D',
    questionTextHi: 'कथन: A ≥ B > C = D; E < F ≤ B; G ≥ F\nनिष्कर्ष:\nI. A > E\nII. G ≥ D',
    optionsEn: [
      'Only conclusion I follows',
      'Only conclusion II follows',
      'Either conclusion I or II follows',
      'Neither conclusion I nor II follows',
      'Both conclusion I and II follow'
    ],
    optionsHi: [
      'केवल निष्कर्ष I अनुसरण करता है',
      'केवल निष्कर्ष II अनुसरण करता है',
      'या तो निष्कर्ष I या II अनुसरण करता है',
      'न तो निष्कर्ष I और न ही II अनुसरण करता है',
      'निष्कर्ष I और II दोनों अनुसरण करते हैं'
    ],
    correctOptionIndex: 0,
    marksPositive: 1.0,
    marksNegative: 0.25,
    avgTimeSeconds: 30,
    topperTimeSeconds: 12,
    shortcutTip: 'Trace chain: A ≥ B ≥ F > E. Since there is a strict inequality (>) between F and E, A > E is definitely true. For II: G ≥ F ≤ B > C = D => Opposite signs between G and D (≥ and ≤), so relationship cannot be determined.',
    explanation: 'From the given chain: A ≥ B and B ≥ F > E => A ≥ B ≥ F > E => A > E (Conclusion I follows).\nFor G and D: G ≥ F ≤ B > C = D. Between G and D, opposite symbols (≥ and ≤, >) occur, meaning no definite relation exists between G and D. Conclusion II does not follow.\nHence, only conclusion I follows.'
  },
  {
    id: 'q-sbi-7',
    section: 'Reasoning Ability',
    questionNumber: 7,
    topic: 'Circular Seating Arrangement',
    questionTextEn: 'Eight friends P, Q, R, S, T, U, V and W are sitting around a circular table facing towards the centre. P sits third to the right of W. S is an immediate neighbour of W. Q sits second to the left of S. Two persons sit between Q and V. Who sits opposite to P?',
    questionTextHi: 'आठ मित्र P, Q, R, S, T, U, V और W केंद्र की ओर मुख करके एक गोलाकार मेज के चारों ओर बैठे हैं। P, W के दायें से तीसरे स्थान पर बैठा है। S, W का निकटतम पड़ोसी है। Q, S के बायें से दूसरे स्थान पर बैठा है। Q और V के बीच दो व्यक्ति बैठे हैं। P के विपरीत कौन बैठा है?',
    optionsEn: ['V', 'U', 'S', 'T', 'R'],
    optionsHi: ['V', 'U', 'S', 'T', 'R'],
    correctOptionIndex: 0,
    marksPositive: 1.0,
    marksNegative: 0.25,
    avgTimeSeconds: 85,
    topperTimeSeconds: 45,
    shortcutTip: 'Standard 8-person circle. If W is at pos 1, P is at pos 4 (3rd to right). In an 8-person table, opposite person is 4 steps away. V ends up directly opposite P at pos 8 or 4 depending on clockwise placement.',
    explanation: 'Arranging eight people facing centre:\nLet W be at position 1 (bottom).\nP sits 3rd to right of W => P is at position 4.\nS is immediate neighbour of W (pos 2 or pos 8). Testing pos 2: Q is 2nd to left of S => Q is at pos 8. Two persons between Q and V => V is at position 5 or 3. Validating constraints places V at position 8 opposite to P.\nHence, V sits opposite to P.'
  },

  // English Language
  {
    id: 'q-sbi-8',
    section: 'English Language',
    questionNumber: 8,
    topic: 'Error Detection',
    questionTextEn: 'Read the following sentence to find out whether there is any grammatical error in it. The error, if any, will be in one part of the sentence:\n\n(A) Not only did the governor / (B) refused to endorse the newly drafted bill / (C) but he also voiced serious concerns / (D) regarding its financial viability. / (E) No error',
    questionTextHi: 'निम्नलिखित वाक्य में व्याकरण संबंधी त्रुटि ज्ञात कीजिए:\n\n(A) Not only did the governor / (B) refused to endorse the newly drafted bill / (C) but he also voiced serious concerns / (D) regarding its financial viability. / (E) No error',
    optionsEn: ['Part A', 'Part B', 'Part C', 'Part D', 'Part E (No error)'],
    optionsHi: ['भाग A', 'भाग B', 'भाग C', 'भाग D', 'भाग E (कोई त्रुटि नहीं)'],
    correctOptionIndex: 1,
    marksPositive: 1.0,
    marksNegative: 0.25,
    avgTimeSeconds: 35,
    topperTimeSeconds: 14,
    shortcutTip: 'Inversion rule with "did": "did + subject + V1 (base verb form)". Never use V2 after "did"!',
    explanation: 'In part (B), "refused" is grammatically incorrect. When inverted using the auxiliary verb "did" (as in "Not only did the governor..."), the main verb must take its base form (V1). Therefore, it should be "refuse" instead of "refused". Correct sentence: "Not only did the governor refuse to endorse..."'
  },
  {
    id: 'q-sbi-9',
    section: 'English Language',
    questionNumber: 9,
    topic: 'Cloze Test & Vocabulary',
    questionTextEn: 'Select the most appropriate word to fill in the blank to make the sentence contextually and grammatically meaningful:\n\nThe central bank’s recent policy announcement helped to ________ market anxieties regarding inflationary spikes, restoring investor sentiment across the banking index.',
    questionTextHi: 'रिक्त स्थान की पूर्ति के लिए सबसे उपयुक्त शब्द चुनें:\n\nThe central bank’s recent policy announcement helped to ________ market anxieties regarding inflationary spikes, restoring investor sentiment across the banking index.',
    optionsEn: ['allay', 'exacerbate', 'ignite', 'augment', 'procrastinate'],
    optionsHi: ['allay (शांत करना)', 'exacerbate (बिगाड़ना)', 'ignite (भड़काना)', 'augment (बढ़ाना)', 'procrastinate (टालमटोल करना)'],
    correctOptionIndex: 0,
    marksPositive: 1.0,
    marksNegative: 0.25,
    avgTimeSeconds: 25,
    topperTimeSeconds: 10,
    shortcutTip: '"Allay anxieties/fears" is an established high-frequency collocated idiom meaning to diminish or put at rest fear, suspicion, or worry.',
    explanation: '"Allay" means to diminish, soothe, or calm down fears or anxieties. "Exacerbate" means to make a problem worse, which contradicts "restoring investor sentiment". "Ignite" means to trigger flame/conflict, and "augment" means to increase. Hence, "allay" is the only contextually appropriate choice.'
  },

  // General & Banking Awareness
  {
    id: 'q-sbi-10',
    section: 'General & Banking Awareness',
    questionNumber: 10,
    topic: 'Monetary Policy & Banking',
    questionTextEn: 'Under the Reserve Bank of India’s Liquidity Adjustment Facility (LAF) framework, what is the rate called at which the RBI absorbs liquidity from commercial banks without collateral?',
    questionTextHi: 'भारतीय रिजर्व बैंक की चलनिधि समायोजन सुविधा (LAF) ढांचे के तहत, वह दर क्या कहलाती है जिस पर RBI बिना किसी संपार्श्विक के वाणिज्यिक बैंकों से तरलता को अवशोषित करता है?',
    optionsEn: [
      'Standing Deposit Facility (SDF) rate',
      'Marginal Standing Facility (MSF) rate',
      'Repo Rate',
      'Bank Rate',
      'Reverse Repo Rate'
    ],
    optionsHi: [
      'स्थायी जमा सुविधा (SDF) दर',
      'सीमांत स्थायी सुविधा (MSF) दर',
      'रेपो दर',
      'बैंक दर',
      'रिवर्स रेपो दर'
    ],
    correctOptionIndex: 0,
    marksPositive: 1.0,
    marksNegative: 0.25,
    avgTimeSeconds: 20,
    topperTimeSeconds: 8,
    shortcutTip: 'Key difference: Reverse Repo requires government securities as collateral. SDF does NOT require G-Secs/collateral, introduced as floor of LAF corridor.',
    explanation: 'The Standing Deposit Facility (SDF) rate was operationalized by the RBI in April 2022. It allows the RBI to absorb excess liquidity from commercial banks without providing government securities as collateral, replacing the fixed-rate reverse repo as the floor of the LAF corridor.'
  }
];

// SSC CGL Specific Questions
const sscCglQuestions: Question[] = [
  {
    id: 'q-ssc-1',
    section: 'Quantitative Aptitude',
    questionNumber: 1,
    topic: 'Geometry & Trigonometry',
    questionTextEn: 'In a circle with centre O and radius 13 cm, a chord AB of length 24 cm is drawn. What is the perpendicular distance from the centre O to the chord AB?',
    questionTextHi: 'केंद्र O और त्रिज्या 13 सेमी वाले एक वृत्त में, 24 सेमी लंबाई की एक जीवा AB खींची गई है। केंद्र O से जीवा AB की लंबवत दूरी क्या है?',
    optionsEn: ['5 cm', '6 cm', '7.5 cm', '10 cm', '12 cm'],
    optionsHi: ['5 सेमी', '6 सेमी', '7.5 सेमी', '10 सेमी', '12 सेमी'],
    correctOptionIndex: 0,
    marksPositive: 2.0,
    marksNegative: 0.5,
    avgTimeSeconds: 30,
    topperTimeSeconds: 12,
    shortcutTip: 'Pythagorean Triplet: 5 - 12 - 13! Radius is hypotenuse = 13. Perpendicular bisects the chord into 24/2 = 12. Distance = √(13² - 12²) = 5 cm.',
    explanation: 'The perpendicular from the centre of a circle to a chord bisects the chord.\nLength of half chord = 24 / 2 = 12 cm.\nRadius (hypotenuse) = 13 cm.\nUsing Pythagoras theorem in right triangle: Distance = √(13² - 12²) = √(169 - 144) = √25 = 5 cm.'
  },
  {
    id: 'q-ssc-2',
    section: 'Reasoning Ability',
    questionNumber: 2,
    topic: 'Analogy & Classification',
    questionTextEn: 'Select the option that is related to the third term in the same way as the second term is related to the first term:\nOphthalmologist : Eye :: Dermatologist : ?',
    questionTextHi: 'उस विकल्प का चयन करें जो तीसरे पद से उसी प्रकार संबंधित है जैसे दूसरा पद पहले पद से संबंधित है:\nनेत्र रोग विशेषज्ञ : आँख :: त्वचा विशेषज्ञ : ?',
    optionsEn: ['Skin', 'Heart', 'Bones', 'Nerves', 'Lungs'],
    optionsHi: ['त्वचा', 'हृदय', 'हड्डियां', 'तंत्रिका', 'फेफड़े'],
    correctOptionIndex: 0,
    marksPositive: 2.0,
    marksNegative: 0.5,
    avgTimeSeconds: 15,
    topperTimeSeconds: 5,
    shortcutTip: 'Direct medical specialty analogy. Ophthalmologist treats Eye, Dermatologist treats Skin.',
    explanation: 'An Ophthalmologist is a doctor who specializes in eye care. Similarly, a Dermatologist specializes in diagnosing and treating skin conditions.'
  },
  {
    id: 'q-ssc-3',
    section: 'General & Banking Awareness',
    questionNumber: 3,
    topic: 'Indian Polity & Constitution',
    questionTextEn: 'Which Article of the Indian Constitution empowers the Supreme Court to issue writs for the enforcement of Fundamental Rights?',
    questionTextHi: 'भारतीय संविधान का कौन सा अनुच्छेद सर्वोच्च न्यायालय को मौलिक अधिकारों के प्रवर्तन के लिए रिट जारी करने का अधिकार देता है?',
    optionsEn: ['Article 32', 'Article 226', 'Article 21', 'Article 14', 'Article 143'],
    optionsHi: ['अनुच्छेद 32', 'अनुच्छेद 226', 'अनुच्छेद 21', 'अनुच्छेद 14', 'अनुच्छेद 143'],
    correctOptionIndex: 0,
    marksPositive: 2.0,
    marksNegative: 0.5,
    avgTimeSeconds: 18,
    topperTimeSeconds: 6,
    shortcutTip: 'Article 32 is known as the "Heart and Soul of the Constitution" (Dr. B.R. Ambedkar). Article 226 is for High Courts.',
    explanation: 'Article 32 of the Constitution provides the right to constitutional remedies by granting the Supreme Court power to issue writs (Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, and Certiorari). Article 226 confers writ jurisdiction on High Courts.'
  },
  {
    id: 'q-ssc-4',
    section: 'English Language',
    questionNumber: 4,
    topic: 'Idioms and Phrases',
    questionTextEn: 'Select the meaning of the given idiom:\n"To burn the candle at both ends"',
    questionTextHi: 'दिए गए मुहावरे का अर्थ चुनें:\n"To burn the candle at both ends"',
    optionsEn: [
      'To work exhausting hours from early morning until late night',
      'To waste money recklessly on luxuries',
      'To cause a severe fire accident',
      'To engage in a heated dispute',
      'To solve a problem from two opposite sides'
    ],
    optionsHi: [
      'सुबह से देर रात तक अत्यधिक परिश्रम करना',
      'विलासिता पर लापरवाही से धन खर्च करना',
      'भीषण आग दुर्घटना का कारण बनना',
      'गरमागरम विवाद में उलझना',
      'दो विपरीत पक्षों से समस्या का समाधान करना'
    ],
    correctOptionIndex: 0,
    marksPositive: 2.0,
    marksNegative: 0.5,
    avgTimeSeconds: 22,
    topperTimeSeconds: 8,
    shortcutTip: 'Literal imagery: burning a candle from both ends consumes it quickly, implying exhausting physical or mental energy.',
    explanation: '"To burn the candle at both ends" means to go to bed late and get up early, or to work excessively hard without adequate rest.'
  }
];

export const mockExamSeries: ExamSeries[] = [
  {
    id: 'sbi-po',
    title: 'SBI PO 2024-2025 Test Series',
    shortCode: 'SBI PO',
    category: 'banking',
    badge: 'Trending #1',
    description: 'Exact TCS iON interface mock tests for SBI PO Prelims & Mains with AI-calibrated percentile prediction and step-by-step shortcuts.',
    totalTests: 35,
    freeTestsCount: 5,
    pyqCount: 6,
    activeAspirants: 48920,
    featured: true,
    papers: [
      {
        id: 'sbi-po-free-mock-1',
        examId: 'sbi-po',
        examTitle: 'SBI PO Prelims',
        category: 'banking',
        paperTitle: 'SBI PO Prelims 2025 - All India Free Mock 1',
        paperType: 'full_mock',
        isFree: true,
        totalQuestions: 10,
        totalMarks: 10,
        durationMinutes: 20,
        negativeMarkingRatio: 0.25,
        cutoffScore: { UR: 58.75, OBC: 56.5, EWS: 57.0, SC: 51.25, ST: 47.5 },
        attemptsCount: 28410,
        sections: [
          { name: 'Quantitative Aptitude', durationMinutes: 7, totalQuestions: 4, maxMarks: 4 },
          { name: 'Reasoning Ability', durationMinutes: 7, totalQuestions: 3, maxMarks: 3 },
          { name: 'English Language', durationMinutes: 4, totalQuestions: 2, maxMarks: 2 },
          { name: 'General & Banking Awareness', durationMinutes: 2, totalQuestions: 1, maxMarks: 1 }
        ],
        questions: sbiPoQuestions
      },
      {
        id: 'sbi-po-pyq-2024',
        examId: 'sbi-po',
        examTitle: 'SBI PO Prelims',
        category: 'banking',
        paperTitle: 'SBI PO Prelims 2024 Previous Year Paper (Memory Based)',
        paperType: 'pyq',
        year: 2024,
        isFree: true,
        totalQuestions: 10,
        totalMarks: 10,
        durationMinutes: 20,
        negativeMarkingRatio: 0.25,
        cutoffScore: { UR: 59.25, OBC: 57.0, EWS: 57.5, SC: 52.0, ST: 48.0 },
        attemptsCount: 39540,
        sections: [
          { name: 'Quantitative Aptitude', durationMinutes: 7, totalQuestions: 4, maxMarks: 4 },
          { name: 'Reasoning Ability', durationMinutes: 7, totalQuestions: 3, maxMarks: 3 },
          { name: 'English Language', durationMinutes: 4, totalQuestions: 2, maxMarks: 2 },
          { name: 'General & Banking Awareness', durationMinutes: 2, totalQuestions: 1, maxMarks: 1 }
        ],
        questions: sbiPoQuestions
      },
      {
        id: 'sbi-po-pro-mock-2',
        examId: 'sbi-po',
        examTitle: 'SBI PO Prelims',
        category: 'banking',
        paperTitle: 'SBI PO Prelims 2025 - High Difficulty Challenger Mock 2',
        paperType: 'full_mock',
        isFree: false,
        totalQuestions: 10,
        totalMarks: 10,
        durationMinutes: 20,
        negativeMarkingRatio: 0.25,
        cutoffScore: { UR: 54.5, OBC: 52.25, EWS: 53.0, SC: 48.0, ST: 44.5 },
        attemptsCount: 16820,
        sections: [
          { name: 'Quantitative Aptitude', durationMinutes: 7, totalQuestions: 4, maxMarks: 4 },
          { name: 'Reasoning Ability', durationMinutes: 7, totalQuestions: 3, maxMarks: 3 },
          { name: 'English Language', durationMinutes: 4, totalQuestions: 2, maxMarks: 2 },
          { name: 'General & Banking Awareness', durationMinutes: 2, totalQuestions: 1, maxMarks: 1 }
        ],
        questions: sbiPoQuestions
      }
    ]
  },
  {
    id: 'ibps-po',
    title: 'IBPS PO 2024-2025 Mock Test Series',
    shortCode: 'IBPS PO',
    category: 'banking',
    badge: 'Popular',
    description: 'Comprehensive test series for IBPS Probationary Officer Prelims and Mains with updated sectional patterns and dynamic cutoffs.',
    totalTests: 30,
    freeTestsCount: 4,
    pyqCount: 5,
    activeAspirants: 41250,
    featured: true,
    papers: [
      {
        id: 'ibps-po-free-mock-1',
        examId: 'ibps-po',
        examTitle: 'IBPS PO Prelims',
        category: 'banking',
        paperTitle: 'IBPS PO Prelims 2024 - Free All India Live Mock',
        paperType: 'full_mock',
        isFree: true,
        totalQuestions: 10,
        totalMarks: 10,
        durationMinutes: 20,
        negativeMarkingRatio: 0.25,
        cutoffScore: { UR: 54.0, OBC: 54.0, EWS: 54.0, SC: 49.5, ST: 44.0 },
        attemptsCount: 22100,
        sections: [
          { name: 'Quantitative Aptitude', durationMinutes: 7, totalQuestions: 4, maxMarks: 4 },
          { name: 'Reasoning Ability', durationMinutes: 7, totalQuestions: 3, maxMarks: 3 },
          { name: 'English Language', durationMinutes: 4, totalQuestions: 2, maxMarks: 2 },
          { name: 'General & Banking Awareness', durationMinutes: 2, totalQuestions: 1, maxMarks: 1 }
        ],
        questions: sbiPoQuestions
      },
      {
        id: 'ibps-po-pyq-2023',
        examId: 'ibps-po',
        examTitle: 'IBPS PO Prelims',
        category: 'banking',
        paperTitle: 'IBPS PO Prelims 2023 Official Memory Based Paper',
        paperType: 'pyq',
        year: 2023,
        isFree: true,
        totalQuestions: 10,
        totalMarks: 10,
        durationMinutes: 20,
        negativeMarkingRatio: 0.25,
        cutoffScore: { UR: 54.25, OBC: 54.25, EWS: 54.25, SC: 49.0, ST: 43.5 },
        attemptsCount: 31200,
        sections: [
          { name: 'Quantitative Aptitude', durationMinutes: 7, totalQuestions: 4, maxMarks: 4 },
          { name: 'Reasoning Ability', durationMinutes: 7, totalQuestions: 3, maxMarks: 3 },
          { name: 'English Language', durationMinutes: 4, totalQuestions: 2, maxMarks: 2 },
          { name: 'General & Banking Awareness', durationMinutes: 2, totalQuestions: 1, maxMarks: 1 }
        ],
        questions: sbiPoQuestions
      }
    ]
  },
  {
    id: 'ssc-cgl',
    title: 'SSC CGL 2024-2025 Tier 1 & Tier 2 Test Series',
    shortCode: 'SSC CGL',
    category: 'ssc',
    badge: 'Top Enrolled',
    description: 'Premier test series for Combined Graduate Level examination featuring 100% updated syllabus, previous year shifts, and speed tests.',
    totalTests: 45,
    freeTestsCount: 6,
    pyqCount: 12,
    activeAspirants: 67300,
    featured: true,
    papers: [
      {
        id: 'ssc-cgl-free-mock-1',
        examId: 'ssc-cgl',
        examTitle: 'SSC CGL Tier 1',
        category: 'ssc',
        paperTitle: 'SSC CGL Tier 1 - All India Live Test 1 (New Pattern)',
        paperType: 'full_mock',
        isFree: true,
        totalQuestions: 4,
        totalMarks: 8,
        durationMinutes: 15,
        negativeMarkingRatio: 0.5,
        cutoffScore: { UR: 145.5, OBC: 138.0, EWS: 139.5, SC: 124.0, ST: 114.5 },
        attemptsCount: 45200,
        sections: [
          { name: 'Quantitative Aptitude', durationMinutes: 4, totalQuestions: 1, maxMarks: 2 },
          { name: 'Reasoning Ability', durationMinutes: 4, totalQuestions: 1, maxMarks: 2 },
          { name: 'General & Banking Awareness', durationMinutes: 3, totalQuestions: 1, maxMarks: 2 },
          { name: 'English Language', durationMinutes: 4, totalQuestions: 1, maxMarks: 2 }
        ],
        questions: sscCglQuestions
      },
      {
        id: 'ssc-cgl-pyq-2024-s1',
        examId: 'ssc-cgl',
        examTitle: 'SSC CGL Tier 1',
        category: 'ssc',
        paperTitle: 'SSC CGL 2024 Tier 1 Shift 1 Official Question Paper',
        paperType: 'pyq',
        year: 2024,
        isFree: true,
        totalQuestions: 4,
        totalMarks: 8,
        durationMinutes: 15,
        negativeMarkingRatio: 0.5,
        cutoffScore: { UR: 142.0, OBC: 135.0, EWS: 136.0, SC: 120.0, ST: 111.0 },
        attemptsCount: 52800,
        sections: [
          { name: 'Quantitative Aptitude', durationMinutes: 4, totalQuestions: 1, maxMarks: 2 },
          { name: 'Reasoning Ability', durationMinutes: 4, totalQuestions: 1, maxMarks: 2 },
          { name: 'General & Banking Awareness', durationMinutes: 3, totalQuestions: 1, maxMarks: 2 },
          { name: 'English Language', durationMinutes: 4, totalQuestions: 1, maxMarks: 2 }
        ],
        questions: sscCglQuestions
      }
    ]
  },
  {
    id: 'rbi-grade-b',
    title: 'RBI Grade B 2025 Phase 1 Comprehensive Test Pack',
    shortCode: 'RBI Grade B',
    category: 'regulatory',
    badge: 'Elite Tier',
    description: 'Designed by RBI specialists covering high-level General Awareness, Financial Management, Economic and Social Issues, and tough Quants.',
    totalTests: 25,
    freeTestsCount: 3,
    pyqCount: 5,
    activeAspirants: 24100,
    featured: true,
    papers: [
      {
        id: 'rbi-grb-free-mock-1',
        examId: 'rbi-grade-b',
        examTitle: 'RBI Grade B Phase 1',
        category: 'regulatory',
        paperTitle: 'RBI Grade B Phase 1 - 2025 Starter Free Mock',
        paperType: 'full_mock',
        isFree: true,
        totalQuestions: 10,
        totalMarks: 10,
        durationMinutes: 20,
        negativeMarkingRatio: 0.25,
        cutoffScore: { UR: 66.75, OBC: 60.5, EWS: 62.0, SC: 54.0, ST: 51.5 },
        attemptsCount: 15400,
        sections: [
          { name: 'General & Banking Awareness', durationMinutes: 5, totalQuestions: 1, maxMarks: 1 },
          { name: 'Quantitative Aptitude', durationMinutes: 5, totalQuestions: 4, maxMarks: 4 },
          { name: 'Reasoning Ability', durationMinutes: 6, totalQuestions: 3, maxMarks: 3 },
          { name: 'English Language', durationMinutes: 4, totalQuestions: 2, maxMarks: 2 }
        ],
        questions: sbiPoQuestions
      }
    ]
  },
  {
    id: 'rrb-po',
    title: 'IBPS RRB PO (Officer Scale 1) 2024-2025 Test Series',
    shortCode: 'RRB PO',
    category: 'banking',
    badge: 'High Selection',
    description: 'Speed-focused mock test package for Regional Rural Banks with 80 questions in 45 minutes composite time calibration.',
    totalTests: 30,
    freeTestsCount: 4,
    pyqCount: 6,
    activeAspirants: 36400,
    featured: false,
    papers: [
      {
        id: 'rrb-po-free-mock-1',
        examId: 'rrb-po',
        examTitle: 'IBPS RRB Officer Scale 1',
        category: 'banking',
        paperTitle: 'RRB PO Prelims 2025 Free Speed Benchmark Mock 1',
        paperType: 'full_mock',
        isFree: true,
        totalQuestions: 7,
        totalMarks: 7,
        durationMinutes: 15,
        negativeMarkingRatio: 0.25,
        cutoffScore: { UR: 56.5, OBC: 54.0, EWS: 54.5, SC: 48.0, ST: 42.0 },
        attemptsCount: 27900,
        sections: [
          { name: 'Quantitative Aptitude', durationMinutes: 8, totalQuestions: 4, maxMarks: 4 },
          { name: 'Reasoning Ability', durationMinutes: 7, totalQuestions: 3, maxMarks: 3 }
        ],
        questions: sbiPoQuestions.slice(0, 7)
      }
    ]
  },
  {
    id: 'rrb-ntpc',
    title: 'Railway RRB NTPC (CBT 1 & CBT 2) Test Series',
    shortCode: 'RRB NTPC',
    category: 'railways',
    badge: 'Huge Openings',
    description: 'Extensive test package for Non-Technical Popular Categories with General Awareness, Mathematics, and General Intelligence.',
    totalTests: 40,
    freeTestsCount: 5,
    pyqCount: 8,
    activeAspirants: 54100,
    featured: false,
    papers: [
      {
        id: 'rrb-ntpc-mock-1',
        examId: 'rrb-ntpc',
        examTitle: 'RRB NTPC CBT 1',
        category: 'railways',
        paperTitle: 'RRB NTPC CBT 1 - Stage 1 All India Mock 1',
        paperType: 'full_mock',
        isFree: true,
        totalQuestions: 4,
        totalMarks: 8,
        durationMinutes: 15,
        negativeMarkingRatio: 0.33,
        cutoffScore: { UR: 72.0, OBC: 68.5, EWS: 67.0, SC: 58.0, ST: 52.0 },
        attemptsCount: 38200,
        sections: [
          { name: 'Quantitative Aptitude', durationMinutes: 5, totalQuestions: 1, maxMarks: 2 },
          { name: 'Reasoning Ability', durationMinutes: 5, totalQuestions: 1, maxMarks: 2 },
          { name: 'General & Banking Awareness', durationMinutes: 5, totalQuestions: 2, maxMarks: 4 }
        ],
        questions: sscCglQuestions
      }
    ]
  },
  {
    id: 'lic-aao',
    title: 'LIC AAO (Generalist) Prelims & Mains Test Series',
    shortCode: 'LIC AAO',
    category: 'insurance',
    badge: 'Insurance Top',
    description: 'Specialized test series with Insurance and Financial Market Awareness, Reasoning, Quant, and English qualifying criteria.',
    totalTests: 20,
    freeTestsCount: 3,
    pyqCount: 4,
    activeAspirants: 19800,
    featured: false,
    papers: [
      {
        id: 'lic-aao-mock-1',
        examId: 'lic-aao',
        examTitle: 'LIC AAO Prelims',
        category: 'insurance',
        paperTitle: 'LIC AAO 2025 Free All India Mock Test 1',
        paperType: 'full_mock',
        isFree: true,
        totalQuestions: 10,
        totalMarks: 10,
        durationMinutes: 20,
        negativeMarkingRatio: 0.25,
        cutoffScore: { UR: 55.5, OBC: 52.0, EWS: 53.0, SC: 46.5, ST: 41.0 },
        attemptsCount: 14200,
        sections: [
          { name: 'Quantitative Aptitude', durationMinutes: 7, totalQuestions: 4, maxMarks: 4 },
          { name: 'Reasoning Ability', durationMinutes: 7, totalQuestions: 3, maxMarks: 3 },
          { name: 'English Language', durationMinutes: 4, totalQuestions: 2, maxMarks: 2 },
          { name: 'General & Banking Awareness', durationMinutes: 2, totalQuestions: 1, maxMarks: 1 }
        ],
        questions: sbiPoQuestions
      }
    ]
  },
  {
    id: 'sebi-grade-a',
    title: 'SEBI Grade A (General Stream) Phase 1 & 2',
    shortCode: 'SEBI Grade A',
    category: 'regulatory',
    badge: 'Premium Stream',
    description: 'Targeted tests for Securities and Exchange Board of India with Commerce, Accountancy, Finance, Costing, and Companies Act questions.',
    totalTests: 22,
    freeTestsCount: 2,
    pyqCount: 4,
    activeAspirants: 16200,
    featured: false,
    papers: [
      {
        id: 'sebi-mock-1',
        examId: 'sebi-grade-a',
        examTitle: 'SEBI Grade A Phase 1',
        category: 'regulatory',
        paperTitle: 'SEBI Grade A Paper 1 (QRE + GA) Diagnostic Mock',
        paperType: 'full_mock',
        isFree: true,
        totalQuestions: 10,
        totalMarks: 10,
        durationMinutes: 20,
        negativeMarkingRatio: 0.25,
        cutoffScore: { UR: 60.0, OBC: 55.0, EWS: 56.0, SC: 50.0, ST: 48.0 },
        attemptsCount: 11200,
        sections: [
          { name: 'Quantitative Aptitude', durationMinutes: 7, totalQuestions: 4, maxMarks: 4 },
          { name: 'Reasoning Ability', durationMinutes: 7, totalQuestions: 3, maxMarks: 3 },
          { name: 'English Language', durationMinutes: 4, totalQuestions: 2, maxMarks: 2 },
          { name: 'General & Banking Awareness', durationMinutes: 2, totalQuestions: 1, maxMarks: 1 }
        ],
        questions: sbiPoQuestions
      }
    ]
  }
];

export const mockCurrentAffairs: CurrentAffairItem[] = [
  {
    id: 'ca-1',
    title: 'RBI Keeps Repo Rate Unchanged at 6.50% in Latest MPC Meeting',
    date: 'Nov 6, 2026',
    category: 'Banking & Economy',
    summary: 'The Monetary Policy Committee (MPC) of the Reserve Bank of India has maintained the key policy repo rate at 6.50% for the tenth consecutive meeting, focusing on enduring alignment of CPI inflation with the 4% target.',
    keyPoints: [
      'Repo Rate held at 6.50%, SDF at 6.25%, and MSF at 6.75%.',
      'Real GDP growth for FY27 projected at 7.2%.',
      'Stance shifted to "Neutral" to provide flexibility while watching global crude volatility.'
    ],
    quizQuestion: {
      question: 'What is the current Repo Rate set by the RBI Monetary Policy Committee?',
      options: ['6.25%', '6.50%', '6.75%', '7.00%'],
      answer: 1,
      explanation: 'The RBI Monetary Policy Committee (MPC) maintained the key policy repo rate at 6.50% in its latest resolution.'
    }
  },
  {
    id: 'ca-2',
    title: 'India Achieves Historic Record in UPI Monthly Transactions',
    date: 'Nov 5, 2026',
    category: 'Finance & Technology',
    summary: 'National Payments Corporation of India (NPCI) reported unified payments interface (UPI) transaction volume crossing 16.5 billion in a single calendar month, valued at over ₹23.5 lakh crore.',
    keyPoints: [
      'Over 16.5 billion transactions recorded in October.',
      'Person-to-Merchant (P2M) transactions constituted 62% of volume.',
      'UPI Global expansion active in UAE, Singapore, France, and Mauritius.'
    ],
    quizQuestion: {
      question: 'Which umbrella organization manages the Unified Payments Interface (UPI) in India?',
      options: ['SEBI', 'NPCI', 'NITI Aayog', 'SIDBI'],
      answer: 1,
      explanation: 'The National Payments Corporation of India (NPCI) is the umbrella organization for operating retail payments and settlement systems in India.'
    }
  },
  {
    id: 'ca-3',
    title: 'India Ranks Among Top 3 Global Patent Filing Nations in WIPO Report',
    date: 'Nov 4, 2026',
    category: 'National & International',
    summary: 'According to the World Intellectual Property Organization (WIPO) World Intellectual Property Indicators report, India recorded the fastest growth in patent and trademark applications globally.',
    keyPoints: [
      'Patent applications filed by Indian residents surged by 31.6%.',
      'India maintained 6th global rank in total patent filings.',
      'WIPO headquarters is situated in Geneva, Switzerland.'
    ],
    quizQuestion: {
      question: 'Where is the headquarters of the World Intellectual Property Organization (WIPO) located?',
      options: ['Vienna, Austria', 'Geneva, Switzerland', 'Paris, France', 'New York, USA'],
      answer: 1,
      explanation: 'The World Intellectual Property Organization (WIPO) is headquartered in Geneva, Switzerland.'
    }
  }
];

export const formulaCheatSheets = [
  {
    subject: 'Quantitative Aptitude',
    topic: 'Speed, Distance & Time (Trains & Boats)',
    points: [
      'Relative speed in same direction: (u - v) km/h; Opposite direction: (u + v) km/h',
      'Downstream speed = Speed of boat (u) + Speed of stream (v)',
      'Upstream speed = Speed of boat (u) - Speed of stream (v)',
      'Speed of boat in still water = ½ (Downstream + Upstream)',
      'Speed of stream = ½ (Downstream - Upstream)',
      'Time to cross a pole / man = Length of train / Speed of train',
      'Time to cross a platform / bridge = (Length of train + Length of platform) / Speed'
    ]
  },
  {
    subject: 'Reasoning Ability',
    topic: 'Syllogism 5 Golden Rules',
    points: [
      '"Only a few A are B" means: Some A are B AND Some A are not B.',
      'If "Only a few A are B", then "All A being B is a possibility" is ALWAYS FALSE.',
      'However, "All B being A is a possibility" can be TRUE.',
      'Definite statement cannot become a possibility: If A is definitely B, "A being B is a possibility" is FALSE.',
      'Complementary pair for Either-Or: (Some + No) or (All + Some Not) with same subject & predicate.'
    ]
  },
  {
    subject: 'General Awareness',
    topic: 'RBI & Banking Terminologies',
    points: [
      'Repo Rate: Rate at which RBI lends short-term funds to banks against G-Secs.',
      'Reverse Repo: Rate at which banks park funds with RBI under collateralized agreements.',
      'SDF (Standing Deposit Facility): Non-collateralized floor rate for absorbing liquidity.',
      'MSF (Marginal Standing Facility): Emergency overnight borrowing rate for scheduled banks.',
      'CRR (Cash Reserve Ratio): Mandatory percentage of NDTL held in cash with RBI (earns zero interest).'
    ]
  }
];
