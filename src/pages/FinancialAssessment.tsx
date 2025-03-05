import React, { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

// Type definitions
interface Question {
  id: number;
  category: string;
  text: string;
  options: { value: number; text: string }[];
}

interface CategoryScores {
  [key: string]: { score: number; count: number };
}

// Questions
const questions: Question[] = [
  { id: 1, category: "Budgeting", text: "Do you have a monthly budget?", options: [
      { value: 4, text: "Yes, I track everything" },
      { value: 3, text: "Yes, but only major expenses" },
      { value: 2, text: "I have a rough idea but don't track" },
      { value: 1, text: "No, I don't have a budget" }
    ]},
  { id: 2, category: "Savings", text: "How much of your income do you save monthly?", options: [
      { value: 4, text: "More than 20%" },
      { value: 3, text: "10-20%" },
      { value: 2, text: "5-10%" },
      { value: 1, text: "Less than 5% or nothing" }
    ]},
  { id: 3, category: "Emergency Fund", text: "Do you have an emergency fund?", options: [
      { value: 4, text: "Yes, 6+ months of expenses" },
      { value: 3, text: "Yes, 3-6 months of expenses" },
      { value: 2, text: "Yes, but less than 3 months" },
      { value: 1, text: "No emergency fund" }
    ]},
  { id: 4, category: "Debt", text: "How would you describe your debt situation?", options: [
      { value: 4, text: "No debt other than mortgage" },
      { value: 3, text: "Some debt, but manageable" },
      { value: 2, text: "Significant debt, working to reduce" },
      { value: 1, text: "Overwhelming debt" }
    ]},
  { id: 5, category: "Retirement", text: "Are you saving for retirement?", options: [
      { value: 4, text: "Yes, maxing out retirement accounts" },
      { value: 3, text: "Yes, but not maxing out" },
      { value: 2, text: "Yes, but irregularly" },
      { value: 1, text: "Not currently saving for retirement" }
    ]},
  { id: 6, category: "Investing", text: "Do you invest in the stock market?", options: [
      { value: 4, text: "Yes, diversified investments" },
      { value: 3, text: "Yes, but only retirement accounts" },
      { value: 2, text: "Some investments but not regularly" },
      { value: 1, text: "No, I don’t invest" }
    ]},
  { id: 7, category: "Insurance", text: "Which types of insurance do you have?", options: [
      { value: 4, text: "Comprehensive (health, auto, home, life, disability)" },
      { value: 3, text: "Most essential (health, auto, home)" },
      { value: 2, text: "Only basic coverage" },
      { value: 1, text: "Minimal or no insurance" }
    ]},
  { id: 8, category: "Financial Knowledge", text: "How well do you understand personal finance?", options: [
      { value: 4, text: "Very knowledgeable" },
      { value: 3, text: "Good understanding" },
      { value: 2, text: "Some understanding" },
      { value: 1, text: "Limited understanding" }
    ]},
  { id: 9, category: "Financial Goals", text: "Do you have financial goals?", options: [
      { value: 4, text: "Yes, clear goals with plans" },
      { value: 3, text: "Yes, but general plans" },
      { value: 2, text: "Goals but no specific plans" },
      { value: 1, text: "No specific financial goals" }
    ]},
  { id: 10, category: "Credit", text: "How would you describe your credit score?", options: [
      { value: 4, text: "Excellent (740+)" },
      { value: 3, text: "Good (670-739)" },
      { value: 2, text: "Fair (580-669)" },
      { value: 1, text: "Poor (below 580) or don’t know" }
    ]},
  { id: 11, category: "Spending Habits", text: "How often do you make impulse purchases?", options: [
      { value: 4, text: "Rarely or never" },
      { value: 3, text: "Occasionally, but small amounts" },
      { value: 2, text: "Frequently for small amounts" },
      { value: 1, text: "Frequently, including large purchases" }
    ]},
  { id: 12, category: "Financial Stress", text: "How often do you worry about money?", options: [
      { value: 4, text: "Rarely or never" },
      { value: 3, text: "Occasionally" },
      { value: 2, text: "Frequently" },
      { value: 1, text: "Constantly" }
    ]}
];

const FinancialAssessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [assessmentComplete, setAssessmentComplete] = useState<boolean>(false);
  const [overallScore, setOverallScore] = useState<number | null>(null);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxPossibleScore = questions.length * 4;
    const percentageScore = (totalScore / maxPossibleScore) * 100;

    setOverallScore(percentageScore);
    setAssessmentComplete(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Financial Health Assessment</h1>

      {!assessmentComplete ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-1">{questions[currentQuestion].text}</h2>
          <p className="text-sm text-gray-500 mb-4">Category: {questions[currentQuestion].category}</p>

          {questions[currentQuestion].options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
              className="w-full text-left p-4 border border-gray-300 rounded-md hover:bg-indigo-50"
            >
              {option.text}
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-semibold mb-6">Your Financial Health Score</h2>
          <p className="text-5xl font-bold text-indigo-600">{Math.round(overallScore ?? 0)}%</p>
          <p className="text-gray-600 mt-2">Based on your responses to {questions.length} questions.</p>
        </div>
      )}
    </div>
  );
};

export default FinancialAssessment;
