import React from 'react';

interface IProps {
    active: boolean;
    children: JSX.Element | JSX.Element[];
}

const MenuTab = React.memo<IProps>(({ active, children }) => {
    if (active) {
        return <div className="menu-container__content">{children}</div>;
    } else {
        return null;
    }
});
export default MenuTab;
