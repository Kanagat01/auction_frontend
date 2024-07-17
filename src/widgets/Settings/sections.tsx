import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { useUnit } from "effector-react";
import { ReactSVG } from "react-svg";
import { FiCheck } from "react-icons/fi";
import { BiSolidWallet } from "react-icons/bi";
import { BsBuildingsFill } from "react-icons/bs";
import { FaUserCog, FaUsers } from "react-icons/fa";
import {
  $mainData,
  CustomerCompany,
  CustomerSubscriptionTranslation,
  getRole,
  TransporterCompany,
  TransporterSubscriptionTranslation,
} from "~/entities/User";
import { PersonLoopIcon } from "~/shared/assets";
import {
  InputContainer,
  PrimaryButton,
  RoundedTable,
  TextCenter,
} from "~/shared/ui";
import styles from "./styles.module.scss";
import {
  registerManager,
  RegisterManagerRequest,
} from "~/features/registration";
import {
  changePassword,
  ChangePasswordRequest,
} from "~/features/change-password";

const fontSize = { fontSize: "1.4rem" };
const iconStyle = { fontSize: "2.4rem", lineHeight: "2.4rem" };
const btnStyle = { padding: "0.5rem 3rem", fontSize: "1.6rem" };
const inputProps = {
  className: "w-100 py-3",
  label_style: {
    color: "var(--default-font-color)",
    fontSize: "1.4rem",
    marginBottom: "0.5rem",
  },
  container_style: { marginRight: 0, marginBottom: "1rem" },
};

export type TSection =
  | "main"
  | "company"
  | "security"
  | "subscriptions"
  | "managers"
  | "addManager";

export const renderSection = (
  role: string,
  section: TSection,
  changeSection: (newSection: TSection) => void
) => {
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
  switch (section) {
    case "main":
      return settingOptions.map(([Icon, section, title, description], idx) => (
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
      ));
    case "company":
      return <CardNumber />;
    case "security":
      return <ChangePassword />;
    case "subscriptions":
      return <SubscriptionsList />;
    case "managers":
      return <ManagersList />;
    case "addManager":
      return <AddManager />;
  }
};

export function CardNumber() {
  const [cardNumber, setCardNumber] = useState<string>("");
  const changeCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      setCardNumber(e.target.value);
    }
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <InputContainer
        name="card_number"
        label="Номер карты"
        variant="input"
        value={cardNumber}
        onChange={changeCardNumber}
        {...inputProps}
      />

      <div className="d-flex justify-content-evenly w-100 mt-4">
        <PrimaryButton type="submit" style={btnStyle}>
          Сохранить
        </PrimaryButton>
      </div>
    </form>
  );
}

export function ChangePassword() {
  const initialState = {
    old_password: "",
    new_password: "",
    repeat_password: "",
  };
  const [data, setData] = useState<ChangePasswordRequest>(initialState);
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    changePassword({ ...data, onSuccess: () => setData(initialState) });
  };
  return (
    <form onSubmit={onSubmit}>
      <InputContainer
        variant="password-input"
        label="Текущий пароль"
        {...{ name: "old_password", value: data.old_password, onChange }}
        {...inputProps}
        autoComplete="old-password"
        required
      />
      <InputContainer
        variant="password-input"
        label="Новый пароль"
        {...{ name: "new_password", value: data.new_password, onChange }}
        {...inputProps}
        autoComplete="new-password"
        required
      />
      <InputContainer
        variant="password-input"
        label="Повторите пароль"
        {...{ name: "repeat_password", value: data.repeat_password, onChange }}
        {...inputProps}
        autoComplete="repeat-password"
        required
      />
      <div className="d-flex justify-content-evenly w-100 mt-5">
        <PrimaryButton type="submit" style={btnStyle}>
          Обновить пароль
        </PrimaryButton>
      </div>
    </form>
  );
}
export function SubscriptionsList() {
  const mainData = useUnit($mainData);
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
          (mainData as CustomerCompany | TransporterCompany).subscription ? (
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
  );
}

export function ManagersList() {
  const mainData = useUnit($mainData);
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
}

export function AddManager() {
  const initialState = {
    email: "",
    full_name: "",
    password: "",
    repeat_password: "",
  };
  const [data, setData] = useState<
    RegisterManagerRequest & { repeat_password: string }
  >(initialState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    registerManager({ ...data, onSuccess: () => setData(initialState) });
  };
  return (
    <form onSubmit={onSubmit}>
      <InputContainer
        variant="input"
        label="ФИО менеджера"
        {...{ name: "full_name", value: data.full_name, onChange }}
        {...inputProps}
        autoComplete="manager-full_name"
      />
      <InputContainer
        variant="input"
        label="Email менеджера"
        {...{ name: "email", value: data.email, onChange }}
        {...inputProps}
        autoComplete="manager-email"
      />
      <InputContainer
        variant="password-input"
        label="Пароль"
        {...{ name: "password", value: data.password, onChange }}
        {...inputProps}
        autoComplete="manager-password"
      />
      <InputContainer
        variant="password-input"
        label="Повторите пароль"
        {...{ name: "repeat_password", value: data.repeat_password, onChange }}
        {...inputProps}
        autoComplete="manager-repeat_password"
      />
      <div className="d-flex justify-content-evenly w-100 mt-5">
        <PrimaryButton type="submit" style={btnStyle}>
          Добавить
        </PrimaryButton>
      </div>
    </form>
  );
}
