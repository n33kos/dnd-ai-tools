import GenerateFromAi from "../GenerateFromAi/GenerateFromAi";
import styles from "./TextArea.module.scss";

interface TextAreaProps {
  className?: string;
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  randomizePrompt?: string;
}

export default (props: TextAreaProps) => {
  const { className, onChange, value, placeholder, randomizePrompt } = props;

  return (
    <div className={`${styles.Field} ${className}`}>
      <textarea
        placeholder={placeholder}
        className={styles.TextArea}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      {randomizePrompt && (
        <GenerateFromAi
          className={styles.RandomButton}
          prompt={randomizePrompt}
          onGenerate={(response) => onChange(response.trim())}
        />
      )}
    </div>
  );
};
