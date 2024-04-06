import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import plus from "../../assets/icons/plus-white.svg";
import burger from "../../assets/icons/burger-white.svg";
import { Button } from "antd";

const pages = [
  {
    text: "Today Cards",
    link: "/today",
  },
  {
    text: "All Cards",
    link: "/all",
  },
  {
    text: "Random",
    link: "/random",
  },
];

function Navbar() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-prim-200 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img className="w-[50px] max-sm:w-[40px]" src={logo} alt="logo" />
        <b className="text-prim-500 text-3xl max-sm:hidden">FlashCards</b>
      </div>
      <ul className="flex gap-4 font-bold max-sm:hidden">
        {pages.map((page) => (
          <Link
            className="hover:bg-prim-400 hover:text-white p-2 rounded-md"
            key={page.link}
            to={page.link}
          >
            {page.text}
          </Link>
        ))}
      </ul>
      <Link
        className="bg-prim-500 flex p-2 rounded-md gap-2 max-sm:hidden"
        to="/add"
      >
        <img src={plus} alt="icon" className="w-[22px]" />
        <p className="text-white font-bold">Add Card</p>
      </Link>
      <div className="relative hidden max-sm:block">
        <button
          onClick={() => setOpen(!open)}
          className="hidden max-sm:block bg-prim-500 p-2 rounded-md"
        >
          <img src={burger} alt="icon" className="w-[22px]" />
        </button>
        {open && (
          <div className="absolute hidden max-sm:block bg-prim-400 left-[-100px] w-[150px] z-50 p-2 rounded-md">
            {pages.map((page) => (
              <Link
                onClick={() => setOpen(false)}
                className="block rounded-sm text-white font-bold"
                key={page.link}
                to={page.link}
              >
                {page.text}
              </Link>
            ))}
            <Link
              onClick={() => setOpen(false)}
              className="flex gap-2 bg-prim-300 justify-center p-1 round-xl"
              to="/add"
            >
              <img src={plus} alt="icon" className="w-[18px]" />
              <p className="text-white font-bold">Add Card</p>
            </Link>
          </div>
        )}
      </div>
    </div>
    // <AppBar position="static">
    //   <Container maxWidth="xl">
    //     <Toolbar disableGutters>
    //       <AssignmentIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="a"
    //         sx={{
    //           mr: 2,
    //           display: { xs: "none", md: "flex" },
    //           fontFamily: "monospace",
    //           fontWeight: 700,
    //           letterSpacing: ".3rem",
    //           color: "inherit",
    //           textDecoration: "none",
    //         }}
    //       >
    //         FLASH CARDS
    //       </Typography>

    //       <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
    //         <IconButton
    //           size="large"
    //           aria-label="account of current user"
    //           aria-controls="menu-appbar"
    //           aria-haspopup="true"
    //           onClick={handleOpenNavMenu}
    //           color="inherit"
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Menu
    //           id="menu-appbar"
    //           anchorEl={anchorElNav}
    //           anchorOrigin={{
    //             vertical: "bottom",
    //             horizontal: "left",
    //           }}
    //           keepMounted
    //           transformOrigin={{
    //             vertical: "top",
    //             horizontal: "left",
    //           }}
    //           open={Boolean(anchorElNav)}
    //           onClose={handleCloseNavMenu}
    //           sx={{
    //             display: { xs: "block", md: "none" },
    //           }}
    //         >
    //           {pages.map((page) => (
    //             <MenuItem key={page.text} onClick={handleCloseNavMenu}>
    //               <Link to={page.link}>
    //                 <Button>{page.text}</Button>
    //               </Link>
    //             </MenuItem>
    //           ))}
    //         </Menu>
    //       </Box>
    //       <AssignmentIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
    //       <Typography
    //         variant="h5"
    //         noWrap
    //         component="a"
    //         href="#app-bar-with-responsive-menu"
    //         sx={{
    //           mr: 2,
    //           display: { xs: "flex", md: "none" },
    //           flexGrow: 1,
    //           fontFamily: "monospace",
    //           fontWeight: 700,
    //           letterSpacing: ".3rem",
    //           color: "inherit",
    //           textDecoration: "none",
    //         }}
    //       >
    //         FLASH CARDS
    //       </Typography>
    //       <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
    //         {pages.map((page) => (
    //           <Link to={page.link} key={page.link}>
    //             <Button
    //               key={page.text}
    //               onClick={handleCloseNavMenu}
    //               sx={{ color: "white" }}
    //             >
    //               {page.text}
    //             </Button>
    //           </Link>
    //         ))}
    //       </Box>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
  );
}
export default Navbar;
