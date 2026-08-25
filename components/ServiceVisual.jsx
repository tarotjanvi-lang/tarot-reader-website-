import Image from "next/image";
import ServiceIcon from "./ServiceIcon";

const SERVICE_IMAGES = {
  "tarot-reading": ["/images/tarot_reading_service.png", "Tarot cards, candle and crystals"],
  "energy-healing": ["/images/energy_healing_service.png", "Crystal energy healing illustration"],
  "manifestation-coaching": ["/images/manifestation_coaching_service.png", "Moon and stars manifestation illustration"],
  "soul-guidance": ["/images/soul_guidance_service.png", "Lotus soul guidance illustration"],
  "general-guidance": ["/images/general_guidance_session_service.png", "Tarot guidance illustration"],
  "career-finance": ["/images/career_finance_reading_service.png", "Career and finance tarot illustration"],
  "detailed-life-path": ["/images/detailed_life_path_service.png", "Detailed life path tarot illustration"],
  "love-relationship": ["/images/love_relationship_guidance_service.png", "Love and relationship guidance illustration"],
  "will-they-come-back": ["/images/will_they _come_back_service.png", "Relationship tarot guidance illustration"],
  "future-spouse-marriage-timing": ["/images/future_spouse_marriage_service.png", "Future spouse tarot guidance illustration"],
  "the-connection-truth": ["/images/connection_truth_service.png", "Connection truth tarot illustration"],
  "karmic-contracts": ["/images/karmic_contracts_service.png", "Karmic contracts tarot illustration"],
  "money-block-decoder": ["/images/money_blocker_service.png", "Money block tarot illustration"],
  "the-blockage-behind-the-blockage": ["/images/blockage_behind_blockage_service.png", "Blockage healing illustration"],
  "custom-session": ["/images/custom_session_service.png", "Custom spiritual session illustration"],
};

export default function ServiceVisual({ service, className = "service-card-image" }) {
  const image = SERVICE_IMAGES[service.slug];

  if (!image) return <ServiceIcon type={service.icon} />;

  return (
    <Image
      className={`${className} service-card-image-${service.slug}`}
      src={image[0]}
      alt={image[1]}
      width={768}
      height={512}
      sizes="(max-width: 600px) 100vw, 33vw"
      loading="eager"
    />
  );
}
