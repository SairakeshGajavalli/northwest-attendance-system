import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';

// Mock data for enrolled courses
const mockCourses = [
  { 
    id: 1, 
    code: 'CS101', 
    name: 'Introduction to Programming',
    students: 45,
    schedule: 'Mon, Wed 10:00 AM - 11:30 AM'
  },
  { 
    id: 2, 
    code: 'CS201', 
    name: 'Data Structures',
    students: 35,
    schedule: 'Tue, Thu 2:00 PM - 3:30 PM'
  }
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
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
                <h3 className="text-lg font-medium text-gray-900">Enrolled Courses</h3>
                <p className="mt-1 text-3xl font-semibold text-gray-700">{mockCourses.length}</p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Assignments Due</h3>
                <p className="mt-1 text-3xl font-semibold text-gray-700">8</p>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Average Grade</h3>
                <p className="mt-1 text-3xl font-semibold text-gray-700">85%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}