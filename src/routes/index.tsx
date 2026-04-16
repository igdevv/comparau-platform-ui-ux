import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  GraduationCap,
  Building2,
  BarChart3,
  CheckCircle2,
  BookOpen,
  DollarSign,
  Clock,
  MapPin,
  ExternalLink,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "ComparaU — Compara universidades en RD. Decide mejor." },
      { name: "description", content: "Compara programas universitarios en República Dominicana. Elige tu carrera, selecciona universidades y compáralas lado a lado por costos, duración, pensum y más." },
    ],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const universities = [
  { name: "PUCMM", full: "Pontificia Universidad Católica Madre y Maestra" },
  { name: "INTEC", full: "Instituto Tecnológico de Santo Domingo" },
  { name: "UNIBE", full: "Universidad Iberoamericana" },
  { name: "UNPHU", full: "Universidad Nacional Pedro Henríquez Ureña" },
  { name: "APEC", full: "Universidad APEC" },
  { name: "UASD", full: "Universidad Autónoma de Santo Domingo" },
];

const featuredComparisons = [
  {
    career: "Ingeniería en Software",
    universities: ["PUCMM", "INTEC"],
    badge: "Popular",
    icon: "💻",
  },
  {
    career: "Medicina",
    universities: ["UNIBE", "UNPHU"],
    badge: "Más buscada",
    icon: "🩺",
  },
  {
    career: "Psicología",
    universities: ["APEC", "INTEC"],
    badge: "Trending",
    icon: "🧠",
  },
  {
    career: "Derecho",
    universities: ["PUCMM", "UASD"],
    badge: "Clásica",
    icon: "⚖️",
  },
];

const steps = [
  {
    icon: BookOpen,
    title: "Elige una carrera",
    description: "Busca entre cientos de programas universitarios disponibles en RD.",
    step: "01",
  },
  {
    icon: Building2,
    title: "Selecciona universidades",
    description: "Escoge de 2 a 4 universidades para comparar lado a lado.",
    step: "02",
  },
  {
    icon: BarChart3,
    title: "Compara y decide",
    description: "Analiza costos, duración, pensum y más para tomar la mejor decisión.",
    step: "03",
  },
];

const stats = [
  { value: "50+", label: "Universidades" },
  { value: "500+", label: "Programas" },
  { value: "10K+", label: "Comparaciones" },
  { value: "100%", label: "Gratis" },
];

function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-hero">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -left-20 top-40 h-[300px] w-[300px] rounded-full bg-cyan/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <Badge variant="secondary" className="mb-6 rounded-full border-primary/10 px-4 py-1.5 text-sm font-medium">
                <Star className="mr-1.5 h-3.5 w-3.5 text-cyan" />
                La plataforma #1 para comparar universidades en RD
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
            >
              Compara universidades.{" "}
              <span className="text-gradient-primary">Decide mejor.</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
            >
              Encuentra y compara programas universitarios en República Dominicana.
              Analiza costos, duración, pensum y más — todo en un solo lugar.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/comparar">
                  <Search className="h-5 w-5" />
                  Compara ahora
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/carreras">
                  Explorar carreras
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Comparisons */}
      <section className="border-t border-border/50 bg-card py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Comparaciones populares
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Descubre las comparaciones más buscadas por estudiantes como tú.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredComparisons.map((comp, i) => (
              <motion.div
                key={comp.career}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Card className="group cursor-pointer border-border/60 transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <span className="text-3xl">{comp.icon}</span>
                      <Badge variant="secondary" className="rounded-full text-xs">
                        {comp.badge}
                      </Badge>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">
                      {comp.career}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {comp.universities.join(" vs ")}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary transition-colors group-hover:text-cyan">
                      Comparar
                      <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              ¿Cómo funciona?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tres pasos simples para encontrar tu programa ideal.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.45 }}
              >
                <Card className="relative overflow-hidden border-border/60 transition-all duration-300 hover:shadow-premium">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-4xl font-extrabold text-border">{step.step}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Universities */}
      <section className="border-t border-border/50 bg-card py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Universidades disponibles
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Las principales universidades de República Dominicana en una sola plataforma.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {universities.map((uni, i) => (
              <motion.div
                key={uni.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <Card className="group cursor-pointer border-border/60 transition-all duration-300 hover:shadow-premium hover:border-primary/20">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                      {uni.name[0]}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-foreground">{uni.name}</h3>
                      <p className="truncate text-sm text-muted-foreground">{uni.full}</p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:text-primary group-hover:translate-x-0.5" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/universidades">
                Ver todas las universidades
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-0 bg-gradient-primary shadow-glow-primary">
            <CardContent className="px-8 py-16 text-center sm:px-16 sm:py-20">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                ¿Listo para comparar?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
                Encuentra el programa perfecto para ti. Compara costos, duración, pensum y más en segundos.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="xl"
                  className="bg-card text-primary shadow-lg hover:bg-card/90"
                  asChild
                >
                  <Link to="/comparar">
                    <Search className="h-5 w-5" />
                    Compara ahora
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
