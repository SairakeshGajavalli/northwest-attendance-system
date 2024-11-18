import { Users, GraduationCap, BookOpen } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'professors', label: 'Professors', icon: Users },
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'courses', label: 'Courses', icon: BookOpen },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="h-16 flex items-center justify-center border-b">
        <span className="text-xl font-bold text-gray-900">Menu</span>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}