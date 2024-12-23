from seleniumwire import webdriver
from seleniumwire.utils import decode
import requests
import re

def create_driver():
    # Create a new instance of the Chrome driver
    # Set Chrome options
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36")
    driver = webdriver.Chrome(options=chrome_options)
    return driver

driver = create_driver()
driver.get('https://www.espn.com/')
# Parse network traffic to extract access token and product url
for request in driver.requests:
    if request.response:
        if request.url.startswith(('https://fcast.espncdn.com/FastcastService/pubsub/profiles/')):
            ref = request.url