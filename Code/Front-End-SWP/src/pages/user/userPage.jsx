import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import Profile from './Profile';
import { MenuItem } from '@mui/material';
import Order from './Order';
import Footer from '../../components/footer/Footer';
import './userPage.css';
import { GetUserByID } from '../../components/API/APIConfigure';
import MyPost from './MyPost';
import MyTrade from './MyTrade';

import MailList from '../../components/mailList/MailList';
import FeatureProperties from '../../components/featureProperties/FeatureProperties';
import PaymentUser from './PaymentUser';
const UserPage = () => {
  const [activeMenu, setActiveMenu] = useState('profile');
  const [users, setUsers] = useState([]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };
  return (
    <div>
      <Navbar />
      <div className="userprofile">
        <div>
          <div className="userprofilein">
            <div className="left">
              <div className="usersidebar">
                <div>
                  <div className={`${activeMenu === 'profile' ? 'user-active' : ''}`}>
                    <MenuItem
                      className="user-item"
                      component={Link}
                      to="/user/profile"
                      onClick={() => handleMenuClick('profile')}
                    >
                      Thông Tin Cá Nhân
                    </MenuItem>
                  </div>
                  <div className={`${activeMenu === 'payment' ? 'user-active' : ''}`}>
                    <MenuItem
                      className="user-item"
                      component={Link}
                      to="/user/payment"
                      onClick={() => handleMenuClick('payment')}
                    >
                      Thanh Toán Cá Nhân
                    </MenuItem>
                  </div>
                  <div className={`${activeMenu === 'order' ? 'user-active' : ''}`}>
                    <MenuItem
                      className="user-item"
                      component={Link}
                      to="/user/order"
                      onClick={() => handleMenuClick('order')}
                    >
                      Khách sạn đã đặt
                    </MenuItem>
                  </div>
                  <div className={`${activeMenu === 'mypost' ? 'user-active' : ''}`}>
                    <MenuItem
                      className="user-item"
                      component={Link}
                      to="/user/mypost"
                      onClick={() => handleMenuClick('mypost')}
                    >
                      Bất động sản
                    </MenuItem>
                  </div>
                  <div className={`${activeMenu === 'mytrade' ? 'user-active' : ''}`}>
                    <MenuItem
                      className="user-item"
                      component={Link}
                      to="/user/trade"
                      onClick={() => handleMenuClick('mytrade')}
                    >
                      Trao Đổi
                    </MenuItem>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              {activeMenu === 'profile' && <Profile />}
              {activeMenu === 'payment' && <PaymentUser />}
              {activeMenu === 'order' && <Order />}
              {activeMenu === 'mypost' && <MyPost />}
              {activeMenu === 'mytrade' && <MyTrade />}
            </div>
          </div>
        </div>
      </div>

      <div className="homeContainer">
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default UserPage;
