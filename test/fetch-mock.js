const catalogue = [
    {
        'name': 'AssetList1',
        'provider': 'Stellar community',
        'description': 'Assets approved by Stellar community members',
        'url': 'https://stellar.community/asset-list',
        'icon': 'bafkreibpzncuhbk5ozhdw7xkcdoyf3xhwhcwcf6sj7axjzimxw6vm6pvyy'
    }
]

const list = {
    'name': 'Stellar Top 50',
    'provider': 'StellarExpert',
    'description': 'Assets approved by Stellar community members',
    'version': '1.0',
    'feedback': 'https://stellar.community/feedback',
    'assets': [
        {
            'code': 'yXLM',
            'issuer': 'GARDNV3Q7YGT4AKSDF25LT32YSCCW4EV22Y2TV3I2PU2MMXJTEDL5T55',
            'org': 'Ultra Stellar LLC dba Ultra Stellar',
            'domain': 'ultrastellar.com',
            'icon': 'bafkreihntcz2lpaxawmbhwidtuifladkgew6olwuly2dz5pewqillhhpay',
            'decimals': 7
        },
        {
            'code': 'USDC',
            'issuer': 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN',
            'name': 'USD Coin',
            'org': 'Centre Consortium LLC dba Centre Consortium',
            'domain': 'centre.io',
            'icon': 'bafkreibpzncuhbk5ozhdw7xkcdoyf3xhwhcwcf6sj7axjzimxw6vm6pvyy',
            'decimals': 7
        }
    ]
}

class FetchMockResponse {
    constructor(result, status = 200) {
        this.result = result
        this.status = status
        this.ok = status === 200
    }

    json() {
        return Promise.resolve(this.result)
    }
}

const fetchMock = async function (url) {
    //console.log('Mocking request to ' + url)
    switch (url) {
        case 'https://stellar-asset-lists.github.io/index/':
            return new FetchMockResponse(catalogue)
        case 'list':
            return new FetchMockResponse(list)
        default:
            return new FetchMockResponse(null, 404)
    }
}

let originalFetch

function mockFetch() {
    originalFetch = globalThis.fetch
    globalThis.fetch = fetchMock
}

function restoreFetch() {
    globalThis.fetch = originalFetch
}

function deepClone(value) {
    return JSON.parse(JSON.stringify(value))
}

function replaceIpfsLinks(obj, ipfsGateway = 'https://gateway.ipfs.io/ipfs/') {
    if (!/^https?:/.test(obj.icon)) {
        obj.icon = ipfsGateway + obj.icon
    }
}

const refCatalogue = deepClone(catalogue)
const refList = deepClone(list)
replaceIpfsLinks(refCatalogue[0])
refList.assets.map(a => replaceIpfsLinks(a))

module.exports = {mockFetch, restoreFetch, refCatalogue, refList}