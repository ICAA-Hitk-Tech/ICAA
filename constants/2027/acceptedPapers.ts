// constants/2027/acceptedPapers.ts

export type PaperType = "full" | "short";

export interface AcceptedPaper {
  pid: string;
  type: PaperType;
  title: string;
  /** Optional for now — add author names here once they are confirmed. */
  authors?: string[];
}

export const PAPER_TYPE_LABELS: Record<PaperType, string> = {
  full: "Full Papers",
  short: "Short Papers",
};

// ── Full papers ───────────────────────────────────────────────────────────────

export const FULL_PAPERS: AcceptedPaper[] = [
  {
    pid: "003",
    type: "full",
    title:
      "Uncertainty-Aware Neuro-Symbolic Continual Learning for Reliable Mental Health Screening under Instrument Shift",
  },
  {
    pid: "007",
    type: "full",
    title:
      "DiffGeo-GNN: Diffusion-Geometry Neighborhoods for Message Passing on Heterophilic Graphs",
  },
  {
    pid: "008",
    type: "full",
    title:
      "Dentition Driven Cow Age Estimation Using a Hybrid Deep Feature Condenser Architecture",
  },
  {
    pid: "013",
    type: "full",
    title:
      "Reinforcement Learning Approach for Indoor Delivery Robot Navigation",
  },
  {
    pid: "022",
    type: "full",
    title:
      "Diabetes Prediction Using Machine Learning: A Comparative Evaluation",
  },
  {
    pid: "024",
    type: "full",
    title:
      "BatteryMind: A Physics-Informed Neural Network with Retrieval-Augmented Explanation for Interpretable Battery Remaining-Useful-Life Prediction",
  },
  {
    pid: "025",
    type: "full",
    title:
      "LightALL-Net: A Lightweight Efficient Channel Attention and DropBlock Framework for Acute Lymphoblastic Leukemia Screening",
  },
  {
    pid: "026",
    type: "full",
    title:
      "A Metaheuristics Chaining Strategy for Task Offloading in Internet of Medical Things",
  },
  {
    pid: "034",
    type: "full",
    title:
      "Private and Structural: Translating English–Vietnamese Scientific Documents with Multimodal LLMs",
  },
  {
    pid: "036",
    type: "full",
    title: "Sustained Temporal Dominating Sets",
  },
  {
    pid: "039",
    type: "full",
    title:
      "Multi-Capacity Greedy Online Facility Assignment on Cycles: Exact Gap Recurrences and Symmetry-Reduced Algorithms",
  },
  {
    pid: "044",
    type: "full",
    title:
      "A Comparative Study of Autoregressive Transformer and Hierarchical Graph Neural Network Approaches for Style-Conditioned Drum Pattern Generation",
  },
  {
    pid: "047",
    type: "full",
    title:
      "A Lightweight and Privacy-Preserving Lattice-Based Authentication Scheme for Post-Quantum IoT",
  },
  {
    pid: "056",
    type: "full",
    title:
      "Phase-Sensing Maps for Deterministic Spectrum Sensing of Selective Frequency-Hopping Emitters",
  },
  {
    pid: "059",
    type: "full",
    title:
      "A Comparative Analysis of Artificial Neural Networks (ANN) and Homotopy Perturbation Method for Integer and Fractional Order Two-Dimensional Brusselator Systems",
  },
  {
    pid: "062",
    type: "full",
    title:
      "Counterexample-Guided Conflict Pruning for Repeated Multi-Agent Path Finding in Warehouse Grids",
  },
  {
    pid: "064",
    type: "full",
    title:
      "A New Data Centric MCDM-based Optimization Algorithm for Municipal Landfill Site Selection",
  },
  {
    pid: "070",
    type: "full",
    title:
      "A Lightweight Offline Mobile Disaster Assistant Using Quantized Small Language Models",
  },
  {
    pid: "072",
    type: "full",
    title:
      "An Optimized Vision Transformer Framework for Classifying Ecological Patches in Assam using GIS",
  },
  {
    pid: "075",
    type: "full",
    title:
      "Restricted Minimal Linear Languages: Transition-System Semantics and ESO Definability",
  },
  {
    pid: "077",
    type: "full",
    title:
      "A Model-Based Development Framework for Scenario-Driven Validation of Autonomous Mobile Robots",
  },
  {
    pid: "081",
    type: "full",
    title:
      "Facial-cue Reinforced Affective Model Engine for Action-Unit assisted FER (FRAME): Application on Ambiguous Emotions",
  },
  {
    pid: "082",
    type: "full",
    title: "Glacial Lake Detection Using Multi-Spectral Remote Sensing Imagery",
  },
  {
    pid: "083",
    type: "full",
    title:
      "Confidence-Guided Metaheuristic Portfolio for Joint Offloading and Scheduling in Mobile Edge Computing",
  },
  {
    pid: "084",
    type: "full",
    title:
      "Variational and Influence Attentive Encoders for Unlearning in Graph Recommender Systems",
  },
  {
    pid: "085",
    type: "full",
    title:
      "An empirical analysis of a certifying algorithm for Horn constraint systems",
  },
  {
    pid: "089",
    type: "full",
    title: "A Predictive Framework for Base-n Radix Sort Optimization",
  },
  {
    pid: "091",
    type: "full",
    title:
      "Enhancing Cross-Lingual Transfer of Hybrid Latent Reasoning for Low-Resource Languages",
  },
  {
    pid: "092",
    type: "full",
    title:
      "A Deep Learning-Based LSTM Autoencoder Framework for Intrusion and Anomaly Detection in Cyber-Physical Power Electronics Systems",
  },
  {
    pid: "098",
    type: "full",
    title:
      "Detection of Strikethrough and Inserted Words in Handwritten Bengali-Text Document",
  },
  {
    pid: "099",
    type: "full",
    title:
      "MedFLaP: Factorized Latent Probing for Factuality and Faithfulness in Medical Language Model Hallucination Detection",
  },
  {
    pid: "107",
    type: "full",
    title:
      "LLM-Augmented Proactive Corridor Clearing via Q-Learning-based V2I Signal Control",
  },
  {
    pid: "110",
    type: "full",
    title:
      "Online Algorithms for Threshold-Based Refresh Scheduling: Competitive Bounds and a Smooth Policy for Wireless Sensor Networks",
  },
  {
    pid: "111",
    type: "full",
    title:
      "A Scenario Stratified Evaluation Method for Measuring Prompt Injection Resilience in Tool Augmented LLM Agents",
  },
  {
    pid: "112",
    type: "full",
    title:
      "Participant-level prediction of six-month postoperative endoscopic recurrence from baseline ileal transcriptomics: a negative evaluation in GSE186582",
  },
  {
    pid: "117",
    type: "full",
    title:
      "Co-Evolutionary Malware Detection: A Controlled Comparison of Adaptive Retraining Policies",
  },
  {
    pid: "118",
    type: "full",
    title:
      "Water wAIS: AI-Powered Leak Detection and Non-Revenue Water Reduction in Mumbai's Aging Water Distribution Network",
  },
  {
    pid: "119",
    type: "full",
    title:
      "IM2S3-AI : Image to Math Digitalisation, Solving, and Slide Synthesis using GEPA and Qwen",
  },
  {
    pid: "123",
    type: "full",
    title:
      "EDIS-MRI: Weight-Memory-Free Streaming Encoder–Decoder RTL Accelerator for Brain MRI Segmentation",
  },
  {
    pid: "128",
    type: "full",
    title:
      "MindMesh: A Hierarchical Multi-Task Transformer Framework for Multi-Class Mental Health Disorder Detection",
  },
  {
    pid: "131",
    type: "full",
    title:
      "Unified Multimodal Summarization Using Transformer-Based Architectures and Hybrid Extractive-Abstractive Techniques",
  },
  {
    pid: "133",
    type: "full",
    title:
      "Fusing Convolutional and Transformer Representations for Facial Biomarker-Based ASD Screening",
  },
  {
    pid: "135",
    type: "full",
    title:
      "Does Better Retrieval Mean Better Distractors? Investigating Misconception-Aware Pipelines for Mathematics MCQs",
  },
  {
    pid: "137",
    type: "full",
    title:
      "Capacity-Aware Pressure-Based Reinforcement Learning for Traffic Signal Control",
  },
  {
    pid: "140",
    type: "full",
    title:
      "Semantic-Aware Spatial Co-location Pattern Mining over Large-scale POI Data",
  },
  {
    pid: "143",
    type: "full",
    title:
      "Dynamic Queries for Mutable Genome Assemblies over Fixed Multiresolution Contact Matrices",
  },
  {
    pid: "149",
    type: "full",
    title:
      "Advanced Analytical Techniques for Comprehensive Assessment of Atmospheric and Oceanic Dynamics",
  },
  {
    pid: "151",
    type: "full",
    title:
      "Fine-Tuning Results for Ethnomedicinal Visual Question Answering through LAVE accuracy",
  },
  {
    pid: "152",
    type: "full",
    title:
      "HC2QW: A 4D Hyper Chaotic Chen system controlled Quantum Walk Framework For Secure Image Encryption",
  },
  {
    pid: "154",
    type: "full",
    title: "One Color Preprocessing Improves DSATUR",
  },
  {
    pid: "161",
    type: "full",
    title:
      "CivicFix: An AI-Assisted Geospatial Framework for Explainable Civic-Grievance Prioritization and Verified Resolution",
  },
  {
    pid: "163",
    type: "full",
    title:
      "Covering all blue points and minimum red points by an arbitrary oriented geometric object",
  },
];

// ── Short papers ──────────────────────────────────────────────────────────────

export const SHORT_PAPERS: AcceptedPaper[] = [
  {
    pid: "002",
    type: "short",
    title:
      "Learning from Visual Proofs: Neural Models for Network Property Verification",
  },
  {
    pid: "015",
    type: "short",
    title:
      "Patient-Grouped Evaluation for Feature-Efficient Superpixel-Based Brain Tumor Segmentation",
  },
  {
    pid: "045",
    type: "short",
    title:
      "MobiUNet: A Lightweight Multi-Task Framework for Brain Tumor Segmentation and Slice-Level Classification with Explainability and Approximate 3D Visualization",
  },
  {
    pid: "048",
    type: "short",
    title: "An Empirical Analysis of Randomized Algorithms for Linear Search",
  },
  {
    pid: "053",
    type: "short",
    title: "An Optimiser for Constrained University Course Allocation",
  },
  {
    pid: "067",
    type: "short",
    title:
      "Agent-Native Workflow Design: Principles and the Complexity of Minimum-Cost Redesign",
  },
  {
    pid: "086",
    type: "short",
    title: "Last Mile Delivery Optimization",
  },
  {
    pid: "126",
    type: "short",
    title:
      "Construction of the Maximum $(n-2)$~pairwise Edge-Disjoint Spanning Trees in L(Kn)",
  },
  {
    pid: "141",
    type: "short",
    title:
      "Stability-Aware Multi-Ratio Scanline for Robust Lane Keeping on Edge Autonomous Vehicles",
  },
  {
    pid: "157",
    type: "short",
    title:
      "Manga Text Detection and EN-VI Translation using a Pure Python Deep Learning Pipeline",
  },
];

// ── Combined (used for search + empty-state checks) ───────────────────────────

export const ACCEPTED_PAPERS: AcceptedPaper[] = [
  ...FULL_PAPERS,
  ...SHORT_PAPERS,
];