import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { OrderTrackingGeoPoint } from "~/entities/Order";
import { YANDEX_MAPS_API_KEY } from "~/shared/config";
import { TitleMd } from "~/shared/ui";

export function MapSection({
  tracking,
}: {
  tracking: OrderTrackingGeoPoint[] | null;
}) {
  return (
    <>
      <TitleMd>Карта</TitleMd>
      <div className="w-100 h-100">
        {tracking ? (
          <YMaps query={{ apikey: YANDEX_MAPS_API_KEY, lang: "en_RU" }}>
            {" "}
            {/* TODO is that safe? */}
            {/* TODO how to stop re-rendering every time? */}
            <Map
              defaultState={{
                zoom: 12,
                controls: ["zoomControl", "fullscreenControl"],
              }}
              modules={["control.ZoomControl", "control.FullscreenControl"]}
            >
              {tracking.map((geo) => (
                <Placemark
                  defaultGeometry={[geo.latitude, geo.longitude]}
                  modules={["geoObject.addon.balloon"]}
                  properties={{
                    balloonContentBody: "Местонахождение груза",
                  }}
                />
              ))}
            </Map>
          </YMaps>
        ) : (
          <TitleMd className="mt-4">Нет данных для отображения</TitleMd>
        )}
      </div>
    </>
  );
}
