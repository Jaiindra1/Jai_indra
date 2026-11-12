import unittest
from bs4 import BeautifulSoup
from retailers.products.amazon.media import extract_media as amazon_media
from retailers.products.flipkart.media import extract_media as flipkart_media


class MediaTests(unittest.TestCase):
    def test_amazon_uses_high_resolution_image_and_video(self):
        soup = BeautifulSoup('''<img id="landingImage" data-old-hires="https://m.media-amazon.com/images/I/test._SL1500_.jpg">
            <video src="https://m.media-amazon.com/video/test.mp4"></video>''', 'html.parser')
        result = amazon_media(soup, {})
        self.assertEqual(result['image_url'], 'https://m.media-amazon.com/images/I/test.jpg')
        self.assertEqual(result['videos'], ['https://m.media-amazon.com/video/test.mp4'])

    def test_flipkart_upgrades_preview_and_keeps_video(self):
        soup = BeautifulSoup('''<div class="_3kidJX"><img src="https://rukminim2.flixcart.com/image/480/640/xif0q/item.jpeg"></div>
            <video src="https://rukminim2.flixcart.com/video/item.mp4"></video>''', 'html.parser')
        result = flipkart_media(soup, {})
        self.assertIn('/image/1500/1500/', result['image_url'])
        self.assertEqual(result['videos'], ['https://rukminim2.flixcart.com/video/item.mp4'])


if __name__ == '__main__': unittest.main()
