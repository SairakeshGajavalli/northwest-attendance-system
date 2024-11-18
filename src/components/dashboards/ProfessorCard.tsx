import { Pencil, Trash2, UserPlus } from 'lucide-react';

interface Professor {
  id: number;
  name: string;
  email: string;
  department: string;
  courses: string[];
}

interface ProfessorCardProps {
  professor: Professor;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onAssign: (id: number) => void;
}

export default function ProfessorCard({ professor, onEdit, onDelete, onAssign }: ProfessorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{professor.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{professor.email}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onAssign(professor.id)}
              className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
              title="Assign course"
            >
              <UserPlus className="h-5 w-5" />
            </button>
            <button
              onClick={() => onEdit(professor.id)}
              className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
              title="Edit professor"
            >
              <Pencil className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(professor.id)}
              className="p-1.5 text-gray-500 hover:text-red-600 transition-colors"
              title="Delete professor"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Department:</span> {professor.department}
          </p>
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-700">Assigned Courses:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {professor.courses.map((course, index) => (
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
      </div>
    </div>
  );
}