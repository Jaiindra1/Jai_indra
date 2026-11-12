"""Optional live smoke check: search one retailer, then revisit one result.

Print field coverage and retrieval status, without saving retailer HTML. This
Retailer access restrictions are reported explicitly.
"""
import argparse
import json
from pathlib import Path
import sys
from time import monotonic

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from services.search_pagination import search_page
from retailers.products import get_product_details


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--retailer', choices=['Amazon', 'Flipkart'], required=True)
    parser.add_argument('--query', default='wireless mouse')
    args = parser.parse_args()
    try:
        results = search_page(query=args.query, first_retailer=args.retailer)
        selected = next((item for item in results.get('items', []) if item['retailer'] == args.retailer), None)
        if selected is None:
            print(json.dumps({'retailer': args.retailer, 'status': 'no_search_listing',
                              'warnings': results.get('warnings', [])}))
            return 2
        product = get_product_details(selected['url'], args.retailer,
                                      deadline=monotonic() + 25, force_refresh=True)
        fields = ('name', 'price', 'original_price', 'images', 'rating', 'rating_count', 'review_count',
                  'highlights', 'description', 'specifications', 'offers', 'seller', 'delivery', 'warranty', 'variants')
        print(json.dumps({'retailer': args.retailer, 'status': product['detail_status'],
                          'url': selected['url'], 'field_coverage': {key: bool(product.get(key)) for key in fields},
                          'specification_count': len(product['specifications'])}))
        return 0
    except Exception as error:
        print(json.dumps({'retailer': args.retailer, 'status': 'unavailable',
                          'reason': getattr(error, 'reason', getattr(error, 'stage', type(error).__name__))}))
        return 2


if __name__ == '__main__':
    raise SystemExit(main())
