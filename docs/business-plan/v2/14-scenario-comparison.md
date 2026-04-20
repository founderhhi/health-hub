# Scenario Comparison Matrix

**Health Hub Business Plan v2 — Document 14**
**Version:** 2.0 | **Date:** March 2026

> All assumptions, cost figures, timelines, and team parameters reference `params.md`.
> Risk scores reference `13-risk-register.md`.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Notation and Definitions](#2-notation-and-definitions)
3. [Master Comparison Table](#3-master-comparison-table)
4. [Scenario Family Profiles](#4-scenario-family-profiles)
5. [Trade-off Analysis](#5-trade-off-analysis)
6. [Decision Framework](#6-decision-framework)
7. [Redundant Combinations](#7-redundant-combinations)
8. [Recommendation](#8-recommendation)
9. [What Not to Misread](#9-what-not-to-misread)

---

## 1. Executive Summary

Health Hub's planning framework produces 21 distinct paths to market, arising from the combination of 3 scenarios (S1, S2, S3) with 3 investment levels, where S2 and S3 each multiply by 9 (our level x investor level) and S1 has 3 (per params.md, Section 15).

This document compares all 21 combinations across seven dimensions:

- **Timeline** — Months from start to Production Readiness
- **Economic cost** — Total capital consumed through Production
- **Founder capital required** — Cash the founders must deploy before investor capital arrives
- **Investor capital required** — External capital needed
- **Break-even month** — When cumulative revenue exceeds cumulative investment
- **Risk level** — Composite assessment (Low / Medium / High / Critical)
- **Recommendation** — Pursue / Consider / Avoid

**Key findings:**

1. Only 12 of the 21 combinations are strategically distinct. The remaining 9 are logically redundant (Section 7).
2. The optimal path is **S3-O2-I2** (Ideal self-funding through Pre-Pilot and Pilot 1, Ideal investor capital after Pilot 1). It balances founder capital exposure (~$53,000-65,000), investor dilution (15-18%), timeline (18-22 months), and execution risk.
3. **S1-L3** (Fully self-funded at corporate investment level) is logically incoherent — founders who can deploy $180,000+ without investors do not need the constraints this plan is designed around.
4. The cheapest path (S1-L1) is not the safest. Extreme bootstrapping creates compounding operational risk that eventually threatens the company's existence.
5. The fastest path (S3-O3-I3) is not the best investor narrative. Over-resourcing a pre-revenue startup before product-market fit is validated signals poor capital discipline.

---

## 2. Notation and Definitions

### 2.1 Scenario Codes (per params.md Section 14)

| Code | Meaning |
|------|---------|
| S1 | Fully Self-Funded — no external investor through Production |
| S2 | Investor During Transition — self-fund through Pilot 1 into Pilot 2 transition; investor arrives during or after Pilot 2 |
| S3 | Investor After Pilot 1 — self-fund through Pre-Pilot and Pilot 1; investor arrives right after Pilot 1 |

### 2.2 Investment Level Codes (per params.md Section 14)

| Code | Label | Budget Relative to Ideal |
|------|-------|--------------------------|
| O1 / I1 | Bootstrapped / Ad Hoc | ~40% of ideal |
| O2 / I2 | Ideal / Basic | 100% (baseline) |
| O3 / I3 | Fully Funded / Corporate | 150-200%+ of ideal |

- **O** prefix = Our (founder) investment level during self-funded phase
- **I** prefix = Investor investment level after investor arrives
- S1 paths use **L** prefix (single level, no investor split)

### 2.3 Cost Basis (per params.md)

| Component | Monthly Cost (Ideal/L2) | L1 Multiplier | L3 Multiplier |
|-----------|------------------------|----------------|----------------|
| Team (all contributors) | $14,830 | 0.4x = $5,932 | 1.5x = $22,245 |
| Ops staff (Pilot 1) | $2,482 | 0.4x = $993 | 1.5x = $3,723 |
| Infrastructure (Pilot 1) | $395 (midpoint) | 0.5x = $198 | 1.5x = $593 |
| **Monthly burn (Pilot 1, midpoint)** | **$17,707** | **$7,123** | **$26,561** |

### 2.4 Timeline Basis (per params.md Section 13)

| Phase | Duration Range |
|-------|---------------|
| Pre-Pilot | 3-6 months |
| Pilot 1 | 2-3 months |
| Pilot 2 | 3-13 months |
| Production Readiness | 4-12 months |
| **Total** | **16-34 months** |

- L1 tends toward the longer end of each range (resource constraints slow execution)
- L2 hits the midpoint
- L3 tends toward the shorter end (more resources enable faster execution)

---

## 3. Master Comparison Table

### 3.1 S1 Family — Fully Self-Funded

| # | Code | Timeline (months) | Total Economic Cost | Founder Capital | Investor Capital | Est. Break-Even Month | Risk Level | Recommendation |
|---|------|-------------------|--------------------|-----------------|-----------------|-----------------------|------------|----------------|
| 1 | S1-L1 | 28-34 | $95,000-120,000 | $95,000-120,000 | $0 | 34-42 | **Critical** | Avoid |
| 2 | S1-L2 | 20-26 | $155,000-195,000 | $155,000-195,000 | $0 | 26-32 | **High** | Consider (if founders have capital) |
| 3 | S1-L3 | 16-20 | $250,000-340,000 | $250,000-340,000 | $0 | 22-28 | **Medium** | Avoid (logically incoherent) |

### 3.2 S2 Family — Investor During Transition (Pilot 1 to Pilot 2)

Self-funded phases: Pre-Pilot + Pilot 1 (~5-9 months at founder's level).
Investor funds: Pilot 2 + Production Readiness.

| # | Code | Timeline (months) | Total Economic Cost | Founder Capital | Investor Capital | Est. Break-Even Month | Risk Level | Recommendation |
|---|------|-------------------|--------------------|-----------------|-----------------|-----------------------|------------|----------------|
| 4 | S2-O1-I1 | 28-34 | $100,000-130,000 | $36,000-50,000 | $64,000-80,000 | 34-42 | **Critical** | Avoid |
| 5 | S2-O1-I2 | 24-30 | $140,000-175,000 | $36,000-50,000 | $104,000-125,000 | 28-34 | **High** | Consider |
| 6 | S2-O1-I3 | 22-26 | $190,000-240,000 | $36,000-50,000 | $154,000-190,000 | 24-30 | **Medium-High** | Consider (high dilution) |
| 7 | S2-O2-I1 | 26-32 | $120,000-155,000 | $71,000-95,000 | $49,000-60,000 | 32-38 | **High** | Consider |
| 8 | S2-O2-I2 | 20-26 | $165,000-210,000 | $71,000-95,000 | $94,000-115,000 | 24-30 | **Medium** | **Pursue (Fallback)** |
| 9 | S2-O2-I3 | 18-22 | $210,000-275,000 | $71,000-95,000 | $139,000-180,000 | 22-26 | **Medium** | Consider |
| 10 | S2-O3-I1 | 24-28 | $145,000-180,000 | $107,000-140,000 | $38,000-40,000 | 30-36 | **High** | Avoid (over-spends early, under-funds later) |
| 11 | S2-O3-I2 | 18-24 | $195,000-250,000 | $107,000-140,000 | $88,000-110,000 | 22-28 | **Medium** | Consider |
| 12 | S2-O3-I3 | 16-20 | $260,000-345,000 | $107,000-140,000 | $153,000-205,000 | 20-24 | **Medium-Low** | Consider (if capital available) |

### 3.3 S3 Family — Investor After Pilot 1

Self-funded phases: Pre-Pilot + early Pilot 1 only (~3-6 months at founder's level).
Investor funds: Late Pilot 1 + Pilot 2 + Production Readiness.

| # | Code | Timeline (months) | Total Economic Cost | Founder Capital | Investor Capital | Est. Break-Even Month | Risk Level | Recommendation |
|---|------|-------------------|--------------------|-----------------|-----------------|-----------------------|------------|----------------|
| 13 | S3-O1-I1 | 26-32 | $105,000-135,000 | $21,000-32,000 | $84,000-103,000 | 32-40 | **High** | Avoid (underfunded both sides) |
| 14 | S3-O1-I2 | 22-26 | $145,000-180,000 | $21,000-32,000 | $124,000-148,000 | 26-32 | **Medium-High** | Consider |
| 15 | S3-O1-I3 | 18-22 | $200,000-255,000 | $21,000-32,000 | $179,000-223,000 | 22-26 | **Medium** | Consider (low founder skin-in-game) |
| 16 | S3-O2-I1 | 24-30 | $125,000-160,000 | $53,000-65,000 | $72,000-95,000 | 30-36 | **High** | Consider |
| 17 | S3-O2-I2 | 18-22 | $170,000-215,000 | $53,000-65,000 | $117,000-150,000 | 22-28 | **Medium** | **Pursue (Primary)** |
| 18 | S3-O2-I3 | 16-20 | $220,000-285,000 | $53,000-65,000 | $167,000-220,000 | 20-24 | **Medium-Low** | **Pursue (Upside)** |
| 19 | S3-O3-I1 | 22-26 | $150,000-190,000 | $89,000-120,000 | $61,000-70,000 | 28-34 | **High** | Avoid (over-spends early, under-funds later) |
| 20 | S3-O3-I2 | 16-22 | $200,000-260,000 | $89,000-120,000 | $111,000-140,000 | 20-26 | **Medium** | Consider |
| 21 | S3-O3-I3 | 16-18 | $270,000-360,000 | $89,000-120,000 | $181,000-240,000 | 18-22 | **Low** | Consider (maximum spend, maximum speed) |

### 3.4 Summary Statistics

| Metric | Minimum (across all 21) | Maximum | Median |
|--------|------------------------|---------|--------|
| Timeline | 16 months (S3-O3-I3) | 34 months (S1-L1, S2-O1-I1) | 22-24 months |
| Total economic cost | $95,000 (S1-L1) | $360,000 (S3-O3-I3) | $170,000-195,000 |
| Founder capital | $21,000 (S3-O1-*) | $340,000 (S1-L3) | $65,000-90,000 |
| Investor capital | $0 (S1-*) | $240,000 (S3-O3-I3) | $100,000-120,000 |
| Break-even month | 18 months (S3-O3-I3) | 42 months (S1-L1) | 26-28 months |

---

## 4. Scenario Family Profiles

### 4.1 S1 — The Self-Reliance Path

**Character:** Maximum founder control. Zero dilution. Maximum financial risk on founders. Longest timelines.

| Strength | Weakness |
|----------|----------|
| Full equity retained (60/20/0 split) | Founders bear 100% of financial risk |
| No investor management overhead | Slowest path to market (28-34 months at L1) |
| Complete strategic autonomy | No external validation or network |
| Can pivot without investor approval | Part-time team strain is highest (no relief) |
| Forces lean discipline | Cannot absorb any major unexpected cost |

**Who should pursue S1:** Founders with personal capital reserves >$200,000 who value control above speed, or who have been unable to attract investors after genuine effort.

**Who should not pursue S1:** Anyone who does not have deep personal reserves. At $95,000-340,000 total cost with zero revenue guarantee, S1 is a bet with the founders' personal finances.

### 4.2 S2 — The Transition Path

**Character:** Moderate founder exposure. Investor arrives after initial market signal but before full traction. Balanced risk sharing.

| Strength | Weakness |
|----------|----------|
| Founders demonstrate commitment with capital | Investor arrives before product-market fit is proven |
| Investor sees real operational history before committing | Longer self-funded exposure than S3 ($71,000-140,000 at O2-O3) |
| More negotiating leverage than S3 (more traction when investor enters) | If investor delays, founders are deeper in financially |
| Moderate dilution (15-20%) | Transition period is a vulnerable window |

**Who should pursue S2:** Teams that want to build more traction before raising, have moderate personal capital ($70,000-100,000 available), and are willing to extend their self-funded runway for better investor terms.

### 4.3 S3 — The Early Capital Path

**Character:** Minimum founder financial exposure. Investor enters early (after Pilot 1). Faster execution but earlier dilution. Strongest for teams with limited personal capital.

| Strength | Weakness |
|----------|----------|
| Lowest founder capital requirement ($21,000-65,000 at O1-O2) | Investor enters with less traction data (higher perceived risk for investor) |
| Fastest time to market (16-22 months at O2-I2) | Potentially higher dilution demanded by investor (entering earlier = more risk for them) |
| Investor capital funds the scaling phases where cost is highest | Founder has less leverage in negotiation (less proven, more dependent) |
| Reduces key-person financial dependency risk (R-17) | If investor does not materialize, fallback to S1 is more abrupt |

**Who should pursue S3:** Teams with strong investor pipeline, limited personal capital, and confidence that Pilot 1 will produce sufficient signal (even if not revenue) to close a round.

---

## 5. Trade-off Analysis

### 5.1 Speed vs. Cost

| Path | Timeline | Total Cost | Efficiency (Cost/Month) |
|------|----------|-----------|------------------------|
| S1-L1 (slowest, cheapest) | 31 mo avg | $107,500 avg | $3,468/mo |
| S3-O2-I2 (recommended) | 20 mo avg | $192,500 avg | $9,625/mo |
| S3-O3-I3 (fastest, most expensive) | 17 mo avg | $315,000 avg | $18,529/mo |

**Insight:** Moving from S1-L1 to S3-O2-I2 costs ~$85,000 more but saves ~11 months. That is roughly $7,700 per month of acceleration — a reasonable price given that each month of delay also delays revenue, increases competitive exposure, and extends team fatigue on a part-time arrangement.

Moving from S3-O2-I2 to S3-O3-I3 costs an additional ~$122,500 but saves only ~3 months. That is ~$40,833 per month of acceleration — sharply diminishing returns. The extra capital buys speed but not proportional risk reduction.

### 5.2 Cost vs. Risk

| Path | Total Cost | Risk Level | Analysis |
|------|-----------|------------|----------|
| S1-L1 | $107,500 | Critical | Cheapest but riskiest. Under-investment creates cascading failures |
| S1-L2 | $175,000 | High | Adequate if founders have capital, but no external safety net |
| S2-O2-I2 | $187,500 | Medium | Good balance but requires longer self-funded commitment |
| S3-O2-I2 | $192,500 | Medium | Similar cost to S2-O2-I2 but less founder exposure, slightly higher investor dependency |
| S3-O3-I3 | $315,000 | Low | Lowest risk but requires significant investor confidence in early-stage health-tech |

**Insight:** Risk does not decrease linearly with spending. The biggest risk reduction happens between L1 and L2 (moving from critical understaffing to adequate resourcing). The jump from L2 to L3 provides diminishing risk reduction because the primary risks are market and operational, not resource-constrained.

### 5.3 Founder Capital vs. Dilution

| Path | Founder Capital | Investor Capital | Implied Dilution | Founder Post-Raise Equity |
|------|----------------|-----------------|------------------|---------------------------|
| S1-L2 | $175,000 | $0 | 0% | 60% |
| S2-O2-I2 | $83,000 avg | $104,500 avg | 15-18% | 52-55% |
| S3-O2-I2 | $59,000 avg | $133,500 avg | 17-20% | 50-53% |
| S3-O1-I3 | $26,500 avg | $201,000 avg | 20-25% | 47-50% |

**Insight:** Every $10,000 reduction in founder capital requires roughly $15,000-20,000 in investor capital (investors price in their risk premium). The dilution cost of that replacement is approximately 1-2% equity per $15,000 of investor capital. The sweet spot is S3-O2-I2 where the founder retains majority control (>50%) while limiting personal exposure to ~$59,000.

### 5.4 Speed vs. Investor Narrative Quality

| Path | Timeline | Narrative Strength | Reasoning |
|------|----------|-------------------|-----------|
| S1-L1 | 31 mo | Weak | "We bootstrapped but it took 2.5 years to reach production — and we still have no investor" |
| S1-L2 | 23 mo | Moderate | "We self-funded the entire journey" — impressive but raises the question of why no investor wanted in |
| S2-O2-I2 | 23 mo | Strong | "We proved the model with our own capital, then brought in smart money for scaling" |
| S3-O2-I2 | 20 mo | **Strongest** | "We built and validated with our own capital through Pilot 1, then raised to accelerate. Investor enters with real data, not just a deck" |
| S3-O3-I3 | 17 mo | Moderate-Weak | "We raised big and moved fast" — but if PMF is not proven, speed is a liability |

---

## 6. Decision Framework

### 6.1 Decision Tree

The following decision tree determines which scenario family is appropriate:

```
START
  │
  ├─ Q1: Do founders have >$150,000 available personal capital?
  │   ├─ YES ──► Q2: Do founders prefer 0% dilution over speed?
  │   │           ├─ YES ──► S1-L2 (self-fund at ideal level)
  │   │           └─ NO  ──► S3-O2-I2 (use personal capital efficiently, raise for scale)
  │   │
  │   └─ NO  ──► Q3: Do founders have >$50,000 available personal capital?
  │               ├─ YES ──► Q4: Is there an active investor pipeline (2+ warm leads)?
  │               │           ├─ YES ──► S3-O2-I2 (primary recommendation)
  │               │           └─ NO  ──► S2-O2-I2 (build more traction before raising)
  │               │
  │               └─ NO  ──► Q5: Is there an active investor pipeline?
  │                           ├─ YES ──► S3-O1-I2 (minimal self-fund, rely on investor)
  │                           └─ NO  ──► STOP. Do not proceed until capital or
  │                                       investor pipeline exists. Risk is too high.
```

### 6.2 Investment Level Selection

Once the scenario family is chosen, select investment level based on:

| Condition | Our Level | Investor Level | Rationale |
|-----------|-----------|----------------|-----------|
| Tight personal capital, strong investor interest | O1 | I2 or I3 | Minimize founder burn; let investor fund scaling |
| Moderate personal capital, moderate investor interest | O2 | I2 | Balanced. Both parties invest appropriately |
| Strong personal capital, uncertain investor | O2 or O3 | I1 or I2 | Front-load with founder capital; investor adds less but validates |
| Strong personal capital, strong investor interest | O2 | I2 | Do not over-index on either. Reserve capital for contingencies |
| Any capital level, no investor | L1 or L2 | N/A (S1) | Match investment level to available runway (minimum 18 months coverage) |

### 6.3 Phase-Gate Decision Points

At each phase transition, reassess the scenario:

| Gate | Question | If YES | If NO |
|------|----------|--------|-------|
| Pre-Pilot complete | Is Pilot 1 ready to launch? APK at 80%+? SOPs done? Partners signed? | Proceed to Pilot 1 | Extend Pre-Pilot by 1-2 months. If already extended once, reassess scope |
| Pilot 1 month 2 | Are we on track for investor conversation? >200 active users? | Continue current scenario | If S3: extend Pilot 1. If S2: no change yet. If S1: no change |
| Pilot 1 complete | Did Pilot 1 meet minimum thresholds? | Proceed per scenario plan | Activate Playbook D (Pilot 1 failure). Reassess scenario |
| Investor negotiation | Term sheet signed within 45 days of target? | Proceed with investor capital | Downgrade one scenario level (S3→S2, S2→S1). Activate Playbook A |
| Pilot 2 month 6 | Revenue trajectory toward $2,000+/mo? | Continue. Production Readiness prep | Reassess pricing, acquisition, and product. Consider scope reduction |
| Production Readiness gate | All 12 QA criteria pass? Compliance confirmed? Ops staff at ladder level? | Launch Production | Do not launch. Fix blockers. Extend by minimum time needed |

---

## 7. Redundant Combinations

Of the 21 total combinations, 9 are logically redundant or strategically incoherent. Understanding why prevents wasted analysis time.

### 7.1 Redundancy Table

| # | Code | Redundant With / Issue | Reason | Disposition |
|---|------|----------------------|--------|-------------|
| 1 | S1-L1 | — (unique but inadvisable) | Technically distinct but risk is Critical. 34-month timeline with zero external support on a part-time team is a slow-motion failure. Included for completeness only. | **Avoid** |
| 3 | S1-L3 | Logically incoherent | Founders who can self-fund $250,000-340,000 should be attracting investors easily. If they cannot, it signals a deeper problem. If they choose not to, the capital would be more efficiently deployed with investor participation (shared risk). | **Eliminate** |
| 4 | S2-O1-I1 | Functionally equivalent to S1-L1 | Both sides at bootstrapped level with a brief investor entry does not meaningfully change the trajectory. Total cost and timeline are similar. The "investor" in an I1 scenario contributes so little that the administrative overhead of managing them may exceed their value. | **Eliminate** |
| 10 | S2-O3-I1 | Structurally contradictory | Over-investing founder capital in early phases then bringing in a bootstrapped investor makes no financial sense. The founder already proved they have capital; a bootstrapped investor adds distraction without resources. | **Eliminate** |
| 12 | S2-O3-I3 | Functionally equivalent to S1-L3 timeline | With O3 and I3, total spend reaches $260,000-345,000 — similar to S1-L3. The investor in S2-O3-I3 arrives late and adds capital to an already well-funded operation. The dilution cost is not justified by the incremental value. | **Eliminate** |
| 13 | S3-O1-I1 | Functionally equivalent to S2-O1-I1 and S1-L1 | Both sides at bootstrapped level regardless of investor timing. The underfunding is the binding constraint, not the timing. | **Eliminate** |
| 15 | S3-O1-I3 | Investor narrative problem | Bootstrapped founder asking for corporate-level investment raises a "skin in the game" concern. Investors will question why the founder invested so little if they believe in the business. | **Flag** (possible but requires exceptional narrative) |
| 19 | S3-O3-I1 | Structurally contradictory (same as S2-O3-I1) | Over-investing early then bringing in a bootstrapped investor. Illogical capital structure. | **Eliminate** |
| 21 | S3-O3-I3 | Unique but overkill | Technically viable and lowest risk, but $270,000-360,000 total spend on a pre-revenue East Africa health-tech startup is over-capitalized for the market. Better capital discipline would achieve similar outcomes at lower cost. | **Flag** (viable for aggressive growth mandate only) |

### 7.2 Strategically Distinct Combinations (12 of 21)

After eliminating redundant paths, 12 strategically distinct combinations remain:

| # | Code | Character | Recommended? |
|---|------|-----------|-------------|
| 1 | S1-L1 | Survival bootstrapping | No (reference only) |
| 2 | S1-L2 | Disciplined self-funding | Conditional |
| 5 | S2-O1-I2 | Lean founder, ideal investor, late entry | Conditional |
| 6 | S2-O1-I3 | Lean founder, strong investor, late entry | Conditional |
| 7 | S2-O2-I1 | Ideal founder, lean investor, late entry | Conditional |
| 8 | S2-O2-I2 | Balanced transition path | **Fallback** |
| 9 | S2-O2-I3 | Ideal founder, strong investor, late entry | Conditional |
| 11 | S2-O3-I2 | Strong founder, ideal investor, late entry | Conditional |
| 14 | S3-O1-I2 | Lean founder, ideal investor, early entry | Conditional |
| 16 | S3-O2-I1 | Ideal founder, lean investor, early entry | Conditional |
| 17 | S3-O2-I2 | Balanced early-capital path | **Primary** |
| 18 | S3-O2-I3 | Ideal founder, strong investor, early entry | **Upside** |

---

## 8. Recommendation

### 8.1 Primary Recommendation: S3-O2-I2

**Ideal self-funding through Pre-Pilot and Pilot 1. Ideal investor capital after Pilot 1.**

| Dimension | Value | Rationale |
|-----------|-------|-----------|
| **Timeline** | 18-22 months | Fast enough to maintain team energy and competitive positioning. Not so fast that operational readiness is compromised |
| **Total economic cost** | $170,000-215,000 | In the efficient middle range. Neither wastefully cheap nor unnecessarily expensive |
| **Founder capital** | $53,000-65,000 | Meaningful skin in the game (signals commitment to investors) without bet-the-house exposure. Covers Pre-Pilot (~3-5 months at ~$10,000-13,000/mo) |
| **Investor capital** | $117,000-150,000 | Right-sized for Pilot 2 + Production Readiness at ideal investment levels. Investor gets demonstrable Pilot 1 results before deploying capital |
| **Dilution** | 17-20% (within 20% pool) | Within the planned investor pool ceiling (per params.md Section 8). Founder retains >50% control |
| **Break-even month** | 22-28 | Achievable within the planning horizon. Revenue from Production phase ($3,000-15,000/mo per params.md) can reach cumulative break-even |
| **Risk level** | Medium | Balanced across all risk categories. No single critical risk without a mitigation path |
| **Investor narrative** | Strong | "We built it, tested it with real patients, proved demand, and are raising to scale. Here is our Pilot 1 data." This is the most compelling story for East Africa health-tech |

**Why S3-O2-I2 over S2-O2-I2:**
- S3 brings investor capital 3-6 months earlier, during the period when scaling costs are highest
- Founder capital exposure is $18,000-30,000 lower in S3 than S2
- Timeline is 2-4 months shorter
- The narrative is similar (founder-funded validation first), but S3 reaches the investor conversation while Pilot 1 momentum is still fresh

**Why O2 (not O1 or O3) for our level:**
- O1 under-invests in Pre-Pilot and Pilot 1, creating quality and readiness risks that damage the investor conversation
- O3 over-invests before investor validation, increasing founder financial exposure without proportional benefit
- O2 funds the team adequately (per params.md capacity levels) to produce a credible Pilot 1

**Why I2 (not I1 or I3) for investor level:**
- I1 under-funds scaling, creating the same resource constraints that S1 suffers from — but with dilution
- I3 over-capitalizes a pre-revenue company, creating pressure to spend that may not align with disciplined growth
- I2 provides enough capital for proper Pilot 2 execution and Production Readiness without excess

### 8.2 Fallback Recommendation: S2-O2-I2

**Ideal self-funding through Pilot 1 and into Pilot 2 transition. Ideal investor capital during or after Pilot 2.**

| Dimension | Value |
|-----------|-------|
| Timeline | 20-26 months |
| Total economic cost | $165,000-210,000 |
| Founder capital | $71,000-95,000 |
| Investor capital | $94,000-115,000 |
| Dilution | 15-18% |
| Break-even month | 24-30 |
| Risk level | Medium |

**When to fall back to S2-O2-I2:**
- Investor pipeline is not mature enough for a Pilot 1-stage raise
- Pilot 1 results are positive but not yet compelling enough for investor conversation
- Founders have the personal capital to extend self-funded runway by 3-6 months
- Founders want to negotiate from a stronger traction position (more data, more users)

**Advantages over S3-O2-I2:**
- Lower dilution (investor enters later with more proof, commands less equity)
- More founder negotiating leverage
- Investor sees Pilot 2 early data, not just Pilot 1

**Disadvantages vs. S3-O2-I2:**
- $18,000-30,000 more founder capital required
- 2-4 months longer timeline
- Higher risk of founder capital depletion (R-02 is more acute)

### 8.3 Upside Recommendation: S3-O2-I3

**Ideal self-funding through Pre-Pilot and Pilot 1. Fully funded investor capital after Pilot 1.**

| Dimension | Value |
|-----------|-------|
| Timeline | 16-20 months |
| Total economic cost | $220,000-285,000 |
| Founder capital | $53,000-65,000 |
| Investor capital | $167,000-220,000 |
| Dilution | 18-22% |
| Break-even month | 20-24 |
| Risk level | Medium-Low |

**When to pursue S3-O2-I3:**
- Pilot 1 results exceed expectations (>500 active users, >100 consultations, strong partner engagement)
- Investor is enthusiastic and wants to deploy more capital for faster scaling
- Competitive threat (R-29, R-30) demands faster market capture
- Kenya opportunity matures faster than expected, creating a two-market scaling story

**Advantages over S3-O2-I2:**
- 2-4 months faster to Production
- Full corporate-level resourcing reduces operational risks (R-21, R-22 scores decrease)
- Can pursue dual-market (Ethiopia + Kenya) simultaneously
- Stronger buffer against unexpected costs

**Disadvantages vs. S3-O2-I2:**
- Higher dilution (potentially exceeding the 20% pool per params.md, requiring pool expansion negotiation)
- $50,000-70,000 more total capital at risk
- Over-resourcing risk: spending more does not guarantee proportionally better outcomes in a pre-PMF company
- Investor may demand board seat, reporting requirements, or governance controls

### 8.4 Recommendation Summary

| Priority | Code | Founder Capital | Investor Capital | Timeline | Dilution | Risk |
|----------|------|----------------|-----------------|----------|----------|------|
| **Primary** | S3-O2-I2 | $53,000-65,000 | $117,000-150,000 | 18-22 mo | 17-20% | Medium |
| **Fallback** | S2-O2-I2 | $71,000-95,000 | $94,000-115,000 | 20-26 mo | 15-18% | Medium |
| **Upside** | S3-O2-I3 | $53,000-65,000 | $167,000-220,000 | 16-20 mo | 18-22% | Medium-Low |

All three recommended paths share the O2 (Ideal) founder investment level. This is deliberate: O2 represents the minimum credible investment level for building a healthcare platform that real patients will trust. Below O2, quality compromises create risks that are more expensive to fix later than to prevent now.

---

## 9. What Not to Misread

### 9.1 Cheapest Does Not Mean Safest

**S1-L1** ($95,000-120,000) is the cheapest path. It is also rated **Critical risk**. This is not a contradiction:

- Under-investment in ops staff means the admin-assisted model (Health Hub's core differentiator) is perpetually understaffed
- Under-investment in infrastructure means the platform is fragile during the moment it must be most reliable (first real patients)
- Under-investment in the team means critical work is sequenced rather than parallelized, extending the timeline to 28-34 months
- A 34-month part-time journey with no external capital and no revenue is a recipe for team attrition, burnout, and quiet collapse
- The money "saved" by choosing L1 is lost in opportunity cost, competitive exposure, and the compounding probability of failure over a longer timeline

**Bottom line:** L1 saves dollars but spends time and risk. In a competitive market with a part-time team, time is the more expensive currency.

### 9.2 Fastest Does Not Mean Best Narrative

**S3-O3-I3** reaches Production in 16-18 months. It is also the most expensive ($270,000-360,000) and raises investor narrative concerns:

- An early-stage health-tech company in East Africa spending $20,000+/month before product-market fit is validated is not a sign of discipline — it is a sign of premature scaling
- Investors in emerging-market health-tech value capital efficiency over speed. Burning $360,000 to reach Production in 16 months is less impressive than burning $192,000 to reach Production in 20 months
- The fastest path assumes everything goes right: no regulatory delays, no partner dropout, no team attrition. When something does go wrong, the high burn rate means the runway consumed during the delay is much larger
- Speed is only an advantage if the destination is clear. Before Pilot 2 confirms product-market fit, moving fast means moving fast in a potentially wrong direction

**Bottom line:** Speed should be a consequence of good execution, not a goal purchased with capital.

### 9.3 Most Polished Does Not Mean Viable If Ops Are Underbuilt

Several paths (S2-O3-I2, S3-O3-I2) invest heavily in the product and technology side but may under-invest in operational readiness. This creates a specific failure mode:

- The platform is feature-complete, secure, and performant
- But there are not enough trained doctors to handle consultation volume
- Admin callback SOPs are incomplete
- Partner onboarding kits are not ready
- Technical support cannot handle real user issues

This is the "beautiful product, broken service" failure mode. It is particularly dangerous because the team may believe they are ready (the technology works) when they are not (the operation is not built).

**Bottom line:** Per params.md Section 17, 750 hours of parallel operational workstreams are required. These hours are not optional — they are as critical as the 745 hours of web platform development. Any path that funds the technology but not the operations is building half a company.

### 9.4 Low Dilution Does Not Mean Better Outcome

S1 paths offer zero dilution. S2 paths offer lower dilution than S3 paths. This does not automatically make them better:

- 60% of a company that fails is worth $0
- 52% of a company that reaches Production and generates revenue is worth substantially more than $0
- The dilution "saved" by self-funding is only valuable if the company survives to a point where equity has monetary value
- An investor who takes 18% equity but also brings network, credibility, follow-on funding access, and market knowledge may increase the remaining 82% by more than what was given up
- Conversely, giving away 25%+ to an investor who brings only capital (and perhaps governance demands) is a poor trade

**Bottom line:** Optimize for the probability-weighted value of your remaining equity, not for the percentage itself.

### 9.5 Investor Timing Is Not Purely a Financial Decision

The choice between S2 (investor during transition) and S3 (investor after Pilot 1) is often discussed in financial terms: how much founder capital is required, what dilution results, what the break-even month is. But the timing also affects:

- **Team psychology:** An investor arriving after Pilot 1 provides a morale boost during the hardest phase (scaling). An investor arriving during Pilot 2 arrives when the team may already be fatigued.
- **Negotiation dynamics:** Raising immediately after Pilot 1 means the data is fresh and the momentum narrative is strongest. Raising during Pilot 2 means the investor can see ongoing operations but may also see emerging problems.
- **Operational continuity:** S3 provides uninterrupted scaling capital. S2 creates a gap between self-funded and investor-funded phases where capital constraint may force compromises.

**Bottom line:** The best time to raise is when you have a story to tell and momentum behind it. For Health Hub, that moment is immediately after a successful Pilot 1.

---

*End of Document 14 — Scenario Comparison Matrix*
*All figures reference params.md. Scenario recommendations should be reassessed at each phase gate.*
