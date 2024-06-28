import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { OrderTracking, OrderTrackingGeoPoint } from "~/entities/Order";
import { YANDEX_MAPS_API_KEY } from "~/shared/config";
import { TitleMd } from "~/shared/ui";

export function MapSection({ tracking }: { tracking: OrderTracking | null }) {
  const centralGeoPoint = tracking?.geopoints[
    Math.floor(tracking.geopoints.length / 2)
  ] as OrderTrackingGeoPoint;
  return (
    <>
      <TitleMd>Карта</TitleMd>
      <div className="w-100 h-100">
        {tracking && tracking.geopoints.length !== 0 ? (
          // TODO is that safe?
          // TODO how to stop re-rendering every time?
          <YMaps query={{ apikey: YANDEX_MAPS_API_KEY, lang: "en_RU" }}>
            <Map
              defaultState={{
                center: [centralGeoPoint.latitude, centralGeoPoint.longitude],
                zoom: 12,
                controls: ["zoomControl", "fullscreenControl"],
              }}
              modules={["control.ZoomControl", "control.FullscreenControl"]}
            >
              {tracking.geopoints.map((geo) => (
                <Placemark
                  key={geo.id}
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
