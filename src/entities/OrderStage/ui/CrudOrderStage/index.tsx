import { useState } from "react";
import { ReactSVG } from "react-svg";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import { useModalState } from "~/shared/lib";
import { FolderPlus } from "~/shared/assets";
import { OutlineButton } from "~/shared/ui";
import { RemoveStageModal } from "./RemoveStage";
import { OrderStageModal, getStage, updateStages } from "../OrderStageModal";

export function CrudOrderStage({
  orderStageNumber,
}: {
  orderStageNumber: number | "";
}) {
  const [mode, setMode] = useState<"create" | "copy" | "edit">("create");
  const [show, changeShow] = useModalState(false);
  const [dModalShow, changeDModalShow] = useModalState(false);

  const createStage = () => {
    setMode("create");
    changeShow();
  };
  const copyStage = () => {
    setMode("copy");
    if (orderStageNumber === "")
      toast.error("Введите номер поставки", { duration: 5000 });
    else {
      const stage = getStage(orderStageNumber);
      if (!stage) toast.error("Поставка не найдена", { duration: 5000 });
      else {
        updateStages({
          ...stage,
          order_stage_number: Math.ceil(Date.now() / 1000),
        });
        changeShow();
      }
    }
  };
  const editStage = () => {
    setMode("edit");
    if (orderStageNumber === "")
      toast.error("Введите номер поставки", { duration: 5000 });
    else {
      const stage = getStage(orderStageNumber);
      if (!stage) toast.error("Поставка не найдена", { duration: 5000 });
      else {
        updateStages(stage);
        changeShow();
      }
    }
  };
  const removeStage = () => {
    if (orderStageNumber === "")
      toast.error("Введите номер поставки", { duration: 5000 });
    else {
      const stage = getStage(orderStageNumber);
      if (!stage) toast.error("Поставка не найдена", { duration: 5000 });
      else changeDModalShow();
    }
  };
  return (
    <>
      {[
        {
          Icon: () => <ReactSVG src={FolderPlus} style={{ color: "gray" }} />,
          onClick: createStage,
        },
        { Icon: LuCopyPlus, onClick: copyStage },
        { Icon: LuPenSquare, onClick: editStage },
        { Icon: FaRegTrashCan, onClick: removeStage },
      ].map(({ Icon, onClick }, idx) => (
        <OutlineButton
          key={idx}
          className="px-2 py-0 me-2"
          type="button"
          style={{
            fontSize: "2rem",
            border: "1px solid gray",
          }}
          onClick={onClick}
        >
          <Icon color="gray" />
        </OutlineButton>
      ))}
      <OrderStageModal show={show} changeShow={changeShow} mode={mode} />
      <RemoveStageModal
        orderStageNumber={orderStageNumber !== "" ? orderStageNumber : 0}
        show={dModalShow}
        changeShow={changeDModalShow}
      />
    </>
  );
}
