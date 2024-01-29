const credentials = {
    firstName: 'Aleksa',
    lastName: 'Sretenovic',
    email: 'aleksa60@gmail.com',
    password: 'Aleksa!'
}


const errorMessagesSignUp = {

    message1: 'User validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required.',
    message2: 'User validation failed: lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required.',
    message3: 'User validation failed: email: Email is invalid, password: Path `password` is required.',
    message4: 'User validation failed: password: Path `password` is required.'
    
    
    }

export { credentials, errorMessagesSignUp }