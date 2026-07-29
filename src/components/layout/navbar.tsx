"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import { ButtonLink } from "@/components/shared/button-link";
import { Logo } from "@/components/layout/logo";
import { mainNav, serviceCategories } from "@/lib/content";
import { navIconMap } from "@/lib/nav-icons";
import { cn } from "@/lib/utils";

/** Flat visual order of the dropdown (category order, not the raw services array) -- keyboard nav follows this. */
const orderedServiceSlugs = serviceCategories.flatMap((category) => category.slugs);
/** Splits the 4 categories into two side-by-side columns to keep the dropdown compact. */
const serviceCategoryColumns = [serviceCategories.slice(0, 2), serviceCategories.slice(2)];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsCoarsePointer(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const firstLink = mobileMenuRef.current?.querySelector("a");
    (firstLink as HTMLAnchorElement | null)?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        mobileToggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!servicesOpen) return;
    if (document.activeElement === triggerRef.current) {
      itemRefs.current[0]?.focus();
    }
    function onPointerDown(e: PointerEvent) {
      if (!servicesRef.current?.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  }

  function focusItem(index: number) {
    const items = itemRefs.current.filter((el): el is HTMLAnchorElement => el !== null);
    if (!items.length) return;
    const clamped = ((index % items.length) + items.length) % items.length;
    items[clamped]?.focus();
  }

  function handleMenuKeyDown(e: React.KeyboardEvent) {
    const items = itemRefs.current.filter((el): el is HTMLAnchorElement => el !== null);
    const currentIndex = items.indexOf(document.activeElement as HTMLAnchorElement);

    if (e.key === "Escape") {
      e.preventDefault();
      setServicesOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      focusItem(currentIndex + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      focusItem(currentIndex - 1);
    }
  }

  const servicesGroup = mainNav.find(
    (link): link is (typeof mainNav)[number] & { children: ReadonlyArray<{ label: string; href: string; tagline: string; slug: string }> } =>
      "children" in link && Array.isArray(link.children)
  );
  const isServicesActive =
    !!servicesGroup && (isActive(servicesGroup.href) || servicesGroup.children.some((c) => isActive(c.href)));

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={cn(
          "glass flex w-full max-w-6xl items-center justify-between rounded-full transition-[padding,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "px-5 py-2.5 shadow-[0_14px_36px_-16px_rgba(0,0,0,0.16),0_4px_14px_-6px_rgba(0,0,0,0.08)]"
            : "px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
        )}
      >
        <Link href="/" data-cursor-hover>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((link) =>
            "children" in link && link.children ? (
              <div key={link.href} ref={servicesRef} className="relative">
                <button
                  ref={triggerRef}
                  type="button"
                  data-cursor-hover
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  onClick={() => setServicesOpen((v) => (isCoarsePointer ? !v : true))}
                  onMouseEnter={() => !isCoarsePointer && setServicesOpen(true)}
                  onMouseLeave={() => !isCoarsePointer && setServicesOpen(false)}
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium tracking-[0.01em] transition-colors",
                    isServicesActive ? "text-charcoal" : "text-graphite hover:text-deep-blue"
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")} />
                  {isServicesActive && (
                    <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-deep-blue" />
                  )}
                </button>
                {/* Services dropdown with CSS transitions instead of Framer Motion */}
                {servicesOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                    onMouseEnter={() => !isCoarsePointer && setServicesOpen(true)}
                    onMouseLeave={() => !isCoarsePointer && setServicesOpen(false)}
                  >
                    {/* Hover bridge: transparent zone keeps menu open while pointer crosses the gap */}
                  <div
                    id="services-menu"
                    role="menu"
                    aria-label="Services"
                    onKeyDown={handleMenuKeyDown}
                    onMouseEnter={() => !isCoarsePointer && setServicesOpen(true)}
                    onMouseLeave={() => !isCoarsePointer && setServicesOpen(false)}
                    className="animate-dropdown-in w-[420px] max-w-[94vw] origin-top rounded-[20px] border border-border bg-[var(--warm-white)] p-3.5 shadow-[0_20px_44px_-18px_rgba(0,0,0,0.16),0_8px_20px_-10px_rgba(0,0,0,0.08)] lg:w-[560px]"
                  >
                    <div className="grid grid-cols-2 gap-x-6">
                      {serviceCategoryColumns.map((column, columnIndex) => (
                        <div key={columnIndex} className="flex flex-col gap-3">
                          {column.map((category) => (
                            <div key={category.title}>
                              <div className="mb-1.5 border-b border-border/70 pb-1">
                                <p className="text-[10px] font-semibold tracking-[0.14em] text-steel uppercase">
                                  {category.title}
                                </p>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                {category.slugs.map((slug) => {
                                  const child = link.children.find((c) => c.slug === slug);
                                  if (!child) return null;
                                  const Icon = navIconMap[child.slug];
                                  const index = orderedServiceSlugs.indexOf(slug);
                                  return (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      role="menuitem"
                                      data-cursor-hover
                                      ref={(el) => {
                                        itemRefs.current[index] = el;
                                      }}
                                      onClick={() => setServicesOpen(false)}
                                      className="group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 transition-colors duration-200 hover:bg-deep-blue/8 focus-visible:bg-deep-blue/8"
                                    >
                                      <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 scale-y-0 rounded-full bg-deep-blue transition-transform duration-200 group-hover:scale-y-100 group-focus-visible:scale-y-100" />
                                      {Icon && (
                                        <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center text-steel transition-colors duration-200 group-hover:text-deep-blue">
                                          <Icon className="h-5 w-5" />
                                        </span>
                                      )}
                                      <span className="flex min-w-0 flex-col">
                                        <span className="truncate text-[16px] leading-tight font-medium text-charcoal transition-colors duration-200 group-hover:text-deep-blue">
                                          {child.label}
                                        </span>
                                        <span className="truncate text-[13px] leading-tight text-steel">{child.tagline}</span>
                                      </span>
                                      {isActive(child.href) && (
                                        <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-deep-blue" />
                                      )}
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2.5 border-t border-border pt-2">
                      <Link
                        href="/services"
                        data-cursor-hover
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium text-deep-blue hover:bg-deep-blue/8"
                      >
                        View all services <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                data-cursor-hover
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium tracking-[0.01em] transition-colors",
                  isActive(link.href) ? "text-charcoal" : "text-graphite hover:text-deep-blue"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-deep-blue" />
                )}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex">
          <ButtonLink
            href="/contact"
            variant="cta"
            size="sm"
            className="rounded-full transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(234,88,12,0.4)]"
            data-cursor-hover
          >
            Talk to us <ArrowRight className="h-3.5 w-3.5" />
          </ButtonLink>
        </div>

        <button
          ref={mobileToggleRef}
          className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-charcoal lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu with CSS transitions instead of Framer Motion */}
      {open && (
        <div
          id="mobile-nav-menu"
          role="navigation"
          aria-label="Mobile"
          ref={mobileMenuRef}
          className="animate-menu-in glass absolute inset-x-3 top-[72px] z-40 flex max-h-[70vh] flex-col gap-0.5 overflow-y-auto rounded-2xl p-3 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.18),0_10px_28px_-10px_rgba(0,0,0,0.1)] lg:hidden"
        >
          {mainNav.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center rounded-2xl px-4 text-sm font-medium text-charcoal hover:bg-deep-blue/5"
              >
                {link.label}
              </Link>
              {"children" in link && link.children && (
                <div className="ml-3 flex flex-col border-l border-border pl-3">
                  {link.children.map((child) => {
                    const Icon = navIconMap[child.slug];
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-sm text-steel hover:text-charcoal"
                      >
                        {Icon && (
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-charcoal">
                            <Icon className="h-4 w-4" />
                          </span>
                        )}
                        <span className="flex flex-col">
                          {child.label}
                          <span className="block text-xs text-steel">{child.tagline}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <div className="mt-2 border-t border-border pt-3">
            <ButtonLink
              href="/contact"
              onClick={() => setOpen(false)}
              variant="cta"
              size="lg"
              className="w-full rounded-full"
            >
              Talk to us
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
