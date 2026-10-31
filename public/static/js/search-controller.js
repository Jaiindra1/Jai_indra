/* Request state is independent of the DOM so race conditions can be tested. */
(function (root) {
    class SearchPager {
        constructor({fetchPage, onPage, onStatus}) {
            this.fetchPage = fetchPage;
            this.onPage = onPage;
            this.onStatus = onStatus;
            this.generation = 0;
            this.loading = false;
            this.hasMore = false;
            this.loaded = false;
            this.error = null;
            this.cursor = null;
            this.query = "";
            this.abortController = null;
        }
        emit() {
            this.onStatus({loading: this.loading, hasMore: this.hasMore,
                loaded: this.loaded, error: this.error, generation: this.generation});
        }
        cancel() {
            this.generation += 1;
            this.abortController?.abort();
            this.loading = false;
            this.hasMore = false;
            this.cursor = null;
            this.error = null;
            this.loaded = false;
            this.emit();
        }
        async search(query) {
            this.cancel();
            this.query = query;
            return this.load(true);
        }
        async more() {
            if (this.loading || !this.hasMore || this.error) return;
            return this.load(false);
        }
        async retry() {
            if (this.loading || !this.query) return;
            this.error = null;
            return this.load(!this.loaded);
        }
        async load(initial) {
            if (this.loading) return;
            const generation = this.generation;
            const controller = new AbortController();
            this.abortController = controller;
            this.loading = true;
            this.error = null;
            this.emit();
            try {
                const data = await this.fetchPage({query: this.query,
                    cursor: initial ? null : this.cursor, signal: controller.signal});
                if (generation !== this.generation || controller.signal.aborted) return;
                this.onPage(data, !initial);
                this.cursor = typeof data.next_cursor === "string" ? data.next_cursor : null;
                this.hasMore = Boolean(data.has_more && this.cursor);
                this.loaded = true;
            } catch (error) {
                if (generation !== this.generation || controller.signal.aborted) return;
                this.error = error.message || "Unable to load products. Please retry.";
                if (error.restart) {
                    this.loaded = false;
                    this.hasMore = false;
                    this.cursor = null;
                }
            } finally {
                if (generation === this.generation) {
                    this.loading = false;
                    this.abortController = null;
                    this.emit();
                }
            }
        }
    }
    if (typeof module !== "undefined" && module.exports) module.exports = {SearchPager};
    else root.SandhyaPager = SearchPager;
})(globalThis);
