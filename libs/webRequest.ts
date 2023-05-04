
/**
 * MakeCode extension for sending and receiving HTTP requests.
 */
 namespace webRequest {

    // Define the XMLHttpRequest interface
    interface XMLHttpRequest {
        readonly readyState: number;
        readonly response: any;
        readonly responseText: string;
        readonly responseType: XMLHttpRequestResponseType;
        readonly responseURL: string;
        readonly status: number;
        readonly statusText: string;
        onreadystatechange: ((this: XMLHttpRequest, ev: Event) => any) | null;
        timeout: number;
        withCredentials: boolean;
        abort(): void;
        getAllResponseHeaders(): string;
        getResponseHeader(header: string): string | null;
        open(method: string, url: string, async?: boolean, user?: string | null, password?: string | null): void;
        overrideMimeType(mime: string): void;
        send(body?: Document | BodyInit | null): void;
        setRequestHeader(header: string, value: string): void;
    }
     
    /**
     * Performs an HTTP GET request and returns the response text.
     * @param url The URL to send the request to.
     * @param headers Optional headers to include in the request.
     */
    //% block="httpGet url=$url || headers=$headers"
    export function httpGet(url: string, headers?: any): string {
        let request = new XMLHttpRequest();
        request.open("GET", url, false);
        if (headers) {
            for (let headerName in headers) {
                request.setRequestHeader(headerName, headers[headerName]);
            }
        }
        request.send(null);
        if (request.status == 200) {
            return request.responseText;
        } else {
            return "";
        }
    }

    /**
     * Performs an HTTP POST request and returns the response text.
     * @param url The URL to send the request to.
     * @param data The data to include in the request body.
     * @param headers Optional headers to include in the request.
     */
    //% block="httpPost url=$url || data=$data || headers=$headers"
    export function httpPost(url: string, data: string, headers?: any): string {
        let request = new XMLHttpRequest();
        request.open("POST", url, false);
        if (headers) {
            for (let headerName in headers) {
                request.setRequestHeader(headerName, headers[headerName]);
            }
        }
        request.send(data);
        if (request.status == 200) {
            return request.responseText;
        } else {
            return "";
        }
    }

    /**
     * Converts multiple MakeCode variables to a JSON object.
     * @param vars An object containing the variable names and values.
     */
    //% block="toJsonData with $vars"
    //% inlineInputMode=inline
    //% expandableArgumentMode="enabled"
    export function toJsonData(...vars: any[]): any {
        const jsonData: {[key: string]: any} = {};
        for (let i = 0; i < vars.length; i++) {
            let varName = Object.keys(vars[i])[0];
            let varValue = vars[i][varName];
            jsonData[varName] = varValue;
        }
        return jsonData;
    }

    /**
     * Create an object from variable name and value.
     * @param varName The name of the variable.
     * @param varValue The value of the variable.
     * @returns An object with the variable name and value.
     */
    //% block="createObject with name $varName value $varValue"
    export function createObject(varName: string, varValue: number): { [key: string]: number } {
        const obj: { [key: string]: number } = {};
        obj[varName] = varValue;
        return obj;
    }
}
