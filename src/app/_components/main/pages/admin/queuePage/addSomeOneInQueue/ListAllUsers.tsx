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

export const ListAllUsers = ({newUserAdded, setNewUserAdded}: {newUserAdded: boolean, setNewUserAdded: (val:boolean) => void}) => {
  const [users, setUsers] = useState<{ id: string; name: string; phone: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUsers();

    if (newUserAdded) {
        const interval = setInterval(() => {console.log("2 segunds")}, 500)
        return ()=> {
            clearInterval(interval)
            setNewUserAdded(false)
        }
    }
  }, [newUserAdded]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

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
      <Table>
        <TableHeader className="bg-zinc-900">
          <TableRow>
            <TableCell className="w-[60%]">Nome</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell className="w-[80px]">Add</TableCell>
          </TableRow>
        </TableHeader>

        {loading ? (
          <div className="mt-20">
            <Spinner />
          </div>
        ) : (
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Button
                      className="rounded bg-green-500 duration-200 ease-in-out hover:bg-green-600 active:bg-green-700/50 cursor-pointer"
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
        )}
      </Table>
    </div>
    </section>
  );
};