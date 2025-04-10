import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { User, useUsersContext } from '@/lib/context/UserContext';

export const UserList = ({ user }: { user: User }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteUser } = useUsersContext();

  const handleDelete = async () => {
    await deleteUser(user.id);
    setIsModalOpen(false); 
  };

  return (
    <>
      <div className="w-full flex items-center px-4 gap-6 justify-between border-b pb-2 mb-2 border-zinc-500/60">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow-green"></span>
        <span className="flex-1">{user.name}</span>
        <span className="w-72 text-orange-500">{user.phone}</span>

        <div className="flex items-center gap-4">
          <Button
            className="bg-green-600 duration-200 ease-in-out hover:bg-green-600/60 cursor-pointer"
          >
            <PlusIcon />
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 duration-200 ease-in-out hover:bg-red-600/60 cursor-pointer"
          >
            Excluir <Trash2Icon />
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-zinc-800 text-white border-zinc-700">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja excluir o usuário <strong>{user.name}</strong>? Essa ação não pode ser desfeita.</p>
          <DialogFooter>
            <Button
              onClick={() => setIsModalOpen(false)}
              className="bg-zinc-600 hover:bg-zinc-500"
            >
              Não
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-500"
            >
              Sim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};