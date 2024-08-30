import Cookies from "js-cookie";


function addOrUpdateUserData(email, profilePictureBlob, lastPhotoModification) {
    const request = indexedDB.open("profile_pictures", 1);

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["users"], "readwrite");
        const objectStore = transaction.objectStore("users");

        const user = {
            email: email,
            profile_picture_blob: profilePictureBlob,
            last_photo_modification: lastPhotoModification
        };

        const request = objectStore.put(user);

        request.onerror = function(event) {
            console.error("Error adding or updating user:", event.target.errorCode);
        };
    };
}

function getUser(email) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("profile_pictures", 1);

        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(["users"], "readonly");
            const objectStore = transaction.objectStore("users");

            const getRequest = objectStore.get(email);

            getRequest.onsuccess = function(event) {
                if (getRequest.result) {
                    resolve(getRequest.result);  // returning result
                } else {
                    resolve(null);  // Returning null, if user not found
                }
            };

            getRequest.onerror = function(event) {
                console.error("Error retrieving user:", event.target.errorCode);
                reject(event.target.errorCode);  // returning error by reject()
            };
        };

        request.onerror = function(event) {
            console.error("Error opening database:", event.target.errorCode);
            reject(event.target.errorCode);  // returning error by reject()
        };
    });
}


async function DownloadProfilePicture(email, supabase){
    const { data, error } = await supabase.from("users").select().eq("user_mail", email);
    if (error) {
        console.error(error);
        return null;
    }

    const last_mod_date = data[0].last_photo_modification;
    const file_name = data[0].profile_picture;

    const request = indexedDB.open("profile_pictures", 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        const objectStore = db.createObjectStore("users", { keyPath: "email" });
        
        objectStore.createIndex("profile_picture_url", "profile_picture_url", { unique: false });
        objectStore.createIndex("last_photo_modification", "last_photo_modification", { unique: false });
    };

    request.onerror = function(event) {
        console.error("Error opening IndexedDB:", event.target.errorCode);
    };

    request.onsuccess = async function(event) {
        const db = event.target.result;
    }

    let date;
    date = new Date();
    

    return getUser(email).then(async storedData =>{
        let profile_picture_url
        if(storedData){
            if(last_mod_date > storedData.last_photo_modification){
                const { data: profile_picture_data, error: error_pp } = await supabase.storage.from('profile_pictures')
                .download(file_name);
                if (error_pp) {
                    console.error("Error downloading profile picture:", error_pp);
                    return null;
                }
    
                const profile_picture_blob = new Blob([profile_picture_data]);
                addOrUpdateUserData(email, profile_picture_blob,last_mod_date);
                profile_picture_url = URL.createObjectURL(profile_picture_blob);
            }else{
                profile_picture_url = URL.createObjectURL(storedData.profile_picture_blob);
            }

        }else{
            
            const { data: profile_picture_data, error: error_pp } = await supabase.storage.from('profile_pictures')
                .download(file_name, );
            if (error_pp) {
                console.error("Error downloading profile picture:", error_pp);
                return null;
            }
    
            const profile_picture_blob = new Blob([profile_picture_data]);

            addOrUpdateUserData(email, profile_picture_blob,last_mod_date);

            profile_picture_url = URL.createObjectURL(profile_picture_blob);
        }
        

        return profile_picture_url
    })
}


export default DownloadProfilePicture;
