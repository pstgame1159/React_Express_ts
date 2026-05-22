import type { Movie } from '../../types/movie';
import RatingBadge from '../ui/RatingBadge';
import Button from '../ui/Button';
import DeleteButton from './DeleteButton';

interface MovieTableProps {
  movies: Movie[];
  deletingId: number | null;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

export default function MovieTable({ movies, deletingId, onEdit, onDelete }: MovieTableProps) {
  if (movies.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
        <p className="text-sm text-gray-400">ยังไม่มีข้อมูลภาพยนตร์ เริ่มต้นด้วยการเพิ่มรายการใหม่</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full min-w-[480px]">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-5">#</th>
            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-5">ชื่อภาพยนตร์</th>
            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-5">ปีที่ออกฉาย</th>
            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-5">เรตติ้ง</th>
            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-5">จัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {movies.map((movie, index) => (
            <tr key={movie.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-3 py-3 text-sm text-gray-400 sm:px-5 sm:py-3.5">{index + 1}</td>
              <td className="px-3 py-3 text-sm font-medium text-gray-900 sm:px-5 sm:py-3.5">{movie.title}</td>
              <td className="px-3 py-3 text-sm text-gray-500 sm:px-5 sm:py-3.5">{movie.year_released}</td>
              <td className="px-3 py-3 sm:px-5 sm:py-3.5">
                <RatingBadge rating={movie.rating} />
              </td>
              <td className="px-3 py-3 sm:px-5 sm:py-3.5">
                <div className="flex items-center gap-2">
                  <Button variant="secondary" onClick={() => onEdit(movie)}>แก้ไข</Button>
                  <DeleteButton loading={deletingId === movie.id} onClick={() => onDelete(movie.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
