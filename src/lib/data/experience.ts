export type Experience = {
  company: string;
  companyTag: string;
  role: string;
  start: string;
  end: string;
  project: string;
  body: string;
  bullets?: string[];
  links?: { label: string; href: string }[];
};

export const experiences: Experience[] = [
  {
    company: "Celebal Technologies",
    companyTag: "CS",
    role: "SDE Intern",
    start: "May 2025",
    end: "Aug 2025",
    project: "Deploying a Java application on Azure using DevOps",
    body:
      "Designed, containerised, and deployed a Spring Boot application on Microsoft Azure. Built an end-to-end CI/CD pipeline with GitHub Actions, containerised with Docker, and shipped to Azure Web App / AKS. Added monitoring, logging, and security baselines so deployments were actually reliable — not just fast.",
    bullets: [
      "GitHub Actions pipeline: typecheck → test → docker build → push → AKS deploy",
      "Multi-stage Dockerfiles, layer caching kept cold builds under 90s",
      "App Insights + structured logs wired in from day one",
    ],
  },
  {
    company: "YBI Foundation",
    companyTag: "YB",
    role: "ML Intern",
    start: "Jul 2024",
    end: "Oct 2024",
    project: "Digital Number Prediction from Stock Images",
    body:
      "Built a computer-vision model that recognises digits in stock images — a small but useful grounding exercise in dataset curation, preprocessing, and evaluation. Trained on labelled image data and shipped a working inference pipeline.",
    bullets: [
      "Dataset prep, augmentation, and stratified train/val/test split",
      "CNN baseline + evaluation with confusion matrices per class",
    ],
  },
  {
    company: "TechForce Academy",
    companyTag: "TF",
    role: "IoT Intern",
    start: "Apr 2024",
    end: "Jun 2024",
    project: "Green Field: Smart Irrigation Control System",
    body:
      "Designed a smart irrigation system that combined soil-moisture sensors with weather APIs to automate watering schedules. The estimate: ~40% less water usage and better crop-yield simulation. The real lesson: hardware, software, and environment all have to agree.",
    bullets: [
      "Sensor → microcontroller → cloud pipeline, with weather API as a veto",
      "Scheduling logic that prefers rain forecasts over raw sensor readings",
    ],
  },
];

export const education = [
  {
    school: "Amity University Rajasthan",
    location: "Jaipur",
    degree: "B.Tech, Computer Science Engineering",
    start: "2022",
    end: "2026",
    detail: "CGPA 7.34",
  },
  {
    school: "Matrix High School",
    location: "Sikar",
    degree: "Senior Secondary (PCM)",
    start: "2020",
    end: "2021",
    detail: "95%",
  },
];
