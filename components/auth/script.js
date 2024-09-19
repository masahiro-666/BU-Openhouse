const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');
const toSignInForm=document.getElementById('toSignIn');
const toSignUpForm=document.getElementById('toSignUp');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";

    toSignInForm.style.display="block";
    toSignUpForm.style.display="none";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";

    
    toSignInForm.style.display="none";
    toSignUpForm.style.display="block";
})