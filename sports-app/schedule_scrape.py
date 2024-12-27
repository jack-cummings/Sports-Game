import requests
import json
import random
import csv
from datetime import datetime, timedelta

# NHL
def get_nhl():
    current_date = datetime.utcnow().strftime('%Y-%m-%d')
    response = requests.get(f"https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard")
    if response.status_code != 200:
        return None
    try:
        parsed_content = json.loads(response.content.decode("utf-8"))
    except json.JSONDecodeError:
        return None
    games = parsed_content.get('events', [])
    matching_games = [
        game['name']
        for game in games
        if game.get('date') and 
        (datetime.strptime(game['date'], "%Y-%m-%dT%H:%MZ") - timedelta(hours=5)).strftime("%Y-%m-%d") == current_date]
    if matching_games:
        return random.choice(matching_games)
    else:
        return None

# NBA
def get_nba():
    current_date = datetime.utcnow().strftime('%Y-%m-%d')
    response = requests.get(f"https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard")
    if response.status_code != 200:
        return None
    try:
        parsed_content = json.loads(response.content.decode("utf-8"))
    except json.JSONDecodeError:
        return None
    games = parsed_content.get('events', [])
    matching_games = [
        game['name']
        for game in games
        if game.get('date') and 
        (datetime.strptime(game['date'], "%Y-%m-%dT%H:%MZ") - timedelta(hours=5)).strftime("%Y-%m-%d") == current_date]
    if matching_games:
        return random.choice(matching_games)
    else:
        return None

# NFL
def get_nfl():
    current_date = datetime.utcnow().strftime('%Y-%m-%d')
    response = requests.get("https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard")
    if response.status_code != 200:
        return None
    try:
        parsed_content = json.loads(response.content.decode("utf-8"))
    except json.JSONDecodeError:
        return None
    games = parsed_content.get('events', [])
    matching_games = [
        game['name']
        for game in games
        if game.get('date') and 
        (datetime.strptime(game['date'], "%Y-%m-%dT%H:%MZ") - timedelta(hours=5)).strftime("%Y-%m-%d") == current_date]
    if matching_games:
        return random.choice(matching_games)
    else:
        return None


# MLB
def get_mlb():
    current_date = datetime.utcnow().strftime('%Y-%m-%d')
    print(current_date)
    response = requests.get(f"https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard")
    if response.status_code != 200:
        return None
    try:
        parsed_content = json.loads(response.content.decode("utf-8"))
    except json.JSONDecodeError:
        return None
    games = parsed_content.get('events', [])
    matching_games = [
        game['name']
        for game in games
        if game.get('date') and 
        (datetime.strptime(game['date'], "%Y-%m-%dT%H:%MZ") - timedelta(hours=5)).strftime("%Y-%m-%d") == current_date]
    if matching_games:
        return random.choice(matching_games)
    else:
        return None
    
def update_list(game_final):
    file_path = "sports-app/src/game_list.js"
    date = datetime.utcnow().strftime('%m/%d/%Y')
    t1 = game_final.split(' at ')[0]
    t2 = game_final.split(' at ')[1]
    new_row = f'    ["{date}", "{t1}", "{t2}", ""],\n'

    # Read and update the file content
    with open(file_path, "r") as file:
        lines = file.readlines()

    # Insert the new row before the closing bracket of the array
    closing_index = next(i for i, line in enumerate(lines) if "]" in line and "export" not in line)
    lines.insert(closing_index, new_row)

    # Write the updated content back to the file
    with open(file_path, "w") as file:
        file.writelines(lines)

    print(f"Row added to {file_path} successfully.")


leagues = [get_nfl, get_nba, get_nhl, get_mlb]
game_final = None

while not game_final:
    try:
        league = random.choice(leagues) 
        game_final = league()          
    except Exception as e:
        continue
update_list(game_final)
print(game_final)
print('done')

# current_date = datetime.utcnow().strftime('%Y-%m-%d')
# response = requests.get(f"https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard")
# if response.status_code != 200:
#     print('n')
# try:
#     parsed_content = json.loads(response.content.decode("utf-8"))
# except json.JSONDecodeError:
#     print('n')
# games = parsed_content.get('events', [])
# matching_games = [
#     game['name']
#     for game in games
#     if game.get('date') and 
#     (datetime.strptime(game['date'], "%Y-%m-%dT%H:%MZ") - timedelta(hours=5)).strftime("%Y-%m-%d") == current_date
# ]
# if matching_games:
#     print(random.choice(matching_games))
# else:
#     print('n')