import { useEffect, useState, type CSSProperties } from "react";

interface TypewriterTextProps {
  phrases: string[];
  className?: string;
  style?: CSSProperties;
}

export default function TypewriterText({
  phrases,
  className = "",
  style,
}: TypewriterTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const current = phrases[phraseIndex] || "";
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIndex < current.length) {
        const nextChar = current[charIndex];
        // Natural typing pace with slight pause for newlines or spaces
        const delay = nextChar === "\n" ? 140 : nextChar === " " ? 40 : 55;
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, delay);
      } else {
        // Hold phrase at full length for comfortable reading
        timeout = setTimeout(() => setDeleting(true), 2400);
      }
    } else {
      if (charIndex > 0) {
        // Smooth and swift erasing
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 22);
      } else {
        // Pause briefly at empty state before starting next phrase
        timeout = setTimeout(() => {
          setDeleting(false);
          setPhraseIndex((i) => (i + 1) % phrases.length);
          setCharIndex(0);
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex, phrases]);

  return (
    <span
      className={`typewriter-container ${className}`}
      style={{
        display: "inline-block",
        whiteSpace: "pre-line",
        ...style,
      }}
    >
      <span>{displayed}</span>
      <span
        className="typewriter-caret inline-block"
        style={{
          marginLeft: "2px",
          color: "var(--accent-base)",
          fontWeight: 300,
          opacity: 0.9,
          verticalAlign: "baseline",
        }}
      >
        |
      </span>
    </span>
  );
}
