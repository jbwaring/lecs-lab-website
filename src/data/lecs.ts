// LECS — Laboratory for Emerging Computing Systems
// Source of truth for lab content. Replace photos, bios, and publications with real content.

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

export interface Person {
  id: string;
  name: string;
  role: Role;
  title: string;
  affiliation: string;
  email: string;
  phone?: string;
  office?: string;
  areas: string[];
  since?: number;
  until?: number;
  thesis?: string;
  bio: string;
  links?: { scholar?: string; dblp?: string; site?: string };
  projects?: string[];
}

export interface NewsItem {
  date: string;
  tag: string;
  title: string;
  summary: string;
}

export interface Publication {
  slug: string;
  year: number;
  venue: string;
  type: "Conference" | "Journal";
  topics: string[];
  authors: string[];
  title: string;
  abstract?: string;
  contributions?: string[];
  bibtex?: string;
  doi?: string;
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
  tagline: "Design methods for emerging hardware: silicon photonics, reconfigurable architectures, and the systems they enable.",
  address: "Department of Electrical and Computer Engineering · Gina Cody School of Engineering and Computer Science · Concordia University · Montréal, Québec",
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

export const people: Person[] = [
  {
    id: "sebastien-le-beux",
    name: "Sébastien Le Beux",
    role: "supervisor",
    title: "Associate Professor — Principal Investigator",
    affiliation: "Dept. of Electrical and Computer Engineering, Concordia University",
    email: "slebeux (at) encs.concordia.ca",
    phone: "+1 514-848-2424 ×3004",
    office: "EV 5.139",
    areas: ["photonics", "reconfig", "noc", "quantum", "edge-ai", "neuro", "soc", "approx"],
    since: 2019,
    links: {
      scholar: "https://scholar.google.com/citations?user=n2zWgXkAAAAJ",
      dblp: "http://dblp.uni-trier.de/pers/hd/b/Beux:S=eacute=bastien_Le",
      site: "https://sites.google.com/site/lebeux/"
    },
    bio: "Sébastien Le Beux is Associate Professor in the Department of Electrical and Computer Engineering at Concordia University. From 2010 to 2019 he was associate professor at École Centrale de Lyon, where he led nanoprocessors research activities at the Lyon Institute of Nanotechnology (CNRS). He obtained his PhD in computer science from the University of Sciences and Technology of Lille in 2007, followed by a postdoctoral fellowship at École Polytechnique de Montréal (2008–2010) and a visiting scholar appointment at HKUST in 2013. His research concerns design methods for emerging (nano)technologies and embedded systems, with particular emphasis on silicon photonic interconnects and reconfigurable architectures. He has authored or co-authored over 100 scientific publications and serves on the steering, organizing and technical program committees of international conferences including DATE, CODES+ISSS, NOCS and NanoArch.",
    projects: ["ARGON: photonic NoC compilation flow", "ReCAP: reconfigurable accelerator platform", "Quantum control-stack co-design"]
  },
  {
    id: "jean-baptiste-waring",
    name: "Jean-Baptiste Waring",
    role: "postdoc",
    title: "Postdoctoral Fellow",
    affiliation: "LECS, Concordia University",
    email: "jean.baptiste.waring (at) me.com",
    office: "EV 5.137",
    areas: ["photonics", "noc"],
    since: 2023,
    thesis: "Adaptive control of silicon photonic interconnects under thermal drift",
    bio: "Jean-Baptiste Waring is a postdoctoral fellow at LECS, working on closed-loop calibration of silicon photonic links. His research combines device-level characterisation with system-level architectural support for runtime adaptation."
  },
  {
    id: "masoud-rahimi",
    name: "Masoud Rahimi",
    role: "phd",
    title: "PhD Candidate",
    affiliation: "LECS, Concordia University",
    email: "masoud.rahimi (at) mail.concordia.ca",
    areas: ["noc", "soc"],
    since: 2022,
    thesis: "Scalable hybrid electrical–optical networks for kilo-core SoCs",
    bio: "Masoud Rahimi investigates routing, arbitration and floor-planning strategies for hybrid electrical–optical NoCs at scales beyond one thousand cores."
  },
  {
    id: "ismael-ridha",
    name: "Ismael Ridha",
    role: "phd",
    title: "PhD Candidate",
    affiliation: "LECS, Concordia University",
    email: "ismael.ridha (at) mail.concordia.ca",
    areas: ["reconfig", "fpga"],
    since: 2022,
    thesis: "Compilation flows for coarse-grained reconfigurable arrays",
    bio: "Ismael Ridha designs compilation and mapping toolchains for coarse-grained reconfigurable accelerators, with hardware-in-the-loop validation on FPGA prototypes."
  },
  {
    id: "milad-eslaminia",
    name: "Milad Eslaminia",
    role: "phd",
    title: "PhD Candidate",
    affiliation: "LECS, Concordia University",
    email: "milad.eslaminia (at) concordia.ca",
    areas: ["quantum"],
    since: 2023,
    thesis: "Resource-aware mapping for near-term quantum processors",
    bio: "Milad Eslaminia studies qubit mapping, scheduling and error-aware compilation for noisy intermediate-scale quantum devices."
  },
  {
    id: "frederic-gagne",
    name: "Frédéric Gagné",
    role: "msc",
    title: "MSc Student",
    affiliation: "LECS, Concordia University",
    email: "frederic.gagne (at) mail.concordia.ca",
    areas: ["edge-ai", "neuro"],
    since: 2024,
    thesis: "Energy-proportional inference on spiking accelerators",
    bio: "Frédéric Gagné works on event-driven inference for resource-constrained edge devices, with a focus on neuromorphic dataflow accelerators."
  },
  {
    id: "paria-zolfaghari",
    name: "Paria Zolfaghari",
    role: "msc",
    title: "MSc Student",
    affiliation: "LECS, Concordia University",
    email: "pariazolfaghari (at) gmail.com",
    areas: ["approx", "edge-ai"],
    since: 2024,
    thesis: "Quality-configurable arithmetic for embedded neural inference",
    bio: "Paria Zolfaghari develops approximate-arithmetic units and quality-control schemes for embedded neural-network inference."
  },
  {
    id: "oceane-destras",
    name: "Océane Destras",
    role: "visiting",
    title: "Visiting PhD Researcher",
    affiliation: "Polytechnique Montréal — visiting LECS",
    email: "oceane.destras (at) etud.polymtl.ca",
    areas: ["photonics"],
    since: 2024,
    thesis: "Variability-aware design of silicon photonic interconnects (co-supervised, Polytechnique Montréal)",
    bio: "Océane Destras is a PhD researcher at Polytechnique Montréal, visiting LECS to study variability-aware design of silicon photonic links."
  },
  {
    id: "mohsen-asghari",
    name: "Mohsen Asghari",
    role: "alumni",
    title: "Alumnus · PhD 2024 — now at PolarSat Inc.",
    affiliation: "Formerly LECS, Concordia University",
    email: "mohsen.asghari (at) polarsat.com",
    areas: ["soc", "reconfig"],
    since: 2020,
    until: 2024,
    thesis: "PhD (2024): Reconfigurable SoCs for satellite payload processing",
    bio: "Mohsen Asghari completed his PhD at LECS in 2024 on reconfigurable system-on-chip platforms for satellite payload processing, and now leads on-board processing development at PolarSat Inc."
  }
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

export const publications: Publication[] = [
  {
    slug: "variability-aware-mapping-2026",
    year: 2026,
    venue: "DATE",
    type: "Conference",
    topics: ["photonics", "noc"],
    authors: ["Rahimi, M.", "Le Beux, S."],
    title: "Variability-aware mapping for silicon photonic networks-on-chip",
    abstract: "Process variation in silicon-photonic foundries causes resonance-wavelength drift on the order of nanometres across a single wafer, large enough to detune microring filters from their assigned channels. We propose a statistical mapping flow that takes per-die variability profiles as input and assigns wavelengths, rings and floorplan positions to minimise expected crosstalk and laser power across the population of fabricated dies. On a 256-node photonic NoC the proposed flow reduces post-fabrication tuning power by 37 % at iso-throughput, and improves yield at 1 dB power penalty from 41 % to 88 %.",
    contributions: [
      "A statistical variability model derived from measurement campaigns on a multi-project wafer run.",
      "An ILP-based mapping formulation with a yield objective, solved on hierarchically partitioned NoC tiles.",
      "A 256-node design-space exploration showing 37 % tuning-power reduction and 2.1× yield improvement at 1 dB penalty."
    ],
    bibtex: "@inproceedings{rahimi2026variability,\n  title  = {Variability-aware mapping for silicon photonic networks-on-chip},\n  author = {Rahimi, Masoud and Le Beux, S{\\'e}bastien},\n  booktitle = {Design, Automation and Test in Europe (DATE)},\n  year   = {2026}\n}",
    doi: "10.1109/DATE.2026.001234"
  },
  { slug: "cgra-compilation-2026", year: 2026, venue: "IEEE TCAD", type: "Journal", topics: ["reconfig", "fpga"], authors: ["Ridha, I.", "Le Beux, S."], title: "A compilation flow for coarse-grained reconfigurable arrays with heterogeneous PEs", abstract: "Heterogeneous coarse-grained reconfigurable arrays (CGRAs) promise the area efficiency of ASICs with the flexibility of FPGAs, but their compilation toolchains have lagged behind. We describe an end-to-end flow that maps dataflow IR onto arrays of mixed-precision, mixed-function processing elements, integrating placement, routing and timing closure in a single ILP relaxation." },
  { slug: "qubit-mapping-2026", year: 2026, venue: "QCE", type: "Conference", topics: ["quantum"], authors: ["Eslaminia, M.", "Le Beux, S."], title: "Error-aware qubit mapping for noisy intermediate-scale quantum processors", abstract: "Two-qubit gates on contemporary superconducting hardware exhibit error rates that vary by more than an order of magnitude across the chip. We exploit this spatial heterogeneity in a qubit-mapping pass that minimises expected logical error under realistic noise profiles." },
  { slug: "thermal-calibration-2025", year: 2025, venue: "DATE", type: "Conference", topics: ["photonics"], authors: ["Waring, J.-B.", "Destras, O.", "Le Beux, S."], title: "Closed-loop thermal calibration of microring-based photonic interconnects", abstract: "Microring resonators are exquisitely sensitive to local temperature: a 1 °C drift shifts the resonance by ≈ 0.1 nm, enough to break a wavelength-division-multiplexed link. We present a closed-loop calibration scheme that combines in-band photodetector feedback with a predictive controller, achieving sub-microsecond convergence after thermal disturbances." },
  { slug: "satellite-reconfig-2025", year: 2025, venue: "IEEE TC", type: "Journal", topics: ["soc", "reconfig"], authors: ["Asghari, M.", "Le Beux, S."], title: "Reconfigurable SoC architectures for satellite payload processing" },
  { slug: "kilo-core-routing-2025", year: 2025, venue: "NOCS", type: "Conference", topics: ["noc", "photonics"], authors: ["Rahimi, M.", "Waring, J.-B.", "Le Beux, S."], title: "Routing for hybrid electrical–optical networks-on-chip at kilo-core scale" },
  { slug: "quality-arith-2025", year: 2025, venue: "IEEE TVLSI", type: "Journal", topics: ["approx", "edge-ai"], authors: ["Zolfaghari, P.", "Le Beux, S."], title: "Quality-configurable arithmetic units for embedded neural inference" },
  { slug: "spiking-dataflow-2024", year: 2024, venue: "CODES+ISSS", type: "Conference", topics: ["edge-ai", "neuro"], authors: ["Gagné, F.", "Le Beux, S."], title: "Dataflow scheduling for spiking neural accelerators on the edge" },
  { slug: "runtime-adapt-2024", year: 2024, venue: "IEEE TCAD", type: "Journal", topics: ["photonics", "noc"], authors: ["Waring, J.-B.", "Le Beux, S."], title: "Architectural support for runtime adaptation of silicon photonic links" },
  { slug: "approx-neuro-2024", year: 2024, venue: "NanoArch", type: "Conference", topics: ["neuro", "approx"], authors: ["Gagné, F.", "Zolfaghari, P.", "Le Beux, S."], title: "Approximate event-driven inference on neuromorphic substrates" },
  { slug: "cgra-hil-2024", year: 2024, venue: "FPL", type: "Conference", topics: ["reconfig", "fpga"], authors: ["Ridha, I.", "Asghari, M.", "Le Beux, S."], title: "Hardware-in-the-loop validation of CGRA mapping decisions" },
  { slug: "ring-variability-2023", year: 2023, venue: "IEEE JSSC", type: "Journal", topics: ["photonics"], authors: ["Destras, O.", "Le Beux, S."], title: "Variability characterisation of integrated microring resonators" },
  { slug: "kilo-floorplan-2023", year: 2023, venue: "DAC", type: "Conference", topics: ["soc", "noc"], authors: ["Rahimi, M.", "Le Beux, S."], title: "Floor-planning strategies for kilo-core hybrid SoCs" },
  { slug: "energy-mac-2023", year: 2023, venue: "ISLPED", type: "Conference", topics: ["edge-ai", "approx"], authors: ["Zolfaghari, P.", "Le Beux, S."], title: "Energy-proportional inference through quality-tunable MACs" },
  { slug: "spaceborne-2022", year: 2022, venue: "DATE", type: "Conference", topics: ["reconfig"], authors: ["Asghari, M.", "Le Beux, S."], title: "A reconfigurable accelerator platform for spaceborne signal processing" },
  { slug: "photonic-scale-2022", year: 2022, venue: "IEEE TPDS", type: "Journal", topics: ["noc"], authors: ["Le Beux, S.", "Rahimi, M."], title: "On the scalability of photonic networks for chip multiprocessors" },
  { slug: "quantum-compile-2021", year: 2021, venue: "ICCAD", type: "Conference", topics: ["quantum"], authors: ["Le Beux, S."], title: "Compilation challenges for near-term quantum processors" }
];

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
