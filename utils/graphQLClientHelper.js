import {redirectTo} from "../components/common/Redirect";
import {ADD_PAGE, PROJECT_PAGES} from "./GraphQLConstants";
import RoutesInfo from "../constants/RoutesInfo";

export async function executeAllPagesQuery(graphQLClient, projectId) {
    return new Promise((resolve, reject) => {
        graphQLClient.fetch(graphQLClient.url, {
            method: "POST",
            headers: {
                ...graphQLClient.headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: PROJECT_PAGES,
                variables: {projectId},
                projectId: projectId
            })
        }).then(r => r.json())
            .then(response => {
                if (response.errors) {
                    response.errors.forEach((err) => {
                        err.extensions && err.extensions.code === "FORBIDDEN" && redirectTo(RoutesInfo.Login.path);
                    });
                    reject(response.errors);
                } else {
                    resolve(response.data);
                }
            });
    });
}

export async function executeCreateNewPageQuery(graphQLClient, projectId) {
    return new Promise((resolve, reject) => {
        graphQLClient.fetch(graphQLClient.url, {
            method: "POST",
            headers: {
                ...graphQLClient.headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: ADD_PAGE,
                variables: {projectId},
                projectId: projectId
            })
        }).then(r => r.json())
            .then(response => {
                if (response.errors) {
                    response.errors.forEach((err) => {
                        err.extensions && err.extensions.code === "FORBIDDEN" && redirectTo(RoutesInfo.Login.path);
                    });
                    reject(response.errors);
                } else {
                    resolve(response.data);
                }
            });
    });
}
