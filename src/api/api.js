import fetch from 'isomorphic-fetch';//考虑使用fetch

class _Api {
    constructor(opts) {
        this.opts = opts || {};

        if (!this.opts.baseURI)
            throw new Error('baseURI option is required');

    }

    request = (path, method = 'post', params, data, callback, urlType) => {
        return new Promise((resolve, reject) => {
            let url = this.opts.baseURI + path;
            if (urlType) {
                url = this.opts[urlType + 'BaseURI'] + path;
            }
            if (path.indexOf('http://') == 0) {
                url = path;
            }

            const opts = {
                method: method,
            };
            if (this.opts.headers) {
                opts.headers = this.opts.headers;
            }

            if (data) {
                opts.headers['Content-Type'] = 'application/json; charset=utf-8';
                opts.body = JSON.stringify(data);
            }
            if (params) {
                opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                let queryString = '';
                for (const param in params) {
                    const value = params[param];
                    if (value == null || value == undefined) {
                        continue;
                    }
                    queryString += (param + '=' + value + '&');
                }
                if (opts.method == 'get') {
                    if (url.indexOf('?') != -1) {
                        url += ('&' + queryString);
                    } else {
                        url += ('?' + queryString);
                    }
                } else {
                    opts.body = queryString;
                }
            }
            fetch(url, opts).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json().then(function (json) {
                    // callback();
                    return resolve(json);
                })

            }).catch(function (error) {
                console.log(error);
            });
        })
    }

}

const Api = _Api;

export default Api
