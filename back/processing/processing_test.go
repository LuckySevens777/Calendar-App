package processing

import (
	"testing"
	"github.com/stretchr/testify/suite"
)

type ProcessingTestSuite struct {
	suite.Suite
}

//set up DB
func (suite *ProcessingTestSuite) SetupSuite() {
	suite.Assert().Nil(DbInit())
}

func (suite *ProcessingTestSuite) TestCreateEvent() {
	
}

func TestInvestorTestSuite(t *testing.T) {
	suite.Run(t, new(ProcessingTestSuite))
}

func (suite *ProcessingTestSuite) TearDownSuite() {
	suite.Assert().Nil(DbClose())
}
