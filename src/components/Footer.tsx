import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

const footerLinks = {
  Plataforma: [
    { label: "Comparar carreras", to: "/comparar" },
    { label: "Universidades", to: "/universidades" },
    { label: "Carreras", to: "/carreras" },
  ],
  Recursos: [
    { label: "¿Cómo funciona?", to: "/" },
    { label: "Blog", to: "/" },
    { label: "Preguntas frecuentes", to: "/" },
  ],
  Legal: [
    { label: "Términos de uso", to: "/" },
    { label: "Privacidad", to: "/" },
    { label: "Contacto", to: "/" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Compara<span className="text-gradient-primary">U</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Compara universidades. Decide mejor. La plataforma más completa para comparar programas universitarios en República Dominicana.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ComparaU. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Hecho con 💙 en RD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
