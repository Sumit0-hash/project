import React, { useState } from 'react';
import { BookOpen, CheckCircle, Play, Award, Lock, ChevronRight } from 'lucide-react';

// Learning module data
const modules = [
  {
    id: 1,
    title: 'Budgeting Basics',
    description: 'Learn how to create and maintain a budget that works for your lifestyle.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    level: 'Beginner',
    duration: '45 min',
    lessons: [
      { id: 101, title: 'Why Budgeting Matters', duration: '8 min', completed: true },
      { id: 102, title: 'Creating Your First Budget', duration: '12 min', completed: true },
      { id: 103, title: 'Tracking Expenses Effectively', duration: '10 min', completed: false },
      { id: 104, title: 'Adjusting Your Budget Over Time', duration: '8 min', completed: false },
      { id: 105, title: 'Budgeting Tools and Apps', duration: '7 min', completed: false }
    ],
    progress: 40
  },
  {
    id: 2,
    title: 'Debt Management',
    description: 'Strategies for managing and eliminating debt to improve your financial health.',
    image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    level: 'Intermediate',
    duration: '60 min',
    lessons: [
      { id: 201, title: 'Understanding Different Types of Debt', duration: '10 min', completed: true },
      { id: 202, title: 'Calculating Your Debt-to-Income Ratio', duration: '8 min', completed: false },
      { id: 203, title: 'Debt Repayment Strategies', duration: '15 min', completed: false },
      { id: 204, title: 'Negotiating with Creditors', duration: '12 min', completed: false },
      { id: 205, title: 'Avoiding Debt Traps', duration: '15 min', completed: false }
    ],
    progress: 20
  },
  {
    id: 3,
    title: 'Investing for Beginners',
    description: 'Learn the fundamentals of investing and how to start building wealth.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    level: 'Beginner',
    duration: '75 min',
    lessons: [
      { id: 301, title: 'Investment Basics', duration: '15 min', completed: false },
      { id: 302, title: 'Understanding Risk and Return', duration: '12 min', completed: false },
      { id: 303, title: 'Types of Investment Accounts', duration: '15 min', completed: false },
      { id: 304, title: 'Building a Diversified Portfolio', duration: '18 min', completed: false },
      { id: 305, title: 'Getting Started with Small Investments', duration: '15 min', completed: false }
    ],
    progress: 0
  },
  {
    id: 4,
    title: 'Retirement Planning',
    description: 'Prepare for a secure retirement with effective planning strategies.',
    image: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    level: 'Intermediate',
    duration: '90 min',
    lessons: [
      { id: 401, title: 'Retirement Needs Assessment', duration: '15 min', completed: false },
      { id: 402, title: 'Types of Retirement Accounts', duration: '20 min', completed: false },
      { id: 403, title: 'Social Security Benefits', duration: '15 min', completed: false },
      { id: 404, title: 'Creating a Retirement Timeline', duration: '20 min', completed: false },
      { id: 405, title: 'Adjusting Your Plan Over Time', duration: '20 min', completed: false }
    ],
    progress: 0
  },
  {
    id: 5,
    title: 'Tax Optimization',
    description: 'Strategies to legally minimize your tax burden and maximize your after-tax income.',
    image: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd29?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    level: 'Advanced',
    duration: '120 min',
    lessons: [
      { id: 501, title: 'Understanding Tax Brackets', duration: '15 min', completed: false },
      { id: 502, title: 'Deductions and Credits', duration: '25 min', completed: false },
      { id: 503, title: 'Tax-Advantaged Accounts', duration: '20 min', completed: false },
      { id: 504, title: 'Investment Tax Strategies', duration: '30 min', completed: false },
      { id: 505, title: 'Year-End Tax Planning', duration: '30 min', completed: false }
    ],
    progress: 0
  },
  {
    id: 6,
    title: 'Building Credit',
    description: 'Learn how to establish, improve, and maintain a strong credit score.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    level: 'Beginner',
    duration: '60 min',
    lessons: [
      { id: 601, title: 'Credit Score Fundamentals', duration: '12 min', completed: false },
      { id: 602, title: 'Factors That Impact Your Credit', duration: '15 min', completed: false },
      { id: 603, title: 'Building Credit from Scratch', duration: '10 min', completed: false },
      { id: 604, title: 'Improving a Damaged Credit Score', duration: '13 min', completed: false },
      { id: 605, title: 'Monitoring and Protecting Your Credit', duration: '10 min', completed: false }
    ],
    progress: 0
  }
];

// User achievements
const achievements = [
  { id: 1, title: 'First Module Completed', icon: 'BookOpen', earned: true, date: '2025-03-15' },
  { id: 2, title: 'Budget Master', icon: 'IndianRupee', earned: false },
  { id: 3, title: 'Investment Novice', icon: 'TrendingUp', earned: false },
  { id: 4, title: 'Quiz Champion', icon: 'Award', earned: true, date: '2025-03-20' },
  { id: 5, title: 'Consistent Learner', icon: 'Calendar', earned: false },
  { id: 6, title: 'Financial Guru', icon: 'Star', earned: false }
];

const LearningModules = () => {
  // State for active module and lesson
  const [activeModule, setActiveModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [showAchievements, setShowAchievements] = useState(false);
  
  // Filter modules by progress
  const inProgressModules = modules.filter(module => module.progress > 0 && module.progress < 100);
  const notStartedModules = modules.filter(module => module.progress === 0);
  const completedModules = modules.filter(module => module.progress === 100);
  
  // Handle module selection
  const handleModuleSelect = (moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    setActiveModule(module);
    setActiveLesson(null);
  };
  
  // Handle lesson selection
  const handleLessonSelect = (lessonId) => {
    if (!activeModule) return;
    
    const lesson = activeModule.lessons.find(l => l.id === lessonId);
    setActiveLesson(lesson);
  };
  
  // Close active module/lesson view
  const handleClose = () => {
    if (activeLesson) {
      setActiveLesson(null);
    } else {
      setActiveModule(null);
    }
  };
  
  // Toggle achievements view
  const toggleAchievements = () => {
    setShowAchievements(!showAchievements);
  };
  
  // Render module card
  const renderModuleCard = (module) => (
    <div 
      key={module.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => handleModuleSelect(module.id)}
    >
      <div className="h-40 overflow-hidden">
        <img 
          src={module.image} 
          alt={module.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{module.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            module.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            module.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {module.level}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{module.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            {module.lessons.length} lessons
          </span>
          <span>{module.duration}</span>
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${module.progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{module.progress}% complete</span>
            {module.progress > 0 && module.progress < 100 && (
              <span>In progress</span>
            )}
            {module.progress === 100 && (
              <span className="flex items-center text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render module detail view
  const renderModuleDetail = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 relative">
        <img 
          src={activeModule.image} 
          alt={activeModule.title} 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{activeModule.title}</h2>
          <span className={`text-xs px-2 py-1 rounded-full ${
            activeModule.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            activeModule.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {activeModule.level}
          </span>
        </div>
        
        <p className="text-gray-600 mb-6">{activeModule.description}</p>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Your Progress</h3>
            <span className="text-sm text-gray-500">{activeModule.progress}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${activeModule.progress}%` }}
            ></div>
          </div>
        </div>
        
        <h3 className="font-semibold mb-4">Lessons</h3>
        <div className="space-y-3">
          {activeModule.lessons.map((lesson, index) => (
            <div 
              key={lesson.id}
              onClick={() => handleLessonSelect(lesson.id)}
              className={`p-4 rounded-md flex items-center cursor-pointer ${
                lesson.completed 
                  ? 'bg-green-50 border border-green-100' 
                  : index === 0 || activeModule.lessons[index - 1].completed
                    ? 'bg-white border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50'
                    : 'bg-gray-50 border border-gray-200 opacity-70 cursor-not-allowed'
              }`}
            >
              <div className="mr-4 flex-shrink-0">
                {lesson.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : index === 0 || activeModule.lessons[index - 1].completed ? (
                  <Play className="h-6 w-6 text-indigo-500" />
                ) : (
                  <Lock className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{index + 1}. {lesson.title}</h4>
                <p className="text-sm text-gray-500">{lesson.duration}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  // Render lesson content
  const renderLessonContent = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <button 
          onClick={() => setActiveLesson(null)}
          className="flex items-center text-indigo-600 mb-4 hover:text-indigo-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to module
        </button>
        
        <h2 className="text-2xl font-bold mb-2">{activeLesson.title}</h2>
        <p className="text-gray-500 mb-6">Duration: {activeLesson.duration}</p>
        
        {/* Video placeholder */}
        <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center mb-6">
          <Play className="h-16 w-16 text-gray-400" />
        </div>
        
        {/* Lesson content placeholder */}
        <div className="prose max-w-none">
          <p>
            This is a placeholder for the lesson content. In a real application, this would contain the actual educational material including text, images, and interactive elements.
          </p>
          <h3>Key Learning Points</h3>
          <ul>
            <li>Important concept #1 related to {activeLesson.title}</li>
            <li>Important concept #2 related to {activeLesson.title}</li>
            <li>Important concept #3 related to {activeLesson.title}</li>
            <li>Important concept #4 related to {activeLesson.title}</li>
          </ul>
          <p>
            Additional explanatory text would go here, expanding on the concepts and providing examples.
          </p>
          <h3>Practical Application</h3>
          <p>
            Here's how you can apply these concepts in your own financial situation...
          </p>
        </div>
        
        {/* Quiz placeholder */}
        <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Knowledge Check</h3>
          <p className="mb-4">Test your understanding of the concepts covered in this lesson.</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Start Quiz
          </button>
        </div>
        
        {/* Next lesson button */}
        <div className="mt-8 flex justify-between">
          <button 
            onClick={() => setActiveLesson(null)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Save & Exit
          </button>
          
          <button 
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Mark as Complete
            <ChevronRight className="h-5 w-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
  
  // Render achievements
  const renderAchievements = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Achievements</h2>
        <button 
          onClick={toggleAchievements}
          className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
        >
          Back to Modules
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map(achievement => (
          <div 
            key={achievement.id}
            className={`p-4 rounded-lg border ${
              achievement.earned 
                ? 'border-yellow-200 bg-yellow-50' 
                : 'border-gray-200 bg-gray-50 opacity-60'
            }`}
          >
            <div className="flex items-center mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                achievement.earned ? 'bg-yellow-200' : 'bg-gray-200'
              }`}>
                <Award className={`h-6 w-6 ${
                  achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                }`} />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{achievement.title}</h3>
                {achievement.earned && (
                  <p className="text-xs text-gray-500">Earned on {achievement.date}</p>
                )}
              </div>
            </div>
            {!achievement.earned && (
              <p className="text-sm text-gray-500">Complete more modules to unlock</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!activeModule && !showAchievements ? (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Learning Modules</h1>
            <button 
              onClick={toggleAchievements}
              className="flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
            >
              <Award className="h-5 w-5 mr-2" />
              View Achievements
            </button>
          </div>
          
          {inProgressModules.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressModules.map(module => renderModuleCard(module))}
              </div>
            </div>
          )}
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Available Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notStartedModules.map(module => renderModuleCard(module))}
            </div>
          </div>
          
          {completedModules.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Completed Modules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedModules.map(module => renderModuleCard(module))}
              </div>
            </div>
          )}
        </>
      ) : activeModule && !activeLesson ? (
        renderModuleDetail()
      ) : activeModule && activeLesson ? (
        renderLessonContent()
      ) : (
        renderAchievements()
      )}
    </div>
  );
};

export default LearningModules;