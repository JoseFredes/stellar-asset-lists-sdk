const resolverOptions = {
    catalogueUrl: 'https://stellar-asset-lists.github.io/index/',
    ipfsGatewayUrl: 'https://gateway.ipfs.io/ipfs/'
}

/**
 * @typedef {{}} AssetListDescriptor
 * @property {string} name - Short descriptive title of the list
 * @property {string} provider - Organization or entity that put together the list
 * @property {string} description - Text description provided by the organization
 * @property {string} icon - URL of the list icon
 * @property {string} url - URL of the asset list
 */

/**
 * @typedef {{}} AssetList
 * @property {string} name - Short descriptive title of the list
 * @property {string} provider - Organization or entity that put together the list
 * @property {string} description - Text description provided by the organization
 * @property {string} version - Current list revision
 * @property {string} feedback - URL or Github repository address where users can report bad actors or request addition of new assets
 * @property {Asset[]} assets - Assets metadata
 */

/**
 * @typedef {{}} Asset
 * @property {string} [contract] - Contract address of the asset (for Soroban assets)
 * @property {string} [code] - Asset code (for Classic assets)
 * @property {string} [issuer] - Asset issuer account address (for Classic assets)
 * @property {string} name - Display name
 * @property {string} org - Issuer organization/company
 * @property {string} domain - FQDN of the site that hosts asset-related stellar.toml
 * @property {string} icon - Icon URL
 * @property {number} [decimals] - Number of decimals to display
 * @property {string} [comment] - Alerts, messages, or other additional information specified by the provider
 */

/**
 * Fetch all available assets lists from the catalogue
 * @returns {Promise<AssetListDescriptor[]>}
 */
export function fetchAvailableAssetLists() {
    return fetchAndParse(resolverOptions.catalogueUrl)
        .then(catalogue => {
            if (!(catalogue instanceof Array))
                return {}
            for (const list of catalogue) {
                resolveIcon(list)
            }
            return catalogue
        })
}

/**
 * Fetches the assets list from the given URL.
 * @param {string} url - The full URL to the assets list.
 * @returns {Promise<AssetList>}
 */
export function fetchAssetList(url) {
    if (!url)
        throw new TypeError('Missing asset list URL')
    return fetchAndParse(url)
        .then(assetsList => {
            if (!(assetsList?.assets instanceof Array))
                return {}
            for (const asset of assetsList.assets)
                resolveIcon(asset)
            return assetsList
        })
}

/**
 * Configure resolver options for asset list provider
 * @param {{catalogueUrl: string, ipfsGatewayUrl: string}} options
 */
export function setAssetListResolverOptions(options) {
    Object.assign(resolverOptions, options)
}

function fetchAndParse(url) {
    return fetch(url)
        .then(r => {
            if (!r.ok)
                throw new Error('Failed to fetch. ' + r.status)
            return r.json()
        })
}

function resolveIcon(item) {
    if (typeof item.icon === 'string' && /^(b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})$/.test(item.icon)) {
        item.icon = resolverOptions.ipfsGatewayUrl + item.icon
    }
}

export default {fetchAvailableAssetLists, fetchAssetList, setAssetListResolverOptions}