import { students, teachers } from "@/data/dummy";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Jumlah Siswa</h3>
          <p className="text-3xl font-bold">{students.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Jumlah Guru</h3>
          <p className="text-3xl font-bold">{teachers.length}</p>
        </div>
      </section>
      <section className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-4">Daftar Siswa</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Kelas</th>
              <th className="border px-4 py-2">Nilai</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="border px-4 py-2">{s.name}</td>
                <td className="border px-4 py-2">{s.class}</td>
                <td className="border px-4 py-2">{s.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
