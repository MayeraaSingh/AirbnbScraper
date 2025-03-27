# Scrapy settings for airbnb_scraper project

BOT_NAME = "airbnb_scraper"

SPIDER_MODULES = ["airbnb_scraper.spiders"]
NEWSPIDER_MODULE = "airbnb_scraper.spiders"

# Obey robots.txt rules
ROBOTSTXT_OBEY = True

# Set settings whose default value is deprecated to a future-proof value
TWISTED_REACTOR = "twisted.internet.asyncioreactor.AsyncioSelectorReactor"
FEED_EXPORT_ENCODING = "utf-8"
