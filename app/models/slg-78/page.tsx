import ModelDetailPage from "../_components/model-detail-page";

const videos = [
  {
    title: "SLG 78 Overview",
    embedUrl: "https://player.vimeo.com/video/1090497018?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 78 In Action",
    embedUrl: "https://player.vimeo.com/video/1001990400?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 78 Product Demo",
    embedUrl: "https://player.vimeo.com/video/1129293428?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 78 Spring Loaded Grizzly Screening Overview",
    embedUrl: "https://player.vimeo.com/video/1003281077?share=copy&fl=sv&fe=ci",
  },
  {
    title: "SLG 78 Spring Loaded Grizzly Screening Dirt",
    embedUrl: "https://player.vimeo.com/video/1129896297?share=copy&fl=sv&fe=ci",
  },
   {
    title: "78 GRIZZLY",
    embedUrl: "https://player.vimeo.com/video/1123779281?share=copy&fl=sv&fe=ci",
  },
];

const featureVideos = [
  {
    title: "TILTING SCREEN DECK",
    embedUrl: "https://player.vimeo.com/video/1111673557?h=43ff7e2da1",
    description:
      "Lets operators adjust screening angle for different materials and moisture conditions.",
  },
  {
    title: "CANTILEVERED SPRING SUSPENSION SYSTEM",
    embedUrl: "https://player.vimeo.com/video/1002920458?h=8c306d1620",
    description:
      "Supports efficient material movement with a maintenance-conscious suspension design.",
  },
];

const equipmentIcons = [
  { src: "/78/compactwheelloaders78.webp", label: "COMPACT WHEEL LOADER" },
  { src: "/78/Miniexcavators78.webp", label: "MINI EXCAVATOR" },
  { src: "/78/MiniSkidsteers78.webp", label: "MINI SKID STEER" },
  { src: "/78/SubCompacttractors78.webp", label: "SUB-COMPACT TRACTOR" },
];

const specs = [
  {
    title: "MACHINE DIMENSIONS",
    rows: [
      { label: "Machine Width", value: "98 inches" },
      { label: "Machine Height", value: "104 inches" },
      { label: "Machine Depth", value: "72 inches" },
    ],
  },
  {
    title: "SCREEN DECK",
    rows: [
      { label: "Screen Deck Width", value: "80 inches" },
      { label: "Screen Deck Length", value: "52 inches" },
      { label: "Screen Deck Surface area", value: "29 sq/ft" },
      { label: "Screen Deck Tilt Angle", value: "45 to 30 Degrees" },
    ],
  },
  {
    title: "WEIGHT",
    rows: [
      { label: "Total Weight with riser box", value: "2500 lbs" },
      { label: "Total Weight without riser box", value: "2000 lbs" },
    ],
  },
];

export default function Slg78Page() {
  return (
    <ModelDetailPage
      title="SLG 78"
      subtitle="Designed for mid size equipment"
      quoteModel="SLG 78"
      videos={videos}
      featureVideos={featureVideos}
      equipmentIcons={equipmentIcons}
      designedFor="DESIGNED FOR MID SIZE EQUIPMENT"
      specs={specs}
    />
  );
}
