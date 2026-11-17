// =========================================================================
export interface CommonInfo {
  contentid: string;
  contenttypeid: string;
  title: string;
  createdtime: string;
  modifiedtime: string;

  tel: string;
  telname: string;
  homepage: string;

  firstimage: string;
  firstimage2: string;

  cpyrhtDivCd: string;

  areacode: string;
  sigungucode: string;

  lDongRegnCd: string;
  lDongSignguCd: string;

  lclsSystm1: string;
  lclsSystm2: string;
  lclsSystm3: string;

  cat1: string;
  cat2: string;
  cat3: string;

  addr1: string;
  addr2: string;
  zipcode: string;

  mapx: string;
  mapy: string;
  mlevel: string;

  overview: string;
}

export interface CommonInfoResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };

    body: {
      items: {
        item: CommonInfo[];
      };

      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

// =========================================================================
// 공통 데이터 타입
export interface DetailIntroBase {
  contentid: string;
  contenttypeid: string;
}

// 관광지 (12)
export interface DetailSpotIntro extends DetailIntroBase {
  contenttypeid: "12";
  accomcount?: string;
  chkbabycarriage?: string;
  chkcreditcard?: string;
  chkpet?: string;
  expagerange?: string;
  expguide?: string;
  heritage1?: string;
  heritage2?: string;
  heritage3?: string;
  infocenter?: string;
  opendate?: string;
  parking?: string;
  restdate?: string;
  useseason?: string;
  usetime?: string;
}

// 문화시설 (14)
export interface DetailCultureIntro extends DetailIntroBase {
  contenttypeid: "14";
  accomcountculture?: string;
  chkbabycarriageculture?: string;
  chkcreditcardculture?: string;
  chkpetculture?: string;
  discountinfo?: string;
  infocenterculture?: string;
  parkingculture?: string;
  parkingfee?: string;
  restdateculture?: string;
  usefee?: string;
  usetimeculture?: string;
  sclae?: string;
  spendtime?: string;
}

// 행사/공연/축제 (15)
export interface DetailFestivalIntro extends DetailIntroBase {
  contenttypeid: "15";
  agelimit?: string;
  bookingplace?: string;
  discountinfofestival?: string;
  eventenddate?: string;
  eventhomepage?: string;
  eventplace?: string;
  eventstartdate?: string;
  festivalgrade?: string;
  placeinfo?: string;
  playtime?: string;
  program?: string;
  spendtimefestival?: string;
  sponsor1?: string;
  sponsor1tel?: string;
  sponsor2?: string;
  sponsor2tel?: string;
  subevent?: string;
  usetimefestival?: string;
}

// 여행 코스 (25)
export interface DetailCourseIntro extends DetailIntroBase {
  contenttypeid: "25";
  distance?: string;
  infocentertourcourse?: string;
  schedule?: string;
  taketime?: string;
  theme?: string;
}

// 레포츠 (28)
export interface DetailLeportsIntro extends DetailIntroBase {
  contenttypeid: "28";
  accomcountleports?: string;
  chkbabycarriageleports?: string;
  chkcreditcardleports?: string;
  chkpetleports?: string;
  expagerangeleports?: string;
  infocenterleports?: string;
  openperiod?: string;
  parkingfeeleports?: string;
  parkingleports?: string;
  reservation?: string;
  restdateleports?: string;
  scaleleports?: string;
  usefeeleports?: string;
  usetimeleports?: string;
}

// 숙박 (32)
export interface DetailLodgingIntro extends DetailIntroBase {
  contenttypeid: "32";
  accomcountlodging?: string;
  checkintime?: string;
  checkouttime?: string;
  chkcooking?: string;
  foodplace?: string;
  infocenterlodging?: string;
  parkinglodging?: string;
  pickup?: string;
  roomcount?: string;
  reservationlodging?: string;
  reservationurl?: string;
  roomtype?: string;
  scalelodging?: string;
  subfacility?: string;
  barbecue?: string;
  beauty?: string;
  beverage?: string;
  bicycle?: string;
  campfire?: string;
  fitness?: string;
  karaoke?: string;
  publicbath?: string;
  publicpc?: string;
  sauna?: string;
  seminar?: string;
  sports?: string;
  refundregulation?: string;
}

// 쇼핑 (38)
export interface DetailShoppingIntro extends DetailIntroBase {
  contenttypeid: "38";
  chkbabycarriageshopping?: string;
  chkcreditcardshopping?: string;
  chkpetshopping?: string;
  culturecenter?: string;
  fairday?: string;
  infocentershopping?: string;
  opendateshopping?: string;
  opentime?: string;
  parkingshopping?: string;
  restdateshopping?: string;
  restroom?: string;
  saleitem?: string;
  saleitemcost?: string;
  scaleshopping?: string;
  shopguide?: string;
}

// 음식점 (39)
export interface DetailFoodIntro extends DetailIntroBase {
  contenttypeid: "39";
  chkcreditcardfood?: string;
  discountinfofood?: string;
  firstmenu?: string;
  infocenterfood?: string;
  kidsfacility?: string;
  opendatefood?: string;
  opentimefood?: string;
  packing?: string;
  parkingfood?: string;
  reservationfood?: string;
  restdatefood?: string;
  scalefood?: string;
  seat?: string;
  smoking?: string;
  treatmenu?: string;
  lcnsno?: string;
}

// 소개정보 전체 Union
export type TravelDetailIntro =
  | DetailSpotIntro
  | DetailCultureIntro
  | DetailFestivalIntro
  | DetailCourseIntro
  | DetailLeportsIntro
  | DetailLodgingIntro
  | DetailShoppingIntro
  | DetailFoodIntro;

export interface DetailIntroResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };

    body: {
      items: {
        item: TravelDetailIntro[];
      };

      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

// =========================================================================

export interface DetailImageInfo {
  contentid: string;
  cpyrhtDivCd: string;
  imgname: string;
  originimgurl: string;
  serialnum: string;
  smallimageurl: string;
}

export interface DetailImageInfoResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };

    body: {
      items: {
        item: DetailImageInfo[];
      };

      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

// =========================================================================

export interface TravelDetailResponse {
  common: CommonInfoResponse;
  intro: DetailIntroResponse;
  image: DetailImageInfoResponse;
}
