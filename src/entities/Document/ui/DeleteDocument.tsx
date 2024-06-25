import toast from "react-hot-toast";
import { ButtonHTMLAttributes, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaRegTrashCan } from "react-icons/fa6";
import { useModalState } from "~/shared/lib";
import {
  Checkbox,
  ModalTitle,
  OutlineButton,
  PrimaryButton,
  RoundedTable,
  TextCenter,
} from "~/shared/ui";
import { OrderDocument } from "../types";
import { deleteDocument } from "../model";
import styles from "./style.module.scss";

export function DeleteDocument({
  documents,
  ...props
}: {
  documents: OrderDocument[];
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const fontSize = { fontSize: "1.4rem" };
  const [show, changeShow] = useModalState(false);
  const [documentId, setDocumentId] = useState<number | null>(null);

  const onReset = () => {
    setDocumentId(null);
    changeShow();
  };
  const onSubmit = () => {
    if (documentId) deleteDocument({ document_id: documentId, reset: onReset });
  };
  return (
    <>
      <OutlineButton
        {...props}
        onClick={
          documents.length === 0
            ? () => toast.error("Нет документов для удаления")
            : changeShow
        }
      >
        <FaRegTrashCan />
      </OutlineButton>
      <Modal show={show} onHide={changeShow} className="rounded-modal">
        <Modal.Body>
          <ModalTitle>Удалить документ</ModalTitle>
          <RoundedTable
            columns={[
              <TextCenter style={fontSize}>Документ</TextCenter>,
              <TextCenter style={fontSize}>Выбор</TextCenter>,
            ]}
            data={documents.map((doc) => [
              <TextCenter className="p-1" style={fontSize}>
                Документ №{doc.id} <br />
                {decodeURIComponent(doc.file).replace("/media/documents/", "")}
              </TextCenter>,
              <TextCenter className="p-1">
                <Checkbox
                  value={doc.id}
                  onChange={(e) => setDocumentId(Number(e.target.value))}
                  checked={doc.id === documentId}
                />
              </TextCenter>,
            ])}
          />
          <div className={styles["dropzone-actions"]}>
            <OutlineButton onClick={onReset}>Отмена</OutlineButton>
            <PrimaryButton onClick={onSubmit}>Удалить</PrimaryButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
