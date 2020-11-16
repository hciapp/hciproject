
function showLoginRegisterForm() {
    var currentFormState = "login";

    var mySweetAlertModal = Swal.fire({

        html: `
        <div class="w-100">
            <div class="form-box">
                <div class="button-box">
                    <div id="btn-selected-indicator"></div>
                    <button type="button" id="login-toggle" class="toggle-btn" >Log in</button>
                    <button type="button" id="register-toggle" class="toggle-btn" onclick="changeFormTo('register')">Register</button>
                </div>
                <div class="form-container">
                    <div id="login-form" class="input-form-wrapper">
                        <h2 class="mb-4">Login</h2>
                        <div class="md-form">
                            <input type="text" id="login-email-input" class="form-control">
                            <label for="login-email-input" >Your Email</label>
                            <span class="error-label"></span>
                        </div>
                        <div class="md-form">
                            <input type="password" id="login-password-input" class="form-control">
                            <label for="login-password-input" >Your Password</label>
                            <span class="error-label"></span>
                        </div>
                        <p class="font-weight-light">
                            Not a member?
                            <a class="register-label text-primary">Register Now</a>
                        </p>
                        <div>
                            <div class="d-inline-block position-relative">
                                <div class="loading-spinner spinner-border text-success" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <button type="button" id="login-btn" class="swal2-confirm swal2-styled" aria-label="" style="background: linear-gradient(0deg, rgba(17,215,0,1) 0%, rgba(52,232,33,1) 100%);display: inline-block;">Sign In</button>
                            </div>
                            <button type="button" class="swal2-cancel swal2-styled login-register-cancel-btn" aria-label="" style="background: #A0A0A0;display: inline-block;">Cancel</button>
                        </div>
                    </div>
                    <div id="register-form" class="input-form-wrapper">
                        <h2 class="mb-4">Create Account</h2>
                        <div class="md-form">
                            <input type="text" id="register-email-input" class="form-control">
                            <label for="register-email-input" >Your Email</label>
                            <span class="error-label"></span>
                        </div>
                        <div class="md-form">
                            <input type="text" id="register-name-input" class="form-control">
                            <label for="register-name-input" >Your Name</label>
                            <span class="error-label"></span>
                        </div>
                        <div class="md-form">
                            <input type="password" id="register-password-input" class="form-control">
                            <label for="register-password-input" >Password</label>
                            <span class="error-label"></span>
                        </div>
                        <div class="md-form">
                            <input type="password" id="register-con-password-input" class="form-control">
                            <label for="register-con-password-input" >Confirm Password</label>
                            <span class="error-label"></span>
                        </div>
                        <div class="md-form">
                            <input type="text" id="register-ic-input" class="form-control">
                            <label for="register-ic-input" >IC number</label>
                            <span class="error-label"></span>
                        </div>
                        <div>
                            <div class="d-inline-block position-relative">
                                <div class="loading-spinner spinner-border text-success" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <button type="button" id="register-btn" class="swal2-confirm swal2-styled" aria-label="" style="background: linear-gradient(0deg, rgba(17,215,0,1) 0%, rgba(52,232,33,1) 100%);display: inline-block;">Register</button>
                            </div>
                            <button type="button" class="swal2-cancel swal2-styled login-register-cancel-btn" aria-label="" style="background: #A0A0A0;display: inline-block;">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `,
        preConfirm: async () => {
            if (!validateForm()) {
                //form contains error
                return false;
            }

            //if the front end validation passes
            //check the form state
            if (currentFormState == "login") {
                var $loginEmailInput = $("#login-email-input");
                var $loginPasswordInput = $("#login-password-input");
                var isSuccess = true;
                //make loading
                $("#login-btn").parent().children(".loading-spinner").css("display", "inline-block")
                $("#login-btn").css("visibility", "hidden")

                await firebase.auth().signInWithEmailAndPassword($loginEmailInput.val(), $loginPasswordInput.val()).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: "The email or password is incorrect!",
                    }).then((result) => {
                        //After login fail model is closed
                        showLoginRegisterForm();
                    })

                    isSuccess = false;
                });

                if (isSuccess) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: "Login Successfully",
                        showConfirmButton: false,
                        timer: 5000
                    })
                    var userRef = db.collection("users").doc(firebase.auth().currentUser.uid);
                    userRef.get().then(function (doc) {
                        var userData = doc.data()
                        
                        if(userData.accType.toLowerCase() == "ngo") {
                            window.location.href = "storage.html"
                        } else if(userData.accType.toLowerCase() == "gov") {
                            window.location.href = "government_dashboard.html"
                        }
                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                    });
                }

                return isSuccess;


            } else {
                //Return register data
                var $registerEmailInput = $("#register-email-input");
                var $registerNameInput = $("#register-name-input");
                var $registerPasswordInput = $("#register-password-input");
                var $registerRePasswordInput = $("#register-con-password-input");

                //make loading
                $("#register-btn").parent().children(".loading-spinner").css("display", "inline-block")
                $("#register-btn").css("visibility", "hidden")

                //TODO: Make api request to register and return the result
                return false;
            }
        },
        confirmButtonText: 'Cool',
        customClass: 'swal-width-fix',
        showConfirmButton: false,
        showCancelButton: false,


    }).then((result) => {
        console.log(result.isConfirm)
        console.log(result)

        //TODO: perform any action after register or login is done

    })

    var $loginForm = $("#login-form");
    var $registerForm = $("#register-form");
    var $loginToggle = $("#login-toggle");
    var $registerToggle = $("#register-toggle");
    var $btnSelectedIndicator = $("#btn-selected-indicator");


    this.validateForm = () => {
        $(".form-container .error-label").text(""); //reset all error
        //Validate form
        if (currentFormState == "register") {
            //validate register 
            var isValid = true;
            var $registerEmailInput = $("#register-email-input");
            var $registerNameInput = $("#register-name-input");
            var $registerPasswordInput = $("#register-password-input");
            var $registerRePasswordInput = $("#register-con-password-input");
            var $registerIcInput = $("#register-ic-input");

            //Email Validate
            if ($registerEmailInput.val().length <= 0) {
                var errorLabel = $registerEmailInput.parent().children(".error-label");

                if (errorLabel.html().length > 0) {
                    errorLabel.html(errorLabel.html() + "<br>")
                }

                errorLabel.html("Email Cannot be empty.");
                isValid = false;
            }

            var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!emailRegex.test($registerEmailInput.val())) {
                var errorLabel = $registerEmailInput.parent().children(".error-label");

                if (errorLabel.html().length > 0) {
                    errorLabel.html(errorLabel.html() + "<br>")
                }

                errorLabel.html(errorLabel.html() + "Please enter a valid email.");

                isValid = false;
            }

            //Name Validate
            if ($registerNameInput.val().length <= 0) {
                var errorLabel = $registerNameInput.parent().children(".error-label");

                if (errorLabel.html().length > 0) {
                    errorLabel.html(errorLabel.html() + "<br>")
                }

                errorLabel.html("Name Cannot be empty.");
                isValid = false;
            }

            //Password Validate
            if ($registerPasswordInput.val().length <= 0) {
                var errorLabel = $registerPasswordInput.parent().children(".error-label");

                if (errorLabel.html().length > 0) {
                    errorLabel.html(errorLabel.html() + "<br>")
                }

                errorLabel.html("Password Cannot be empty.");
                isValid = false;
            }


            var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
            if (!passwordRegex.test($registerPasswordInput.val())) {
                var errorLabel = $registerPasswordInput.parent().children(".error-label");

                if (errorLabel.html().length > 0) {
                    errorLabel.html(errorLabel.html() + "<br>")
                }

                errorLabel.html(errorLabel.html() + "Password length must between 8 to 15 characters and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character");
                isValid = false;
            }

            //Confirm Password Validate
            if ($registerRePasswordInput.val().length <= 0) {
                var errorLabel = $registerRePasswordInput.parent().children(".error-label");

                if (errorLabel.html().length > 0) {
                    errorLabel.html(errorLabel.html() + "<br>")
                }

                errorLabel.html("Confirm Password Cannot be empty.");
                isValid = false;
            }

            if ($registerPasswordInput.val() != $registerRePasswordInput.val()) {
                var errorLabel = $registerRePasswordInput.parent().children(".error-label");

                if (errorLabel.html().length > 0) {
                    errorLabel.html(errorLabel.html() + "<br>")
                }

                errorLabel.html(errorLabel.html() + "Confirm Password must match the password field");
                isValid = false;
            }

            //Ic Validate
            if ($registerIcInput.val().length <= 0) {
                var errorLabel = $registerIcInput.parent().children(".error-label");

                if (errorLabel.html().length > 0) {
                    errorLabel.html(errorLabel.html() + "<br>")
                }

                errorLabel.html("Ic Cannot be empty.");
                isValid = false;
            }

            var icRegex = /^[0-9]{6}\-[0-9]{2}\-[0-9]{4}$/
            if (!icRegex.test($registerIcInput.val())) {
                var errorLabel = $registerIcInput.parent().children(".error-label");

                if (errorLabel.html().length > 0) {
                    errorLabel.html(errorLabel.html() + "<br>")
                }

                errorLabel.html(errorLabel.html() + "Ic number must be in the format xxxxxx-xx-xxxx");
                isValid = false;
            }


            return isValid;


        } else {
            //validate login 

            var isValid = true;

            var $loginEmailInput = $("#login-email-input");
            var $loginPasswordInput = $("#login-password-input");

            //Email Validate
            if ($loginEmailInput.val().length <= 0) {
                var errorLabel = $loginEmailInput.parent().children(".error-label");

                if (errorLabel.html().length > 0) {
                    errorLabel.html(errorLabel.html() + "<br>")
                }

                errorLabel.html("Email Cannot be empty.");
                isValid = false;
            }

            var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!emailRegex.test($loginEmailInput.val())) {
                var errorLabel = $loginEmailInput.parent().children(".error-label");

                if (errorLabel.html().length > 0) {
                    errorLabel.html(errorLabel.html() + "<br>")
                }

                errorLabel.html(errorLabel.html() + "Please enter a valid email.");

                isValid = false;
            }

            //Password Validate
            if ($loginPasswordInput.val().length <= 0) {
                var errorLabel = $loginPasswordInput.parent().children(".error-label");

                if (errorLabel.html().length > 0) {
                    errorLabel.html(errorLabel.html() + "<br>")
                }

                errorLabel.html("Password Cannot be empty.");
                isValid = false;
            }

            return isValid;

        }
    }

    this.changeFormTo = (nxtFormName) => {
        $("#register-btn").parent().children(".loading-spinner").css("display", "none");
        $("#register-btn").css("visibility", "visible");
        $("#login-btn").parent().children(".loading-spinner").css("display", "none");
        $("#login-btn").css("visibility", "visible");
        if (nxtFormName == "register" && currentFormState != "register") {
            $(".form-container .form-control").val(""); //reset all value
            $(".form-container .error-label").text(""); //reset all error
            $loginForm.css("left", "-100%");
            $registerForm.css("left", "0");
            $loginToggle.css("color", "#545454");
            $registerToggle.css("color", "white");
            $btnSelectedIndicator.css("left", "114px")
            currentFormState = "register";
        }

        if (nxtFormName == "login" && currentFormState != "login") {
            $(".form-container .form-control").val(""); //reset all value
            $(".form-container .error-label").text(""); //reset all error
            $loginForm.css("left", "0%");
            $registerForm.css("left", "100%");
            $loginToggle.css("color", "white");
            $registerToggle.css("color", "#545454");
            $btnSelectedIndicator.css("left", "0px")
            currentFormState = "login";
        }
    }

    $("#register-toggle").on("click", () => {
        changeFormTo("register");
    });

    $("#login-toggle").on("click", function () {
        changeFormTo("login");
    });

    $(".register-label").on("click", function () {
        changeFormTo("register");
    })

    $(".login-register-cancel-btn").on("click", function () {
        Swal.clickCancel();
    })

    $(".form-container .form-control").on('input', function () {
        validateForm();
    });

    $("#register-btn").on("click", function () {
        Swal.clickConfirm();
    })

    $("#login-btn").on("click", function () {
        Swal.clickConfirm();
    })

}

