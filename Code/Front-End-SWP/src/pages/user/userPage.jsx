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
import PaymentUser from './PaymentUser';

import MailList from '../../components/mailList/MailList';
import FeatureProperties from '../../components/featureProperties/FeatureProperties';

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
                      My Profile
                    </MenuItem>
                  </div>
                  <div className={`${activeMenu === 'payment' ? 'user-active' : ''}`}>
                    <MenuItem
                      className="user-item"
                      component={Link}
                      to="/user/payment"
                      onClick={() => handleMenuClick('payment')}
                    >
                      Payment
                    </MenuItem>
                  </div>
                  <div className={`${activeMenu === 'order' ? 'user-active' : ''}`}>
                    <MenuItem
                      className="user-item"
                      component={Link}
                      to="/user/order"
                      onClick={() => handleMenuClick('order')}
                    >
                      Booked Court
                    </MenuItem>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              {activeMenu === 'profile' && <Profile />}
              {activeMenu === 'payment' && <PaymentUser />}
              {activeMenu === 'order' && <Order />}
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
