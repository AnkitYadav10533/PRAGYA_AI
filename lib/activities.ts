/**
 * PRAGYA — Remedial Activity Bank
 * Owner: ABHAY (Engine)
 * 
 * Rules:
 * 1. Deterministic activity bank linked directly to diagnostic error signatures.
 * 2. Employs Concrete -> Representational -> Abstract (CPA) pedagogy.
 * 3. Includes step-by-step teacher prompts and physical material requirements.
 */

import { RemedialActivity, SubtractionErrorType } from './types';

export const REMEDIAL_ACTIVITIES: RemedialActivity[] = [
  {
    id: 'borrow-and-build',
    title: 'Borrow & Build (Tens Decrement Focus)',
    targetedError: 'borrowed_without_decrement',
    durationMinutes: 10,
    objective: 'Practice physically exchanging one ten for ten ones and writing the decremented tens digit before performing ones subtraction.',
    description:
      'A tactile CPA intervention using base-10 blocks where students physically move a tens rod to the ones mat, cross out the tens digit, and decrement it by 1 prior to subtraction.',
    materials: [
      'Base-10 Tens Rods (Dienes blocks)',
      'Base-10 Ones Cubes',
      'Two-Column Place Value Mat (Tens | Ones)',
      'Dry-erase marker and eraser',
    ],
    pedagogy: 'Concrete → Representational → Abstract (CPA)',
    instructions: [
      'Build the top number (minuend) using tens rods and ones cubes on the place value mat.',
      'Check if ones cubes are sufficient to subtract the bottom number ones digit.',
      'Physically exchange 1 tens rod for 10 ones cubes; slide them into the ones section.',
      'IMMEDIATELY record the change on paper: cross out top tens digit and write the new value (e.g. 8 becomes 7).',
      'Remove subtrahend ones cubes, then remove subtrahend tens rods. Count the remaining difference.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Build the Minuend (Concrete)',
        instruction: 'Ask the student to place tens rods and ones cubes for the minuend on the mat (e.g., 8 tens rods and 3 ones cubes for 83).',
        teacherPrompt: 'Show me 83 on your mat. How many tens rods? How many ones cubes?',
      },
      {
        stepNumber: 2,
        title: 'Step 2: Inspect Ones Column & Regroup Need',
        instruction: 'Ask the student to take away 7 ones from the 3 ones currently on the mat.',
        teacherPrompt: 'We need to take away 7 ones. Do we have enough ones cubes? What must we do?',
      },
      {
        stepNumber: 3,
        title: 'Step 3: Physical Exchange & Explicit Tens Decrement',
        instruction: 'Take 1 tens rod from the tens column and trade it for 10 ones cubes. Before doing any subtraction, write the new tens count on the board/mat.',
        teacherPrompt: 'We took away 1 tens rod. How many tens rods remain? (7!). Write 7 above the 8 right now so we do not forget!',
      },
      {
        stepNumber: 4,
        title: 'Step 4: Subtract Ones Then Tens (Abstract Check)',
        instruction: 'Count total ones (13), subtract 7 ones (leaves 6). Then subtract 4 tens from the remaining 7 tens (leaves 3 tens). Total: 36.',
        teacherPrompt: '13 minus 7 gives us 6. Now 7 tens minus 4 tens leaves 3 tens. What is our final answer? 36!',
      },
    ],
  },
  {
    id: 'place-value-mats',
    title: 'Top-to-Bottom Place Value Mat (Minuend Directionality)',
    targetedError: 'smaller_from_larger_ones',
    durationMinutes: 10,
    objective: 'Reinforce minuend quantity preservation and correct vertical directionality to eliminate reverse subtraction.',
    description:
      'Addresses place-value confusion where students subtract top smaller ones from bottom larger ones (e.g., 7 - 3 = 4 in 83 - 47). Enforces top-to-bottom subtraction flow.',
    materials: [
      'Two-Color Directional Arrow Place Value Mat',
      'Place Value Counters (Tens & Ones)',
      'Color-Coded Subtraction Cards',
    ],
    pedagogy: 'Representational → Abstract (CPA)',
    instructions: [
      'Place the starting amount (minuend) in the designated top shelf of the mat.',
      'Trace the vertical arrow from top to bottom.',
      'Explain that subtraction means taking away FROM the top amount.',
      'If the top ones amount is smaller than the bottom ones amount, the student must trade 1 ten before subtracting.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Top Shelf Setup',
        instruction: 'Have the student place counters representing the top number in the top row only.',
        teacherPrompt: 'The number on top is what we start with. Can we take 7 cookies if we only have 3 on the plate?',
      },
      {
        stepNumber: 2,
        title: 'Step 2: Directional Arrow Tracking',
        instruction: 'Guide the student finger along the downward arrow from the 3 to the 7.',
        teacherPrompt: 'We always subtract top minus bottom. We never flip the numbers backwards!',
      },
      {
        stepNumber: 3,
        title: 'Step 3: Trade & Solve',
        instruction: 'Guide student through trading 1 ten into 10 ones, making 13, and then subtracting downward.',
        teacherPrompt: 'Now that we have 13 on top, take away 7. How many are left?',
      },
    ],
  },
  {
    id: 'fluency-ladder',
    title: 'Teens Subtraction Fluency Ladder',
    targetedError: 'calculation_error',
    durationMinutes: 8,
    objective: 'Develop automaticity and accuracy in single-digit subtraction facts within 11–18 (e.g. 13 - 7, 11 - 8, 14 - 6).',
    description:
      'Targeted basic arithmetic fact practice using partitioning through 10 (e.g., 13 - 7 = 13 - 3 - 4 = 6) to eliminate calculation recall slips.',
    materials: [
      'Double Ten-Frames',
      'Two-Color Counters',
      'Fact Family Flashcards (11–18)',
    ],
    pedagogy: 'Representational → Abstract Fluency',
    instructions: [
      'Show minuend (e.g. 13) on double ten-frames (1 full ten-frame + 3 on second frame).',
      'Step 1: Remove the 3 counters on the second frame to reach a clean 10.',
      'Step 2: Remove the remaining 4 counters from the full 10-frame to reach 6.',
      'Fast-paced partner flashcard practice.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Bridge to Ten Model',
        instruction: 'Deconstruct subtrahend into two parts: one to reach 10, and the remainder.',
        teacherPrompt: 'To subtract 7 from 13: first take away 3 to make 10. How many more do we need to take away to make 7? (4!). What is 10 minus 4? (6!).',
      },
      {
        stepNumber: 2,
        title: 'Step 2: Rapid Drill Pairing',
        instruction: 'Cycle through flashcards for 3 minutes focusing on regrouping subtraction facts.',
        teacherPrompt: 'What is 13 minus 7? What is 11 minus 8? What is 14 minus 6?',
      },
    ],
  },
  {
    id: 'subtraction-mastery',
    title: 'Mastery & Multi-Step Subtraction Challenges',
    targetedError: 'no_error',
    durationMinutes: 10,
    objective: 'Extend subtraction fluency to multi-step word problems, money transactions, and peer error analysis.',
    description:
      'Enrichment activities for students who have demonstrated mastery of 2-digit subtraction with regrouping.',
    materials: [
      'Classroom Store Menu & Price Cards',
      'Play Money / Currency Slips',
      '"Error Detective" Challenge Worksheets',
    ],
    pedagogy: 'Abstract & Applied Problem Solving',
    instructions: [
      'Students act as cashier and customer calculating change for 2-digit transactions.',
      'Solve "Error Detective" cards to explain why fictional students made specific regrouping slips.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Step 1: Error Detective',
        instruction: 'Present the demo case 83 - 47 = 46 to the student. Ask them to explain the mistake.',
        teacherPrompt: 'Look at this work: 83 − 47 = 46. What mistake did the student make? How would you explain it to help them?',
      },
      {
        stepNumber: 2,
        title: 'Step 2: Real-World Money Problem',
        instruction: 'Have student calculate change from ₹90 after buying an item priced at ₹57.',
        teacherPrompt: 'You have ₹90 and buy a book for ₹57. How much change should you get back?',
      },
    ],
  },
];

export function getRemedialActivities(): RemedialActivity[] {
  return [...REMEDIAL_ACTIVITIES];
}

export function getActivityById(id: string): RemedialActivity | undefined {
  return REMEDIAL_ACTIVITIES.find((a) => a.id === id);
}

export function getActivityForError(errorType: SubtractionErrorType): RemedialActivity {
  switch (errorType) {
    case 'borrowed_without_decrement':
    case 'over_decrement':
    case 'regrouping_misalignment':
      return REMEDIAL_ACTIVITIES[0]; // borrow-and-build
    case 'smaller_from_larger_ones':
      return REMEDIAL_ACTIVITIES[1]; // place-value-mats
    case 'calculation_error':
      return REMEDIAL_ACTIVITIES[2]; // fluency-ladder
    case 'no_error':
    default:
      return REMEDIAL_ACTIVITIES[3]; // subtraction-mastery
  }
}
