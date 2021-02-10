import { memo } from 'react';
import Downshift from 'downshift';
import classnames from 'classnames';

import { ChevronDown } from 'react-feather';
import styles from './ModuleMenu.scss';

type Props = {
  readonly removeModule: () => void;
  readonly editCustomData: () => void;
};

type ModuleTypeOptions = {
  label: string;
  action: () => void;
  className?: string;
};

const ModuleMenu = memo((props: Props) => {
  const menuItems: ModuleTypeOptions[] = [
    { label: 'Essential Major', action: props.editCustomData },
    { label: 'Essential Second Major', action: props.removeModule },
    { label: 'Elective', action: props.removeModule },
    { label: 'Unrestricted Elective', action: props.removeModule },
  ];

  return (
    <Downshift
      onSelect={(item) => {
        menuItems.forEach(({ label, action }) => {
          if (item === label) {
            action();
          }
        });
      }}
    >
      {({ getItemProps, getMenuProps, highlightedIndex, isOpen, toggleMenu }) => (
        <div className={styles.menuBtn}>
          <button
            className={classnames('btn close')}
            type="button"
            onClick={() => toggleMenu()}
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            Module Type
            <ChevronDown color="#6f6f6f" />
          </button>
          <div
            className={classnames(styles.menu, 'dropdown-menu', { show: isOpen })}
            {...getMenuProps()}
          >
            {menuItems.map(({ label, className }, itemIndex) => (
              <button
                type="button"
                key={label}
                className={classnames('dropdown-item', className, {
                  'dropdown-selected': highlightedIndex === itemIndex,
                })}
                {...getItemProps({ item: label })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </Downshift>
  );
});

export default ModuleMenu;