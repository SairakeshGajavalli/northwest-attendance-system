import { X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  enrolledStudents: Student[];
  attendanceHistory: AttendanceRecord[];
}

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
}

export default function CourseDetailsModal({
  isOpen,
  onClose,
  course
}: CourseDetailsModalProps) {
  if (!isOpen) return null;

  const attendanceData = course.attendanceHistory.map(record => ({
    date: new Date(record.date).toLocaleDateString(),
    attendance: (record.present / record.total) * 100
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl m-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{course.name}</h2>
            <p className="text-sm text-gray-500">{course.code} • {course.schedule}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* QR Code Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance QR Code</h3>
            <div className="flex justify-center bg-white p-4 rounded-lg">
              <QRCodeSVG
                value={`course-attendance:${course.id}`}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>

          {/* Attendance Chart */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance History</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis unit="%" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Enrolled Students */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Enrolled Students</h3>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {course.enrolledStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${student.attendance}%` }}
                          ></div>
                        </div>
                        <span>{student.attendance}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}