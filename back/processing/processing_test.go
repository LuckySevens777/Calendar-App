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
	_,err = model.CreateUser("test2")
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
	suite.Assert().Equal(uint(1),id)
	_,err = validateEventID("100")
	suite.Assert().NotNil(err)
	_,err = validateEventID("-2")
	suite.Assert().NotNil(err)
}

func (suite *ProcessingTestSuite) TestE_getUser() {
	name,err := getUser(1)
	suite.Assert().Nil(err)
	suite.Assert().Equal("test1",name)
	name,err = getUser(2)
	suite.Assert().Nil(err)
	suite.Assert().Equal("test2",name)
	_,err = getUser(35)
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

	suite.Assert().NotNil(CreateEvent("test1","TE","","03-45-2019",[]string{"08:00"}))
	suite.Assert().NotNil(CreateEvent("test3","TE","","02-21-2020",[]string{"08:00"}))
	suite.Assert().NotNil(CreateEvent("test1","TE","","02-21-2020",[]string{"08:30"}))
}

func (suite *ProcessingTestSuite) TestF_GetEvents() {
	//create more test events:
	suite.Assert().Nil(CreateEvent("test1","TE","","03-20-2020",[]string{"08:00","08:20","09:00"}))
	suite.Assert().Nil(CreateEvent("test2","TE","A test event","02-21-2020",[]string{"15:00"}))
	suite.Assert().Nil(CreateEvent("test1","TE","","03-21-2020",[]string{"15:40"}))
	
	_,times := GetEvents("","","",[]string{})
	suite.Assert().Equal(4,len(times))
	
	_,times = GetEvents("", "test2","",[]string{})
	suite.Assert().Equal(1,len(times))
	
	eventMaps,times := GetEvents("","","",[]string{"02-21-2020"})
	suite.Assert().Equal(len(eventMaps),len(times))
	suite.Assert().Equal(2,len(eventMaps))
	
	_,times = GetEvents("TE","","",[]string{})
	suite.Assert().Equal(3,len(times))

	eventMaps,times = GetEvents("","test2","",[]string{"02-21-2020"})
	suite.Assert().Equal(1,len(times))
	suite.Assert().Equal("A test event",eventMaps[0]["Description"])
	suite.Assert().Equal("test2",eventMaps[0]["Creator"])
	suite.Assert().Equal("02-21-2020",eventMaps[0]["Day"])
	suite.Assert().Equal("3",eventMaps[0]["EventID"])
	suite.Assert().Equal(1,len(times[0]))
	suite.Assert().Equal("15:00",times[0][0])
	
	_,times = GetEvents("","test1","",[]string{"03-20-2020","03-21-2020"})
	suite.Assert().Equal(2,len(times))

	eventMaps,times = GetEvents("","","test1",[]string{})
	suite.Assert().Equal(3,len(eventMaps))
	suite.Assert().Equal("test1",eventMaps[0]["Creator"])
}

func (suite *ProcessingTestSuite) TestG_RegisterForEvent() {
	suite.Assert().Nil(RegisterForEvent("test1","3",[]string{"15:00"}))
	suite.Assert().NotNil(RegisterForEvent("test2","3",[]string{"15:40"}))
	suite.Assert().Nil(RegisterForEvent("test2","2",[]string{"08:00"}))
	suite.Assert().NotNil(RegisterForEvent("test2","4",[]string{"15:40","06:00"}))
}

func (suite *ProcessingTestSuite) TestH_GetAttendees() {
	atts,slots,err := GetAttendees("1")
	suite.Assert().Nil(err)
	suite.Assert().Equal(len(atts),len(slots))
	suite.Assert().Equal(1,len(atts))
	suite.Assert().Equal("test1",atts[0])
	suite.Assert().Equal([]string{"08:00","08:20"},slots[0])

	atts,slots,err = GetAttendees("3")
	suite.Assert().Nil(err)
	suite.Assert().Equal(len(atts),len(slots))
	suite.Assert().Equal(2,len(atts))
	suite.Assert().Equal([]string{"test2","test1"},atts) //mismatched order may be ok
	suite.Assert().Equal([][]string{[]string{"15:00"},[]string{"15:00"}},slots)

	_,_,err = GetAttendees("6")
	suite.Assert().NotNil(err)
	_,_,err = GetAttendees("-2")
	suite.Assert().NotNil(err)
}

func TestInvestorTestSuite(t *testing.T) {
	suite.Run(t, new(ProcessingTestSuite))
}

//gracefully close db
func (suite *ProcessingTestSuite) TearDownSuite() {
	suite.Assert().Nil(DbClose())
}
