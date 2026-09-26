/**
 * PRAGYA — Deterministic Seeded Demo Data
 * Owner: ABHAY (Engine)
 * 
 * Rules:
 * 1. 100% deterministic demo data (no random generation).
 * 2. 1 class, 30 students, 5 fixed assessment questions.
 * 3. Primary demo case: Roll 1 Aarav Patel answering 83 - 47 = 46.
 * 4. Realistic distribution across Regrouping, Place Value, Fact Fluency, and Mastery.
 * 5. Contains baseline assessment responses, diagnostic results, groups, and reassessments.
 * 6. Explicitly labelled as seeded demo data.
 */

import {
  analyzeResponse,
  calculateClassGapSummary,
  FIXED_ASSESSMENT_ITEMS,
  generateDiagnosis,
  generateGroups,
} from './engine';
import {
  AssessmentSubmission,
  ClassGapSummary,
  ClassRoom,
  Diagnosis,
  ReassessmentRecord,
  RemedialGroup,
  Student,
  StudentResponse,
} from './types';

export const IS_SEEDED_DEMO_DATA = true;

// =========================================================================
// 1. CLASSROOM PROFILE
// =========================================================================

export const SEED_CLASS: ClassRoom = {
  id: 'class-3a',
  name: 'Class 3-A',
  grade: 'Grade 3',
  section: 'A',
  subject: 'Mathematics (FLN Subtraction)',
  teacherName: 'Sunita Sharma',
  academicYear: '2026-2027',
  totalStudents: 30,
};

// =========================================================================
// 2. 30 STUDENTS
// =========================================================================

export const SEED_STUDENTS: Student[] = [
  // Regrouping Gap Group (Target: borrowed_without_decrement) - 8 students
  { id: 's-01', name: 'Aarav Patel', rollNumber: 1, classId: 'class-3a', gender: 'M', status: 'verified' },
  { id: 's-02', name: 'Priya Singh', rollNumber: 2, classId: 'class-3a', gender: 'F', status: 'diagnosed' },
  { id: 's-03', name: 'Rohan Verma', rollNumber: 3, classId: 'class-3a', gender: 'M', status: 'reassessed' },
  { id: 's-04', name: 'Ananya Gupta', rollNumber: 4, classId: 'class-3a', gender: 'F', status: 'grouped' },
  { id: 's-05', name: 'Vikram Malhotra', rollNumber: 5, classId: 'class-3a', gender: 'M', status: 'intervened' },
  { id: 's-06', name: 'Sneha Nair', rollNumber: 6, classId: 'class-3a', gender: 'F', status: 'diagnosed' },
  { id: 's-07', name: 'Aditya Joshi', rollNumber: 7, classId: 'class-3a', gender: 'M', status: 'grouped' },
  { id: 's-08', name: 'Meera Iyer', rollNumber: 8, classId: 'class-3a', gender: 'F', status: 'reassessed' },

  // Directionality / Place Value Group (Target: smaller_from_larger_ones) - 7 students
  { id: 's-09', name: 'Rahul Sen', rollNumber: 9, classId: 'class-3a', gender: 'M', status: 'reassessed' },
  { id: 's-10', name: 'Divya Shah', rollNumber: 10, classId: 'class-3a', gender: 'F', status: 'diagnosed' },
  { id: 's-11', name: 'Arjun Das', rollNumber: 11, classId: 'class-3a', gender: 'M', status: 'grouped' },
  { id: 's-12', name: 'Pooja Mehta', rollNumber: 12, classId: 'class-3a', gender: 'F', status: 'intervened' },
  { id: 's-13', name: 'Karan Kapoor', rollNumber: 13, classId: 'class-3a', gender: 'M', status: 'diagnosed' },
  { id: 's-14', name: 'Ishita Roy', rollNumber: 14, classId: 'class-3a', gender: 'F', status: 'reassessed' },
  { id: 's-15', name: 'Siddharth Rao', rollNumber: 15, classId: 'class-3a', gender: 'M', status: 'grouped' },

  // Calculation Recall Slip Group (Target: calculation_error) - 5 students
  { id: 's-16', name: 'Neha Choudhury', rollNumber: 16, classId: 'class-3a', gender: 'F', status: 'reassessed' },
  { id: 's-17', name: 'Varun Nair', rollNumber: 17, classId: 'class-3a', gender: 'M', status: 'diagnosed' },
  { id: 's-18', name: 'Riya Sharma', rollNumber: 18, classId: 'class-3a', gender: 'F', status: 'grouped' },
  { id: 's-19', name: 'Aman Khan', rollNumber: 19, classId: 'class-3a', gender: 'M', status: 'intervened' },
  { id: 's-20', name: 'Tanvi Bhatia', rollNumber: 20, classId: 'class-3a', gender: 'F', status: 'diagnosed' },

  // Mastery Group (Target: no_error) - 10 students
  { id: 's-21', name: 'Aditi Mishra', rollNumber: 21, classId: 'class-3a', gender: 'F', status: 'verified' },
  { id: 's-22', name: 'Kabir Das', rollNumber: 22, classId: 'class-3a', gender: 'M', status: 'verified' },
  { id: 's-23', name: 'Sanya Reddy', rollNumber: 23, classId: 'class-3a', gender: 'F', status: 'verified' },
  { id: 's-24', name: 'Kunal Bansal', rollNumber: 24, classId: 'class-3a', gender: 'M', status: 'verified' },
  { id: 's-25', name: 'Shruti Pillai', rollNumber: 25, classId: 'class-3a', gender: 'F', status: 'verified' },
  { id: 's-26', name: 'Deepak Tiwari', rollNumber: 26, classId: 'class-3a', gender: 'M', status: 'verified' },
  { id: 's-27', name: 'Kriti Saxena', rollNumber: 27, classId: 'class-3a', gender: 'F', status: 'verified' },
  { id: 's-28', name: 'Yashvardhan Singh', rollNumber: 28, classId: 'class-3a', gender: 'M', status: 'verified' },
  { id: 's-29', name: 'Pallavi Patil', rollNumber: 29, classId: 'class-3a', gender: 'F', status: 'verified' },
  { id: 's-30', name: 'Harsh Vardhan', rollNumber: 30, classId: 'class-3a', gender: 'M', status: 'verified' },
];

// =========================================================================
// 3. STUDENT RESPONSES GENERATOR (DETERMINISTIC)
// =========================================================================

// Fixed answer keys for reference:
// Q1: 52 - 27 = 25 (warmup)
// Q2: 71 - 38 = 33
// Q3: 83 - 47 = 36 [Demo: 46 = borrow without decrement, 44 = smaller from larger]
// Q4: 64 - 26 = 38 [48 = borrow without decrement, 42 = smaller from larger]
// Q5: 92 - 57 = 35 [45 = borrow without decrement, 45 = smaller from larger]

function generateDeterministicResponsesForStudent(studentId: string): StudentResponse[] {
  // s-01: PRIMARY DEMO STUDENT (Aarav Patel)
  // Writes: Q1=25 (correct), Q2=33 (correct), Q3=46 (DEMO CASE), Q4=38 (correct), Q5=45 (borrow without decrement)
  if (studentId === 's-01') {
    return [
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[0], 25, 18),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[1], 33, 24),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[2], 46, 32), // DEMO CASE: 83 - 47 = 46
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[3], 38, 22),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[4], 45, 29), // 92 - 57 = 45 (9-5=4, 12-7=5)
    ];
  }

  // Regrouping errors: s-02 to s-08
  if (['s-02', 's-03', 's-04', 's-05', 's-06', 's-07', 's-08'].includes(studentId)) {
    return [
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[0], 25, 20),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[1], 43, 28), // 71 - 38 = 43 (7-3=4, 11-8=3)
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[2], 46, 35), // 83 - 47 = 46
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[3], 48, 26), // 64 - 26 = 48 (6-2=4, 14-6=8)
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[4], 35, 25), // correct
    ];
  }

  // Smaller from larger ones: s-09 to s-15
  if (['s-09', 's-10', 's-11', 's-12', 's-13', 's-14', 's-15'].includes(studentId)) {
    return [
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[0], 25, 22),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[1], 47, 30), // 71 - 38 = 47 (7-3=4, 8-1=7)
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[2], 44, 34), // 83 - 47 = 44 (8-4=4, 7-3=4)
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[3], 42, 28), // 64 - 26 = 42 (6-2=4, 6-4=2)
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[4], 35, 24), // correct
    ];
  }

  // Calculation slips: s-16 to s-20
  if (['s-16', 's-17', 's-18', 's-19', 's-20'].includes(studentId)) {
    return [
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[0], 25, 19),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[1], 34, 25), // 71 - 38: slip by +1
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[2], 36, 27), // correct
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[3], 37, 24), // 64 - 26: slip by -1
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[4], 35, 23), // correct
    ];
  }

  // Mastery (All correct): s-21 to s-30
  return [
    analyzeResponse(FIXED_ASSESSMENT_ITEMS[0], 25, 14),
    analyzeResponse(FIXED_ASSESSMENT_ITEMS[1], 33, 18),
    analyzeResponse(FIXED_ASSESSMENT_ITEMS[2], 36, 20),
    analyzeResponse(FIXED_ASSESSMENT_ITEMS[3], 38, 17),
    analyzeResponse(FIXED_ASSESSMENT_ITEMS[4], 35, 19),
  ];
}

// =========================================================================
// 4. ASSESSMENT SUBMISSIONS
// =========================================================================

export const SEED_SUBMISSIONS: AssessmentSubmission[] = SEED_STUDENTS.map((student) => {
  const responses = generateDeterministicResponsesForStudent(student.id);
  const correctCount = responses.filter((r) => r.isCorrect).length;
  return {
    id: `sub-${student.id}-baseline`,
    studentId: student.id,
    classId: 'class-3a',
    type: 'baseline',
    responses,
    correctCount,
    totalCount: 5,
    submittedAt: '2026-09-26T09:30:00.000Z',
  };
});

// =========================================================================
// 5. DIAGNOSTIC RESULTS
// =========================================================================

export const SEED_DIAGNOSES: Diagnosis[] = SEED_SUBMISSIONS.map((sub) => {
  const diagnosis = generateDiagnosis(sub.studentId, sub.id, sub.responses);

  // Set teacher decisions for seeded students to reflect workflow statuses
  if (['s-01', 's-21', 's-22', 's-23', 's-24', 's-25', 's-26', 's-27', 's-28', 's-29', 's-30'].includes(sub.studentId)) {
    diagnosis.teacherDecision = {
      status: 'accepted',
      decidedAt: '2026-09-26T09:45:00.000Z',
      notes: 'Confirmed by teacher Sunita Sharma.',
    };
    diagnosis.finalVerdict = diagnosis.suggestedVerdict;
  } else if (['s-03', 's-08', 's-09', 's-14', 's-16'].includes(sub.studentId)) {
    diagnosis.teacherDecision = {
      status: 'accepted',
      decidedAt: '2026-09-26T09:40:00.000Z',
      notes: 'Confirmed for targeted intervention.',
    };
    diagnosis.finalVerdict = diagnosis.suggestedVerdict;
  }

  return diagnosis;
});

// =========================================================================
// 6. REMEDIAL GROUPS
// =========================================================================

export const SEED_GROUPS: RemedialGroup[] = generateGroups(
  SEED_STUDENTS,
  SEED_DIAGNOSES,
  'class-3a'
);

// =========================================================================
// 7. REASSESSMENT RECORDS (Progress Verification)
// =========================================================================

export const SEED_REASSESSMENTS: ReassessmentRecord[] = [
  // Rohan Verma (s-03): Before 2/5 (40%) -> After 5/5 (100%)
  {
    id: 'reassess-s03',
    studentId: 's-03',
    groupId: 'group-regrouping-class-3a',
    beforeCorrectCount: 2,
    beforeTotalCount: 5,
    afterCorrectCount: 5,
    afterTotalCount: 5,
    responses: [
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[0], 25, 15),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[1], 33, 19),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[2], 36, 21),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[3], 38, 18),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[4], 35, 20),
    ],
    isImproved: true,
    isMastered: true,
    completedAt: '2026-09-26T10:15:00.000Z',
  },
  // Meera Iyer (s-08): Before 2/5 (40%) -> After 4/5 (80%)
  {
    id: 'reassess-s08',
    studentId: 's-08',
    groupId: 'group-regrouping-class-3a',
    beforeCorrectCount: 2,
    beforeTotalCount: 5,
    afterCorrectCount: 4,
    afterTotalCount: 5,
    responses: [
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[0], 25, 16),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[1], 33, 20),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[2], 36, 22),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[3], 38, 19),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[4], 36, 21), // off by 1
    ],
    isImproved: true,
    isMastered: true,
    completedAt: '2026-09-26T10:20:00.000Z',
  },
  // Rahul Sen (s-09): Before 2/5 (40%) -> After 5/5 (100%)
  {
    id: 'reassess-s09',
    studentId: 's-09',
    groupId: 'group-placevalue-class-3a',
    beforeCorrectCount: 2,
    beforeTotalCount: 5,
    afterCorrectCount: 5,
    afterTotalCount: 5,
    responses: [
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[0], 25, 14),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[1], 33, 17),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[2], 36, 19),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[3], 38, 16),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[4], 35, 18),
    ],
    isImproved: true,
    isMastered: true,
    completedAt: '2026-09-26T10:22:00.000Z',
  },
  // Ishita Roy (s-14): Before 2/5 (40%) -> After 4/5 (80%)
  {
    id: 'reassess-s14',
    studentId: 's-14',
    groupId: 'group-placevalue-class-3a',
    beforeCorrectCount: 2,
    beforeTotalCount: 5,
    afterCorrectCount: 4,
    afterTotalCount: 5,
    responses: [
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[0], 25, 15),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[1], 33, 19),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[2], 36, 20),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[3], 38, 18),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[4], 45, 23), // remaining slip
    ],
    isImproved: true,
    isMastered: true,
    completedAt: '2026-09-26T10:25:00.000Z',
  },
  // Neha Choudhury (s-16): Before 3/5 (60%) -> After 5/5 (100%)
  {
    id: 'reassess-s16',
    studentId: 's-16',
    groupId: 'group-calculation-class-3a',
    beforeCorrectCount: 3,
    beforeTotalCount: 5,
    afterCorrectCount: 5,
    afterTotalCount: 5,
    responses: [
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[0], 25, 12),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[1], 33, 16),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[2], 36, 17),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[3], 38, 15),
      analyzeResponse(FIXED_ASSESSMENT_ITEMS[4], 35, 16),
    ],
    isImproved: true,
    isMastered: true,
    completedAt: '2026-09-26T10:28:00.000Z',
  },
];

// =========================================================================
// 8. CLASS GAP SUMMARY
// =========================================================================

export const SEED_CLASS_GAP_SUMMARY: ClassGapSummary = calculateClassGapSummary(
  'class-3a',
  SEED_STUDENTS,
  SEED_DIAGNOSES
);

// =========================================================================
// 9. HELPER QUERY FUNCTIONS FOR CONSUMERS
// =========================================================================

export function getMockClass(): ClassRoom {
  return { ...SEED_CLASS };
}

export function getMockStudents(): Student[] {
  return [...SEED_STUDENTS];
}

export function getMockSubmissions(): AssessmentSubmission[] {
  return [...SEED_SUBMISSIONS];
}

export function getMockDiagnoses(): Diagnosis[] {
  return [...SEED_DIAGNOSES];
}

export function getMockGroups(): RemedialGroup[] {
  return [...SEED_GROUPS];
}

export function getMockReassessments(): ReassessmentRecord[] {
  return [...SEED_REASSESSMENTS];
}

export function getMockClassGapSummary(): ClassGapSummary {
  return { ...SEED_CLASS_GAP_SUMMARY };
}

export function getDemoStudentData() {
  const student = SEED_STUDENTS[0]; // Aarav Patel (Roll 1)
  const submission = SEED_SUBMISSIONS[0];
  const diagnosis = SEED_DIAGNOSES[0];
  return {
    student,
    submission,
    responses: submission.responses,
    diagnosis,
  };
}
