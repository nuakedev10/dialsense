export type RoleApplied =
  | "Field Researcher"
  | "Research Analyst"
  | "IoT / Hardware Engineer"
  | "Community Health Liaison";

export type ApplicantStatus = "new" | "shortlisted" | "rejected" | "accepted";

export interface ApplicantInput {
  full_name: string;
  email: string;
  whatsapp: string;
  programme: string;
  year_of_study: string;
  nationality: string;
  hours_per_week: string;
  portfolio_url: string;
  role_applied: RoleApplied;
  skills: string[];
  motivation_sentence: string;

  q1_instinct: string;
  q2_conviction: string;
  q3_learning_style: string;
  q4_team_frustration: string;
  q5_problem_solving: string;
  q6_failure_response: string;
  q7_self_awareness: string;
  q8_hospital_observation: string;
  q9_most_alive: string;
  q10_interesting_system: string;
}

export interface Applicant extends ApplicantInput {
  id: string;
  created_at: string;
  reviewer_score: number | null;
  reviewer_notes: string | null;
  status: ApplicantStatus;
}
