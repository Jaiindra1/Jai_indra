const {test} = require('node:test');
const assert = require('node:assert/strict');
const {SearchPager} = require('../public/static/js/search-controller.js');
function deferred() {
    let resolve, reject;
    const promise = new Promise((yes, no) => {resolve = yes; reject = no;});
    return {promise, resolve, reject};
}
const page = (cursor = 'next', items = [{id: 'one'}]) => ({items, next_cursor: cursor, has_more: !!cursor});
const pager = fetchPage => new SearchPager({fetchPage, onPage() {}, onStatus() {}});

test('concurrent observer notifications issue exactly one next-page request', async () => {
    const pending = deferred(); let calls = 0;
    const p = pager(() => ++calls === 1 ? Promise.resolve(page()) : pending.promise);
    await p.search('phone');
    const more = p.more();
    await p.more(); await p.more();
    assert.equal(calls, 2);
    pending.resolve(page(null)); await more;
});
test('a changed query aborts pagination and ignores a late obsolete response', async () => {
    const pending = deferred(); let requests = [], rendered = [];
    const p = new SearchPager({fetchPage: args => {
        requests.push(args);
        return requests.length === 2 ? pending.promise : Promise.resolve(page('next', [{id: args.query}]));
    }, onPage: data => rendered.push(data.items[0].id), onStatus() {}});
    await p.search('old'); const more = p.more();
    await p.search('new');
    assert.equal(requests[1].signal.aborted, true);
    pending.resolve(page(null, [{id: 'obsolete'}])); await more;
    assert.deepEqual(rendered, ['old', 'new']);
    assert.equal(p.query, 'new'); assert.equal(p.hasMore, true);
});
test('an obsolete finally block cannot clear the new query loading flag', async () => {
    const old = deferred(), current = deferred(); let count = 0;
    const p = pager(() => ++count === 1 ? old.promise : current.promise);
    const a = p.search('old'); const b = p.search('new');
    old.resolve(page()); await a; assert.equal(p.loading, true);
    current.resolve(page()); await b; assert.equal(p.loading, false);
});
test('next-page failure preserves cursor and retry appends to existing items', async () => {
    let count = 0, requests = [], appended = [];
    const p = new SearchPager({fetchPage: args => {
        requests.push(args.cursor); count++;
        return count === 2 ? Promise.reject(new Error('offline')) : Promise.resolve(page(count === 1 ? 'cursor-1' : null));
    }, onPage: (data, append) => appended.push(append), onStatus() {}});
    await p.search('phone'); await p.more();
    assert.equal(p.cursor, 'cursor-1'); assert.equal(p.error, 'offline');
    await p.more(); assert.equal(count, 2);
    await p.retry();
    assert.deepEqual(requests, [null, 'cursor-1', 'cursor-1']);
    assert.deepEqual(appended, [false, true]);
});
test('end of results stops automatic requests', async () => {
    let calls = 0; const p = pager(() => {calls++; return Promise.resolve(page(null));});
    await p.search('phone'); await p.more(); await p.more(); assert.equal(calls, 1);
});
test('input cancellation prevents any more requests until submission', async () => {
    let calls = 0; const p = pager(() => {calls++; return Promise.resolve(page());});
    await p.search('phone'); p.cancel(); await p.more(); assert.equal(calls, 1);
});
test('expired continuation retries as a fresh search instead of reusing an invalid cursor', async () => {
    let count = 0, cursors = [];
    const p = pager(args => {
        cursors.push(args.cursor);
        if (++count === 2) { const error = new Error('expired'); error.restart = true; return Promise.reject(error); }
        return Promise.resolve(page());
    });
    await p.search('phone'); await p.more(); await p.retry();
    assert.deepEqual(cursors, [null, 'next', null]);
});
test('leaving for a product pauses pending work and preserves pagination for Back', async () => {
    const pending = deferred(); let calls = 0, cursors = [], rendered = [];
    const p = new SearchPager({fetchPage: args => {
        cursors.push(args.cursor);
        return ++calls === 2 ? pending.promise : Promise.resolve(page(calls === 1 ? 'saved-cursor' : null));
    }, onPage: (data, append) => rendered.push(append), onStatus() {}});
    await p.search('phone'); const old = p.more(); p.pause();
    pending.resolve(page('obsolete-cursor')); await old;
    assert.equal(p.cursor, 'saved-cursor'); assert.equal(p.hasMore, true);
    await p.more();
    assert.deepEqual(cursors, [null, 'saved-cursor', 'saved-cursor']);
    assert.deepEqual(rendered, [false, true]);
});
