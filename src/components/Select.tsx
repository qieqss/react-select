import React, { useEffect, useState } from 'react';
import styles from '/src/styles/Select.module.scss';

export type SelectOption = {
    label: string;
    value: string | number;
};

interface MultipleSelectProps {
    multiple: true;
    value: SelectOption[];
    onChange: (value: SelectOption[]) => void;
}

interface SingleSelectProps {
    multiple?: false;
    value?: SelectOption;
    onChange: (value: SelectOption | undefined) => void;
}

type SelectProps = {
    options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export const Select: React.FC<SelectProps> = ({ multiple, options, value, onChange }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined);
    }

    function selectOption(option: SelectOption) {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter((o) => o !== option));
            } else {
                onChange([...value, option]);
            }
        } else {
            if (option === value) return;
            onChange(option);
        }
    }

    function isOptionSelected(option: SelectOption) {
        return multiple ? value.includes(option) : option === value;
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen]);

    return (
        <div
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen((prev) => !prev)}
            tabIndex={0}
            className={styles.container}
        >
            <span className={styles.value}>
                {multiple
                    ? value.map((v) => (
                          <button
                              key={v.value}
                              onClick={(event) => {
                                  event.stopPropagation();
                                  selectOption(v);
                              }}
                              className={styles['option__badge']}
                          >
                              {v.label}
                              <span className={styles['remove__btn']}>&times;</span>
                          </button>
                      ))
                    : value?.label}
            </span>
            <button
                onClick={(event) => {
                    event.stopPropagation();
                    clearOptions();
                }}
                className={styles['clear__btn']}
            >
                &times;
            </button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : null}`}>
                {options.map((option, index) => (
                    <li
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.value}
                        onClick={(event) => {
                            event.stopPropagation();
                            selectOption(option);
                            setIsOpen(false);
                        }}
                        className={`${styles.option} ${isOptionSelected(option) ? styles.selected : null} ${
                            index === highlightedIndex ? styles.highlighted : null
                        }`}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;
