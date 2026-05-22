import { observer } from 'mobx-react-lite';
import { useAuthStore } from '../../stores';

const getRoleLabel = (role: string | null | undefined): string => {
  switch (role) {
    case 'MANAGER':
      return 'ผู้จัดการ';
    case 'TEAMLEADER':
      return 'หัวหน้าทีม';
    case 'FLOORSTAFF':
      return 'พนักงาน';
    default:
      return '-';
  }
};

const Header = observer(() => {
  const auth = useAuthStore();

  return (
    <header className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-white font-semibold text-sm tracking-wide">ระบบจัดการภาพยนตร์</span>
        {auth.isAuthenticated && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-slate-400 text-sm">{auth.user?.username}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                {getRoleLabel(auth.user?.role)}
              </span>
            </div>
            <button
              onClick={() => auth.logout()}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
            >
              ออกจากระบบ
            </button>
          </div>
        )}
      </div>
    </header>
  );
});

export default Header;
