import { useUsersContext } from '@/lib/context/UserContext';
import { Spinner } from '../spinner';
import { UserList } from '../userList';

export const FindAllUsers = () => {
  const { users, loading, refetch } = useUsersContext();

  return (
    <div className="w-full h-full overflow-auto invisible-scroll">
      {loading ? (
        <Spinner />
      ) : (
        users.map((user) => (
          <UserList key={user.id} user={user} />
        ))
      )}
    </div>
  );
};