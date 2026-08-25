import Image from "next/image";
import ServiceIcon from "./ServiceIcon";

const SERVICE_IMAGES = {
  // Base services
  "tarot-reading": ["/images/tarot_reading_service.png", "Tarot cards, candle and crystals"],
  "energy-healing": ["/images/energy_healing_service.png", "Crystal energy healing illustration"],
  "manifestation-coaching": ["/images/manifestation_coaching_service.png", "Moon and stars manifestation illustration"],
  "soul-guidance": ["/images/soul_guidance_service.png", "Lotus soul guidance illustration"],
  "love-relationship": ["/images/love_relationship_guidance_service.png", "Love and relationship guidance illustration"],
  "custom-session": ["/images/custom_session_service.png", "Custom spiritual session illustration"],
  
  // Tarot readings
  "general-guidance": ["/images/general_guidance_session_service.png", "General guidance tarot illustration"],
  "career-finance": ["/images/career_finance_reading_service.png", "Career and finance tarot illustration"],
  "detailed-life-path": ["/images/detailed_life_path_service.png", "Detailed life path tarot illustration"],
  "will-they-come-back": ["/images/will_they _come_back_service.png", "Will they come back tarot illustration"],
  "future-spouse-marriage-timing": ["/images/future_spouse_marriage_service.png", "Future spouse marriage tarot illustration"],
  "the-connection-truth": ["/images/connection_truth_service.png", "Connection truth tarot illustration"],
  "karmic-contracts": ["/images/karmic_contracts_service.png", "Karmic contracts tarot illustration"],
  "money-block-decoder": ["/images/money_blocker_service.png", "Money block decoder illustration"],
  "the-blockage-behind-the-blockage": ["/images/blockage_behind_blockage_service.png", "Blockage behind blockage healing illustration"],
  
  // SoulMirror healings - 3-Day
  "lunar-release": ["/images/lunar_release_service.png", "Lunar release healing illustration"],
  "mirror-reclaim": ["/images/mirror_reclaim_service.png", "Mirror reclaim healing illustration"],
  "cord-unbound": ["/images/cord_unbound_service.png", "Cord unbound healing illustration"],
  "unspoken": ["/images/unspoken_service.png", "Unspoken healing illustration"],
  "aura-veil": ["/images/aura_veil_service.png", "Aura veil healing illustration"],
  
  // SoulMirror healings - 5-Day
  "rose-rebirth": ["/images/rose_rebirth_service.png", "Rose rebirth healing illustration"],
  "ember-restoration": ["/images/ember_restoration_service.png", "Ember restoration healing illustration"],
  "venus-renewal": ["/images/venus_renewal_service.png", "Venus renewal healing illustration"],
  "crown-awakening": ["/images/crown_awakening_service.png", "Crown awakening healing illustration"],
  "golden-current": ["/images/golden_current_service.png", "Golden current healing illustration"],
  "doorway-clearing": ["/images/doorway_cleaning_service.png", "Doorway clearing healing illustration"],
  
  // SoulMirror healings - 7-Day Deep Healing
  "ancestral-release": ["/images/ancestral_release_service.png", "Ancestral release healing illustration"],
  "beyond-the-veil": ["/images/beyond_veil_service.png", "Beyond the veil healing illustration"],
  "destiny-reset": ["/images/destiny_reset_service.png", "Destiny reset healing illustration"],
  
  // SoulMirror healings - 11-Day Deep Transformation
  "rebirth-code": ["/images/rebirth_code_service.png", "Rebirth code transformation illustration"],
  
  // Other services
  "intentional-spellwork": ["/images/intentional_spellwork_service.png", "Intentional spellwork illustration"],
  "custom-soulmirror-session": ["/images/custom_soulmirror_session_service.png", "Custom SoulMirror session illustration"],
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
