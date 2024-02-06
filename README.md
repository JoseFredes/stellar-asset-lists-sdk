# @stellar-asset-lists/sdk

Thin wrapper library for the Stellar asset list catalogue. The easiest way to start using SAL in your web app. 

## Installation

```shell
npm i @stellar-asset-lists/sdk
```

## Usage

### Fetch available asset lists from the community-managed catalogue

```js
const allLists = await fetchAvailableAssetLists()
/*
[
  {
    "name": "AssetList1",
    "provider": "Stellar community",
    "description": "Assets approved by Stellar community members",
    "url": "https://stellar.community/asset-list",
    "icon": "https://gateway.ipfs.io/ipfs/bafkreibpzncuhbk5ozhdw7xkcdoyf3xhwhcwcf6sj7axjzimxw6vm6pvyy"
  }
]
 */
```

### Fetch and parse specific asset list

```js
const list = await fetchAssetList('https://stellar.community/asset-list')

/*
{
  "name": "Stellar Top 50",
  "provider": "StellarExpert",
  "description": "Assets approved by Stellar community members",
  "version": "1.0",
  "feedback": "https://stellar.community/feedback",
  "assets": [
    {
      "code": "yXLM",
      "issuer": "GARDNV3Q7YGT4AKSDF25LT32YSCCW4EV22Y2TV3I2PU2MMXJTEDL5T55",
      "org": "Ultra Stellar LLC dba Ultra Stellar",
      "domain": "ultrastellar.com",
      "icon": "https://ipfs.io/ipfs/bafkreihntcz2lpaxawmbhwidtuifladkgew6olwuly2dz5pewqillhhpay",
      "decimals": 7
    },
    {
      "code": "USDC",
      "issuer": "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
      "name": "USD Coin",
      "org": "Centre Consortium LLC dba Centre Consortium",
      "domain": "centre.io",
      "icon": "https://ipfs.io/ipfs/bafkreibpzncuhbk5ozhdw7xkcdoyf3xhwhcwcf6sj7axjzimxw6vm6pvyy",
      "decimals": 7
    }
  ]
}
*/
```

### Change resolver parameters

```js
setAssetListResolverOptions({
    catalogueUrl: 'https://stellar-asset-lists.github.io/index/', //replace the URL of the catalogue
    ipfsGatewayUrl: 'https://gateway.ipfs.io/ipfs/' //change default IPFS gateway URL
})
```

## Testing

```shell
npm run test
```