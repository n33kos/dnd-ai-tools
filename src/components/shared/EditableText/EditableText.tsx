import { useEffect, useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import styles from "./EditableText.module.scss";

interface EditableTextProps {
  className?: string;
  onSave: (value: string) => void;
  value: string;
}

export default (props: EditableTextProps) => {
  const { className, onSave, value } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditedValue(value);
  }, [value])

  return (
    <div
      className={`${styles.EditableText} ${isEditing ? styles.isEditing : ""} ${className || ""}`}
      ref={wrapperRef}
    >
      <ReactTextareaAutosize
        readOnly={!isEditing}
        className={styles.TextArea}
        value={editedValue}
        onChange={(e) => setEditedValue(e.currentTarget.value)}
      />
      <div className={styles.Buttons}>
        <button
          className={styles.EditButton}
          type="button"
          onClick={() => setIsEditing(true)}
        />
        <button
          className={styles.CancelButton}
          type="button"
          onClick={() => setIsEditing(false)}
        />
        <button
          className={styles.SaveButton}
          type="button"
          onClick={() => {
            onSave(editedValue);
            setIsEditing(false);
          }}
        />
      </div>
  </div>
  );
};
