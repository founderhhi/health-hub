from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.enums import TA_LEFT, TA_CENTER

OUTPUT = "/Users/anuraaggudimella/Documents/health-hub/docs/HealthHub-Application-Documentation.pdf"

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    leftMargin=22*mm,
    rightMargin=22*mm,
    topMargin=22*mm,
    bottomMargin=22*mm,
    title="Health Hub Application Documentation",
    author="Health Hub",
)

W = A4[0] - 44*mm

# ── Colours ──────────────────────────────────────────────────────────────────
TEAL      = colors.HexColor("#0D7C7C")
DARK      = colors.HexColor("#1A1A2E")
MID_GREY  = colors.HexColor("#4A4A5A")
LIGHT_BG  = colors.HexColor("#F4F8F8")
RULE      = colors.HexColor("#C8DCDC")
WHITE     = colors.white

# ── Styles ────────────────────────────────────────────────────────────────────
base = getSampleStyleSheet()

title_style = ParagraphStyle(
    "DocTitle",
    fontName="Helvetica-Bold",
    fontSize=22,
    textColor=DARK,
    spaceAfter=4,
    alignment=TA_LEFT,
    leading=26,
)

subtitle_style = ParagraphStyle(
    "DocSubtitle",
    fontName="Helvetica",
    fontSize=11,
    textColor=MID_GREY,
    spaceAfter=18,
    alignment=TA_LEFT,
)

h1 = ParagraphStyle(
    "H1",
    fontName="Helvetica-Bold",
    fontSize=13,
    textColor=TEAL,
    spaceBefore=18,
    spaceAfter=6,
    leading=16,
)

h2 = ParagraphStyle(
    "H2",
    fontName="Helvetica-Bold",
    fontSize=10.5,
    textColor=DARK,
    spaceBefore=10,
    spaceAfter=4,
    leading=14,
)

body = ParagraphStyle(
    "Body",
    fontName="Helvetica",
    fontSize=9.5,
    textColor=MID_GREY,
    leading=15,
    spaceAfter=3,
)

bullet = ParagraphStyle(
    "Bullet",
    fontName="Helvetica",
    fontSize=9.5,
    textColor=MID_GREY,
    leading=15,
    leftIndent=12,
    spaceAfter=2,
)

note = ParagraphStyle(
    "Note",
    fontName="Helvetica-Oblique",
    fontSize=9,
    textColor=MID_GREY,
    leading=13,
    spaceAfter=8,
)

def rule():
    return HRFlowable(width="100%", thickness=0.5, color=RULE, spaceAfter=6, spaceBefore=2)

def b(text):
    return Paragraph(f"<b>{text}</b> — " , bullet)

def li(label, desc):
    return Paragraph(f"<b>{label}</b> — {desc}", bullet)

def plain(text):
    return Paragraph(text, body)

def heading1(text):
    return Paragraph(text, h1)

def heading2(text):
    return Paragraph(text, h2)

def sp(n=6):
    return Spacer(1, n)

# ── Table helper ─────────────────────────────────────────────────────────────
def make_table(data, col_widths):
    t = Table(data, colWidths=col_widths, hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND",   (0, 0), (-1, 0),  TEAL),
        ("TEXTCOLOR",    (0, 0), (-1, 0),  WHITE),
        ("FONTNAME",     (0, 0), (-1, 0),  "Helvetica-Bold"),
        ("FONTSIZE",     (0, 0), (-1, 0),  9),
        ("BOTTOMPADDING",(0, 0), (-1, 0),  7),
        ("TOPPADDING",   (0, 0), (-1, 0),  7),
        ("BACKGROUND",   (0, 1), (-1, -1), LIGHT_BG),
        ("ROWBACKGROUNDS",(0,1), (-1,-1),  [WHITE, LIGHT_BG]),
        ("FONTNAME",     (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE",     (0, 1), (-1, -1), 9),
        ("TEXTCOLOR",    (0, 1), (-1, -1), MID_GREY),
        ("TOPPADDING",   (0, 1), (-1, -1), 5),
        ("BOTTOMPADDING",(0, 1), (-1, -1), 5),
        ("LEFTPADDING",  (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("GRID",         (0, 0), (-1, -1), 0.3, RULE),
        ("VALIGN",       (0, 0), (-1, -1), "TOP"),
    ]))
    return t

# ═══════════════════════════════════════════════════════════════════════════════
# BUILD STORY
# ═══════════════════════════════════════════════════════════════════════════════
story = []

# ── Title block ───────────────────────────────────────────────────────────────
story.append(Paragraph("Health Hub", title_style))
story.append(Paragraph("Application Documentation", subtitle_style))
story.append(rule())
story.append(sp(4))

# ── 1. User Roles ─────────────────────────────────────────────────────────────
story.append(heading1("1. User Roles"))
story.append(plain(
    "The platform supports six portal types. Role tags are used internally "
    "to route users to the correct portal; sub-roles within the same area share "
    "a single interface."
))
story.append(sp(4))

roles_data = [
    ["Role", "Portal Access"],
    ["Patient",     "Patient Portal"],
    ["Health Expert (GP)", "Health Expert Portal"],
    ["Specialist",  "Specialist Portal"],
    ["Pharmacist",  "Pharmacy Portal"],
    ["Diagnostics", "Diagnostics Portal"],
    ["Admin",       "Admin Portal"],
]
story.append(make_table(roles_data, [W*0.45, W*0.55]))
story.append(sp(8))

# ── 2. Patient Portal ─────────────────────────────────────────────────────────
story.append(heading1("2. Patient Portal  (/patient/*)"))

items = [
    ("Dashboard",           "Home view with key metrics and quick actions"),
    ("Appointments",        "View all scheduled consultations"),
    ("Video Consultation",  "Join a live video call with a Health Expert or Specialist"),
    ("Medical Records",     "Personal health history"),
    ("Waiting Room",        "Queue status while waiting for a consultation"),
    ("Notifications",       "Alerts and updates from the care team"),
    ("AI Health Chat",      "Symptom checker with GP booking and HealWell content recommendations"),
    ("Profile",             "Personal details and billing tab — add or remove payment cards"),
    ("HealWell Africa / HealWell India", "Regional health and wellness content"),
    ("Travel Health",       "Travel vaccinations and related services"),
    ("Patient Pharmacy",    "View and track prescriptions"),
    ("Patient Specialist",  "View and manage specialist referrals"),
]
for label, desc in items:
    story.append(li(label, desc))

story.append(sp(8))

# ── 3. Health Expert Portal ───────────────────────────────────────────────────
story.append(heading1("3. Health Expert Portal  (/gp)"))

items = [
    ("Dashboard / Queue",       "Live consultation queue with accept and reject controls"),
    ("Consultation History",    "Record of past consultations"),
    ("Manage Consultation",     "Mark consultations as complete or remove them"),
    ("Profile",                 "Credentials, specialty, and online/offline status toggle"),
]
for label, desc in items:
    story.append(li(label, desc))

story.append(sp(8))

# ── 4. Specialist Portal ──────────────────────────────────────────────────────
story.append(heading1("4. Specialist Portal  (/specialist/*)"))

items = [
    ("Dashboard",               "Incoming referrals list"),
    ("Referral Details",        "Accept, schedule, request additional information, or reassign a referral"),
    ("Specialist Consultation", "Run the consultation — chat, prescribe, and order lab tests"),
    ("Profile",                 "Specialty, facility, and credentials"),
]
for label, desc in items:
    story.append(li(label, desc))

story.append(sp(8))

# ── 5. Pharmacy Portal ────────────────────────────────────────────────────────
story.append(heading1("5. Pharmacy Portal  (/pharmacy/*)"))

items = [
    ("Prescription Scanner",  "Scan or look up a prescription by code"),
    ("Prescription Details",  "View, claim, and dispense a prescription"),
    ("Dispensing History",    "Full log of dispensed prescriptions"),
    ("Profile",               "Pharmacy credentials"),
]
for label, desc in items:
    story.append(li(label, desc))

story.append(sp(8))

# ── 6. Diagnostics Portal ─────────────────────────────────────────────────────
story.append(heading1("6. Diagnostics Portal  (/diagnostics/*)"))

items = [
    ("Lab Orders",      "Incoming orders organised by status tabs"),
    ("Order Details",   "Full detail view for a single order"),
    ("Result Upload",   "Upload test results as PDF or image"),
    ("Profile",         "Facility and lab credentials"),
]
for label, desc in items:
    story.append(li(label, desc))

story.append(sp(8))

# ── 7. Admin Portal ───────────────────────────────────────────────────────────
story.append(heading1("7. Admin Portal  (/admin/*)"))

items = [
    ("Dashboard",         "System overview and key metrics"),
    ("User Management",   "List users, create accounts, update roles and status, approve provider access requests"),
    ("Activity Logs",     "Full record of user activity across the platform"),
    ("Service Requests",  "Handle travel and callback requests submitted by patients"),
    ("Prescriptions",     "View all prescriptions and contact patients where required"),
    ("Diagnostics",       "View all lab orders and contact patients where required"),
    ("Referrals",         "View all referrals and manage workflow progression"),
    ("System Health",     "Server health metrics and uptime monitoring"),
]
for label, desc in items:
    story.append(li(label, desc))

story.append(sp(8))

# ── 8. Authentication ─────────────────────────────────────────────────────────
story.append(heading1("8. Authentication  (/auth/*)"))

items = [
    ("Login",             "Secure login with rate limiting"),
    ("Signup",            "Registration for patients and providers"),
    ("Forgot Password",   "Password reset flow"),
]
for label, desc in items:
    story.append(li(label, desc))

story.append(sp(4))
story.append(plain(
    "Provider accounts (Health Expert, Specialist, Pharmacist, Diagnostics) "
    "require manual approval by an Admin before access is granted."
))
story.append(sp(8))

# ── 9. Core Workflows ─────────────────────────────────────────────────────────
story.append(heading1("9. Core Workflows"))

# 9.1
story.append(heading2("9.1  Patient Consultation"))
steps = [
    "Patient submits a consultation request",
    "Health Expert sees the request in the queue and accepts",
    "A video room is created and both parties are notified",
    "Consultation takes place via video call",
    "Health Expert marks the consultation as complete",
    "Patient receives a summary notification",
]
for i, s in enumerate(steps, 1):
    story.append(Paragraph(f"{i}.  {s}", bullet))

story.append(sp(8))

# 9.2
story.append(heading2("9.2  Referral"))
steps = [
    "Health Expert creates a referral to a Specialist",
    "Specialist receives a notification and reviews the referral",
    "Specialist accepts and schedules a consultation, or requests additional patient information",
    "Consultation takes place via video call",
    "Referral is marked as complete",
]
for i, s in enumerate(steps, 1):
    story.append(Paragraph(f"{i}.  {s}", bullet))

story.append(sp(8))

# 9.3
story.append(heading2("9.3  Prescription and Pharmacy"))
steps = [
    "Health Expert or Specialist creates a prescription",
    "Pharmacy scans or looks up the prescription code",
    "Pharmacy claims the prescription",
    "Pharmacy dispenses the prescription",
    "Patient receives a pickup notification",
    "Admin receives a copy and contacts the patient if any follow-up is needed",
]
for i, s in enumerate(steps, 1):
    story.append(Paragraph(f"{i}.  {s}", bullet))

story.append(sp(8))

# 9.4
story.append(heading2("9.4  Diagnostics"))
steps = [
    "Health Expert or Specialist raises a lab order",
    "Diagnostics team receives the order and marks it as received",
    "Results are uploaded to the platform",
    "Health Expert and patient are notified that results are ready",
    "Admin receives a copy and contacts the patient if any follow-up is needed",
]
for i, s in enumerate(steps, 1):
    story.append(Paragraph(f"{i}.  {s}", bullet))

story.append(sp(8))

# 9.5
story.append(heading2("9.5  AI Health Triage"))
steps = [
    "Patient chats with the Healthcare AI and describes symptoms",
    "AI works through triage questions to assess severity",
    "Based on severity: patient books a Health Expert, watches a wellness video online, or uses HealWell at home",
]
for i, s in enumerate(steps, 1):
    story.append(Paragraph(f"{i}.  {s}", bullet))

story.append(sp(8))

# 9.6
story.append(heading2("9.6  Payments"))
steps = [
    "Patient adds a payment card via the billing tab in their profile",
    "Card is saved securely for future use",
    "A charge is raised when a consultation or service is confirmed",
    "Payment confirmation is sent to the patient",
]
for i, s in enumerate(steps, 1):
    story.append(Paragraph(f"{i}.  {s}", bullet))

story.append(sp(10))

# ── 10. Integrations ─────────────────────────────────────────────────────────
story.append(heading1("10. Integrations"))

int_data = [
    ["Integration", "Purpose"],
    ["Daily.co",       "Video consultations between patients and providers"],
    ["Stripe",         "Payment processing and card management"],
    ["Healthcare AI",  "Symptom triage and care pathway recommendations"],
    ["Redis",          "Real-time messaging via WebSocket"],
    ["PostgreSQL",     "Primary data store"],
]
story.append(make_table(int_data, [W*0.3, W*0.7]))
story.append(sp(8))

# ── 11. Real-Time Communication ───────────────────────────────────────────────
story.append(heading1("11. Real-Time Communication"))
story.append(plain(
    "The platform uses WebSocket connections to push live updates to connected users. "
    "Channels are scoped by role and by individual user, so each party receives only "
    "the events relevant to them."
))
story.append(sp(4))

events = [
    ("Consultation updates",        "Status changes and new messages during a consultation"),
    ("Referral status changes",     "Notifications when a referral is accepted, scheduled, or completed"),
    ("Lab orders",                  "New orders and result uploads for the Diagnostics team"),
    ("Prescription dispensing",     "Confirmation when a prescription has been dispensed"),
    ("Service request updates",     "Admin responses to travel and callback requests"),
]
for label, desc in events:
    story.append(li(label, desc))

story.append(sp(4))
story.append(plain(
    "The WebSocket layer is backed by Redis pub/sub, which allows the platform "
    "to scale across multiple server instances without losing message delivery."
))

# ── Build ─────────────────────────────────────────────────────────────────────
doc.build(story)
print(f"PDF written to: {OUTPUT}")
