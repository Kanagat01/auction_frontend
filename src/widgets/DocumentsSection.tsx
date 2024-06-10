import { FaRegTrashCan } from "react-icons/fa6";
import { LuCopyPlus } from "react-icons/lu";
import { OrderDocument } from "~/entities/Document";
import { OutlineButton, RoundedTable, TextCenter, TitleMd } from "~/shared/ui";
import { unixDateToString } from "~/shared/lib";
import { API_URL } from "~/shared/config";

export function DocumentsSection({
  documents,
}: {
  documents: OrderDocument[];
}) {
  const docsData = documents.map((doc) => [
    <TextCenter>
      <a className="link" target="_blank" href={API_URL + doc.file}>
        Заявка №{doc.id} <br />
        Документ {decodeURIComponent(doc.file).replace("/media/documents/", "")}
      </a>
      <br />
      {unixDateToString(doc.created_at)}
    </TextCenter>,
    <TextCenter>ФИО пользователя</TextCenter>,
  ]);
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
        data={docsData}
      />
    </>
  );
}
