import type { ApplicantInput } from "./types";

export type Page1Data = Pick<
  ApplicantInput,
  | "full_name"
  | "email"
  | "whatsapp"
  | "programme"
  | "year_of_study"
  | "nationality"
  | "hours_per_week"
  | "portfolio_url"
  | "role_applied"
  | "skills"
  | "motivation_sentence"
>;

const KEY = "dialsense_apply_page1";

export function savePage1Data(data: Page1Data) {
  sessionStorage.setItem(KEY, JSON.stringify(data));
}

export function loadPage1Data(): Page1Data | null {
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Page1Data;
  } catch {
    return null;
  }
}

export function clearPage1Data() {
  sessionStorage.removeItem(KEY);
}
