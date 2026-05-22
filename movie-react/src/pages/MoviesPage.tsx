import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Layout from '../components/layout/Layout';
import MovieTable from '../components/movies/MovieTable';
import MovieForm from '../components/movies/MovieForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { useMovies, useCreateMovie, useUpdateMovie, useDeleteMovie } from '../hooks/useMovies';
import type { Movie, CreateMovieDto } from '../types/movie';

const MoviesPage = observer(() => {
  const { data: movies = [], isLoading, isError } = useMovies();
  const createMovie = useCreateMovie();
  const updateMovie = useUpdateMovie();
  const deleteMovie = useDeleteMovie();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Movie | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmMovie, setConfirmMovie] = useState<Movie | null>(null);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (movie: Movie) => {
    setEditing(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSubmit = async (dto: CreateMovieDto) => {
    if (editing) {
      await updateMovie.mutateAsync({ id: editing.id, dto });
    } else {
      await createMovie.mutateAsync(dto);
    }
    closeModal();
  };

  const requestDelete = (id: number) => {
    const movie = movies.find((m) => m.id === id) ?? null;
    setConfirmMovie(movie);
  };

  const handleConfirmDelete = async () => {
    if (!confirmMovie) return;
    const id = confirmMovie.id;
    setConfirmMovie(null);
    setDeletingId(id);
    try {
      await deleteMovie.mutateAsync(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">รายการภาพยนตร์</h1>
          {!isLoading && !isError && (
            <p className="text-sm text-gray-400 mt-0.5">ทั้งหมด {movies.length} รายการ</p>
          )}
        </div>
        <Button onClick={openCreate}>เพิ่มภาพยนตร์</Button>
      </div>

      {isLoading && (
        <p className="text-center text-sm text-gray-400 py-12">กำลังโหลดข้อมูลภาพยนตร์...</p>
      )}
      {isError && (
        <p className="text-center text-sm text-red-500 py-12">โหลดข้อมูลภาพยนตร์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง</p>
      )}

      {!isLoading && !isError && (
        <MovieTable
          movies={movies}
          deletingId={deletingId}
          onEdit={openEdit}
          onDelete={requestDelete}
        />
      )}

      <Modal
        open={!!confirmMovie}
        title="ยืนยันการลบ"
        onClose={() => setConfirmMovie(null)}
      >
        <p className="text-sm text-gray-600 mb-5">
          คุณต้องการลบหนัง{' '}
          <span className="font-semibold text-gray-900">"{confirmMovie?.title}"</span>?
          การกระทำนี้ไม่สามารถย้อนกลับได้
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setConfirmMovie(null)}>
            ยกเลิก
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            ลบข้อมูล
          </Button>
        </div>
      </Modal>

      <Modal
        open={modalOpen}
        title={editing ? 'แก้ไขข้อมูลภาพยนตร์' : 'เพิ่มภาพยนตร์'}
        onClose={closeModal}
      >
        <MovieForm
          initial={editing ?? undefined}
          loading={createMovie.isPending || updateMovie.isPending}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </Layout>
  );
});

export default MoviesPage;
