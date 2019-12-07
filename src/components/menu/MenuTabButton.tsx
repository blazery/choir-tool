import React from 'react';

interface IProps {
    onClick: () => unknown;
    active: boolean;
    text?: JSX.Element | string;
}
export default React.memo<IProps>(({ text, onClick, active }) => {
    const className = 'menu-tab-button' + (active ? ' --active' : '');
    return (
        <button onClick={onClick} className={className}>
            {text}
        </button>
    );
});
