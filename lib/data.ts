export type Step = { title: string; desc: string };

export type Product = {
  slug: "oil" | "feed" | "biostimulant";
  num: string;
  name: string;
  tagline: string;
  pitch: string;
  strain: string;
  strainNote: string;
  strainRefs: number[];
  ingredient: string;
  ingredientLine: string;
  accent: string;
  goals: string[];
  steps: Step[];
  sustain: { icon: string; title: string; text: string }[];
};

export const products: Product[] = [
  {
    slug: "oil",
    num: "01",
    name: "ALGO Oil",
    tagline: "Omega-3, straight from the source.",
    pitch: "Fish get their omega-3 from algae. We skip the fish.",
    strain: "Schizochytrium sp.",
    strainNote:
      "A marine protist grown on organic carbon. A well-studied DHA producer, now also classed as Aurantiochytrium.",
    strainRefs: [1, 2],
    ingredient: "DHA",
    ingredientLine: "An omega-3 fatty acid the cell makes itself.",
    accent: "#d6b550",
    goals: ["DHA-rich", "3 flavours", "Shelf-stable", "Flavour-stable"],
    steps: [
      { title: "Fermentation", desc: "Schizochytrium sp. grown on organic carbon" },
      { title: "Biomass recovery", desc: "Separate the cells from the broth" },
      { title: "Cell disruption", desc: "Open the cells to release the lipids" },
      { title: "Extraction", desc: "Recover and refine the DHA-rich oil" },
      { title: "Quality testing", desc: "Safety, shelf life and flavour stability" },
    ],
    sustain: [
      { icon: "🐟", title: "Fish-free omega-3", text: "Grown in tanks. No fishing fleets needed." },
      { icon: "♻️", title: "Nothing wasted", text: "Leftover biomass goes on to ALGO Feed." },
      { icon: "🧪", title: "Controlled & clean", text: "Fermentation is predictable and repeatable." },
    ],
  },
  {
    slug: "feed",
    num: "02",
    name: "ALGO Feed",
    tagline: "Protein-rich algae for the farm.",
    pitch: "Green protein for poultry, cattle and goats.",
    strain: "Chlorella vulgaris",
    strainNote:
      "A protein-rich green microalga, widely studied as an animal feed ingredient.",
    strainRefs: [4, 5, 6],
    ingredient: "Protein",
    ingredientLine: "Whole algal biomass, plus the biomass left after oil extraction.",
    accent: "#ea9372",
    goals: ["Protein-rich", "Digestible", "Safe", "Right inclusion level"],
    steps: [
      { title: "Cultivation", desc: "Chlorella vulgaris in a modular photobioreactor" },
      { title: "Harvesting", desc: "Filtration or another low-cost separation" },
      { title: "Cell-wall disruption", desc: "Improve nutrient availability for animals" },
      { title: "Drying", desc: "Biomass, plus residual biomass from oil" },
      { title: "Feed evaluation", desc: "Composition, digestibility, safety, inclusion level" },
    ],
    sustain: [
      { icon: "🔁", title: "Second life for biomass", text: "Uses what oil extraction leaves behind." },
      { icon: "🌿", title: "Compact growing", text: "Modular photobioreactors need little land." },
      { icon: "🐄", title: "Built for livestock", text: "Cell walls opened so animals can use more." },
    ],
  },
  {
    slug: "biostimulant",
    num: "03",
    name: "ALGO Biostimulant",
    tagline: "A spray that helps seedlings start strong.",
    pitch: "Algal extract for roots, growth and nutrient use.",
    strain: "Chlorella vulgaris",
    strainNote:
      "Studied as a plant biostimulant, including effects on growth and drought tolerance.",
    strainRefs: [7, 8],
    ingredient: "Algal extract",
    ingredientLine: "Made from Chlorella biomass or its cell-free culture liquid.",
    accent: "#86d08f",
    goals: ["Seedling growth", "Root development", "Nutrient-use efficiency"],
    steps: [
      { title: "Cultivation", desc: "Chlorella vulgaris in a modular photobioreactor" },
      { title: "Harvesting", desc: "Separate biomass from the culture" },
      { title: "Extract prep", desc: "Biomass extract or cell-free culture liquid" },
      { title: "Formulation", desc: "Spray-ready, tested at several concentrations" },
      { title: "Seedling trial", desc: "Treated vs untreated, identical conditions" },
    ],
    sustain: [
      { icon: "🌱", title: "Do more with less", text: "Goal: better nutrient use, less wasted input." },
      { icon: "💧", title: "Stress support", text: "Drought tolerance is being studied in plants." },
      { icon: "☀️", title: "Renewable source", text: "Made from sunlight-grown algae." },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export type Ref = { id: number; group: string; text: string; doi: string };

export const references: Ref[] = [
  {
    id: 1,
    group: "Algae oil: Schizochytrium (DHA)",
    text: "Chi, G., Xu, Y., Cao, X., Li, Z., Cao, M., Chisti, Y., & He, N. (2022). Production of polyunsaturated fatty acids by Schizochytrium (Aurantiochytrium) spp. Biotechnology Advances, 55, Article 107897.",
    doi: "https://doi.org/10.1016/j.biotechadv.2021.107897",
  },
  {
    id: 2,
    group: "Algae oil: Schizochytrium (DHA)",
    text: "Peng, Z., Zhong, L., Li, Y., Feng, S., Mou, J., Miao, Y., Lin, C. S. K., Wang, Z., & Li, X. (2025). Harnessing oleaginous protist Schizochytrium for docosahexaenoic acid: Current technologies in sustainable production and food applications. Food Research International, 205, Article 115996.",
    doi: "https://doi.org/10.1016/j.foodres.2025.115996",
  },
  {
    id: 3,
    group: "EPA option: Nannochloropsis",
    text: "Navalho, S., Ferrer-Ledo, N., Barbosa, M. J., & Varela, J. (2025). Nannochloropsis lipids and polyunsaturated fatty acids: Potential applications and strain improvement. Marine Drugs, 23(3), Article 128.",
    doi: "https://doi.org/10.3390/md23030128",
  },
  {
    id: 4,
    group: "Animal feed: Chlorella vulgaris",
    text: "Gadzama, I. U., Ray, S., Méité, R., Mugweru, I. M., Gondo, T., Rahman, M. A., Redoy, M. R. A., Rohani, M. F., Kholif, A. E., Salahuddin, M., & Brito, A. F. (2025). Chlorella vulgaris as a livestock supplement and animal feed: A comprehensive review. Animals, 15(6), Article 879.",
    doi: "https://doi.org/10.3390/ani15060879",
  },
  {
    id: 5,
    group: "Animal feed: Chlorella vulgaris",
    text: "Spínola, M. P., Costa, M. M., & Prates, J. A. M. (2023). Enhancing digestibility of Chlorella vulgaris biomass in monogastric diets: Strategies and insights. Animals, 13(6), Article 1017.",
    doi: "https://doi.org/10.3390/ani13061017",
  },
  {
    id: 6,
    group: "Animal feed: Chlorella vulgaris",
    text: "Kholif, A. E., & Olafadehan, O. A. (2021). Chlorella vulgaris microalgae in ruminant nutrition: A review of the chemical composition and nutritive value. Annals of Animal Science, 21(3), 789–806.",
    doi: "https://doi.org/10.2478/aoas-2020-0117",
  },
  {
    id: 7,
    group: "Biostimulant: Chlorella vulgaris",
    text: "Moon, J., Park, Y. J., Choi, Y. B., Truong, T. Q., Huynh, P. K., Kim, Y. B., & Kim, S. M. (2024). Physiological effects and mechanisms of Chlorella vulgaris as a biostimulant on the growth and drought tolerance of Arabidopsis thaliana. Plants, 13(21), Article 3012.",
    doi: "https://doi.org/10.3390/plants13213012",
  },
  {
    id: 8,
    group: "Biostimulant: Chlorella vulgaris",
    text: "La Bella, E., Baglieri, A., Rovetto, E. I., Stevanato, P., & Puglisi, I. (2021). Foliar spray application of Chlorella vulgaris extract: Effect on the growth of lettuce seedlings. Agronomy, 11(2), Article 308.",
    doi: "https://doi.org/10.3390/agronomy11020308",
  },
];

export const team = {
  course: "Food Biotechnology · BTH 638",
  members: ["Ifrah Naseem", "Sana Naz", "Zainab Irfan"],
};
