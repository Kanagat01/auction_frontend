import { Col, Row } from "react-bootstrap";
import { FaPen } from "react-icons/fa6";
import {
  EditField,
  PrimaryButton,
  RoundedGrayButton,
  RoundedWhiteBox,
  TitleLg,
} from "~/shared/ui";
import { Ava, LocationIcon } from "~/shared/assets";
import "./style.scss";
import { ReactSVG } from "react-svg";

export default function Cabinet() {
  return (
    <Row className="w-100">
      <Col md={4}>
        <RoundedWhiteBox className="p-5">
          <div className="d-flex justify-content-between align-items-center">
            <TitleLg>Информация о профиле</TitleLg>
            <RoundedGrayButton
              style={{ fontSize: "2rem", width: "4rem", height: "4rem" }}
            >
              <FaPen />
            </RoundedGrayButton>
          </div>
          <div className="mt-4 d-flex flex-column align-items-center">
            <div
              className="rounded-block mb-2"
              style={{ width: "10rem", height: "10rem" }}
            >
              <img src={Ava} alt="person-img" />
            </div>
            <div className="profile-name mb-2">Иван Иванов</div>
            <div className="profile-location mb-2">
              <ReactSVG src={LocationIcon} style={{ lineHeight: "1.4rem" }} />
              <span style={{ lineHeight: "2.4rem" }}>Москва</span>
            </div>
            <EditField
              variant="input"
              label="Ф.И.О."
              value="Иван Иванов"
              name="full_name"
              className="mb-4"
            />
            <EditField
              variant="input"
              label="Номер телефона"
              value="+7 (707) 707-77-77"
              name="phone"
              type="phone"
              className="mb-4"
            />
            <PrimaryButton
              className="mt-3"
              style={{ padding: "0.5rem 3rem", fontSize: "1.6rem" }}
            >
              Сохранить
            </PrimaryButton>
          </div>
        </RoundedWhiteBox>
      </Col>
      <Col md={8}>
        <RoundedWhiteBox className="p-5">
          <div className="d-flex justify-content-between align-items-center">
            <TitleLg>Информация о профиле</TitleLg>
            <RoundedGrayButton
              style={{
                fontSize: "2rem",
                width: "4rem",
                height: "4rem",
                background: "none",
              }}
            >
              <FaPen className="d-none" />
            </RoundedGrayButton>
          </div>
        </RoundedWhiteBox>
      </Col>
    </Row>
  );
}
