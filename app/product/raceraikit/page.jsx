import Image from "next/image";
import raceraikit from "@/public/assets/raceraikit.jpg";

export default function Product() {
  return (
    <>
      <Image src={raceraikit} className="raceraikit" alt="raceraikit" />
    </>
  );
}
