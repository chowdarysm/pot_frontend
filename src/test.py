import requests
import json
from datetime import datetime

# --- CONFIGURATION ---
# This must be the base URL of your running Hugging Face Space
API_BASE_URL = "https://parthivm1-pothole-backend.hf.space"
# --- END CONFIGURATION ---

def test_latest_reports():
    """
    Tests the /latest_reports endpoint to see what data the backend is returning.
    """
    endpoint_url = f"{API_BASE_URL}/latest_reports"
    
    print("--- Testing Latest Reports API ---")
    print(f"Requesting URL: {endpoint_url}\n")

    try:
        # Make the GET request to the API
        response = requests.get(endpoint_url)
        
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            print(" SUCCESS: API returned a successful response (Code 200).")
            
            try:
                reports = response.json()
                
                if isinstance(reports, list) and reports:
                    print(f"\n--- Found {len(reports)} Reports ---")
                    # Display the name and creation date of each report
                    for i, report in enumerate(reports):
                        report_type = report.get('type', 'Unknown')
                        name = report.get('video_name') or report.get('image_name', 'No Name')
                        date_str = report.get('created_at', 'No Date')
                        print(f"{i+1:02d}. Type: {report_type.capitalize():<7} | Name: {name:<30} | Created: {date_str}")
                else:
                    print("\n The API returned a success code, but there are no reports in the list.")

            except json.JSONDecodeError:
                print("\n ERROR: The API response was successful, but it was not valid JSON.")
                print("--- Raw Response Text ---")
                print(response.text)

        else:
            # If the API returns an error (like 500)
            print(f"\n FAILURE: API returned an error status code: {response.status_code}")
            print("--- Error Response From Server ---")
            print(response.text)
            print("\nThis indicates the error is on the backend (app.py).")

    except requests.exceptions.RequestException as e:
        # If the script can't connect to the server at all
        print(f"\n❌ CRITICAL ERROR: Could not connect to the API at {API_BASE_URL}.")
        print(f"   Error details: {e}")
        print("\n   Please check:")
        print("   1. Is the API_BASE_URL correct?")
        print("   2. Is your Hugging Face Space running and not asleep?")

# --- Run the test ---
if __name__ == "__main__":
    test_latest_reports()
