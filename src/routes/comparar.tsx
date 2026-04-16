import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  Clock,
  DollarSign,
  MapPin,
  BookOpen,
  ExternalLink,
  FileText,
  CheckCircle2,
  X,
  Plus,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/comparar")({
  component: CompararPage,
  head: () => ({
    meta: [
      { title: "Comparar Universidades — ComparaU" },
      { name: "description", content: "Compara programas universitarios lado a lado. Analiza costos, duración, pensum y requisitos de admisión." },
      { property: "og:title", content: "Comparar Universidades — ComparaU" },
      { property: "og:description", content: "Compara programas universitarios lado a lado." },
    ],
  }),
});

const careers = [
  "Ingeniería en Software",
  "Medicina",
  "Psicología",
  "Derecho",
  "Arquitectura",
  "Administración de Empresas",
  "Contabilidad",
  "Ingeniería Civil",
  "Marketing",
  "Diseño Gráfico",
];

interface UniversityData {
  id: string;
  name: string;
  abbr: string;
  career: string;
  duration: string;
  modality: string;
  campus: string;
  admissionCost: string;
  enrollmentCost: string;
  creditCost: string;
  requirements: string[];
  lastUpdated: string;
  sourceUrl: string;
}

const mockData: UniversityData[] = [
  {
    id: "pucmm",
    name: "Pontificia Universidad Católica Madre y Maestra",
    abbr: "PUCMM",
    career: "Ingeniería en Software",
    duration: "4 años (12 trimestres)",
    modality: "Presencial",
    campus: "Santiago / Santo Domingo",
    admissionCost: "RD$ 3,500",
    enrollmentCost: "RD$ 12,000",
    creditCost: "RD$ 1,850",
    requirements: ["Bachiller aprobado", "Pruebas de admisión PUCMM", "Récord de notas", "Acta de nacimiento"],
    lastUpdated: "Marzo 2026",
    sourceUrl: "https://www.pucmm.edu.do",
  },
  {
    id: "intec",
    name: "Instituto Tecnológico de Santo Domingo",
    abbr: "INTEC",
    career: "Ingeniería en Software",
    duration: "4 años (12 trimestres)",
    modality: "Presencial / Híbrido",
    campus: "Santo Domingo",
    admissionCost: "RD$ 2,800",
    enrollmentCost: "RD$ 9,500",
    creditCost: "RD$ 1,650",
    requirements: ["Bachiller aprobado", "Pruebas PAA (College Board)", "Récord de notas", "2 fotos 2x2"],
    lastUpdated: "Febrero 2026",
    sourceUrl: "https://www.intec.edu.do",
  },
  {
    id: "unibe",
    name: "Universidad Iberoamericana",
    abbr: "UNIBE",
    career: "Ingeniería en Software",
    duration: "4 años (8 semestres)",
    modality: "Presencial",
    campus: "Santo Domingo",
    admissionCost: "RD$ 4,000",
    enrollmentCost: "RD$ 15,000",
    creditCost: "RD$ 2,100",
    requirements: ["Bachiller aprobado", "Pruebas de admisión UNIBE", "Récord de notas", "Certificado médico"],
    lastUpdated: "Enero 2026",
    sourceUrl: "https://www.unibe.edu.do",
  },
  {
    id: "apec",
    name: "Universidad APEC",
    abbr: "APEC",
    career: "Ingeniería en Software",
    duration: "4 años (12 cuatrimestres)",
    modality: "Presencial / Virtual",
    campus: "Santo Domingo",
    admissionCost: "RD$ 2,500",
    enrollmentCost: "RD$ 8,000",
    creditCost: "RD$ 1,200",
    requirements: ["Bachiller aprobado", "Pruebas PAA", "Récord de notas"],
    lastUpdated: "Marzo 2026",
    sourceUrl: "https://www.unapec.edu.do",
  },
];

const comparisonRows = [
  { key: "duration" as const, label: "Duración", icon: Clock },
  { key: "modality" as const, label: "Modalidad", icon: BookOpen },
  { key: "campus" as const, label: "Campus", icon: MapPin },
  { key: "admissionCost" as const, label: "Costo de admisión", icon: DollarSign },
  { key: "enrollmentCost" as const, label: "Inscripción", icon: DollarSign },
  { key: "creditCost" as const, label: "Costo por crédito", icon: DollarSign },
];

function CompararPage() {
  const [selectedCareer, setSelectedCareer] = useState("Ingeniería en Software");
  const [selectedUnis, setSelectedUnis] = useState<string[]>(["pucmm", "intec"]);
  const [careerDropdownOpen, setCareerDropdownOpen] = useState(false);
  const [uniDropdownOpen, setUniDropdownOpen] = useState(false);

  const selectedData = mockData.filter((u) => selectedUnis.includes(u.id));

  const toggleUni = (id: string) => {
    if (selectedUnis.includes(id)) {
      if (selectedUnis.length > 1) setSelectedUnis(selectedUnis.filter((u) => u !== id));
    } else if (selectedUnis.length < 4) {
      setSelectedUnis([...selectedUnis, id]);
    }
  };

  const removeUni = (id: string) => {
    if (selectedUnis.length > 1) setSelectedUnis(selectedUnis.filter((u) => u !== id));
  };

  // Find the lowest credit cost for highlighting
  const creditValues = selectedData.map((u) => parseInt(u.creditCost.replace(/[^0-9]/g, "")));
  const lowestCredit = Math.min(...creditValues);

  return (
    <div className="min-h-screen">
      {/* Sticky controls */}
      <div className="sticky top-16 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Career selector */}
            <div className="relative flex-1">
              <button
                onClick={() => {
                  setCareerDropdownOpen(!careerDropdownOpen);
                  setUniDropdownOpen(false);
                }}
                className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-card px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>{selectedCareer}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${careerDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {careerDropdownOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-xl border border-border bg-card p-1.5 shadow-premium">
                  {careers.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCareer(c);
                        setCareerDropdownOpen(false);
                      }}
                      className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        c === selectedCareer ? "bg-primary/10 font-medium text-primary" : "text-foreground hover:bg-accent"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* University selector */}
            <div className="relative flex-1">
              <button
                onClick={() => {
                  setUniDropdownOpen(!uniDropdownOpen);
                  setCareerDropdownOpen(false);
                }}
                className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-card px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-primary" />
                  <span>
                    {selectedUnis.length} universidad{selectedUnis.length !== 1 ? "es" : ""} seleccionada{selectedUnis.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${uniDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {uniDropdownOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-xl border border-border bg-card p-1.5 shadow-premium">
                  {mockData.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => toggleUni(u.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        selectedUnis.includes(u.id) ? "bg-primary/10 font-medium text-primary" : "text-foreground hover:bg-accent"
                      }`}
                    >
                      <span>{u.abbr}</span>
                      {selectedUnis.includes(u.id) && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </button>
                  ))}
                  <p className="mt-1 px-3 py-1.5 text-xs text-muted-foreground">
                    Selecciona de 2 a 4 universidades
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Selected tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedData.map((u) => (
              <Badge key={u.id} variant="secondary" className="gap-1.5 rounded-full px-3 py-1.5">
                {u.abbr}
                {selectedUnis.length > 1 && (
                  <button onClick={() => removeUni(u.id)} className="ml-0.5 rounded-full hover:bg-accent">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Comparar: {selectedCareer}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Comparación detallada entre {selectedData.map((u) => u.abbr).join(", ")}
          </p>
        </div>

        {/* University header cards */}
        <div className="mb-8 grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedData.length}, minmax(0, 1fr))` }}>
          <AnimatePresence>
            {selectedData.map((uni) => (
              <motion.div
                key={uni.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="border-border/60 text-center transition-all hover:shadow-premium">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold text-primary">
                      {uni.abbr[0]}
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{uni.abbr}</h3>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">{uni.name}</p>
                    <Badge variant="secondary" className="mt-3 rounded-full text-xs">
                      {uni.career}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Comparison rows */}
        <Card className="overflow-hidden border-border/60">
          <div className="divide-y divide-border/50">
            {comparisonRows.map((row) => (
              <div
                key={row.key}
                className="grid items-center gap-4 p-5 transition-colors hover:bg-accent/30"
                style={{ gridTemplateColumns: `200px repeat(${selectedData.length}, minmax(0, 1fr))` }}
              >
                <div className="flex items-center gap-2.5">
                  <row.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{row.label}</span>
                </div>
                {selectedData.map((uni) => {
                  const value = uni[row.key];
                  const isCheapest =
                    row.key === "creditCost" &&
                    parseInt(value.replace(/[^0-9]/g, "")) === lowestCredit;
                  return (
                    <div key={uni.id} className="text-center">
                      <span className={`text-sm ${isCheapest ? "font-semibold text-cyan" : "text-foreground"}`}>
                        {value}
                      </span>
                      {isCheapest && (
                        <Badge className="ml-2 rounded-full bg-cyan/10 text-xs text-cyan border-0">
                          Más bajo
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Requirements row */}
            <div
              className="grid items-start gap-4 p-5"
              style={{ gridTemplateColumns: `200px repeat(${selectedData.length}, minmax(0, 1fr))` }}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Requisitos</span>
              </div>
              {selectedData.map((uni) => (
                <div key={uni.id} className="space-y-1.5">
                  {uni.requirements.map((req) => (
                    <div key={req} className="flex items-start gap-1.5 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Actions row */}
            <div
              className="grid items-center gap-4 bg-accent/20 p-5"
              style={{ gridTemplateColumns: `200px repeat(${selectedData.length}, minmax(0, 1fr))` }}
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Acciones</span>
              </div>
              {selectedData.map((uni) => (
                <div key={uni.id} className="flex flex-col items-center gap-2">
                  <Button variant="default" size="sm" asChild>
                    <a href={uni.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Fuente oficial
                    </a>
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-3.5 w-3.5" />
                    Ver pensum
                  </Button>
                  <span className="mt-1 text-xs text-muted-foreground">
                    Actualizado: {uni.lastUpdated}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
