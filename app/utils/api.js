// @flow

import * as configConstants from '../constants/config';

const JSONHeaders = {
    Accept: 'application/json',
    'Content-type': 'application/json',
};

const encodeValue = (key, value) => {
  return `${ key }=${ encodeURIComponent(value) }&`;
};

function parseResponse(response) {
    return response.text().then((text) => {
        let data;
        const isResponseInJson = response.headers.map['content-type'].find(item => (
            item.indexOf('application/json' !== -1)
        ));
        if (isResponseInJson) {
            try {
                data = JSON.parse(text);
            } catch (err) {
                throw err;
            }
        }

        if (response.status >= 200 && response.status < 400) {
            return data;
        }

        throw data;
    });
}

export function post(options = {}) {
    let data = options.data;
    if (typeof data !== 'string') {
        data = new FormData();
        Object.keys(options.data).forEach(dataKey => (
            data.append(dataKey, options.data[dataKey])
        ));
    }
    return fetch(`${configConstants.API_URL}${options.url}`, {
        method: 'post',
        credentials: 'include',
        headers: {
            ...options.headers,
        },
        body: data,
    }).then(parseResponse);
}

export function postJSON(options = {}) {
    return post({
        ...options,
        headers: {
            ...options.headers,
            ...JSONHeaders,
        },
        data: JSON.stringify(options.data),
    });
}

export function get(options = {}) {
    let dataString = '';

    Object.keys(options.data).forEach(dataKey => {
        const dataItem = options.data[dataKey];
        if (Array.isArray(dataItem)) {
            dataItem.forEach(item => {
                dataString += encodeValue(key, item);
            });
        } else {
            dataString += encodeValue(key, value);
        }
    });
    dataString = dataString.replace(/&$/, '');

    return fetch(`${configConstants.API_URL}${options.url}?${dataString}`, {
        credentials: 'include',
        headers: {
            ...options.headers,
        },
    }).then(parseResponse);
}

export function getJSON(options = {}) {
    return get({
        ...options,
        headers: {
            ...options.headers,
            ...JSONHeaders,
        },
    });
}
