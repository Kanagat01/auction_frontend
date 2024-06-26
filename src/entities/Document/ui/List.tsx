import {
  AddDocument,
  DeleteDocument,
  OrderDocument,
} from "~/entities/Document";
import { RoundedTable, TextCenter, TitleMd } from "~/shared/ui";
import { API_URL } from "~/shared/config";

export function DocumentsList({ documents }: { documents: OrderDocument[] }) {
  const docsData = documents.map((doc) => [
    <TextCenter>
      <a className="link" target="_blank" href={API_URL + doc.file}>
        Документ №{doc.id} <br />
        {decodeURIComponent(doc.file).replace("/media/documents/", "")}
      </a>
      <br />
      {new Date(doc.created_at).toLocaleDateString("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}
    </TextCenter>,
    <TextCenter>ФИО пользователя</TextCenter>,
  ]);
  const btnProps = { className: "px-2 py-0 me-2", style: { fontSize: "2rem" } };
  return (
    <>
      <div
        className="d-flex align-items-end justify-content-between mb-3"
        style={{ height: "3rem" }}
      >
        <TitleMd>Мои документы</TitleMd>

        <div className="d-inline-flex h-100">
          <AddDocument {...btnProps} />
          <DeleteDocument documents={documents} {...btnProps} />
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
