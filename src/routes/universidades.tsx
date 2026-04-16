import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, MapPin, BookOpen, ArrowRight, Building2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/universidades")({
  component: UniversidadesPage,
  head: () => ({
    meta: [
      { title: "Universidades en RD — ComparaU" },
      { name: "description", content: "Explora las principales universidades de República Dominicana. Descubre programas, costos y campus." },
      { property: "og:title", content: "Universidades en RD — ComparaU" },
      { property: "og:description", content: "Explora las principales universidades de República Dominicana." },
    ],
  }),
});

const universities = [
  { id: "pucmm", abbr: "PUCMM", name: "Pontificia Universidad Católica Madre y Maestra", location: "Santiago / Santo Domingo", programs: 45, type: "Privada" },
  { id: "intec", abbr: "INTEC", name: "Instituto Tecnológico de Santo Domingo", location: "Santo Domingo", programs: 38, type: "Privada" },
  { id: "unibe", abbr: "UNIBE", name: "Universidad Iberoamericana", location: "Santo Domingo", programs: 32, type: "Privada" },
  { id: "unphu", abbr: "UNPHU", name: "Universidad Nacional Pedro Henríquez Ureña", location: "Santo Domingo", programs: 40, type: "Privada" },
  { id: "apec", abbr: "APEC", name: "Universidad APEC", location: "Santo Domingo", programs: 28, type: "Privada" },
  { id: "uasd", abbr: "UASD", name: "Universidad Autónoma de Santo Domingo", location: "Santo Domingo", programs: 65, type: "Pública" },
  { id: "utesa", abbr: "UTESA", name: "Universidad Tecnológica de Santiago", location: "Santiago", programs: 35, type: "Privada" },
  { id: "ucsd", abbr: "UCSD", name: "Universidad Católica Santo Domingo", location: "Santo Domingo", programs: 22, type: "Privada" },
  { id: "o&m", abbr: "O&M", name: "Universidad Organización y Método", location: "Santo Domingo / Santiago", programs: 20, type: "Privada" },
];

function UniversidadesPage() {
  const [search, setSearch] = useState("");
  const filtered = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.abbr.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Universidades
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explora las principales universidades de República Dominicana.
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-lg">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar universidad..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 w-full rounded-xl border border-input bg-card pl-12 pr-4 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((uni, i) => (
          <motion.div
            key={uni.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <Link to="/universidades/$uniId" params={{ uniId: uni.id }}>
              <Card className="group h-full cursor-pointer border-border/60 transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-0.5">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                      {uni.abbr[0]}
                    </div>
                    <Badge variant="secondary" className="rounded-full text-xs">
                      {uni.type}
                    </Badge>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{uni.abbr}</h3>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">{uni.name}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {uni.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" /> {uni.programs} programas
                    </span>
                  </div>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Ver detalles <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
