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

  // const releaseDate = new Date('2021-10-08')
  // const timeDifference = new Date() - releaseDate
  // const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  useEffect(() => {

    document.title = t('app_title')
  }, [currentLanguage, t])


  return (
    <div className="container-bar">
      <div className="topbar">
        <div className="top-left">
          <ListIcon />
        </div>
      
      {/* <!-- Button trigger modal --> */}
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="dropdown">
  <form class="px-4 py-3">
    <div class="mb-3">
      <label for="exampleDropdownFormEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" />
    </div>
    <div class="mb-3">
      <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
    </div>
    <div class="mb-3">
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="dropdownCheck" />
        <label class="form-check-label" for="dropdownCheck">
          Remember me
        </label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Sign in</button>
  </form>
  <div class="dropdown-divider"></div>
  <a class="dropdown-item" href="#">New around here? Sign up</a>
  <a class="dropdown-item" href="#">Forgot password?</a>
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
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
          <b>Xin cảm ơn bạn đã mua hàng!</b>
      </div>
    

    {/* ----Tên sản phẩm và đánh giá sản phầm----- */}

    <section className="header">
        <div className="container1">
            <div claas="widget-news">
                <img className="logo" src="./img/san-pham.jpg" />
            </div>
            <div className="information">
                <h4>
                    TRÀ ĐINH - SƠN TRÀ
                </h4>
                <p><b>Mã số thuế:</b>4601526690</p>
                <button name="button" value="OK" type="button" onclick="hello()">Xem thêm</button>
                

            </div>
        </div>
            
        <div className="rate">
            <div className="rate-btn">
                <span className="hart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </span>
                    <p>Đánh giá & Bình luận:</p>
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
            </div>
        </div> 
    </section>

                {/* Thông tin sản phẩm */}

    <section>
      <div className="title-head">
        <h5>THÔNG TIN SẢN PHẨM</h5> 
      </div>

      <div className="porlet-body">
        <div className="body-top"> 
          <span>
            <p><b>Tên sản phẩm:</b>Trà Đinh - Sơn Trà</p>
          </span>
          <span>
            <p><b>Nơi sản xuất:</b>HTX Trà Sơn Dung.</p>
          </span>
          <span>
            <p><b>Quy trình sản xuất:</b>Thu hái -> Làm héo -> Dệt men -> Vò chè -> Sao khô -> Lên hương -> Đóng gói -> Thành phẩm.</p>
          </span>
          <span className="thong-tin-san-pham" >
            <b> Thông tin sản phẩm </b>
          </span>

          <div className="thong-tin">
            <p>Sản phẩm được hái vào mỗi sớm mai, người hái chè tỉ mỉ chọn lấy búp một lá, lá ngậm sương đêm được HTX Trà Sơn Dung chăm sóc đạt tiêu chuẩn VietGap theo hướng hữu cơ. Lá chè tươi được lưu giữ sau khi hái bằng sọt tre đảm bảo độ thông thoáng cần thiết nhưng phải giữ được độ tươi ngon, không bị lèn chặt hay dập nát. Sau thời gian hong khô trên những tấm phên tre là công đoạn làm héo và vò. Làm héo trên hệ thống tôn quay dài dưới tác dụng của nhiệt than củi, quá trình vò để tạo độ xốp cánh và độ quăn. Các máy vò có gân được tính toán và nghiên cứu thực nghiệm dày công của nhóm tác giả do TS.Trần Ngọc Giang, giảng viên Trường ĐH Kỹ thuật Công nghiệp chuyển giao công nghệ. Tiếp đến là công đoạn hong khô qua rồi cho vào sao sấy. Lúc này sản phẩm được gọi là trà mộc - chưa lên hương. Quá trình lên hương vẫn được Sơn Dung Trà sử dụng nguồn nhiệt truyền thống của than củi. Lửa lúc to, lúc nhỏ, tôn quay lúc nhanh lúc lại chậm, nếm thử, cảm nhận rồi chờ điều chỉnh, cảm nhận nhiệt trong lò do giác quan "thứ 6". Trà phải được quay đủ vòng, lửa vừa tới khi thật thấu trong lõi tỏa hương thơm ngào ngạt. Trà ra khỏi lò sau lên hương thường được hong nguội để bảo quản tốt hơn.</p>

            <p>Bộ hộp Sơn Trà - Trà Đinh thượng hạng bao gồm 12 gói trà, mỗi gói trà mang ý nghĩa đặc trưng cho từng con giáp trong văn hóa Tâm linh của người Việt, là kết quả của Thiên can - Địa chi. Mười hai gói trà được chia thành 4 cột biểu trưng cho khí tiết trong năm.</p>
            <b>Lưu kho:</b>
            <p>• Sản phẩm khô được lưu kho tại Xã Phúc Trìu và Xã Phúc Xuân, TP Thái Nguyên.</p>
            <p>• Chè Đinh lưu kho tại số nhà 107, tổ 10, phường Quang Trung, TP Thái Nguyên, Tỉnh Thái Nguyên.</p>
          </div>
        </div>

        <div className="geography">
          <span><b>Chỉ dẫn địa lý:</b></span> <br />
          <div className="anh">
            <img src="img/giay-chung-nhan-quyen-su-dung.jpg" /> 
            <img src="img/hinh-san-pham.jpg" />
            <img src="img/sanpham.jpg" />
            <div>
              <b>Sản phẩm Sơn Trà đạt OCOP 4 sao (có tiềm năng 5 sao) của tỉnh Thái Nguyên. Đồng thời cũng là sản phẩm nông nghiệp tiểm năng của tỉnh</b>
            </div>
            <div className="giay-chung-nhan">
              <img src="img/giay-chung-nhan-OCOP.jpg" />
              <img src="img/chung-nhan-sp-cn-nông-thon-tieu-bieu.jpg" />
            </div>
            <div>
              <b>HTX đạt hệ thống quản lý an toàn thực phẩm theo tiêu chuẩn ISO cho lĩnh vực sơ chế, đóng gói, bảo quản và phân phối chè. </b> <br />
              <b>Giấy chứng nhận số ISO 22000 : 2018 </b>
            </div>
            <img src="img/giay-chung-nhan.jpg" />
            <div>
              <p>
                Giống trà TRI777 và giống trà trung du
              </p>
            </div>
            <div>
              <p>
                <b>
                  Mã nông hộ:
                </b>VG01/002 LONG THỊ CHÂM - Xóm Phúc Tiến, Xã Phúc Trìu, TP Thái Nguyên, Tỉnh Thái Nguyên
              </p>
            </div>
          </div> 
        </div>

        <div className="body-midle">
          <p className="tile-midle">HỢP TÁC XÃ TRÀ SƠN DUNG</p>
          <span className="span-midle">
            <p><b>Loại hình hoạt động:</b>Hợp tác xã</p>
          </span>
          <span className="span-midle">
            <p><b>Mã số thuế:</b>4601526690</p>
          </span>
          <span className="span-midle">
            <p><b>Địa chỉ:</b>Số nhà 107, Tổ 10,  Phường Quang Trung, Thành phố Thái Nguyên, Tỉnh Thái Nguyên</p>
          </span>
          <span className="span-midle">
            <p><b>Đại diện pháp luật:</b>Nguyễn Thị Như Trang</p>  
          </span>
          <span className="span-midle">
            <p><b>Mã số thuế:</b>4601526690</p>
          </span>
          <span className="span-midle">
            <p><b>Ngày cấp giấy phép lần đầu:</b>19/10/2018</p>
          </span>
          <span className="span-midle">
            <p><b>Điện thoại:</b>0985880333</p>
          </span>
        </div>
      </div>
    </section>

    <section>
        <div className="body-bottom">
            <div className="bottom-tile">
                <b>DOANH NGHIỆP SỞ HỮU</b>
            </div>
            <span>
                <b>HTX Trà Sơn Dung.</b>
            </span>
            <div className="Contact-info">
              <span>
                <MapIcon />
                <p><b>Địa chỉ:</b>Số nhà 107, Tổ 10,  Phường Quang Trung, Thành phố Thái Nguyên, Tỉnh Thái Nguyên</p>
            </span>
            <span>
                <PhoneIcon />
                <p><b>Điện thoại:</b>0985880333</p>
            </span>
            <span>
                <EmailIcon />
                <p><b>Email:</b>sondungtra@gmail.com</p>
            </span>
            </div>
        </div>
    </section>

    </div>




    // <div className="container">
    //   <div className="d-flex justify-content-end">
        
    //   </div>
    //   <div className="d-flex flex-column align-items-start">
    //     <h1 className="font-weight-normal mb-3">{t('welcome_message')}</h1>
    //     <p>{t('days_since_release', )}</p>
    //   </div>
    // </div>
        



    
  );
}

export default App;
