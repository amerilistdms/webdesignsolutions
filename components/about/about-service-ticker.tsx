import "./about-service-ticker.css";

const TICKER_ITEMS = [
  "Web Design",
  "E-Commerce",
  "SEO",
  "Email Marketing",
  "Social Media",
  "Branding",
  "Digital Ads",
  "Hosting",
] as const;

export function AboutServiceTicker() {
  const track = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="about-ticker" aria-hidden>
      <div className="about-ticker__track">
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="about-ticker__item">
            {item}
            <span className="about-ticker__dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
