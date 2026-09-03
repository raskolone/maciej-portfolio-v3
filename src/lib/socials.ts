import { Linkedin, Github, Instagram, Youtube, type LucideIcon } from "lucide-react";

/**
 * Profile społecznościowe — jedno miejsce dla stopki, kontaktu i hero.
 *
 * `url: null` znaczy "profil jeszcze nie istnieje": taki wpis nie jest
 * nigdzie renderowany, więc na stronie nie pojawi się martwy odnośnik.
 * Żeby go włączyć, wystarczy wkleić adres poniżej — pokaże się od razu
 * we wszystkich trzech miejscach.
 */
export interface Social {
  name: string;
  icon: LucideIcon;
  url: string | null;
}

export const SOCIALS: Social[] = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/maciej-pro",
  },
  {
    name: "Instagram",
    icon: Instagram,
    // TODO: wkleić adres profilu na Instagramie, gdy powstanie.
    url: null,
  },
  {
    name: "YouTube",
    icon: Youtube,
    // TODO: wkleić adres kanału na YouTube, gdy powstanie.
    url: null,
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/raskolone?tab=repositories",
  },
];

/** Tylko te profile, które faktycznie da się otworzyć. */
export const activeSocials = () => SOCIALS.filter((s): s is Social & { url: string } => s.url !== null);
