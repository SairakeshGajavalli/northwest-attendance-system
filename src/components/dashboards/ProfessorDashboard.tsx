import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';
import CourseDetailsModal from '../modals/CourseDetailsModal';
import { useState } from 'react';

// Mock data for assigned courses with attendance history
const mockCourses = [
  { 
    id: 1, 
    code: 'CS101', 
    name: 'Introduction to Programming',
    students: 45,
    schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
    enrolledStudents: [
      { id: 1, name: 'Alice Johnson', attendance: 85 },
      { id: 2, name: 'Bob Wilson', attendance: 92 },
      { id: 3, name: 'Carol Smith', attendance: 78 }
    ],
    attendanceHistory: [
      { date: '2024-02-01', present: 42, total: 45 },
      { date: '2024-02-03', present: 40, total: 45 },
      { date: '2024-02-06', present: 43, total: 45 },
      { date: '2024-02-08', present: 41, total: 45 },
      { date: '2024-02-10', present: 44, total: 45 }
    ]
  },
  { 
    id: 2, 
    code: 'CS201', 
    name: 'Data Structures',
    students: 35,
    schedule: 'Tue, Thu 2:00 PM - 3:30 PM',
    enrolledStudents: [
      { id: 4, name: 'David Brown', attendance: 88 },
      { id: 5, name: 'Eva Davis', attendance: 95 },
      { id: 6, name: 'Frank Miller', attendance: 82 }
    ],
    attendanceHistory: [
      { date: '2024-02-01', present: 33, total: 35 },
      { date: '2024-02-03', present: 32, total: 35 },
      { date: '2024-02-06', present: 34, total: 35 },
      { date: '2024-02-08', present: 35, total: 35 },
      { date: '2024-02-10', present: 31, total: 35 }
    ]
  }
];

export default function ProfessorDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleViewDetails = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const getTotalAttendance = () => {
    return mockCourses.reduce((total, course) => {
      const lastRecord = course.attendanceHistory[course.attendanceHistory.length - 1];
      return total + (lastRecord.present / lastRecord.total) * 100;
    }, 0) / mockCourses.length;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Professor Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">My Courses</h3>
                <p className="mt-1 text-3xl font-semibold text-gray-700">{mockCourses.length}</p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Total Students</h3>
                <p className="mt-1 text-3xl font-semibold text-gray-700">
                  {mockCourses.reduce((acc, course) => acc + course.students, 0)}
                </p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Average Attendance</h3>
                <p className="mt-1 text-3xl font-semibold text-gray-700">
                  {getTotalAttendance().toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onViewDetails={() => handleViewDetails(course)}
                isProfessorView={true}
              />
            ))}
          </div>
        </div>
      </main>

      {selectedCourse && (
        <CourseDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          course={selectedCourse}
        />
      )}
    </div>
  );
}