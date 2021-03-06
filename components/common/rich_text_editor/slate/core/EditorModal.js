import React, {useContext} from "react";
import {Modal} from "antd";
import * as PropTypes from "prop-types";
import {RTEContext} from "../RTEContextProvider";

const EditorModal = ({title, children}) => {
    const context = useContext(RTEContext);

    const handleOk = () => {
        if (!context.gallerySelectedItem) context.modalReject(new Error("Nothing selected."));
        else context.modalResolve(context.gallerySelectedItem);
        context.hideModal();
    };

    const handleCancel = () => {
        context.modalReject(new Error("Canceled."));
        context.hideModal();
    };

    return <Modal
        title={title}
        visible={context.modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width="80%"
        bodyStyle={{padding: "5px"}}
    >
        {children}
    </Modal>;
};

EditorModal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element
};

export default EditorModal;
