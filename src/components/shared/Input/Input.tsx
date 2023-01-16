import GenerateFromAi from "../GenerateFromAi/GenerateFromAi";
import styles from "./Input.module.scss";

interface InputProps {
  className?: string;
  onChange: (value: string) => void;
  value: string;
  type?: string;
  placeholder?: string;
  randomizePrompt?: string;
}

export default (props: InputProps) => {
  const { className, onChange, value, type, placeholder, randomizePrompt } = props;

  return (
    <div className={`${styles.Field} ${className}`}>
      <input
        placeholder={placeholder}
        className={styles.Input}
        value={value}
        type={type}
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
