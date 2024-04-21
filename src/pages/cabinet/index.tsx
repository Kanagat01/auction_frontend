import { Col, Row } from "react-bootstrap";
import { FaPen } from "react-icons/fa6";
import {
  PrimaryButton,
  RoundedGrayButton,
  RoundedWhiteBox,
  TitleMd,
} from "~/shared/ui";
import { Ava, LocationIcon } from "~/shared/assets";
import "./style.scss";
import { ReactSVG } from "react-svg";

export default function Cabinet() {
  return (
    <Row className="w-100">
      <Col md={4}>
        <RoundedWhiteBox className="p-4">
          <div className="d-flex justify-content-between align-items-center">
            <TitleMd>Информация о профиле</TitleMd>
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
            <PrimaryButton
              style={{ padding: ".5rem 3rem", fontSize: "1.6rem" }}
            >
              Сохранить
            </PrimaryButton>
          </div>
        </RoundedWhiteBox>
      </Col>
      <Col md={8}>
        <RoundedWhiteBox className="p-4">
          <div className="d-flex justify-content-between align-items-center">
            <TitleMd>Информация о профиле</TitleMd>
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
