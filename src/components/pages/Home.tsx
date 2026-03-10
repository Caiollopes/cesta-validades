import { HomeNavbar } from "@/components/home-navbar";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  PackagePlus,
  CalendarClock,
  ShieldCheck,
  Bell,
  BarChart3,
  Leaf,
  Star,
  Zap,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: PackagePlus,
    title: "1. Cadastre seus produtos",
    description:
      "Adicione os produtos da sua cesta com nome, marca, código de barras e valor de custo.",
  },
  {
    icon: CalendarClock,
    title: "2. Registre as validades",
    description:
      "Informe a data de validade e a quantidade de cada produto para manter o controle.",
  },
  {
    icon: ClipboardList,
    title: "3. Acompanhe tudo",
    description:
      "Visualize, edite e exclua produtos e validades de forma simples e organizada.",
  },
  {
    icon: ShieldCheck,
    title: "4. Evite desperdício",
    description:
      "Tenha visibilidade sobre os produtos próximos do vencimento e tome decisões a tempo.",
  },
];

const stats = [
  { value: "100%", label: "Gratuito", icon: Star },
  { value: "0", label: "Desperdícios", icon: Leaf },
  { value: "∞", label: "Produtos", icon: PackagePlus },
  { value: "24/7", label: "Disponível", icon: Clock },
];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <HomeNavbar />

      {/* Inicio */}
      <section className="relative flex flex-col items-center text-center gap-6 py-24 overflow-hidden">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-300 bg-green-50 dark:bg-green-950/50 dark:border-green-800 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400">
          <Leaf className="h-3 w-3" />
          Controle inteligente de validades
        </span>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl max-w-3xl">
          Controle as validades da sua cesta de forma{" "}
          <span className="text-green-600 dark:text-green-400">simples</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          O <strong>Cesta Validades</strong> ajuda você a cadastrar produtos,
          acompanhar datas de vencimento e evitar desperdícios. Tudo em um só
          lugar, rápido e prático.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" onClick={() => navigate("/app/produtos")}>
            Teste agora — é grátis
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/app/validades")}
          >
            Ver validades
          </Button>
        </div>
      </section>

      {/* Painel */}
      <section className="py-10 border rounded-xl bg-muted/30">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <stat.icon className="size-5 text-green-500 mb-1" />
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Passo a passo */}
      <section className="flex flex-col items-center gap-10 py-20">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary uppercase tracking-wider">
            Como funciona
          </span>
          <h2 className="text-2xl font-semibold">Em 4 passos simples</h2>
          <p className="text-muted-foreground max-w-md text-sm">
            Começar a usar é fácil. Veja o fluxo básico para ter tudo sob
            controle.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="rounded-full bg-primary/10 p-3">
                <step.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>
          Cesta Validades &mdash; Controle de validades simples e eficiente.
        </p>
      </footer>
    </>
  );
}
