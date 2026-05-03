# Health Hub Investor Visual Appendix

## Purpose
This appendix is a reusable visual library for investor discussions, internal strategy reviews, and future deck-building. It converts the scenario pack, competitor work, and financing normalization into diagrams, matrices, and summary tables.

It is intentionally presentation-heavy and can be mined for:
- pitch deck visuals
- board or advisor briefing charts
- founder alignment workshops
- scenario comparison conversations

## Visual Index
1. Scenario family map
2. Financing ladder
3. Timeline comparison
4. Capital versus speed matrix
5. Founder risk matrix
6. Pricing corridor summary
7. Revenue ladder
8. Operational model diagram
9. Product readiness matrix
10. Fundraising pathway map
11. Risk heatmap
12. Recommended path comparison

## 1. Scenario Family Map
```mermaid
flowchart TD
    A[Scenario 1: fully self-funded] --> A1[Level 1 survival]
    A --> A2[Level 2 balanced self-funded]
    A --> A3[Level 3 fast self-funded]

    B[Scenario 2: investor during transition] --> B1[Bridge-class investor cases]
    B --> B2[Core pre-seed cases]
    B --> B3[Acceleration cases]

    C[Scenario 3: investor after Pilot 1] --> C1[Bridge-class investor cases]
    C --> C2[Core pre-seed cases]
    C --> C3[Acceleration cases]
```

## 2. Financing Ladder
```mermaid
flowchart LR
    A[Founder support] --> B[Bridge SAFE]
    B --> C[Core pre-seed SAFE]
    C --> D[Accelerated pre-seed or priced micro-round]
    D --> E[Regional scale seed]
```

### Financing ladder summary table
| Layer | Typical Size | Interpretation | Best Time |
| --- | --- | --- | --- |
| Founder support | `0-$25k` equivalent | internal float and survival support | before outside conviction forms |
| Bridge SAFE | `$25k-$100k` | buy time to stronger proof | before or just after Pilot 1 |
| Core pre-seed SAFE | `$125k-$250k` | first serious outside-capital story | after Pilot 1 or before Pilot 2 |
| Accelerated round | `$250k-$400k+` | speed and risk-reduction capital | when investor conviction is stronger |

## 3. Timeline Comparison
### High-level timing bands
| Path Type | Approximate Timing To Production | Interpretation |
| --- | --- | --- |
| Survival self-funded | `26-34 months` | feasible but fragile |
| Balanced investor transition | `22-27 months` | practical baseline |
| Faster post-Pilot 1 investor path | `16-22 months` | strongest blend of speed and realism |
| Full acceleration path | `16-19 months` | premium path with stronger support |

### Timeline graphic
```mermaid
gantt
    title Health Hub Scenario Timing Bands
    dateFormat  YYYY-MM-DD
    axisFormat  %b %Y
    section Survival
    Self-funded Level 1           :a1, 2026-03-01, 34M
    section Balanced
    Scenario 2 / O2 / I2          :b1, 2026-03-01, 24M
    section Recommended
    Scenario 3 / O2 / I2          :c1, 2026-03-01, 20M
    section Acceleration
    Scenario 3 / O3 / I3          :d1, 2026-03-01, 16M
```

## 4. Capital Versus Speed Matrix
| Combination Type | Capital Load | Speed | Comment |
| --- | --- | --- | --- |
| Self-funded Level 1 | low visible cash, high hidden strain | slow | survival mode |
| Self-funded Level 2 | meaningful founder burden | medium | disciplined but demanding |
| Scenario 2 / mid investor | medium | medium | balanced transition |
| Scenario 3 / core pre-seed | medium-high | fast enough | strongest base case |
| Scenario 3 / accelerated | high | fastest | best when investor adds leverage |

```mermaid
quadrantChart
    title Capital Versus Speed
    x-axis Lower Capital --> Higher Capital
    y-axis Slower --> Faster
    quadrant-1 "Fast but expensive"
    quadrant-2 "Fast and efficient"
    quadrant-3 "Slow and constrained"
    quadrant-4 "Capital heavy without enough speed"
    "S1-L1": [0.15, 0.20]
    "S1-L2": [0.35, 0.40]
    "S2-O2-I2": [0.55, 0.62]
    "S3-O2-I2": [0.60, 0.78]
    "S3-O3-I3": [0.88, 0.95]
```

## 5. Founder Risk Matrix
| Path | Founder Capital Burden | Execution Fragility | External Readability |
| --- | --- | --- | --- |
| Scenario 1 / Level 1 | very high | very high | low |
| Scenario 1 / Level 2 | high | high | low |
| Scenario 2 / Our 2 / Investor 2 | medium | medium | good |
| Scenario 3 / Our 2 / Investor 2 | medium | lower | very good |
| Scenario 3 / Our 3 / Investor 3 | medium-high | lower | very good |

## 6. Pricing Corridor Summary
### Patient-facing price anchors
| Service | Ethiopia | Kenya | Strategic Note |
| --- | --- | --- | --- |
| GP consult | `ETB 460-620` | `KES 580-710` | low enough for market fit, high enough for platform economics |
| Specialist consult | `ETB 1,250-1,700` | `KES 1,300-1,700` | premium but still accessible |
| Care coordination | `$8-$18` equivalent | `$8-$18` equivalent | best as a selective high-touch fee |

### Pricing corridor graphic
```mermaid
xychart-beta
    title "Illustrative GP Pricing Corridors"
    x-axis ["Ethiopia low","Ethiopia high","Kenya low","Kenya high"]
    y-axis "Local price index" 0 --> 800
    bar [460,620,580,710]
```

## 7. Revenue Ladder
```mermaid
flowchart LR
    A[First paid consults] --> B[Repeat consult usage]
    B --> C[Specialist referrals]
    C --> D[Diagnostics take-rate]
    C --> E[Pharmacy take-rate]
    D --> F[Higher ARPU and repeatability]
    E --> F
```

### Revenue maturation table
| Phase | Primary Revenue | Secondary Revenue | Comment |
| --- | --- | --- | --- |
| Pre-Pilot | none | none | proof phase |
| Pilot 1 | initial GP consults | limited specialist and coordination fees | proof of willingness to pay |
| Pilot 2 | stronger consult mix | pharmacy and diagnostics commissions | more stable blended economics |
| Production | full transaction stack | optional future subscriptions | most complete monetization shape |

## 8. Operational Model Diagram
```mermaid
flowchart TD
    P[Patient] --> T[AI triage / consult request]
    T --> G[GP workflow]
    G --> S[Specialist referral]
    G --> PH[Pharmacy flow]
    G --> L[Diagnostics flow]
    S --> A[Admin coordination]
    PH --> A
    L --> A
    A --> O[Outcome and follow-up]
```

### Operating logic notes
- admin remains an important service-quality layer through pilots
- pharmacy and diagnostics can remain human-assisted without invalidating the model
- production readiness means the technology is launchable; not every service path must be fully automated by then

## 9. Product Readiness Matrix
| Area | Current Prototype State | Pilot Requirement | Production Requirement |
| --- | --- | --- | --- |
| Patient consult flow | present | stable | production-safe |
| Provider web workflow | present | stable | production-safe |
| Admin workflows | present | active and measured | mature and auditable |
| Patient APK | pending | credible pilot MVP | stronger release discipline |
| Payment localization | partial / scaffold | roadmap and early path | localized live path |
| Security hardening | incomplete | improved | strong enough for live operation |

## 10. Fundraising Pathway Map
```mermaid
flowchart TD
    A[Warm network and founder support] --> B{Need outside capital before proof?}
    B -->|Yes| C[Bridge SAFE]
    B -->|No| D[Pilot 1 proof]
    C --> D
    D --> E[Core pre-seed raise]
    E --> F[Pilot 2 and production hardening]
    F --> G[Next institutional round]
```

## 11. Risk Heatmap
| Risk | Likelihood | Impact | Heat |
| --- | --- | --- | --- |
| APK slip | medium-high | high | high |
| Security hardening lag | medium | high | high |
| Payment localization lag | medium | high | high |
| Manual ops overload | high | medium | high |
| Partner conversion weakness | medium | medium-high | medium-high |
| Regulatory delay | medium | high | high |

### Risk visualization
| Impact \ Likelihood | Low | Medium | High |
| --- | --- | --- | --- |
| High |  | security, payments, regulation | APK slip |
| Medium |  | partner conversion | manual ops overload |
| Low |  |  |  |

## 12. Recommended Path Comparison
| Dimension | Fallback Path | Recommended Base Path | Acceleration Path |
| --- | --- | --- | --- |
| Scenario | `S2 / O2 / I2` | `S3 / O2 / I2` | `S3 / O2 or O3 / I3` |
| Investor interpretation | core pre-seed with later entry | strongest balanced pre-seed story | strategic acceleration |
| Speed | medium | medium-fast | fast |
| Founder strain | medium-high | medium | lower |
| Investor readability | good | very good | very good |
| Recommendation | fallback | primary | upside |

```mermaid
flowchart LR
    A[Fallback: Scenario 2 / O2 / I2] --> B[Recommended: Scenario 3 / O2 / I2]
    B --> C[Upside: Scenario 3 / O2 or O3 / I3]
```

## 13. Scenario Compression Matrix
This is the simplified investor-facing compression of the 21-scenario library.

| Bucket | Included Paths | How To Use |
| --- | --- | --- |
| Survival | self-funded and bridge-stress cases | internal discipline only |
| Base | core pre-seed backed, balanced cases | primary investor discussion |
| Acceleration | larger early-capital cases | strategic investor discussion |

## 14. Visual Summary Dashboard
| Theme | Best Visual |
| --- | --- |
| product breadth | layered platform map |
| market problem | broken patient-journey diagram |
| launch strategy | country ladder |
| financing realism | funding ladder |
| scenario clarity | three-path comparison |
| risk discipline | heatmap |
| use of funds | pie or segmented bar |
| monetization | revenue ladder |

## 15. How To Use This Appendix
1. Pull diagrams directly into the deck outline.
2. Use the tables for memo appendix sections.
3. Keep the 21-scenario detail in the data room, not in the main presentation.
4. Use the financing ladder whenever small bridge cases could otherwise confuse investors.
5. Use the recommended-path comparison in almost every investor conversation.

## Related Documents
- [./financing-normalization.md](./financing-normalization.md)
- [./fundraising-structures-playbook.md](./fundraising-structures-playbook.md)
- [./investor-memo.md](./investor-memo.md)
- [./investor-deck-outline.md](./investor-deck-outline.md)
