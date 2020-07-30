

export const GET_DATA_FOR_OVEVIEW = ['GET_DATA_FOR_OVEVIEW', '/overview'];
export const GET_DATA_FOR_TRANSACTIONS = ['GET_DATA_FOR_TRANSACTIONS', '/transactions'];
export const GET_DATA_FOR_SHEDULER = ['GET_DATA_FOR_SHEDULER', '/sheduler'];


export function action_for_get_data(action_type,data) {
    return {
        type: action_type,
        data: data
    }
}
