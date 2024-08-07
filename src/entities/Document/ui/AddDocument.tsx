import { useTranslation } from "react-i18next";
import {
  useState,
  ChangeEvent,
  DragEvent,
  FormEvent,
  ButtonHTMLAttributes,
} from "react";
import toast from "react-hot-toast";
import { Modal } from "react-bootstrap";
import { LuCopyPlus } from "react-icons/lu";
import { ModalTitle, OutlineButton, PrimaryButton } from "~/shared/ui";
import { useModalState } from "~/shared/lib";
import { addDocument } from "..";
import styles from "./style.module.scss";

export function AddDocument(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { t } = useTranslation();
  const [show, changeShow] = useModalState(false);
  const [fileInfo, setFileInfo] = useState("Нет выбранных файлов");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFile = files[0];
      setFileInfo(
        `${newFile.name}, ${(newFile.size / (1024 * 1024)).toFixed(2)} мб`
      );
      setFile(newFile);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFile = e.dataTransfer.files[0];
    setFileInfo(
      `${newFile.name}, ${(newFile.size / (1024 * 1024)).toFixed(2)} мб`
    );
    setFile(newFile);
  };
  const onReset = () => {
    setFile(null);
    setFileInfo(t("files not selected"));
    changeShow();
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error(t("load_document"));
      return;
    }
    addDocument({ file, reset: onReset });
  };
  return (
    <>
      <OutlineButton {...props} onClick={changeShow}>
        <LuCopyPlus />
      </OutlineButton>
      <Modal show={show} onHide={changeShow} className="gradient-modal">
        <Modal.Body>
          <form onSubmit={onSubmit} onReset={onReset}>
            <ModalTitle>{t("load_document")}</ModalTitle>
            <div
              className={styles["dropzone-area"]}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className={styles["file-upload-icon"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles["icon"]} ${styles["icon-tabler"]} ${styles["icon-tabler-cloud-upload"]}"`}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#D4DCE6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                  <path d="M9 15l3 -3l3 3" />
                  <path d="M12 12l0 9" />
                </svg>
              </div>
              <input
                type="file"
                name="uploaded-file"
                onChange={handleFileChange}
                required
              />
              <p className={styles["file-info"]}>{fileInfo}</p>
            </div>
            <div className={styles["dropzone-actions"]}>
              <OutlineButton type="reset">Отмена</OutlineButton>
              <PrimaryButton type="submit">Сохранить</PrimaryButton>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
