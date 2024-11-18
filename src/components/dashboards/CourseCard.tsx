import { QrCode, Users, History } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  attendance: number;
}

interface AttendanceRecord {
  date: string;
  present: number;
  total: number;
}

interface Course {
  id: number;
  code: string;
  name: string;
  students: number;
  schedule: string;
  professor?: string;
  enrolledStudents?: Student[];
  attendanceHistory?: AttendanceRecord[];
}

interface CourseCardProps {
  course: Course;
  onUnassign?: (id: number) => void;
  onViewDetails?: () => void;
  isAdminView?: boolean;
  isProfessorView?: boolean;
}

export default function CourseCard({ 
  course, 
  onUnassign,
  onViewDetails,
  isAdminView = false,
  isProfessorView = false
}: CourseCardProps) {
  const getLatestAttendance = () => {
    if (!course.attendanceHistory?.length) return null;
    const latest = course.attendanceHistory[course.attendanceHistory.length - 1];
    return ((latest.present / latest.total) * 100).toFixed(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {course.code}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{course.schedule}</p>
          </div>
          {isProfessorView && onViewDetails && (
            <div className="flex space-x-2">
              <button
                onClick={onViewDetails}
                className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
                title="View Details"
              >
                <QrCode className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className="font-medium">Students Enrolled:</span>
            <span className="ml-1">{course.students}</span>
          </div>
          {isProfessorView && course.attendanceHistory && (
            <div className="flex items-center text-sm text-gray-600">
              <History className="h-4 w-4 mr-2" />
              <span className="font-medium">Latest Attendance:</span>
              <span className="ml-1">{getLatestAttendance()}%</span>
            </div>
          )}
          {isAdminView && course.professor && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Professor:</span> {course.professor}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}