import CalcForm from "@/components/calc-form";
import Dashboard from "@/components/dashboard";
import { PGPS } from "@/service/pgps";

export default function Home() {
  const pgps = new PGPS();
  const data = pgps.calculate({
    nivel: "101",
    degrau: "A",
    classe: "Classe I",
  });

  return (
    <main className="flex screen flex-col align-center justify-center p-14">
      {/* Form */}
      <CalcForm pgps={pgps}/>
      {/* Result Dashboard */}
      <Dashboard data={data} />
    </main>
  );
}
