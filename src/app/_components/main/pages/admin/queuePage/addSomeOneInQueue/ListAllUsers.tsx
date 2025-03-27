"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/app/_components/spinner";
import { AddUserToQueueModal } from "@/app/_components/addUserToQueueModal";

export const ListAllUsers = ({
  newUserAdded,
  setNewUserAdded,
}: {
  newUserAdded: boolean;
  setNewUserAdded: (val: boolean) => void;
}) => {
  const [users, setUsers] = useState<{ id: string; name: string; phone: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string; phone: string } | null>(null);
  const [waitingUsers, setWaitingUsers] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Erro ao buscar usuários");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchWaitingUsers = async () => {
      try {
        const response = await fetch("/api/queues/waiting", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar usuários na fila com status 'waiting'");
        }
        const data = await response.json();
        const waitingUserIds = data.map((item: { userId: string }) => item.userId);
        setWaitingUsers(waitingUserIds);
      } catch (error) {
        console.error(error);
      }
    };

    Promise.all([fetchUsers(), fetchWaitingUsers()]).finally(() => setLoading(false));

    if (newUserAdded) {
      const interval = setInterval(() => {
        console.log("2 segundos");
      }, 500);
      return () => {
        clearInterval(interval);
        setNewUserAdded(false);
      };
    }
  }, [newUserAdded, setNewUserAdded]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  const handleConfirm = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    fetch("/api/queues/waiting", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const waitingUserIds = data.map((item: { userId: string }) => item.userId);
        setWaitingUsers(waitingUserIds);
      })
      .catch((error) => console.error(error));
  };

  const isUserWaitingInQueue = (userId: string) => {
    return waitingUsers.includes(userId);
  };

  return (
    <section className="flex-1 max-h-full">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar por nome ou telefone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[60%] p-2 rounded border border-zinc-700 bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:bg-zinc-700 focus:border-white"
        />
      </div>

      <div className="max-h-full overflow-auto custom-scrollbar">
        {loading ? (
          <div className="mt-20 flex justify-center">
            <Spinner />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-zinc-900">
              <TableRow>
                <TableCell className="w-[60%]">Nome</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell className="w-[80px]">Add</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsModalOpen(true);
                        }}
                        disabled={isUserWaitingInQueue(user.id)}
                        className={`rounded duration-200 ease-in-out cursor-pointer ${
                          isUserWaitingInQueue(user.id)
                            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 active:bg-green-700/50"
                        }`}
                      >
                        +
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <AddUserToQueueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onConfirm={handleConfirm}
      />
    </section>
  );
};