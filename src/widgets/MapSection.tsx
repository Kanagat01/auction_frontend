import { Map } from "~/shared/assets";
import { TitleMd } from "~/shared/ui";

export function MapSection() {
  return (
    <>
      <TitleMd>Карта</TitleMd>
      <img className="w-100 mt-3" src={Map} alt="map" />
    </>
  );
}
