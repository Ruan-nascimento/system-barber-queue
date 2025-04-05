import { ColumnDef, ColumnMeta } from "@tanstack/react-table";
import { QueueEntry } from "@/lib/hooks/useQueue";
import { Button } from "@/components/ui/button";
import { Check, ArrowDown, X, Eye } from "lucide-react";

interface CustomColumnMeta<TData, TValue> extends ColumnMeta<TData, TValue> {
  responsive?: {
    hideOnMobile?: boolean;
  };
}

const calculateTotalPrice = (queueServices: QueueEntry["queueServices"]) => {
  return queueServices.reduce((total, qs) => total + qs.service.price, 0);
};

const formatPhoneForWhatsApp = (phone: string) => {
    const cleanedPhone = phone.replace(/[\s()-]/g, "");
    
    if (!cleanedPhone.startsWith("+")) {
      return `+55${cleanedPhone}`;
    }
    return cleanedPhone;
  };

const createWhatsAppLink = (phone: string, userName: string) => {
    const formattedPhone = formatPhoneForWhatsApp(phone);
    const message = `Olá ${userName}, passando aqui pra te avisar que é sua vez de fazer o serviço, consegue vir em até 15 minutos?`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
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
    cell: ({ row }) => <span className="ease-in-out duration-200 hover:text-orange-500 hover:underline underline-offset-4 cursor-pointer">{row.original.user.name}</span>,
    size: 150,
    meta: { responsive: {} } as CustomColumnMeta<QueueEntry, any>,
  },
  {
    accessorFn: (row) => row.user.phone,
    header: "Telefone",
    cell: ({ row }) => {
      const phone = row.original.user.phone;
      const userName = row.original.user.name;
      const whatsappLink = createWhatsAppLink(phone, userName);
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
    meta: { responsive: { hideOnMobile: true } } as CustomColumnMeta<QueueEntry, any>,
  },
  {
    accessorFn: (row) => row.queueServices.map((qs) => qs.service.name).join(", "),
    header: "Serviços",
    cell: ({ row }) => (
      <span>{row.original.queueServices.map((qs) => qs.service.name).join(", ")}</span>
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