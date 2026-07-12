export const scenarios = [
  {
    id: "loan",
    label: "Loan Application",
    decisionType: "loan approval",
    sampleData:
      "Applicant: 29 years old, credit score 640, income $42,000/yr, 2 years at current job, requesting $15,000 auto loan, one late payment 8 months ago.",
    sliders: [
      { key: "creditScore", label: "Credit Score", min: 500, max: 800, default: 640, step: 10 },
      { key: "income", label: "Annual Income ($)", min: 20000, max: 100000, default: 42000, step: 1000 },
    ],
    buildData: (v) =>
      `Applicant: 29 years old, credit score ${v.creditScore}, income $${v.income}/yr, 2 years at current job, requesting $15,000 auto loan, one late payment 8 months ago.`,
  },
  {
    id: "admission",
    label: "College Admission",
    decisionType: "college admission",
    sampleData:
      "Applicant: GPA 3.4, SAT 1180, first-generation college student, strong extracurriculars in community service, attends underfunded public school, no AP classes offered at school.",
    sliders: [
      { key: "gpa", label: "GPA", min: 2.0, max: 4.0, default: 3.4, step: 0.1 },
      { key: "sat", label: "SAT Score", min: 900, max: 1600, default: 1180, step: 10 },
    ],
    buildData: (v) =>
      `Applicant: GPA ${v.gpa}, SAT ${v.sat}, first-generation college student, strong extracurriculars in community service, attends underfunded public school, no AP classes offered at school.`,
  },
  {
    id: "hiring",
    label: "Job Hiring",
    decisionType: "hiring",
    sampleData:
      "Candidate: 5 years experience, employment gap of 14 months (parental leave), strong technical interview score, non-traditional resume format, applied via referral.",
    sliders: [
      { key: "experience", label: "Years of Experience", min: 0, max: 15, default: 5, step: 1 },
      { key: "gapMonths", label: "Employment Gap (months)", min: 0, max: 24, default: 14, step: 1 },
    ],
    buildData: (v) =>
      `Candidate: ${v.experience} years experience, employment gap of ${v.gapMonths} months (parental leave), strong technical interview score, non-traditional resume format, applied via referral.`,
  },
];