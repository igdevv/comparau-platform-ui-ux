import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, ArrowRight, Building2, BarChart3, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/carreras")({
  component: CarrerasPage,
  head: () => ({
    meta: [
      { title: "Carreras Universitarias en RD — ComparaU" },
      { name: "description", content: "Explora carreras universitarias en República Dominicana. Compara programas entre universidades." },
      { property: "og:title", content: "Carreras Universitarias en RD — ComparaU" },
      { property: "og:description", content: "Explora y compara carreras universitarias en República Dominicana." },
    ],
  }),
});

const categories = ["Todas", "Ingeniería", "Salud", "Negocios", "Humanidades", "Ciencias"];

const careers = [
  { id: "ing-software", name: "Ingeniería en Software", category: "Ingeniería", icon: "💻", universities: 8, description: "Diseño, desarrollo y mantenimiento de sistemas de software." },
  { id: "medicina", name: "Medicina", category: "Salud", icon: "🩺", universities: 6, description: "Formación integral para el ejercicio de la medicina humana." },
  { id: "psicologia", name: "Psicología", category: "Humanidades", icon: "🧠", universities: 10, description: "Estudio del comportamiento humano y procesos mentales." },
  { id: "derecho", name: "Derecho", category: "Humanidades", icon: "⚖️", universities: 12, description: "Formación en ciencias jurídicas y práctica legal." },
  { id: "arquitectura", name: "Arquitectura", category: "Ingeniería", icon: "🏛️", universities: 5, description: "Diseño y planificación de espacios habitables." },
  { id: "admin-empresas", name: "Administración de Empresas", category: "Negocios", icon: "📊", universities: 15, description: "Gestión y dirección de organizaciones empresariales." },
  { id: "contabilidad", name: "Contabilidad", category: "Negocios", icon: "📋", universities: 11, description: "Registro, análisis y gestión de información financiera." },
  { id: "ing-civil", name: "Ingeniería Civil", category: "Ingeniería", icon: "🏗️", universities: 7, description: "Diseño y construcción de infraestructura y obras civiles." },
  { id: "marketing", name: "Marketing", category: "Negocios", icon: "📢", universities: 9, description: "Estrategias de mercadeo, publicidad y comunicación comercial." },
  { id: "odontologia", name: "Odontología", category: "Salud", icon: "🦷", universities: 4, description: "Prevención, diagnóstico y tratamiento de enfermedades bucales." },
  { id: "ing-industrial", name: "Ingeniería Industrial", category: "Ingeniería", icon: "⚙️", universities: 6, description: "Optimización de procesos productivos y sistemas industriales." },
  { id: "comunicacion", name: "Comunicación Social", category: "Humanidades", icon: "📰", universities: 8, description: "Periodismo, medios de comunicación y relaciones públicas." },
];

function CarrerasPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");

  const filtered = careers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "Todas" || c.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Carreras universitarias
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Encuentra tu carrera ideal y compara opciones entre universidades.
        </p>
      </div>

      {/* Search & filters */}
      <div className="mx-auto mt-10 max-w-2xl space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar carrera..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-xl border border-input bg-card pl-12 pr-4 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                cat === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((career, i) => (
          <motion.div
            key={career.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <Card className="group h-full cursor-pointer border-border/60 transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-0.5">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{career.icon}</span>
                  <Badge variant="secondary" className="rounded-full text-xs">
                    {career.category}
                  </Badge>
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{career.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {career.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>{career.universities} universidades</span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Button variant="default" size="sm" className="flex-1" asChild>
                    <Link to="/comparar">
                      <BarChart3 className="h-3.5 w-3.5" />
                      Comparar
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">No se encontraron carreras con esos filtros.</p>
        </div>
      )}
    </div>
  );
}
