# APSY Lab — Psychometric Testing Platform
## Architecture Document v1.0

---

## 1. Product Vision

A web platform under APSY Lab offering validated, self-report and performance-based psychological assessments across six categories:

1. Personality Tests
2. Intelligence Tests (IQ / cognitive ability)
3. Clinical & Diagnostic Rating Scales
4. Neuropsychological Tests
5. Aptitude and Achievement Tests
6. Career and Interest Inventories

**Positioning:** a self-insight and research platform — not a diagnostic tool. Every clinical-adjacent test carries an explicit "not a substitute for professional evaluation" frame. This isn't just legal cover; it's the correct clinical stance for an unsupervised self-report tool, and it's the stance a psychology-trained builder should take by default.

---

## 2. The Licensing Reality (read this before building anything)

This is the part most CS-only teams get wrong, and it's the part your psychology background lets you get right.

**Cannot legally reproduce (commercial, copyrighted, licensed):**
- MMPI-2 / MMPI-2-RF (Pearson/University of Minnesota)
- WAIS-IV, WISC-V (Pearson)
- MBTI (The Myers-Briggs Company)
- Beck Depression/Anxiety Inventories (Pearson)
- Raven's Progressive Matrices (Pearson)
- Most "named" branded inventories you'll recognize from psych textbooks

**Free to use / public domain / open-license (build the MVP catalog from these):**

| Category | Instrument | License status |
|---|---|---|
| Personality | IPIP-Big Five (50 or 120 item) | Public domain (International Personality Item Pool) |
| Clinical — depression | PHQ-9 | Public domain (Pfizer-funded, free for all use) |
| Clinical — anxiety | GAD-7 | Public domain |
| Clinical — stress | Perceived Stress Scale (PSS-10) | Free for research/clinical use, cite Cohen et al. |
| Clinical — self-esteem | Rosenberg Self-Esteem Scale | Public domain |
| Clinical — autism screen | AQ-10 | Free for non-commercial use, cite Baron-Cohen |
| Affect | PANAS | Free for academic/non-commercial use |
| Career interest | RIASEC / Holland Code (build original items) | Concept is public; O*NET Interest Profiler items are US govt public domain |
| IQ/aptitude | Original matrix-reasoning, verbal/numerical reasoning items | Design your own — don't clone Raven's item structure |
| Neuropsych | Stroop task, N-back, Simple Reaction Time, Digit Span | Paradigms are public domain; build your own stimuli |

**Action item before coding:** maintain a `LICENSING.md` in the repo that logs, per test, the source citation and permitted use terms. This is exactly the kind of artifact that turns "student project" into "defensible product" if APSY Lab ever seeks academic collaborators or grant funding.

---

## 3. Regulatory & Data Context (India-specific, since APSY Lab is India-based)

- **DPDP Act 2023** (India's data protection law) applies — mental-health-adjacent responses likely count as sensitive personal data. Build consent flows and data-minimization in from day one, not retrofitted later.
- No HIPAA obligation (India, not US-based clinical entity), but treat clinical screener data with HIPAA-equivalent discipline anyway — it's the credible-signal move if you ever want clinical/academic partners.
- Decide early: are results tied to identifiable accounts, or anonymous/pseudonymous by default with opt-in accounts for longitudinal tracking? Recommendation: **anonymous-first**, account optional for saving history.

---

## 4. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client (Next.js)                        │
│   Test-taking UI · Results dashboard · Consent flows         │
└───────────────┬───────────────────────────────┬─────────────┘
                │                               │
        ┌───────▼────────┐             ┌────────▼─────────┐
        │  API Gateway    │             │   WebSocket       │
        │  (Node/Express) │             │   Gateway         │
        │  REST endpoints │             │  (timed/reaction  │
        └───────┬─────────┘             │   tests)          │
                │                       └────────┬──────────┘
   ┌────────────┼────────────────┬───────────────┘
   │            │                │
┌──▼──────┐ ┌───▼─────────┐ ┌────▼──────────┐
│ Test     │ │ Session/    │ │ Scoring        │
│ Catalog  │ │ Response    │ │ Engine         │
│ Service  │ │ Service     │ │ (versioned)    │
│          │ │ (Redis-     │ │                │
│ (test    │ │  backed,    │ │ Pure functions │
│ defs as  │ │  in-progress│ │ per instrument,│
│ JSON     │ │  state)     │ │ norm tables,   │
│ schema)  │ │             │ │ cutoff bands   │
└──┬───────┘ └───┬─────────┘ └────┬───────────┘
   │             │                │
   └─────────────┴────────┬───────┘
                          │
                 ┌────────▼─────────┐
                 │  Postgres         │
                 │  (Prisma ORM)     │
                 │  users, results,  │
                 │  consent records  │
                 └────────┬──────────┘
                          │
                 ┌────────▼─────────┐
                 │ Prometheus/       │
                 │ Grafana           │
                 │ (latency, session │
                 │  drop-off, error  │
                 │  rates)           │
                 └───────────────────┘
```

This maps directly onto your existing stack — Node/Express, Redis, Postgres/Prisma, Prometheus/Grafana are all things you've already run in production at 4n EcoTech and on Sentinel. The one new muscle is the **scoring engine as an isolated, versioned service** — treat psychometric scoring logic like you'd treat a pricing engine: pure, testable, auditable, never silently changed without a version bump (a scoring bug here isn't a cosmetic bug, it's a wrong result shown to someone who may be distressed).

---

## 5. Test Definition Schema (data-driven, not hardcoded)

Every test — personality, clinical, IQ — should be describable as data, so adding test #40 doesn't mean writing new frontend code.

```json
{
  "test_id": "phq9_v1",
  "name": "Patient Health Questionnaire-9",
  "category": "clinical",
  "license": "public_domain",
  "citation": "Kroenke K, Spitzer RL, Williams JB. (2001)",
  "instructions": "Over the last 2 weeks, how often have you been bothered by...",
  "response_scale": {
    "type": "likert",
    "options": [
      {"value": 0, "label": "Not at all"},
      {"value": 1, "label": "Several days"},
      {"value": 2, "label": "More than half the days"},
      {"value": 3, "label": "Nearly every day"}
    ]
  },
  "items": [
    {"id": "q1", "text": "Little interest or pleasure in doing things"},
    {"id": "q2", "text": "Feeling down, depressed, or hopeless"}
  ],
  "scoring": {
    "method": "sum",
    "bands": [
      {"min": 0, "max": 4, "label": "Minimal", "flag_crisis": false},
      {"min": 5, "max": 9, "label": "Mild", "flag_crisis": false},
      {"min": 10, "max": 14, "label": "Moderate", "flag_crisis": false},
      {"min": 15, "max": 19, "label": "Moderately severe", "flag_crisis": true},
      {"min": 20, "max": 27, "label": "Severe", "flag_crisis": true}
    ]
  },
  "special_rules": {
    "item_9_suicide_check": true
  }
}
```

Note the `item_9_suicide_check` — PHQ-9's item 9 asks about thoughts of self-harm. **This needs a hard-coded exception path**: any non-zero response to that specific item should immediately surface crisis resources regardless of total score, before the person even sees their band result. This is a well-established clinical practice pattern (real PHQ-9 deployments in clinics do exactly this) and it's the single most important safety feature in the whole platform.

### Neuropsych test schema (different shape — trial-based, not item-based)

Neuropsych tests aren't "questions with responses," they're timed trial sequences. The schema needs to describe stimulus generation and timing rules, not a static item bank:

```json
{
  "test_id": "stroop_v1",
  "name": "Stroop Color-Word Task",
  "category": "neuropsych",
  "license": "public_domain_paradigm",
  "citation": "Stroop JR. (1935). Studies of interference in serial verbal reactions.",
  "task_type": "trial_sequence",
  "trial_config": {
    "num_trials": 40,
    "conditions": ["congruent", "incongruent", "neutral"],
    "condition_distribution": {"congruent": 0.33, "incongruent": 0.34, "neutral": 0.33},
    "stimulus_duration_ms": null,
    "inter_trial_interval_ms": 500,
    "response_window_ms": 2000,
    "colors": ["red", "blue", "green", "yellow"],
    "randomize_order": true
  },
  "timing_source": "server",
  "recorded_per_trial": ["condition", "stimulus_color", "stimulus_word", "response", "correct", "reaction_time_ms"],
  "scoring": {
    "method": "derived_metrics",
    "metrics": [
      {"name": "mean_rt_congruent", "formula": "mean(rt where condition=congruent)"},
      {"name": "mean_rt_incongruent", "formula": "mean(rt where condition=incongruent)"},
      {"name": "stroop_interference_effect", "formula": "mean_rt_incongruent - mean_rt_congruent"},
      {"name": "accuracy_pct", "formula": "correct_trials / total_trials * 100"}
    ]
  },
  "norm_reference": "descriptive_only",
  "clinical_disclaimer": true
}
```

Key differences from the Likert schema:
- **`timing_source: "server"`** — never trust client-reported reaction times alone; the WebSocket gateway timestamps stimulus-onset and response-received events server-side. Client timing can be used as a secondary signal but shouldn't be the source of truth for a metric someone might treat as meaningful.
- **`recorded_per_trial`** — you persist trial-level data, then compute aggregate metrics after the session ends. This lets you recompute derived metrics later (e.g. if you improve the interference-effect formula) without re-running the test.
- **`norm_reference: "descriptive_only"`** — critical honesty point: without a properly normed reference sample (age/education-matched), you can report someone's *own* reaction time and interference effect, but you should not claim "this means you have attention deficit X" or compare them to clinical cutoffs that require a validated normative sample you don't have. Keep neuropsych outputs descriptive ("your incongruent-trial RT was 180ms slower than congruent") rather than diagnostic ("your executive function is impaired").

Same trial-sequence shape extends to N-back (record hit/miss/false-alarm per trial, derive d-prime), Digit Span (record max span reached, derive forward/backward span score), and Simple Reaction Time (record RT per trial, derive mean + SD + lapses >500ms as an attention-lapse proxy).

---

## 6. Scoring Engine Design

- Pure functions: `score(testId, responses) → { rawScore, band, subscales, flags }`
- Versioned: `phq9_v1`, `phq9_v2` if scoring logic ever changes — never mutate scoring in place for a live test, since it breaks comparability of historical results.
- Unit-tested against published validation examples for each instrument (most peer-reviewed papers publish example scoring cases you can use as test fixtures).
- IQ/aptitude tests may eventually want **adaptive difficulty** (item-response-theory style) — defer this to Phase 2; a fixed-item test is a legitimate MVP.

---

## 7. Neuropsych / Reaction-Time Tests — the WebSocket case

Stroop, N-back, and simple reaction time need millisecond-level timing, which is where your WebSocket experience (1,000+ concurrent connections at 4n EcoTech) is directly reusable:

- Server timestamps stimulus-presentation and response-receipt events to avoid relying solely on client clock drift.
- Redis stores in-flight session state (current trial index, running accuracy) since these tests run in tight loops — don't round-trip to Postgres per trial.
- Final aggregate (mean RT, accuracy, RT variability) is the only thing persisted to Postgres.

---

## 8. Safety & Ethics Layer (non-negotiable for a "real product")

1. **Pre-test consent screen** for any clinical-category test: explains it's a screening tool, not diagnostic, explains data use, requires explicit acknowledgment.
2. **Crisis resource surfacing**: triggered by (a) high-severity score bands, (b) the PHQ-9 item-9-style hard flags. Should show a stable, non-clickbait resource block — not intrusive, not gamified.
3. **No AI-generated interpretation of clinical scores** without a licensed-professional disclaimer attached every single time, even in a "your results" summary screen.
4. **Data retention policy** stated up front — how long are responses kept, can the user delete them, is anything shared for aggregate/research purposes with opt-in only.

---

## 9. Phased Roadmap

**Phase 1 (MVP) — 6-8 weeks**
- Test catalog service + JSON schema for: IPIP-50 (personality), PHQ-9, GAD-7, one original IQ-style reasoning test
- **Neuropsych battery**: Simple Reaction Time, Stroop Task, N-back (2-back), Digit Span — WebSocket-driven, millisecond timing
- Basic scoring engine, Postgres storage, simple results dashboard
- Consent + crisis-resource flow (build this first, not last)

**Phase 2 — 4-6 weeks**
- Career/RIASEC inventory + career-match recommendations
- Longitudinal tracking (compare PHQ-9 score, reaction-time trends across sessions for logged-in users)
- Additional neuropsych tasks: Trail Making Test (A/B), Corsi Block-Tapping (spatial working memory)

**Phase 3**
- Adaptive/IRT-based IQ testing
- Aggregate, anonymized research dashboard (if APSY Lab wants a research angle — ties into your CMU/Ashoka research background)
- Admin panel for adding new test definitions without redeploying

---

## 10. Tech Stack Summary

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 14 + Tailwind | Matches Sentinel project, fast iteration |
| API | Node.js/Express | Your production stack |
| Real-time | WebSockets | Your 1,000+ concurrent connection experience |
| Session cache | Redis | In-flight test state |
| Database | Postgres + Prisma | Structured results, relational integrity for norm comparisons |
| Auth | Google Auth/SSO | Already scaffolded in Sentinel |
| Monitoring | Prometheus + Grafana | Direct reuse of your incident-detection setup |
| Deployment | Docker + Kubernetes | Your existing DevOps stack |

---

## Open Questions for Next Session

- Anonymous-first vs. account-required from day one?
- Should this live as a subdomain of apsylab.org or a standalone product?
- Do you want a research/aggregate-data angle (ties to your CMU/Ashoka background) or purely a consumer self-insight tool?
- With neuropsych tests now in Phase 1: do you want to start coding the WebSocket trial-timing infrastructure first (it's shared by Stroop/N-back/reaction-time/digit-span), or the simpler Likert-based test flow first and add trial-based tests once that's stable?