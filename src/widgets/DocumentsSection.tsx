import { FaRegTrashCan } from "react-icons/fa6";
import { OutlineButton, RoundedTable, TextCenter, TitleMd } from "~/shared/ui";
import { LuCopyPlus } from "react-icons/lu";

export function DocumentsSection() {
  return (
    <>
      <div
        className="d-flex align-items-end justify-content-between mb-3"
        style={{ height: "3rem" }}
      >
        <TitleMd>Мои документы</TitleMd>

        <div className="d-inline-flex h-100">
          {[LuCopyPlus, FaRegTrashCan].map((Icon, idx) => (
            <OutlineButton
              key={idx}
              className="px-2 py-0 me-2"
              style={{ fontSize: "2rem" }}
            >
              <Icon />
            </OutlineButton>
          ))}
        </div>
      </div>
      <RoundedTable
        columns={[
          <TextCenter>
            Название документа
            <br />
            Дата создания
          </TextCenter>,
          <TextCenter>Роль</TextCenter>,
        ]}
        data={[
          [
            <TextCenter>
              <a className="link" href="#">
                Заявка №24 отабонента 3443.pdf
              </a>
              <br />
              15.02.2023 15:30
            </TextCenter>,
            <TextCenter>ФИО пользователя</TextCenter>,
          ],
        ]}
      />
    </>
  );
}
