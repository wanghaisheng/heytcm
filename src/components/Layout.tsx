import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LangPicker from './LangPicker';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 font-body">
      <Header />
      {/* PC端右下角固定，移动端顶部自适应 */}
      {/* <div className="block md:hidden px-4 pt-4">
        <LangPicker />
      </div> */}
      <main className="flex-grow">
        {children}
      </main>
      {/* PC端右下角固定按钮 */}
      {/* <div className="hidden md:block fixed right-6 bottom-6 z-50">
        <LangPicker className="shadow-lg bg-white rounded-full px-4 py-2 border border-neutral-200" />
      </div> */}
      <Footer />
    </div>
  );
};

export default Layout;