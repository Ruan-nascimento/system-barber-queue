"use client";

import { useNotification } from "@/lib/NotificationContext";
import { X } from "lucide-react";
import { NotificationMessage } from "./notification";

export const NotificationModal = () => {
  const { isNotificationModalOpen, closeNotificationModal } = useNotification();

  if (!isNotificationModalOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeNotificationModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
    >
      <div className="bg-zinc-900 rounded-lg shadow-lg p-6 w-[70%] lg:max-w-[500px] mx-2 max-h-[70%] h-[70%] overflow-clip">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Notificações</h2>

          <button onClick={closeNotificationModal}>
            <X className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-200" />
          </button>

        </div>


        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          <p className="text-gray-400">Nenhuma notificação no momento.</p>
          <ul className="text-gray-200">
            <NotificationMessage message="Novo Usuário Cadastrado! Nome"/>
          </ul>
        </div>
        <div className="mt-4 flex justify-end">
        </div>
      </div>
    </div>
  );
};