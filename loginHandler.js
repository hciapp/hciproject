
function updateLoginStatusInTopNav() {
    var userRef = db.collection("users").doc(firebase.auth().currentUser.uid);
    userRef.get().then(function (doc) {
        var userData = doc.data()
        $(".logged-in-name").text("Hi, " + userData.name);

        $(".not-logged-in-wrapper").css("display", "none");
        $(".logged-in-wrapper").css("display", "flex");
    }).catch(function (error) {
        console.log("Error getting document:", error);

    });



}

function updateLoggeOutStatusInTopNav() {
    $(".not-logged-in-wrapper").css("display", "block");
    $(".logged-in-wrapper").css("display", "none");
}

function loggout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location.href = "index.html"
    }).catch(function (error) {
        // An error happened.
    });
}

function redirectUserWhenNotAuthorized() {
    var userRef = db.collection("users").doc(firebase.auth().currentUser.uid);
    var currentPage = window.location.pathname.split('/').slice(-1)[0];
    const governmentAllowedPage = ['government_dashboard.html', 'help.html'];
    const ngoAllowedPage = ['dist-schedule.html', 'food-log.html', 'mco-check.html', 'storage.html', 'help.html'];
    const applicantAllowedPage = ['applicant_dashboard.html', 'help.html'];

    userRef.get().then(function (doc) {
        var userData = doc.data();
        console.log(userData)
        switch (userData.accType.toLowerCase()) {
            case "gov":
                if (governmentAllowedPage.indexOf(currentPage) == -1) {
                    //if current page is not in governmentAllowedPage
                    //redirect user to default governemnt page
                    window.location.href = "government_dashboard.html"
                }
                break;
            case "ngo":
                if (ngoAllowedPage.indexOf(currentPage) == -1) {
                    //if current page is not in ngoAllowedPage
                    //redirect user to default NGO page
                    window.location.href = "storage.html";
                }
                break;
            case "applicant":
                if (applicantAllowedPage.indexOf(currentPage) == -1) {
                    //if current page is not in applicantAllowedPage
                    //redirect user to default applicant page
                    window.location.href = "applicant_dashboard.html";
                }                
                break;
            default:

        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });





}

function redirectUserWhenNotLogin() {
    var currentPage = window.location.pathname.split('/').slice(-1)[0];
    const guestAllowedPage = ['index.html', 'help.html'];

    if (guestAllowedPage.indexOf(currentPage) == -1) {
        //redirect user to default home page
        window.location.href = "index.html";
    }
}
firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        // User is signed in.
        redirectUserWhenNotAuthorized();
        updateLoginStatusInTopNav();
        // ...
    } else {
        // User is signed out.
        // ...
        redirectUserWhenNotLogin();
        updateLoggeOutStatusInTopNav();
    }
});