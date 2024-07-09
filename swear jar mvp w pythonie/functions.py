# Impotring libaries

try:
    import getpass
    from datetime import datetime, timezone, timedelta
    from supabase import create_client
    import requests
except: 
    print("Error 2137.\nYou dont have required libaries installed\n\nType 'pip install supabase requests' in your terminal")
    exit()


tooObviousPasswords = ["12345678", "qwerty", "abcdefgh", "password", "haslo123", ]
user_timezone = datetime.now(timezone.utc).astimezone().tzinfo # Download local timezone


class User():
    def __init__(self, user_in_table):
        # User data
        self.id = user_in_table["id"]
        self.mail = user_in_table["user_mail"]
        self.nickname = user_in_table["user_nickname"]
        self.is_premium = user_in_table["is_premium"]
        self.reported_someone = user_in_table["reported_someone"]
        self.was_reported = user_in_table["was_reported"]
        self.account_balance = user_in_table["total_money"]

        # IP related data
        ip = getIP()
        self.IP = ip
        """ip_data = getDataByIP(ip)

        self.location = f'{ip_data["city"]}, {ip_data["region_code"],  {ip_data["country_name"]}}'         
        self.currency = ip_data["currency"]"""

        self.jars = []


        

def doWeHaveInternet(): # Checking if user has internet connection
    try:
        requests.get("https://google.com", timeout=5)
    except: return False
    else: return True


def getIP(): return requests.get("https://api64.ipify.org?format=json").json()

"""def getDataByIP(ip): return requests.get(f'https://ipapi.co/{ip}/json/').json()"""

def config(): # Supabase configuration
    url = "https://jqezcndfrezsuvtazfcw.supabase.co"
    key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZXpjbmRmcmV6c3V2dGF6ZmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5Mjg2MTUsImV4cCI6MjAzNTUwNDYxNX0.BYgdHBm_78h4ABEXacxvZzV7_Pdp-xdn3Fz_XDc5DTM"
    return create_client(url, key)


def enterMail(input_text="Enter your email: "): # checking if provided "mail" is mail
    while True:
        mail = input(input_text).lower().strip()
        at = 0
        dot = 0
        for char in mail[3:]:
            if char == "@": at +=1
        for char in mail[-4:]:
            if char == ".": dot +=1
        if at == 1 and dot ==1: return mail
        else: print(f"Your mail is  incorrect!")

# checking if created password is long enough and checking if passwords provided are the same
def enterPassword(input_text="Please enter your password: " ,min_len=8, one_password=False):
    if one_password==False:
        print(f"To increase Your safety, password is hidden. Password must be at least {min_len} chars long")
    while True:
        print(input_text, end="")
        password = getpass.getpass("")
        print("*" * len(password))

        if password.lower() in tooObviousPasswords:
            print("Your password is too obvious to guess, be more creative :-)")
            continue
        if len(password) < min_len and one_password == True: 
            print("Your password is too short")
            continue
        elif one_password == False:
            password2 = getpass.getpass("Enter your password again: ")
            print("*" * len(password),)
        
            if password != password2: print("Passwords aren't the same")
            else:
                print("Done")
                return password
            
        else: return password

def smartInput(min=0, max=0, additional = [], prompt="Enter number: "):
    av_choice = []
    if max >0: 
        for i in range(min, max+1): av_choice.append(i)
    for i in range(len(additional)): av_choice.append(additional[i])

    while True:
        try:
            x = int(input(prompt))
        except ValueError: print("That's not a intiger number")
        else: 
            if x in av_choice: return x
            else: print(f"{x} not avalaible. Choose diffrent number. {av_choice}")




"""def formatDate(date): # Formating date from iso to  DD:MM @ HH:MM in local timezone
    utc_date = datetime.fromisoformat(date).replace(tzinfo=pytz.utc) 
    return utc_date.astimezone(user_timezone).strftime("%d.%m @ %H:%M")"""

def show_jars(jars, ids):
    print("Your swear jars")
    print("ID\tName\t\tMoney\tMembers")
    for jar in jars:
        ids.append(jar["id"])    
        print(jar["id"], end="\t")

        print(jar["name"], end="\t")
        if len(jar["name"]) < 8: print(end="\t")
        print(jar["total_money"], end="\t")
        for member in jar["members"]:
            print(member[0], end=",")
        print()
    return ids
    
def add_new_users(members, users):
    for i in range(int(input("how many additonal users do you want to add? (0-9)"))):
        new_user = input("Enter mail of this user: ")
        if [new_user, 0] not in members and new_user in users:
            members.append([new_user, 0])
        elif[new_user, 0] in members : print("This person is already member of this jar")
        else: print(f"Sorry, but {new_user} doesn't have swear jar account")
    return members

def sort_members(list):
    i= 0
    while i  < len(list):
        j = 0
        while j  < len(list)- i-1:
            if list[j][1] <=  list[j+1][1]:
                list[j], list[j+1] = list[j+1], list[j]
            j+=1
        i += 1
    return list