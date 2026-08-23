// Every field note in the Learn and Training tabs points at one of these.
// Keeping them in one place means a figure can be re-checked in one place.

export type Source = { id: string; label: string; url: string };

export const SOURCES = {
  ieaEnergyAi: {
    id: "iea-energy-ai",
    label: "IEA, Energy and AI (2025)",
    url: "https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai",
  },
  ieaStreaming: {
    id: "iea-streaming",
    label: "IEA, Carbon footprint of streaming video",
    url: "https://www.iea.org/commentaries/the-carbon-footprint-of-streaming-video-fact-checking-the-headlines",
  },
  techCarbon: {
    id: "tech-carbon-standard",
    label: "Technology Carbon Standard, hardware lifecycle",
    url: "https://www.techcarbonstandard.org/technology-categories/lifecycle",
  },
  ewaste: {
    id: "gem-2024",
    label: "UNITAR, Global E-waste Monitor 2024",
    url: "https://ewastemonitor.info/the-global-e-waste-monitor-2024/",
  },
  enefg: {
    id: "enefg",
    label: "White & Case, data centre duties under the German EnEfG",
    url: "https://www.whitecase.com/insight-alert/data-center-requirements-under-new-german-energy-efficiency-act",
  },
  blueAngel: {
    id: "blue-angel",
    label: "Blauer Engel, data centres (DE-UZ 228)",
    url: "https://www.blauer-engel.de/en/productworld/data-centers",
  },
  sci: {
    id: "sci",
    label: "Green Software Foundation, SCI (ISO/IEC 21031:2024)",
    url: "https://greensoftware.foundation/standards/sci/",
  },
  dws: {
    id: "dws-greenwashing",
    label: "Simmons & Simmons, record German greenwashing fine (2025)",
    url: "https://www.simmons-simmons.com/en/publications/cm92kzgfo00gcupecc4g59z5i/historically-high-esg-fine-in-germany-for-greenwashing-",
  },
  microsoftReport: {
    id: "microsoft-sustainability-2025",
    label: "Microsoft, Environmental Sustainability Report 2025",
    url: "https://www.microsoft.com/en-us/corporate-responsibility/sustainability/report",
  },
  csrd: {
    id: "csrd",
    label: "CSRD reporting scope and Scope 3",
    url: "https://www.deutscher-nachhaltigkeitskodex.de/en/reporting-obligations/corporate-sustainability-reporting-directive-csrd/",
  },
} satisfies Record<string, Source>;

export type SourceKey = keyof typeof SOURCES;
