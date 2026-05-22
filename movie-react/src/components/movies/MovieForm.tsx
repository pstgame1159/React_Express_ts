import { useState, useEffect } from 'react';
import type { Movie, MovieRating, CreateMovieDto } from '../../types/movie';
import { RATINGS } from '../../types/movie';
import Button from '../ui/Button';

interface MovieFormProps {
  initial?: Movie;
  loading?: boolean;
  onSubmit: (data: CreateMovieDto) => void;
  onCancel: () => void;
}

const currentYear = new Date().getFullYear();

export default function MovieForm({ initial, loading, onSubmit, onCancel }: MovieFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [year, setYear] = useState(String(initial?.year_released ?? currentYear));
  const [rating, setRating] = useState<MovieRating>(initial?.rating ?? 'G');
  const [errors, setErrors] = useState<Partial<Record<'title' | 'year', string>>>({});

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setYear(String(initial.year_released));
      setRating(initial.rating);
    }
  }, [initial]);

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!title.trim()) next.title = 'กรุณากรอกชื่อภาพยนตร์';
    const y = Number(year);
    if (!year || isNaN(y) || y < 1888 || y > currentYear + 5) {
      next.year = `ปีที่ออกฉายต้องอยู่ระหว่าง 1888 ถึง ${currentYear + 5}`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title: title.trim(), year_released: Number(year), rating });
  };

  const inputBase = 'w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white';

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">ชื่อภาพยนตร์</label>
        <input
          className={`${inputBase} ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="กรอกชื่อภาพยนตร์"
          maxLength={200}
        />
        {errors.title && <span className="text-xs text-red-500">{errors.title}</span>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">ปีที่ออกฉาย</label>
        <input
          className={`${inputBase} ${errors.year ? 'border-red-400' : 'border-gray-300'}`}
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          min={1888}
          max={currentYear + 5}
        />
        {errors.year && <span className="text-xs text-red-500">{errors.year}</span>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">เรตติ้ง</label>
        <select
          className={`${inputBase} border-gray-300`}
          value={rating}
          onChange={(e) => setRating(e.target.value as MovieRating)}
        >
          {RATINGS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button type="submit" loading={loading}>
          {initial ? 'บันทึกการเปลี่ยนแปลง' : 'เพิ่มภาพยนตร์'}
        </Button>
      </div>
    </form>
  );
}
