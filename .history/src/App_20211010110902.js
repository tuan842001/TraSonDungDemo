import React, { useEffect } from 'react'
import {useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import './index.css';

const languages = [
  {
    code: 'vn',
    name: 'Tiếng Việt',
    country_code: 'vn',
  },
  {
    code: 'en',
    name: 'Tiếng Anh',
    country_code: 'gb',
  },
]

const GlobeIcon = ({width = 24, height = 24}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
  <path color = "#ffffff" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"  />
</svg>
)

const ListIcon = ({width = 24, height = 24}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>
)

const MapIcon = ({width = 18, height = 18}) =>(
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg>
)
const PhoneIcon = ({width = 18, height = 18}) =>(
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
</svg>
)

const EmailIcon = ({width = 18, height = 18}) =>(
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
</svg>
)

function App() {
  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find(l => l.code === currentLanguageCode)
  const { t } = useTranslation()

  useEffect(() => {

    document.title = t('app_title')
  }, [currentLanguage, t])


  return (
    <div className="container-bar">
      <div className="topbar">
        <div className="top-left">
          <button type="button" class="btn-login" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <ListIcon />
          </button>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content1">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Đăng nhập</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="dropdowns">
                    <form class="px-4 py-3">
                      <div class="mb-3">
                        <label for="exampleDropdownFormEmail1" class="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@gmail.com" />
                      </div>
                      <div class="mb-3">
                        <label for="exampleDropdownFormPassword1" class="form-label">Mật khẩu</label>
                        <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Nhập mật khẩu của bạn" />
                      </div>
                      <div class="mb-3">
                        <div class="form-check">
                          <input type="checkbox" class="form-check-input" id="dropdownCheck" />
                          <label class="form-check-label" for="dropdownCheck">
                            Nhớ tài khoản
                          </label>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">Đăng nhập</button>
                    </form>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Bạn chưa có tài khoản? Đăng ký</a>
                    <a class="dropdown-item" href="#">Quên mật khẩu?</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="top-right">
            <div className="dropdown">
              <div className="btn-language dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                < GlobeIcon />
              </div>


              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <span className="dropdown-item-text">
                    {t('language')} 
                  </span>
                </li>
                {languages.map(({ code, name, country_code}) => (
                <li key={country_code}>
                  <button className="dropdown-item" onClick={() => i18next.changeLanguage(code)}
                  disabled={code === currentLanguageCode}>
                    <span className={`flag-icon flag-icon-${country_code} mx-2`} style={{ opacity: code === currentLanguageCode ? 0.5 : 1}}></span>
                    {name}
                  </button>
                </li>
                ))}
              </ul>
            </div>
        </div>
      </div>


       <div className="check">
          <img 
            src={
              process.env.PUBLIC_URL +
              './img/check.png'
            } 
          />
          <h2>{t('check_title')}</h2>
          <b>{t('test_notice')}</b>
      </div>
    

    {/* ----Tên sản phẩm và đánh giá sản phầm----- */}

    <section className="header">
      <div className="container1">
        <div claas="widget-news">
          <img className="logo" src="./img/hinh-san-pham.jpg" />
        </div>
        <div className="information">
          <h4>
            {t('Products_name')}
          </h4>
          <p>
            <b>{t('Tax_code')}</b>
            4601526690
          </p>
          <button name="button" value="OK" type="button" onclick="hello()">{t('See_more')}</button>
        </div>
      </div>
            
      <div className="rate">
        <div className="rate-btn">
                
          <button type="button" class="btn-reviews" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <span className="hart">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg>
            </span>

            <p>{t('Reviews_Comments')}</p>
                  
            <div id="rating">
              <input type="radio" id="star5" name="rating" value="5" />
              <label className = "full" for="star5" title="Awesome - 5 stars"></label>
                     
              <input type="radio" id="star4" name="rating" value="4" />
              <label className = "full" for="star4" title="Pretty good - 4 stars"></label>
                     
              <input type="radio" id="star3" name="rating" value="3" />
              <label className = "full" for="star3" title="Meh - 3 stars"></label>
                     
              <input type="radio" id="star2" name="rating" value="2" />
              <label className = "full" for="star2" title="Kinda bad - 2 stars"></label>
                     
              <input type="radio" id="star1" name="rating" value="1" />
              <label className = "full" for="star1" title="Sucks big time - 1 star"></label>
            </div>
          </button>

          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">GỬI BÌNH LUẬN</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                
                <div class="modal-body">
                  {/*  */}
                  
                  
                  <div className="divmb3">
                    <div class="mb-3">
                    <label for="exampleDropdownFormEmail2" class="form-label">Tên hiển thị</label>
                      <input type="text" class="form-control" id="exampleDropdownFormEmail2" />
                    </div>
                    <div class="mb-3">
                      <label label for="exampleDropdownFormEmail2" class="form-label">Email</label>
                      <input type="email" class="form-control" id="exampleDropdownFormPassword2" />
                    </div>
                  </div>
                  
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Bình luận</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Nhập cảm nhận của bạn về sản phẩm" rows="5"></textarea>
                  </div>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Gửi</button>
             
                  {/*  */}
                </div>
              </div>
            </div>
          </div>



              


          {/*  */}
        </div>
      </div> 
    </section>

                {/* Thông tin sản phẩm */}

    <section>
      <div className="title-head">
        <h5>{t('Product_information')}</h5> 
      </div>

      <div className="porlet-body">
        <div className="body-top"> 
          <span>
            <p><b>{t('Product_name')}</b>{t('Products_name')}</p>
          </span>
          <span>
            <p><b>{t('Place_of_production')}</b>{t('Cooperative')}</p>
          </span>
          <span>
            <p><b>{t('Production_process')}</b>{t('Harvesting')}</p>
          </span>
          <span className="thong-tin-san-pham" >
            <b> {t('Product_information')} </b>
          </span>

          <div className="thong-tin">
            <p>
              {t('information_1')}
            </p>
            <p>
              {t('information_2')}
            </p>
            <b>{t('Warehousing')}</b>
            <p>{t('Storage_1')}</p>
            <p>{t('Storage_2')}</p>
          </div>
        </div>

        <div className="geography">
          <span><b>{t('Geographical_indications')}</b></span> <br />
          <div className="anh">
            <img src="img/giay-chung-nhan-quyen-su-dung.jpg" /> 
            <img src="img/san-pham.jpg" />
            <img src="img/sanpham.jpg" />
            <div>
              <b>{t('Captions_1')}</b>
            </div>
            <div className="giay-chung-nhan">
              <img src="img/giay-chung-nhan-OCOP.jpg" />
              <img src="img/chung-nhan-sp-cn-nông-thon-tieu-bieu.jpg" />
            </div>
            <div>
              <b> {t('Captions_2')} </b> <br />
              <b> {t('Certificate')} </b>
            </div>
            <img src="img/giay-chung-nhan.jpg" />
            <div>
              <p>
                {t('Like_tea')}
              </p>
            </div>
            <div>
              <p>
                <b>
                  {t('Household_Code')}
                </b>
                {t('Captions_3')}
              </p>
            </div>
          </div> 
        </div>

        <div className="body-midle">
          <p className="tile-midle"> {t('Cooperative_SD')} </p>
          <span className="span-midle">
            <p><b>{t('Type_of_activity')}</b> {t('Cooperative2')} </p>
          </span>
          <span className="span-midle">
            <p>
              <b> {t('Tax_code')} </b>
              4601526690
            </p>
          </span>
          <span className="span-midle1">
            <p>
              <b> {t('Address')} </b>
              {t('Address_number')}
            </p>
          </span>
          <span className="span-midle">
            <p>
              <b>{t('Legal_representatives')}</b>
              {t('Name_representatives')}
            </p>  
          </span>
          <span className="span-midle">
            <p>
              <b> {t('Tax_code')} </b>
              4601526690
            </p>
          </span>
          <span className="span-midle">
            <p>
              <b> {t('First_time_license_date')} </b>
              19/10/2018
            </p>
          </span>
          <span className="span-midle">
            <p>
              <b> {t('Phone_number')} </b>
              0985880333
            </p>
          </span>
        </div>
      </div>
    </section>

    <section>
        <div className="body-bottom">
            <div className="bottom-tile">
                <b> {t('Ownership')} </b>
            </div>
            <div>
                <b>{t('Cooperative')}</b>
            </div>
            <div className="Contact-info">
              <div className="Contact_Address">
                <MapIcon />
                <p>
                  <b> {t('Address')} </b>
                  {t('Address_number')}
                </p>
            </div>
            <div className="bottom-tile-div">
                <PhoneIcon />
                <p>
                  <b> {t('Phone_number')} </b>
                  0985880333
                </p>
            </div>
            <div className="bottom-tile-div">
                <EmailIcon />
                <p>
                  <b>Email:</b>
                  Sondungtra@gmail.com
                </p>
            </div>
            </div>
        </div>
    </section>


  </div>
    
  );
}

export default App;
