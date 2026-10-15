// Essay topics for the typed essay section, taken from the Deloitte Graduate Test Essay 2024
// ("DELOITTE FY25 ASSESSMENT.pdf": 20 minutes, choose one topic). For each topic, `guide` holds a
// RANGE of acceptable approaches for the grader and for review after writing. It is not a single
// model answer: any clear, well-supported position should be credited.
window.PREP_ESSAYS = window.PREP_ESSAYS || {};
window.PREP_ESSAYS.deloitte = {
  minutes: 20,
  source: 'Deloitte Graduate Test Essay 2024',
  instructions: 'You will have 20 minutes to work on this test. The timer starts when you click Start. Choose your preferred essay topic from the list.',
  criteria: [
    { key: 'relevance', name: 'Answers the question', weight: 20, desc: 'Addresses every part of the prompt (e.g. both “how true is this?” and “differentiate…”), takes a clear position and stays on topic.' },
    { key: 'argument', name: 'Reasoning', weight: 25, desc: 'Logical, well-developed points; considers the other side; the conclusion follows from the argument.' },
    { key: 'evidence', name: 'Evidence and examples', weight: 20, desc: 'Specific, accurate examples (Nigerian, African or global as asked); facts are used to support points, not as filler.' },
    { key: 'structure', name: 'Structure', weight: 15, desc: 'An introduction that states the position, organised body paragraphs, and a conclusion that answers the question; sensible length for 20 minutes (about 350–550 words).' },
    { key: 'language', name: 'Language', weight: 20, desc: 'Grammar, spelling, punctuation, word choice and a clear, formal register.' },
  ],
  topics: [
    {
      id: 'dl-essay-1', title: 'Minimum entry age of 18 for tertiary admission',
      prompt: 'In a recent development, the Federal Government of Nigeria is considering the adoption of 18 years as the entry age for admission into Nigerian universities and other tertiary institutions. What is your position on this? State your reasons for and/or against the proposal.',
      guide: {
        assesses: 'A clear position (for, against, or for-with-conditions) backed by reasons, awareness of the education system’s design, and fairness to different groups of students.',
        positions: [
          { stance: 'For the policy', points: ['Aligns with the 6-3-3-4 design: a child who starts primary school at 6 finishes secondary school at about 18.', 'Emotional and social maturity for independent campus life, course choice and handling pressures such as cultism and peer pressure.', 'Discourages “miracle centres” and the rush to push under-age candidates through WAEC and UTME early.', 'Brings Nigeria in line with common international entry ages.'] },
          { stance: 'Against the policy', points: ['Age is a poor proxy for readiness: gifted or early-starting students are held back.', 'Wastes a year or two for students who finished secondary school at 15 or 16, with cost to families.', 'Students may go abroad or to private institutions, worsening capital flight.', 'Better levers exist: fix the quality of secondary schooling, guidance counselling and exam integrity.'] },
          { stance: 'Conditional support (often the strongest answer)', points: ['Accept 18 as the norm, but with a transition period and exceptions for exceptional candidates assessed on merit.', 'Pair the policy with fixing basic education so that age reflects real readiness, not just a rule.'] },
        ],
        examples: ['The 2024 announcement by the Federal Ministry of Education and the public debate that followed, including JAMB’s handling of under-18 candidates.', 'The 6-3-3-4 (now 9-3-4) structure of Nigerian education.', 'Common entry ages in other systems: around 18 in the UK, US and Ghana.'],
        structure: 'Intro: state your position. Body: 2–3 reasons for, address the strongest counter-argument, propose safeguards. Conclusion: restate the position and the condition that makes it work.',
        pitfalls: ['Describing the policy without taking a position.', 'Arguing only from personal anecdote.', 'Ignoring the “for and/or against” instruction (no counter-argument).'],
      },
    },
    {
      id: 'dl-essay-2', title: 'University autonomy and Nigeria’s federalism',
      prompt: 'One of the ills bedeviling tertiary education in Nigeria is the lack of autonomy. It is part of Nigeria’s flawed federalism in which the centre controls the affairs of the federating units in a master-servant relationship. Should this trend continue, or does the government need to have a re-think of the matter?',
      guide: {
        assesses: 'Understanding of what autonomy means (academic, administrative, financial), its link to federalism, and a reasoned recommendation.',
        positions: [
          { stance: 'Re-think: grant real autonomy (most common)', points: ['Central control of funding, salaries (e.g. the IPPIS dispute) and appointments slows decisions and politicises governance.', 'Repeated ASUU strikes, such as the eight-month strike in 2022, show the cost of a centralised master-servant model.', 'Autonomous governing councils could set priorities, partner with industry and raise funds.', 'True federalism would let states and institutions innovate and compete.'] },
          { stance: 'Keep some central control', points: ['Central funding and NUC standards protect equity across regions and prevent fees shutting out poor students.', 'Autonomy without accountability can breed nepotism and mismanagement at campus level.'] },
          { stance: 'Balanced reform', points: ['Financial and administrative autonomy with transparent accountability: audited accounts, performance-based funding through TETFund and NUC quality assurance.', 'Phase it in, starting with institutions that show strong governance.'] },
        ],
        examples: ['The Universities (Miscellaneous Provisions) (Amendment) Act 2003, which granted autonomy largely on paper.', 'The IPPIS versus UTAS payroll dispute and the 2022 ASUU strike.', 'Comparisons with autonomous systems such as the UK or South African universities.'],
        structure: 'Define autonomy and link it to federalism. Show the effects (strikes, quality, brain drain). Weigh arguments. Recommend what should change and how.',
        pitfalls: ['Only complaining about strikes without explaining autonomy.', 'Not answering the direct question: continue, or re-think?'],
      },
    },
    {
      id: 'dl-essay-3', title: 'The low global ranking of Nigerian universities',
      prompt: 'In the 2023 Webometric ranking, Nigeria’s universities rank low globally, with the best-ranked Nigerian university in 14th place in sub-Saharan Africa, 21st in Africa and 1,138th in the world. What are the implications of this on our national development? In your own opinion, how can we improve the situation and re-position our university education into an enviable position?',
      guide: {
        assesses: 'Both parts: the implications for national development AND concrete, prioritised solutions. Bonus for knowing what Webometrics measures.',
        positions: [
          { stance: 'Implications', points: ['Weaker research and innovation output, which slows industrial and economic development.', 'Graduates are less competitive, and employers complain about employability.', 'Brain drain (“japa”) of lecturers and students, and capital flight on foreign tuition.', 'Low international partnership and research funding attracted.'] },
          { stance: 'Causes worth naming', points: ['Chronic underfunding (education often gets well below the UNESCO benchmark of 15–20% of public spending).', 'Strikes and disrupted calendars, poor infrastructure and labs.', 'Weak web presence: Webometrics rewards online visibility, open access and citations, so poor institutional websites and repositories lower scores.'] },
          { stance: 'Solutions', points: ['Sustained funding tied to performance (TETFund, research grants).', 'Staff welfare and retention, plus a diaspora engagement scheme.', 'University–industry partnerships and commercialisation of research.', 'Open-access institutional repositories and better digital presence.', 'Governance autonomy and a stable academic calendar.'] },
        ],
        examples: ['African leaders in the rankings, such as the University of Cape Town, Makerere and the University of Nairobi.', 'Research-led growth stories like South Korea and Singapore, where university investment fed industry.'],
        structure: 'Intro: what the ranking shows. Body 1: implications. Body 2: causes (briefly). Body 3: prioritised solutions. Conclusion: what must happen first.',
        pitfalls: ['Answering only one of the two questions.', 'A long list of solutions with no priority or explanation.'],
      },
    },
    {
      id: 'dl-essay-4', title: 'The youth and national development',
      prompt: 'The youth population is often the most active part of a society. Young people play a crucial role in the development of a country. They are a valuable resource that can contribute to the social, economic, and cultural advancement of a nation. Discuss extensively, using Nigeria as a peculiar case study.',
      guide: {
        assesses: 'An extended discussion of the youth’s social, economic and cultural contributions, the barriers they face, and what would let them reach their potential, all grounded in Nigeria.',
        positions: [
          { stance: 'Contributions', points: ['Economic: tech and fintech start-ups (Paystack, acquired by Stripe in 2020; Flutterwave), the creative economy.', 'Cultural: Afrobeats and Nollywood exported Nigerian culture globally (for example Burna Boy’s 2021 Grammy).', 'Social and civic: #EndSARS (2020) and voter mobilisation; the Not Too Young To Run Act (2018).'] },
          { stance: 'Barriers', points: ['High youth unemployment and underemployment (NBS reported youth unemployment above 40% in late 2020).', 'Poor-quality education and skills mismatch, limited credit, insecurity, and drug abuse.', 'Emigration (“japa”) of skilled young people.'] },
          { stance: 'What would realise the dividend', points: ['Skills and vocational training linked to industry, and digital-skills programmes.', 'Access to finance for youth enterprises, and an enabling environment (power, policy stability).', 'Inclusion in governance and decision-making.'] },
        ],
        examples: ['Nigeria’s very young population (median age around 18).', 'The demographic dividend in East Asian economies.'],
        structure: 'Intro: the youth as an asset (with a figure). Body: social, economic and cultural roles with Nigerian examples. Then challenges. Then recommendations. Conclusion.',
        pitfalls: ['Generic praise of youth with no Nigerian specifics.', 'Ignoring “discuss extensively”: too short or one-sided.'],
      },
    },
    {
      id: 'dl-essay-5', title: 'Is buying and selling real business?',
      prompt: 'Some schools of thought believe that real business productivity is not buying and selling. How true is this? Differentiate between a market and what genuine business means.',
      guide: {
        assesses: 'A judgement on the claim (“how true”), AND a clear definition contrasting a market with genuine business. Credit nuance about where value is created.',
        positions: [
          { stance: 'Largely true', points: ['Productivity comes from value creation: transforming inputs into goods and services, solving problems and innovating.', 'An economy dominated by import-and-resell trading creates few jobs and little value at home.'] },
          { stance: 'Only partly true (strong answers often land here)', points: ['Trade is itself productive when it adds value through distribution, logistics, aggregation and access to markets (e.g. retail chains, agro-aggregators).', 'The real distinction is value added versus pure arbitrage, not trading versus making.'] },
          { stance: 'Definitions to include', points: ['Market: a place or mechanism where buyers and sellers meet and prices are formed (physical markets like Balogun, or online platforms).', 'Genuine business: an organised, sustained activity that creates value for customers profitably: planning, production or service delivery, employment, and reinvestment.'] },
        ],
        examples: ['Cement: Nigeria moved from importer to self-sufficiency through local production by firms such as Dangote.', 'Import-dependent trading versus local manufacturing and agro-processing.'],
        structure: 'Intro: the claim and your verdict. Define market and genuine business. Argue how far the claim holds, with examples. Conclude.',
        pitfalls: ['Skipping the “differentiate” part.', 'Treating all trade as unproductive without nuance.'],
      },
    },
    {
      id: 'dl-essay-6', title: 'Poverty and family size',
      prompt: 'To what extent are low levels of living an important factor in limiting the freedom of parents to choose a desired family size? Is there a relationship between poverty and family size? Discuss with relevant examples.',
      guide: {
        assesses: 'A “to what extent” judgement, an explanation of the poverty–fertility link in both directions, and relevant examples.',
        positions: [
          { stance: 'Poverty strongly shapes family size', points: ['Children as old-age security and household labour where there is no social safety net.', 'High infant and child mortality encourages more births (insurance).', 'Low female education and poor access to family-planning services limit real choice.'] },
          { stance: 'Two-way relationship', points: ['Large families can deepen poverty: per-child spending on health and education falls.', 'This creates a poverty–fertility cycle.'] },
          { stance: 'Poverty is not the whole story', points: ['Culture, religion and partner or family pressure also limit choice.', 'Bangladesh cut fertility sharply while still poor, through community family-planning programmes and girls’ education, so policy matters as well as income.'] },
        ],
        examples: ['Nigeria’s total fertility rate is about 5.3 children per woman (NDHS 2018), much higher in the North West than the South West.', 'Demographic transition theory: fertility falls as incomes, education and child survival rise.'],
        structure: 'Intro: define levels of living and your extent judgement. Body: the mechanisms, the reverse link, other factors and examples. Conclusion: “to a large extent, but…”.',
        pitfalls: ['Answering only “yes, there is a relationship” without the “to what extent”.', 'No examples.'],
      },
    },
    {
      id: 'dl-essay-7', title: 'Population growth and Africa’s health and education systems',
      prompt: 'Given the anticipated population growth in Africa, will African countries be able to extend the coverage and improve the quality of their health and educational systems? Discuss further with tangible reasons.',
      guide: {
        assesses: 'A reasoned prediction (yes, no, or conditional) with tangible reasons covering BOTH health and education, coverage AND quality.',
        positions: [
          { stance: 'Pessimistic', points: ['Africa’s population is projected to roughly double by 2050 (UN estimates of about 2.5 billion), outpacing budgets.', 'There are already shortages of teachers, classrooms, doctors and nurses, worsened by brain drain.', 'Nigeria has one of the largest out-of-school populations in the world.'] },
          { stance: 'Optimistic, if…', points: ['A young population is a potential dividend if invested in.', 'Proven low-cost models: Ethiopia’s Health Extension Programme and Rwanda’s community health workers and community-based insurance.', 'Free primary education expanded enrolment (Kenya 2003), and digital learning can stretch capacity.'] },
          { stance: 'Conditional (often strongest)', points: ['Possible only with higher, better-spent budgets, health insurance (e.g. Ghana’s NHIS, Nigeria’s NHIA Act 2022), teacher training and domestic resource mobilisation.', 'Coverage may expand faster than quality, so the quality gap is the real risk.'] },
        ],
        examples: ['Ethiopia, Rwanda, Ghana and Kenya as above; Nigeria’s doctor emigration.'],
        structure: 'Intro: the demographic projection and your answer. Body: challenges, evidence of what works, and the conditions. Conclusion: the verdict.',
        pitfalls: ['Covering only health or only education.', 'Vague reasons (“government should do more”).'],
      },
    },
    {
      id: 'dl-essay-8', title: 'Population growth and levels of living',
      prompt: 'Will African countries be capable of improving the levels of living for their people with the current and anticipated levels of population growth? To what extent does rapid population increase make it (either easier or more difficult) to provide essential social services to the citizenry? Expatiate with cogent case studies.',
      guide: {
        assesses: 'Both questions, a balanced view of whether population growth helps or hinders, and real case studies.',
        positions: [
          { stance: 'Population growth makes it harder', points: ['The Malthusian strain: services, jobs and infrastructure cannot keep pace.', 'Nigeria: over 60% of people classed as multidimensionally poor (NBS 2022), and congested cities like Lagos.'] },
          { stance: 'Growth can make it easier', points: ['Boserup and demographic-dividend views: a larger workforce and markets spur innovation and economies of scale, if jobs are created.', 'East Asia’s dividend came with education and manufacturing investment.'] },
          { stance: 'It depends on governance and productivity', points: ['Botswana and Mauritius improved living standards through prudent management and diversification.', 'Rwanda and Ethiopia expanded services rapidly despite growth.', 'So the answer is capable, but not automatically.'] },
        ],
        examples: ['Nigeria’s poverty figures, Lagos urbanisation, Botswana’s diamond revenue management, Mauritius’s diversification, and the East Asian dividend.'],
        structure: 'Intro: your position. Body: the case that it is harder, the case that it is easier, then case studies. Conclusion: the conditions for success.',
        pitfalls: ['Treating population growth as only negative.', 'No case studies, despite “expatiate with cogent case studies”.'],
      },
    },
    {
      id: 'dl-essay-9', title: 'Corruption in sub-Saharan Africa',
      prompt: 'Although corruption has attracted researchers’ attention for more than two decades, it remains one of the most significant political and socio-economic challenges that all countries face. Discuss this with relevant examples in sub-Saharan African countries.',
      guide: {
        assesses: 'An analysis of why corruption persists, its political and socio-economic effects, specific SSA examples, and credible remedies.',
        positions: [
          { stance: 'Why it persists', points: ['Weak institutions and impunity, patronage politics, low public-sector pay, opaque resource revenues and cash economies.'] },
          { stance: 'Effects', points: ['Diverted public funds and poor services, deterred investment, inequality, and loss of trust in government.'] },
          { stance: 'Remedies (show it is not hopeless)', points: ['Strong independent agencies such as the EFCC (2003) and ICPC, a Treasury Single Account and digitised payments.', 'Asset recovery, beneficial-ownership registers, whistleblower protection, and press freedom.', 'Botswana’s and Rwanda’s comparatively better records show institutions matter.'] },
        ],
        examples: ['Repatriation of the Abacha loot from Switzerland, the US and Jersey.', 'South Africa’s state-capture inquiry (the Zondo Commission).', 'Transparency International’s CPI, where sub-Saharan Africa has the lowest regional average score.'],
        structure: 'Intro: define corruption and its persistence. Body: causes, effects with SSA examples, and what works. Conclusion.',
        pitfalls: ['A list of scandals with no analysis.', 'Inaccurate figures or names (better to be general than wrong).'],
      },
    },
    {
      id: 'dl-essay-10', title: 'Sport as a tool for unity and diplomacy',
      prompt: 'Sports are globally regarded as a strong source of harnessing diversities that may exist in a national system for sustainable socio-economic and political development. In addition, sports have been used by different countries as a justifiable mechanism for foreign policy and a verifiable vehicle for peaceful coexistence. How relevant is this submission? Justify your position with verifiable examples in Africa and beyond.',
      guide: {
        assesses: 'A judgement on relevance covering national unity, development and diplomacy, with verifiable examples from Africa and beyond, and acknowledgement of limits.',
        positions: [
          { stance: 'Highly relevant', points: ['National unity: Nigeria’s 1996 Atlanta Olympic football gold united the country; the Super Eagles rally Nigerians across ethnic and religious lines; the National Sports Festival was designed for unity.', 'Reconciliation: Mandela embraced the Springboks at the 1995 Rugby World Cup.', 'Peace: in 2005 Didier Drogba appealed for a ceasefire in Côte d’Ivoire after World Cup qualification.', 'Diplomacy: US–China “ping-pong diplomacy” (1971); African boycotts of apartheid-era sport.', 'Economy: jobs, tourism and talent exports.'] },
          { stance: 'Relevant but limited', points: ['Sport can also divide (hooliganism, rivalries), be undermined by corruption in federations, or be used for “sportswashing”.', 'Effects can be short-lived without wider policy.'] },
        ],
        examples: ['As above, plus AFCON as a continental unifier and the Olympics as a stage for diplomacy.'],
        structure: 'Intro: your position on relevance. Body: unity and development, diplomacy and peace, then the limits. Conclusion: the conditions under which the claim holds.',
        pitfalls: ['Examples that cannot be verified or that are inaccurate.', 'Covering only Nigeria when the prompt asks for Africa and beyond.'],
      },
    },
  ],
};
