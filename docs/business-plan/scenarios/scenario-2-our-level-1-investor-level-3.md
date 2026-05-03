# Scenario 2 - Our Level 1 (Ad Hoc / Bootstrapped) / Investor Level 3 (Fully Funded / Corporate)

## Scenario Summary
Reference case. The scenario keeps the previously approved checkpoint shape, but the underlying staffing, rate-card, and operating model now reflect a part-time multi-team organization with explicit doctor, admin, and support coverage.

- Economic cost to Production: $326,066 / INR 27,063,478
- Target timeline to Production: 24 months
- Founder/company capital modeled before outside funding: $120,000 / INR 9,960,000
- Investor capital modeled: $245,000 / INR 20,335,000
- Main risk to watch: pilot-to-production hardening discipline

## Timeline
| Phase | Timing | Minor Checkpoints | Gate to Advance |
| --- | --- | --- | --- |
| Pre-Pilot | M0-M6 | Architecture freeze, APK backlog lock, doctor training draft, admin callback SOP, issue rehearsal cycles. | Core web flows stable, internal rehearsals pass, doctor and admin runbooks are versioned. |
| Pilot 1 | M6-M9 | Warm-network onboarding, first paid consults, callback calibration, doctor playbooks, admin training refreshers. | Ethiopia pilot runs live for 1-2 months with measured throughput, callbacks, and escalation handling. |
| Pilot 2 | M9-M16 | Kenya prep, partner reporting, roster planning, partial automation, refresher training and staffing calibration. | 5k-10k user-capable operations exist with stronger APK, cleaner reporting, and staffed callback coverage. |
| Production Readiness | M16-M24 | Compliance closeout, release freeze, launch playbooks, certification refreshers, production support schedule. | Current prototype scope is production-safe across web and patient mobile with documented fallback operations. |

## Feature and Output Checklist
| Phase | Output Checklist |
| --- | --- |
| Pre-Pilot | Web core hardened; APK build underway; doctor/admin training materials drafted; support desk scripts and callback trees defined. |
| Pilot 1 | Patient app covers core journeys; provider web is stable; doctor roster, admin callbacks, and manual fulfilment are visible in-system. |
| Pilot 2 | Core patient features complete; partner dashboards cleaner; staffing ladder is active; reporting, payments, and support loops are tighter. |
| Production Readiness | Current prototype scope is production-grade across web and patient mobile, with trained ops staff and manual fallback still available. |

## Services and SLAs
| Phase | Uptime Target | Response Commitment | Operating Model |
| --- | --- | --- | --- |
| Pre-Pilot | 96.0% | Same-day support | 3 core team + 7 part-time developers + 2 advisors; no employed clinical coverage yet, only training and rehearsals. |
| Pilot 1 | 97.0% | 4 business hours for critical issues | Minimum employed coverage: 2 doctors, 2 admin ops, 2 technical support, alongside friendly clinics and partner clinicians. |
| Pilot 2 | 98.2% | 2-hour P1 response | Minimum employed coverage: 4 doctors, 4 admin ops, 2 technical support, with stronger callback and partner reporting loops. |
| Production | 99.2% | 1-hour P1 response | Minimum employed coverage: 6 doctors, 6 admin ops, 3 technical support for near-24/7 coverage and release support. |

## Cost Breakdown
| Category | Amount |
| --- | --- |
| Capital expenditure through Production | $180,334 / INR 14,967,722 |
| Operating expenditure before Production launch | $145,732 / INR 12,095,756 |
| Total economic spend to Production | $326,066 / INR 27,063,478 |

| Workstream | Economic Cost | Notes |
| --- | --- | --- |
| Product and founder office | $124,800 / INR 10,358,400 | 3 core team members at part-time market value, plus fractional advisory support. |
| Web platform hardening | $27,564 / INR 2,287,812 | Remaining web scope normalized to 720-770 hours; model uses 745 hours expected. |
| Patient APK build | $7,200 / INR 597,600 | Fixed Android quote: 480 hours at $15/hr average across the mobile team. |
| QA, DevOps, security | $13,310 / INR 1,104,730 | Includes release discipline, hardening, monitoring, and production checklists. |
| Admin and care operations | $90,301 / INR 7,494,983 | Includes employed doctors, admin callback staff, and technical support ladder by phase. |
| Partner onboarding and provider success | $12,816 / INR 1,063,728 | Includes doctor/admin training protocols, SOP writing, partner reporting, and staff refreshers. |
| Legal, accounting, compliance | $7,460 / INR 619,180 | Friendly-network pricing counted at market-value equivalent for economic modeling. |
| Infrastructure, phones, and tools | $27,858 / INR 2,312,214 | Includes hosting, devices, telecom/call costs, and operational tooling. |
| Marketing, travel, rehearsals | $14,757 / INR 1,224,831 | Light but explicit spend for partner visits, rehearsals, and launch prep. |

## Effort and Team
| Function | Staffing Pattern | Notes |
| --- | --- | --- |
| Core team | 3 part-time members @ ~4 hours/day each | Single owner/founder + 2 founding members; one founding member acts as technical head / product-testing lead. |
| Technical delivery | 7 part-time developers, modeled at ~210 productive technical hrs/mo | Includes the Android/backend group, plus explicit full-stack and DevOps web support. |
| Post-investor technical stance | post-round maximum parallelism (~420-480 hrs/mo) | Only applies where outside capital exists. |
| Advisory board | 2 fractional advisors | Used for finance, compliance, and strategic review rather than full-time execution. |
| Employed care coverage | Pilot 1: 2 doctors / Pilot 2: 4 / Pre-Production: 6 | Partner clinics still matter, but minimum employed coverage is modeled explicitly. |
| Employed admin ops | Pilot 1: 2 admins / Pilot 2: 4 / Pre-Production: 6 | Callbacks, exception handling, travel/tourism follow-ups, manual fulfilment visibility. |
| Technical support | Pilot 1: 2 / Pilot 2: 2 / Pre-Production: 3 | Lower-tier support staff backing the delivery team and live operations. |

## Revenue and Pricing
| Revenue Source | Pilot 1 | Pilot 2 | Production |
| --- | --- | --- | --- |
| GP consults | Subsidised, Ethiopia-first, around $2-$3 per paid interaction | Full Ethiopia + Kenya pricing tests | Core revenue line |
| Specialist consults | Minimal at first | Grows after referral throughput improves | Important but lower-volume margin contributor |
| Pharmacy commission | Small, admin-assisted | Repeatable, still manual-heavy | Stronger if partner conversion improves |
| Diagnostics commission | Small, admin-assisted | Better once order flow is consistent | Useful add-on and retention lever |
| Travel/care coordination | Few cases, high touch | Higher-value but low-volume | Strategic differentiator rather than mass-market default |

| Revenue Line | Ethiopia Benchmark | Kenya Benchmark | Notes |
| --- | --- | --- | --- |
| GP consult | $3.5 / ETB 470 | $5 / KES 650 | Starts subsidised in Pilot 1 and reaches benchmark pricing by Production. |
| Specialist consult | $9 / ETB 1,250 | $12 / KES 1,560 | Pilot 2 onward. |
| Pharmacy take-rate | 10% of order value | 10% of order value | Pilot 1 onward with manual fulfilment support. |
| Diagnostics take-rate | 12% of order value | 12% of order value | Pilot 1 onward with admin/lab coordination. |
| Travel/care coordination fee | $10-$15 | $10-$15 | Small volume, high-touch service. |
| Subscription | Deferred | Deferred | Not modeled before meaningful scale. |

## CAC and Key Business Metrics
| Metric | Pilot 1 | Pilot 2 | Production |
| --- | --- | --- | --- |
| CAC | $15 | $19 | $25 |
| Gross margin | 44% | 56% | 67% |
| Monthly ARPU | $2 | $4 | $5 |
| Monthly churn | 14% | 9% | 5% |
| LTV/CAC target | 1.8x | 2.5x | 3.3x |

## Cash Flow and Runway
| Checkpoint | Ending Cash | Approx. Runway Remaining | Trigger Threshold |
| --- | --- | --- | --- |
| Pre-Pilot | $24,366 | 2.0 months | Trigger contingency if cash drops below 3 months of current burn. |
| Pilot 1 | $28,029 | 2.0 months | Trigger contingency if cash drops below 3 months of current burn. |
| Pilot 2 | $221,698 | 14.2 months | Trigger contingency if cash drops below 3 months of current burn. |
| Production Readiness | $256,530 | 15.9 months | Trigger contingency if cash drops below 3 months of current burn. |

| Month | Phase | Founder/Company Capital In | Investor In | Revenue In | Outflow | Net | Ending Cash |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | Pre-Pilot | $13,333 | $0 | $0 | $8,972 | $4,361 | $4,361 |
| M2 | Pre-Pilot | $13,333 | $0 | $0 | $8,972 | $4,361 | $8,722 |
| M3 | Pre-Pilot | $13,333 | $0 | $0 | $8,972 | $4,361 | $13,083 |
| M4 | Pre-Pilot | $13,333 | $0 | $0 | $8,972 | $4,361 | $17,444 |
| M5 | Pre-Pilot | $13,333 | $0 | $0 | $8,972 | $4,361 | $21,805 |
| M6 | Pre-Pilot | $13,333 | $0 | $0 | $10,772 | $2,561 | $24,366 |
| M7 | Pilot 1 | $13,333 | $0 | $792 | $13,300 | $825 | $25,191 |
| M8 | Pilot 1 | $13,333 | $0 | $1,188 | $13,300 | $1,221 | $26,412 |
| M9 | Pilot 1 | $13,333 | $0 | $1,584 | $13,300 | $1,617 | $28,029 |
| M10 | Pilot 2 | $0 | $245,000 | $3,990 | $14,458 | $234,532 | $262,561 |
| M11 | Pilot 2 | $0 | $0 | $5,035 | $14,458 | $-9,423 | $253,138 |
| M12 | Pilot 2 | $0 | $0 | $6,080 | $14,458 | $-8,378 | $244,760 |
| M13 | Pilot 2 | $0 | $0 | $7,125 | $14,458 | $-7,333 | $237,427 |
| M14 | Pilot 2 | $0 | $0 | $8,170 | $14,458 | $-6,288 | $231,139 |
| M15 | Pilot 2 | $0 | $0 | $9,215 | $14,458 | $-5,243 | $225,896 |
| M16 | Pilot 2 | $0 | $0 | $10,260 | $14,458 | $-4,198 | $221,698 |
| M17 | Production Readiness | $0 | $0 | $12,540 | $16,166 | $-3,626 | $218,072 |
| M18 | Production Readiness | $0 | $0 | $14,820 | $16,166 | $-1,346 | $216,726 |
| M19 | Production Readiness | $0 | $0 | $17,100 | $16,166 | $934 | $217,660 |
| M20 | Production Readiness | $0 | $0 | $19,380 | $16,166 | $3,214 | $220,874 |
| M21 | Production Readiness | $0 | $0 | $21,660 | $16,166 | $5,494 | $226,368 |
| M22 | Production Readiness | $0 | $0 | $23,940 | $16,166 | $7,774 | $234,142 |
| M23 | Production Readiness | $0 | $0 | $26,220 | $16,166 | $10,054 | $244,196 |
| M24 | Production Readiness | $0 | $0 | $28,500 | $16,166 | $12,334 | $256,530 |

## Fundraising, Valuation, and Dilution
| Item | Value |
| --- | --- |
| Founder/self-funded capital before investor | $120,000 / INR 9,960,000 |
| Investor round size | $245,000 / INR 20,335,000 |
| Recommended structure | SAFE or milestone-based bridge/pre-seed |
| Modeled pre-money valuation | $2,205,000 |
| Modeled post-money valuation | $2,450,000 |
| Modeled investor dilution from the 20% pool | 10.0% |

| Ownership Pool | Before Round | After Modeled Round | Notes |
| --- | --- | --- | --- |
| Owner / founder pool | 60% | 60% | Held by the single idea owner / founder. |
| Founding + strategic pool | 20% | 20% | Shared pool for founding members and strategic partners. |
| Investor pool | 20% reserved | 10.0% issued / 10.0% remaining | Modeled from the dedicated investor pool, not from the founder or founding-team pools. |

## Risk Register and Contingencies
| Risk | Likelihood | Impact | Mitigation / Trigger |
| --- | --- | --- | --- |
| Funding delay | Medium | High | Slow hiring, stretch manual ops, and prioritize doctor/admin coverage before marketing expansion. |
| Regulatory delay | Medium | High | Continue partner-license model and count friendly counsel/accounting support at economic value. |
| Manual ops overload | High | Medium | Add admin capacity before feature expansion; track callback backlog as an explicit release gate. |
| Payment-rail mismatch | Medium | High | Use digital invoicing first; localize M-Pesa / Telebirr rails before scaling acquisition. |
| Security and privacy gap | Medium | High | Keep release freeze, monitoring, and testing discipline tied to launch gates. |
| Team fragmentation | Medium | Medium | Use the technical head / product-testing role to coordinate part-time contributors and shrink rework. |

## 2-Year Extension Outline
- Year 3: reduce manual callbacks, automate more partner and reporting loops, and deepen Kenya only after Ethiopia economics stabilize.
- Year 4: reuse the operating playbook in the next country, carrying forward trained admin, doctor, and support processes.

## Assumption Notes
- Android is still modeled from the external quote: 480 total hours at $15/hr average across the mobile team.
- Remaining web work is normalized to roughly 150%-160% of Android effort, with an expected case of 745 hours, while the rest of the technical time supports hardening, QA, training, and launch operations.
- Salary benchmarks used for employed coverage: NHM Assam Medical Officer (MBBS) remuneration band (~INR 54,625-57,881 per month, official RoP approval), NCS customer/back-office roles (~INR 13,000-22,000), and NCS technical-support roles (~INR 18,000-28,000). Planning model uses INR 60,000 for doctors, INR 18,000 for admin ops, and INR 25,000 for technical support.
