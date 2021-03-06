import React, {Fragment, useContext, useEffect, useState} from "react";
import {Button, Divider, Icon, Input, Typography} from "antd";
import * as PropTypes from "prop-types";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import {clone, cloneDeep, set, startCase} from "lodash";
import JsonComponentEditorModal from "./JsonComponentEditorModal";
import {useMutation} from "graphql-hooks";
import {useRouter} from "next/router";
import {handleGraphQLAPIErrors, isPageComponent} from "../../utils/helpers";
import {SAVE_COMPONENT, UPDATE_PAGE_DETAILS} from "../../utils/GraphQLConstants";
import {redirectTo} from "../common/Redirect";
import {MenuContext} from "../../contexts/MenuContextProvider";
import RoutesInfo from "../../constants/RoutesInfo";

const {Title} = Typography;

const ListComponentProperties = ({pageDetails}) => {
    const dataStoreContext = useContext(DataStoreContext);
    const menuContext = useContext(MenuContext);
    const selectedProjectItem = dataStoreContext.selectedProjectItem;
    const [visible, setVisible] = useState(false);
    const [item, setItem] = useState(cloneDeep(selectedProjectItem));
    const [saveComponent] = useMutation(SAVE_COMPONENT);
    const [savePageDetails] = useMutation(UPDATE_PAGE_DETAILS);

    const router = useRouter();
    const projectId = router.query.projectId;
    const pageName = router.query.pageName;

    useEffect(() => {
        setItem(cloneDeep(selectedProjectItem));
    }, [selectedProjectItem]);

    const handleTextInputChange = (object, path, value) => {
        const newObject = clone(object);
        set(newObject, path, value);
        setItem(newObject);
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleSave = async e => {
        console.log(e);
        console.log("handleSave", item);
        if (isPageComponent(item)) {
            return handlePageDetailsSave(e);
        }
        const result = await saveComponent({
            variables: {
                component: item,
                projectId: projectId,
                page: pageName
            }
        });
        if (!result.error) {
            dataStoreContext.setPageDetailsUpdated(true);
        } else {
            handleGraphQLAPIErrors(result.error);
        }
    };

    const handlePageDetailsSave = async e => {
        console.log(e);
        console.log("handlePageDetailsSave", pageDetails);
        const result = await savePageDetails({
            variables: {
                pageDetails: {
                    name: item.name,
                    slug: item.slug
                },
                projectId: projectId,
                page: pageName
            }
        });
        if (!result.error) {
            console.log("new page", result);
            menuContext.updateInPageMenu(pageName, result.data.updatePage);
            if (item.slug !== pageName) {
                redirectTo(`${RoutesInfo.Project.path}/pages?projectId=${projectId}&pageName=${item.slug}`).then(() => {
                    dataStoreContext.setPageDetailsUpdated(true);
                });
            }
        } else {
            handleGraphQLAPIErrors(result.error);
        }
    };

    const handleJsonInputOk = e => {
        console.log(e);
        setVisible(false);
        return handleSave(e);
    };

    const handleJsonInputCancel = e => {
        console.log(e);
        setVisible(false);
    };

    function renderConditionalElements(item, attr) {
        const types = item.props[attr].type.split("|");
        for (const type of types) {
            switch (type) {
                case "string":
                    return <Input value={item.props[attr].value ? item.props[attr].value.value : attr}
                                  onChange={(e) => handleTextInputChange(item, `props.["${attr}"].value.value`, e.target.value)}/>;
                case "number":
                    return <Input type="number" value={item.props[attr].value ? item.props[attr].value.value : attr}
                                  onChange={(e) => handleTextInputChange(item, `props.["${attr}"].value.value`, e.target.value)}/>;
                case "object":
                    return <Fragment>
                        <Input contentEditable={false}
                               value={item.props[attr].value ? item.props[attr].value.value : attr}/>
                        <Button onClick={showModal} style={{float: "right"}}>
                            <Icon type="edit"/>
                        </Button>
                    </Fragment>;
                case "element":
                    return <Fragment>
                        <Input contentEditable={false}
                               value={item.props[attr].value ? item.props[attr].value.value : attr}/>
                        <Button onClick={showModal} style={{float: "right"}}>
                            <Icon type="edit"/>
                        </Button>
                    </Fragment>;
                case "image":
                    return <Fragment>
                        <Input value={item.props[attr].value ? item.props[attr].value.value : attr}
                               onChange={(e) => handleTextInputChange(item, `props.["${attr}"].value.value`, e.target.value)}/>
                        <Button onClick={showModal} style={{float: "right"}}>
                            <Icon type="edit"/>
                        </Button>
                    </Fragment>;

            }
        }
    }

    const generatePanelItem = item => {
        if (isPageComponent(item)) {
            return <Fragment>
                <div>Name:</div>
                <Input
                    onChange={(e) => handleTextInputChange(item, `name`, e.target.value)}
                    style={{width: "100%"}}
                    value={item.name ? item.name : "Name"}
                />
                <Divider style={{margin: "5px 0"}}/>
                <div>Slug:</div>
                <Input
                    onChange={(e) => handleTextInputChange(item, `slug`, e.target.value)}
                    style={{width: "100%"}}
                    value={item.slug ? item.slug : "slug"}
                />
                <Divider style={{margin: "5px 0"}}/>
            </Fragment>;
        }
        return (
            <Fragment>
                {Object.keys(item.props).map(attr => {
                    return (
                        <Fragment key={attr}>
                            <div>{startCase(attr)}:</div>
                            <div style={{display: "flex"}}>
                                {renderConditionalElements(item, attr)}
                            </div>
                            <Divider style={{margin: "5px 0"}}/>
                            <JsonComponentEditorModal
                                visible={visible}
                                handleOk={handleJsonInputOk}
                                handleCancel={handleJsonInputCancel}
                            />
                        </Fragment>
                    );
                })}</Fragment>
        );
    };
    if (!item)
        return <p>Select an item to view the properties</p>;
    return (
        <div style={{flex: "0 0 100%", padding: "5px", minWidth: "242px"}}>
            {isPageComponent(item) ? <Title level={4}>Page: {startCase(item.name)}</Title> :
                <Title level={4}>Component: {startCase(item.name)}</Title>}
            <Divider style={{margin: "5px 0"}}/>
            <div style={{height: "calc(100vh - 172px)", overflowY: "auto"}}>
                {generatePanelItem(item)}
            </div>
            <Divider style={{margin: "5px 0"}}/>
            <Button type="primary" onClick={handleSave}>
                <b><Icon type="check"
                         style={{marginRight: "5px"}}
                /></b>
                Save
            </Button>
        </div>
    );
};

ListComponentProperties.propTypes = {
    pageDetails: PropTypes.object
};

export default ListComponentProperties;
