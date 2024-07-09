# Impotring libaries
try:
    import os
    from gotrue.errors import AuthError
    from functions import doWeHaveInternet, config, enterMail, enterPassword, User, show_jars, add_new_users, smartInput, sort_members
    from time import sleep
    from datetime import datetime, timezone
    from sys import platform
except:
    print("Error 2137.\nYou dont have required libaries installed\n\nType 'pip install supabase requests' in your terminal")
    exit()

session, list_of_users, attempts = None, [], 0 # Useful vars

# checking platform
command = "cls" if platform == "win32" else "clear"
os.system(command) # <-cleaning terminal

# Checking internet connection
internet = doWeHaveInternet()
if internet == False:
    print("You are offline :(")
    exit()

# Supabase configuration
supabase = config()

# Downloading mails of all users
users = supabase.table("users").select("user_mail").execute()
for user in users.data: list_of_users.append(user["user_mail"])

# Logging in or creating new user
email = enterMail()
while session == None:
    if email in list_of_users: 
        password = enterPassword(one_password=True)

        try: session = supabase.auth.sign_in_with_password({ "email": email, "password": password})
        except AuthError:
            attempts += 1
            print(f"Your password is incorrect, {3-attempts} attempts left")
        else: print("Logged succesfully")
        if attempts >= 3:
            print("Login failed")
            exit()
    else:
        print("You need to create new account\n")
        password = enterPassword()
        nickname = input("Enter your nickname: ")
        if nickname == "": nickname= email
        session = supabase.auth.sign_up(credentials={"email": email, "password": password, "options": {"data": {"nickname": nickname}}})
        print("Succesfully created new account")
        supabase.table("users").insert({"user_mail": email, "user_nickname": nickname, "is_premium" : False}).execute()


user_mail = session.user.email
user = User(supabase.table("users").select("*").eq("user_mail",session.user.email).execute().data[0])

while session:
    user.jars = []
    jar_ids = []
    os.system(command)

    """    supabase.table("logins").update("last activity", datetime.now(timezone.utc).isoformat()).eq({"user": user_mail}).excute()"""

    print(f"Hello, {user.nickname.capitalize()}!\nYou were reported {user.was_reported} times and you reported somebody {user.reported_someone} times!")
    print(f"You put into jars ${user.account_balance}.\n")


    for jar in  supabase.table("jars").select("*").order("id", desc=False).execute().data:
        for jar_user in jar["members"]:
            if user.mail == jar_user[0] : 
                user.jars.append(jar)

    if user.jars == []: 
        print("\nYou don't have any opened swear jars yet/n")
    else: # printing swear jars
        jar_ids = show_jars(user.jars, jar_ids)
        
           
    print("\n\n1 - create new swear jar")
    if user.jars != []:
        print("2 - open jar")
    print('0 - log out')

    choice = smartInput(0, 2)

    if choice == 1: # creating new swear jar
        jar_name = input("Enter jar name: ")
        jar_members = []

        jar_members.append([user.mail, 0])
        jar_members = add_new_users(jar_members, users)
        supabase.table("jars").insert({"name": jar_name, "members": jar_members}).execute()

    if choice == 2:
        print(f"\nAvalaible ids: {jar_ids}")
        
        chosen_id = smartInput(additional=jar_ids, prompt= "Enter id of jar you want to open: ")

        os.system(command)
        chosen_jar = supabase.table("jars").select("*").eq("id", chosen_id).execute().data[0]
        wage = chosen_jar["price_per_word"]
        print(f"You opened {chosen_jar['name']}. 1 swear = ${wage}, bilance: {chosen_jar['total_money']}\n")

        if chosen_jar["is_closed"] == False:
            print("Who said naughty word?\n")
            i, admin_rights = 0, []
            for member in chosen_jar["members"]:
                member_details = supabase.table("users").select("*").eq("user_mail", member[0]).execute().data[0]
                print(f"{i} - {member_details['user_nickname']}", end="")
                if chosen_jar["is_anon"]: print()
                else: print(f", who payed {member[1]}$ into jar")
                i+= 1

            if chosen_jar["members"][0][0] == user.mail: # chceck if admin
                print('\nIf you dont want to report, here is your admin console: ')
                print("101 - add new member to your jar")
                print("102 - close jar (pernament)")
                admin_rights = [101, 102]
                if user.is_premium == True:
                    print("103 - rename jar")
                    admin_rights.append(103)
                    if chosen_id["is_anon"] == False:
                        print("104 - make your jar annonymous (permameent)")
                        admin_rights.append(104)
                else: print("More featuers are avalable for premium users")

            report_choice = smartInput(min=0, max=i-1, prompt="Your choice: ", additional=admin_rights)

            if report_choice > 100 and chosen_jar["members"][0][0] == user.mail:
                if report_choice == 101: chosen_jar["members"] = add_new_users(chosen_jar["members"], users)
                elif report_choice == 102: 
                    chosen_jar["is_closed"] = True
                    print("Jar is closed")
                elif report_choice == 103 and user.is_premium == True: chosen_jar["name"] = input("Enter new name")
                elif report_choice == 104 and user.is_premium == True: chosen_jar["is_anon"] = True

            elif report_choice <= i:       
                chosen_jar["members"][report_choice][1] += wage
                    
                reported_member_report_count = supabase.table("users").select("was_reported").eq("user_mail", chosen_jar["members"][report_choice][0]).execute().data[0]
                supabase.table("users").update({"was_reported": reported_member_report_count["was_reported"] + 1, "total_money" : reported_member_report_count["was_reported"] + wage}).eq("user_mail", chosen_jar["members"][report_choice][0]).execute()
                    
                supabase.table("users").update({"reported_someone": user.reported_someone + 1}).eq("user_mail", user.mail).execute()

                print(f'{chosen_jar["members"][report_choice][0]} added {wage}$ to swear jar')
            else: print("error")  

            sleep(1.5)
            supabase.table("jars").update({"name": chosen_jar["name"], "members": chosen_jar["members"], "total_money": chosen_jar["total_money"] + wage, "is_closed": chosen_jar["is_closed"], "is_anon": chosen_jar["is_anon"]}).eq("id", chosen_id).execute()
                
        else: 
            print("Jar is closed, here is your summary")
            if chosen_jar["is_anon"]: print(f"")
            else:
                chosen_jar["members"] = sort_members(chosen_jar["members"])
                i = 0
                for member in chosen_jar["members"]:
                    member_details = supabase.table("users").select("*").eq("user_mail", member[0]).execute().data[0]
                    print(f"{i}. - {member_details['user_nickname']}, who payed {member[1]}$ into jar ({int((member[1] / chosen_jar['total_money']) * 100)})%")
                    i+= 1


            sleep(100)

    if choice == 0: break

session = supabase.auth.sign_out()