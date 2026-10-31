const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../retailers/navigation.py'), 'utf8');
const script = source.match(/DOCUMENT_PROBE = r"""([\s\S]*?)"""/)[1];
function probe(body, status, cards = 0, ready = 'complete') {
    return vm.runInNewContext(`(function(){${script}})('product-card')`, {
        document: {body:{innerText:body},readyState:ready,querySelectorAll:()=>Array(cards)},
        performance: {getEntriesByType:()=>[{responseStatus:status,redirectCount:0}]},
        location: {hostname:'www.amazon.in',pathname:'/s'}
    });
}
test('503 automated-access notice is identified without returning its text', () => {
    const result = probe('To discuss automated access contact api-services-support@amazon.com private-query', 503);
    assert.equal(result.kind, 'upstream_http_503');
    assert.equal(result.page_kind, 'automated_access');
    assert.equal(result.host, 'amazon.in');
    assert.equal(JSON.stringify(result).includes('private-query'), false);
});
test('a generic 503 does not imply an access restriction', () => {
    const result = probe('Service unavailable', 503);
    assert.equal(result.kind, 'upstream_http_503');
    assert.equal(result.page_kind, 'upstream_error');
});
test('captcha is a failure even if the error page has HTTP 200', () => {
    const result = probe('Robot Check: enter the characters you see', 200);
    assert.equal(result.kind, 'blocked_page');
    assert.equal(result.page_kind, 'captcha');
});
test('access denied is distinguished from confirmed no results', () => {
    assert.equal(probe('Access denied',200).kind,'blocked_page');
    assert.equal(probe('No results for this product',200).kind,'empty');
});
test('real cards take precedence over a no-results footer fragment', () => {
    const result = probe('Phone listings. No results for related advertisements.',200,16,'interactive');
    assert.equal(result.kind,'cards');
    assert.equal(result.page_kind,'product_results');
});
test('incomplete unknown documents keep waiting rather than becoming empty', () => {
    assert.equal(probe('',200,0,'interactive').kind,null);
});
test('small completed result pages remain valid', () => {
    assert.equal(probe('One product',200,1).kind,'cards');
});
test('HTTP failures take precedence over stray product-like markup', () => {
    assert.equal(probe('Service unavailable',503,16).kind,'upstream_http_503');
});
