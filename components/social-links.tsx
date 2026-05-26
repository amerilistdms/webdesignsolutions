import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

/** Font Awesome 6 brand marks — consistent family and weight. */
const items = [
  { href: "https://www.facebook.com/", label: "Facebook", Icon: FaFacebookF },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    Icon: FaInstagram,
  },
  { href: "https://www.linkedin.com/", label: "LinkedIn", Icon: FaLinkedinIn },
  { href: "https://x.com/", label: "X", Icon: FaXTwitter },
] as const;

type SocialLinksProps = {
  variant: "header" | "footer";
};

export function SocialLinks({ variant }: SocialLinksProps) {
  const chip =
    variant === "header"
      ? "border-white/25 bg-white/[0.08] text-white hover:border-white/40 hover:bg-white/12 hover:text-white"
      : "border-white/20 bg-white/[0.06] text-white hover:border-white/35 hover:bg-white/10 hover:text-white";

  return (
    <ul className="flex items-center gap-2">
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex size-9 items-center justify-center rounded-full border transition ${chip}`}
            aria-label={label}
          >
            <Icon className="size-[18px] shrink-0" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
