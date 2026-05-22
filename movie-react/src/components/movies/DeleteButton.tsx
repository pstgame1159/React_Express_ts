import { observer } from 'mobx-react-lite';
import { useAuthStore } from '../../stores';
import { canDelete } from '../../utils/permissions';
import Button from '../ui/Button';

interface DeleteButtonProps {
  loading?: boolean;
  onClick: () => void;
}

const DeleteButton = observer(({ loading, onClick }: DeleteButtonProps) => {
  const auth = useAuthStore();

  if (!canDelete(auth.role as import('../../types/user').UserRole | null)) return null;

  return (
    <Button variant="danger" loading={loading} onClick={onClick}>
      ลบ
    </Button>
  );
});

export default DeleteButton;
