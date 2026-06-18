/*
 * CRIBRO.PRO — Footer
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "2.5rem 0",
        background: "#0a0a0a",
      }}
    >
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              color: "rgba(245,245,240,0.4)",
              textTransform: "uppercase",
            }}
          >
            CRIBRO
          </span>
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem",
            color: "rgba(245,245,240,0.3)",
          }}
        >
          © {year} Maciej Wyrozumski · cribro.pro
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://maciej.pro"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(245,245,240,0.35)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#4ade80")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "rgba(245,245,240,0.35)")
            }
          >
            maciej.pro
          </a>
          <a
            href="mailto:maciej@cribro.pro"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(245,245,240,0.35)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#4ade80")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "rgba(245,245,240,0.35)")
            }
          >
            maciej@cribro.pro
          </a>
        </div>
      </div>
    </footer>
  );
}
