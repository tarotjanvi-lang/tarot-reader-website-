import Image from "next/image";
import ServiceIcon from "./ServiceIcon";

export default function ServiceVisual({ service, className = "service-card-image" }) {
  const { lightImage, darkImage, imageAlt } = service;

  if (!lightImage) return <ServiceIcon type={service.icon} />;

  const imageProps = {
    width: 768,
    height: 512,
    sizes: "(max-width: 600px) 100vw, (max-width: 1080px) 50vw, 25vw",
    loading: "lazy",
    quality: 70,
  };

  return <>
    <Image {...imageProps} className={`${className} service-card-image-light service-card-image-${service.slug}`} src={lightImage} alt={imageAlt} />
    {darkImage && <Image {...imageProps} className={`${className} service-card-image-dark service-card-image-${service.slug}`} src={darkImage} alt={imageAlt} />}
  </>;
}
