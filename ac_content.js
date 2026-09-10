// Assessment Center prep content for First Bank mode.
// Case study model answers are all written in the 5-step framework.
const AC_CONTENT = {

framework: {
  title: "The 5-Step Case Study Framework",
  note: "Use this for ANY case study or parable they give you. Write it on your rough sheet the moment you get the case.",
  steps: [
    { n: 1, title: "Clarify the problem", body: "Restate it in one line. Who is the client? What is the tension? Where exactly is the problem? What decision are you being asked to make?" },
    { n: 2, title: "Find the root cause", body: "Do not just describe what happened — explain WHY it happened. Keep asking why until the real driver shows." },
    { n: 3, title: "Give 2–3 options, not one", body: "Panelists want to see you weigh trade-offs, not pitch a single idea. Lay out the realistic options with pros and cons." },
    { n: 4, title: "Recommend and justify", body: "Pick the strongest option and say why it beats the others. Tie it to something measurable: revenue, retention, risk." },
    { n: 5, title: "Address risk and execution", body: "Every recommendation needs “how would this actually work” and “what could go wrong”. Include mitigations and KPIs." }
  ]
},

cases: [
  {
    title: "XYZBank — Digital Banking & Customer Experience",
    tag: "From your study guide · 30–45 min · individual",
    scenario: [
      "XYZBank has seen digital banking usage grow strongly among young customers — but complaints about failed transactions, delayed reversals and confusing navigation have grown with it.",
      "Management is weighing three options: Option A — improve the existing platform (upgrade the app, fix transaction processing, strengthen support) for ₦2.5bn. Option B — aggressive youth customer acquisition (promotions, campus partnerships, advertising) for ₦1.8bn. Option C — a combination (moderate tech upgrades + targeted acquisition + better service) for ₦2.2bn."
    ],
    data: [
      ["Monthly active digital customers", "4.0m → target 5.5m"],
      ["Failed transactions", "6.5% → target below 3%"],
      ["Avg. complaint resolution", "48 hours → target 12 hours"],
      ["Customer satisfaction", "72% → target 85%"]
    ],
    task: "Which option should management choose, why, what are the major risks, how should it be implemented, and which KPIs should be monitored?",
    answer: {
      clarify: "Client: XYZBank. Tension: digital adoption is booming, but reliability is failing — failed transactions sit at 6.5% (over double the 3% target) and complaints take 48 hours to resolve. Decision: where to invest — fix the platform (A), grow users (B), or combine both (C).",
      root: "The complaints are not a marketing problem; the platform's reliability and support capacity have not scaled with adoption. Growth is happening on a fragile foundation. Acquiring more users into a 6.5% failure rate (Option B alone) would multiply complaints and churn. But fixing technology only (Option A) ignores the growth momentum that is the bank's biggest opportunity.",
      options: [
        { name: "A — Fix the platform (₦2.5bn)", pros: "Attacks the actual complaint drivers: failures, reversals, navigation.", cons: "No growth motion; the 4m → 5.5m customer target is left unaddressed. Most expensive option." },
        { name: "B — Aggressive acquisition (₦1.8bn)", pros: "Cheapest; fastest route to the 5.5m user target.", cons: "Pours new users into a failing funnel — complaints, bad reviews and churn would rise, burning the brand with exactly the young customers it wants." },
        { name: "C — Combination (₦2.2bn)", pros: "Treats the root cause (reliability + support) AND captures growth; phased sensibly.", cons: "Split focus; needs tight programme management to stop either track slipping." }
      ],
      recommend: "Option C. It is the only option that fixes the root cause while still pursuing the growth target — at ₦2.2bn it costs less than A and avoids B's self-defeating risk. Measured against the bank's own targets: failed transactions 6.5% → below 3%, satisfaction 72% → 85%, resolution 48h → 12h, users 4m → 5.5m. Spending on acquisition before reliability (B) would waste money on customers who churn; A alone protects experience but surrenders the youth market window.",
      risk: "Execution: sequence it — first 60 days stabilise transaction processing and reversal SLAs (the biggest pain point), then switch on targeted acquisition only after reliability metrics hold for a full month. Risks: scope creep on the app upgrade, acquisition underperformance, support hiring lag. Mitigations: fixed-scope pilot in two regions before national rollout, a weekly KPI dashboard (failure rate, reversal time, resolution hours, CSAT, active users), and a ~10% contingency budget."
    }
  },
  {
    title: "FirstBank-style — SME Lending Turnaround",
    tag: "Fresh practice case · 30–45 min · individual",
    scenario: [
      "A bank's SME lending unit is losing ground. Loan applications from small businesses rose 40% this year, but average approval turnaround is 12 working days against a competitor average of 48 hours. 55% of applicants abandon the process midway, and the unit's non-performing loan ratio has crept to 4.2% against a 3.5% internal ceiling.",
      "Management is weighing three options: Option A — fully automate credit scoring with a new digital platform (₦1.5bn). Option B — hire 200 additional credit officers (≈₦900m per year). Option C — a hybrid: automate scoring for loans below ₦25m and keep human review for larger exposures (₦1.1bn)."
    ],
    data: [
      ["SME loan applications", "+40% year-on-year"],
      ["Approval turnaround", "12 days vs competitors' 48 hours"],
      ["Application abandonment", "55%"],
      ["NPL ratio", "4.2% vs 3.5% ceiling"]
    ],
    task: "Recommend an option, justify it, and show how you would manage the risks.",
    answer: {
      clarify: "Client: the bank's SME lending unit. Tension: demand is surging (+40%) but a 12-day turnaround is driving 55% abandonment, while credit quality (4.2% NPL) already breaches the 3.5% ceiling. Decision: how to restructure credit delivery — full automation (A), more people (B), or a hybrid (C).",
      root: "The bottleneck is manual, one-size-fits-all credit review: every application — from ₦2m to ₦200m — queues for the same human process. That is why speed fails AND quality slips: officers are overloaded, so they are simultaneously too slow and too shallow.",
      options: [
        { name: "A — Full automation (₦1.5bn)", pros: "Fastest possible turnaround at scale.", cons: "Risky for large/complex SME exposures; a model error could push NPL far above 4.2%; highest cost; long build time." },
        { name: "B — 200 more officers (≈₦900m/yr)", pros: "Quick to start; keeps human judgment.", cons: "A recurring cost that never fixes the structural bottleneck; speed gain limited by the same manual process; training 200 people consistently is hard." },
        { name: "C — Hybrid (₦1.1bn)", pros: "Automates the high-volume small tickets (where speed wins the customer) and keeps human judgment on large tickets (where NPL risk concentrates). One-off cost, cheaper than A.", cons: "Requires a clean ₦25m threshold policy and disciplined model monitoring." }
      ],
      recommend: "Option C. It fixes the root cause — the queue — where it matters most: small loans are the volume driver of the 55% abandonment, and automating them collapses turnaround toward the 48-hour competitor benchmark. Keeping human review above ₦25m protects the NPL ceiling. Measurably: abandonment should fall, turnaround should drop from 12 days toward 2–3, and NPL should hold at or below 3.5%. A is slower to value and riskier on credit quality; B is a recurring expense that leaves the structural problem intact.",
      risk: "Execution: pilot auto-scoring on one product/region for 90 days before scaling; set the ₦25m threshold with credit risk, not IT. Risks: model drift pushing up NPLs, staff resistance, data quality gaps. Mitigations: monthly model back-testing with override reporting, retrain officers into exception-review roles (headcount redeployed, not cut), and a kill-switch threshold — if pilot NPL exceeds 3.5%, auto-scoring pauses automatically. KPIs: turnaround time, abandonment rate, NPL ratio, approval rate, cost per loan."
    }
  },
  {
    title: "FirstBank-style — Winning Over Mrs. Okonkwo (Balogun Market)",
    tag: "Practice case · Relationship Management · individual",
    scenario: [
      "You've just been employed as a Relationship Manager after training school, inheriting a portfolio from a senior RM who was promoted to Branch Manager. Among the accounts is Mrs. Adaeze Okonkwo, who runs a fabric and textile business in Balogun market.",
      "She has banked with you for six years with decent transaction volume — yet her file shows no product beyond a basic current account: no loan, no savings account, no card. When you call to introduce yourself she is polite but distant, says her previous RM “understood her business”, and asks, almost testing you: “so what can you actually do for me that he wasn't already doing?” Meanwhile, her transaction history shows a large share of supplier payments leaving as cash withdrawals rather than transfers — she may be paying some suppliers informally, outside the banking system."
    ],
    data: [
      ["Relationship length", "6 years, decent volume"],
      ["Products held", "Current account only — nothing else"],
      ["Supplier payments", "Largely cash withdrawals, not transfers"],
      ["Her stance", "Polite but distant; loyalty was to the previous RM"]
    ],
    task: "1) What does Mrs. Okonkwo's question actually reveal, and how would you respond in the moment? 2) What does the cash-withdrawal pattern tell you, and why does it matter for how you build the relationship?",
    answer: {
      clarify: "Client: Mrs. Okonkwo, a six-year SME customer inherited from a promoted RM. Tension: she is testing whether you see her as a person or a number, while the bank is leaving years of cross-sell value untouched. Decision: how to earn her confidence first, then grow the relationship.",
      root: "Her test question reveals two things: her loyalty was personal — to the RM, not the bank — and she suspects the handover is a downgrade. Six years with zero products also suggests nobody ever showed her concrete value, so product-pushing now would confirm her fear. The root issue is trust transfer, not product gaps.",
      qa: [
        { q: "Q1 — What her question reveals & your in-the-moment response", a: "It reveals she is measuring respect and competence, not features. So do not pitch. Disarm the test with honesty: “Truthfully, madam — today, probably nothing. He knew your business, and I'd be pretending if I claimed to already understand it the way he did. What I can do is learn it properly, starting with what he got right — and I'd rather do that at your shop than on this call.” Humility plus curiosity wins the moment; a product list loses it. Then follow through within days: a visit to her shop at Balogun, no sales agenda." },
        { q: "Q2 — What the cash pattern tells you & why it matters", a: "Cash-heavy supplier payments mean part of her supply chain is informal. Three implications: (1) Opportunity — she carries cash-handling risk and cost, and builds no credit history from those flows, which she will need the day she wants to expand. (2) Insight — her trade runs on trust and cash discipline; any advice must fit that rhythm, not fight it. (3) Protection — large recurrent cash withdrawals attract compliance attention; formalising her payments protects her account. It matters because this is the door to the real conversation — helping her formalise gradually builds both her credit profile and your credibility. But never frame it as “you're doing it wrong”: her suppliers may demand cash. Understand the chain first, then pilot transfers with one or two willing suppliers." }
      ],
      risk: "What I'd watch out for: don't push any product before you understand her cash cycle; don't over-promise availability you can't sustain; and expect supplier resistance to transfers — if the pilot fails, pause rather than pressure, because a failed first initiative with a distrustful client sets the relationship back further than no initiative at all. Track: visit cadence kept, share of supplier payments moving to transfer, and whether she starts asking YOU questions — the real sign the trust has transferred."
    }
  },
  {
    title: "Century Bank — Rebuilding Mr. Vincent's Trust",
    tag: "Practice case · From your notes · RM presentation to BM",
    scenario: [
      "Mr. Vincent runs an agro-feed business posting ₦100m annual credit turnover, banking mainly through a Zenith savings account. Advised to open a corporate account with a big-five bank serving his suppliers (OLAMS, Lagos), he had reservations: as a corps member he held a Century Bank savings account which he abandoned after a failed POS transaction was never properly processed or refunded — and he had seen bad service reviews about the bank on social media.",
      "The persistence of his old friend Mr. Udeme, a Century Bank RM, convinced him to open the corporate account. The account was opened — then Udeme resigned and relocated to Canada with his family, and the account was handed over to you, a new RM. You are to present to your Branch Manager the key initiatives you will deploy."
    ],
    data: [
      ["Business", "Agro-feed, ₦100m annual credit turnover"],
      ["Wound 1 — personal", "Failed POS transaction, never resolved or refunded"],
      ["Wound 2 — reputational", "Bad service reviews on social media"],
      ["The one bridge", "Udeme (his friend, the RM) just left for Canada"]
    ],
    task: "What relationship management strategy will you deploy to turn a negative experience into a positive one?",
    answer: {
      clarify: "Client: Century Bank; you are the incoming RM presenting to your BM. Situation: a ₦100m-turnover corporate account held together by a personal friendship that has just emigrated. Decision: the strategy to keep and grow this account by converting a negative history into a positive experience.",
      root: "Say the real problem out loud first: Mr. Vincent did not leave because Century Bank is a bad bank — a POS transaction failed, nobody fixed it properly, and he was left holding the frustration with no resolution. That is not a product problem; it is a trust problem. And it is TWO wounds, not one: a personal experience (the unresolved POS refund) and a reputational doubt (social media reviews). Treat them as a single issue and you have already lost marks — you haven't understood the case.",
      qa: [
        { q: "Name and own the personal wound", a: "Acknowledge the POS failure openly — no pretending it didn't happen. People trust you more when you own a mistake than when you avoid it. Then give him a concrete reason to believe this time is different, not just words: a named direct line to you with a defined response SLA (and don't be quick to assure him you'll pick at any time — promise only what you can sustain), a written resolution timeline for any failed transaction, and a small gesture that shows the bank actually heard him." },
        { q: "Treat the handover as the emergency it is", a: "The one relationship that made him trust this bank just walked out the door. Reach out proactively — before he asks “so who's handling my account now?” Ideally Udeme introduces you directly with a warm handover call. If you stay silent, you confirm his fear that the bank sees him as a number, not a person. Panelists listen for exactly this: the mechanics of how trust gets rebuilt, not the generic phrase “I would build trust.”" },
        { q: "Address the reputational wound separately", a: "Don't argue with social media — outperform it. Invite him to judge the bank on his own dashboard: share your service commitments, report his issue-resolution metrics to him quarterly, and let consistent delivery quietly contradict the reviews. Over time, a client whose problems visibly get fixed becomes your counter-evidence — potentially even an advocate." }
      ],
      risk: "End with what could go wrong, because every solution has a cost: if you promise Mr. Vincent the world to win him over and then don't deliver, you haven't solved the trust problem — you've made it worse, permanently this time. So set only SLAs the branch can keep, escalate systemic failures rather than absorbing them personally, and watch the proof points: his resolution times, his transaction volume trend, and whether he begins referring other businesses — the true signal that trust has been rebuilt."
    }
  },
  {
    title: "Naija International Bank — Sarah's Bakery Expansion",
    tag: "Practice case · Entry-level RM · individual",
    scenario: [
      "You are a newly employed Relationship Manager at Naija International Bank, assigned a portfolio of small business owners, individual investors and high-net-worth individuals. One client, Sarah, runs a local bakery and has banked with you for several years.",
      "She wants to expand: new equipment, and possibly a second location. But she is worried about the risks of taking on debt and wants any decision to align with her long-term business goals."
    ],
    data: [
      ["Client", "Sarah — local bakery, multi-year customer"],
      ["Ambition", "New equipment + possible second location"],
      ["Her concern", "Debt risk; decisions must fit long-term goals"],
      ["Your role", "Entry-level RM — advise, don't just sell"]
    ],
    task: "1) How would you assess Sarah's financial situation? 2) What financing options would you present? 3) How would you build a long-term relationship beyond this transaction?",
    answer: {
      clarify: "Client: Sarah, a loyal SME owner at an expansion crossroads. Tension: growth requires capital, but she fears debt could endanger the business she's built. Decision: which financing — if any — to recommend, and how to become her long-term adviser rather than a one-transaction salesperson.",
      root: "Her real question is not “can I get a loan?” — it is “will this debt put my business at risk?” She needs the decision de-risked with numbers, not a product pitch. An RM who answers the surface question sells a loan; an RM who answers the real question builds a client for decades.",
      qa: [
        { q: "Q1 — Assessing her financial situation", a: "Start from her own account data: turnover and cash-flow seasonality from her transaction history, average balances, existing obligations, and how much surplus the business generates monthly. Then sit with her: profit margins, the cost of the equipment, the revenue the equipment and second location would realistically add, and her personal goals. The key test: can projected cash flow service the debt with headroom — covering repayments comfortably even in her slow season?" },
        { q: "Q2 — Financing options to present", a: "Present options with trade-offs, not one product. A — Asset/equipment finance for the machinery: the equipment secures the loan, repayments match its productive life, and her working capital stays intact. B — A working-capital overdraft: flexible and cheaper if the need is short-term, but wrong for long-lived assets and dangerous if it quietly becomes permanent debt. C — A phased plan: finance the equipment now, bank the improved cash flow, and revisit the second location after 6–12 months of proven numbers — possibly part-funded from retained profits to keep leverage low. Recommendation: C, built on A — it matches debt to the asset's life, respects her debt anxiety, and ties the bigger leap to evidence, not optimism." },
        { q: "Q3 — Building the relationship beyond this transaction", a: "Schedule business reviews, not sales calls — quarterly, aligned to her baking calendar. Introduce products only when they solve a real problem she's expressed (a POS/collections solution as she grows, a savings vehicle for surplus, insurance for the new equipment). And be the RM who sometimes says “not yet” to a product that doesn't fit — the day your advice costs the bank a sale but saves her money is the day you become her banker for life." }
      ],
      risk: "What could go wrong: over-leveraging a good business, opening the second location before the first is systemised, and management attention splitting across two sites. Mitigations: size the loan to her slow-season cash flow, not her best month; set a 6-month post-expansion review; and watch the numbers — equipment utilisation, revenue per location, repayment behaviour — so trouble is caught months before it becomes default."
    }
  }
],

group: {
  title: "Group Exercise",
  scenario: "Practice task (from your guide): your group is given ₦1 billion to increase financial inclusion among young Nigerians. Allocate it across: A. Digital banking education · B. Student banking initiatives · C. Agent banking expansion · D. Financial literacy campaigns · E. Digital infrastructure. You have 25 minutes to discuss, agree priorities, allocate the money, develop a strategy and present it. There is no single correct allocation — what matters is whether you can defend your reasoning.",
  rules: [
    { n: 1, title: "Your case study feeds the group discussion", body: "What you write in your individual case study may be used in the group discussion. Write it as if you will have to defend every line of it out loud." },
    { n: 2, title: "Contribute meaningfully", body: "Your group contributions will largely come from what you submitted in your personal case study — so know your own analysis cold and build on it in the room." },
    { n: 3, title: "Never interrupt the group leader", body: "Whoever is elected group leader — do not interrupt their speech. If they omit an important point, wait for a natural pause and then add it. DO NOT INTERRUPT." }
  ],
  criteria: ["Leadership", "Teamwork", "Listening", "Persuasion", "Respect for other opinions", "Conflict management", "Decision-making", "Time management", "Communication"],
  powerPhrases: [
    "“That's a good point. Perhaps we can combine your suggestion with the earlier proposal.”",
    "“We have about ten minutes left. Can we agree on our evaluation criteria before deciding?”",
    "“I understand your concern. Could we look at the potential impact on customers before making the decision?”",
    "“Before we allocate, can we agree what success looks like — reach, cost per user, or sustainability?”"
  ],
  donts: [
    "Don't dominate the discussion — the strongest candidate is rarely the person who talks the most.",
    "Don't go completely silent either — silence reads as disengagement.",
    "Don't dismiss anyone's idea without acknowledging it first.",
    "Don't lose track of time — volunteering to keep time is free leadership points."
  ]
},

cbi: {
  title: "Competency-Based Interview",
  star: {
    name: "Answer everything with STAR",
    steps: [
      ["S — Situation", "Set the scene in one or two sentences: where, when, what context."],
      ["T — Task", "What was YOUR specific responsibility or goal?"],
      ["A — Action", "What YOU did — not the team. This should be 60% of your answer."],
      ["R — Result", "The outcome, ideally with a number. Then one line on what you learned."]
    ]
  },
  questions: [
    { q: "Tell us about yourself", competency: "Introduction", how: ["90 seconds, no life history: educational background → relevant experience → key strengths → leadership/team experience → why this programme.", "End on why First Bank specifically — link your strengths to what the graduate programme needs."], avoid: "Reciting your CV chronologically or personal details that don't serve the role." },
    { q: "Tell me about a time you worked in a team", competency: "Teamwork", how: ["Pick an example where the team had a real obstacle, not a smooth project.", "Show your specific role: how you coordinated, resolved friction, or carried others through a deadline."], avoid: "“We did everything together” — assessors score YOUR contribution, not the team's." },
    { q: "Describe a problem you solved against all odds or with little information", competency: "Problem-solving", how: ["Emphasise how you structured the unknowns: what you assumed, what you tested first, how you decided with incomplete data.", "Show resourcefulness — who you asked, what you researched, what you improvised."], avoid: "A problem someone else actually solved while you watched." },
    { q: "Give an example of when you motivated others", competency: "Leadership", how: ["Leadership ≠ title. Coordinating a project, reviving a demoralised group, or organising people all count.", "Show the mechanism: what you said or did that changed the group's energy, and the measurable result."], avoid: "Claiming authority you didn't have, or a story where you motivated by pressure alone." },
    { q: "Tell me about a time you had to adapt to change", competency: "Adaptability", how: ["Pick a change you didn't choose: a sudden deadline move, a new tool, a restructure.", "Show the pivot: what you had to unlearn, how fast you ramped up, and that the outcome stayed strong."], avoid: "Sounding like you merely tolerated the change — show you made it work." },
    { q: "Describe a time you faced an ethical dilemma", competency: "Integrity", how: ["Choose a real dilemma: two defensible options, something at stake for you personally.", "Show your reasoning, the principle you applied, and that you'd do it again — integrity questions test consistency, not heroics."], avoid: "Fake dilemmas (“I was too honest”) or anything where you benefited from the wrong choice." },
    { q: "Describe a time you achieved a result within a very short deadline", competency: "Deadline pressure", how: ["Explain your triage: what you cut, what you protected, how you sequenced the work.", "Quantify the compression (“normally 2 weeks, I delivered in 3 days”) and the quality of the result."], avoid: "A story about all-nighters with no method — they want a repeatable approach to pressure." },
    { q: "Where do you see yourself in the next 5/10 years", competency: "Leadership & self-development", how: ["Anchor it inside the bank: grow from graduate trainee into a specialist/leader in an area you name (e.g. digital banking, risk, SME banking).", "Show ambition with humility: mastery first, then leadership of people and portfolios."], avoid: "“Your job”, vague “successful” answers, or plans that clearly sit outside the bank." }
  ]
},

presentation: {
  title: "Presentation Exercise",
  topic: "Practice topic (from your guide): “How can a bank attract and retain young customers in an increasingly digital financial environment?” — 15 minutes to prepare, 5–7 minutes to present.",
  structure: [
    ["1. The Challenge", "What young customers expect: convenience, speed, digital access, personalisation, fair pricing, responsive service."],
    ["2. Proposed Strategy", "Three initiatives max, e.g.: better digital experience (app reliability, onboarding), youth-focused products (student accounts, savings goals), youth engagement (campus partnerships, financial literacy)."],
    ["3. Implementation", "Phasing, owners, rough cost, timeline — the same “how would this work” discipline as the case study."],
    ["4. Risks & KPIs", "What could go wrong and how you'll know it's working: active users, satisfaction, complaint resolution time."],
    ["5. Close", "One-line recommendation restated. Leave them with the number that matters."]
  ],
  tips: [
    "Structure beats slides — a clear 5-part flow on plain paper beats a beautiful deck with no logic.",
    "The same 5-step case framework works here: clarify → root cause → options → recommend → risk.",
    "Rehearse out loud at least twice; 5–7 minutes is shorter than you think.",
    "Expect questions afterwards — every claim you make is fair game, so only present what you can defend."
  ]
}

};
