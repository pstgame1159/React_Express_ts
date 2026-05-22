import { Response, NextFunction } from 'express';
import {
  findAllMovies,
  findMovieById,
  createNewMovie,
  updateExistingMovie,
  deleteMovieById,
} from '../services/movies.service';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { MovieRating } from '../../models/movie.model';

export const getAllMovies = async (
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movies = await findAllMovies();
    res.ok(movies, 'OK', movies.length);
  } catch (error) {
    next(error);
  }
};

export const getMovieById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.fail('Invalid movie id');
      return;
    }

    const movie = await findMovieById(id);

    if (!movie) {
      res.fail('Movie not found', 404);
      return;
    }

    res.ok(movie);
  } catch (error) {
    next(error);
  }
};

export const createMovie = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, year_released, rating } = req.body as {
      title?: string;
      year_released?: unknown;
      rating?: string;
    };

    if (!title?.trim() || year_released === undefined || !rating) {
      res.fail('title, year_released, and rating are required');
      return;
    }

    const year = Number(year_released);
    if (isNaN(year)) {
      res.fail('year_released must be a number');
      return;
    }

    const movie = await createNewMovie({
      title: title.trim(),
      year_released: year,
      rating: rating as MovieRating,
    });

    res.status(201).ok(movie);
  } catch (error) {
    next(error);
  }
};

export const updateMovie = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.fail('Invalid movie id');
      return;
    }

    const { title, year_released, rating } = req.body as {
      title?: string;
      year_released?: unknown;
      rating?: string;
    };

    const movie = await updateExistingMovie(id, {
      title: title?.trim(),
      year_released: year_released !== undefined ? Number(year_released) : undefined,
      rating: rating as MovieRating | undefined,
    });

    if (!movie) {
      res.fail('Movie not found', 404);
      return;
    }

    res.ok(movie);
  } catch (error) {
    next(error);
  }
};

export const deleteMovie = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.fail('Invalid movie id');
      return;
    }

    const deleted = await deleteMovieById(id);

    if (!deleted) {
      res.fail('Movie not found', 404);
      return;
    }

    res.ok(undefined, 'Movie deleted successfully');
  } catch (error) {
    next(error);
  }
};
