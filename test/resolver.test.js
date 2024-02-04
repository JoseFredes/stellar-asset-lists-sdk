const {fetchAvailableAssetLists, fetchAssetList} = require('../lib/stellarAssetListsSdk')
const {mockFetch, restoreFetch, refCatalogue, refList} = require('./fetch-mock')

describe('sdk', () => {
    beforeAll(mockFetch)

    test('fetchAvailableAssetLists()', async () => {
        const catalogue = await fetchAvailableAssetLists()
        expect(catalogue).toEqual(refCatalogue)
    })
    test('fetchAssetList()', async () => {
        const list = await fetchAssetList('list')
        expect(list).toEqual(refList)
    })
    test('fetchAssetList() - unreachable', async () => {
        try {
            await fetchAssetList('unknown')
        } catch (e) {
            expect(e.message).toContain('404')
        }
    })

    afterAll(restoreFetch)
})