import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client'
import parse from 'html-react-parser';

class SimpleTooltipControl extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            tooltipHTML: '',
            rect: { top: 0, left: 0 },
            top: 0,
            left: 0,
        };

        this.elementRef = React.createRef();

        this.onMouseLeave = (e) => {
            this.setState({ isVisible: false });
        };

        this.onMouseEnter = (e) => {
            let tooltipHTML = e.currentTarget.getAttribute('data-tooltip');
            let rect = e.currentTarget.getBoundingClientRect();

            this.setState({
                isVisible: !!tooltipHTML,
                tooltipHTML: tooltipHTML ? tooltipHTML : '',
                rect,
                top: e.clientY + 20,
            });
        };

        this.handlers = {
            onMouseLeave: this.onMouseLeave,
            onMouseEnter: this.onMouseEnter,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tooltipHTML !== this.state.tooltipHTML ||
            prevState.rect.left != this.state.rect.left ||
            prevState.rect.top != this.state.rect.top) {

            let docWidth = document.width;
            let rect = this.elementRef.current.getBoundingClientRect();
            let left = this.state.rect.left - rect.width / 2;
            let top = this.state.rect.top - rect.height - 6;

            if (top < 0) {
                top = this.state.top;
            }

            if (left + this.width > docWidth) {
                left = docWidth - this.width;
            }

            if (left < 0) {
                left = 0;
            }

            this.setState({
                top,
                left,
            });
        }
    }

    render() {
        let style = {
            left: this.state.left,
            top: this.state.top,
        };
        if (this.state.isVisible)
            style.display = "block";

        return (
            <div className="tooltip-wrapper" style={ style } ref={ this.elementRef }>
                { parse(this.state.tooltipHTML) }
            </div>
        );
    }
}

export function SimpleTooltip() {
    let result = {
        ref: null,
    }
    let root = document.createElement('div');
    let container = ReactDOMClient.createRoot(root);
    container.render(ReactDOM.createPortal(
        <SimpleTooltipControl ref={ (obj) => result.ref = obj } />,
        document.body,
    ));

    return function () {
        if (result.ref)
            return result.ref.handlers;
        return null;
    };
}
