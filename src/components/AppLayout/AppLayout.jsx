import './AppLayout.less';

export default function AppLayout({ children }) {
  return (
    <main id="main-content" className="app-main">
      <div className="app-main__container">
        {children}
      </div>
    </main>
  );
}