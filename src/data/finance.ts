export type FinanceRecord = {
  id: number;
  date: string;
  description: string;
  category: "Pemasukan" | "Pengeluaran";
  amount: number;
};

export const financeData: FinanceRecord[] = [
  {
    id: 1,
    date: "2025-01-02",
    description: "SPP Januari - Kelas X IPA 1",
    category: "Pemasukan",
    amount: 5000000,
  },
  {
    id: 2,
    date: "2025-01-05",
    description: "Pembelian Buku Pelajaran",
    category: "Pengeluaran",
    amount: 1200000,
  },
  {
    id: 3,
    date: "2025-01-10",
    description: "Donasi Alumni",
    category: "Pemasukan",
    amount: 3000000,
  },
  {
    id: 4,
    date: "2025-01-15",
    description: "Perbaikan Meja Kelas",
    category: "Pengeluaran",
    amount: 800000,
  },
];
