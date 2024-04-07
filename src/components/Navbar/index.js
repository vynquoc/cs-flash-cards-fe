import * as React from "react";

import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import plus from "../../assets/icons/plus-white.svg";
import burger from "../../assets/icons/burger-white.svg";
import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Dropdown } from "antd";

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

const items = [
  {
    label: <Link to="/today">Today Cards</Link>,
    key: "0",
  },
  {
    label: <Link to="/all">All Cards</Link>,
    key: "1",
  },
  {
    label: <Link to="/random">Random Card</Link>,
    key: "3",
  },
  {
    icon: <PlusCircleFilled className="text-prim-500" />,
    label: <Link to="/add">Add Card</Link>,
    key: "3",
  },
];

function Navbar() {
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
        <img src={plus} alt="icon" className="w-[18px]" />
        <p className="text-white font-bold">Add Card</p>
      </Link>
      <div className="relative hidden max-sm:block">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <div className="hidden max-sm:block bg-prim-500 p-2 rounded-md">
              <img src={burger} alt="icon" className="w-[18px]" />
            </div>
          </a>
        </Dropdown>
      </div>
    </div>
  );
}
export default Navbar;
