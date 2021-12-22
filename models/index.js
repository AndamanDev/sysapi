const BlCarNos = require('./BL_CarNos')
const BlIDCards = require('./BL_IDCards')
const BlNames = require('./BL_Names')
const CRRegPersons = require('./CR_Reg_Persons')
const CRRegTrucks = require('./CR_Reg_Trucks')
const TsContract = require('./ts_contract')
const TsPrices = require('./ts_prices')
const TsProvince = require('./Ts_Province')
const TsRetail = require('./ts_retail')
const TsTrader = require('./ts_trader')
const TsTrucktype = require('./ts_trucktype')
const ComGradeCode = require('./vCom_grade_code')
// queryql
const BlCarNosQuerier = require('./queryql/bl-car-nos')
const BlIDCardsQuerier = require('./queryql/bl-id-cards')
const BlNamesQuerier = require('./queryql/bl-names')
const CRRegPersonsQuerier = require('./queryql/cr-reg-persons')
const CRRegTrucksQuerier = require('./queryql/cr-reg-trucks')
const TsProvinceQuerier = require('./queryql/ts-province')
const TsRetailQuerier = require('./queryql/ts-retail')
const TsTraderQuerier = require('./queryql/ts-trader')
const TsTrucktypeQuerier = require('./queryql/ts-trucktype')
const TsPricesQuerier = require('./queryql/ts-prices')
const TsContractQuerier = require('./queryql/ts-contract')
const ComGradeCodeQuerier = require('./queryql/ts-contract')

module.exports = {
  BlCarNos,
  BlIDCards,
  BlNames,
  CRRegPersons,
  CRRegTrucks,
  TsContract,
  TsPrices,
  TsProvince,
  TsRetail,
  TsTrader,
  TsTrucktype,
  ComGradeCode,
  // queryql
  BlCarNosQuerier,
  BlIDCardsQuerier,
  BlNamesQuerier,
  CRRegPersonsQuerier,
  CRRegTrucksQuerier,
  TsProvinceQuerier,
  TsRetailQuerier,
  TsTraderQuerier,
  TsTrucktypeQuerier,
  TsPricesQuerier,
  TsContractQuerier,
  ComGradeCodeQuerier
}
