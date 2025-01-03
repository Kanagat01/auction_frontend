import { useTranslation } from "react-i18next";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { OrderTracking } from "~/entities/Order";
import { TStages } from "~/entities/OrderStage";
import { YANDEX_MAPS_API_KEY } from "~/shared/config";
import { RoundedTable, TextCenter, TitleMd } from "~/shared/ui";

type MapSectionProps = {
  tracking?: OrderTracking;
  stages?: TStages[];
};

export function MapSection({ tracking, stages }: MapSectionProps) {
  const { t } = useTranslation();
  return (
    <>
      <TitleMd>{t("mapSection.map")}</TitleMd>
      {tracking ? (
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
                center: [tracking.latitude, tracking.longitude],
                zoom: 12,
                controls: ["zoomControl", "fullscreenControl"],
              }}
              modules={["control.ZoomControl", "control.FullscreenControl"]}
            >
              <Placemark
                defaultGeometry={[tracking.latitude, tracking.longitude]}
                modules={["geoObject.addon.balloon"]}
                properties={{
                  balloonContentBody: t("mapSection.cargoLocation"),
                }}
              />
            </Map>
          </YMaps>
        </div>
      ) : (
        <TitleMd className="w-100 h-100 mt-4">{t("common.noData")}</TitleMd>
      )}
      {stages && (
        <div className="mt-5">
          <RoundedTable
            columns={[
              <TextCenter>{t("orderStage.stageNumber")}</TextCenter>,
              <TextCenter>{t("orderStage.deliveryStatus")}</TextCenter>,
            ]}
            data={stages.map(
              ({ order_stage_number, load_stage, unload_stage }) => [
                <TextCenter>{order_stage_number}</TextCenter>,
                <TextCenter>
                  {unload_stage.completed
                    ? t("orderStage.unloadStageDelivered")
                    : load_stage.completed
                    ? t("orderStage.loadStageDelivered")
                    : t("orderStage.notDelivered")}
                </TextCenter>,
              ]
            )}
          />
        </div>
      )}
    </>
  );
}
