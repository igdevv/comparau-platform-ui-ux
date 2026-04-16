import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  MapPin,
  BookOpen,
  DollarSign,
  ExternalLink,
  ArrowLeft,
  Clock,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/universidades/$uniId")({
  component: UniversityDetailPage,
  head: () => ({
    meta: [
      { title: "Detalle de Universidad — ComparaU" },
      { name: "description", content: "Información detallada de la universidad, programas disponibles y costos." },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">Universidad no encontrada</p>
        <Link to="/universidades" className="mt-2 text-sm text-primary hover:underline">
          Volver a universidades
        </Link>
      </div>
    </div>
  ),
});

const uniDetails: Record<string, {
  abbr: string; name: string; location: string; type: string; description: string;
  campus: string[]; careers: string[]; admissionCost: string; creditCost: string;
  enrollmentCost: string; website: string;
}> = {
  pucmm: {
    abbr: "PUCMM", name: "Pontificia Universidad Católica Madre y Maestra",
    location: "Santiago / Santo Domingo", type: "Privada",
    description: "Fundada en 1962, es una de las universidades más prestigiosas de RD con campus en Santiago y Santo Domingo.",
    campus: ["Campus Santiago", "Campus Santo Domingo (RSTA)"],
    careers: ["Ingeniería en Software", "Medicina", "Derecho", "Arquitectura", "Psicología", "Administración de Empresas", "Ingeniería Civil", "Mercadeo"],
    admissionCost: "RD$ 3,500", creditCost: "RD$ 1,850", enrollmentCost: "RD$ 12,000",
    website: "https://www.pucmm.edu.do",
  },
  intec: {
    abbr: "INTEC", name: "Instituto Tecnológico de Santo Domingo",
    location: "Santo Domingo", type: "Privada",
    description: "Fundado en 1972, es reconocido por su excelencia académica y enfoque en ciencia y tecnología.",
    campus: ["Campus Zona Universitaria, Santo Domingo"],
    careers: ["Ingeniería en Software", "Medicina", "Psicología", "Ingeniería Industrial", "Economía", "Derecho"],
    admissionCost: "RD$ 2,800", creditCost: "RD$ 1,650", enrollmentCost: "RD$ 9,500",
    website: "https://www.intec.edu.do",
  },
};

function UniversityDetailPage() {
  const { uniId } = Route.useParams();
  const uni = uniDetails[uniId];

  if (!uni) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-lg text-muted-foreground">Universidad no encontrada.</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/universidades"><ArrowLeft className="h-4 w-4" /> Volver</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground" asChild>
        <Link to="/universidades"><ArrowLeft className="h-4 w-4" /> Universidades</Link>
      </Button>

      {/* Hero */}
      <div className="mb-10 flex items-start gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
          {uni.abbr[0]}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{uni.abbr}</h1>
            <Badge variant="secondary" className="rounded-full">{uni.type}</Badge>
          </div>
          <p className="mt-1 text-muted-foreground">{uni.name}</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{uni.description}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Info cards */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="border-border/60">
            <CardHeader><CardTitle className="text-base">Información general</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{uni.location}</span>
              </div>
              {uni.campus.map((c) => (
                <div key={c} className="flex items-center gap-3 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{c}</span>
                </div>
              ))}
              <div className="border-t border-border pt-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={uni.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" /> Sitio oficial
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader><CardTitle className="text-base">Costos</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Admisión", value: uni.admissionCost },
                { label: "Inscripción", value: uni.enrollmentCost },
                { label: "Por crédito", value: uni.creditCost },
              ].map((c) => (
                <div key={c.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{c.label}</span>
                  <span className="font-semibold text-foreground">{c.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Careers */}
        <div className="lg:col-span-2">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Carreras disponibles ({uni.careers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {uni.careers.map((career) => (
                  <div
                    key={career}
                    className="flex items-center justify-between rounded-xl border border-border/60 p-4 transition-colors hover:bg-accent/30"
                  >
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{career}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs text-primary" asChild>
                      <Link to="/comparar">Comparar</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
