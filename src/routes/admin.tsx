import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  Settings,
  Menu,
  X,
  Plus,
  Search,
  MoreHorizontal,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin — ComparaU" },
      { name: "description", content: "Panel de administración de ComparaU." },
    ],
  }),
});

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Universidades", icon: Building2 },
  { label: "Carreras", icon: GraduationCap },
  { label: "Programas", icon: BookOpen },
  { label: "Configuración", icon: Settings },
];

const recentUniversities = [
  { name: "PUCMM", programs: 45, status: "Activa", updated: "Hace 2 días" },
  { name: "INTEC", programs: 38, status: "Activa", updated: "Hace 3 días" },
  { name: "UNIBE", programs: 32, status: "Activa", updated: "Hace 1 semana" },
  { name: "UNPHU", programs: 40, status: "Pendiente", updated: "Hace 2 semanas" },
  { name: "APEC", programs: 28, status: "Activa", updated: "Hace 1 día" },
];

const recentPrograms = [
  { career: "Ingeniería en Software", university: "PUCMM", cost: "RD$ 1,850/cr", status: "Verificado" },
  { career: "Medicina", university: "UNIBE", cost: "RD$ 2,500/cr", status: "Verificado" },
  { career: "Psicología", university: "INTEC", cost: "RD$ 1,650/cr", status: "Pendiente" },
  { career: "Derecho", university: "UASD", cost: "RD$ 450/cr", status: "Verificado" },
];

function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 top-16 z-30 w-64 transform border-r border-border bg-card transition-transform lg:relative lg:top-0 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-4 lg:hidden">
            <span className="text-sm font-semibold text-foreground">Admin</span>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveTab(item.label);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === item.label
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1">
        <div className="border-b border-border bg-card px-4 py-3 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 hover:bg-accent lg:hidden"
              >
                <Menu className="h-5 w-5 text-muted-foreground" />
              </button>
              <h1 className="text-lg font-semibold text-foreground">{activeTab}</h1>
            </div>
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4" />
              Agregar
            </Button>
          </div>
        </div>

        <div className="p-4 lg:p-8">
          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Universidades", value: "52", change: "+3" },
              { label: "Carreras", value: "128", change: "+12" },
              { label: "Programas", value: "534", change: "+28" },
              { label: "Comparaciones hoy", value: "1,247", change: "+18%" },
            ].map((stat) => (
              <Card key={stat.label} className="border-border/60">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                    <Badge variant="secondary" className="rounded-full text-xs text-cyan">
                      {stat.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Universities table */}
            <Card className="border-border/60">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-base">Universidades recientes</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-primary">Ver todas</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {recentUniversities.map((uni) => (
                    <div
                      key={uni.name}
                      className="flex items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-accent/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                          {uni.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{uni.name}</p>
                          <p className="text-xs text-muted-foreground">{uni.programs} programas · {uni.updated}</p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`rounded-full text-xs ${
                          uni.status === "Activa" ? "text-cyan" : "text-muted-foreground"
                        }`}
                      >
                        {uni.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Programs table */}
            <Card className="border-border/60">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-base">Programas recientes</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-primary">Ver todos</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {recentPrograms.map((prog) => (
                    <div
                      key={`${prog.career}-${prog.university}`}
                      className="flex items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-accent/30"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{prog.career}</p>
                        <p className="text-xs text-muted-foreground">{prog.university} · {prog.cost}</p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`rounded-full text-xs ${
                          prog.status === "Verificado" ? "text-cyan" : "text-muted-foreground"
                        }`}
                      >
                        {prog.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
