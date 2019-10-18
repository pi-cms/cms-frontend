/* eslint-disable react/prop-types */
import React from "react";
import { css, cx } from "emotion";
import * as PropTypes from "prop-types";

export class Table extends React.Component {
    static childContextTypes = {
        isInTable: PropTypes.bool
    };

    getChildContext() {
        return { isInTable: true };
    }

    render() {
        const { attributes, children } = this.props;
        return (
            <table>
                <tbody {...attributes}>{children}</tbody>
            </table>
        );
    }
}

export class TableRow extends React.Component {
    render() {
        const { attributes, children } = this.props;
        return <tr {...attributes}>{children}</tr>;
    }
}

export class TableCell extends React.Component {
    render() {
        const { attributes, children, node } = this.props;

        const textAlign = node.get("data").get("align", "left");

        return (
            <td style={{ textAlign, minWidth: "50px", border: "1px solid black" }} {...attributes}>
                {children}
            </td>
        );
    }
}

export class Paragraph extends React.Component {
    static contextTypes = {
        isInTable: PropTypes.bool
    };

    render() {
        const { attributes, children } = this.props;
        const { isInTable } = this.context;

        const style = isInTable ? { margin: 0 } : {};

        return (
            <p style={style} {...attributes}>
                {children}
            </p>
        );
    }
}

export const Button = React.forwardRef(
    ({ className, active, reversed, ...props }, ref) => (
        <span
            {...props}
            ref={ref}
            className={cx(
                className,
                css`
          cursor: pointer;
          color: ${reversed
                        ? active ? "white" : "#aaa"
                        : active ? "black" : "#ccc"};
        `
            )}
        />
    )
);

export const EditorValue = React.forwardRef(
    ({ className, value, ...props }, ref) => {
        const textLines = value.document.nodes
            .map(node => node.text)
            .toArray()
            .join("\n");
        return (
            <div
                ref={ref}
                {...props}
                className={cx(
                    className,
                    css`
            margin: 30px -20px 0;
          `
                )}
            >
                <div
                    className={css`
            font-size: 14px;
            padding: 5px 20px;
            color: #404040;
            border-top: 2px solid #eeeeee;
            background: #f8f8f8;
          `}
                >
                    Slate's value as text
                </div>
                <div
                    className={css`
            color: #404040;
            font: 12px monospace;
            white-space: pre-wrap;
            padding: 10px 20px;
            div {
              margin: 0 0 0.5em;
            }
          `}
                >
                    {textLines}
                </div>
            </div>
        );
    }
);

export const Icon = React.forwardRef(({ className, ...props }, ref) => (
    <span
        {...props}
        ref={ref}
        className={cx(
            "material-icons",
            className,
            css`
        font-size: 18px;
        vertical-align: text-bottom;
      `
        )}
    />
));

export const Instruction = React.forwardRef(({ className, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
        className={cx(
            className,
            css`
        white-space: pre-wrap;
        margin: 0 -20px 10px;
        padding: 10px 20px;
        font-size: 14px;
        background: #f8f8e8;
      `
        )}
    />
));

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
        className={cx(
            className,
            css`
        & > * {
          display: inline-block;
        }
        & > * + * {
          margin-left: 15px;
        }
      `
        )}
    />
));

// eslint-disable-next-line react/prop-types
export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
    <Menu
        {...props}
        ref={ref}
        className={cx(
            className,
            css`
        position: relative;
        padding: 1px 18px 17px;
        margin: 0 -20px;
        border-bottom: 2px solid #eee;
        margin-bottom: 20px;
      `
        )}
    />
));
