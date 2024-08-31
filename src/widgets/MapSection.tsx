import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { OrderTracking, OrderTrackingGeoPoint } from "~/entities/Order";
import { TStages } from "~/entities/OrderStage";
import { YANDEX_MAPS_API_KEY } from "~/shared/config";
import { RoundedTable, TextCenter, TitleMd } from "~/shared/ui";

type MapSectionProps = {
  tracking?: OrderTracking;
  stages?: TStages[];
};

export function MapSection({ tracking, stages }: MapSectionProps) {
  const centralGeoPoint = tracking?.geopoints[
    Math.floor(tracking.geopoints.length / 2)
  ] as OrderTrackingGeoPoint;
  return (
    <>
      <TitleMd>Карта</TitleMd>
      {tracking && tracking.geopoints.length !== 0 ? (
        <div
          className="w-100 h-100 mt-4"
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid var(--default-font-color)",
          }}
        >
          <YMaps query={{ apikey: YANDEX_MAPS_API_KEY, lang: "en_RU" }}>
            <Map
              width="100%"
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
        </div>
      ) : (
        <TitleMd className="w-100 h-100 mt-4">
          Нет данных для отображения
        </TitleMd>
      )}
      {stages && (
        <div className="mt-4">
          <RoundedTable
            columns={[
              <TextCenter>№ Поставки</TextCenter>,
              <TextCenter>Статус доставки</TextCenter>,
            ]}
            data={stages.map(
              ({ order_stage_number, load_stage, unload_stage }) => [
                <TextCenter>{order_stage_number}</TextCenter>,
                <TextCenter>
                  {load_stage.completed && unload_stage.completed
                    ? "Груз доставлен"
                    : "Ожидает доставки"}
                </TextCenter>,
              ]
            )}
          />
        </div>
      )}
    </>
  );
}
