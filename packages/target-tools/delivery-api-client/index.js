const BASE_PATH = "https://.tt.omtrdc.net".replace(/\/+$/, "");
const HTTP_NO_CONTENT = 204;
const DEFAULT_TIMEOUT = 3000;
const isBlob = (value) => typeof Blob !== 'undefined' && value instanceof Blob;
class BaseAPI {
    constructor(configuration = new Configuration()) {
        this.configuration = configuration;
        this.fetchApi = async (url, init) => {
            let fetchParams = { url, init };
            for (const middleware of this.middleware) {
                if (middleware.pre) {
                    fetchParams = await middleware.pre({
                        fetch: this.fetchApi,
                        ...fetchParams,
                    }) || fetchParams;
                }
            }
            let response = await this.configuration.fetchApi(fetchParams.url, fetchParams.init);
            for (const middleware of this.middleware) {
                if (middleware.post) {
                    response = await middleware.post({
                        fetch: this.fetchApi,
                        url,
                        init,
                        response: response.clone(),
                    }) || response;
                }
            }
            return response;
        };
        this.middleware = configuration.middleware;
    }
    withMiddleware(...middlewares) {
        const next = this.clone();
        next.middleware = next.middleware.concat(...middlewares);
        return next;
    }
    withPreMiddleware(...preMiddlewares) {
        const middlewares = preMiddlewares.map((pre) => ({ pre }));
        return this.withMiddleware(...middlewares);
    }
    withPostMiddleware(...postMiddlewares) {
        const middlewares = postMiddlewares.map((post) => ({ post }));
        return this.withMiddleware(...middlewares);
    }
    async request(context) {
        const { url, init } = this.createFetchParams(context);
        const response = await this.fetchApi(url, init);
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        throw response;
    }
    createFetchParams(context) {
        let url = this.configuration.basePath + context.path;
        if (context.query !== undefined && Object.keys(context.query).length !== 0) {
            url += '?' + this.configuration.queryParamsStringify(context.query);
        }
        const body = (context.body instanceof FormData || context.body instanceof URLSearchParams || isBlob(context.body))
            ? context.body
            : JSON.stringify(context.body);
        const headers = Object.assign({}, this.configuration.headers, context.headers);
        const init = {
            method: context.method,
            headers: headers,
            body,
            credentials: this.configuration.credentials
        };
        return { url, init };
    }
    clone() {
        const constructor = this.constructor;
        const next = new constructor(this.configuration);
        next.middleware = this.middleware.slice();
        return next;
    }
}
class RequiredError extends Error {
    constructor(field, msg) {
        super(msg);
        this.field = field;
        this.name = "RequiredError";
    }
}
const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};
class Configuration {
    constructor(configuration = {}) {
        this.configuration = configuration;
    }
    get basePath() {
        return this.configuration.basePath || BASE_PATH;
    }
    get fetchApi() {
        const timeout = this.configuration.timeout;
        const fetch = this.configuration.fetchApi || window.fetch.bind(window);
        return function (input, init) {
            return new Promise((resolve, reject) => {
                let timer = setTimeout(() => reject(new Error('Request timed out')), timeout);
                fetch(input, init).then(response => resolve(response), err => reject(err)).finally(() => clearTimeout(timer));
            });
        };
    }
    get middleware() {
        return this.configuration.middleware || [];
    }
    get queryParamsStringify() {
        return this.configuration.queryParamsStringify || querystring;
    }
    get username() {
        return this.configuration.username;
    }
    get password() {
        return this.configuration.password;
    }
    get apiKey() {
        const apiKey = this.configuration.apiKey;
        if (apiKey) {
            return typeof apiKey === 'function' ? apiKey : () => apiKey;
        }
        return undefined;
    }
    get accessToken() {
        const accessToken = this.configuration.accessToken;
        if (accessToken) {
            return typeof accessToken === 'function' ? accessToken : () => accessToken;
        }
        return undefined;
    }
    get headers() {
        return this.configuration.headers;
    }
    get credentials() {
        return this.configuration.credentials;
    }
    get timeout() {
        return this.configuration.timeout || DEFAULT_TIMEOUT;
    }
}
function exists(json, key) {
    const value = json[key];
    return value !== null && value !== undefined;
}
function querystring(params, prefix = '') {
    return Object.keys(params)
        .map((key) => {
        const fullKey = prefix + (prefix.length ? `[${key}]` : key);
        const value = params[key];
        if (value instanceof Array) {
            const multiValue = value.map(singleValue => encodeURIComponent(String(singleValue)))
                .join(`&${encodeURIComponent(fullKey)}=`);
            return `${encodeURIComponent(fullKey)}=${multiValue}`;
        }
        if (value instanceof Object) {
            return querystring(value, fullKey);
        }
        return `${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`;
    })
        .filter(part => part.length > 0)
        .join('&');
}
function mapValues(data, fn) {
    return Object.keys(data).reduce((acc, key) => ({ ...acc, [key]: fn(data[key]) }), {});
}
function canConsumeForm(consumes) {
    for (const consume of consumes) {
        if ('multipart/form-data' === consume.contentType) {
            return true;
        }
    }
    return false;
}
class JSONApiResponse {
    constructor(raw, transformer = (jsonValue) => jsonValue) {
        this.raw = raw;
        this.transformer = transformer;
    }
    async value() {
        return this.transformer(this.raw.status === HTTP_NO_CONTENT ? {} : await this.raw.json());
    }
}
class VoidApiResponse {
    constructor(raw) {
        this.raw = raw;
    }
    async value() {
        return undefined;
    }
}
class BlobApiResponse {
    constructor(raw) {
        this.raw = raw;
    }
    async value() {
        return await this.raw.blob();
    }
    ;
}
class TextApiResponse {
    constructor(raw) {
        this.raw = raw;
    }
    async value() {
        return await this.raw.text();
    }
    ;
}

function ActionFromJSON(json) {
    return ActionFromJSONTyped(json);
}
function ActionFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'type': !exists(json, 'type') ? undefined : json['type'],
        'selector': !exists(json, 'selector') ? undefined : json['selector'],
        'cssSelector': !exists(json, 'cssSelector') ? undefined : json['cssSelector'],
        'content': !exists(json, 'content') ? undefined : OneOfstringobjectFromJSON(json['content']),
    };
}
function ActionToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'type': value.type,
        'selector': value.selector,
        'cssSelector': value.cssSelector,
        'content': OneOfstringobjectToJSON(value.content),
    };
}

function AddressFromJSON(json) {
    return AddressFromJSONTyped(json);
}
function AddressFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'url': !exists(json, 'url') ? undefined : json['url'],
        'referringUrl': !exists(json, 'referringUrl') ? undefined : json['referringUrl'],
    };
}
function AddressToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'url': value.url,
        'referringUrl': value.referringUrl,
    };
}

function AnalyticsPayloadFromJSON(json) {
    return AnalyticsPayloadFromJSONTyped(json);
}
function AnalyticsPayloadFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'pe': !exists(json, 'pe') ? undefined : json['pe'],
        'tnta': !exists(json, 'tnta') ? undefined : json['tnta'],
    };
}
function AnalyticsPayloadToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'pe': value.pe,
        'tnta': value.tnta,
    };
}

function AnalyticsRequestFromJSON(json) {
    return AnalyticsRequestFromJSONTyped(json);
}
function AnalyticsRequestFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'supplementalDataId': !exists(json, 'supplementalDataId') ? undefined : json['supplementalDataId'],
        'logging': !exists(json, 'logging') ? undefined : LoggingTypeFromJSON(json['logging']),
        'trackingServer': !exists(json, 'trackingServer') ? undefined : json['trackingServer'],
        'trackingServerSecure': !exists(json, 'trackingServerSecure') ? undefined : json['trackingServerSecure'],
    };
}
function AnalyticsRequestToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'supplementalDataId': value.supplementalDataId,
        'logging': LoggingTypeToJSON(value.logging),
        'trackingServer': value.trackingServer,
        'trackingServerSecure': value.trackingServerSecure,
    };
}

function AnalyticsResponseFromJSON(json) {
    return AnalyticsResponseFromJSONTyped(json);
}
function AnalyticsResponseFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'payload': !exists(json, 'payload') ? undefined : AnalyticsPayloadFromJSON(json['payload']),
    };
}
function AnalyticsResponseToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'payload': AnalyticsPayloadToJSON(value.payload),
    };
}

function ApplicationFromJSON(json) {
    return ApplicationFromJSONTyped(json);
}
function ApplicationFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'version': !exists(json, 'version') ? undefined : json['version'],
    };
}
function ApplicationToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'id': value.id,
        'name': value.name,
        'version': value.version,
    };
}

function AudienceManagerFromJSON(json) {
    return AudienceManagerFromJSONTyped(json);
}
function AudienceManagerFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'locationHint': !exists(json, 'locationHint') ? undefined : json['locationHint'],
        'blob': !exists(json, 'blob') ? undefined : json['blob'],
    };
}
function AudienceManagerToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'locationHint': value.locationHint,
        'blob': value.blob,
    };
}

var AuthenticatedState;
(function (AuthenticatedState) {
    AuthenticatedState["Unknown"] = "unknown";
    AuthenticatedState["Authenticated"] = "authenticated";
    AuthenticatedState["LoggedOut"] = "logged_out";
})(AuthenticatedState || (AuthenticatedState = {}));
function AuthenticatedStateFromJSON(json) {
    return AuthenticatedStateFromJSONTyped(json);
}
function AuthenticatedStateFromJSONTyped(json, ignoreDiscriminator) {
    return json;
}
function AuthenticatedStateToJSON(value) {
    return value;
}

function BrowserFromJSON(json) {
    return BrowserFromJSONTyped(json);
}
function BrowserFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'host': !exists(json, 'host') ? undefined : json['host'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'webGLRenderer': !exists(json, 'webGLRenderer') ? undefined : json['webGLRenderer'],
    };
}
function BrowserToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'host': value.host,
        'language': value.language,
        'webGLRenderer': value.webGLRenderer,
    };
}

var ChannelType;
(function (ChannelType) {
    ChannelType["Mobile"] = "mobile";
    ChannelType["Web"] = "web";
})(ChannelType || (ChannelType = {}));
function ChannelTypeFromJSON(json) {
    return ChannelTypeFromJSONTyped(json);
}
function ChannelTypeFromJSONTyped(json, ignoreDiscriminator) {
    return json;
}
function ChannelTypeToJSON(value) {
    return value;
}

function ContextFromJSON(json) {
    return ContextFromJSONTyped(json);
}
function ContextFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'channel': ChannelTypeFromJSON(json['channel']),
        'mobilePlatform': !exists(json, 'mobilePlatform') ? undefined : MobilePlatformFromJSON(json['mobilePlatform']),
        'application': !exists(json, 'application') ? undefined : ApplicationFromJSON(json['application']),
        'screen': !exists(json, 'screen') ? undefined : ScreenFromJSON(json['screen']),
        'window': !exists(json, 'window') ? undefined : WindowFromJSON(json['window']),
        'browser': !exists(json, 'browser') ? undefined : BrowserFromJSON(json['browser']),
        'address': !exists(json, 'address') ? undefined : AddressFromJSON(json['address']),
        'geo': !exists(json, 'geo') ? undefined : GeoFromJSON(json['geo']),
        'timeOffsetInMinutes': !exists(json, 'timeOffsetInMinutes') ? undefined : json['timeOffsetInMinutes'],
        'userAgent': !exists(json, 'userAgent') ? undefined : json['userAgent'],
        'beacon': !exists(json, 'beacon') ? undefined : json['beacon'],
    };
}
function ContextToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'channel': ChannelTypeToJSON(value.channel),
        'mobilePlatform': MobilePlatformToJSON(value.mobilePlatform),
        'application': ApplicationToJSON(value.application),
        'screen': ScreenToJSON(value.screen),
        'window': WindowToJSON(value.window),
        'browser': BrowserToJSON(value.browser),
        'address': AddressToJSON(value.address),
        'geo': GeoToJSON(value.geo),
        'timeOffsetInMinutes': value.timeOffsetInMinutes,
        'userAgent': value.userAgent,
        'beacon': value.beacon,
    };
}

function CustomerIdFromJSON(json) {
    return CustomerIdFromJSONTyped(json);
}
function CustomerIdFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'id': json['id'],
        'integrationCode': json['integrationCode'],
        'authenticatedState': AuthenticatedStateFromJSON(json['authenticatedState']),
    };
}
function CustomerIdToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'id': value.id,
        'integrationCode': value.integrationCode,
        'authenticatedState': AuthenticatedStateToJSON(value.authenticatedState),
    };
}

var DecisioningMethod;
(function (DecisioningMethod) {
    DecisioningMethod["ServerSide"] = "server-side";
    DecisioningMethod["OnDevice"] = "on-device";
    DecisioningMethod["Hybrid"] = "hybrid";
})(DecisioningMethod || (DecisioningMethod = {}));
function DecisioningMethodFromJSON(json) {
    return DecisioningMethodFromJSONTyped(json);
}
function DecisioningMethodFromJSONTyped(json, ignoreDiscriminator) {
    return json;
}
function DecisioningMethodToJSON(value) {
    return value;
}

function DeliveryRequestFromJSON(json) {
    return DeliveryRequestFromJSONTyped(json);
}
function DeliveryRequestFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'requestId': !exists(json, 'requestId') ? undefined : json['requestId'],
        'impressionId': !exists(json, 'impressionId') ? undefined : json['impressionId'],
        'id': !exists(json, 'id') ? undefined : VisitorIdFromJSON(json['id']),
        'environmentId': !exists(json, 'environmentId') ? undefined : json['environmentId'],
        'property': !exists(json, 'property') ? undefined : PropertyFromJSON(json['property']),
        'trace': !exists(json, 'trace') ? undefined : TraceFromJSON(json['trace']),
        'context': ContextFromJSON(json['context']),
        'experienceCloud': !exists(json, 'experienceCloud') ? undefined : ExperienceCloudFromJSON(json['experienceCloud']),
        'execute': !exists(json, 'execute') ? undefined : ExecuteRequestFromJSON(json['execute']),
        'prefetch': !exists(json, 'prefetch') ? undefined : PrefetchRequestFromJSON(json['prefetch']),
        'telemetry': !exists(json, 'telemetry') ? undefined : TelemetryFromJSON(json['telemetry']),
        'notifications': !exists(json, 'notifications') ? undefined : (json['notifications'].map(NotificationFromJSON)),
        'qaMode': !exists(json, 'qaMode') ? undefined : QAModeFromJSON(json['qaMode']),
    };
}
function DeliveryRequestToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'requestId': value.requestId,
        'impressionId': value.impressionId,
        'id': VisitorIdToJSON(value.id),
        'environmentId': value.environmentId,
        'property': PropertyToJSON(value.property),
        'trace': TraceToJSON(value.trace),
        'context': ContextToJSON(value.context),
        'experienceCloud': ExperienceCloudToJSON(value.experienceCloud),
        'execute': ExecuteRequestToJSON(value.execute),
        'prefetch': PrefetchRequestToJSON(value.prefetch),
        'telemetry': TelemetryToJSON(value.telemetry),
        'notifications': value.notifications === undefined ? undefined : (value.notifications.map(NotificationToJSON)),
        'qaMode': QAModeToJSON(value.qaMode),
    };
}

function DeliveryResponseFromJSON(json) {
    return DeliveryResponseFromJSONTyped(json);
}
function DeliveryResponseFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'status': !exists(json, 'status') ? undefined : json['status'],
        'requestId': !exists(json, 'requestId') ? undefined : json['requestId'],
        'id': !exists(json, 'id') ? undefined : VisitorIdFromJSON(json['id']),
        'client': !exists(json, 'client') ? undefined : json['client'],
        'edgeHost': !exists(json, 'edgeHost') ? undefined : json['edgeHost'],
        'execute': !exists(json, 'execute') ? undefined : ExecuteResponseFromJSON(json['execute']),
        'prefetch': !exists(json, 'prefetch') ? undefined : PrefetchResponseFromJSON(json['prefetch']),
    };
}
function DeliveryResponseToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'status': value.status,
        'requestId': value.requestId,
        'id': VisitorIdToJSON(value.id),
        'client': value.client,
        'edgeHost': value.edgeHost,
        'execute': ExecuteResponseToJSON(value.execute),
        'prefetch': PrefetchResponseToJSON(value.prefetch),
    };
}

var DeviceType;
(function (DeviceType) {
    DeviceType["Phone"] = "phone";
    DeviceType["Tablet"] = "tablet";
})(DeviceType || (DeviceType = {}));
function DeviceTypeFromJSON(json) {
    return DeviceTypeFromJSONTyped(json);
}
function DeviceTypeFromJSONTyped(json, ignoreDiscriminator) {
    return json;
}
function DeviceTypeToJSON(value) {
    return value;
}

function ExecuteRequestFromJSON(json) {
    return ExecuteRequestFromJSONTyped(json);
}
function ExecuteRequestFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'pageLoad': !exists(json, 'pageLoad') ? undefined : RequestDetailsFromJSON(json['pageLoad']),
        'mboxes': !exists(json, 'mboxes') ? undefined : (json['mboxes'].map(MboxRequestFromJSON)),
    };
}
function ExecuteRequestToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'pageLoad': RequestDetailsToJSON(value.pageLoad),
        'mboxes': value.mboxes === undefined ? undefined : (value.mboxes.map(MboxRequestToJSON)),
    };
}

function ExecuteResponseFromJSON(json) {
    return ExecuteResponseFromJSONTyped(json);
}
function ExecuteResponseFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'pageLoad': !exists(json, 'pageLoad') ? undefined : PageLoadResponseFromJSON(json['pageLoad']),
        'mboxes': !exists(json, 'mboxes') ? undefined : (json['mboxes'].map(MboxResponseFromJSON)),
    };
}
function ExecuteResponseToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'pageLoad': PageLoadResponseToJSON(value.pageLoad),
        'mboxes': value.mboxes === undefined ? undefined : (value.mboxes.map(MboxResponseToJSON)),
    };
}

function ExperienceCloudFromJSON(json) {
    return ExperienceCloudFromJSONTyped(json);
}
function ExperienceCloudFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'audienceManager': !exists(json, 'audienceManager') ? undefined : AudienceManagerFromJSON(json['audienceManager']),
        'analytics': !exists(json, 'analytics') ? undefined : AnalyticsRequestFromJSON(json['analytics']),
    };
}
function ExperienceCloudToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'audienceManager': AudienceManagerToJSON(value.audienceManager),
        'analytics': AnalyticsRequestToJSON(value.analytics),
    };
}

function GeoFromJSON(json) {
    return GeoFromJSONTyped(json);
}
function GeoFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'ipAddress': !exists(json, 'ipAddress') ? undefined : json['ipAddress'],
        'latitude': !exists(json, 'latitude') ? undefined : json['latitude'],
        'longitude': !exists(json, 'longitude') ? undefined : json['longitude'],
        'countryCode': !exists(json, 'countryCode') ? undefined : json['countryCode'],
        'stateCode': !exists(json, 'stateCode') ? undefined : json['stateCode'],
        'city': !exists(json, 'city') ? undefined : json['city'],
        'zip': !exists(json, 'zip') ? undefined : json['zip'],
    };
}
function GeoToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'ipAddress': value.ipAddress,
        'latitude': value.latitude,
        'longitude': value.longitude,
        'countryCode': value.countryCode,
        'stateCode': value.stateCode,
        'city': value.city,
        'zip': value.zip,
    };
}

var LoggingType;
(function (LoggingType) {
    LoggingType["ServerSide"] = "server_side";
    LoggingType["ClientSide"] = "client_side";
})(LoggingType || (LoggingType = {}));
function LoggingTypeFromJSON(json) {
    return LoggingTypeFromJSONTyped(json);
}
function LoggingTypeFromJSONTyped(json, ignoreDiscriminator) {
    return json;
}
function LoggingTypeToJSON(value) {
    return value;
}

function MboxRequestFromJSON(json) {
    return MboxRequestFromJSONTyped(json);
}
function MboxRequestFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'address': !exists(json, 'address') ? undefined : AddressFromJSON(json['address']),
        'parameters': !exists(json, 'parameters') ? undefined : json['parameters'],
        'profileParameters': !exists(json, 'profileParameters') ? undefined : json['profileParameters'],
        'order': !exists(json, 'order') ? undefined : OrderFromJSON(json['order']),
        'product': !exists(json, 'product') ? undefined : ProductFromJSON(json['product']),
        'index': !exists(json, 'index') ? undefined : json['index'],
        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}
function MboxRequestToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'address': AddressToJSON(value.address),
        'parameters': value.parameters,
        'profileParameters': value.profileParameters,
        'order': OrderToJSON(value.order),
        'product': ProductToJSON(value.product),
        'index': value.index,
        'name': value.name,
    };
}

function MboxRequestAllOfFromJSON(json) {
    return MboxRequestAllOfFromJSONTyped(json);
}
function MboxRequestAllOfFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'index': !exists(json, 'index') ? undefined : json['index'],
        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}
function MboxRequestAllOfToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'index': value.index,
        'name': value.name,
    };
}

function MboxResponseFromJSON(json) {
    return MboxResponseFromJSONTyped(json);
}
function MboxResponseFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'index': !exists(json, 'index') ? undefined : json['index'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'options': !exists(json, 'options') ? undefined : (json['options'].map(OptionFromJSON)),
        'metrics': !exists(json, 'metrics') ? undefined : (json['metrics'].map(MetricFromJSON)),
        'analytics': !exists(json, 'analytics') ? undefined : AnalyticsResponseFromJSON(json['analytics']),
        'trace': !exists(json, 'trace') ? undefined : json['trace'],
    };
}
function MboxResponseToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'index': value.index,
        'name': value.name,
        'options': value.options === undefined ? undefined : (value.options.map(OptionToJSON)),
        'metrics': value.metrics === undefined ? undefined : (value.metrics.map(MetricToJSON)),
        'analytics': AnalyticsResponseToJSON(value.analytics),
        'trace': value.trace,
    };
}

function MetricFromJSON(json) {
    return MetricFromJSONTyped(json);
}
function MetricFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'type': !exists(json, 'type') ? undefined : MetricTypeFromJSON(json['type']),
        'selector': !exists(json, 'selector') ? undefined : json['selector'],
        'eventToken': !exists(json, 'eventToken') ? undefined : json['eventToken'],
    };
}
function MetricToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'type': MetricTypeToJSON(value.type),
        'selector': value.selector,
        'eventToken': value.eventToken,
    };
}

var MetricType;
(function (MetricType) {
    MetricType["Click"] = "click";
    MetricType["Display"] = "display";
})(MetricType || (MetricType = {}));
function MetricTypeFromJSON(json) {
    return MetricTypeFromJSONTyped(json);
}
function MetricTypeFromJSONTyped(json, ignoreDiscriminator) {
    return json;
}
function MetricTypeToJSON(value) {
    return value;
}

function MobilePlatformFromJSON(json) {
    return MobilePlatformFromJSONTyped(json);
}
function MobilePlatformFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'deviceName': !exists(json, 'deviceName') ? undefined : json['deviceName'],
        'deviceType': DeviceTypeFromJSON(json['deviceType']),
        'platformType': MobilePlatformTypeFromJSON(json['platformType']),
        'version': !exists(json, 'version') ? undefined : json['version'],
    };
}
function MobilePlatformToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'deviceName': value.deviceName,
        'deviceType': DeviceTypeToJSON(value.deviceType),
        'platformType': MobilePlatformTypeToJSON(value.platformType),
        'version': value.version,
    };
}

var MobilePlatformType;
(function (MobilePlatformType) {
    MobilePlatformType["Android"] = "android";
    MobilePlatformType["Ios"] = "ios";
})(MobilePlatformType || (MobilePlatformType = {}));
function MobilePlatformTypeFromJSON(json) {
    return MobilePlatformTypeFromJSONTyped(json);
}
function MobilePlatformTypeFromJSONTyped(json, ignoreDiscriminator) {
    return json;
}
function MobilePlatformTypeToJSON(value) {
    return value;
}

function NotificationFromJSON(json) {
    return NotificationFromJSONTyped(json);
}
function NotificationFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'address': !exists(json, 'address') ? undefined : AddressFromJSON(json['address']),
        'parameters': !exists(json, 'parameters') ? undefined : json['parameters'],
        'profileParameters': !exists(json, 'profileParameters') ? undefined : json['profileParameters'],
        'order': !exists(json, 'order') ? undefined : OrderFromJSON(json['order']),
        'product': !exists(json, 'product') ? undefined : ProductFromJSON(json['product']),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'impressionId': !exists(json, 'impressionId') ? undefined : json['impressionId'],
        'type': !exists(json, 'type') ? undefined : MetricTypeFromJSON(json['type']),
        'timestamp': !exists(json, 'timestamp') ? undefined : json['timestamp'],
        'tokens': !exists(json, 'tokens') ? undefined : json['tokens'],
        'mbox': !exists(json, 'mbox') ? undefined : NotificationMboxFromJSON(json['mbox']),
        'view': !exists(json, 'view') ? undefined : NotificationViewFromJSON(json['view']),
        'pageLoad': !exists(json, 'pageLoad') ? undefined : NotificationPageLoadFromJSON(json['pageLoad']),
    };
}
function NotificationToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'address': AddressToJSON(value.address),
        'parameters': value.parameters,
        'profileParameters': value.profileParameters,
        'order': OrderToJSON(value.order),
        'product': ProductToJSON(value.product),
        'id': value.id,
        'impressionId': value.impressionId,
        'type': MetricTypeToJSON(value.type),
        'timestamp': value.timestamp,
        'tokens': value.tokens,
        'mbox': NotificationMboxToJSON(value.mbox),
        'view': NotificationViewToJSON(value.view),
        'pageLoad': NotificationPageLoadToJSON(value.pageLoad),
    };
}

function NotificationAllOfFromJSON(json) {
    return NotificationAllOfFromJSONTyped(json);
}
function NotificationAllOfFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
        'impressionId': !exists(json, 'impressionId') ? undefined : json['impressionId'],
        'type': !exists(json, 'type') ? undefined : MetricTypeFromJSON(json['type']),
        'timestamp': !exists(json, 'timestamp') ? undefined : json['timestamp'],
        'tokens': !exists(json, 'tokens') ? undefined : json['tokens'],
        'mbox': !exists(json, 'mbox') ? undefined : NotificationMboxFromJSON(json['mbox']),
        'view': !exists(json, 'view') ? undefined : NotificationViewFromJSON(json['view']),
        'pageLoad': !exists(json, 'pageLoad') ? undefined : NotificationPageLoadFromJSON(json['pageLoad']),
    };
}
function NotificationAllOfToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'id': value.id,
        'impressionId': value.impressionId,
        'type': MetricTypeToJSON(value.type),
        'timestamp': value.timestamp,
        'tokens': value.tokens,
        'mbox': NotificationMboxToJSON(value.mbox),
        'view': NotificationViewToJSON(value.view),
        'pageLoad': NotificationPageLoadToJSON(value.pageLoad),
    };
}

function NotificationMboxFromJSON(json) {
    return NotificationMboxFromJSONTyped(json);
}
function NotificationMboxFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'name': !exists(json, 'name') ? undefined : json['name'],
        'state': !exists(json, 'state') ? undefined : json['state'],
    };
}
function NotificationMboxToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'name': value.name,
        'state': value.state,
    };
}

function NotificationPageLoadFromJSON(json) {
    return NotificationPageLoadFromJSONTyped(json);
}
function NotificationPageLoadFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'state': !exists(json, 'state') ? undefined : json['state'],
    };
}
function NotificationPageLoadToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'state': value.state,
    };
}

function NotificationViewFromJSON(json) {
    return NotificationViewFromJSONTyped(json);
}
function NotificationViewFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'name': !exists(json, 'name') ? undefined : json['name'],
        'key': !exists(json, 'key') ? undefined : json['key'],
        'state': !exists(json, 'state') ? undefined : json['state'],
    };
}
function NotificationViewToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'name': value.name,
        'key': value.key,
        'state': value.state,
    };
}

function OptionFromJSON(json) {
    return OptionFromJSONTyped(json);
}
function OptionFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'type': !exists(json, 'type') ? undefined : OptionTypeFromJSON(json['type']),
        'content': !exists(json, 'content') ? undefined : OneOfstringobjectarrayFromJSON(json['content']),
        'eventToken': !exists(json, 'eventToken') ? undefined : json['eventToken'],
        'responseTokens': !exists(json, 'responseTokens') ? undefined : json['responseTokens'],
    };
}
function OptionToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'type': OptionTypeToJSON(value.type),
        'content': OneOfstringobjectarrayToJSON(value.content),
        'eventToken': value.eventToken,
        'responseTokens': value.responseTokens,
    };
}

var OptionType;
(function (OptionType) {
    OptionType["Html"] = "html";
    OptionType["Json"] = "json";
    OptionType["Redirect"] = "redirect";
    OptionType["Dynamic"] = "dynamic";
    OptionType["Actions"] = "actions";
})(OptionType || (OptionType = {}));
function OptionTypeFromJSON(json) {
    return OptionTypeFromJSONTyped(json);
}
function OptionTypeFromJSONTyped(json, ignoreDiscriminator) {
    return json;
}
function OptionTypeToJSON(value) {
    return value;
}

function OrderFromJSON(json) {
    return OrderFromJSONTyped(json);
}
function OrderFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
        'total': !exists(json, 'total') ? undefined : json['total'],
        'purchasedProductIds': !exists(json, 'purchasedProductIds') ? undefined : json['purchasedProductIds'],
        'time': !exists(json, 'time') ? undefined : DateTimeFromJSON(json['time']),
        'experienceLocalId': !exists(json, 'experienceLocalId') ? undefined : json['experienceLocalId'],
        'duplicate': !exists(json, 'duplicate') ? undefined : json['duplicate'],
        'outlier': !exists(json, 'outlier') ? undefined : json['outlier'],
    };
}
function OrderToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'id': value.id,
        'total': value.total,
        'purchasedProductIds': value.purchasedProductIds,
        'time': DateTimeToJSON(value.time),
        'experienceLocalId': value.experienceLocalId,
        'duplicate': value.duplicate,
        'outlier': value.outlier,
    };
}

function PageLoadResponseFromJSON(json) {
    return PageLoadResponseFromJSONTyped(json);
}
function PageLoadResponseFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'options': !exists(json, 'options') ? undefined : (json['options'].map(OptionFromJSON)),
        'metrics': !exists(json, 'metrics') ? undefined : (json['metrics'].map(MetricFromJSON)),
        'analytics': !exists(json, 'analytics') ? undefined : AnalyticsResponseFromJSON(json['analytics']),
        'state': !exists(json, 'state') ? undefined : json['state'],
        'trace': !exists(json, 'trace') ? undefined : json['trace'],
    };
}
function PageLoadResponseToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'options': value.options === undefined ? undefined : (value.options.map(OptionToJSON)),
        'metrics': value.metrics === undefined ? undefined : (value.metrics.map(MetricToJSON)),
        'analytics': AnalyticsResponseToJSON(value.analytics),
        'state': value.state,
        'trace': value.trace,
    };
}

function PrefetchMboxResponseFromJSON(json) {
    return PrefetchMboxResponseFromJSONTyped(json);
}
function PrefetchMboxResponseFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'index': !exists(json, 'index') ? undefined : json['index'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'options': !exists(json, 'options') ? undefined : (json['options'].map(OptionFromJSON)),
        'metrics': !exists(json, 'metrics') ? undefined : (json['metrics'].map(MetricFromJSON)),
        'analytics': !exists(json, 'analytics') ? undefined : AnalyticsResponseFromJSON(json['analytics']),
        'trace': !exists(json, 'trace') ? undefined : json['trace'],
        'state': !exists(json, 'state') ? undefined : json['state'],
    };
}
function PrefetchMboxResponseToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'index': value.index,
        'name': value.name,
        'options': value.options === undefined ? undefined : (value.options.map(OptionToJSON)),
        'metrics': value.metrics === undefined ? undefined : (value.metrics.map(MetricToJSON)),
        'analytics': AnalyticsResponseToJSON(value.analytics),
        'trace': value.trace,
        'state': value.state,
    };
}

function PrefetchMboxResponseAllOfFromJSON(json) {
    return PrefetchMboxResponseAllOfFromJSONTyped(json);
}
function PrefetchMboxResponseAllOfFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'state': !exists(json, 'state') ? undefined : json['state'],
    };
}
function PrefetchMboxResponseAllOfToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'state': value.state,
    };
}

function PrefetchRequestFromJSON(json) {
    return PrefetchRequestFromJSONTyped(json);
}
function PrefetchRequestFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'views': !exists(json, 'views') ? undefined : (json['views'].map(ViewRequestFromJSON)),
        'pageLoad': !exists(json, 'pageLoad') ? undefined : RequestDetailsFromJSON(json['pageLoad']),
        'mboxes': !exists(json, 'mboxes') ? undefined : (json['mboxes'].map(MboxRequestFromJSON)),
    };
}
function PrefetchRequestToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'views': value.views === undefined ? undefined : (value.views.map(ViewRequestToJSON)),
        'pageLoad': RequestDetailsToJSON(value.pageLoad),
        'mboxes': value.mboxes === undefined ? undefined : (value.mboxes.map(MboxRequestToJSON)),
    };
}

function PrefetchResponseFromJSON(json) {
    return PrefetchResponseFromJSONTyped(json);
}
function PrefetchResponseFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'views': !exists(json, 'views') ? undefined : (json['views'].map(ViewFromJSON)),
        'pageLoad': !exists(json, 'pageLoad') ? undefined : PageLoadResponseFromJSON(json['pageLoad']),
        'mboxes': !exists(json, 'mboxes') ? undefined : (json['mboxes'].map(PrefetchMboxResponseFromJSON)),
        'metrics': !exists(json, 'metrics') ? undefined : (json['metrics'].map(MetricFromJSON)),
    };
}
function PrefetchResponseToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'views': value.views === undefined ? undefined : (value.views.map(ViewToJSON)),
        'pageLoad': PageLoadResponseToJSON(value.pageLoad),
        'mboxes': value.mboxes === undefined ? undefined : (value.mboxes.map(PrefetchMboxResponseToJSON)),
        'metrics': value.metrics === undefined ? undefined : (value.metrics.map(MetricToJSON)),
    };
}

function ProductFromJSON(json) {
    return ProductFromJSONTyped(json);
}
function ProductFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
        'categoryId': !exists(json, 'categoryId') ? undefined : json['categoryId'],
    };
}
function ProductToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'id': value.id,
        'categoryId': value.categoryId,
    };
}

function PropertyFromJSON(json) {
    return PropertyFromJSONTyped(json);
}
function PropertyFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'token': json['token'],
    };
}
function PropertyToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'token': value.token,
    };
}

function QAModeFromJSON(json) {
    return QAModeFromJSONTyped(json);
}
function QAModeFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'token': !exists(json, 'token') ? undefined : json['token'],
        'listedActivitiesOnly': !exists(json, 'listedActivitiesOnly') ? undefined : json['listedActivitiesOnly'],
        'evaluateAsTrueAudienceIds': !exists(json, 'evaluateAsTrueAudienceIds') ? undefined : json['evaluateAsTrueAudienceIds'],
        'evaluateAsFalseAudienceIds': !exists(json, 'evaluateAsFalseAudienceIds') ? undefined : json['evaluateAsFalseAudienceIds'],
        'previewIndexes': !exists(json, 'previewIndexes') ? undefined : (json['previewIndexes'].map(QAModePreviewIndexFromJSON)),
    };
}
function QAModeToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'token': value.token,
        'listedActivitiesOnly': value.listedActivitiesOnly,
        'evaluateAsTrueAudienceIds': value.evaluateAsTrueAudienceIds,
        'evaluateAsFalseAudienceIds': value.evaluateAsFalseAudienceIds,
        'previewIndexes': value.previewIndexes === undefined ? undefined : (value.previewIndexes.map(QAModePreviewIndexToJSON)),
    };
}

function QAModePreviewIndexFromJSON(json) {
    return QAModePreviewIndexFromJSONTyped(json);
}
function QAModePreviewIndexFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'activityIndex': !exists(json, 'activityIndex') ? undefined : json['activityIndex'],
        'experienceIndex': !exists(json, 'experienceIndex') ? undefined : json['experienceIndex'],
    };
}
function QAModePreviewIndexToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'activityIndex': value.activityIndex,
        'experienceIndex': value.experienceIndex,
    };
}

function RequestDetailsFromJSON(json) {
    return RequestDetailsFromJSONTyped(json);
}
function RequestDetailsFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'address': !exists(json, 'address') ? undefined : AddressFromJSON(json['address']),
        'parameters': !exists(json, 'parameters') ? undefined : json['parameters'],
        'profileParameters': !exists(json, 'profileParameters') ? undefined : json['profileParameters'],
        'order': !exists(json, 'order') ? undefined : OrderFromJSON(json['order']),
        'product': !exists(json, 'product') ? undefined : ProductFromJSON(json['product']),
    };
}
function RequestDetailsToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'address': AddressToJSON(value.address),
        'parameters': value.parameters,
        'profileParameters': value.profileParameters,
        'order': OrderToJSON(value.order),
        'product': ProductToJSON(value.product),
    };
}

function ScreenFromJSON(json) {
    return ScreenFromJSONTyped(json);
}
function ScreenFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'width': !exists(json, 'width') ? undefined : json['width'],
        'height': !exists(json, 'height') ? undefined : json['height'],
        'colorDepth': !exists(json, 'colorDepth') ? undefined : json['colorDepth'],
        'pixelRatio': !exists(json, 'pixelRatio') ? undefined : json['pixelRatio'],
        'orientation': !exists(json, 'orientation') ? undefined : ScreenOrientationTypeFromJSON(json['orientation']),
    };
}
function ScreenToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'width': value.width,
        'height': value.height,
        'colorDepth': value.colorDepth,
        'pixelRatio': value.pixelRatio,
        'orientation': ScreenOrientationTypeToJSON(value.orientation),
    };
}

var ScreenOrientationType;
(function (ScreenOrientationType) {
    ScreenOrientationType["Portrait"] = "portrait";
    ScreenOrientationType["Landscape"] = "landscape";
})(ScreenOrientationType || (ScreenOrientationType = {}));
function ScreenOrientationTypeFromJSON(json) {
    return ScreenOrientationTypeFromJSONTyped(json);
}
function ScreenOrientationTypeFromJSONTyped(json, ignoreDiscriminator) {
    return json;
}
function ScreenOrientationTypeToJSON(value) {
    return value;
}

function TelemetryFromJSON(json) {
    return TelemetryFromJSONTyped(json);
}
function TelemetryFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'entries': !exists(json, 'entries') ? undefined : (json['entries'].map(TelemetryEntryFromJSON)),
    };
}
function TelemetryToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'entries': value.entries === undefined ? undefined : (value.entries.map(TelemetryEntryToJSON)),
    };
}

function TelemetryEntryFromJSON(json) {
    return TelemetryEntryFromJSONTyped(json);
}
function TelemetryEntryFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'requestId': !exists(json, 'requestId') ? undefined : json['requestId'],
        'timestamp': !exists(json, 'timestamp') ? undefined : json['timestamp'],
        'execution': !exists(json, 'execution') ? undefined : json['execution'],
        'features': !exists(json, 'features') ? undefined : TelemetryFeaturesFromJSON(json['features']),
    };
}
function TelemetryEntryToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'requestId': value.requestId,
        'timestamp': value.timestamp,
        'execution': value.execution,
        'features': TelemetryFeaturesToJSON(value.features),
    };
}

function TelemetryFeaturesFromJSON(json) {
    return TelemetryFeaturesFromJSONTyped(json);
}
function TelemetryFeaturesFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'decisioningMethod': !exists(json, 'decisioningMethod') ? undefined : DecisioningMethodFromJSON(json['decisioningMethod']),
    };
}
function TelemetryFeaturesToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'decisioningMethod': DecisioningMethodToJSON(value.decisioningMethod),
    };
}

function TraceFromJSON(json) {
    return TraceFromJSONTyped(json);
}
function TraceFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'authorizationToken': json['authorizationToken'],
        'usage': !exists(json, 'usage') ? undefined : json['usage'],
    };
}
function TraceToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'authorizationToken': value.authorizationToken,
        'usage': value.usage,
    };
}

function UnexpectedErrorFromJSON(json) {
    return UnexpectedErrorFromJSONTyped(json);
}
function UnexpectedErrorFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'status': json['status'],
        'message': json['message'],
    };
}
function UnexpectedErrorToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'status': value.status,
        'message': value.message,
    };
}

function ViewFromJSON(json) {
    return ViewFromJSONTyped(json);
}
function ViewFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'name': !exists(json, 'name') ? undefined : json['name'],
        'key': !exists(json, 'key') ? undefined : json['key'],
        'options': !exists(json, 'options') ? undefined : (json['options'].map(OptionFromJSON)),
        'metrics': !exists(json, 'metrics') ? undefined : (json['metrics'].map(MetricFromJSON)),
        'analytics': !exists(json, 'analytics') ? undefined : AnalyticsResponseFromJSON(json['analytics']),
        'state': !exists(json, 'state') ? undefined : json['state'],
        'trace': !exists(json, 'trace') ? undefined : json['trace'],
    };
}
function ViewToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'name': value.name,
        'key': value.key,
        'options': value.options === undefined ? undefined : (value.options.map(OptionToJSON)),
        'metrics': value.metrics === undefined ? undefined : (value.metrics.map(MetricToJSON)),
        'analytics': AnalyticsResponseToJSON(value.analytics),
        'state': value.state,
        'trace': value.trace,
    };
}

function ViewRequestFromJSON(json) {
    return ViewRequestFromJSONTyped(json);
}
function ViewRequestFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'address': !exists(json, 'address') ? undefined : AddressFromJSON(json['address']),
        'parameters': !exists(json, 'parameters') ? undefined : json['parameters'],
        'profileParameters': !exists(json, 'profileParameters') ? undefined : json['profileParameters'],
        'order': !exists(json, 'order') ? undefined : OrderFromJSON(json['order']),
        'product': !exists(json, 'product') ? undefined : ProductFromJSON(json['product']),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'key': !exists(json, 'key') ? undefined : json['key'],
    };
}
function ViewRequestToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'address': AddressToJSON(value.address),
        'parameters': value.parameters,
        'profileParameters': value.profileParameters,
        'order': OrderToJSON(value.order),
        'product': ProductToJSON(value.product),
        'name': value.name,
        'key': value.key,
    };
}

function ViewRequestAllOfFromJSON(json) {
    return ViewRequestAllOfFromJSONTyped(json);
}
function ViewRequestAllOfFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'name': !exists(json, 'name') ? undefined : json['name'],
        'key': !exists(json, 'key') ? undefined : json['key'],
    };
}
function ViewRequestAllOfToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'name': value.name,
        'key': value.key,
    };
}

function VisitorIdFromJSON(json) {
    return VisitorIdFromJSONTyped(json);
}
function VisitorIdFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'tntId': !exists(json, 'tntId') ? undefined : json['tntId'],
        'thirdPartyId': !exists(json, 'thirdPartyId') ? undefined : json['thirdPartyId'],
        'marketingCloudVisitorId': !exists(json, 'marketingCloudVisitorId') ? undefined : json['marketingCloudVisitorId'],
        'customerIds': !exists(json, 'customerIds') ? undefined : (json['customerIds'].map(CustomerIdFromJSON)),
    };
}
function VisitorIdToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'tntId': value.tntId,
        'thirdPartyId': value.thirdPartyId,
        'marketingCloudVisitorId': value.marketingCloudVisitorId,
        'customerIds': value.customerIds === undefined ? undefined : (value.customerIds.map(CustomerIdToJSON)),
    };
}

function WindowFromJSON(json) {
    return WindowFromJSONTyped(json);
}
function WindowFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'width': !exists(json, 'width') ? undefined : json['width'],
        'height': !exists(json, 'height') ? undefined : json['height'],
    };
}
function WindowToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'width': value.width,
        'height': value.height,
    };
}

function DateTimeFromJSON(value) {
    return new Date(value);
}
function DateTimeFromJSONTyped(value, ignoreDiscriminator) {
    return new Date(value);
}
function DateTimeToJSON(value) {
    return value != null && typeof value !== 'undefined' ? value.toISOString() : '';
}

function OneOfstringobjectFromJSON(value) {
    return value;
}
function OneOfstringobjectFromJSONTyped(value, ignoreDiscriminator) {
    return value;
}
function OneOfstringobjectToJSON(value) {
    return value;
}
function OneOfstringobjectarrayFromJSON(value) {
    return value;
}
function OneOfstringobjectarrayFromJSONTyped(value, ignoreDiscriminator) {
    return value;
}
function OneOfstringobjectarrayToJSON(value) {
    return value;
}

class DeliveryApi extends BaseAPI {
    async executeRaw(requestParameters) {
        if (requestParameters.imsOrgId === null || requestParameters.imsOrgId === undefined) {
            throw new RequiredError('imsOrgId', 'Required parameter requestParameters.imsOrgId was null or undefined when calling execute.');
        }
        if (requestParameters.sessionId === null || requestParameters.sessionId === undefined) {
            throw new RequiredError('sessionId', 'Required parameter requestParameters.sessionId was null or undefined when calling execute.');
        }
        if (requestParameters.deliveryRequest === null || requestParameters.deliveryRequest === undefined) {
            throw new RequiredError('deliveryRequest', 'Required parameter requestParameters.deliveryRequest was null or undefined when calling execute.');
        }
        const queryParameters = {};
        if (requestParameters.imsOrgId !== undefined) {
            queryParameters['imsOrgId'] = requestParameters.imsOrgId;
        }
        if (requestParameters.sessionId !== undefined) {
            queryParameters['sessionId'] = requestParameters.sessionId;
        }
        if (requestParameters.version !== undefined) {
            queryParameters['version'] = requestParameters.version;
        }
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        const response = await this.request({
            path: `/rest/v1/delivery`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: DeliveryRequestToJSON(requestParameters.deliveryRequest),
        });
        return new JSONApiResponse(response, (jsonValue) => DeliveryResponseFromJSON(jsonValue));
    }
    async execute(imsOrgId, sessionId, deliveryRequest, version, telemetryProvider) {
        const response = await this.executeRaw({ imsOrgId: imsOrgId, sessionId: sessionId, deliveryRequest: deliveryRequest, version: version, telemetryProvider: telemetryProvider });
        
        telemetryProvider.addEntry({});
        
        return await response.value();
    }
}

export { ActionFromJSON, ActionFromJSONTyped, ActionToJSON, AddressFromJSON, AddressFromJSONTyped, AddressToJSON, AnalyticsPayloadFromJSON, AnalyticsPayloadFromJSONTyped, AnalyticsPayloadToJSON, AnalyticsRequestFromJSON, AnalyticsRequestFromJSONTyped, AnalyticsRequestToJSON, AnalyticsResponseFromJSON, AnalyticsResponseFromJSONTyped, AnalyticsResponseToJSON, ApplicationFromJSON, ApplicationFromJSONTyped, ApplicationToJSON, AudienceManagerFromJSON, AudienceManagerFromJSONTyped, AudienceManagerToJSON, AuthenticatedState, AuthenticatedStateFromJSON, AuthenticatedStateFromJSONTyped, AuthenticatedStateToJSON, BASE_PATH, BaseAPI, BlobApiResponse, BrowserFromJSON, BrowserFromJSONTyped, BrowserToJSON, COLLECTION_FORMATS, ChannelType, ChannelTypeFromJSON, ChannelTypeFromJSONTyped, ChannelTypeToJSON, Configuration, ContextFromJSON, ContextFromJSONTyped, ContextToJSON, CustomerIdFromJSON, CustomerIdFromJSONTyped, CustomerIdToJSON, DateTimeFromJSON, DateTimeFromJSONTyped, DateTimeToJSON, DecisioningMethod, DecisioningMethodFromJSON, DecisioningMethodFromJSONTyped, DecisioningMethodToJSON, DeliveryApi, DeliveryRequestFromJSON, DeliveryRequestFromJSONTyped, DeliveryRequestToJSON, DeliveryResponseFromJSON, DeliveryResponseFromJSONTyped, DeliveryResponseToJSON, DeviceType, DeviceTypeFromJSON, DeviceTypeFromJSONTyped, DeviceTypeToJSON, ExecuteRequestFromJSON, ExecuteRequestFromJSONTyped, ExecuteRequestToJSON, ExecuteResponseFromJSON, ExecuteResponseFromJSONTyped, ExecuteResponseToJSON, ExperienceCloudFromJSON, ExperienceCloudFromJSONTyped, ExperienceCloudToJSON, GeoFromJSON, GeoFromJSONTyped, GeoToJSON, JSONApiResponse, LoggingType, LoggingTypeFromJSON, LoggingTypeFromJSONTyped, LoggingTypeToJSON, MboxRequestAllOfFromJSON, MboxRequestAllOfFromJSONTyped, MboxRequestAllOfToJSON, MboxRequestFromJSON, MboxRequestFromJSONTyped, MboxRequestToJSON, MboxResponseFromJSON, MboxResponseFromJSONTyped, MboxResponseToJSON, MetricFromJSON, MetricFromJSONTyped, MetricToJSON, MetricType, MetricTypeFromJSON, MetricTypeFromJSONTyped, MetricTypeToJSON, MobilePlatformFromJSON, MobilePlatformFromJSONTyped, MobilePlatformToJSON, MobilePlatformType, MobilePlatformTypeFromJSON, MobilePlatformTypeFromJSONTyped, MobilePlatformTypeToJSON, NotificationAllOfFromJSON, NotificationAllOfFromJSONTyped, NotificationAllOfToJSON, NotificationFromJSON, NotificationFromJSONTyped, NotificationMboxFromJSON, NotificationMboxFromJSONTyped, NotificationMboxToJSON, NotificationPageLoadFromJSON, NotificationPageLoadFromJSONTyped, NotificationPageLoadToJSON, NotificationToJSON, NotificationViewFromJSON, NotificationViewFromJSONTyped, NotificationViewToJSON, OneOfstringobjectFromJSON, OneOfstringobjectFromJSONTyped, OneOfstringobjectToJSON, OneOfstringobjectarrayFromJSON, OneOfstringobjectarrayFromJSONTyped, OneOfstringobjectarrayToJSON, OptionFromJSON, OptionFromJSONTyped, OptionToJSON, OptionType, OptionTypeFromJSON, OptionTypeFromJSONTyped, OptionTypeToJSON, OrderFromJSON, OrderFromJSONTyped, OrderToJSON, PageLoadResponseFromJSON, PageLoadResponseFromJSONTyped, PageLoadResponseToJSON, PrefetchMboxResponseAllOfFromJSON, PrefetchMboxResponseAllOfFromJSONTyped, PrefetchMboxResponseAllOfToJSON, PrefetchMboxResponseFromJSON, PrefetchMboxResponseFromJSONTyped, PrefetchMboxResponseToJSON, PrefetchRequestFromJSON, PrefetchRequestFromJSONTyped, PrefetchRequestToJSON, PrefetchResponseFromJSON, PrefetchResponseFromJSONTyped, PrefetchResponseToJSON, ProductFromJSON, ProductFromJSONTyped, ProductToJSON, PropertyFromJSON, PropertyFromJSONTyped, PropertyToJSON, QAModeFromJSON, QAModeFromJSONTyped, QAModePreviewIndexFromJSON, QAModePreviewIndexFromJSONTyped, QAModePreviewIndexToJSON, QAModeToJSON, RequestDetailsFromJSON, RequestDetailsFromJSONTyped, RequestDetailsToJSON, RequiredError, ScreenFromJSON, ScreenFromJSONTyped, ScreenOrientationType, ScreenOrientationTypeFromJSON, ScreenOrientationTypeFromJSONTyped, ScreenOrientationTypeToJSON, ScreenToJSON, TelemetryEntryFromJSON, TelemetryEntryFromJSONTyped, TelemetryEntryToJSON, TelemetryFeaturesFromJSON, TelemetryFeaturesFromJSONTyped, TelemetryFeaturesToJSON, TelemetryFromJSON, TelemetryFromJSONTyped, TelemetryToJSON, TextApiResponse, TraceFromJSON, TraceFromJSONTyped, TraceToJSON, UnexpectedErrorFromJSON, UnexpectedErrorFromJSONTyped, UnexpectedErrorToJSON, ViewFromJSON, ViewFromJSONTyped, ViewRequestAllOfFromJSON, ViewRequestAllOfFromJSONTyped, ViewRequestAllOfToJSON, ViewRequestFromJSON, ViewRequestFromJSONTyped, ViewRequestToJSON, ViewToJSON, VisitorIdFromJSON, VisitorIdFromJSONTyped, VisitorIdToJSON, VoidApiResponse, WindowFromJSON, WindowFromJSONTyped, WindowToJSON, canConsumeForm, exists, mapValues, querystring };
//# sourceMappingURL=index.js.map
