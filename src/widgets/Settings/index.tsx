import { useState, ReactNode } from "react";
import { useUnit } from "effector-react";
import { Modal } from "react-bootstrap";
import { ReactSVG } from "react-svg";

import { FaAngleLeft, FaUserCog, FaUsers } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { BiSolidWallet } from "react-icons/bi";
import { SlSettings } from "react-icons/sl";

import { LogoutBtn } from "~/features/authorization";
import {
  $mainData,
  CustomerCompany,
  CustomerManager,
  CustomerSubscriptionTranslation,
  getRole,
  TransporterCompany,
  TransporterSubscriptionTranslation,
} from "~/entities/User";
import {
  InputContainer,
  modalInputProps,
  RoundedInputGroup,
  RoundedTable,
  TextCenter,
} from "~/shared/ui";
import { PersonLoopIcon } from "~/shared/assets";
import { useModalState } from "~/shared/lib";
import styles from "./styles.module.scss";
import { FiCheck } from "react-icons/fi";

const iconStyle = { fontSize: "2.4rem", lineHeight: "2.4rem" };
const fontSize = { fontSize: "1.4rem" };

type TSection =
  | "main"
  | "company"
  | "security"
  | "subscriptions"
  | "managers"
  | "addManager";

export function SettingsModal() {
  const mainData = useUnit($mainData);
  const role = mainData?.user.user_type.split("_")[1];
  const currentCompany =
    role === "manager"
      ? (mainData as CustomerManager).company.company_name
      : (mainData as CustomerCompany).company_name;

  const [visible, setVisible] = useState(true);
  const [section, setSection] = useState<TSection>("main");

  const [show, changeShow] = useModalState(false);
  const changeSection = (newSection: TSection) => {
    setVisible(false);
    setTimeout(() => {
      setSection(newSection);
      setVisible(true);
    }, 500);
  };

  let settingOptions: [ReactNode, TSection, string, string][] = [
    [
      <BsBuildingsFill style={iconStyle} />,
      "company",
      "Моя компания",
      "Реквизиты",
    ],
    [
      <ReactSVG src={PersonLoopIcon} style={iconStyle} />,
      "security",
      "Вход и безопасность",
      "Пароли",
    ],
    [<BiSolidWallet style={iconStyle} />, "subscriptions", "Тарифы", ""],
    [<FaUsers style={iconStyle} />, "managers", "Мои менеджеры", ""],
    [<FaUserCog style={iconStyle} />, "addManager", "Добавить менеджера", ""],
  ];
  if (role === "manager") {
    settingOptions = [
      [
        <ReactSVG src={PersonLoopIcon} style={iconStyle} />,
        "security",
        "Вход и безопасность",
        "Пароли",
      ],
    ];
  }

  const renderSection = (section: TSection) => {
    switch (section) {
      case "main":
        return settingOptions.map(
          ([Icon, section, title, description], idx) => (
            <div
              key={idx}
              className={styles.settingOption}
              onClick={() => changeSection(section)}
            >
              {Icon}
              <div
                className="d-flex flex-column text-left"
                style={{ gap: "0.5rem" }}
              >
                <span className={styles.settingOptionTitle}>{title}</span>
                {description && (
                  <span className={styles.settingOptionDescription}>
                    {description}
                  </span>
                )}
              </div>
            </div>
          )
        );
      case "company":
        return (
          <InputContainer
            name="card_number"
            label="Номер карты"
            variant="input"
            {...modalInputProps}
            style={{ ...modalInputProps.style, border: "1px solid dark" }}
          />
        );
      case "security":
        return (
          <RoundedInputGroup>
            <RoundedInputGroup.PasswordInput
              autoComplete="new-password"
              placeholder="Новый пароль"
              required
            />
            <RoundedInputGroup.PasswordInput
              autoComplete="repeat-password"
              placeholder="Повторите пароль"
              required
            />
          </RoundedInputGroup>
        );
      case "subscriptions":
        const role = getRole(mainData?.user.user_type ?? "");
        const translation =
          role === "customer"
            ? CustomerSubscriptionTranslation
            : TransporterSubscriptionTranslation;
        return (
          <RoundedTable
            columns={[
              <TextCenter style={fontSize}>Тариф</TextCenter>,
              <TextCenter style={fontSize}>Выбран</TextCenter>,
            ]}
            data={Object.keys(translation).map((key) => [
              <TextCenter style={fontSize}>
                {translation[key as keyof typeof translation]}
              </TextCenter>,
              <TextCenter>
                {key ===
                (mainData as CustomerCompany | TransporterCompany)
                  .subscription ? (
                  <FiCheck
                    className="ms-auto"
                    color="var(--green)"
                    style={{ width: "3rem", height: "2.5rem" }}
                  />
                ) : (
                  ""
                )}
              </TextCenter>,
            ])}
          />
          // Object.keys(translation).map((key) =><div key={key} className="d-flex align-items-center">
          //       <div className="d-flex flex-column ms-3">
          //         <span style={fontSize}>
          //           {translation[key as keyof typeof translation]}
          //         </span>
          //       </div>
          //       {key ===
          //       (mainData as CustomerCompany | TransporterCompany)
          //         .subscription ? (
          //         <FiCheck
          //           className="ms-auto"
          //           color="var(--green)"
          //           style={{ width: "3rem", height: "2.5rem" }}
          //         />
          //       ) : (
          //         ""
          //       )}
          //     </div>)
        );
      case "managers":
        return (
          <RoundedTable
            columns={[
              <TextCenter style={fontSize}>Менеджер</TextCenter>,
              <TextCenter style={fontSize}>Email</TextCenter>,
            ]}
            data={(mainData as CustomerCompany).managers.map(
              ({ customer_manager_id, user }) => [
                <TextCenter className="p-1" style={fontSize}>
                  №{customer_manager_id} {user.full_name}
                </TextCenter>,
                <TextCenter className="p-1" style={fontSize}>
                  {user.email}
                </TextCenter>,
              ]
            )}
          />
        );
      case "addManager":
        return (
          <InputContainer
            name="full_name"
            label="ФИО менеджера"
            variant="input"
            {...modalInputProps}
            style={{ ...modalInputProps.style, border: "1px solid dark" }}
          />
        );
    }
  };
  return (
    <>
      <a href="#" onClick={changeShow}>
        <SlSettings strokeWidth="1.5em" />
      </a>
      <Modal show={show} onHide={changeShow} className="rounded-modal">
        <Modal.Body style={{ height: "50vh" }}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <button
              className="p-0"
              onClick={() => (section !== "main" ? changeSection("main") : {})}
            >
              <FaAngleLeft className={styles.goBackButton} />
            </button>
            <div className={styles.currentCompany}>{currentCompany}</div>
            <LogoutBtn />
          </div>
          <div
            className={`d-flex flex-column mt-5 slide-animation ${
              visible ? "visible" : ""
            }`}
            style={{ gap: "2rem" }}
          >
            {renderSection(section)}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
