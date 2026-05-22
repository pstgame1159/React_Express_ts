import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchMovies,
  createMovieApi,
  updateMovieApi,
  deleteMovieApi,
} from '../api/movies';
import type { CreateMovieDto, UpdateMovieDto } from '../types/movie';

export const MOVIES_KEY = ['movies'] as const;

export const useMovies = () =>
  useQuery({ queryKey: MOVIES_KEY, queryFn: fetchMovies });

export const useCreateMovie = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateMovieDto) => createMovieApi(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: MOVIES_KEY }),
  });
};

export const useUpdateMovie = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateMovieDto }) =>
      updateMovieApi(id, dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: MOVIES_KEY }),
  });
};

export const useDeleteMovie = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteMovieApi(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: MOVIES_KEY }),
  });
};
