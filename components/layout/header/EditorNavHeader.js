import React from "react";
import {Button, Layout, message, Modal} from "antd";
import Link from "next/link";
import "./nav_header.scss";
import RoutesInfo from "../../../constants/RoutesInfo";
import {useRouter} from "next/router";
import ProjectService from "../../../services/ProjectService";

const {Header} = Layout;

const EditorNavHeader = () => {
    // const [deployProject] = useMutation(DEPLOY_PROJECT);

    const router = useRouter();
    const projectId = router.query.projectId;

    function confirm() {
        Modal.confirm({
            title: "Are you sure?",
            content: "You are about to publish your website. This will take a while to build and deploy. Do you want to proceed?",
            okText: "Proceed",
            cancelText: "Fall Back",
            onOk: async () => {
                console.log("Deploy Project", projectId);
                const hideMessage = message.loading("Deploying project...");
                // const result = await deployProject({
                //     variables: {
                //         id: projectId
                //     }
                // });
                ProjectService.deployProject(projectId, (res) => {
                    console.log(res);
                    message.success("Project deployed!");
                    hideMessage && hideMessage();
                }, (err) => {
                    console.error(err);
                    message.error("Project deployment failed!");
                    hideMessage && hideMessage();
                });
                // if (result.error) {
                //     handleGraphQLAPIErrors(result.error);
                // }
            }
        });
    }

    return (
        <Header className="nav_header editor_nav_header">
            <div className="left">
                {!process.env.SINGLE_PROJECT_MODE &&
                <Link href={RoutesInfo.Dashboard.path}><Button type="danger">Close Project</Button></Link>}
            </div>
            <div className="right">
                {/*<Button type="primary" onClick={confirm}>Publish</Button>*/}
                {/*<Button style={{marginLeft: "5px"}} ghost>Preview</Button>*/}
            </div>
        </Header>
    );
};

export default EditorNavHeader;
