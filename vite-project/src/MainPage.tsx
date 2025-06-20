import React, { useState } from 'react';
import './css/MainPage.css';
import './css/Navbar.css';

interface MenuItem {
  name: string;
  description: string;
  image: string;
  price: string;
}

function App() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [newMenu, setNewMenu] = useState<Omit<MenuItem, 'image'> & { imageFile: File | null }>({
    name: '',
    description: '',
    imageFile: null,
    price: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewMenu({ ...newMenu, imageFile: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenu.name || !newMenu.description || !newMenu.imageFile || !newMenu.price) return;

    const imageURL = URL.createObjectURL(newMenu.imageFile);
    setMenus((prev) => [
      ...prev,
      {
        name: newMenu.name,
        description: newMenu.description,
        image: imageURL,
        price: newMenu.price,
      },
    ]);

    setNewMenu({
      name: '',
      description: '',
      imageFile: null,
      price: '',
    });
    setIsModalOpen(false);
  };

  const handleDelete = (index: number) => {
    setMenus((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="app-wrapper">
      <div className="app-container" id="top">
        <header>
          <h1>🍽️ 맛있는 밥상</h1>
        </header>

        <nav className="navbar">
          <ul>
            <li><a href="#top">HOME</a></li>
            <li><a href="#signature">MENU</a></li>
          </ul>
        </nav>

        {menus.length > 0 && (
          <section className="menu-section" id="signature">
            <h2>✨ Signature</h2>
            <div className="menu-list">
              {menus.map((menu, idx) => (
                <div key={`${menu.name}-${idx}`} className="menu-card">
                  <img src={menu.image} alt={menu.name} />
                  <h3>{menu.name}</h3>
                  <p>{menu.description}</p>
                  <p className="price"> {menu.price}원</p>
                  <button className="delete-btn" onClick={() => handleDelete(idx)}>삭제</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ➕ 플로팅 버튼 */}
        <button className="fab" onClick={() => setIsModalOpen(true)}>＋</button>

        {/* 모달 창 */}
        {isModalOpen && (
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>메뉴 추가</h2>
              <form onSubmit={handleSubmit} className="menu-form">
                <input
                  type="text"
                  placeholder="메뉴 이름"
                  value={newMenu.name}
                  onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="설명"
                  value={newMenu.description}
                  onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <input
                  type="text"
                  placeholder="가격"
                  value={newMenu.price}
                  onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
                />
                <button type="submit">메뉴 추가</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
