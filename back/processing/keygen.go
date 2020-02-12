package processing

import (
	"github.com/LuckySevens777/Calendar-App/back/model"
	"errors"
)

//Validates inputs and create new user.  Returns a unique user id key to use for future requests
func Signup(username string, pass string) (uint, error) {
	//just going to assume pass is ok
	
	//Check that the username doesn't contain any unallowed characters:
	if !validUsername(username) {
		return 0, errors.New("Username contains invalid characters!")
	}

	//check db for usernames that already exist:
	if usr,err := model.GetUser(username); err != nil || usr == nil {
		return 0, errors.New("Username already exists!?: " + err.Error())
	}
	
	//create the user:
	_, err := model.CreateUser(username)
	if err != nil {
		return 0, errors.New("There was a problem creating the user: " + err.Error())
	}
	
	key := generateKey()
	//associate key with user:


	//give API the id key:
	return key, nil
}

//Validates inputs and logs in user.  Returns a unique user id key to use for future requests
func Login(username string, Password string) (uint, error) {
	//assume pass is ok

	//check that ussername is a valid one:

	//check that username is in db:
	
	//give API the id key
	return 0, nil
}

//dissassociate key with the user it is currently associated with
func Logout(key uint) error {
	return nil
}

//generates unique key
func generateKey() uint {
	
	return 4;
}

