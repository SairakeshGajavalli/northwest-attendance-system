import { X } from 'lucide-react';

interface AssignCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (courseId: number, assigneeId: number) => void;
  courses: any[];
  assignees: any[];
  type: 'professor' | 'student';
}

export default function AssignCourseModal({
  isOpen,
  onClose,
  onAssign,
  courses,
  assignees,
  type
}: AssignCourseModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const courseId = parseInt(form.course.value);
    const assigneeId = parseInt(form.assignee.value);
    onAssign(courseId, assigneeId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Assign Course to {type === 'professor' ? 'Professor' : 'Student'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Select Course
            </label>
            <select
              id="course"
              name="course"
              className="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
              Select {type === 'professor' ? 'Professor' : 'Student'}
            </label>
            <select
              id="assignee"
              name="assignee"
              className="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {assignees.map((assignee) => (
                <option key={assignee.id} value={assignee.id}>
                  {assignee.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Assign Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}