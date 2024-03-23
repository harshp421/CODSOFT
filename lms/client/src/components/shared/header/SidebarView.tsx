import React, { FC } from 'react';
import { INavlinksData } from './Header';
import Link from 'next/link';
import { PanelRightCloseIcon } from 'lucide-react';

interface IsideabarProps {
  openSideBar: boolean;
  navlinksData: INavlinksData[];
  setOpenSideBar: (openSideBar: boolean) => void;
}

const SidebarView: FC<IsideabarProps> = ({ openSideBar, navlinksData ,setOpenSideBar}) => {
  const handleCloseSideBar = () => {
    const screen = document.getElementById('screen');
    if (screen) {
      screen.addEventListener('click', () => {
        setOpenSideBar(false);
      });
    }
  }
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full z-50 transform transition-transform duration-300 ease-in-out ${
        openSideBar ? 'translate-x-0 bg-black bg-opacity-50' : 'translate-x-full'
      }`}
      id='screen'
      onClick={handleCloseSideBar}
    >
      <div className="flex justify-end p-5">
        <div className="text-3xl font-bold cursor-pointer" onClick={()=>setOpenSideBar(false)}><PanelRightCloseIcon color='#fff'/> </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-5">
        {navlinksData.map((item, index) => (
          <Link href={item.link} key={index}>
            <h6 className="p-3 hover:bg-gray-200 font-bold hover:subpixel-antialiased letter-spacing: 0.025em; w-full text-center">{item.name}</h6>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarView;