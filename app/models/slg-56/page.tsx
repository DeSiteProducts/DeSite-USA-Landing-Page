import ModelDetailPage from "../_components/model-detail-page";

const videos = [
  {
    title: "SLG 56 Overview",
    embedUrl: "https://player.vimeo.com/video/1125998905?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 56 In Action",
    embedUrl: "https://player.vimeo.com/video/970371995?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 56 Product Demo",
    embedUrl: "https://player.vimeo.com/video/1006286529?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 56 Screening Demo",
    embedUrl: "https://player.vimeo.com/video/970809028?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 56 Towable Spring Loaded Grizzly | Mesh System",
    embedUrl: "https://player.vimeo.com/video/967214871?share=copy&fl=sv&fe=ci",
  }
];

const featureVideos = [
  {
    title: "C SPRING SUSPENSION SYSTEM",
    embedUrl: "https://player.vimeo.com/video/1125998905?share=copy&fl=sv&fe=ci",
    description:
      "The C Spring Suspension System enables the action and reaction of the screen deck during the screening process.",
  },
  {
    title: "REMOVABLE WHEELS SYSTEM",
    embedUrl: "https://player.vimeo.com/video/970371995?share=copy&fl=sv&fe=ci",
    description:
      "The SLG 56 Mini is built lightweight and compact, with removable wheels for easier mobility.",
  },
  {
    title: "QUICK DISCONNECT HITCH SYSTEM",
    embedUrl: "https://player.vimeo.com/video/1006286529?share=copy&fl=sv&fe=ci",
    description:
      "The quick disconnect hitch can be detached and stored during screening, then reattached when the machine needs to move.",
  },
  {
    title: "RUBBER SCREEN DECK SKIRTS",
    embedUrl: "https://player.vimeo.com/video/970809028?share=copy&fl=sv&fe=ci",
    description:
      "Rubber skirts along the screen deck help catch loose material and reduce spillover for a cleaner work area.",
  },
];

const equipmentIcons = [
  { src: "/68/icons/Miniexcavators68.webp", label: "MINI EXCAVATOR" },
  { src: "/68/icons/MiniSkidsteers68.webp", label: "STAND ON SKID STEER" },
  { src: "/68/icons/SubCompacttractors68.webp", label: "MINI TRACTOR" },
];

const specs = [
  {
    title: "MACHINE DIMENSIONS",
    rows: [
      { label: "Machine Width", value: "74 inches" },
      { label: "Machine Height", value: "61.4 inches" },
    ],
  },
  {
    title: "SCREEN DECK",
    rows: [
      { label: "Screen Deck Width", value: "63 inches" },
      { label: "Screen Deck Length", value: "66 inches" },
      { label: "Screen Deck Surface area", value: "33 sq/ft" },
      { label: "Screen Deck Tilt Angle", value: "45 to 30 Degrees" },
    ],
  },
  {
    title: "WEIGHT",
    rows: [
      { label: "Total Weight", value: "991 lbs" },
    ],
  },
];

export default function Slg56Page() {
  return (
    <ModelDetailPage
      title="SLG 56 Mini"
      subtitle="Hourly Production 5 to 10 yards per hour"
      description="The SLG 56 Mini is designed specifically for mini equipment, making it an ideal fit for small-scale screening projects and operations."
      quoteModel="SLG 56"
      videos={videos}
      featureVideos={featureVideos}
      equipmentIcons={equipmentIcons}
      designedFor="DESIGNED FOR MINI SIZED EQUIPMENT"
      specs={specs}
      warrantyCards={[{ title: "5 Year Structural Warranty", icon: "shield" }]}
      showFeatures={false}
    />
  );
}
