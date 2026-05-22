import { ResultSetHeader } from 'mysql2';
import pool from '../../configs/database';
import { Movie, CreateMovieDto, UpdateMovieDto } from '../../models/movie.model';

export const findAllMovies = async (): Promise<Movie[]> => {
  const [rows] = await pool.execute('SELECT * FROM movies ORDER BY created_at DESC');
  return rows as Movie[];
};

export const findMovieById = async (id: number): Promise<Movie | undefined> => {
  const [rows] = await pool.execute('SELECT * FROM movies WHERE id = ?', [id]);
  return (rows as Movie[])[0];
};

export const createNewMovie = async (dto: CreateMovieDto): Promise<Movie> => {
  const [result] = await pool.execute(
    'INSERT INTO movies (title, year_released, rating) VALUES (?, ?, ?)',
    [dto.title, dto.year_released, dto.rating]
  );
  return findMovieById((result as ResultSetHeader).insertId) as Promise<Movie>;
};

export const updateExistingMovie = async (
  id: number,
  dto: UpdateMovieDto
): Promise<Movie | undefined> => {
  const existing = await findMovieById(id);
  if (!existing) return undefined;

  await pool.execute(
    'UPDATE movies SET title = ?, year_released = ?, rating = ? WHERE id = ?',
    [
      dto.title ?? existing.title,
      dto.year_released ?? existing.year_released,
      dto.rating ?? existing.rating,
      id,
    ]
  );

  return findMovieById(id);
};

export const deleteMovieById = async (id: number): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM movies WHERE id = ?', [id]);
  return (result as ResultSetHeader).affectedRows > 0;
};
