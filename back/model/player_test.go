package model

import (
	"testing"

	"github.com/stretchr/testify/suite"
)

var (
	testTimeslots []Timeslot
	testUsers     []User
)

type CalendarModelTestSuite struct {
	suite.Suite
}

// Initialize the DB connection
func (suite *CalendarModelTestSuite) SetupSuite() {
	suite.Assert().Nil(Init())
}

// TestATimeslots tests basic timeslots creation
func (suite *CalendarModelTestSuite) TestATimeslots() {
	time1, err := CreateTimeslot("00:00")
	suite.Assert().Nil(err)
	suite.Assert().Equal("00:00", time1.Name)
	suite.Assert().Equal(1, int(time1.ID))
	time2, err := CreateTimeslot("00:20")
	suite.Assert().Nil(err)
	suite.Assert().Equal("00:20", time2.Name)
	suite.Assert().Equal(2, int(time2.ID))
	time3, err := CreateTimeslot("00:40")
	suite.Assert().Nil(err)
	suite.Assert().Equal("00:40", time3.Name)
	suite.Assert().Equal(3, int(time3.ID))
	time4, err := CreateTimeslot("01:00")
	suite.Assert().Nil(err)
	suite.Assert().Equal("01:00", time4.Name)
	suite.Assert().Equal(4, int(time4.ID))
	time5, err := CreateTimeslot("01:20")
	suite.Assert().Nil(err)
	suite.Assert().Equal("01:20", time5.Name)
	suite.Assert().Equal(5, int(time5.ID))
	time6, err := CreateTimeslot("01:40")
	suite.Assert().Nil(err)
	suite.Assert().Equal("01:40", time6.Name)
	suite.Assert().Equal(6, int(time6.ID))
	time7, err := CreateTimeslot("02:00")
	suite.Assert().Nil(err)
	suite.Assert().Equal("02:00", time7.Name)
	suite.Assert().Equal(7, int(time7.ID))

	// Check that we get what we want
	times, err := GetAllTimeslots()
	suite.Assert().Nil(err)
	suite.Assert().Equal(7, len(times))

	testTimeslots = times
}

// TestBUsers tests basic user creation
func (suite *CalendarModelTestSuite) TestBUsers() {
	user1, err := CreateUser("Sandy")
	suite.Assert().Nil(err)
	suite.Assert().Equal("Sandy", user1.Name)
	suite.Assert().Equal(1, int(user1.ID))
	user2, err := CreateUser("Drake")
	suite.Assert().Nil(err)
	suite.Assert().Equal("Drake", user2.Name)
	suite.Assert().Equal(2, int(user2.ID))
	user3, err := CreateUser("Jonathan")
	suite.Assert().Nil(err)
	suite.Assert().Equal("Jonathan", user3.Name)
	suite.Assert().Equal(3, int(user3.ID))
	user4, err := CreateUser("Ross")
	suite.Assert().Nil(err)
	suite.Assert().Equal("Ross", user4.Name)
	suite.Assert().Equal(4, int(user4.ID))
	user5, err := CreateUser("Dylan")
	suite.Assert().Nil(err)
	suite.Assert().Equal("Dylan", user5.Name)
	suite.Assert().Equal(5, int(user5.ID))

	users, err := GetAllUsers()
	suite.Assert().Nil(err)
	suite.Assert().Equal(5, len(users))

	testUsers = users
}

// TestCEvent tests events creation and attendee appointment
func (suite *CalendarModelTestSuite) TestCEvents() {
	event1, err := CreateEvent(testUsers[0].Name, "2020-02-20", "Test Event 1", "Description 1", testTimeslots[:2])
	suite.Assert().Nil(err)
	suite.Assert().Equal(testUsers[0].ID, event1.UserID)
	suite.Assert().Equal("2020-02-20", event1.Day)
	suite.Assert().Equal("Test Event 1", event1.Title)
	suite.Assert().Equal("Description 1", event1.Description)

	times1, err := GetEventTimeslots(event1.ID)
	suite.Assert().Equal(2, len(times1))

	attendee1, err := AddAttendee(event1.ID, testUsers[1].ID, testTimeslots[:1])
	suite.Assert().Nil(err)
	suite.Assert().Equal(event1.ID, attendee1.EventID)
	suite.Assert().Equal(testUsers[1].ID, attendee1.UserID)

	attendeeSlots1, err := GetAttendeeTimeslots(attendee1.ID)
	suite.Assert().Nil(err)
	suite.Assert().Equal(1, len(attendeeSlots1))

	// Second try
	event2, err := CreateEvent(testUsers[2].Name, "2020-02-20", "Test Event 2", "Description 2", testTimeslots)
	suite.Assert().Nil(err)
	suite.Assert().Equal(testUsers[2].ID, event2.UserID)
	suite.Assert().Equal("2020-02-20", event2.Day)
	suite.Assert().Equal("Test Event 2", event2.Title)
	suite.Assert().Equal("Description 2", event2.Description)

	times2, err := GetEventTimeslots(event2.ID)
	suite.Assert().Equal(7, len(times2))

	attendee2, err := AddAttendee(event1.ID, testUsers[3].ID, testTimeslots[:6])
	suite.Assert().Nil(err)
	suite.Assert().Equal(event1.ID, attendee2.EventID)
	suite.Assert().Equal(testUsers[3].ID, attendee2.UserID)

	attendeeSlots2, err := GetAttendeeTimeslots(attendee2.ID)
	suite.Assert().Nil(err)
	suite.Assert().Equal(6, len(attendeeSlots2))
}

func TestInvestorTestSuite(t *testing.T) {
	suite.Run(t, new(CalendarModelTestSuite))
}

func (suite *CalendarModelTestSuite) TearDownSuite() {
	suite.Assert().Nil(Close())
}
