import React from 'react'
import ReactDOM from 'react-dom';

import "../../../../css/Components/Dialog/Container.css"
import { UI } from '../../../ui';

export class DialogContainer extends React.Component {
    render() {
        return (
            <Modal
                maxHeight={this.props.maxHeight}
                isVisible={this.props.isVisible}
                addClass={this.props.addClass}
                data-char={ this.props['data-char'] }
            >
                <div className="dialog-border">
                    <div className="dialog-corner top-left"></div>
                    <div className="dialog-corner top-right"></div>
                    <div className="dialog-corner bottom-left"></div>
                    <div className="dialog-corner bottom-right"></div>
                </div>
                <div className="dialog-wrapper" style={{ width: this.props.width }}>
                    <div className="dialog-caption">
                        <span className="dialog-caption-text">{this.props.title}</span>
                        {this.props.closeCallback ? <div className="dialog-close" onClick={this.props.closeCallback}></div> : ''}
                    </div>
                    <div className="dialog-content">
                        {this.props.children}
                    </div>
                </div>

            </Modal>
        );
    }
}

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            top: 0,
            width: props.width,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.isVisible || nextProps.isVisible;
    }

    dialogNode() {
        let classes = [];
        if (!this.props.isVisible)
            classes.push('hidden');
        if (this.props.addClass)
            classes.push(this.props.addClass);

        let back = ['dialog-back'].concat(classes);

        if (this.props.maxHeight)
            classes.push('max-height');
        classes.push('dialog');

        return (
            <div className={ back.join(' ') }>
                <div ref={ el => this.el = el } className={ classes.join(' ') } data-char={ this.props['data-char'] }>
                    { this.props.children }
                </div>
            </div>
        );
    }

    render() {
        return ReactDOM.createPortal(
            this.dialogNode(),
            document.body,
        );
    }
}

