"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, MapPin, ExternalLink } from "lucide-react";

interface ViewOnMapProps {
  address?: string;
  className?: string;
}

export function ViewOnMap({
  address = "4/1, Prem Nagar, Tihar, Janakpuri, New Delhi - 110018",
  className = "",
}: ViewOnMapProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen) setIsMapLoaded(false);
  };

  const springConfig = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  };

  // Google Maps embed URL (no API key required) for the inline preview.
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  // Google Maps external link — opens the full maps.google.com experience.
  const mapExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className={`flex w-full flex-col items-center justify-center ${className}`}>
      <div className="relative flex w-full items-center justify-center">
        <AnimatePresence mode="popLayout">
          {!isOpen ? (
            <motion.button
              key="button"
              layoutId="map-container"
              type="button"
              onClick={toggleOpen}
              className="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border bg-card shadow-sm transition-colors hover:border-deep-blue/30"
              style={{ width: 180, height: 52 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={springConfig}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="View office location on map"
            >
              <motion.div
                layoutId="map-bg"
                className="absolute inset-0 opacity-10 transition-opacity"
                // Decorative map-grid backdrop, drawn in CSS instead of an
                // external image. Previously this pointed at an Unsplash
                // photo (photo-1526778548025-fa2f459cd5ce) that 404s on
                // the Unsplash CDN — a broken external link. A CSS pattern
                // is also faster (no third-party request) and can't rot.
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(15,23,42,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.4) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <motion.div className="relative z-10 flex items-center gap-3 px-4 py-4">
                <MapPin className="h-5 w-5 text-deep-blue transition-colors group-hover:text-deep-blue/80" />
                <span className="text-[16px] font-semibold tracking-tight text-charcoal">
                  View on Map
                </span>
              </motion.div>
            </motion.button>
          ) : (
            <motion.div
              key="map"
              layoutId="map-container"
              className="relative aspect-square w-[calc(100vw-64px)] overflow-hidden rounded-3xl border border-border bg-muted shadow-lg sm:w-[380px]"
              transition={springConfig}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="absolute inset-0 h-full w-full"
                style={{ filter: "invert(15%) hue-rotate(180deg)" }}
              >
                <iframe
                  title="IBS office location map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src={mapEmbedUrl}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setIsMapLoaded(true)}
                  className={`h-full w-full transition-opacity duration-700 ${isMapLoaded ? "opacity-100" : "opacity-0"}`}
                />
              </motion.div>

              {!isMapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-card">
                  <Loader2 className="h-8 w-8 animate-spin text-steel" />
                </div>
              )}

              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                type="button"
                onClick={toggleOpen}
                aria-label="Close map"
                className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-warm-white text-steel shadow-lg transition-all hover:bg-secondary active:scale-90 sm:top-5 sm:right-5"
              >
                <X className="h-5 w-5" strokeWidth={3} />
              </motion.button>

              <a
                href={mapExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 z-50 flex items-center gap-1.5 rounded-full border border-border bg-warm-white/95 px-3 py-1.5 text-xs font-semibold text-charcoal shadow-lg backdrop-blur transition-all hover:border-deep-blue/30 hover:text-deep-blue"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open in Google Maps
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}