import ApiConst from '../config/api-config.json'


/**
 * This class contains the generic method to call api
 * -returns the result of call
 */
export default function api() {
    return fetch( ApiConst.API, {
        method: ApiConst.API_METHOD,
        "headers": {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    .then (res => res.json())
    .catch(error => error)
}