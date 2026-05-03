# Prescription Details -- V3: MyDawa-Inspired

## Design Direction

Adapts MyDawa's **order detail and delivery tracking patterns** for a pharmacist-facing prescription view. The prescription becomes an "order" with clear status progression, medication items are styled like product line items in a cart, and the prescriber section mirrors a seller/supplier info card. The dispensing action feels like an order fulfillment step.

## Competitor Reference

**MyDawa order detail patterns:**
- Order number prominently displayed with copy-to-clipboard
- Status timeline showing: Received -> Processing -> Dispatched -> Delivered
- Product line items with name, dosage, quantity in a clean list
- Delivery estimate displayed prominently with time badge
- Payment method and total shown in a summary footer
- Pharmaceutical technologist delivery with medication counseling

**General pharmacy e-commerce patterns:**
- Stepper/timeline for order status progression
- Product cards with clear hierarchy: name (bold), details (secondary), quantity (badge)
- Sticky action bar with primary CTA and order total
- Trust badges (verified prescriber, encrypted, licensed pharmacy)
- Accessible large tap targets for primary actions

## Visual Changes

### Colors
- Page background uses white (`#FFFFFF`) with thin 4px emerald top strip (matching scanner V3)
- Progress bar track uses `#E2E8F0` and fill uses solid `$color-emerald` (no gradient)
- A new status chip above the prescription ID showing current state: green for "Ready to Dispense", amber for "Claimed", grey for "Pending"
- Medication cards gain a left border: 3px solid `$color-emerald` -- product line item style
- Prescriber card gets a blue-grey background: `#F0F4F8` -- supplier card treatment

### Typography
- Prescription ID uses Inter at 20px bold with monospace styling -- order number feel
- A small "ORDER" label above the prescription ID: 10px, weight 600, uppercase, `$color-text-muted`
- Medication card name uses weight 600 at 15px
- Medication card dosage/frequency uses `$font-size-sm` with `$color-text-secondary`
- Section titles use 13px uppercase, weight 600, letter-spacing wide -- e-commerce section headers

### Spacing
- Prescription container max-width narrows from 640px to 600px -- tighter, more app-like
- Medications gap tightens from `$space-md` to 12px -- denser product list
- Medication card padding tightens from `$card-padding` to 14px
- Prescriber card padding keeps at `$space-md`
- Privacy badges gap tightens to 6px

### Borders & Radius
- Medication cards use `$radius-md` (8px) with the 3px left emerald border
- No radius increases -- keep things sharp and app-like
- Status chip uses `$radius-sm` (4px) -- sharp badge
- Prescriber card uses `$radius-md`
- Privacy badges use `$radius-sm` (4px) instead of pill -- operational badges

### Surface & Shadows
- Medication cards use `$shadow-sm` only
- Prescriber card has no shadow -- background differentiation only
- Progress card has no shadow -- flat with 1px border
- Sticky footer uses minimal shadow: `0 -1px 4px rgba(15, 23, 42, 0.06)`
- Overall very flat treatment -- e-commerce clean

### Status & Interactions
- "Complete Dispensing" button is solid emerald with `inset 0 1px 0 rgba(255,255,255,0.2)` -- depth cue
- "Mark All as Dispensed" secondary uses a subtle emerald border instead of grey
- Medication card checkboxes use emerald tint when ready (not grey disabled)
- A step indicator row above the progress bar: three dots/labels showing Claimed -> Dispensing -> Complete
- Hover on medication cards shows a subtle left-border thickening to 4px

## SCSS Override Snippet

```scss
// V3: MyDawa-Inspired -- Prescription Details

.prescription-details {
  background: v.$color-white;

  &::before {
    content: '';
    display: block;
    height: 4px;
    background: v.$color-emerald;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: v.$z-fixed;
  }
}

.prescription-container {
  max-width: 600px;
}

// Order label above prescription ID
.prescription-info::before {
  content: 'PRESCRIPTION ORDER';
  display: block;
  font-family: v.$font-family-primary;
  font-size: 10px;
  font-weight: v.$font-weight-semibold;
  color: v.$color-text-muted;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: v.$space-xs;
}

.prescription-id {
  font-family: v.$font-family-mono;
  font-size: 20px;
}

.section-title {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: v.$letter-spacing-wide;
}

.dispensing-progress {
  box-shadow: none;
}

.progress-bar__fill {
  background: v.$color-emerald;
}

.medications-section {
  gap: 12px;
}

.medication-card {
  border-left: 3px solid v.$color-emerald;
  padding: 14px;
  box-shadow: v.$shadow-sm;
  transition: border-left-width v.$transition-fast;

  &:hover {
    border-left-width: 4px;
    border-color: v.$color-emerald; // top/right/bottom stay default, left is emerald
  }

  &__name {
    font-size: 15px;
    font-weight: v.$font-weight-semibold;
  }
}

.prescriber-card {
  background: #F0F4F8;
  box-shadow: none;
  border-color: #DDE3EA;
}

.privacy-badges {
  gap: 6px;
}

.privacy-badge {
  border-radius: v.$radius-sm;
  font-size: 11px;
  font-weight: v.$font-weight-semibold;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.sticky-footer {
  box-shadow: 0 -1px 4px rgba(15, 23, 42, 0.06);
}

.action-button--primary {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.action-button--secondary {
  border-color: rgba(v.$color-emerald, 0.3);
  color: v.$color-emerald-dark;
}
```

## Visual Description

The prescription details page feels like an order fulfillment screen. A thin emerald strip runs across the top. Above the prescription code, a small "PRESCRIPTION ORDER" label appears in muted uppercase. The prescription ID is rendered in monospace at 20px -- an order number, not a heading. Section titles are 13px uppercase with wide letter-spacing, dividing the page into clear zones. Medication cards each have a 3px emerald left border (thickening to 4px on hover), creating a product line-item feel with tight 12px gaps between them. The prescriber card sits on a blue-grey background with no shadow -- supplier info, not a hero. Privacy badges are sharp-cornered and uppercase. The sticky footer has barely-there shadow, and the secondary action button uses an emerald-tinted border. The whole page reads as a clean order processing interface.
