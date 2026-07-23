import type { RoleApplied } from "./types";

export interface RoleOption {
  id: RoleApplied;
  title: string;
  description: string;
  amber?: boolean;
  badge?: string;
}

export const ROLE_OPTIONS: RoleOption[] = [
  {
    id: "Field Researcher",
    title: "Field Researcher",
    description:
      "Embed in clinical sites, run structured observation, and collect first-hand data on how care actually happens.",
  },
  {
    id: "Research Analyst",
    title: "Research Analyst",
    description:
      "Turn raw field data into structured findings — clean it, model it, and surface what matters.",
  },
  {
    id: "IoT / Hardware Engineer",
    title: "IoT / Hardware Engineer",
    description:
      "Hands-on electronics and embedded systems work — ESP32, sensor integration, circuit assembly. One specialized slot.",
    amber: true,
    badge: "1 slot",
  },
  {
    id: "Community Health Liaison",
    title: "Community Health Liaison",
    description:
      "Bridge the team and the community — interviews, trust-building, and translating context back to the group.",
  },
];

export const PROGRAMME_OPTIONS = [
  "BSc Software Engineering",
  "BSc International Business & Trade",
  "BSc Entrepreneurship",
  "BSc Global Challenges",
  "MBA",
  "ALX Programme",
  "Other",
];

export const HOURS_OPTIONS = [
  "5-10 hours/week",
  "10-15 hours/week",
  "15-20 hours/week",
  "20+ hours/week",
];

export interface SkillOption {
  label: string;
  amber?: boolean;
}

export const SKILL_OPTIONS: SkillOption[] = [
  { label: "Research & data collection" },
  { label: "Qualitative interviews" },
  { label: "Quantitative analysis" },
  { label: "IoT/Embedded systems", amber: true },
  { label: "Electronics/Hardware", amber: true },
  { label: "Community health" },
  { label: "Clinical exposure" },
  { label: "Data visualization" },
  { label: "Project management" },
  { label: "Writing & documentation" },
  { label: "Python/Coding" },
  { label: "French/Kinyarwanda" },
];

export type QuestionType = "mcq" | "text";

export interface AssessmentQuestion {
  id:
    | "q1_instinct"
    | "q2_conviction"
    | "q3_learning_style"
    | "q4_team_frustration"
    | "q5_problem_solving"
    | "q6_failure_response"
    | "q7_self_awareness"
    | "q8_hospital_observation"
    | "q9_most_alive"
    | "q10_interesting_system";
  type: QuestionType;
  badge: string;
  icon: "compass" | "megaphone" | "book-open" | "users" | "map" | "refresh-cw" | "user" | "stethoscope" | "heart" | "globe";
  question: string;
  options?: string[];
  placeholder?: string;
  required: boolean;
  backgroundImage?: string;
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "q1_instinct",
    type: "mcq",
    badge: "Instinct",
    icon: "compass",
    question: "When you encounter a broken system, what is your first move?",
    options: [
      "Observe quietly",
      "Ask questions immediately",
      "Look for patterns and precedent",
      "Try something even if it might be wrong",
    ],
    required: true,
  },
  {
    id: "q2_conviction",
    type: "mcq",
    badge: "Conviction",
    icon: "megaphone",
    question:
      "A team decision was made without your input and you disagree with it. What do you do?",
    options: [
      "Accept it and move on",
      "Raise it at the next meeting",
      "Speak up immediately even if disruptive",
      "Quietly test your alternative anyway",
    ],
    required: true,
  },
  {
    id: "q3_learning_style",
    type: "mcq",
    badge: "Learning style",
    icon: "book-open",
    question: "You learn best by:",
    options: [
      "Reading deeply and taking notes",
      "Doing it and failing first",
      "Watching someone excellent and copying",
      "Teaching others what you're still learning",
    ],
    required: true,
  },
  {
    id: "q4_team_frustration",
    type: "mcq",
    badge: "Team dynamics",
    icon: "users",
    question: "What frustrates you most on a team?",
    options: [
      "Slow decisions",
      "People who don't follow through",
      "Accepting a plan without questioning it",
      "Too much talking, not enough doing",
    ],
    required: true,
  },
  {
    id: "q5_problem_solving",
    type: "mcq",
    badge: "Problem-solving",
    icon: "map",
    question:
      "You have 48 hours to understand a topic you know nothing about. Where do you start?",
    options: [
      "Find the best paper/book",
      "Talk to 5 people who live the problem daily",
      "Map everything you don't understand",
      "Run a small imperfect experiment",
    ],
    required: true,
  },
  {
    id: "q6_failure_response",
    type: "mcq",
    badge: "Failure response",
    icon: "refresh-cw",
    question: "Something in a project keeps failing repeatedly. Your instinct is to:",
    options: [
      "Push harder with the same approach",
      "Change one variable at a time",
      "Look upstream at what's feeding the failure",
      "Question whether you should be doing this at all",
    ],
    required: true,
    backgroundImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "q7_self_awareness",
    type: "mcq",
    badge: "Self-awareness",
    icon: "user",
    question: "Which best describes how you operate on a team?",
    options: ["I execute", "I question", "I organize", "I connect people"],
    required: true,
  },
  {
    id: "q8_hospital_observation",
    type: "mcq",
    badge: "Field observation",
    icon: "stethoscope",
    question:
      "You are sitting in a hospital ward. You notice something that seems wrong — a routine the staff does every day that nobody questions. What do you do?",
    options: [
      "Write it down and observe more before acting",
      "Ask the nearest staff member right away",
      "Watch for the same pattern elsewhere in the ward",
      "Research whether this is standard practice elsewhere",
    ],
    required: true,
    backgroundImage:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "q9_most_alive",
    type: "text",
    badge: "Honesty",
    icon: "heart",
    question: 'Complete this sentence honestly: "I am most alive when..."',
    placeholder: "Not what you think we want to hear. What is actually true.",
    required: true,
  },
  {
    id: "q10_interesting_system",
    type: "text",
    badge: "Curiosity",
    icon: "globe",
    question:
      "What is the most interesting system you have ever observed or studied? It doesn't have to relate to health — a market, a city, a community, anything. What made it fascinating?",
    placeholder: "Optional — skip if nothing comes to mind.",
    required: false,
  },
];
