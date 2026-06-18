import { useEffect, useState } from "react";

interface TypewriterTextProps {
  phrases: string[];
  className?: string;
}

export default function TypewriterText({ phrases, className = "" }: TypewriterTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex <= current.length) {
      setDisplayed(current.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 60);
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex >= 0) {
      setDisplayed(current.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 35);
    } else if (deleting && charIndex < 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex, phrases]);

  return (
    <span className={`typewriter-cursor ${className}`}>{displayed}</span>
  );
}
