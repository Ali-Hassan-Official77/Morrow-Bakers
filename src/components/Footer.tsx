import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const exploreLinks = [
    ["/shop", "All bakes"],
    ["/#story", "Our kitchen"],
    ["/#journal", "Journal"],
    ["/#visit", "Find us"],
  ];

  return (
    <footer id="visit" className="bg-coffee text-white">
      <div className="container-wide py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_.7fr_.8fr_1fr]">

          {/* Brand */}
          <div>
            <Logo
              className="text-white"
              markClassName="bg-white text-coffee"
            />

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">
              Small-batch baking with a big soft spot for warm mornings,
              good coffee and things worth slowing down for.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[.18em] text-white/55">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Baking fresh today
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-white/35">
              Explore
            </p>

            {exploreLinks.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="mb-3 block text-sm text-white/65 transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-white/35">
              Say hello
            </p>

            <a
              href="mailto:khanshaamil92@gmail.com"
              className="mb-3 flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
            >
              <Mail size={15} />
              khanshaamil92@gmail.com
            </a>

            <a
              href="tel:+9230018845217"
              className="mb-3 flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
            >
              <Phone size={15} />
              +92 300 188 45217
            </a>

            <p className="flex items-center gap-2 text-sm text-white/65">
              <MapPin size={15} />
              Rawalpindi, Pakistan
            </p>
          </div>

          {/* Visit */}
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-white/35">
              Visit
            </p>

            <p className="text-sm leading-7 text-white/65">
              Mon–Sat · 7:30 AM — 8 PM
              <br />
              Sun · 8 AM — 4 PM
              <br />
              Pickup & local delivery available.
            </p>

            <div className="mt-6 flex gap-2">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition-all hover:border-white/25 hover:bg-white/5"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* External */}
              <a
                href="#"
                aria-label="External link"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition-all hover:border-white/25 hover:bg-white/5"
              >
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.18em] text-white/30">
          © {new Date().getFullYear()} Morrow Bakehouse · Made with patience.
        </div>
      </div>
    </footer>
  );
}