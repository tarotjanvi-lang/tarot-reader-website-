const baseServices = [
  {
    slug: "tarot-reading",
    category: "Tarot & Intuitive Readings",
    type: "tarot",
    name: "Tarot Reading",
    tagline: "Get clarity on love, career, relationships and life with intuitive tarot guidance.",
    price: 1499,
    priceLabel: "₹1,499",
    duration: "45 min",
    questionCount: "Personalised spread",
    focusAreas: ["Love", "Career", "Relationships", "Life direction"],
    description: "A private, intuitive reading to bring clarity to the area of life that is asking for your attention.",
    disclaimer: "Tarot offers reflection and guidance, not fixed predictions. You remain the author of your choices and your path.",
    icon: "tarot",
    included: [
      { title: "Live 1:1 video or voice call", body: "Conducted over a secure video link at your scheduled time." },
      { title: "Focused card spread", body: "A spread chosen intuitively around your specific question or life area." },
      { title: "Recording & notes", body: "A recap sent after your session so you can revisit the guidance anytime." },
      { title: "7-day follow-up window", body: "One short follow-up message for clarifying questions after your reading." },
    ],
    faqs: [
      { q: "How should I prepare for my reading?", a: "Come with an open mind and, if you'd like, a specific question or area of life you want clarity on. There's nothing you need to bring beyond that — I'll guide the flow of the session." },
      { q: "Is this session confidential?", a: "Yes, completely. Every conversation is held in strict confidence — this is a safe, judgment-free space." },
      { q: "What if I need to reschedule?", a: "You can reschedule up to 12 hours before your session using the link in your confirmation email, subject to availability." },
      { q: "Do you tell me exactly what will happen in the future?", a: "No. My role isn't to predict every detail or create fear — it's to help you understand your present so clearly that you can move forward with more confidence." },
      { q: "Can international clients book?", a: "Absolutely — sessions are available worldwide. Time slots are shown automatically in your local time zone at booking." },
    ],
    questions: [],
  },
  {
    slug: "energy-healing",
    category: "SoulMirror Healings",
    type: "healing",
    name: "Energy Healing",
    tagline: "Release blockages, clear negative energy and restore your inner balance.",
    price: 2199,
    priceLabel: "₹2,199",
    duration: "60 min",
    focusAreas: ["Energy balance", "Emotional release", "Inner calm"],
    description: "A calm, remote energy healing session created to support you in releasing heaviness and returning to your inner balance.",
    focusesOn: "Energy awareness, gentle release and practices that support your wellbeing after the session.",
    suitableFor: "Anyone seeking a complementary spiritual practice and a quieter relationship with their own energy.",
    intendedShift: "A greater sense of lightness, calm or emotional clarity. Experiences vary from person to person.",
    disclaimer: "This is a complementary spiritual practice, not a replacement for medical or psychological care.",
    icon: "crystal",
    included: [
      { title: "Live guided energy session", body: "A calm, guided session conducted remotely over video or voice call." },
      { title: "Chakra & blockage reading", body: "An intuitive read of where your energy feels stuck or heavy." },
      { title: "Aftercare notes", body: "Simple practices to support your energy in the days after the session." },
      { title: "7-day follow-up window", body: "One short follow-up message for questions after your session." },
    ],
    faqs: [
      { q: "What does an energy healing session feel like?", a: "Most clients describe a sense of lightness, calm, or emotional release. Sensations vary from person to person." },
      { q: "Do I need to do anything during the session?", a: "Just find a quiet, comfortable space. I'll guide you through everything else." },
      { q: "Is this a substitute for medical or mental health treatment?", a: "No. This is a complementary spiritual practice, not a replacement for medical or psychological care." },
      { q: "Can international clients book?", a: "Yes — sessions are held worldwide with automatic time-zone conversion at booking." },
    ],
    questions: [],
  },
  {
    slug: "manifestation-coaching",
    category: "Soul Guidance & Manifestation",
    type: "guidance",
    name: "Manifestation Coaching",
    tagline: "Align your energy and mindset to manifest the life you truly desire.",
    price: 2999,
    priceLabel: "₹2,999",
    duration: "60 min",
    focusAreas: ["Intention", "Mindset", "Action", "Alignment"],
    description: "A focused coaching session to clarify what you are calling in, understand the blocks around it, and choose grounded next steps.",
    suitableFor: "Anyone ready to pair intuitive insight with practical reflection and action.",
    disclaimer: "Manifestation is personal and does not guarantee a specific outcome. Your choices and real-world action remain essential.",
    icon: "moon",
    included: [
      { title: "Live 1:1 coaching call", body: "A focused conversation to clarify your intention and the blocks around it." },
      { title: "Personalised practice", body: "A short manifestation practice tailored to what you're working toward." },
      { title: "Session recap", body: "Written notes so you can revisit your action steps." },
      { title: "7-day follow-up window", body: "One short follow-up message after your session." },
    ],
    faqs: [
      { q: "Is this coaching or a reading?", a: "It's coaching — grounded in intuitive insight but focused on practical steps and mindset shifts, not card-based prediction." },
      { q: "How soon will I see results?", a: "This varies by person and situation. The session gives you clarity and a practice; the pace of manifestation is individual." },
      { q: "Can international clients book?", a: "Yes, worldwide — with time slots shown in your local time zone." },
    ],
    questions: [],
  },
  {
    slug: "soul-guidance",
    category: "Soul Guidance & Manifestation",
    type: "guidance",
    name: "Soul Guidance",
    tagline: "Deep spiritual guidance to help you connect with your higher self and purpose.",
    price: 1799,
    priceLabel: "₹1,799",
    duration: "45 min",
    focusAreas: ["Life transitions", "Purpose", "Patterns", "Spiritual growth"],
    description: "Deep spiritual guidance for moments when you need a compassionate, intuitive space to reconnect with your path.",
    suitableFor: "Anyone moving through a transition or feeling called to understand their path more deeply.",
    disclaimer: "Guidance is offered for reflection and support. It does not replace professional medical, legal or financial advice.",
    icon: "lotus",
    included: [
      { title: "Live 1:1 guidance call", body: "An open, intuitive conversation held with compassion and confidentiality." },
      { title: "Pattern reflection", body: "Space to see the recurring patterns and choices shaping your path." },
      { title: "Session recap", body: "A short written reflection sent after your session." },
      { title: "7-day follow-up window", body: "One short follow-up message for clarifying questions." },
    ],
    faqs: [
      { q: "Is this a religious or spiritual practice?", a: "It's a spiritual guidance practice rooted in intuition, energy work and ancestral wisdom — approached with respect for wherever you're coming from." },
      { q: "What kind of questions can I bring?", a: "Anything from a life transition to a general feeling of being lost — this session meets you wherever you are." },
      { q: "Can international clients book?", a: "Yes — available worldwide with automatic time-zone conversion." },
    ],
    questions: [],
  },
  {
    slug: "love-relationship",
    category: "Tarot & Intuitive Readings",
    type: "tarot",
    name: "Love & Relationship Reading",
    tagline: "Get clarity on love, feelings, challenges and the direction of your connection.",
    price: 1299,
    priceLabel: "₹1,299",
    duration: "45 min",
    questionCount: "8 key questions",
    focusAreas: ["Love", "Feelings", "Thoughts", "Challenges", "Future Direction"],
    description: "A focused reading for understanding the energy, feelings, challenges and potential direction of your connection.",
    disclaimer: "This reading supports reflection and choice. It cannot guarantee another person’s actions or override their free will.",
    icon: "tarot",
    included: [
      { title: "Live 1:1 video or voice call", body: "A session focused entirely on your relationship question." },
      { title: "Relationship-focused spread", body: "Cards chosen intuitively around the dynamic you're navigating." },
      { title: "Recording & notes", body: "A recap sent after your session." },
      { title: "7-day follow-up window", body: "One short follow-up message after your reading." },
    ],
    faqs: [
      { q: "Can I ask about a specific person?", a: "Yes — bring the relationship or situation you'd like clarity on." },
      { q: "Is this about compatibility or the future of the relationship?", a: "It can be either — we'll shape the session around what you most want clarity on." },
      { q: "Can international clients book?", a: "Yes, available worldwide with time-zone conversion at booking." },
    ],
    questions: [
      "What is the current energy of this connection?",
      "What are their current feelings towards me?",
      "What are they currently thinking about me and this connection?",
      "What are they not expressing or communicating?",
      "What is the biggest challenge or blockage between us?",
      "What is influencing the connection at present?",
      "What is the potential direction of this relationship?",
      "What guidance do I need regarding this connection?",
    ],
  },
  {
    slug: "custom-session",
    category: "Custom SoulMirror Journeys",
    type: "custom",
    name: "Custom Session",
    tagline: "A tailored combination of tarot, energy work and guidance built around exactly what you're navigating.",
    price: null,
    priceLabel: "On request",
    duration: "Flexible",
    focusAreas: ["Tarot", "Energy work", "Guidance", "Personal intention"],
    description: "A tailored combination of tarot, energy work and guidance built around exactly what you are navigating.",
    disclaimer: "Custom journeys are shaped together during the discovery conversation. Pricing and scope are agreed before booking.",
    icon: "custom",
    included: [
      { title: "A short discovery chat", body: "We'll talk first so the session can be shaped around your exact situation." },
      { title: "Blended modalities", body: "A mix of tarot, energy work and guidance, chosen intuitively for you." },
      { title: "Flexible duration", body: "Session length is agreed upfront based on what you need." },
    ],
    faqs: [
      { q: "How do I book a custom session?", a: "Reach out via the contact page or WhatsApp and we'll design the session together before you book." },
    ],
    questions: [],
  },
];

const catalogueFaqs = [
  { q: "How should I prepare for my session?", a: "Come with an open mind and any context you would like to share. Janvi will guide the session from there." },
  { q: "Can international clients book?", a: "Yes. Sessions are available worldwide and timing is confirmed with you after booking." },
];

const readingIncluded = [
  { title: "Personalised interpretation", body: "Guidance shaped around the intention and service you selected." },
  { title: "Relevant influences", body: "Space to explore the energies and themes connected with your question." },
  { title: "Clear guidance", body: "A reflective session to help you understand your next step." },
];

const healingIncluded = [
  { title: "Focused energy work", body: "A healing journey held around the focus of the selected offering." },
  { title: "Remote practice", body: "The healing is carried out remotely across the stated duration." },
  { title: "Integration space", body: "Time to notice and reflect on your experience after the work." },
];

const tarotQuestions = {
  "general-guidance": [
    "What is my current overall energy?",
    "What is currently influencing my life or situation?",
    "What is the biggest challenge or lesson I am experiencing?",
    "What opportunities are currently opening for me?",
    "What am I not seeing clearly at this time?",
    "What should I focus my energy on right now?",
    "What guidance do I need for my next step?",
  ],
  "career-finance": [
    "What is my current career energy?",
    "What is currently influencing my professional growth?",
    "What is blocking or slowing my career progress?",
    "What opportunities are coming towards me?",
    "Is a job or career change indicated at this time?",
    "What is the current energy around my finances?",
    "What action or direction can support greater career and financial movement?",
    "What guidance do I need for my professional and financial path?",
  ],
  "detailed-life-path": [
    "What is my current overall life energy?",
    "What is currently influencing my path?",
    "What is my deepest current lesson?",
    "What is the energy around my love life?",
    "What is the energy around my career?",
    "What is the energy around my finances?",
    "What is my current relationship with purpose?",
    "What is supporting my spiritual growth?",
    "What is blocking my movement forward?",
    "What guidance do I need for the path ahead?",
  ],
};

const catalogueServices = [
  {
    slug: "general-guidance", category: "Tarot & Intuitive Readings", type: "tarot", name: "General Guidance Reading", tagline: "A seven-question reading for clarity around your present energy and next step.", price: 1111, priceLabel: "₹1,111", duration: "45 min", questionCount: "7 key questions", focusAreas: ["Overall energy", "Influences", "Challenges", "Opportunities"], description: "A general guidance reading exploring the energy, influences, challenges and opportunities around you now.", disclaimer: "Tarot offers reflection and guidance, not fixed predictions. You remain the author of your choices and your path.", icon: "tarot", included: readingIncluded, faqs: catalogueFaqs, questions: tarotQuestions["general-guidance"]
  },
  {
    slug: "career-finance", category: "Tarot & Intuitive Readings", type: "tarot", name: "Career & Finance Reading", tagline: "Clarity around career movement, professional growth and finances.", price: 1299, priceLabel: "₹1,299", duration: "45 min", questionCount: "8 key questions", focusAreas: ["Career", "Job", "Business", "Money", "Opportunities"], description: "A focused reading for understanding your professional path, opportunities and the current energy around finances.", disclaimer: "This reading supports reflection and choice. It is not financial, legal or employment advice and cannot guarantee an outcome.", icon: "tarot", included: readingIncluded, faqs: catalogueFaqs, questions: tarotQuestions["career-finance"]
  },
  {
    slug: "detailed-life-path", category: "Tarot & Intuitive Readings", type: "tarot", name: "Detailed Life Path Reading", tagline: "A deeper ten-question reading across the parts of life shaping your path.", price: 2222, priceLabel: "₹2,222", duration: "60 min", questionCount: "10 key questions", focusAreas: ["Love", "Career", "Finance", "Purpose", "Spiritual Growth"], description: "A detailed reading that brings several life areas into one considered reflection.", disclaimer: "Tarot offers reflection and guidance, not fixed predictions. You remain the author of your choices and your path.", icon: "tarot", included: readingIncluded, faqs: catalogueFaqs, questions: tarotQuestions["detailed-life-path"]
  },
  ...["Will They Come Back?", "Future Spouse & Marriage Timing", "The Connection Truth", "Karmic Contracts", "Money Block Decoder", "The Blockage Behind the Blockage"].map((name) => ({ slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), category: "Signature Soul Readings", type: "tarot", name, tagline: "A signature SoulMirror reading shaped around the intention of this offering.", price: null, priceLabel: "Custom pricing", duration: "By arrangement", questionCount: "Personalised questions", focusAreas: ["Clarity", "Patterns", "Guidance"], description: "A personalised signature reading for the specific area named in this offering.", disclaimer: "This reading supports reflection and choice. It cannot guarantee another person’s actions or override free will.", icon: "tarot", included: readingIncluded, faqs: catalogueFaqs, questions: [] })),
  ...[
    ["Lunar Release", "3-Day", 2222], ["Mirror Reclaim", "3-Day", 2222], ["Cord Unbound", "3-Day", 2222], ["Unspoken", "3-Day", 2222], ["Aura Veil", "3-Day", 2555],
    ["Rose Rebirth", "5-Day", 3333], ["Ember Restoration", "5-Day", 3333], ["Venus Renewal", "5-Day", 3333], ["Crown Awakening", "5-Day", 3333], ["Golden Current", "5-Day", 3333], ["Doorway Clearing", "5-Day", 3333],
    ["Ancestral Release", "7-Day Deep Healing", 4444], ["Beyond the Veil", "7-Day Deep Healing", 4444], ["Destiny Reset", "7-Day Deep Healing", 4444], ["Rebirth Code", "11-Day Deep Transformation", 6666],
  ].map(([name, duration, price]) => ({ slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""), category: "SoulMirror Healings", type: "healing", name, tagline: `${name}, a ${duration.toLowerCase()} SoulMirror healing journey.`, price, priceLabel: `₹${price.toLocaleString("en-IN")}`, duration, focusAreas: ["Energy", "Release", "Integration"], description: `A ${duration.toLowerCase()} healing journey centred on ${name.toLowerCase()}.`, focusesOn: "The healing focus is shaped by the intention and the named offering.", suitableFor: "Those seeking a complementary spiritual practice connected with this offering.", intendedShift: "A space for reflection and personal movement; experiences vary from person to person.", disclaimer: "Healing is a complementary spiritual practice and does not replace medical or psychological care or guarantee a specific outcome.", icon: "crystal", included: healingIncluded, faqs: catalogueFaqs, questions: [] })),
  {
    slug: "intentional-spellwork", category: "Intentional Spellwork", type: "spellwork", name: "Intentional Spellwork", tagline: "Energetic focus for positive movement around a clearly held intention.", price: null, priceLabel: "Custom pricing", duration: "By arrangement", focusAreas: ["Intention", "Energetic focus", "Positive movement"], description: "Spellwork shaped around the intention, duration and scope agreed before the work begins.", focusesOn: "Energetic focus and positive movement connected with your stated intention.", bestSuitedFor: "Those seeking intentional energetic support alongside their own real-world choices and action.", intendedMovement: "A supportive energetic focus, without promising or controlling a specific result.", disclaimer: "Spellwork does not guarantee a specific outcome, replace real-world action or override another person's free will.", icon: "moon", included: healingIncluded, faqs: catalogueFaqs, questions: []
  },
  {
    slug: "custom-soulmirror-session", category: "Soul Guidance & Manifestation", type: "guidance", name: "Custom SoulMirror Session", tagline: "A session shaped around the intention you bring.", price: null, priceLabel: "Custom pricing", duration: "By arrangement", focusAreas: ["Intention", "Alignment", "Guidance"], description: "A personalised SoulMirror session for an intention that needs a considered, individual approach.", suitableFor: "Anyone seeking a tailored session rather than a predefined reading.", disclaimer: "Guidance supports reflection and does not guarantee a specific outcome or replace professional advice.", icon: "custom", included: readingIncluded, faqs: catalogueFaqs, questions: []
  },
];

export const services = [...baseServices, ...catalogueServices];

export const testimonials = [
  { name: "Riya M.", tag: "Tarot Reading", quote: "Janvi held space for me without ever making me feel judged. What she reflected back was exactly what I needed to hear." },
  { name: "Aditya K.", tag: "Tarot Reading", quote: "I walked in confused about a career decision and walked out with real clarity, not just comfort." },
  { name: "Simran K.", tag: "Energy Healing", quote: "The energy healing session was unlike anything I'd tried before — I genuinely felt lighter by the end of it." },
  { name: "Neha P.", tag: "Soul Guidance", quote: "She doesn't tell you what you want to hear. She helps you see what's actually true, gently." },
  { name: "David R., UK", tag: "Tarot Reading", quote: "Booking as an international client was seamless — the time-zone conversion just worked, and the session felt deeply personal." },
  { name: "Priya S.", tag: "Manifestation Coaching", quote: "The manifestation coaching gave me an actual framework, not vague affirmations. I've already seen shifts in three weeks." },
];
