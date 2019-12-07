import { observer } from 'mobx-react';
import { string } from 'prop-types';
import React, { ChangeEvent } from 'react';
import AppStore from '../../stores/AppStore';
import CardMenuItem from './CardMenuItem';

@observer
export default class SettingsMenu extends React.PureComponent {
    private fileInputRef?: HTMLInputElement;
    private getFileInputRef = (ref: HTMLInputElement) => {
        this.fileInputRef = ref;
    }

    private onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        if (target) {
            const file = target.files && target.files[0];
            if (file) {
                AppStore.getStore().IOStore.uploadFile(file);
            }
        }
    }
    private onFileUploadButtonClick = () => {
        if (this.fileInputRef) {
            this.fileInputRef.click();
        }
    }

    public render() {
        return (
            <div className="menu__cards">
                <div className="menu__header">
                    <div className="menu__header__inner">
                        <span>Settings:</span>
                    </div>
                </div>
                <div className="menu__content">
                    <div className="file-settings-container">
                        <input
                            type="file"
                            hidden
                            ref={this.getFileInputRef}
                            onChange={this.onFileChange}
                        />
                        <button onClick={this.onFileUploadButtonClick}>
                            <span className="fas fa-folder-open" />
                        </button>
                        <button
                            onClick={() => {
                                AppStore.getStore().IOStore.saveBoard();
                            }}
                        >
                            <span className="fas fa-save" />
                        </button>
                    </div>
                </div>
                <div className="menu__controls">
                    <div className="input-container"></div>
                    <div className="menu__controls__button-container"></div>
                </div>
            </div>
        );
    }
}
