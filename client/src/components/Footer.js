import './Footer.css' 
// import trfLogoNavbar from '../Resources/trf-logo-navbar.png'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Tooltip,Button } from 'antd';
import { InstagramOutlined } from '@ant-design/icons';

const Footer = () => {
  return ( 
    <footer className="container-fluid fbox">
        <div className="row  my-5 mx-1 mx-lg-5">
            <div className="col-lg-4 pb-lg-4 abcd  box">
                <div className="info mb-3 mt-1">
                    <span className="py-4 px-2">
                        <i className="fas fa-map-marker-alt"></i>
                    </span>
                    <span className="p-1 txt" ><a href="https://goo.gl/maps/emXKy7iLoq59HMXA9" style={{"textDecoration": "none","color": "#e5e5e5"}}>666, Upper Indira Nagar,Bibwewadi, Pune, Maharashtra 411037 </a></span>
                </div>
                <div className="info mb-3 mt-1">
                    <span className="py-4 px-2">
                        <i className="fas fa-phone"></i>
                    </span>
                    <span className="p-1 txt" >9096938465</span>
                </div>
               
                <div className="info  mb-3 mt-1">
                    <span className="py-4 px-2"><i className="fas fa-paper-plane"></i>
                    </span>
                    <span className="p-1 txt" ><a href="mailto:robotics.forum@vit.edu" style={{"textDecoration": "none","color": "#e5e5e5"}}>robotics.forum@vit.edu</a></span>
                </div>
            </div>
    
            <div className="col-lg-4 pb-lg-4  text-center box">
                <h2>
                    
                    {/* <img src={trfLogoNavbar} alt="trf logo navbar" className="trfLogofooter"/> */}
                </h2>
                <p className="d-block mt-3">
                <p>THE ROBOTICS FORUM </p>
                </p>
            </div>
 
            <div className="col-lg-4 pb-4  box"> 
               <section className="r">
               
                <div className="icons">
                    <h1 className="is" style={{"color": "#e5e5e5", "opacity": "0.8"}}>Follow Us</h1>

                    <section className="is">
                    <a href="https://www.facebook.com/trfvit/" className="social-icon">
                        <Tooltip title="search">
                            <Button shape="circle" icon={<InstagramOutlined />} size="large" />
                        </Tooltip>
                    </a>
                    <a href="https://www.instagram.com/vitpunerobotics/?hl=en" className="social-icon">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://twitter.com/vitpunerobotics" className="social-icon">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.youtube.com/c/TheRoboticsForumVITPune/featured" className="social-icon">
                        <i className="fab fa-youtube"></i>
                    </a>
                    <a href="https://www.linkedin.com/company/the-robotics-forum/mycompany/" className="social-icon">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    </section>
                </div>
               </section>
            </div>
            
            <hr/>
            
            

            <div className="col-12 terms">
                    <Link className=" row my-5" to='/terms'>
                       * Terms and Conditions Apply
                    </Link>
            </div>

            <div className="col-12 mt-4 text-center " style={{"opacity": "0.5", "fontSize": "small"}}>
               
                Copyright © 2021 TRF VIT PUNE
              
            </div>

        </div>
    </footer>

  );
}

export default Footer
