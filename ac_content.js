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
