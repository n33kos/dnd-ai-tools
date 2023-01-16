import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useReducer } from 'react';
import useKeyPress from '../../../hooks/useKeyPress';
import styles from './OptionList.module.scss';

interface OptionListOption {
  id: number;
  title: string;
  href?: string;
  onClick?: () => void;
}

interface OptionListProps {
  options: OptionListOption[];
}

export default (props: OptionListProps) => {
  const { options } = props;
  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');
  const enterPressed = useKeyPress('Enter');

  const optionsReducer = (state, action) => {
    switch (action.type) {
      case 'arrowUp':
        return {
          selectedIndex:
            state.selectedIndex !== 0 ? state.selectedIndex - 1 : options.length - 1,
        };
      case 'arrowDown':
        return {
          selectedIndex:
            state.selectedIndex !== options.length - 1 ? state.selectedIndex + 1 : 0,
        };
      case 'select':
        return { selectedIndex: action.payload };
      default:
        throw new Error();
    }
  };

  const [selectedOptionState, dispatch] = useReducer(optionsReducer, { selectedIndex: 0 });

  const selectOption = () => {
    const selectedOption = options[selectedOptionState.selectedIndex]
    selectedOption.onClick && selectedOption.onClick();
    selectedOption.href && Router.push(selectedOption.href);
  }

  useEffect(() => {
    if (arrowUpPressed) {
      (document.activeElement as HTMLElement).blur();
      dispatch({ type: 'arrowUp' });
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      (document.activeElement as HTMLElement).blur();
      dispatch({ type: 'arrowDown' });
    }
  }, [arrowDownPressed]);

  useEffect(() => {
    if (enterPressed) {
      selectOption();
    }
  }, [enterPressed]);

  return (
    <ul>
      {options.map((option, i) => (
        <div key={option.id} className={styles.Option}>
          <Link
            className={`
              ${styles.Title}
              ${i === selectedOptionState.selectedIndex ? styles.Selected : ""}
            `}
            href={option.href}
            onClick={option.onClick}
            role="button"
            aria-pressed={i === selectedOptionState.selectedIndex}
            tabIndex={0}
            onFocus={() => dispatch({ type: 'select', payload: i })}
            onKeyPress={(e: any) => {
              if (e.key === 'Enter') {
                selectOption();
                e.target.blur();
              }
            }}
          >
            {option.title}
          </Link>
        </div>
      ))}
    </ul>
  );
}
