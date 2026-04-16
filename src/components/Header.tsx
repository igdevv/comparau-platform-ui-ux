import { Link, useLocation } from "@tanstack/react-router";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Inicio", to: "/" },
  { label: "Comparar", to: "/comparar" },
  { label: "Universidades", to: "/universidades" },
  { label: "Carreras", to: "/carreras" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Compara<span className="text-gradient-primary">U</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                location.pathname === link.to
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="hero" size="default" asChild>
            <Link to="/comparar">Compara ahora</Link>
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 border-t border-border/50 pt-3">
            <Button variant="hero" size="lg" className="w-full" asChild>
              <Link to="/comparar" onClick={() => setMobileOpen(false)}>Compara ahora</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
