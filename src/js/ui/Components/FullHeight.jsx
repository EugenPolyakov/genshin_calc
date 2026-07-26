import React from 'react';

import "../../../css/Components/FullHeight.css";
import { TabLoading } from './Tab';
import { formatNumber } from '../Utils';
import { ScrolledPanel } from './ScrolledPanel';

const OVERLAY_DELAY = 100;

export function FullHeight(props) {
    return (
        <div className={'full-height' + (props.addClass ? ' '+ props.addClass : '')}>{props.children}</div>
    );
}

export function FullHeightHeader(props) {
    return (
        <div className={ "header" + (props.addClass ? ' ' + props.addClass : '') }>{ props.children }</div>
    );
}

export function FullHeightFooter(props) {
    return (
        <div className="footer">{ props.children }</div>
    );
}

export class FullHeightScrollable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoading: false,
        };

        this.prevLoading = false;

        this.timerId;
    }

    render() {
        if (!this.props.isLoading || this.prevLoading != this.props.isLoading) {
            if (this.timerId) {
                clearTimeout(this.timerId);
            }
        }
        this.prevLoading = this.props.isLoading;

        if (!this.props.isLoading) {
            this.state.showLoading = false;
        }

        if (this.props.isLoading) {
            this.timerId = setTimeout(() => {
                if (!this.state.showLoading) {
                    this.setState({showLoading: true});
                }
            }, OVERLAY_DELAY);
        }

        let style = {};
        if (this.props.maxHeight) {
            style.maxHeight = this.props.maxHeight;
        }
        if (this.props.minHeight) {
            style.minHeight = this.props.minHeight;
        }

        let progressMessages = [];

        if (this.props.isLoading) {
            let items = [];
            let progress = this.props.loadingProgress;
            if (progress && progress.total) {
                items.push(progress)
            }

            if (this.props.loadingSubProgress) {
                items = items.concat(this.props.loadingSubProgress);
            }

            for (let i = 0; i < items.length; ++i) {
                let item = items[i]
                progressMessages.push(
                    <div key={'item'+ i} className="loading-progress">
                        { formatNumber(item.completed, { zero: 1 }) }/{ formatNumber(item.total)} ({item.total ? Math.round(100 * item.completed / item.total) : 0}%)
                    </div>
                )
            }
        }

        return (
            <ScrolledPanel className="scrolled-content">
                {this.props.children}
                {this.state.showLoading ?
                    <TabLoading>
                        <div>{this.props.loadingOverlay}</div>
                        {progressMessages}
                    </TabLoading>
                : null}
            </ScrolledPanel>
        );
    }
}
