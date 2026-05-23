// LECS — Laboratory for Emerging Computing Systems
// Static content that isn't yet in a content collection: research areas, news,
// articles (held for now), and shared formatting helpers.
//
// People and publications are content collections — see src/content.config.ts
// and src/content/{people,publications}/.

export type Role =
  | "supervisor"
  | "postdoc"
  | "phd"
  | "msc"
  | "undergraduate"
  | "visiting"
  | "alumni";

export interface ResearchArea {
  key: string;
  title: string;
  blurb: string;
}

export interface NewsItem {
  date: string;
  tag: string;
  title: string;
  summary: string;
}

export interface Article {
  slug: string;
  date: string;
  tag: string;
  author: string;
  relatedPub?: string;
  topics: string[];
  title: string;
  excerpt: string;
  body: string[];
}

export const lab = {
  name: "Laboratory for Emerging Computing Systems",
  acronym: "LECS",
  tagline:
    "Design methods for emerging hardware: silicon photonics, reconfigurable architectures, and the systems they enable.",
  address:
    "Department of Electrical and Computer Engineering · Gina Cody School of Engineering and Computer Science · Concordia University · Montréal, Québec",
  phone: "+1 514-848-2424 ×3004",
  email: "slebeux (at) encs.concordia.ca",
  building: "EV Building, 1515 Saint-Catherine St. W."
};

export const researchAreas: ResearchArea[] = [
  { key: "photonics", title: "Silicon photonic interconnects", blurb: "Microring-resonator-based on-chip optical networks that move data with the bandwidth and energy efficiency electrical wires cannot." },
  { key: "reconfig", title: "Reconfigurable architectures", blurb: "Coarse-grained reconfigurable arrays and FPGA-based accelerators that adapt to workload demands at runtime." },
  { key: "noc", title: "Network-on-Chip", blurb: "Scalable interconnect fabrics — electrical, optical and hybrid — for many-core systems-on-chip." },
  { key: "quantum", title: "Quantum computing", blurb: "Compilation, mapping and control-stack design for near-term quantum hardware." },
  { key: "edge-ai", title: "Edge AI accelerators", blurb: "Custom datapaths for convolutional and recurrent inference at the edge, under tight area and power budgets." },
  { key: "neuro", title: "Neuromorphic architectures", blurb: "Spiking and analog substrates for event-driven sensing and learning." },
  { key: "soc", title: "Manycore SoCs", blurb: "Architecture and design-space exploration of heterogeneous many-core processors." },
  { key: "approx", title: "Approximate computing", blurb: "Quality-configurable arithmetic and memory for energy-proportional computation." },
  { key: "fpga", title: "FPGA prototyping", blurb: "Hardware-in-the-loop validation of novel architectures on contemporary FPGAs." }
];

export const news: NewsItem[] = [
  {
    date: "2026-05-04",
    tag: "Paper",
    title: "LECS paper accepted at DATE 2026",
    summary: "“Variability-aware mapping for silicon photonic NoCs” has been accepted at the Design, Automation and Test in Europe Conference. The work introduces a statistical mapping flow that accounts for fabrication drift across waveguide arrays."
  },
  {
    date: "2026-04-18",
    tag: "Award",
    title: "Frédéric Gagné receives FRQNT master’s scholarship",
    summary: "Frédéric Gagné has been awarded a Fonds de recherche du Québec — Nature et technologies graduate scholarship to support his work on energy-proportional neuromorphic inference."
  },
  {
    date: "2026-03-22",
    tag: "Talk",
    title: "Invited keynote at NanoArch 2026",
    summary: "Prof. Le Beux delivered a keynote on emerging-technology architectures at the 21st IEEE/ACM International Symposium on Nanoscale Architectures."
  },
  {
    date: "2026-02-10",
    tag: "Funding",
    title: "NSERC Discovery Grant renewed for 2026–2031",
    summary: "The group’s NSERC Discovery Grant on silicon photonic interconnects has been renewed for a further five-year term."
  },
  {
    date: "2025-12-08",
    tag: "Defence",
    title: "Mohsen Asghari defends his PhD",
    summary: "Mohsen Asghari has successfully defended his doctoral dissertation on reconfigurable SoCs for satellite payload processing. He has since joined PolarSat Inc. as a senior architect."
  },
  {
    date: "2025-10-14",
    tag: "Collaboration",
    title: "New collaboration with Polytechnique Montréal",
    summary: "LECS welcomes Océane Destras as visiting PhD researcher, opening a joint line of work on variability-aware silicon-photonic design with Polytechnique Montréal."
  }
];

/**
 * Long-form research notes by lab members. HELD for now — these are not yet
 * regenerated against the real arXiv corpus. `relatedPub` slugs from the
 * earlier synthetic dataset may not resolve; pages handle missing links
 * gracefully.
 */
export const articles: Article[] = [
  {
    slug: "yield-from-the-foundry",
    date: "2026-04-29",
    tag: "Research note",
    author: "Masoud Rahimi",
    relatedPub: "variability-aware-mapping-2026",
    topics: ["photonics", "noc"],
    title: "Designing photonic networks for the variability you’ll actually get from the foundry",
    excerpt: "Silicon photonics promises terabit-per-second on-chip links. Process variation is what stands between that promise and the wafer. Here’s what we measured, and what we did about it.",
    body: [
      "Silicon-photonic foundries can deliver microring filters with quality factors in the tens of thousands and footprints under ten square micrometres. What they cannot deliver — at least not yet — is uniformity. A typical multi-project wafer run shows a resonance-wavelength standard deviation of around two hundred picometres across a single die, and the variation between dies is larger still. For a wavelength-division-multiplexed link with one nanometre of channel spacing, that variation is enough to scramble the channel assignments entirely.",
      "The conventional response is post-fabrication tuning: each ring is heated until it lands on its assigned wavelength, and a feedback loop keeps it there. Tuning works, but it is power-hungry. On a 256-node photonic NoC we measure peak tuning powers exceeding the static power of the entire electrical fabric beneath it. Worse, the tuning budget grows with the square of the channel density, exactly where we want photonics to win.",
      "Our DATE 2026 paper takes a different tack. Instead of treating variability as a problem to be repaired downstream, we treat it as a design input. The compiler is given a measured variability profile — derived from monitor structures placed on the same die — and it assigns wavelengths, rings and routes to minimise expected tuning power. The mapping problem becomes a statistical one: we are no longer placing a network on a deterministic substrate, but on a distribution of possible substrates.",
      "The results are pleasing. At iso-throughput the variability-aware flow reduces tuning power by 37 %, and yield at a one-decibel power penalty improves from 41 % to 88 %. The flow is not free — solving the mapping problem takes minutes rather than seconds — but the ratio is favourable.",
      "Two open questions follow from the work. First, the variability profile of a yet-to-be-fabricated die is uncertain; how confidently can we predict it from upstream monitors? Second, what does this look like at the next process node, where the absolute variation may shrink but the relative variation across thousands of rings may not? Both are on our agenda for the year ahead."
    ]
  },
  {
    slug: "calibration-without-a-test-engineer",
    date: "2026-02-18",
    tag: "Engineering",
    author: "Jean-Baptiste Waring",
    relatedPub: "thermal-calibration-2025",
    topics: ["photonics"],
    title: "Calibrating a photonic link with no test engineer in the loop",
    excerpt: "Microring resonators want a clean thermal environment. The real world does not provide one. A closed-loop calibration scheme that fits inside the link, not on the bench.",
    body: [
      "Microring resonators are excellent wavelength filters and notoriously bad citizens of their thermal environment. A one-degree-Celsius drift shifts the resonance by roughly a tenth of a nanometre — enough, on a closely-spaced WDM link, to drop the channel. The classical answer is open-loop calibration: characterise each ring on the bench, store the heater bias, and trust the table. The classical answer fails the moment the ring leaves the bench.",
      "Our 2025 DATE paper sketches a closed-loop alternative. The idea is to repurpose the receiver photodetector as a wavelength-error sensor. By probing the ring with a small dither tone and reading the resulting amplitude modulation at the receiver, we extract a sign and magnitude for the resonance offset, then drive a heater controller that closes the loop in software.",
      "Two engineering details make this work. The first is the dither itself: it must be small enough not to corrupt the data, and orthogonal enough not to confuse a chain of cascaded rings. The second is the controller — a model-predictive design that anticipates thermal disturbances rather than chasing them. Together they bring the link from a thermal step to within one-tenth of a decibel of optimal in under a microsecond.",
      "What we did not solve, and what the current generation of students is working on: aging. The thermal model is stable on the timescales of a single experiment but drifts over weeks. We want a calibration loop that is also a learning loop."
    ]
  },
  {
    slug: "approximate-edge-inference",
    date: "2025-11-12",
    tag: "Research note",
    author: "Paria Zolfaghari",
    relatedPub: "quality-arith-2025",
    topics: ["approx", "edge-ai"],
    title: "How much precision does an edge classifier actually need?",
    excerpt: "Quality-configurable arithmetic units let an embedded neural network spend bits where they matter and save them where they do not. A short tour of what changes when accuracy is a knob.",
    body: [
      "Most embedded neural classifiers are over-provisioned. The arithmetic is fixed-precision because the silicon was fixed-precision, not because the workload demanded it. Make the arithmetic precision a runtime parameter and several things become possible at once: voltage scaling becomes safe, batteries last longer, and the same accelerator can serve a wider product line.",
      "Our 2025 TVLSI paper introduces a multiply-accumulate unit whose precision can be reconfigured per layer, per inference, and even per channel. The trick is in the bias correction: lowering the precision of a MAC introduces a systematic error that, left uncompensated, accumulates across layers and destroys the classifier. We characterise this error analytically and pre-compute a correction term per layer that adds zero runtime cost.",
      "The headline result, measured on a small CNN deployed for visual wake-words: 38 % energy reduction at the iso-accuracy operating point, with the option to trade further accuracy for a further 2.4× energy reduction when the device is on battery. The quality knob is a knob the application gets to turn, not a fixed design decision."
    ]
  },
  {
    slug: "spiking-edge-2025",
    date: "2025-09-03",
    tag: "Field report",
    author: "Frédéric Gagné",
    relatedPub: "spiking-dataflow-2024",
    topics: ["edge-ai", "neuro"],
    title: "Why event-driven inference is the right answer for keyword spotting",
    excerpt: "Keyword-spotting accelerators are typically on, always polling. Spiking accelerators only do work when something interesting happens. A look at what that buys.",
    body: [
      "Always-on keyword-spotting accelerators occupy a strange corner of the power budget. They are almost always idle, but they are not allowed to sleep deeply enough to actually save power. The penalty for missing a wake-word is too high.",
      "Spiking neural accelerators offer a way out of this corner. Because computation is gated by input events, the silicon spends most of its time genuinely off. A scheduler informs the device when to expect input, and the analog front end serves as both a sensor and a wake-up signal. We measure an order-of-magnitude reduction in average power for the same false-accept rate, with the caveat that the calibration of the analog front end is now part of the workload.",
      "We are now exploring whether this same approach extends to vision, where the events are pixel-level rather than acoustic. Early results from an event camera coupled to the same accelerator are promising; results from a CMOS sensor are mixed."
    ]
  },
  {
    slug: "from-lyon-to-montreal",
    date: "2025-07-22",
    tag: "Lab life",
    author: "Sébastien Le Beux",
    topics: ["photonics", "neuro"],
    title: "From Lyon to Montréal: notes on running an architecture lab on two continents",
    excerpt: "Five years after moving the group from École Centrale de Lyon to Concordia, a brief inventory of what travelled, what did not, and what we built locally.",
    body: [
      "When the group moved from Lyon to Montréal in 2019, the first surprise was how little of the infrastructure travelled. Equipment, test benches, even simulation licences are inherently local. What did travel were the open questions and the standards by which we measure progress.",
      "Five years on, the local environment has shaped the agenda in ways I did not anticipate. The proximity of Polytechnique Montréal’s silicon-photonics group has made device-level collaboration far easier than it was in Lyon, and visiting students from that group now spend long periods in our offices. The Gina Cody School’s FPGA infrastructure is excellent, which has tilted us further toward hardware-in-the-loop validation.",
      "If a peer were considering a similar move, the advice I would give is simple: budget two years for the lab to settle, and use them to write. Papers travel better than people."
    ]
  }
];

export const roleLabel: Record<Role, string> = {
  supervisor: "Principal Investigator",
  postdoc: "Postdoctoral Fellow",
  phd: "PhD",
  msc: "MSc",
  undergraduate: "Undergraduate",
  visiting: "Visiting",
  alumni: "Alumni"
};

/** Order used in the People filter bar. */
export const rolesOrder: Role[] = [
  "supervisor",
  "postdoc",
  "phd",
  "msc",
  "undergraduate",
  "visiting",
  "alumni"
];

/** Short labels used by the filter pills. */
export const roleShortLabel: Record<Role | "all", string> = {
  all: "All",
  supervisor: "PI",
  postdoc: "Postdoc",
  phd: "PhD",
  msc: "MSc",
  undergraduate: "Undergrad",
  visiting: "Visiting",
  alumni: "Alumni"
};

export const areaTitle: Record<string, string> = Object.fromEntries(
  researchAreas.map((a) => [a.key, a.title])
);

export function fmtDate(d: string): string {
  const [y, m, day] = d.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[m - 1]} ${day}, ${y}`;
}

export function fmtDateLong(d: string): string {
  const [y, m, day] = d.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[m - 1]} ${day}, ${y}`;
}

export function readingTime(body: string[]): number {
  const words = body.join(" ").split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
}
