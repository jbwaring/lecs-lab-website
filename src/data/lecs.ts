// LECS — Laboratory for Emerging Computing Systems
// Static content that isn't yet in a content collection: research areas,
// shared role labels, lab metadata, and a small set of formatting helpers.
//
// People, publications, articles, and news are content collections — see
// src/content.config.ts and src/content/{people,publications,articles,news}/.

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
