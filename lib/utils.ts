import {
  calculateClassGapSummary,
} from './engine';
import {
  SEED_CLASS,
  SEED_DIAGNOSES,
  SEED_GROUPS,
  SEED_REASSESSMENTS,
  SEED_STUDENTS,
  SEED_SUBMISSIONS,
} from './mock';
import {
  AssessmentSubmission,
  ClassGapSummary,
  ClassRoom,
  Diagnosis,
  ReassessmentRecord,
  RemedialGroup,
  Student,
} from './types';

export { cn } from 'cn';

// =========================================================================
// LOCAL STORAGE KEYS (Single source of state persistence)
// =========================================================================

const STORAGE_KEYS = {
  STUDENTS: 'pragya_students_v1',
  DIAGNOSES: 'pragya_diagnoses_v1',
  SUBMISSIONS: 'pragya_submissions_v1',
  GROUPS: 'pragya_groups_v1',
  REASSESSMENTS: 'pragya_reassessments_v1',
  CLASS: 'pragya_class_v1',
};

function isClient(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function getItem<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (!isClient()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
}

// =========================================================================
// DATA ACCESS & MUTATION HELPERS
// =========================================================================

export function getStoredClass(): ClassRoom {
  return getItem<ClassRoom>(STORAGE_KEYS.CLASS, SEED_CLASS);
}

export function getStoredStudents(): Student[] {
  return getItem<Student[]>(STORAGE_KEYS.STUDENTS, SEED_STUDENTS);
}

export function saveStoredStudents(students: Student[]): void {
  setItem(STORAGE_KEYS.STUDENTS, students);
}

export function updateStudentStatus(studentId: string, status: Student['status']): void {
  const students = getStoredStudents();
  const updated = students.map((s) => (s.id === studentId ? { ...s, status } : s));
  saveStoredStudents(updated);
}

export function getStoredSubmissions(): AssessmentSubmission[] {
  return getItem<AssessmentSubmission[]>(STORAGE_KEYS.SUBMISSIONS, SEED_SUBMISSIONS);
}

export function saveStoredSubmission(submission: AssessmentSubmission): void {
  const current = getStoredSubmissions();
  const index = current.findIndex((s) => s.studentId === submission.studentId);
  const updated = index >= 0 ? current.map((s, i) => (i === index ? submission : s)) : [submission, ...current];
  setItem(STORAGE_KEYS.SUBMISSIONS, updated);
}

export function getStoredDiagnoses(): Diagnosis[] {
  return getItem<Diagnosis[]>(STORAGE_KEYS.DIAGNOSES, SEED_DIAGNOSES);
}

export function saveStoredDiagnosis(diagnosis: Diagnosis): void {
  const current = getStoredDiagnoses();
  const index = current.findIndex((d) => d.studentId === diagnosis.studentId);
  const updated = index >= 0 ? current.map((d, i) => (i === index ? diagnosis : d)) : [diagnosis, ...current];
  setItem(STORAGE_KEYS.DIAGNOSES, updated);
}

export function getStoredGroups(): RemedialGroup[] {
  return getItem<RemedialGroup[]>(STORAGE_KEYS.GROUPS, SEED_GROUPS);
}

export function saveStoredGroups(groups: RemedialGroup[]): void {
  setItem(STORAGE_KEYS.GROUPS, groups);
}

export function getStoredReassessments(): ReassessmentRecord[] {
  return getItem<ReassessmentRecord[]>(STORAGE_KEYS.REASSESSMENTS, SEED_REASSESSMENTS);
}

export function saveStoredReassessment(record: ReassessmentRecord): void {
  const current = getStoredReassessments();
  const index = current.findIndex((r) => r.studentId === record.studentId);
  const updated = index >= 0 ? current.map((r, i) => (i === index ? record : r)) : [record, ...current];
  setItem(STORAGE_KEYS.REASSESSMENTS, updated);
}

export function getStoredClassGapSummary(): ClassGapSummary {
  const students = getStoredStudents();
  const diagnoses = getStoredDiagnoses();
  return calculateClassGapSummary(SEED_CLASS.id, students, diagnoses);
}

export function resetPragyaStorage(): void {
  if (!isClient()) return;
  window.localStorage.removeItem(STORAGE_KEYS.CLASS);
  window.localStorage.removeItem(STORAGE_KEYS.STUDENTS);
  window.localStorage.removeItem(STORAGE_KEYS.DIAGNOSES);
  window.localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
  window.localStorage.removeItem(STORAGE_KEYS.GROUPS);
  window.localStorage.removeItem(STORAGE_KEYS.REASSESSMENTS);
}
