import { Field, StageTypeInput, TimeInput } from "./inputs";
import { TOrderStageKey, TStage } from "~/entities/OrderStage";
import styles from "./styles.module.scss";
import { OutlineButton } from "~/shared/ui";

type StageProps = {
  stageType: TStage;
  text1: string;
  text2: string;
  onClick1: () => void;
  onClick2: () => void;
};

export const Stage = ({
  stageType,
  text1,
  text2,
  onClick1,
  onClick2,
}: StageProps) => {
  const inputNames: TOrderStageKey[] = [
    "company",
    "address",
    "contact_person",
    "cargo",
    "weight",
    "volume",
    "comments",
  ];
  return (
    <div style={{ width: "50%" }}>
      <StageTypeInput value={stageType} />
      <Field name="date" stageType={stageType} />
      <div className={styles.timeBlock}>
        <TimeInput name="time_start" stageType={stageType} />
        <TimeInput name="time_end" stageType={stageType} />
      </div>
      {inputNames.map((name, idx) => (
        <Field key={idx} name={name} stageType={stageType} />
      ))}
      <div className={styles.buttonsBlock}>
        <OutlineButton
          className={styles.modalBtn}
          type="button"
          onClick={onClick1}
        >
          {text1}
        </OutlineButton>
        <OutlineButton
          className={styles.modalBtn}
          type="button"
          onClick={onClick2}
        >
          {text2}
        </OutlineButton>
      </div>
    </div>
  );
};
