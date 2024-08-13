import { ButtonHTMLAttributes } from "react";
import { Modal } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";

import { useModalState } from "~/shared/lib";
import { FolderPlus } from "~/shared/assets";
import {
  BlueText,
  OutlineButton,
  PrimaryButton,
  TextCenter,
  TitleMd,
} from "~/shared/ui";
import {
  changeShowStageFormModal,
  handleStageNotFound,
  setMode,
} from "./helpers";
import {
  $maxOrderStageNumber,
  removeStage,
  setMaxOrderStageNumber,
  setOrderStages,
} from "..";

type CrudButtonProps = {
  orderStageNumber: number | "";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function CreateStage(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <OutlineButton
      onClick={() => {
        setMode("create");
        changeShowStageFormModal();
      }}
      {...props}
    >
      <ReactSVG src={FolderPlus} />
    </OutlineButton>
  );
}

export function CopyStage({ orderStageNumber, ...props }: CrudButtonProps) {
  const handleCopy = () => {
    setMode("copy");
    const stage = handleStageNotFound(orderStageNumber);
    if (!stage) return;

    const { load_stage, unload_stage, ...newStage } = stage;
    const { id, ...newLoadStage } = load_stage;
    const { id: unloadId, ...newUnloadStage } = unload_stage;

    setOrderStages({
      load_stage: newLoadStage,
      unload_stage: newUnloadStage,
      ...newStage,
    });
    setMaxOrderStageNumber($maxOrderStageNumber.getState() + 1);
    changeShowStageFormModal();
  };
  return (
    <OutlineButton {...props} onClick={handleCopy}>
      <LuCopyPlus />
    </OutlineButton>
  );
}

export function EditStage({ orderStageNumber, ...props }: CrudButtonProps) {
  const handleEdit = () => {
    setMode("edit");
    const stage = handleStageNotFound(orderStageNumber);
    if (!stage) return;

    setOrderStages(stage);
    changeShowStageFormModal();
  };
  return (
    <OutlineButton onClick={handleEdit} {...props}>
      <LuPenSquare />
    </OutlineButton>
  );
}

export function RemoveStageModal({
  orderStageNumber,
  ...props
}: CrudButtonProps) {
  const [show, changeShow] = useModalState(false);

  const showModal = () => {
    const stage = handleStageNotFound(orderStageNumber);
    if (!stage) return;
    changeShow();
  };
  const handleRemove = () => {
    if (orderStageNumber !== "") removeStage(orderStageNumber);
    changeShow();
  };
  return (
    <>
      <OutlineButton onClick={showModal} {...props}>
        <FaRegTrashCan />
      </OutlineButton>
      <Modal
        show={show}
        onHide={changeShow}
        className="rounded-modal d-flex justify-content-center"
      >
        <Modal.Body>
          <TextCenter>
            <TitleMd style={{ fontSize: "1.7rem" }}>
              Вы уверены, что хотите удалить поставку{" "}
              <BlueText>№{orderStageNumber}</BlueText>?
            </TitleMd>
          </TextCenter>
        </Modal.Body>
        <Modal.Footer className="justify-content-evenly">
          <OutlineButton
            className="py-2 px-4"
            style={{ fontSize: "1.4rem" }}
            onClick={changeShow}
          >
            Отмена
          </OutlineButton>
          <PrimaryButton
            className="py-2 px-4"
            style={{ fontSize: "1.4rem" }}
            onClick={handleRemove}
          >
            Удалить
          </PrimaryButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
