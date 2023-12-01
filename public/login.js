const loginFormHandler = async (event) => {

    event.preventDefault();
  

    const username = document.querySelector('#user_name').value.trim();
    const password = document.querySelector('#pass_word').value.trim();
  
    if (username && password) {

    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('This is an invalid username and password');
    }
    }
};
  
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);