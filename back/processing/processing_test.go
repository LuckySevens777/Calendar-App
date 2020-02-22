package processing

import (
	"testing"
	"github.com/thecsw/Calendar-App/back/model"
	"github.com/stretchr/testify/suite"
)

type ProcessingTestSuite struct {
	suite.Suite
}

//set up DB
func (suite *ProcessingTestSuite) SetupSuite() {
	suite.Assert().Nil(DbInit())
	_,err := model.CreateUser("test1")
	suite.Assert().Nil(err)
}

//test utility methods:
func (suite *ProcessingTestSuite) TestA_ToValidTimeslots() {
	slots,err := toValidTimeSlots([]string{"08:00","08:20","08:40"})
	suite.Assert().Nil(err)
	suite.Assert().Equal(3,len(slots))
	
	slots,err = toValidTimeSlots([]string{"07:15"})
	suite.Assert().NotNil(err)
	suite.Assert().Equal(0,len(slots))

	_,err = toValidTimeSlots([]string{"00:00"})
	suite.Assert().NotNil(err)
	_,err = toValidTimeSlots([]string{"12:20"})
}

func (suite *ProcessingTestSuite) TestB_validDay() {
	suite.Assert().Equal(true, validDay("02-21-2020"))
	suite.Assert().Equal(false, validDay("60-10-2020"))
	suite.Assert().Equal(false, validDay("06-32-2020"))
	suite.Assert().Equal(false, validDay("12-25-2020"))
	suite.Assert().Equal(false, validDay("07-04-2020"))
	suite.Assert().Equal(false, validDay("01-01-2020"))

}

func (suite *ProcessingTestSuite) TestD_validEventID() {
	//(runs after test C which creates an event)
	id,err := validateEventID("1")
	suite.Assert().Nil(err)
	suite.Assert().Equal(1,id)
	_,err = validateEventID("2")
	suite.Assert().NotNil(err)
}

//test exported functionality:
func (suite *ProcessingTestSuite) TestC_CreateEvent() {
	suite.Assert().Nil(CreateEvent("test1","Test Event","","02-21-2020",[]string{"08:00","08:20"}))
	events,err := model.GetAllEvents()
	suite.Assert().Nil(err)
	suite.Assert().Equal(1,len(events))
	slots,err := model.GetEventTimeslots(events[0].ID)
	suite.Assert().Nil(err)
	suite.Assert().Equal(2,len(slots))
	suite.Assert().Equal("08:00",slots[0].Name)
	suite.Assert().Equal("02-21-2020",events[0].Day)

	suite.Assert().NotNil(CreateEvent("test1","TE","","03-45-2019",[]string{"8:00"}))
	suite.Assert().NotNil(CreateEvent("test2","TE","","02-21-2020",[]string{"8:00"}))
	suite.Assert().NotNil(CreateEvent("test1","TE","","02-21-2020",[]string{"8:30"}))
}


func TestInvestorTestSuite(t *testing.T) {
	suite.Run(t, new(ProcessingTestSuite))
}

//gracefully close db
func (suite *ProcessingTestSuite) TearDownSuite() {
	suite.Assert().Nil(DbClose())
}
