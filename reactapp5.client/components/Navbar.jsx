import './Navbar.css';
import Logo from '../components/Logo';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
    return (
        <div className="Navbar">
            <div className="logo">

      <Logo/>
                </div>

           
            <div className="header-bar">
                <IconButton >
                    <SearchIcon sx={{ fontSize: 30, color:'white' }} />
                </IconButton>

                <IconButton>
                    <YouTubeIcon sx={{ fontSize: 40, color: 'white' }} />
                </IconButton>


                <IconButton>
                    <AccountCircleIcon sx={{ fontsize: 40, color: 'white' }} />
                </IconButton>


                <IconButton>
                    <MenuIcon sx={{fontsize:60,color:'white'}} />
                </IconButton>

               
            </div>
        </div>
    );
}

export default Navbar;
