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
            this.pendingCheck = false;
            this.pendingTimer = null;
        }
        emit() {
            this.onStatus({loading: this.loading, hasMore: this.hasMore,
                loaded: this.loaded, error: this.error, generation: this.generation,
                pendingRetailer: this.pendingCheck});
        }
        cancel() {
            this.generation += 1;
            clearTimeout(this.pendingTimer);
            this.pendingTimer = null;
            this.pendingCheck = false;
            this.abortController?.abort();
            this.loading = false;
            this.hasMore = false;
            this.cursor = null;
            this.error = null;
            this.loaded = false;
            this.emit();
        }
        pause() {
            this.generation += 1;
            clearTimeout(this.pendingTimer);
            this.pendingTimer = null;
            this.abortController?.abort();
            this.abortController = null;
            this.loading = false;
            this.emit();
        }
        resume() {
            if (this.pendingCheck && this.hasMore && !this.loading && !this.error) return this.load(false, true);
            this.emit();
        }
        async search(query) {
            this.cancel();
            this.query = query;
            return this.load(true);
        }
        async more() {
            if (this.loading || this.pendingTimer || !this.hasMore || this.error) return;
            return this.load(false, this.pendingCheck);
        }
        async retry() {
            if (this.loading || !this.query) return;
            this.error = null;
            return this.load(!this.loaded, this.pendingCheck);
        }
        async load(initial, prioritizePending = false) {
            if (this.loading) return;
            const generation = this.generation;
            const controller = new AbortController();
            this.abortController = controller;
            this.loading = true;
            this.error = null;
            this.emit();
            let pendingDelay = 0;
            try {
                const data = await this.fetchPage({query: this.query,
                    cursor: initial ? null : this.cursor, signal: controller.signal, prioritizePending});
                if (generation !== this.generation || controller.signal.aborted) return;
                this.onPage(data, !initial);
                this.cursor = typeof data.next_cursor === "string" ? data.next_cursor : null;
                this.hasMore = Boolean(data.has_more && this.cursor);
                this.loaded = true;
                this.pendingCheck = Boolean(this.hasMore && data.pending_retailers?.length);
                pendingDelay = Math.min(5000, Math.max(50, Number(data.retry_delay_ms) || 50));
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
                    if (this.pendingCheck && !this.error) {
                        this.pendingTimer = setTimeout(() => {
                            this.pendingTimer = null;
                            if (generation === this.generation) this.load(false, true);
                        }, pendingDelay);
                    }
                    this.emit();
                }
            }
        }
    }
    if (typeof module !== "undefined" && module.exports) module.exports = {SearchPager};
    else root.SandhyaPager = SearchPager;
})(globalThis);
