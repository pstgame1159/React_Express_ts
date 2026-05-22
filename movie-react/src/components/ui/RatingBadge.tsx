import type { MovieRating } from '../../types/movie';

const colorMap: Record<MovieRating, string> = {
  G: 'bg-emerald-100 text-emerald-700',
  PG: 'bg-blue-100 text-blue-700',
  M: 'bg-yellow-100 text-yellow-700',
  MA: 'bg-orange-100 text-orange-700',
  R: 'bg-red-100 text-red-700',
};

interface RatingBadgeProps {
  rating: MovieRating;
}

export default function RatingBadge({ rating }: RatingBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorMap[rating]}`}>
      {rating}
    </span>
  );
}
