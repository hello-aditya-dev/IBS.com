import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { FacebookIcon, LinkedinIcon } from "@/components/shared/social-icons";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/layout/container";
import { company, services, amcService } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background bg-engineering-grid">
      <Container className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-xs font-semibold tracking-[0.1em] text-deep-blue uppercase">{company.positioning}</p>
            <p className="max-w-xs text-sm text-steel">
              {company.legalName} helps organizations design, deploy, and maintain communication, networking, AV,
              and security systems. From planning to long-term support, we focus on technology that works reliably
              every day.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-steel transition-colors hover:border-deep-blue/40 hover:text-deep-blue"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={company.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-steel transition-colors hover:border-deep-blue/40 hover:text-deep-blue"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-charcoal">Services</h3>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="block min-h-[44px] text-sm leading-[44px] text-steel transition-colors hover:text-charcoal">
                    {s.navLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/services/${amcService.slug}`} className="block min-h-[44px] text-sm leading-[44px] text-steel transition-colors hover:text-charcoal">
                  {amcService.navLabel}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-charcoal">Company</h3>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/about" className="block min-h-[44px] text-sm leading-[44px] text-steel transition-colors hover:text-charcoal">About</Link></li>
              <li><Link href="/who-we-serve" className="block min-h-[44px] text-sm leading-[44px] text-steel transition-colors hover:text-charcoal">Who We Serve</Link></li>
              <li><Link href="/partners" className="block min-h-[44px] text-sm leading-[44px] text-steel transition-colors hover:text-charcoal">Partners</Link></li>
              <li><Link href="/quality" className="block min-h-[44px] text-sm leading-[44px] text-steel transition-colors hover:text-charcoal">Quality & Support</Link></li>
              <li><Link href="/careers" className="block min-h-[44px] text-sm leading-[44px] text-steel transition-colors hover:text-charcoal">Careers</Link></li>
              <li><Link href="/contact" className="block min-h-[44px] text-sm leading-[44px] text-steel transition-colors hover:text-charcoal">Contact</Link></li>
            </ul>
            <p className="mt-2 text-xs text-steel">
              Interested in joining IBS? <Link href="/careers" className="underline underline-offset-2 hover:text-charcoal">Get in touch</Link>.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-charcoal">Reach Us</h3>
            <ul className="flex flex-col gap-3 text-sm text-steel">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-deep-blue" />
                <span>{company.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-deep-blue" />
                <div className="flex flex-col">
                  {company.contact.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block min-h-[44px] leading-[44px] hover:text-charcoal">
                      {p}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-deep-blue" />
                <a href={`mailto:${company.contact.email}`} className="hover:text-charcoal">
                  {company.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-2">
              {company.serviceAreas.map((area) => (
                <span key={area} className="rounded-full border border-border px-3 py-1.5 text-xs text-steel">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-steel sm:flex-row">
          <p>Copyright © {company.legalName} {new Date().getFullYear()}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-charcoal">
              Privacy Policy
            </Link>
            <Link href="/credits" className="hover:text-charcoal">
              Image credits
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
