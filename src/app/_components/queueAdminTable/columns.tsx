import { ColumnDef, ColumnMeta } from "@tanstack/react-table";
import { QueueEntry } from "@/lib/hooks/useQueue";
import { Button } from "@/components/ui/button";
import { Check, ArrowDown, X, Eye } from "lucide-react";
import * as emoji from "node-emoji";
import { Message } from "../messages/messages";

interface CustomColumnMeta<TData, TValue> extends ColumnMeta<TData, TValue> {
  responsive?: {
    hideOnMobile?: boolean;
  };
}

const calculateTotalPrice = (queueServices: QueueEntry["queueServices"]) => {
  return queueServices.reduce((total, qs) => (qs.service ? total + qs.service.price : total), 0);
};

const formatPhoneForWhatsApp = (phone: string) => {
  const cleanedPhone = phone.replace(/[\s()-]/g, "");
  if (!cleanedPhone.startsWith("+")) {
    return `+55${cleanedPhone}`;
  }
  return cleanedPhone;
};

const getGreetingByTime = () => {
  const hour = new Date().getHours();
  if (hour < 12) return emoji.emojify(":sunny: Bom dia!");
  if (hour < 18) return emoji.emojify(":city_sunset: Boa tarde!");
  return emoji.emojify(":crescent_moon: Boa noite!");
};

const createCustomWhatsAppMessage = (
  userName: string,
  queueServices: QueueEntry["queueServices"]
) => {
  const greeting = getGreetingByTime();
  const servicesList = queueServices
    .map((qs) => (qs.service ? `*- ${qs.service.name}*` : "*- Serviço não encontrado*"))
    .join("\n");

  const message = Message({ userName, greeting, servicesList });

  return message;
};

const createWhatsAppLink = (
  phone: string,
  userName: string,
  queueServices: QueueEntry["queueServices"]
) => {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  const message = createCustomWhatsAppMessage(userName, queueServices);
  const encodedMessage = encodeURIComponent(message);
  const screenWidth = window.innerWidth;

  if (screenWidth > 1050) {
    return `https://web.whatsapp.com/send?phone=${formattedPhone.replace("+", "")}&text=${encodedMessage}`;
  } else {
    return `https://wa.me/${formattedPhone.replace("+", "")}?text=${encodedMessage}`;
  }
};

export const columns: ColumnDef<QueueEntry, any>[] = [
  {
    accessorKey: "position",
    header: "Posição",
    cell: ({ row }) => <span className="font-bold">{row.index + 1}º</span>,
    size: 10,
    meta: { responsive: {} } as CustomColumnMeta<QueueEntry, any>,
  },
  {
    accessorFn: (row) => row.user.name,
    header: "Nome",
    cell: ({ row }) => (
      <span className="ease-in-out duration-200 hover:text-orange-500 hover:underline underline-offset-4 cursor-pointer">
        {row.original.user.name}
      </span>
    ),
    size: 150,
    meta: { responsive: {} } as CustomColumnMeta<QueueEntry, any>,
  },
  {
    accessorFn: (row) => row.user.phone,
    header: "Telefone",
    cell: ({ row }) => {
      const phone = row.original.user.phone;
      const userName = row.original.user.name;
      const queueServices = row.original.queueServices;
      const whatsappLink = createWhatsAppLink(phone, userName, queueServices);
      return (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir conversa no WhatsApp"
          className="text-orange-500 cursor-pointer hover:underline"
        >
          {phone}
        </a>
      );
    },
    size: 120,
    meta: { responsive: { hideOnMobile: false } } as CustomColumnMeta<QueueEntry, any>,
  },
  {
    accessorFn: (row) => row.queueServices.map((qs) => (qs.service ? qs.service.name : "Serviço não encontrado")).join(", "),
    header: "Serviços",
    cell: ({ row }) => (
      <span>
        {row.original.queueServices
          .map((qs) => (qs.service ? qs.service.name : "Serviço não encontrado"))
          .join(", ")}
      </span>
    ),
    size: 200,
    meta: { responsive: { hideOnMobile: true } } as CustomColumnMeta<QueueEntry, any>,
  },
  {
    accessorFn: (row) => calculateTotalPrice(row.queueServices),
    header: "Valor Total",
    cell: ({ row }) => {
      const total = calculateTotalPrice(row.original.queueServices);
      return <span>R$ {total.toFixed(2)}</span>;
    },
    size: 120,
    meta: { responsive: { hideOnMobile: true } } as CustomColumnMeta<QueueEntry, any>,
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-green-100 text-green-700 hover:bg-green-200"
          onClick={() => console.log("Check", row.original.id)}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
          onClick={() => console.log("ArrowDown", row.original.id)}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-red-100 text-red-700 hover:bg-red-200"
          onClick={() => console.log("X", row.original.id)}
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-100 text-blue-700 hover:bg-blue-200"
          onClick={() => console.log("View", row.original.id)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    ),
    size: 150,
    meta: { responsive: {} } as CustomColumnMeta<QueueEntry, any>,
  },
];