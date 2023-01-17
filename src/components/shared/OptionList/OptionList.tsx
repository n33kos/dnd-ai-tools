import { Element, scroller } from 'react-scroll'
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useReducer } from 'react';
import useKeyPress from '../../../hooks/useKeyPress';
import styles from './OptionList.module.scss';

interface OptionListOption {
  title?: string;
  href?: string;
  selectable?: boolean;
  onClick?: () => void;
  render?: (isSelected: boolean) => JSX.Element;
}

interface OptionListProps {
  options: OptionListOption[];
}

export default (props: OptionListProps) => {
  const { options } = props;
  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowRightPressed = useKeyPress('ArrowRight');
  const arrowDownPressed = useKeyPress('ArrowDown');
  const arrowLeftPressed = useKeyPress('ArrowLeft');
  const enterPressed = useKeyPress('Enter');

  const optionsReducer = (state, action) => {
    let selectedIndex;
    let nextIndex = state.selectedIndex;
    let breaker = 0;
    switch (action.type) {
      case 'arrowUp':
      case 'arrowLeft':
        while (selectedIndex === undefined) {
          if (breaker++ > 1000) break;

          nextIndex = nextIndex !== 0 ? nextIndex - 1 : options.length - 1;
          if (options[nextIndex].selectable === false) continue;

          selectedIndex = nextIndex;
        }
        return {selectedIndex};
      case 'arrowDown':
      case 'arrowRight':
        while (selectedIndex === undefined) {
          if (breaker++ > 1000) break;

          nextIndex = nextIndex !== options.length - 1 ? nextIndex + 1 : 0;
          if (options[nextIndex].selectable === false) continue;

          selectedIndex = nextIndex;
        }
        return {selectedIndex};
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
    scroller.scrollTo('selected-option', {
      duration: 600,
      delay: 300,
      smooth: 'easeInOutQuart'
    });
  }, [selectedOptionState.selectedIndex])

  useEffect(() => {
    if (arrowUpPressed) {
      (document.activeElement as HTMLElement).blur();
      dispatch({ type: 'arrowUp' });
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowRightPressed) {
      (document.activeElement as HTMLElement).blur();
      dispatch({ type: 'arrowRight' });
    }
  }, [arrowRightPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      (document.activeElement as HTMLElement).blur();
      dispatch({ type: 'arrowDown' });
    }
  }, [arrowDownPressed]);

  useEffect(() => {
    if (arrowLeftPressed) {
      (document.activeElement as HTMLElement).blur();
      dispatch({ type: 'arrowLeft' });
    }
  }, [arrowLeftPressed]);

  useEffect(() => {
    if (enterPressed) {
      selectOption();
    }
  }, [enterPressed]);

  return (
    <ul>
      {options.map((option, i) => (
        <li key={`optionlist-${i}`} className={styles.Option}>
          {i === selectedOptionState.selectedIndex  && (<Element name="selected-option" />)}
          {option.render && option.render(i === selectedOptionState.selectedIndex)}
          {!option.render && (
            <>
              {(!option.href && !option.onClick) && (
                <div className={styles.Title}>
                  {option.title}
                </div>
              )}

              {(option.href || option.onClick) && (
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
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
