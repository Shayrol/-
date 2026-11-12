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

export interface DetailIntro {
  chkbabycarriageshopping: string;
  chkcreditcardshopping: string;
  chkpetshopping: string;
  contentid: string;
  contenttypeid: string;
  culturecenter: string;
  fairday: string;
  infocentershopping: string;
  opendateshopping: string;
  opentime: string;
  parkingshopping: string;
  restdateshopping: string;
  restroom: string;
  saleitem: string;
  saleitemcost: string;
  scaleshopping: string;
  shopguide: string;
}

export interface DetailIntroResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };

    body: {
      items: {
        item: DetailIntro[];
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
