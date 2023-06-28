import { gql } from '@apollo/client';

export const ALL_TASK = gql`
    query {
        tasks(stage: DRAFT) {
            id
            title
            description
            assignedTo
        }
    }
`
export const DELETE_TASK = gql`
    mutation deleteTask($id: ID!) {
        deleteTask(where: {id: $id}) {
            id
            title
            description
            assignedTo
        }
    }
`
export const CREATE_TASK =  gql`
    mutation createTask($assignedTo: String, $description: String, $title: String) {
        createTask(
            data: {assignedTo: $assignedTo, description: $description, title: $title}
          ) {
            id
            title
            description
            assignedTo
        }
    }
`
export const UPDATE_TASk = gql`
    mutation updateTask($assignedTo: String, $description: String, $title: String, $id: ID){
        updateTask(
            where: {id: $id}
            data: {assignedTo: $assignedTo, description: $description, title: $title}
        ) {
            assignedTo
            description
            title
        }
}
`
export const PUBLISH_TASK = gql`
    mutation publishTask($id: ID) {
        publishTask(where: {id: $id}, to: PUBLISHED) {
            assignedTo
            description
            title
        }
    }
`