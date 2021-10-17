#!/usr/bin/env python

###############################################################################
# We create a processor class that will be used to process the data.
# The processor class will send the data to the API as necessary, and will
# also continuously check for new data.
###############################################################################

import os
import time
from typing import Dict
from dotenv import load_dotenv
from dotenv import dotenv_values
import requests

load_dotenv()

class Processor:
    env = {}

    def __init__(self):
        self.env = dotenv_values(".env")

    # Send a request to the API
    # url: The URL to send the request to
    # data: The data to send
    # return: Whether or not the request was successful
    def send_request(self, url: str, data: Dict) -> bool:
        # Send a request to the API
        resp = requests.post(
            url,
            json=data,
            headers={
                "Authorization": "Bearer " + self.env.get("ADMIN_TOKEN")
            }
        )
        if resp.status_code == 200:
            data = resp.json()
            if not data['success']:
                print(data['message'])
                print("Error sending data.")
                return False
            else:
                print(data)
                print("Data sent successfully.")
                return True
        else:
            print(resp)
            print("Error sending data.")
            return False

    def process(self, data):
        # Process the data
        # Send the data to the API
        url = self.env.get("REACT_APP_API_URL")
        body = {
            "pitchId": data["_id"],
            "processed": 2,
            "transcription": "Transcription goes here..."
        }
        self.send_request(url + "/api/pitch/process", body)

    def check_for_new_data(self):
        # Check for new data
        # If new data is found, process it        
        url = self.env.get("REACT_APP_API_URL")
        url += "/api/pitch/getUnprocessed"
        
        resp = requests.get(
            url,
            headers={
                "Authorization": "Bearer " + self.env.get("ADMIN_TOKEN")
            }
        )
        if resp.status_code == 200:
            data = resp.json()
            if not data['success']:
                print(data['message'])
                print("Error checking for new data.")
            else:
                for d in data["pitches"]:
                    self.process(d)
                    # Mark the data as processed
        else:
            print(resp)
            print("Error checking for new data.")

def main():
    # Create a processor
    processor = Processor()
    # Continuously check for new data
    while True:
        processor.check_for_new_data()
        # Sleep for a few seconds
        time.sleep(5)

if __name__ == "__main__":
    main()

