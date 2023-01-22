import styles from "./Select.module.scss";

interface SelectProps {
  className?: string;
  disabled?: boolean;
  onChange: (value: any) => void;
  children: React.ReactNode;
}

export default (props: SelectProps) => {
  const { children, className, disabled, onChange } = props;

  return (
    <div className={`${styles.SelectWrapper} ${className || ""}`}>
      <div className={styles.DropdownArrow} />
      <select
        className={styles.Select}
        disabled={disabled}
        onChange={(e) => onChange(e.currentTarget.value)}
      >
        {children}
      </select>
    </div>
  );
}
