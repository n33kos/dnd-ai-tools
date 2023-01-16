import { useMutation } from "@apollo/client";
import { GenerateFromPrompt } from "../../../graph/shared";
import styles from "./GenerateFromAi.module.scss";

interface GenerateFromAiProps {
  className?: string;
  prompt: string;
  onGenerate: (response: string) => void;
}

export default (props: GenerateFromAiProps) => {
  const { onGenerate, prompt, className } = props;
  const [generateFromPrompt, {data, loading}] = useMutation(GenerateFromPrompt)

  return (
    <button
      className={`${styles.Button} ${className} ${loading ? styles.Loading : ""}`}
      type="button"
      onClick={() => {
        generateFromPrompt({
          variables: {prompt},
          onCompleted(data) {
            onGenerate(data.generateFromPrompt)
          }
        })
      }}
    />
  );
}
