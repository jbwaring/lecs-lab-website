// LECS site copy in English and French. Add or edit entries here only — every
// page reads through the t() helper in ../lib/i18n.ts.

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const strings = {
  en: {
    // Utility bar
    "util.breadcrumb.concordia": "Concordia University",
    "util.breadcrumb.gcs": "Gina Cody School",
    "util.breadcrumb.ece": "Electrical & Computer Engineering",
    "util.actions.contact": "Contact",
    "util.actions.openPositions": "Open positions",

    // Header brand
    "brand.lab": "Laboratory",
    "brand.for": "for",
    "brand.emerging": "Emerging Computing Systems",
    "brand.affiliation": "Concordia University · Montréal",

    // Nav
    "nav.about": "About",
    "nav.research": "Research",
    "nav.people": "People",
    "nav.news": "News",
    "nav.articles": "Articles",
    "nav.publications": "Publications",
    "nav.join": "Join us",

    // Hero
    "hero.eyebrow": "Concordia University · Gina Cody School",
    "hero.titleLead": "Architectures for the",
    "hero.titleEm": "next",
    "hero.titleTrail": "generation of computing.",
    "hero.lede":
      "Design methods for emerging hardware: silicon photonics, reconfigurable architectures, and the systems they enable.",
    "hero.ctaResearch": "Our research →",
    "hero.ctaPeople": "Meet the group",
    "hero.stats.papers": "Papers",
    "hero.stats.themes": "Research themes",
    "hero.stats.members": "Active members",
    "hero.stats.years": "Years at Concordia",

    // About
    "about.eyebrow": "About the lab",
    "about.title": "Design methods for emerging hardware.",
    "about.lede":
      "LECS investigates the architectural foundations of post-CMOS computing — from silicon photonic interconnects and reconfigurable arrays to near-term quantum processors. Our work spans device-level modelling, system-level simulation, and FPGA prototyping, in close collaboration with industry and partner institutions across Montréal and Europe.",

    // Research
    "research.eyebrow": "Research",
    "research.title": "Nine intertwined research directions.",
    "research.lede":
      "Each direction is led by a graduate researcher or postdoctoral fellow. Together they form a coherent agenda on emerging computing systems, from the physical layer to the toolchain.",

    // People
    "people.eyebrow": "People",
    "people.title": "A small group, broad interests.",
    "people.lede":
      "The group is led by Prof. Sébastien Le Beux and includes one postdoctoral fellow, four doctoral candidates, two master's students, and one visiting researcher, with active alumni in industry.",
    "people.filterLabel": "Filter by role",
    "people.viewProfile": "View profile →",
    "people.empty": "No members in this category.",

    // News
    "news.eyebrow": "News",
    "news.title": "News from the group.",
    "news.lede":
      "Recent papers, awards, defences, and collaborations. Click through for the full abstract, authors, and the publisher / arXiv link.",

    // Publications
    "pubs.eyebrow": "Publications",
    "pubs.title": "Selected publications.",
    "pubs.lede":
      "Filter by year, topic, author, or search across titles and venues. The supervisor's name is highlighted in each row.",
    "pubs.searchPlaceholder": "Search title, author, venue…",
    "pubs.allYears": "All years",
    "pubs.allTopics": "All topics",
    "pubs.allAuthors": "All authors",
    "pubs.year": "Year",
    "pubs.topic": "Topic",
    "pubs.author": "Author",
    "pubs.countOf": "of",
    "pubs.publications": "publications",
    "pubs.clear": "Clear filters ✕",
    "pubs.empty": "No publications match these filters.",
    "pubs.yearCountOne": "publication",
    "pubs.yearCountMany": "publications",

    // Join
    "join.eyebrow": "Join the group",
    "join.title": "Open positions — MSc & PhD.",
    "join.body1":
      "We are actively recruiting motivated students at the MSc and PhD levels to work on hardware architectures using emerging technologies. Candidates with backgrounds in computer architecture, hardware programming (VHDL/Verilog), system-level simulation, optimization, or neural networks are particularly encouraged to apply.",
    "join.body2Lead":
      "Women and minorities are strongly encouraged to apply. Send a CV, transcripts, and a brief statement of motivation to ",
    "join.topicsHeading": "Topics we cover",

    // Articles listing
    "articles.heroTitle": "Articles & research notes.",
    "articles.heroLede":
      "Long-form writing from members of the lab — research notes accompanying recent papers, engineering write-ups, and the occasional reflection on the practice of running an architecture group.",
    "articles.filterLabel": "Filter by topic",
    "articles.empty": "No articles match this filter.",
    "articles.minRead": "min read",
    "articles.by": "By",
    "articles.allArticles": "← All articles",

    // Article detail
    "article.commentsHeading": "Comments & corrections",
    "article.commentsBody":
      "If you have questions about this note, or you spot something we got wrong, please write to the author directly. We post addenda to articles when a correction is warranted.",
    "article.companionHeading": "Companion paper",
    "article.thisArticle": "This article",
    "article.published": "Published",
    "article.category": "Category",
    "article.readingTime": "Reading time",
    "article.related": "Related articles",
    "article.author": "Author",
    "article.inBrief": "In brief",

    // Publication detail
    "pub.detailsHeading": "Paper details",
    "pub.arxivId": "arXiv ID",
    "pub.semanticScholar": "Semantic Scholar",
    "pub.venue": "Venue",
    "pub.type": "Type",
    "pub.year": "Year",
    "pub.category": "Category",
    "pub.doi": "DOI",
    "pub.authors": "Authors",
    "pub.externalAuthor": "External collaborator",
    "pub.abstract": "Abstract",
    "pub.citationHeading": "Citation",
    "pub.citationBody":
      "If you build on this work, please cite the paper using the entry below. The BibTeX can be copied to clipboard with the button at the top of this page.",
    "pub.ackHeading": "Acknowledgements",
    "pub.ackBody":
      "This work was supported in part by the Natural Sciences and Engineering Research Council of Canada (NSERC) Discovery Grants programme and by the Fonds de recherche du Québec — Nature et technologies (FRQNT).",
    "pub.downloadPdf": "↓ Download PDF",
    "pub.pdfOnArxiv": "↓ PDF on arXiv",
    "pub.viewArxiv": "View on arXiv ↗",
    "pub.viewSS": "View on Semantic Scholar ↗",
    "pub.viewDoi": "View on publisher ↗",
    "pub.html": "HTML ↗",
    "pub.copyBibtex": "Copy BibTeX",
    "pub.copied": "✓ Copied",
    "pub.related": "Related publications",
    "pub.backAll": "← All publications",
    "pub.openPaper": "Open paper →",

    // Profile
    "profile.bioHeading": "Biography",
    "profile.currentProjects": "Current projects",
    "profile.researchProject": "Research project",
    "profile.pubsHeading": "Publications",
    "profile.pubsEmpty": "No publications listed yet.",
    "profile.role": "Role",
    "profile.atLecs": "At LECS",
    "profile.since": "Since",
    "profile.contact": "Contact",
    "profile.phone": "Phone",
    "profile.office": "Office",
    "profile.researchAreas": "Research areas",
    "profile.profiles": "Profiles",
    "profile.backToPeople": "← Back to people",
    "profile.googleScholar": "Google Scholar ↗",
    "profile.dblp": "DBLP ↗",
    "profile.personalSite": "Personal site ↗",

    // Filter pills (role short labels)
    "role.all": "All",
    "role.supervisor": "PI",
    "role.postdoc": "Postdoc",
    "role.phd": "PhD",
    "role.msc": "MSc",
    "role.undergraduate": "Undergrad",
    "role.visiting": "Visiting",
    "role.alumni": "Alumni",

    // Role full labels
    "roleFull.supervisor": "Principal Investigator",
    "roleFull.postdoc": "Postdoctoral Fellow",
    "roleFull.phd": "PhD",
    "roleFull.msc": "MSc",
    "roleFull.undergraduate": "Undergraduate",
    "roleFull.visiting": "Visiting",
    "roleFull.alumni": "Alumni",

    // Footer
    "foot.landAck.lead": "Territorial acknowledgement.",
    "foot.landAck.body":
      "Concordia University is located on unceded Indigenous lands. The Kanien'kehá:ka Nation is recognized as the custodians of Tiohtià:ke / Montréal.",
    "foot.labCol.heading": "Laboratory for Emerging Computing Systems",
    "foot.labCol.body":
      "Dept. of Electrical & Computer Engineering · Gina Cody School of Engineering and Computer Science · Concordia University. EV Building, 1515 Sainte-Catherine St. W., Montréal, Québec.",
    "foot.theLab": "The lab",
    "foot.resources": "Resources",
    "foot.concordia": "Concordia",
    "foot.scholar": "Google Scholar",
    "foot.dblp": "DBLP",
    "foot.supervisor": "Supervisor's site",
    "foot.ginaCody": "Gina Cody School",
    "foot.eceDept": "ECE Department",
    "foot.research": "Research at Concordia",
    "foot.grad": "Graduate admissions",
    "foot.copyright":
      "© 2026 Laboratory for Emerging Computing Systems · Concordia University",
    "foot.accessibility": "Accessibility",
    "foot.privacy": "Privacy",
    "foot.terms": "Terms",

    // Research-area titles (mirrors lecs.ts but localized)
    "area.photonics": "Silicon photonic interconnects",
    "area.reconfig": "Reconfigurable architectures",
    "area.noc": "Network-on-Chip",
    "area.quantum": "Quantum computing",
    "area.edge-ai": "Edge AI accelerators",
    "area.neuro": "Neuromorphic architectures",
    "area.soc": "Manycore SoCs",
    "area.approx": "Approximate computing",
    "area.fpga": "FPGA prototyping",

    // Research-area blurbs
    "areaBlurb.photonics":
      "Microring-resonator-based on-chip optical networks that move data with the bandwidth and energy efficiency electrical wires cannot.",
    "areaBlurb.reconfig":
      "Coarse-grained reconfigurable arrays and FPGA-based accelerators that adapt to workload demands at runtime.",
    "areaBlurb.noc":
      "Scalable interconnect fabrics — electrical, optical and hybrid — for many-core systems-on-chip.",
    "areaBlurb.quantum":
      "Compilation, mapping and control-stack design for near-term quantum hardware.",
    "areaBlurb.edge-ai":
      "Custom datapaths for convolutional and recurrent inference at the edge, under tight area and power budgets.",
    "areaBlurb.neuro": "Spiking and analog substrates for event-driven sensing and learning.",
    "areaBlurb.soc":
      "Architecture and design-space exploration of heterogeneous many-core processors.",
    "areaBlurb.approx":
      "Quality-configurable arithmetic and memory for energy-proportional computation.",
    "areaBlurb.fpga":
      "Hardware-in-the-loop validation of novel architectures on contemporary FPGAs.",

    // Misc
    "lang.toggle": "FR",
    "lang.label": "Language",

    // Months — short
    "month.short.1": "Jan",
    "month.short.2": "Feb",
    "month.short.3": "Mar",
    "month.short.4": "Apr",
    "month.short.5": "May",
    "month.short.6": "Jun",
    "month.short.7": "Jul",
    "month.short.8": "Aug",
    "month.short.9": "Sep",
    "month.short.10": "Oct",
    "month.short.11": "Nov",
    "month.short.12": "Dec",

    // Months — long
    "month.long.1": "January",
    "month.long.2": "February",
    "month.long.3": "March",
    "month.long.4": "April",
    "month.long.5": "May",
    "month.long.6": "June",
    "month.long.7": "July",
    "month.long.8": "August",
    "month.long.9": "September",
    "month.long.10": "October",
    "month.long.11": "November",
    "month.long.12": "December"
  },

  fr: {
    // Utility bar
    "util.breadcrumb.concordia": "Université Concordia",
    "util.breadcrumb.gcs": "École Gina-Cody",
    "util.breadcrumb.ece": "Génie électrique et informatique",
    "util.actions.contact": "Contact",
    "util.actions.openPositions": "Postes à combler",

    // Header brand
    "brand.lab": "Laboratoire",
    "brand.for": "pour",
    "brand.emerging": "les systèmes informatiques émergents",
    "brand.affiliation": "Université Concordia · Montréal",

    // Nav
    "nav.about": "À propos",
    "nav.research": "Recherche",
    "nav.people": "Équipe",
    "nav.news": "Actualités",
    "nav.articles": "Articles",
    "nav.publications": "Publications",
    "nav.join": "Nous rejoindre",

    // Hero
    "hero.eyebrow": "Université Concordia · École Gina-Cody",
    "hero.titleLead": "Architectures pour la",
    "hero.titleEm": "prochaine",
    "hero.titleTrail": "génération de l'informatique.",
    "hero.lede":
      "Méthodes de conception pour le matériel émergent : photonique sur silicium, architectures reconfigurables, et les systèmes qu'elles rendent possibles.",
    "hero.ctaResearch": "Nos travaux →",
    "hero.ctaPeople": "Découvrir l'équipe",
    "hero.stats.papers": "Articles",
    "hero.stats.themes": "Axes de recherche",
    "hero.stats.members": "Membres actifs",
    "hero.stats.years": "Années à Concordia",

    // About
    "about.eyebrow": "À propos du laboratoire",
    "about.title": "Méthodes de conception pour le matériel émergent.",
    "about.lede":
      "Le LECS étudie les fondements architecturaux de l'informatique post-CMOS — des interconnexions photoniques sur silicium aux réseaux reconfigurables et aux processeurs quantiques émergents. Nos travaux couvrent la modélisation au niveau dispositif, la simulation système et le prototypage sur FPGA, en collaboration étroite avec l'industrie et des partenaires académiques à Montréal et en Europe.",

    // Research
    "research.eyebrow": "Recherche",
    "research.title": "Neuf axes de recherche entrelacés.",
    "research.lede":
      "Chaque axe est porté par un étudiant gradué ou un postdoctorant. Ensemble ils dessinent un programme cohérent autour des systèmes informatiques émergents, de la couche physique à la chaîne d'outils.",

    // People
    "people.eyebrow": "Équipe",
    "people.title": "Une petite équipe, des intérêts variés.",
    "people.lede":
      "L'équipe est dirigée par le Pr Sébastien Le Beux et regroupe un postdoctorant, quatre doctorants, deux étudiants à la maîtrise et un chercheur invité, ainsi que des diplômés actifs dans l'industrie.",
    "people.filterLabel": "Filtrer par rôle",
    "people.viewProfile": "Voir le profil →",
    "people.empty": "Aucun membre dans cette catégorie.",

    // News
    "news.eyebrow": "Actualités",
    "news.title": "Actualités du groupe.",
    "news.lede":
      "Articles récents, prix, soutenances et collaborations. Cliquez pour consulter le résumé complet, les auteurs et le lien éditeur / arXiv.",

    // Publications
    "pubs.eyebrow": "Publications",
    "pubs.title": "Publications choisies.",
    "pubs.lede":
      "Filtrez par année, thématique, auteur ou recherchez par titre et lieu de publication. Le nom du superviseur est mis en évidence dans chaque ligne.",
    "pubs.searchPlaceholder": "Rechercher titre, auteur, lieu…",
    "pubs.allYears": "Toutes les années",
    "pubs.allTopics": "Toutes les thématiques",
    "pubs.allAuthors": "Tous les auteurs",
    "pubs.year": "Année",
    "pubs.topic": "Thématique",
    "pubs.author": "Auteur",
    "pubs.countOf": "sur",
    "pubs.publications": "publications",
    "pubs.clear": "Effacer les filtres ✕",
    "pubs.empty": "Aucune publication ne correspond à ces filtres.",
    "pubs.yearCountOne": "publication",
    "pubs.yearCountMany": "publications",

    // Join
    "join.eyebrow": "Nous rejoindre",
    "join.title": "Postes à combler — maîtrise et doctorat.",
    "join.body1":
      "Nous recrutons activement des étudiants motivés à la maîtrise et au doctorat pour travailler sur des architectures matérielles à base de technologies émergentes. Les candidats ayant une formation en architecture des ordinateurs, en programmation matérielle (VHDL/Verilog), en simulation système, en optimisation ou en réseaux de neurones sont particulièrement encouragés.",
    "join.body2Lead":
      "Les femmes et les minorités sont vivement encouragées à postuler. Envoyez votre CV, vos relevés de notes et une brève lettre de motivation à ",
    "join.topicsHeading": "Thématiques couvertes",

    // Articles listing
    "articles.heroTitle": "Articles & notes de recherche.",
    "articles.heroLede":
      "Écrits long format des membres du laboratoire — notes accompagnant nos articles récents, retours d'ingénierie, et réflexions occasionnelles sur la conduite d'un groupe d'architecture.",
    "articles.filterLabel": "Filtrer par thématique",
    "articles.empty": "Aucun article ne correspond à ce filtre.",
    "articles.minRead": "min de lecture",
    "articles.by": "Par",
    "articles.allArticles": "← Tous les articles",

    // Article detail
    "article.commentsHeading": "Commentaires & corrections",
    "article.commentsBody":
      "Si vous avez des questions sur cette note ou repérez une erreur, écrivez directement à l'auteur. Nous ajoutons un addendum à l'article lorsqu'une correction s'impose.",
    "article.companionHeading": "Article associé",
    "article.thisArticle": "Cet article",
    "article.published": "Publié le",
    "article.category": "Catégorie",
    "article.readingTime": "Temps de lecture",
    "article.related": "Articles liés",
    "article.author": "Auteur",
    "article.inBrief": "En bref",

    // Publication detail
    "pub.detailsHeading": "Détails de l'article",
    "pub.arxivId": "ID arXiv",
    "pub.semanticScholar": "Semantic Scholar",
    "pub.venue": "Lieu de publication",
    "pub.type": "Type",
    "pub.year": "Année",
    "pub.category": "Catégorie",
    "pub.doi": "DOI",
    "pub.authors": "Auteurs",
    "pub.externalAuthor": "Collaborateur externe",
    "pub.abstract": "Résumé",
    "pub.citationHeading": "Citation",
    "pub.citationBody":
      "Si vous citez ces travaux, merci d'utiliser l'entrée ci-dessous. Vous pouvez copier le BibTeX dans le presse-papier via le bouton en haut de page.",
    "pub.ackHeading": "Remerciements",
    "pub.ackBody":
      "Ces travaux ont été soutenus en partie par le Conseil de recherches en sciences naturelles et en génie du Canada (CRSNG) et par le Fonds de recherche du Québec — Nature et technologies (FRQNT).",
    "pub.downloadPdf": "↓ Télécharger le PDF",
    "pub.pdfOnArxiv": "↓ PDF sur arXiv",
    "pub.viewArxiv": "Voir sur arXiv ↗",
    "pub.viewSS": "Voir sur Semantic Scholar ↗",
    "pub.viewDoi": "Voir chez l'éditeur ↗",
    "pub.html": "HTML ↗",
    "pub.copyBibtex": "Copier le BibTeX",
    "pub.copied": "✓ Copié",
    "pub.related": "Publications connexes",
    "pub.backAll": "← Toutes les publications",
    "pub.openPaper": "Ouvrir l'article →",

    // Profile
    "profile.bioHeading": "Biographie",
    "profile.currentProjects": "Projets en cours",
    "profile.researchProject": "Projet de recherche",
    "profile.pubsHeading": "Publications",
    "profile.pubsEmpty": "Aucune publication listée pour le moment.",
    "profile.role": "Rôle",
    "profile.atLecs": "Au LECS",
    "profile.since": "Depuis",
    "profile.contact": "Contact",
    "profile.phone": "Téléphone",
    "profile.office": "Bureau",
    "profile.researchAreas": "Axes de recherche",
    "profile.profiles": "Profils",
    "profile.backToPeople": "← Retour à l'équipe",
    "profile.googleScholar": "Google Scholar ↗",
    "profile.dblp": "DBLP ↗",
    "profile.personalSite": "Site personnel ↗",

    // Filter pills (role short labels)
    "role.all": "Tous",
    "role.supervisor": "PI",
    "role.postdoc": "Postdoc",
    "role.phd": "Doctorat",
    "role.msc": "Maîtrise",
    "role.undergraduate": "Baccalauréat",
    "role.visiting": "Invité",
    "role.alumni": "Diplômés",

    // Role full labels
    "roleFull.supervisor": "Chercheur principal",
    "roleFull.postdoc": "Stagiaire postdoctoral",
    "roleFull.phd": "Doctorat",
    "roleFull.msc": "Maîtrise",
    "roleFull.undergraduate": "Baccalauréat",
    "roleFull.visiting": "Chercheur invité",
    "roleFull.alumni": "Diplômé",

    // Footer
    "foot.landAck.lead": "Reconnaissance territoriale.",
    "foot.landAck.body":
      "L'Université Concordia est située sur des terres autochtones non cédées. La nation Kanien'kehá:ka est reconnue comme gardienne de Tiohtià:ke / Montréal.",
    "foot.labCol.heading": "Laboratoire pour les systèmes informatiques émergents",
    "foot.labCol.body":
      "Département de génie électrique et informatique · École Gina-Cody de génie et d'informatique · Université Concordia. Pavillon EV, 1515, rue Sainte-Catherine Ouest, Montréal (Québec).",
    "foot.theLab": "Le laboratoire",
    "foot.resources": "Ressources",
    "foot.concordia": "Concordia",
    "foot.scholar": "Google Scholar",
    "foot.dblp": "DBLP",
    "foot.supervisor": "Site du superviseur",
    "foot.ginaCody": "École Gina-Cody",
    "foot.eceDept": "Département GEI",
    "foot.research": "Recherche à Concordia",
    "foot.grad": "Admissions aux études supérieures",
    "foot.copyright":
      "© 2026 Laboratoire pour les systèmes informatiques émergents · Université Concordia",
    "foot.accessibility": "Accessibilité",
    "foot.privacy": "Confidentialité",
    "foot.terms": "Modalités d'utilisation",

    // Research-area titles
    "area.photonics": "Interconnexions photoniques sur silicium",
    "area.reconfig": "Architectures reconfigurables",
    "area.noc": "Réseaux sur puce (NoC)",
    "area.quantum": "Informatique quantique",
    "area.edge-ai": "Accélérateurs d'IA embarquée",
    "area.neuro": "Architectures neuromorphiques",
    "area.soc": "Systèmes-sur-puce multicœurs",
    "area.approx": "Calcul approximatif",
    "area.fpga": "Prototypage sur FPGA",

    // Research-area blurbs
    "areaBlurb.photonics":
      "Réseaux optiques sur puce à base de microrésonateurs en anneau, capables de transporter des données avec un débit et une efficacité énergétique inaccessibles aux fils électriques.",
    "areaBlurb.reconfig":
      "Réseaux reconfigurables à gros grain et accélérateurs FPGA s'adaptant aux besoins de la charge de travail à l'exécution.",
    "areaBlurb.noc":
      "Tissus d'interconnexion électriques, optiques et hybrides pour systèmes-sur-puce massivement multicœurs.",
    "areaBlurb.quantum":
      "Compilation, mapping et conception de la chaîne de contrôle pour le matériel quantique émergent.",
    "areaBlurb.edge-ai":
      "Chemins de données dédiés à l'inférence convolutive et récurrente embarquée, sous contraintes serrées de surface et de puissance.",
    "areaBlurb.neuro":
      "Substrats à impulsions et analogiques pour la perception et l'apprentissage évènementiels.",
    "areaBlurb.soc":
      "Architecture et exploration de l'espace de conception des processeurs multicœurs hétérogènes.",
    "areaBlurb.approx":
      "Arithmétique et mémoire à qualité configurable pour un calcul énergétiquement proportionnel.",
    "areaBlurb.fpga":
      "Validation matérielle dans la boucle de nouvelles architectures sur des FPGA modernes.",

    // Misc
    "lang.toggle": "EN",
    "lang.label": "Langue",

    // Months — short
    "month.short.1": "Jan",
    "month.short.2": "Fév",
    "month.short.3": "Mar",
    "month.short.4": "Avr",
    "month.short.5": "Mai",
    "month.short.6": "Juin",
    "month.short.7": "Juil",
    "month.short.8": "Août",
    "month.short.9": "Sep",
    "month.short.10": "Oct",
    "month.short.11": "Nov",
    "month.short.12": "Déc",

    // Months — long
    "month.long.1": "janvier",
    "month.long.2": "février",
    "month.long.3": "mars",
    "month.long.4": "avril",
    "month.long.5": "mai",
    "month.long.6": "juin",
    "month.long.7": "juillet",
    "month.long.8": "août",
    "month.long.9": "septembre",
    "month.long.10": "octobre",
    "month.long.11": "novembre",
    "month.long.12": "décembre"
  }
} as const;

export type StringKey = keyof (typeof strings)["en"];
