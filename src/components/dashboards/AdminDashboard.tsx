import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, GraduationCap, BookOpen, Plus, UserPlus } from 'lucide-react';
import Sidebar from './Sidebar';
import ProfessorCard from './ProfessorCard';
import CourseCard from './CourseCard';
import AssignCourseModal from '../modals/AssignCourseModal';
import toast from 'react-hot-toast';

// Mock data for professors
const mockProfessors = [
  { id: 1, name: 'Dr. John Smith', email: 'john.smith@university.edu', department: 'Computer Science', courses: ['CS101', 'CS201'] },
  { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah.j@university.edu', department: 'Mathematics', courses: ['CS301'] },
  { id: 3, name: 'Dr. Michael Brown', email: 'michael.b@university.edu', department: 'Physics', courses: [] },
];

// Mock data for students
const mockStudents = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@university.edu', courses: ['CS101', 'CS201'] },
  { id: 2, name: 'Bob Wilson', email: 'bob.w@university.edu', courses: ['CS101'] },
  { id: 3, name: 'Carol Smith', email: 'carol.s@university.edu', courses: ['CS201', 'CS301'] },
];

// Mock data for courses
const mockCourses = [
  { 
    id: 1, 
    code: 'CS101', 
    name: 'Introduction to Programming',
    students: 45,
    schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
    professor: 'Dr. John Smith'
  },
  { 
    id: 2, 
    code: 'CS201', 
    name: 'Data Structures',
    students: 35,
    schedule: 'Tue, Thu 2:00 PM - 3:30 PM',
    professor: 'Dr. Sarah Johnson'
  },
  { 
    id: 3, 
    code: 'CS301', 
    name: 'Database Systems',
    students: 30,
    schedule: 'Wed, Fri 1:00 PM - 2:30 PM'
  }
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('professors');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<number | null>(null);
  const [assigneeType, setAssigneeType] = useState<'professor' | 'student'>('professor');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddProfessor = () => {
    console.log('Add professor clicked');
  };

  const handleEditProfessor = (id: number) => {
    console.log('Edit professor:', id);
  };

  const handleDeleteProfessor = (id: number) => {
    console.log('Delete professor:', id);
  };

  const handleAddCourse = () => {
    console.log('Add course clicked');
  };

  const handleAssignCourse = (id: number, type: 'professor' | 'student') => {
    setSelectedAssigneeId(id);
    setAssigneeType(type);
    setIsAssignModalOpen(true);
  };

  const handleAssignSubmit = (courseId: number, assigneeId: number) => {
    const assigneeType = selectedAssigneeId === assigneeId ? 'professor' : 'student';
    console.log(`Assigning course ${courseId} to ${assigneeType} ${assigneeId}`);
    toast.success(`Course assigned to ${assigneeType} successfully!`);
    setIsAssignModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
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
          {activeTab === 'professors' && (
            <div className="px-4 py-6 sm:px-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Professors</h2>
                <button
                  onClick={handleAddProfessor}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Professor
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProfessors.map((professor) => (
                  <ProfessorCard
                    key={professor.id}
                    professor={professor}
                    onEdit={handleEditProfessor}
                    onDelete={handleDeleteProfessor}
                    onAssign={() => handleAssignCourse(professor.id, 'professor')}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="px-4 py-6 sm:px-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
                <button
                  onClick={handleAddCourse}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Course
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isAdminView={true}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="px-4 py-6 sm:px-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Students</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockStudents.map((student) => (
                  <div key={student.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{student.email}</p>
                      </div>
                      <button
                        onClick={() => handleAssignCourse(student.id, 'student')}
                        className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
                        title="Assign course"
                      >
                        <UserPlus className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700">Enrolled Courses:</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {student.courses.map((course, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <AssignCourseModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssignSubmit}
        courses={mockCourses}
        assignees={assigneeType === 'professor' ? mockProfessors : mockStudents}
        type={assigneeType}
      />
    </div>
  );
}