<<<<<<< HEAD
import React, { useContext } from "react";
import { Toolbar } from "../SlateComponet";
import { renderBlockButton, renderInsertableBlockButton, renderMarkButton, renderBlockRowButton } from "../core";
import { RTEContext } from "../RTEContextProvider";
=======
import React, { useContext, useState } from "react";
import { Toolbar } from "../SlateComponet";
import { opts, renderAlignmentButton, renderBlockButton, renderInsertableBlockButton, renderMarkButton } from "../core";
import { RTEContext } from "../RTEContextProvider";
import {
    MdBorderAll,
    MdCode,
    MdFormatAlignCenter,
    MdFormatAlignLeft,
    MdFormatAlignRight,
    MdFormatBold,
    MdFormatItalic,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdFormatQuote,
    MdFormatUnderlined,
    MdInsertPhoto,
    MdLooksOne,
    MdLooksTwo,
    MdStrikethroughS,
    MdInsertLink,
    MdFlip,
    MdRemove,
    MdBrush
} from "react-icons/md";
import { Button, Divider, Input, Popover } from "antd";
import { isSelectionOutOfTable } from "../plugins/Table/utils";
import { renderLinkButton } from "../core/Actions/InlineButton";

const StandardToolBar = ({ onSave }) => {
>>>>>>> 88233f69d3abfec4fd697c8586aee710574b5192

    const rteContext = useContext(RTEContext);

    const { value } = rteContext;
    const [title, setTitle] = useState();

    const isOutTable = isSelectionOutOfTable(opts, value);

    const onSaveClick = () => {

        let post = {
            title,
            content: rteContext.value.toJSON()
        }

        onSave(post);
    };

    return (
<<<<<<< HEAD
        <Toolbar>
            {renderMarkButton("bold", "bold", rteContext)}
            {renderMarkButton("italic", "italic", rteContext)}
            {renderMarkButton("underline", "underline", rteContext)}
            {renderMarkButton("code", "code", rteContext)}
            {renderMarkButton("strikethrough", "strikethrough", rteContext)}
            {renderBlockButton("heading-one", "looks_one", rteContext)}
            {renderBlockButton("heading-two", "looks_two", rteContext)}
            {renderBlockButton("block-quote", "format_quote", rteContext)}
            {renderBlockButton("numbered-list", "ordered-list", rteContext)}
            {renderBlockButton("bulleted-list", "unordered-list", rteContext)}
            {renderInsertableBlockButton("image", "image", rteContext)}
            {renderInsertableBlockButton("table", "table", rteContext)}
            {renderInsertableBlockButton("table_cell", "table_cell", rteContext)}
        </Toolbar>
=======
        <div>
            <div>
                <Toolbar>
                    {renderMarkButton("bold", <MdFormatBold />, rteContext)}
                    {renderMarkButton("italic", <MdFormatItalic />, rteContext)}
                    {renderMarkButton("underline", <MdFormatUnderlined />, rteContext)}
                    {renderMarkButton("code", <MdCode />, rteContext)}
                    {renderMarkButton("mark", <MdBrush />, rteContext)}
                    {renderMarkButton("strikethrough", <MdStrikethroughS />, rteContext)}
                    {renderBlockButton("heading-one", <MdLooksOne />, rteContext)}
                    {renderBlockButton("heading-two", <MdLooksTwo />, rteContext)}
                    {renderBlockButton("block-quote", <MdFormatQuote />, rteContext)}
                    {renderBlockButton("numbered-list", <MdFormatListNumbered />, rteContext)}
                    {renderBlockButton("bulleted-list", <MdFormatListBulleted />, rteContext)}
                    <Popover placement="bottom" title="Divider"
                        content={
                            <div>
                                {renderBlockButton("divider-with-text", "Divider with text", rteContext, true)}
                                {renderBlockButton("divider", "Divider", rteContext, true)}
                            </div>
                        }
                        trigger="click"
                    >
                        <Button style={{ fontSize: "24px" }} shape="circle"><MdRemove /></Button>
                    </Popover>

                    {renderBlockButton("split", <MdFlip />, rteContext)}
                    <Divider style={{ height: "50px", width: "2px" }} type="vertical" />
                    {renderLinkButton("link", <MdInsertLink />, rteContext)}
                    {renderInsertableBlockButton("image", <MdInsertPhoto />, rteContext)}
                    {isOutTable && renderInsertableBlockButton("table", <MdBorderAll />, rteContext)}
                    <Divider style={{ height: "50px", width: "2px" }} type="vertical" />
                    {renderAlignmentButton("left", <MdFormatAlignLeft />, rteContext)}
                    {renderAlignmentButton("center", <MdFormatAlignCenter />, rteContext)}
                    {renderAlignmentButton("right", <MdFormatAlignRight />, rteContext)}
                    <Divider style={{ height: "50px", width: "2px" }} type="vertical" />
                    <Button type="primary" shape="round" onClick={onSaveClick}>Save</Button>
                </Toolbar>
            </div>
            <div>
                <Input placeholder="Title" allowClear onChange={(e) => setTitle(e.target.value)} />
            </div>
        </div>
>>>>>>> 88233f69d3abfec4fd697c8586aee710574b5192
    );
};

export default StandardToolBar;
