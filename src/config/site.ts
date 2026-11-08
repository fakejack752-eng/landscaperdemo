import type { IconName } from "@/lib/icons";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * EVERGREEN LANDSCAPE & OUTDOOR LIVING — DEMO WEBSITE CONTENT & CONFIG
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the single editable content file for the demo website.
 * Change values here to customize the entire site (see README.md).
 *
 * Everything shown on the website is sample/demo content for a fictional
 * business. No real licenses, reviews, ratings, addresses, or phone numbers
 * are used. Replace placeholders with verified client data before launch.
 */

export const siteConfig = {
  /* ── DEMO DISCLOSURE ─────────────────────────────────────────────────── */
  demo: {
    badge: "Demo Website Concept",
    formNotice:
      "This form is part of a demonstration website. Your information is not sent, stored, or shared.",
    submissionMessage:
      "Demo request received. This is a sample website, so your information was not sent.",
    disclosure:
      "Demo Website Concept. Created to demonstrate website design and customer inquiry features.",
    credit: "Website concept by AI Automation NY",
    creditUrl: "https://aiautomationny.com",
  },

  /* ── SEO / SITE URL ───────────────────────────────────────────────── */
  // Used for metadataBase (absolute Open Graph / Twitter image URLs) and
  // sitemap.xml generation. Replace with the real production domain when
  // this concept goes live (see README "Go-live checklist").
  siteUrl: "https://evergreen-demo.example",

  /* ── BUSINESS (all placeholders) ─────────────────────────────────────── */
  business: {
    name: "Evergreen Landscape & Outdoor Living",
    shortName: "Evergreen",
    tagline: "Beautiful Outdoor Spaces. Built to Be Enjoyed.",
    phoneDisplay: "(555) 013-9200", // Placeholder number — replace with the real number
    phoneHref: "tel:+15550139200",
    email: "hello@evergreen-demo.example", // Placeholder address
    website: "www.evergreen-demo.example",
    address: "123 Sample Avenue, Suite 200 — placeholder address", // Placeholder
    serviceAreaLine: "Serving Queens, Brooklyn & Nassau County",
    hours: [
      { days: "Monday – Friday", time: "8:00 AM – 5:00 PM" },
      { days: "Saturday", time: "By appointment" },
      { days: "Sunday", time: "Closed" },
    ],
  },

  /* ── CONTACT & INTEGRATIONS (left empty until a real destination exists) ── */
  integrations: {
    /** Set to a real endpoint (CRM webhook, form handler, email service) to enable submissions.
     *  While empty, the estimate form is a pure front-end demo and sends nothing. */
    estimateFormEndpoint: "",
    /** Set to a scheduling tool URL (Calendly, GoHighLevel calendar, etc.) to enable booking. */
    bookingUrl: "",
    /** Social links — add real URLs or leave empty to hide the row. */
    socialLinks: [] as { label: string; url: string }[],
  },

  /* ── KEY SITE IMAGES ─────────────────────────────────────────────────── */
  images: {
    hero: {
      src: "/images/62cd9a05b1a8.jpg",
      alt: "Modern backyard at dusk with a stone paver patio, landscape lighting, planted garden beds, and warm glowing windows",
    },
    introMain: {
      src: "/images/ecf7364469e1.png",
      alt: "Residential front yard with a manicured lawn, stone walkway, and layered flower beds with mulch",
    },
    introDetail: {
      src: "/images/2cd2180b3346.jpg",
      alt: "Formal garden with a stone fountain, clipped hedges, and a gravel path in morning light",
    },
    cta: {
      src: "/images/97c4a90223c4.jpg",
      alt: "Backyard paver patio with a stone fire pit, Adirondack chairs, and a warmly lit house at dusk",
    },
    about: {
      src: "/images/6016984d529a.jpg",
      alt: "Landscaper trimming perennials beside a stone retaining wall on a residential street",
    },
  },

  /* ── NAVIGATION ──────────────────────────────────────────────────────── */
  nav: [
    { label: "Home", path: "/" },
    { label: "Project Inspiration", path: "/gallery" },
    { label: "About", path: "/about" },
    { label: "Service Areas", path: "/areas" },
    { label: "Contact", path: "/contact" },
  ],

  /* ── SERVICES (10) ───────────────────────────────────────────────────── */
  services: [
    {
      slug: "landscape-design-installation",
      icon: "PencilRuler" as IconName,
      title: "Landscape Design & Installation",
      short:
        "Complete outdoor transformations — from the first sketch to the final planting.",
      cardImage:
        "/images/2923e95a381a.png",
      cardAlt:
        "Backyard with a covered dining pavilion, stone steps, water feature, and layered landscape lighting at dusk (design inspiration)",
      intro:
        "A thoughtful plan turns a yard into a place you actually want to spend time in. This service covers the full journey — listening to how you live, designing around your space, and installing plantings, beds, and features with care.",
      types: [
        "Full-property landscape plans",
        "Front yard and curb-appeal renovations",
        "Backyard transformations and outdoor rooms",
        "Sod installation and lawn renovation",
        "Retaining walls and garden structures",
      ],
      benefits: [
        {
          title: "A plan before a shovel",
          text: "Every project starts with a design conversation, so the result matches how you live outdoors.",
        },
        {
          title: "Plantings suited to New York",
          text: "Species and styles selected for Long Island and NYC climates and seasons.",
        },
        {
          title: "One team, start to finish",
          text: "Design, site preparation, and installation handled as a single, coordinated project.",
        },
      ],
      faqs: [
        {
          q: "How does the design process work?",
          a: "In this example flow, it starts with a consultation and property walk, followed by a concept plan and a clear project scope before any installation begins.",
        },
        {
          q: "Can work be done in phases?",
          a: "Yes — sample projects can be split into phases so improvements roll out over time and budget.",
        },
      ],
      galleryCategory: "Gardens",
    },
    {
      slug: "lawn-care-maintenance",
      icon: "Grass" as IconName,
      title: "Lawn Care & Maintenance",
      short:
        "Scheduled mowing, edging, and seasonal care that keeps lawns healthy and neat.",
      cardImage:
        "/images/15ab73c3f13b.jpg",
      cardAlt:
        "Landscaping crew member pushing a commercial mower across a green lawn beside a commercial building",
      intro:
        "A consistent, well-planned maintenance schedule is what keeps a lawn looking intentional instead of just tended. Visits can include mowing, edging, trimming, and seasonal health checks.",
      types: [
        "Weekly and biweekly mowing programs",
        "Edging, trimming, and blowing",
        "Fertilization and weed-control schedules (example offering)",
        "Aeration and overseeding",
        "Spring and fall lawn preparation",
      ],
      benefits: [
        {
          title: "A predictable schedule",
          text: "Recurring visits on a set day, with notifications so you always know what to expect.",
        },
        {
          title: "Healthy, not just tidy",
          text: "Care plans consider soil, season, and grass type — not just cutting height.",
        },
        {
          title: "Tidy every visit",
          text: "Walkways and driveways blown clean after every service, every time.",
        },
      ],
      faqs: [
        {
          q: "How often should a lawn be mowed?",
          a: "In this sample program, most lawns are visited weekly during the growing season, with biweekly options for slower-growing properties.",
        },
        {
          q: "Do I need to be home for service?",
          a: "As an example, no — recurring visits can be completed while you're away, with a summary sent after each visit.",
        },
      ],
      galleryCategory: "Backyards",
    },
    {
      slug: "seasonal-cleanups",
      icon: "Leaf" as IconName,
      title: "Seasonal Cleanups",
      short:
        "Spring resets, fall leaf removal, and everything needed to hand your yard to the next season.",
      cardImage:
        "/images/80f36dd6e913.jpg",
      cardAlt:
        "Person raking golden autumn leaves into a pile on a sunlit lawn",
      intro:
        "Transitions are when properties need the most attention. Spring cleanups wake beds up; fall cleanups put them to bed properly. Both protect the investment you've already made.",
      types: [
        "Spring cleanups and bed preparation",
        "Fall leaf cleanup and removal",
        "Mulch refresh and bed edging",
        "Perennial cutbacks and pruning",
        "Gutter-adjacent and hardscape debris clearing",
      ],
      benefits: [
        {
          title: "Season-ready beds",
          text: "Beds start each season clean, edged, and ready to grow.",
        },
        {
          title: "One-time or bundled",
          text: "Book a single cleanup or bundle spring and fall together for the year.",
        },
        {
          title: "Debris gone, not piled",
          text: "Leaves and clippings are removed and hauled — nothing left behind.",
        },
      ],
      faqs: [
        {
          q: "When should a spring cleanup happen?",
          a: "As an example, once the ground has thawed and before perennials actively grow — usually late March through April in the New York area.",
        },
        {
          q: "Do you remove the leaves or just mulch them?",
          a: "Both options exist in this sample offering — full removal and haul-away, or on-site mulching where appropriate.",
        },
      ],
      galleryCategory: "Gardens",
    },
    {
      slug: "patios-pavers-walkways",
      icon: "BrickWall" as IconName,
      title: "Patios, Pavers & Walkways",
      short:
        "Stone patios, walkways, and hardscaping built for everyday enjoyment.",
      cardImage:
        "/images/99127fcef9a9.jpg",
      cardAlt:
        "Modern backyard patio with a black pergola, outdoor dining table, and patterned pavers beside a green lawn (design inspiration)",
      intro:
        "Hardscape is the backbone of an outdoor living space. Patios, paths, and steps define how a property is used — and how it feels the moment you step outside.",
      types: [
        "Patio design and installation",
        "Front walkways and garden paths",
        "Bluestone, paver, and natural stone options",
        "Steps, landings, and level changes",
        "Fire pit areas and seating walls (example features)",
      ],
      benefits: [
        {
          title: "Built for the climate",
          text: "Base preparation and drainage designed for freeze-thaw cycles in New York.",
        },
        {
          title: "Material guidance",
          text: "Clear comparisons between paver, bluestone, and natural stone options.",
        },
        {
          title: "Details that last",
          text: "Edging, jointing, and grading handled as carefully as the surface itself.",
        },
      ],
      faqs: [
        {
          q: "How long does a patio project take?",
          a: "In this sample timeline, a typical residential patio is completed within one to two weeks of starting, depending on size and materials.",
        },
        {
          q: "Which material should I choose?",
          a: "The consultation walks through paver, bluestone, and natural stone options with sample imagery and honest trade-offs.",
        },
      ],
      galleryCategory: "Patios",
    },
    {
      slug: "garden-design-planting",
      icon: "Flower2" as IconName,
      title: "Garden Design & Planting",
      short:
        "Perennial beds, seasonal color, and plantings suited to New York seasons.",
      cardImage:
        "/images/026aec6036a5.jpg",
      cardAlt:
        "Cottage-style garden with a brick path, flowering perennials, and planters beside a shed (design inspiration)",
      intro:
        "Gardens should look good in every season, not just for one week in May. Planting plans layer perennials, shrubs, and seasonal color so something is always happening.",
      types: [
        "Perennial garden design and planting",
        "Pollinator and native plant gardens (example styles)",
        "Seasonal containers and planters",
        "Foundation plantings and bed redesigns",
        "Window box and entry displays",
      ],
      benefits: [
        {
          title: "Four-season thinking",
          text: "Plant palettes chosen for spring bloom, summer fullness, fall color, and winter structure.",
        },
        {
          title: "Right plant, right place",
          text: "Sun, soil, and moisture matched to each plant so gardens thrive with less intervention.",
        },
        {
          title: "Color you can live with",
          text: "Designs balance seasonal color with a calm, cohesive overall look.",
        },
      ],
      faqs: [
        {
          q: "When is the best time to plant?",
          a: "In this example, spring and early fall are ideal windows in the New York area, though container plantings go in whenever conditions allow.",
        },
        {
          q: "Can you refresh an existing garden instead of starting over?",
          a: "Yes — sample services include editing and enhancing established beds rather than replacing everything.",
        },
      ],
      galleryCategory: "Gardens",
    },
    {
      slug: "tree-shrub-care",
      icon: "TreePine" as IconName,
      title: "Tree & Shrub Care",
      short:
        "Pruning, shaping, and seasonal health care for the plants that frame your property.",
      cardImage:
        "/images/61a35bf0202a.jpg",
      cardAlt:
        "Close-up of professional loppers pruning a tree branch against a blue sky",
      intro:
        "Trees and shrubs are the structure of a landscape. Regular pruning keeps them healthy, shapely, and safe — and protects the rest of the garden around them.",
      types: [
        "Ornamental tree and shrub pruning",
        "Hedge shaping and height control",
        "Deadwood and storm-damage cleanup",
        "Shrub rejuvenation pruning",
        "Seasonal health inspections (example offering)",
      ],
      benefits: [
        {
          title: "Pruned with intent",
          text: "Cuts made for plant health and shape — never one-size-fits-all shearing.",
        },
        {
          title: "Timing matters",
          text: "Work scheduled around bloom cycles so spring flowering shrubs are never sacrificed.",
        },
        {
          title: "Safety-first cleanups",
          text: "Storm damage and hazard branches addressed promptly and cleaned up completely.",
        },
      ],
      faqs: [
        {
          q: "When should shrubs be pruned?",
          a: "As an example, timing depends on the species — spring bloomers right after flowering, and most other shrubs in late winter or early spring.",
        },
        {
          q: "Do you handle large tree removal?",
          a: "In this sample scope, work focuses on pruning and care; large removals would be coordinated with specialist partners.",
        },
      ],
      galleryCategory: "Gardens",
    },
    {
      slug: "irrigation-sprinkler-systems",
      icon: "Droplets" as IconName,
      title: "Irrigation & Sprinkler Systems",
      short:
        "Efficient watering systems, repairs, and seasonal start-ups and shut-downs.",
      cardImage:
        "/images/759f8a54366c.jpg",
      cardAlt:
        "Lawn sprinkler head spraying water over a bright green lawn",
      intro:
        "Consistent, efficient watering is what keeps new plantings and lawns established. Systems are tuned to the property so water goes where it's needed — and nowhere it isn't.",
      types: [
        "New sprinkler system installation (example offering)",
        "System repairs and head adjustments",
        "Spring start-up and fall winterization",
        "Smart controller and timer setup",
        "Drip irrigation for beds and planters",
      ],
      benefits: [
        {
          title: "Water where it counts",
          text: "Zones and head placement matched to sun, shade, and plant type.",
        },
        {
          title: "Seasonal servicing",
          text: "Start-up in spring, blow-out before winter — protecting pipes and heads.",
        },
        {
          title: "Less waste",
          text: "Smart scheduling reduces overwatering and keeps bills predictable.",
        },
      ],
      faqs: [
        {
          q: "When should systems be winterized?",
          a: "In this sample schedule, before the first hard freeze — typically late October or November in the New York area.",
        },
        {
          q: "Can an older system be updated?",
          a: "Yes — example services include retrofitting existing systems with modern, water-saving controllers.",
        },
      ],
      galleryCategory: "Backyards",
    },
    {
      slug: "landscape-lighting",
      icon: "Lightbulb" as IconName,
      title: "Landscape Lighting",
      short:
        "Path lights, uplighting, and ambient glow that extends your evenings.",
      cardImage:
        "/images/c5fe3029701e.jpg",
      cardAlt:
        "Front yard of a home at dusk with illuminated garden beds and low-voltage step lighting along the walkway",
      intro:
        "Lighting changes how a property feels after sunset — safer walkways, warmer gatherings, and a home that still has presence in the dark.",
      types: [
        "Path and walkway lighting",
        "Uplighting for trees and architecture",
        "Patio and deck ambient lighting",
        "Step and entry safety lighting",
        "Timer and smart-control setup",
      ],
      benefits: [
        {
          title: "Warm, not glaring",
          text: "Fixture selection and placement favor a soft, layered look over harsh brightness.",
        },
        {
          title: "Built to stay put",
          text: "Low-voltage systems installed to handle weather, mowers, and seasons.",
        },
        {
          title: "Evenings, extended",
          text: "Outdoor spaces that remain usable — and beautiful — after dark.",
        },
      ],
      faqs: [
        {
          q: "Is landscape lighting energy-efficient?",
          a: "In this example, modern LED low-voltage systems use a fraction of the energy of older halogen setups.",
        },
        {
          q: "Can lighting be added to an existing landscape?",
          a: "Yes — sample installations are designed to integrate into established beds and hardscape without major disruption.",
        },
      ],
      galleryCategory: "Lighting",
    },
    {
      slug: "commercial-property-maintenance",
      icon: "Building2" as IconName,
      title: "Commercial Property Maintenance",
      short:
        "Reliable grounds care for offices, retail, restaurants, and communities.",
      cardImage:
        "/images/873d3f62acad.jpg",
      cardAlt:
        "Modern office building entrance with landscaped planters, young trees, and stone walkways at dusk (design inspiration)",
      intro:
        "Commercial grounds are the first impression a business makes. This example service covers scheduled maintenance that keeps entrances, walkways, and common areas presentable year-round.",
      types: [
        "Office park and corporate campus grounds care",
        "Retail plaza and restaurant exterior maintenance",
        "HOA and residential community common areas",
        "Seasonal color and container programs",
        "Snow and ice management add-ons",
      ],
      benefits: [
        {
          title: "Scheduled around your business",
          text: "Service windows planned to avoid disrupting tenants, customers, or events.",
        },
        {
          title: "Consistent presentation",
          text: "Checklists keep entrances, beds, and walkways at the same standard every visit.",
        },
        {
          title: "One point of contact",
          text: "Property managers get clear reporting and a single contact for all grounds work.",
        },
      ],
      faqs: [
        {
          q: "Do you offer seasonal contracts?",
          a: "In this example, annual and seasonal contracts are available for commercial properties with defined scopes and schedules.",
        },
        {
          q: "Can you work across multiple properties?",
          a: "Yes — multi-site programs within the service area can be coordinated as a single agreement in this sample structure.",
        },
      ],
      galleryCategory: "Commercial",
    },
    {
      slug: "snow-ice-management",
      icon: "Snowflake" as IconName,
      title: "Snow & Ice Management",
      short:
        "Seasonal snow clearing and ice control for homes and commercial properties.",
      cardImage:
        "/images/f15060a3bef7.jpg",
      cardAlt:
        "Two workers in high-visibility jackets shoveling snow from a residential driveway in winter",
      intro:
        "Winter is its own season of property care. Driveways, walkways, and entrances can stay clear and safe through storms and refreezes.",
      types: [
        "Residential driveway and walkway clearing",
        "Commercial lot and entrance snow removal",
        "Ice-melting applications",
        "Storm-response scheduling (example offering)",
        "Seasonal contracts for recurring winter service",
      ],
      benefits: [
        {
          title: "Response when it matters",
          text: "Sample programs prioritize early-morning clearing before commutes and business hours.",
        },
        {
          title: "Ice, not just snow",
          text: "Refreeze-prone areas get appropriate ice control as part of the visit.",
        },
        {
          title: "Winter planning",
          text: "Seasonal agreements set trigger depths and priorities before the first storm.",
        },
      ],
      faqs: [
        {
          q: "How does a seasonal snow contract work?",
          a: "In this example, properties are signed up before winter with agreed trigger depths, priority order, and scope — then cleared automatically each event.",
        },
        {
          q: "Do you clear commercial properties overnight?",
          a: "Sample commercial programs can include overnight and pre-dawn clearing windows so businesses open safely.",
        },
      ],
      galleryCategory: "Commercial",
    },
  ],

  /* ── GALLERY (13) ────────────────────────────────────────────────────── */
  gallery: [
    {
      src: "/images/0edd372d6b65.jpg",
      alt: "Sweeping estate lawn bordered by mature trees and manicured garden beds",
      category: "Backyards",
    },
    {
      src: "/images/2d9d8b62f613.jpg",
      alt: "Intimate backyard dining table styled with candles and string lights under a brick arch (design inspiration)",
      category: "Backyards",
    },
    {
      src: "/images/d9684f849771.jpg",
      alt: "Residential garden bed with boulder accents, dark mulch, and young plantings beside a home (example project concept)",
      category: "Backyards",
    },
    {
      src: "/images/a7952776af3b.jpg",
      alt: "Curving bluestone walkway crossing a gravel garden toward a stone house entrance (design inspiration)",
      category: "Patios",
    },
    {
      src: "/images/15bfd486be3e.jpg",
      alt: "Natural flagstone path winding through shrubs and lawn toward the coast (design inspiration)",
      category: "Patios",
    },
    {
      src: "/images/4d40c11dd195.jpg",
      alt: "Vibrant annual flower bed with layered reds, pinks, and ornamental grasses (design inspiration)",
      category: "Gardens",
    },
    {
      src: "/images/4bfabf251d6f.jpg",
      alt: "Northeast colonial home with a colorful perennial border along the front path (design inspiration)",
      category: "Gardens",
    },
    {
      src: "/images/deff4ff90a60.jpg",
      alt: "Mixed flower border in pink, white, and yellow against an old brick garden wall (design inspiration)",
      category: "Gardens",
    },
    {
      src: "/images/d5f855638eee.jpg",
      alt: "City streetscape with young street trees, planters, and benches outside a glass office building (example project concept)",
      category: "Commercial",
    },
    {
      src: "/images/9e80eceb181d.jpg",
      alt: "Community courtyard with a brick fountain, trimmed hedges, and shade trees between buildings (example project concept)",
      category: "Commercial",
    },
    {
      src: "/images/467581506ba1.png",
      alt: "Timber-framed pergola outdoor dining room with warm uplighting on stone walls at night (design inspiration)",
      category: "Lighting",
    },
    {
      src: "/images/6854485710c0.jpeg",
      alt: "Garden path illuminated by low-voltage path lights leading to a lit home at night (design inspiration)",
      category: "Lighting",
    },
    {
      src: "/images/e6811f55194b.jpg",
      alt: "Backyard pavilion with warm string lights over a seated patio at dusk (design inspiration)",
      category: "Lighting",
    },
  ],
  galleryCategories: ["Backyards", "Patios", "Gardens", "Commercial", "Lighting"],

  /* ── VALUE POINTS (sample positioning) ───────────────────────────────── */
  values: [
    {
      icon: "PencilRuler" as IconName,
      title: "Thoughtful design",
      text: "Every plan starts with your property, your style, and how you actually live outside.",
    },
    {
      icon: "MessagesSquare" as IconName,
      title: "Responsive communication",
      text: "Clear updates, straightforward scheduling, and a team that picks up the phone.",
    },
    {
      icon: "Sprout" as IconName,
      title: "Solutions tailored to the property",
      text: "No cookie-cutter templates — recommendations shaped around your space and budget.",
    },
  ],

  /* ── BENEFITS (why customers choose this type of service) ────────────── */
  benefits: [
    {
      icon: "ClipboardList" as IconName,
      title: "Convenient estimate requests",
      text: "Start online in about a minute, or call to talk it through.",
    },
    {
      icon: "PencilRuler" as IconName,
      title: "Personalized project planning",
      text: "Plans shaped around your property, preferences, and priorities.",
    },
    {
      icon: "MessagesSquare" as IconName,
      title: "Clear communication",
      text: "Know what's happening and when — before, during, and after visits.",
    },
    {
      icon: "Home" as IconName,
      title: "Residential and commercial",
      text: "Solutions for homes, businesses, and residential communities.",
    },
    {
      icon: "CalendarClock" as IconName,
      title: "Seasonal service options",
      text: "Recurring visits and seasonal programs across the whole year.",
    },
    {
      icon: "MapPin" as IconName,
      title: "Local service-area focus",
      text: "Focused on neighborhoods across Queens, Brooklyn, and Nassau County.",
    },
  ],

  /* ── PROCESS ─────────────────────────────────────────────────────────── */
  process: [
    {
      step: "01",
      title: "Tell Us About Your Property",
      text: "Share a few details about your space and what you'd like to achieve. Photos help, too.",
    },
    {
      step: "02",
      title: "Schedule a Consultation",
      text: "Set up a convenient time to walk the property and talk through ideas together.",
    },
    {
      step: "03",
      title: "Review Your Project Plan",
      text: "Receive a clear scope and straightforward pricing before any work begins.",
    },
    {
      step: "04",
      title: "Enjoy Your Outdoor Space",
      text: "Sit back while the work is handled — then enjoy the result in every season.",
    },
  ],

  /* ── ESTIMATE FORM OPTIONS ───────────────────────────────────────────── */
  estimate: {
    services: [
      "Lawn care",
      "Landscape design",
      "Patio or pavers",
      "Seasonal cleanup",
      "Commercial maintenance",
      "Other",
    ],
    propertyTypes: ["Residential", "Commercial", "Property management / HOA"],
    timelines: [
      "As soon as possible",
      "Within 1–3 months",
      "Planning for later this year",
    ],
    budgets: [
      "Under $5,000",
      "$5,000 – $15,000",
      "$15,000 – $50,000",
      "$50,000 or more",
      "Not sure yet",
    ],
    contactMethods: ["Phone call", "Text message", "Email"],
  },

  /* ── AI / LEAD FLOW DEMONSTRATION ────────────────────────────────────── */
  leadFlow: {
    title: "See How a Smart Inquiry Works",
    intro:
      "This interactive walkthrough shows how a website inquiry could flow into a business pipeline — from first request to scheduled consultation. All records, notifications, and messages below are examples.",
    steps: [
      {
        key: "request",
        label: "Customer requests an estimate",
        text: "A homeowner fills out the guided estimate form on the website and taps submit.",
      },
      {
        key: "pipeline",
        label: "Inquiry appears in the pipeline",
        text: "The request lands in the business's pipeline as a new lead card with the service, property type, and ZIP code.",
      },
      {
        key: "notify",
        label: "Business receives a notification",
        text: "The team gets an instant heads-up on their phone or desktop — no more missed inquiries.",
      },
      {
        key: "respond",
        label: "Customer receives a response",
        text: "The business replies quickly with a friendly acknowledgment and next steps.",
      },
      {
        key: "schedule",
        label: "Consultation is scheduled",
        text: "A walkthrough time is booked and synced to the calendar for the estimator.",
      },
      {
        key: "followup",
        label: "Team follows up on the estimate",
        text: "After the estimate is sent, the pipeline tracks follow-ups until the project is booked or closed.",
      },
    ],
    sampleLead: {
      name: "A. Rivera (Example lead)",
      service: "Patio & paver installation",
      property: "Residential · Forest Hills",
      zip: "ZIP 11375",
      timeline: "Within 1–3 months",
      preferredTime: "Weekday mornings",
      message:
        "Hi! We'd like a quote for a bluestone patio, roughly 400 sq ft, in our backyard. Happy to share photos.",
      notification: "New estimate request — Patio & pavers · ZIP 11375",
      response:
        "Thanks for reaching out, A.! This is an example auto-response confirming your request was received. A real business would follow up shortly to schedule a walkthrough.",
      appointment: "Tue · 10:00 AM · On-site walkthrough (Example)",
    },
  },

  /* ── SEASONS ─────────────────────────────────────────────────────────── */
  seasons: [
    {
      key: "spring",
      name: "Spring",
      icon: "Flower2" as IconName,
      items: ["Spring cleanup", "Mulching", "Planting", "Lawn preparation"],
      blurb:
        "Wake the property up — beds cleaned, edges defined, and fresh plantings ready to grow.",
    },
    {
      key: "summer",
      name: "Summer",
      icon: "Sun" as IconName,
      items: [
        "Lawn maintenance",
        "Irrigation support",
        "Garden care",
        "Outdoor living projects",
      ],
      blurb:
        "Keep everything looking its best through the season and tackle bigger outdoor projects.",
    },
    {
      key: "fall",
      name: "Fall",
      icon: "Leaf" as IconName,
      items: ["Leaf cleanup", "Planting", "Lawn preparation", "Seasonal maintenance"],
      blurb:
        "Clear the leaves, protect the lawn, and plant for a strong start next spring.",
    },
    {
      key: "winter",
      name: "Winter",
      icon: "Snowflake" as IconName,
      items: ["Snow and ice management", "Winter planning", "Property care"],
      blurb:
        "Driveways and walkways stay clear while plans are made for the year ahead.",
    },
  ],

  /* ── SERVICE AREAS (editable sample coverage) ────────────────────────── */
  areas: [
    {
      borough: "Queens",
      neighborhoods: [
        "Jackson Heights",
        "Astoria",
        "Forest Hills",
        "Bayside",
        "Flushing",
        "Fresh Meadows",
        "Middle Village",
        "Whitestone",
      ],
    },
    {
      borough: "Brooklyn",
      neighborhoods: ["Williamsburg", "Greenpoint", "Park Slope", "Bay Ridge"],
    },
    {
      borough: "Nassau County",
      neighborhoods: [
        "New Hyde Park",
        "Garden City",
        "Mineola",
        "Floral Park",
        "Great Neck",
        "Westbury",
      ],
    },
  ],
  areasNote:
    "Coverage areas shown are editable samples for demonstration. Actual service areas must be confirmed with the business before launch.",
  areasCta:
    "Don't see your neighborhood? Contact us to ask about service availability.",

  /* ── REVIEW PLACEHOLDERS ─────────────────────────────────────────────── */
  reviewPlaceholderText:
    "Client testimonial placeholder — replace with a real, approved customer review.",

  /* ── FAQ ─────────────────────────────────────────────────────────────── */
  faqs: [
    {
      q: "What landscaping services do you offer?",
      a: "In this example, Evergreen offers lawn care and maintenance, landscape design and installation, seasonal cleanups, patios and walkways, garden design and planting, tree and shrub care, irrigation, landscape lighting, commercial property maintenance, and snow and ice management. This list is sample content that can be matched to a real service menu.",
    },
    {
      q: "Do you work with residential and commercial properties?",
      a: "Yes — as shown in this concept, the same team can care for private homes as well as offices, retail plazas, restaurants, and residential communities. Scope and schedules are tailored to each property type.",
    },
    {
      q: "What areas do you serve?",
      a: "Sample coverage includes neighborhoods across Queens and Brooklyn plus Nassau County communities such as Garden City, Mineola, and Great Neck. Actual coverage areas would be confirmed by the real business before launch.",
    },
    {
      q: "How do I request an estimate?",
      a: "In this demo, the guided estimate form walks you through service, property type, and project details in a few short steps. A real website would connect this form to the business's preferred inbox or CRM.",
    },
    {
      q: "Can I schedule recurring lawn maintenance?",
      a: "Yes — example programs include weekly and biweekly visits during the growing season, with a consistent day so the service becomes easy to plan around.",
    },
    {
      q: "Do you provide seasonal cleanup?",
      a: "Spring and fall cleanup programs are part of this sample offering, covering leaves, bed resets, cutbacks, and preparation for the season ahead.",
    },
    {
      q: "Can you help with patio and garden projects?",
      a: "Patios, walkways, and garden plantings are core example services — from a simple front path refresh to a complete backyard redesign concept.",
    },
  ],
  faqNote:
    "Answers above are editable example copy for demonstration and should be replaced with verified business details before launch.",

  /* ── CHAT WIDGET (demo) ──────────────────────────────────────────────── */
  chat: {
    title: "Evergreen Assistant",
    demoLabel: "Demo chat",
    opening: "Hi! Looking for help with your outdoor space?",
    quickReplies: [
      { label: "Request an estimate", key: "estimate" },
      { label: "Explore services", key: "services" },
      { label: "Check service areas", key: "areas" },
    ],
  },
} as const;

export type Service = (typeof siteConfig.services)[number];
export type GalleryItem = (typeof siteConfig.gallery)[number];

export function getService(slug: string): Service | undefined {
  return siteConfig.services.find((s) => s.slug === slug);
}
